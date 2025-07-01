import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Book } from '../models/book.model';
import { Borrower } from '../models/borrower.model';
import { Lending, CreateLendingDto, BookAvailability } from '../models/lending.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Book API
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books`);
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/books/${id}`);
  }

  createBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/books`, book);
  }

  updateBook(id: string, book: Partial<Book>): Observable<Book> {
    return this.http.patch<Book>(`${this.baseUrl}/books/${id}`, book);
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/books/${id}`);
  }

  // Author API
  getAuthors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/authors`);
  }

  getAuthor(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/authors/${id}`);
  }

  createAuthor(author: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/authors`, author);
  }

  // Borrower API
  getBorrowers(): Observable<Borrower[]> {
    return this.http.get<Borrower[]>(`${this.baseUrl}/borrowers`);
  }

  getBorrower(id: string): Observable<Borrower> {
    return this.http.get<Borrower>(`${this.baseUrl}/borrowers/${id}`);
  }

  createBorrower(borrower: Partial<Borrower>): Observable<Borrower> {
    return this.http.post<Borrower>(`${this.baseUrl}/borrowers`, borrower);
  }

  updateBorrower(id: string, borrower: Partial<Borrower>): Observable<Borrower> {
    return this.http.patch<Borrower>(`${this.baseUrl}/borrowers/${id}`, borrower);
  }

  deleteBorrower(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/borrowers/${id}`);
  }

  // Lending API
  getLendings(): Observable<Lending[]> {
    return this.http.get<Lending[]>(`${this.baseUrl}/lending`);
  }

  getLending(id: string): Observable<Lending> {
    return this.http.get<Lending>(`${this.baseUrl}/lending/${id}`);
  }

  borrowBook(lending: CreateLendingDto): Observable<Lending> {
    return this.http.post<Lending>(`${this.baseUrl}/lending/borrow`, lending);
  }

  returnBook(id: string): Observable<Lending> {
    return this.http.patch<Lending>(`${this.baseUrl}/lending/return/${id}`, {});
  }

  getOverdueBooks(): Observable<Lending[]> {
    return this.http.get<Lending[]>(`${this.baseUrl}/lending/overdue`);
  }

  getBorrowerHistory(borrowerId: string): Observable<Lending[]> {
    return this.http.get<Lending[]>(`${this.baseUrl}/lending/borrower/${borrowerId}/history`);
  }

  getBorrowerCurrentLoans(borrowerId: string): Observable<Lending[]> {
    return this.http.get<Lending[]>(`${this.baseUrl}/lending/borrower/${borrowerId}/current`);
  }

  getBookAvailability(bookId: string): Observable<BookAvailability> {
    return this.http.get<BookAvailability>(`${this.baseUrl}/lending/book/${bookId}/availability`);
  }

  updateOverdueStatus(): Observable<{ updated: number }> {
    return this.http.post<{ updated: number }>(`${this.baseUrl}/lending/update-overdue-status`, {});
  }
}
