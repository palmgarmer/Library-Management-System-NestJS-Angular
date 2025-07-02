import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Book } from '../../../models/book.model';
import { Borrower } from '../../../models/borrower.model';
import { CreateLendingDto } from '../../../models/lending.model';

@Component({
  selector: 'app-borrow-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './borrow-form.html',
  styleUrl: './borrow-form.scss'
})
export class BorrowFormComponent implements OnInit {
  @Output() bookBorrowed = new EventEmitter<void>();

  borrowForm: FormGroup;
  books: Book[] = [];
  borrowers: Borrower[] = [];
  isLoading = false;
  isSubmitting = false;
  error: string | null = null;
  successMessage: string | null = null;

  // Custom validators
  private futureDateValidator = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate <= today) {
      return { pastDate: true };
    }
    
    // Check if due date is more than 90 days in the future
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 90);
    if (selectedDate > maxDate) {
      return { tooFarInFuture: true };
    }
    
    return null;
  };

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.borrowForm = this.fb.group({
      bookId: ['', [Validators.required]],
      borrowerId: ['', [Validators.required]],
      dueDate: ['', [Validators.required, this.futureDateValidator]]
    });
  }

  ngOnInit(): void {
    this.loadFormData();
    this.setDefaultDueDate();
  }

  loadFormData(): void {
    this.isLoading = true;
    
    // Load available books and borrowers
    Promise.all([
      this.apiService.getBooks().toPromise(),
      this.apiService.getBorrowers().toPromise()
    ]).then(([books, borrowers]) => {
      this.books = (books || []).filter(book => book.availableCopies > 0);
      this.borrowers = (borrowers || []).filter(borrower => borrower.membershipStatus === 'active');
      this.isLoading = false;
    }).catch(error => {
      console.error('Error loading form data:', error);
      this.error = 'Failed to load books and members. Please try again.';
      this.isLoading = false;
    });
  }

  setDefaultDueDate(): void {
    // Set default due date to 14 days from today
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);
    const dueDateString = dueDate.toISOString().split('T')[0];
    this.borrowForm.patchValue({ dueDate: dueDateString });
  }

  onSubmit(): void {
    if (this.borrowForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.error = null;
      this.successMessage = null;

      const formValue = this.borrowForm.value;
      const selectedDate = new Date(formValue.dueDate);
      const today = new Date();
      const loanPeriodDays = Math.ceil((selectedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      const borrowData: CreateLendingDto = {
        bookId: formValue.bookId,
        borrowerId: formValue.borrowerId,
        loanPeriodDays: loanPeriodDays
      };

      this.apiService.borrowBook(borrowData).subscribe({
        next: (lending) => {
          const bookTitle = this.getSelectedBookTitle();
          const borrowerName = this.getSelectedBorrowerName();
          this.successMessage = `Successfully borrowed "${bookTitle}" to ${borrowerName}`;
          
          this.bookBorrowed.emit(); // Notify parent component
          this.borrowForm.reset();
          this.setDefaultDueDate();
          this.isSubmitting = false;
          
          // Clear success message after 5 seconds
          setTimeout(() => {
            this.successMessage = null;
          }, 5000);
        },
        error: (error) => {
          console.error('Error borrowing book:', error);
          this.error = error.error?.message || 'Failed to borrow book. Please try again.';
          this.isSubmitting = false;
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.borrowForm.controls).forEach(key => {
        this.borrowForm.get(key)?.markAsTouched();
      });
    }
  }

  // Helper methods for form validation
  isFieldInvalid(fieldName: string): boolean {
    const field = this.borrowForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.borrowForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
      }
      if (field.errors['pastDate']) {
        return 'Due date must be in the future';
      }
      if (field.errors['tooFarInFuture']) {
        return 'Due date cannot be more than 90 days in the future';
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      bookId: 'Book selection',
      borrowerId: 'Member selection',
      dueDate: 'Due date'
    };
    return displayNames[fieldName] || fieldName;
  }

  getSelectedBookTitle(): string {
    const bookId = this.borrowForm.get('bookId')?.value;
    const book = this.books.find(b => b._id === bookId);
    return book ? book.title : '';
  }

  getSelectedBorrowerName(): string {
    const borrowerId = this.borrowForm.get('borrowerId')?.value;
    const borrower = this.borrowers.find(b => b._id === borrowerId);
    return borrower ? borrower.name : '';
  }

  getTomorrowDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }
}
