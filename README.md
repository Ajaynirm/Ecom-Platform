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

### 🧩 Variable	                 📝 Description
*** PORT	🌐                  The port your backend server runs on (e.g., 5000)**
***JWT_SECRET_KEY	🔐         Secret key used to sign/verify JWTs for authentication**
***DB_HOST	🏠               Host address of your database (e.g., localhost or a remote DB URL)**
***DB_PORT	🔌               Port on which your database is running (5432 for PostgreSQL)**
***DB_USER	👤               Username used to connect to the database**
***DB_PWD	🔑               Password for the database user**
***DATABASE	🗂️               Name of your specific database to connect to**

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








