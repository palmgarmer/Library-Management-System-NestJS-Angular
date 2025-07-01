export interface Book {
  _id?: string;
  title: string;
  isbn: string;
  genre: string;
  publishedDate: Date;
  description?: string;
  totalCopies: number;
  availableCopies: number;
  authorId: string;
  author?: Author;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Author {
  _id?: string;
  name: string;
  biography?: string;
  birthDate?: Date;
  nationality?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
