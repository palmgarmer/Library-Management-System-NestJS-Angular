# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-01

### Added
- **NestJS Backend API** - Complete RESTful API with TypeScript
- **MongoDB Integration** - Database setup with Mongoose ODM
- **Book Management** - Full CRUD operations for books
  - Create, read, update, delete books
  - Book-author relationship management
  - ISBN validation and unique constraints
- **Author Management** - Full CRUD operations for authors
  - Author profile management
  - Books by author endpoint
  - Biography and nationality tracking
- **Borrower Management** - Library member management
  - Member registration and profile management
  - Membership status tracking (active, inactive, suspended)
  - Contact information management
- **Data Validation** - Comprehensive input validation
  - DTO validation with class-validator
  - Custom validation rules for ISBNs, emails, etc.
  - Error handling with proper HTTP status codes
- **API Documentation** - Auto-generated Swagger documentation
  - Interactive API explorer at `/api`
  - Complete endpoint documentation with examples
  - Request/response schema definitions
- **Database Schemas** - Well-defined MongoDB schemas
  - Book schema with author relationships
  - Author schema with book references
  - Borrower schema with membership management
  - Timestamps and soft delete support
- **Postman Collection** - Comprehensive API testing suite
  - Complete collection with all endpoints
  - Environment variables for easy testing
  - Sample data creation scripts
  - Error handling test scenarios
- **Repository Structure** - Organized monorepo setup
  - Separate backend and frontend directories
  - Centralized documentation and testing
  - Root-level scripts for easy development

### Technical Details
- **Framework**: NestJS v10.x with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Validation**: class-validator and class-transformer
- **Documentation**: Swagger/OpenAPI 3.0
- **Testing**: Jest framework with Postman collection
- **Code Quality**: ESLint and Prettier configuration

### API Endpoints
#### Books
- `POST /books` - Create new book
- `GET /books` - Get all books
- `GET /books/:id` - Get book by ID
- `PATCH /books/:id` - Update book
- `DELETE /books/:id` - Delete book

#### Authors
- `POST /authors` - Create new author
- `GET /authors` - Get all authors
- `GET /authors/:id` - Get author by ID
- `GET /authors/:id/books` - Get books by author
- `PATCH /authors/:id` - Update author
- `DELETE /authors/:id` - Delete author

#### Borrowers
- `POST /borrowers` - Create new borrower
- `GET /borrowers` - Get all borrowers
- `GET /borrowers/:id` - Get borrower by ID
- `PATCH /borrowers/:id` - Update borrower
- `DELETE /borrowers/:id` - Delete borrower

### Files Added
- Complete NestJS backend in `backend/` directory
- Postman collection and environment in `postman/` directory
- Comprehensive documentation in `docs/` directory
- Project README with setup instructions
- Monorepo configuration files

## [Unreleased]

### Planned Features
- **Lending System** - Book borrowing and return management
- **Angular Frontend** - Modern web interface
- **Authentication** - User authentication and authorization
- **Search & Filtering** - Advanced book search capabilities
- **Email Notifications** - Overdue book reminders
- **Reporting Dashboard** - Analytics and insights
- **Unit & E2E Tests** - Comprehensive test coverage
- **Docker Containerization** - Development and production containers
- **Azure Deployment** - Cloud hosting setup

### In Progress
- Lending entity for tracking book loans
- Due date management system
- Enhanced error handling and logging
