# Library Management System - Postman Collection

This directory contains Postman collection and environment files for testing the Library Management System API.

## 📁 Files

- `Library-Management-API.postman_collection.json` - Complete API collection with all endpoints
- `Library-Management-Environment.postman_environment.json` - Environment variables for different setups

## 🚀 Quick Start

### 1. Import to Postman

1. Open Postman
2. Click **Import** button
3. Drag and drop both files or click **Upload Files**
4. Select both JSON files to import

### 2. Set Up Environment

1. In Postman, click the environment dropdown (top right)
2. Select **Library Management Environment**
3. Verify the `baseUrl` is set to `http://localhost:3002`

### 3. Start Testing

1. Make sure your NestJS server is running (`npm run start:dev`)
2. Start with the **Test Data Creation** folder to create sample data
3. Test individual endpoints or run the entire collection

## 📋 Collection Structure

### 🏥 Health Check
- **Get API Status** - Check if the API is running

### 📚 Books
- **Create Book** - Add a new book to the library
- **Get All Books** - Retrieve all books
- **Get Book by ID** - Get a specific book
- **Update Book** - Update book information
- **Delete Book** - Remove a book from the library

### ✍️ Authors
- **Create Author** - Add a new author
- **Get All Authors** - Retrieve all authors
- **Get Author by ID** - Get a specific author
- **Get Books by Author** - Get all books by an author
- **Update Author** - Update author information
- **Delete Author** - Remove an author

### 👥 Borrowers
- **Create Borrower** - Add a new library member
- **Get All Borrowers** - Retrieve all borrowers
- **Get Borrower by ID** - Get a specific borrower
- **Update Borrower** - Update borrower information
- **Delete Borrower** - Remove a borrower

### 🧪 Test Data Creation
- **Create Sample Author** - Creates an author and saves ID to environment
- **Create Sample Book** - Creates a book linked to the sample author
- **Create Sample Borrower** - Creates a borrower for testing

### ❌ Error Handling Tests
- **Get Non-existent Records** - Test 404 error handling
- **Create Invalid Records** - Test validation error handling

## 🔄 Environment Variables

The collection uses these environment variables:

- `baseUrl` - API base URL (default: http://localhost:3002)
- `authorId` - Auto-populated when creating authors
- `bookId` - Auto-populated when creating books  
- `borrowerId` - Auto-populated when creating borrowers

## 🎯 Recommended Testing Flow

1. **Start with Test Data Creation:**
   - Run "Create Sample Author" first
   - Then "Create Sample Book" (uses the author ID)
   - Finally "Create Sample Borrower"

2. **Test CRUD Operations:**
   - Use the sample data IDs for testing updates and deletions
   - Test relationships (e.g., "Get Books by Author")

3. **Test Error Handling:**
   - Try invalid IDs to test 404 responses
   - Try invalid data to test validation

## 📊 Sample Data

The collection includes realistic sample data:

**Authors:**
- Agatha Christie (Mystery writer)
- F. Scott Fitzgerald (Classic American literature)

**Books:**
- Murder on the Orient Express
- The Great Gatsby

**Borrowers:**
- Emily Davis (Active member)
- John Doe (Various membership statuses)

## 🛠️ Advanced Features

### Auto-Generated IDs
Test data creation requests automatically save generated IDs to environment variables using Postman's test scripts.

### Validation Testing
Error handling tests include common validation scenarios:
- Empty required fields
- Invalid email formats
- Invalid enum values
- Malformed object IDs

### Pre-request Scripts
Some requests include pre-request scripts to ensure proper test data setup.

## 🔧 Customization

### Different Environments
You can create multiple environments for:
- Development (`http://localhost:3002`)
- Staging (`https://your-staging-api.com`)
- Production (`https://your-production-api.com`)

### Adding New Endpoints
When you add new endpoints to your API:
1. Add new requests to the appropriate folder
2. Include proper descriptions and examples
3. Add test scripts if needed
4. Update this README

## 🐛 Troubleshooting

### Common Issues

1. **Connection Refused**
   - Ensure NestJS server is running
   - Check the `baseUrl` in environment

2. **404 Errors**
   - Verify the endpoint URLs match your API
   - Check if the resource exists

3. **Validation Errors**
   - Review the request body format
   - Check required fields and data types

### Getting Help
- Check the Swagger documentation at `http://localhost:3002/api`
- Review the NestJS server logs for detailed error messages
- Ensure MongoDB is running and connected

## 📝 Notes

- All requests include proper Content-Type headers
- Response examples are included for documentation
- Error scenarios are tested to ensure robust API behavior
- The collection is designed to be self-contained and runnable without external dependencies
