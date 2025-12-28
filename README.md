
# Server – Backend API 

This repository contains a backend REST API built while learning Node.js backend development.
The goal of this project is to understand backend fundamentals such as routing, controllers, database integration, and basic authentication.

This is a learning project and is not production-ready.


## Features

- REST API built with Express.js
- MySQL database integration using Sequelize
- Clean folder structure with routes and controllers
- Basic admin authentication logic
- CRUD operations for resources
- Environment variable configuration

## What I Learned From This Project

- How HTTP request and response flow works
- How to structure a backend project properly
- How to connect Node.js with MySQL
- How Sequelize ORM works internally
- Basics of authentication and password hashing
## Tech Stack

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- bcrypt
- JWT (basic usage)
## Installation

#### Step 1: Clone the repository

git clone https://github.com/muthugopi/server.git

```
cd server
```

#### Step 2: Install dependencies

```
npm install
```

#### Step 3: Create environment file

```
cp .env.example .env
```

#### Step 4: Configure environment variables in .env
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdbname
JWT_SECRET=your_secret_key
```
#### Step 5: Run the server

```
npm run dev
```

Server will run at : 
http://localhost:3000
## Limitations

- No automated tests yet
- No database migrations
- No role-based access control
- Minimal input validation
- Not optimized for production
## Future Improvements

- Add API tests using Jest and Supertest
- Add Sequelize migrations and seeders
- Improve authentication with refresh tokens
- Add request validation
- Add security middleware such as rate limiting
- Dockerize the application
## Project Status

- Learning project
- Backend fundamentals implemented
- Actively improving
## Authors

- [@muthugopi](https://www.github.com/muthugopi)

