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

## 📁 Create `.env` File (in `backend/` root directory)
**PORT = 11000**
---
**JWT_SECRET_KEY	=  "salt pepper khann"**
---
***DB_HOST	= 127.0.0.1**
---
***DB_PORT =  3306**
---
***DB_USER = root**
---
***DB_PWD = 12345678***
---
***DATABASE	= Ecommerce_database**       
---
# 🚀 Project Setup Instructions
---
## Frontend Setup:

- Cd frontend
- npm install
- npm run dev
---
## Backend Setup:
---
- Cd backend
- npm install
- npm run dev
---
## Database Setup:

- Create database named  Ecommerce_database in mysql workbench software.
- Add database identity in .env file:
- DB_HOST= 127.0.0.1
- DB_PORT=3306
- DB_USER=root
- DB_PWD=12345678
- DATABASE=Ecommerce_database
---
# Start mysql server at your local system …
---


## Features
- Authentication (Signup, Login, Logout)
- CRUD operations for products, orders, and customers
- Pagination, search, and filtering for products

---




![Order History Page](/frontend/src/assets/im1.png)
![mobile order page](/frontend/src/assets/im2.png)
![cart page](/frontend/src/assets/im3.png)
![Admin product management](/frontend/src/assets/im4.png)

![Add Product page](/frontend/src/assets/im5.png)
![Edit Product Page](/frontend/src/assets/im6.png)
![Delete Product page](/frontend/src/assets/im7.png)
![Admin Customer management](/frontend/src/assets/im8.png)

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

[API Documentation - Postman]
---
(https://documenter.getpostman.com/view/31840272/2sB2jAanp2)












