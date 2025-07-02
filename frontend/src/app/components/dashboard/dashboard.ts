import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Lending, LendingStatus } from '../../models/lending.model';
import { Book } from '../../models/book.model';
import { Borrower } from '../../models/borrower.model';
import { forkJoin, interval, Subscription } from 'rxjs';
import { catchError, of, switchMap } from 'rxjs';

interface DashboardStats {
  totalBooks: number;
  totalBorrowers: number;
  currentLoans: number;
  overdueBooks: number;
  availableBooks: number;
  totalRevenue?: number;
}

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
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
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardStats: DashboardStats = {
    totalBooks: 0,
    totalBorrowers: 0,
    currentLoans: 0,
    overdueBooks: 0,
    availableBooks: 0
  };

  quickActions: QuickAction[] = [
    {
      title: 'Lend a Book',
      description: 'Create new book lending',
      icon: '📚',
      route: '/lending',
      color: 'primary'
    },
    {
      title: 'Add New Book',
      description: 'Register a new book',
      icon: '➕',
      route: '/books',
      color: 'success'
    },
    {
      title: 'Add Member',
      description: 'Register new member',
      icon: '👤',
      route: '/borrowers',
      color: 'info'
    },
    {
      title: 'Overdue Books',
      description: 'View overdue returns',
      icon: '⚠️',
      route: '/lending',
      color: 'warning'
    }
  ];

  recentLendings: Lending[] = [];
  isLoading = true;
  lastUpdated: Date = new Date();
  private refreshSubscription?: Subscription;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.startAutoRefresh();
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  private startAutoRefresh(): void {
    // Refresh dashboard data every 30 seconds
    this.refreshSubscription = interval(30000)
      .pipe(
        switchMap(() => this.getDashboardData())
      )
      .subscribe({
        next: (data) => {
          this.calculateStats(data.books, data.borrowers, data.lendings, data.overdueBooks);
          this.setRecentActivity(data.lendings);
          this.lastUpdated = new Date();
        },
        error: (error) => console.error('Auto-refresh error:', error)
      });
  }

  private getDashboardData() {
    return forkJoin({
      books: this.apiService.getBooks().pipe(catchError(() => of([]))),
      borrowers: this.apiService.getBorrowers().pipe(catchError(() => of([]))),
      lendings: this.apiService.getLendings().pipe(catchError(() => of([]))),
      overdueBooks: this.apiService.getOverdueBooks().pipe(catchError(() => of([])))
    });
  }

  loadDashboardData(): void {
    this.isLoading = true;

    // Load all required data in parallel
    this.getDashboardData().subscribe({
      next: (data) => {
        this.calculateStats(data.books, data.borrowers, data.lendings, data.overdueBooks);
        this.setRecentActivity(data.lendings);
        this.lastUpdated = new Date();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.isLoading = false;
      }
    });
  }

  private calculateStats(books: Book[], borrowers: Borrower[], lendings: Lending[], overdueBooks: Lending[]): void {
    const availableBooks = books.reduce((sum, book) => sum + (book.availableCopies || 0), 0);
    
    this.dashboardStats = {
      totalBooks: books.length,
      totalBorrowers: borrowers.length,
      currentLoans: lendings.filter(l => l.status === LendingStatus.BORROWED || l.status === LendingStatus.OVERDUE).length,
      overdueBooks: overdueBooks.length,
      availableBooks: availableBooks
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

  refreshDashboard(): void {
    this.loadDashboardData();
  }

  navigateToQuickAction(action: QuickAction): void {
    if (action.route === '/lending' && action.title === 'Overdue Books') {
      // Navigate to lending page and set overdue tab active
      this.router.navigate(['/lending'], { fragment: 'overdue' });
    } else {
      this.router.navigate([action.route]);
    }
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
