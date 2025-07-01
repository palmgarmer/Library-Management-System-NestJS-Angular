import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { BookListComponent } from './components/books/book-list/book-list';
import { MemberListComponent } from './components/members/member-list/member-list';
import { LendingMainComponent } from './components/lending/lending-main/lending-main';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'books', component: BookListComponent },
  { path: 'borrowers', component: MemberListComponent },
  { path: 'lending', component: LendingMainComponent },
  // TODO: Add more specific routes for lending operations
];
