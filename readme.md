# RBAC News Web Backend

This project is the backend for a news management system using Role-Based Access Control (RBAC) with two main roles: Admin and User. Admin has full control over news categories and news itself, while Users or Visitors can only view the news list, news details, and search for news.

## Features

### 1. Admin
Admin can perform the following actions:
- **Login/Logout**: Manage login/logout sessions using JWT (JSON Web Token).
- **Add/Edit/Delete News Categories**: Admin can manage news categories.
- **Add/Edit/Delete News**: Admin can manage news, including adding, editing, and deleting news.

### 2. User / Visitor
Users or Visitors can perform the following actions:
- **View News List**: Display all available news.
- **View News Details**: Show the full details of a particular news article.
- **Search News**: A search feature to find news articles by keywords.

## Technologies Used

- **Prisma**: ORM for managing PostgreSQL database.
- **JWT (JSON Web Token)**: For handling user authentication and authorization.
- **TypeScript**: Provides type safety during development.
- **Express**: Framework for building the API server.
- **PostgreSQL**: Relational database to store news data and categories.

## How to Use This Project

### 1. Clone the Repository

```bash
git clone https://github.com/username/rbac-news-web-backend.git
cd rbac-news-web-backend
npm install
```

### 2. Configuration

Create a .env File: Copy the .env.example to .env and configure the necessary variables like the database connection and JWT secret key.

Example .env:
```bash
    DATABASE_URL=postgresql://user:password@localhost:5432/dbname
    JWT_SECRET=your-jwt-secret-key
```

### 3. Migrate Database

Use Prisma to run the database migrations for PostgreSQL.
```bash
npx prisma migrate dev
```

### 4. Run the Project

To run the server:
```bash
npm run dev
```
The API will be available at http://localhost:3000.

## API Endpoints

### Auth
- **POST /login**: Login with email and password, returns JWT.
- **POST /logout**: Logout and invalidate the JWT token.

### Admin - News Categories
- **GET /categories**: Get the list of news categories.
- **POST /categories**: Add a new news category (Admin only).
- **PUT /categories/:id**: Edit a news category by ID (Admin only).
- **DELETE /categories/:id**: Delete a news category by ID (Admin only).

### Admin - News
- **GET /news**: Get the list of news articles.
- **POST /news**: Add a new news article (Admin only).
- **PUT /news/:id**: Edit a news article by ID (Admin only).
- **DELETE /news/:id**: Delete a news article by ID (Admin only).

### User - News
- **GET /news**: Get the list of news articles for users.
- **GET /news/:id**: Get details of a news article by ID.
- **GET /search**: Search news articles by query.


### Directory Structure
```bash
/src
  /config        # Congiguration for prisma
  /controllers   # Logic to handle API requests
  /middlewares   # Middleware for authentication and authorization
  /routes        # API routes
```