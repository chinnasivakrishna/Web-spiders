
---

# Web Spider Task Manager

Web Spider Task Manager is a full-stack task management application built with Node.js, Express, MongoDB, and JWT authentication. It allows users to register, log in, and manage their tasks effectively with features like task creation, updating, filtering, and deletion.

---

## Features

### Authentication
- **User Registration**: Register with a username, email, and password.
- **User Login**: Log in with email and password to get a JWT token.
- **JWT Authentication**: Protect routes with JWT-based authentication.

### Task Management
- **Create Tasks**: Add new tasks with details such as title, description, status, priority, and due date.
- **View Tasks**: Fetch all tasks with filters (status, priority) and sorting (due date or creation date).
- **Edit Tasks**: Update task details like status or priority.
- **Delete Tasks**: Remove tasks permanently.

---

## Tech Stack

### Backend
- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for building REST APIs.
- **MongoDB**: NoSQL database for storing user and task data.
- **Mongoose**: ODM library for MongoDB.
- **JWT**: For secure authentication.
- **Bcrypt**: Password hashing for security.

### Middleware
- **Morgan**: HTTP request logger.
- **Custom Middleware**: Error handling and JWT authentication.

---

## Live Demo

- **Deployed Link**: [Web Spider Task Manager](https://web-spiders-ruuh.onrender.com/)

---

## Postman Collection

Access the complete Postman collection to test the API endpoints:  
[Postman Collection Link]([https://your-postman-collection-link.com](https://web-spiders.postman.co/workspace/68cf3458-2206-4c0c-b68c-8205865b0cc6/collection/31655496-8cfb1764-8a46-48d7-928f-3589badd9b89?action=share&source=copy-link&creator=31655496))

---

## Installation and Setup

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) database running locally or remotely.
- A `.env` file with the following keys:
  ```env
  PORT=5000
  MONGO_URI=your_mongo_connection_string
  JWT_SECRET=your_jwt_secret
  ```

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/web-spider-task-manager.git
   cd web-spider-task-manager
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Server**:
   ```bash
   node app.js
   ```
   The application will run on [http://localhost:5000](http://localhost:5000).

---

## API Endpoints

### Authentication Routes (`/api/user`)
- **POST `/register`**: Register a new user.
  ```json
  {
    "username": "example",
    "email": "example@example.com",
    "password": "securepassword"
  }
  ```
- **POST `/login`**: Log in as a registered user.
  ```json
  {
    "email": "example@example.com",
    "password": "securepassword"
  }
  ```

### Task Routes (`/api/tasks`)
- **POST `/tasks`**: Create a new task (JWT protected).
- **GET `/tasks`**: Get all tasks with optional filters (status, priority) and sorting (due date or creation date).
- **GET `/tasks/:id`**: Fetch a single task by ID (JWT protected).
- **PUT `/tasks/:id`**: Update a task by ID (JWT protected).
- **DELETE `/tasks/:id`**: Delete a task by ID (JWT protected).

---

## Models

### User Model
```javascript
{
  username: String,
  email: String,
  password: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```javascript
{
  title: String,
  description: String,
  status: ["TODO", "IN_PROGRESS", "COMPLETED"],
  priority: ["LOW", "MEDIUM", "HIGH"],
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Middleware
1. **Authentication Middleware**: Verifies JWT tokens for protected routes.
2. **Error Handler**: Catches and formats server errors.

---

## Validation
- **Task Validation**: Joi schema validates task input before saving.

---

## Future Enhancements
- User roles and permissions.
- Integration with external APIs.
- Real-time updates using WebSockets.

---

## Author
Developed by [Chinna Siva Krishna Thota]([https://github.com/your-profile](https://github.com/chinnasivakrishna)).

