# 📚 Library Management System

> A comprehensive full-stack library management system built with **NestJS**, **MongoDB**, and **Angular**.

[![NestJS](https://img.shields.io/badge/Backend-NestJS-red?style=flat-square&logo=nestjs)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?style=flat-square&logo=mongodb)](https://mongodb.com/)
[![Angular](https://img.shields.io/badge/Frontend-Angular-red?style=flat-square&logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=flat-square&logo=typescript)](https://typescriptlang.org/)

## 🎯 **Project Overview**

This system provides a complete solution for managing library operations including:

- **📖 Book Management** - Add, update, search, and organize books
- **✍️ Author Management** - Manage author information and relationships
- **👥 Borrower Management** - Handle library member registration and profiles
- **🔄 Lending System** - Track book loans, returns, and due dates (Coming Soon)
- **📊 Reporting & Analytics** - Generate insights and reports (Coming Soon)

## 🏗️ **Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   Angular SPA   │◄──►│   NestJS API    │◄──►│   MongoDB       │
│   (Frontend)    │    │   (Backend)     │    │   (Database)    │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 **Project Structure**

```
Library-Management-System-NestJS-Angular/
├── 📂 backend/                   # NestJS API Server
│   ├── src/
│   │   ├── controllers/          # API Controllers
│   │   ├── services/             # Business Logic
│   │   ├── schemas/              # MongoDB Schemas
│   │   ├── dto/                  # Data Transfer Objects
│   │   └── main.ts              # Application Entry Point
│   ├── test/                     # Backend Tests
│   └── package.json
├── 📂 frontend/                  # Angular Application (Coming Soon)
├── 📂 postman/                   # API Testing Collection
│   ├── Library-Management-API.postman_collection.json
│   ├── Library-Management-Environment.postman_environment.json
│   └── README.md
├── 📂 docs/                      # Project Documentation
└── README.md                     # This file
```

## 🚀 **Quick Start**

### Prerequisites

- **Node.js** (v18+ recommended)  
- **MongoDB** (local or MongoDB Atlas)
- **Git**

### 1. Clone Repository

```bash
git clone https://github.com/palmgarmer/Library-Management-System-NestJS-Angular.git
cd Library-Management-System-NestJS-Angular
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB connection string

# Start the development server
npm run start:dev
```

The API will be available at: `http://localhost:3002`

### 3. API Documentation

Visit the **Swagger UI** at: `http://localhost:3002/api`

### 4. Test with Postman

1. Import the collection from `postman/Library-Management-API.postman_collection.json`
2. Import the environment from `postman/Library-Management-Environment.postman_environment.json`
3. Start testing the APIs!

## 📋 **Available APIs**

### 📚 **Books**
- `POST /books` - Create a new book
- `GET /books` - Get all books
- `GET /books/:id` - Get book by ID
- `PATCH /books/:id` - Update book
- `DELETE /books/:id` - Delete book

### ✍️ **Authors**
- `POST /authors` - Create a new author
- `GET /authors` - Get all authors
- `GET /authors/:id` - Get author by ID
- `GET /authors/:id/books` - Get books by author
- `PATCH /authors/:id` - Update author
- `DELETE /authors/:id` - Delete author

### 👥 **Borrowers**
- `POST /borrowers` - Create a new borrower
- `GET /borrowers` - Get all borrowers
- `GET /borrowers/:id` - Get borrower by ID
- `PATCH /borrowers/:id` - Update borrower
- `DELETE /borrowers/:id` - Delete borrower

## 🧪 **Testing**

### Backend Tests
```bash
cd backend

# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### API Testing
Use the provided Postman collection for comprehensive API testing.

## 🛠️ **Development Scripts**

### Backend Development
```bash
cd backend

# Development mode with hot-reload
npm run start:dev

# Production build
npm run build

# Production mode
npm run start:prod

# Linting
npm run lint

# Format code
npm run format
```

## 📊 **Current Features**

### ✅ **Completed**
- [x] **RESTful API** with NestJS
- [x] **MongoDB Integration** with Mongoose
- [x] **Book Management** - Full CRUD operations
- [x] **Author Management** - Full CRUD operations  
- [x] **Borrower Management** - Full CRUD operations
- [x] **Book-Author Relationships** - Linked data management
- [x] **Input Validation** - DTO validation with class-validator
- [x] **Error Handling** - Comprehensive error responses
- [x] **API Documentation** - Auto-generated Swagger docs
- [x] **Database Schemas** - Well-defined MongoDB schemas
- [x] **Postman Collection** - Complete API testing suite

### 🔄 **In Progress**
- [ ] **Lending System** - Book borrowing and returning
- [ ] **Due Date Management** - Track overdue books
- [ ] **Search & Filtering** - Advanced book search
- [ ] **Unit & E2E Tests** - Comprehensive test coverage

### 📋 **Planned**
- [ ] **Angular Frontend** - Modern web interface
- [ ] **Authentication & Authorization** - User management
- [ ] **Reporting Dashboard** - Analytics and insights
- [ ] **Email Notifications** - Overdue book reminders
- [ ] **Docker Containerization** - Easy deployment
- [ ] **Azure Deployment** - Cloud hosting

## 🏗️ **Technology Stack**

### **Backend**
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Swagger** - API documentation
- **class-validator** - Input validation
- **class-transformer** - Object transformation

### **Frontend (Planned)**
- **Angular** - Modern web framework
- **Angular Material** - UI component library
- **RxJS** - Reactive programming
- **TypeScript** - Type-safe development

### **Development Tools**
- **Postman** - API testing
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🤝 **Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 **Author**

**Palm Garmer**
- GitHub: [@palmgarmer](https://github.com/palmgarmer)
- Project: [Library Management System](https://github.com/palmgarmer/Library-Management-System-NestJS-Angular)

## 🙏 **Acknowledgments**

- NestJS documentation and community
- MongoDB documentation
- Angular team for the amazing framework
- All contributors and supporters

---

## 📞 **Support**

If you have any questions or need help, please:

1. Check the [documentation](docs/)
2. Review the [Postman collection](postman/)
3. Open an [issue](https://github.com/palmgarmer/Library-Management-System-NestJS-Angular/issues)

---

**⭐ If you find this project helpful, please give it a star!**
