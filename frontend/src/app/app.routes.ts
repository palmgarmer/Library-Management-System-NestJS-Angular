import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { BookListComponent } from './components/books/book-list/book-list';
import { MemberListComponent } from './components/members/member-list/member-list';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'books', component: BookListComponent },
  { path: 'borrowers', component: MemberListComponent },
  // TODO: Add more routes for lending, etc.
];
