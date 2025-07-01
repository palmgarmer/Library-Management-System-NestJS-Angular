import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Book } from '../../../models/book.model';
import { Borrower } from '../../../models/borrower.model';
import { Lending, LendingStatus } from '../../../models/lending.model';
import { BorrowFormComponent } from '../borrow-form/borrow-form';

@Component({
  selector: 'app-lending-main',
  imports: [CommonModule, ReactiveFormsModule, BorrowFormComponent, TitleCasePipe],
  templateUrl: './lending-main.html',
  styleUrl: './lending-main.scss'
})
export class LendingMainComponent implements OnInit {
  currentLoans: Lending[] = [];
  overdueLoans: Lending[] = [];
  isLoading = true;
  error: string | null = null;
  
  // Tab management
  activeTab: 'current' | 'borrow' | 'overdue' = 'current';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLendingData();
  }

  loadLendingData(): void {
    this.isLoading = true;
    this.error = null;
    
    // Load current loans and overdue loans
    this.apiService.getLendings().subscribe({
      next: (lendings) => {
        this.currentLoans = lendings.filter(l => 
          l.status === LendingStatus.BORROWED || l.status === LendingStatus.OVERDUE
        );
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading lending data:', error);
        this.error = 'Failed to load lending data. Please try again.';
        this.isLoading = false;
      }
    });

    // Load overdue loans
    this.apiService.getOverdueBooks().subscribe({
      next: (overdueLoans) => {
        this.overdueLoans = overdueLoans;
      },
      error: (error) => {
        console.error('Error loading overdue loans:', error);
      }
    });
  }

  setActiveTab(tab: 'current' | 'borrow' | 'overdue'): void {
    this.activeTab = tab;
  }

  onReturnBook(lending: Lending): void {
    if (lending._id && confirm(`Are you sure you want to return "${lending.book?.title}"?`)) {
      this.apiService.returnBook(lending._id).subscribe({
        next: () => {
          this.loadLendingData(); // Refresh the data
        },
        error: (error) => {
          console.error('Error returning book:', error);
          alert('Failed to return book. Please try again.');
        }
      });
    }
  }

  onBookBorrowed(): void {
    // Refresh data when a book is successfully borrowed
    this.loadLendingData();
    this.setActiveTab('current'); // Switch to current loans tab
  }

  formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  getDaysOverdue(dueDate: Date | string): number {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = today.getTime() - due.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  isOverdue(dueDate: Date | string): boolean {
    return new Date(dueDate) < new Date();
  }
}
