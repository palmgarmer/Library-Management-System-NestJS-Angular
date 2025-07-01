import { Book } from './book.model';
import { Borrower } from './borrower.model';

export interface Lending {
  _id?: string;
  bookId: string;
  borrowerId: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: LendingStatus;
  book?: Book;
  borrower?: Borrower;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum LendingStatus {
  BORROWED = 'borrowed',
  RETURNED = 'returned',
  OVERDUE = 'overdue',
}

export interface CreateLendingDto {
  bookId: string;
  borrowerId: string;
  loanPeriodDays?: number;
}

export interface BookAvailability {
  available: boolean;
  totalCopies: number;
  availableCopies: number;
  borrowedCopies: number;
}
