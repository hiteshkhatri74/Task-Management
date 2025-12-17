# Task Dashboard API Documentation


## Auth APIs

### POST /api/auth/signup
Body:
{
  "name": "John",
  "email": "john@test.com",
  "password": "123456"
}

### POST /api/auth/signin
Body:
{
  "email": "john@test.com",
  "password": "123456"
}

### POST /api/auth/logout

### GET /api/auth/verify
Checks login status (JWT via cookies)

---




## Profile APIs

### GET /api/auth/profile
Fetch logged-in user profile

### PUT /api/auth/update-profile
Body:
{
  "name": "Updated Name",
  "profilePic": "image-url"
}

---



## Task APIs (Protected)

### GET /api/tasks
Fetch all tasks

### POST /api/tasks
Body:
{
  "title": "Task title",
  "description": "Task desc"
}

### PUT /api/tasks/:id
Update task
Body:
{
    "title" : "Task updated title",
    "description" : "Task updated desc"
}

### DELETE /api/tasks/:id
Delete task