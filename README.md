# Project Name: Ecommerce Platform 

---

## Tech Stack

### Frontend:
1. **React** with **TypeScript** Zustand for Global state management

2. **Tailwind CSS**

### Backend:
1. **Express.js**
2. **jsonwebtoken** (JWT) for authentication (using Cookies)
3. **bcrypt** for password hashing
4. **CORS** for handling cross-origin requests

### Database:
1. **MySQL** for RDBMS - mainly for maintaining relationship between tables using Normalisation.

---

.env (for protecting sensitive information with the help of dotenv)
PORT=5000
JWT_SECRET_KEY=your_jwt_secret_key_here
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_username
DB_PWD=your_db_password
DATABASE=your_database_name

## Features
- Authentication (Signup, Login, Logout)
- CRUD operations for products, orders, and customers
- Pagination, search, and filtering for products

---

## Setup Instructions

### Prerequisites:
- **Node.js** (Recommended version: v14.x or later)
- **MySQL** database
- **Postman** (for API testing)

### 1. Clone the repository
```bash
git clone 
cd clonedFolder


### Explanation of Setup Instructions:

1. **Prerequisites**: 
   - ReactJs with Typescript,TailwindCSS, Node.js, Express.Js, MySQL, and Postman.

2. **Run the backend and frontend**: 
   backend 
   - cd backend 
   - npm install
   - npm run dev
  frontend
    - cd frontend 
    - npm install
    - npm run dev

  configure mysql and seed the database with backend/model/schema.text  
    

3. **Testing the API**: 

   ## API Documentation

You can access the full API documentation for this project through Postman:

[API Documentation - Postman](https://documenter.getpostman.com/view/31840272/2sB2jAanp2)








