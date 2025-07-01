import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Book } from '../../../models/book.model';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.isLoading = true;
    this.error = null;
    
    this.apiService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading books:', error);
        this.error = 'Failed to load books. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onAddBook(): void {
    // Navigate to add book form
    this.router.navigate(['/books/add']);
  }

  onEditBook(book: Book): void {
    // Navigate to edit book form
    this.router.navigate(['/books/edit', book._id]);
  }

  onDeleteBook(book: Book): void {
    if (book._id && confirm(`Are you sure you want to delete "${book.title}"?`)) {
      this.apiService.deleteBook(book._id).subscribe({
        next: () => {
          this.loadBooks(); // Refresh the list
        },
        error: (error) => {
          console.error('Error deleting book:', error);
          alert('Failed to delete book. Please try again.');
        }
      });
    }
  }
}
