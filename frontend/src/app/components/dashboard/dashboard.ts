import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Lending, LendingStatus } from '../../models/lending.model';
import { Book } from '../../models/book.model';
import { Borrower } from '../../models/borrower.model';
import { forkJoin } from 'rxjs';
import { catchError, of } from 'rxjs';

interface DashboardStats {
  totalBooks: number;
  totalBorrowers: number;
  currentLoans: number;
  overdueBooks: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    TitleCasePipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  dashboardStats: DashboardStats = {
    totalBooks: 0,
    totalBorrowers: 0,
    currentLoans: 0,
    overdueBooks: 0
  };

  recentLendings: Lending[] = [];
  isLoading = true;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;

    // Load all required data in parallel
    forkJoin({
      books: this.apiService.getBooks().pipe(catchError(() => of([]))),
      borrowers: this.apiService.getBorrowers().pipe(catchError(() => of([]))),
      lendings: this.apiService.getLendings().pipe(catchError(() => of([]))),
      overdueBooks: this.apiService.getOverdueBooks().pipe(catchError(() => of([])))
    }).subscribe({
      next: (data) => {
        this.calculateStats(data.books, data.borrowers, data.lendings, data.overdueBooks);
        this.setRecentActivity(data.lendings);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.isLoading = false;
      }
    });
  }

  private calculateStats(books: Book[], borrowers: Borrower[], lendings: Lending[], overdueBooks: Lending[]): void {
    this.dashboardStats = {
      totalBooks: books.length,
      totalBorrowers: borrowers.length,
      currentLoans: lendings.filter(l => l.status === LendingStatus.BORROWED || l.status === LendingStatus.OVERDUE).length,
      overdueBooks: overdueBooks.length
    };
  }

  private setRecentActivity(lendings: Lending[]): void {
    // Get the 5 most recent lending activities
    this.recentLendings = lendings
      .sort((a, b) => new Date(b.borrowDate).getTime() - new Date(a.borrowDate).getTime())
      .slice(0, 5);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  getActivityIcon(status: LendingStatus): string {
    switch (status) {
      case LendingStatus.BORROWED:
        return '📚';
      case LendingStatus.RETURNED:
        return '✅';
      case LendingStatus.OVERDUE:
        return '⚠️';
      default:
        return '📋';
    }
  }

  getActivityIconClass(status: LendingStatus): string {
    switch (status) {
      case LendingStatus.BORROWED:
        return 'icon-borrowed';
      case LendingStatus.RETURNED:
        return 'icon-returned';
      case LendingStatus.OVERDUE:
        return 'icon-overdue';
      default:
        return '';
    }
  }

  formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
}
