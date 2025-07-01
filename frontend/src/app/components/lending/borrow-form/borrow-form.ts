import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Book } from '../../../models/book.model';
import { Borrower } from '../../../models/borrower.model';
import { CreateLendingDto } from '../../../models/lending.model';

@Component({
  selector: 'app-borrow-form',
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
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

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.borrowForm = this.fb.group({
      bookId: ['', Validators.required],
      borrowerId: ['', Validators.required],
      dueDate: ['', Validators.required]
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
        next: () => {
          this.bookBorrowed.emit(); // Notify parent component
          this.borrowForm.reset();
          this.setDefaultDueDate();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error borrowing book:', error);
          this.error = error.error?.message || 'Failed to borrow book. Please try again.';
          this.isSubmitting = false;
        }
      });
    }
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
