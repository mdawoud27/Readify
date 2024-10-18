# Readify - BookStore API Application

## Description

**Readify** is a full-featured bookstore API that allows users to search, browse, and purchase books. It includes user authentication, book reviews, order management, and caching for optimal performance. Admins can manage books, authors, and users, all within a secure and efficient system.

<!-- TODO: Demo -->
<!--
- Deployed Site: [Visit Readify](https://)
- Made by **Mohamed Dawoud**: [GitHub](https://github.com/mdawoud27) | [LinkedIn](https://www.linkedin.com/in/dawoud27) | [Twitter](https://x.com/mad_d27) | [Medium](https://medium.com/@dawoud27) 
 -->

## Features

- **User Authentication:** Secure login and registration using JWT.
- **Book Catalog:** Browse books by title, author, and genre.
- **Book Reviews & Ratings:** Users can submit and view reviews and ratings.
- **Order Management:** Cart and wishlist functionality for seamless book purchasing.
- **Admin Dashboard:** Admins can manage books, authors, and users.
- **Caching:** Redis caching for improving search performance.
- **Payment Integration:** Integration with Stripe or PayPal for handling payments (optional).

## Technologies Used

### Backend

- **Node.js** with **Express**
- **MongoDB** for database management
- **Mongoose** as the ORM for MongoDB
- **Redis** for caching frequently accessed data
- **JWT** for user authentication

### Frontend

- **HTML, CSS, and JavaScript/TypeScript**
- **EJS** for server-side templating

### DevOps

- **Vercel** for deployment using **gitHub actions**

## Getting Started

### Prerequisites

- **Node.js** (v20+)
- **MongoDB** (Local or Cloud, e.g., MongoDB Atlas)
- **Redis** (For caching)
- **Git** (for version control)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mdawoud27/Readify.git
    cd Readify
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up your .env file:

    ```bash
    touch .env
    ```

    Add the following environment variables:

    ```bash
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/readify
    JWT_SECRET=your_jwt_secret
    REDIS_URL=redis://localhost:6379
    ```

4. Run the application:

    ```bash
    npm start
    ```

5. Access the app at `http://localhost:5000`.

## API Endpoints

### Authentication
<!-- TODO: Update the endpoints -->
- **POST /api/auth/register**: Register a new user
- **POST /api/auth/login**: Login a user and receive a JWT token

### Books
<!-- TODO: Update the endpoints -->
- **GET /api/books**: Get a list of all books
- **GET /api/books/**:id: Get a single book by its ID
- **POST /api/books**: Add a new book (Admin only)
- **PUT /api/books/**: Update a book (Admin only)
- **DELETE /api/books/**: Delete a book (Admin only)

### Authors
<!-- TODO: Update the endpoints -->
- **GET /api/authors**: Get a list of all authors
- **POST /api/authors**: Add a new author (Admin only)

### Users
<!-- TODO: Update the endpoints -->
- **GET /api/users/me**: Get the authenticated user’s profile
- **PUT /api/users/me**: Update the authenticated user's profile

### Orders
<!-- TODO: Update the endpoints -->
- **POST /api/orders**: Create a new order
- **GET /api/orders**: Get user’s orders

### Reviews
<!-- TODO: Update the endpoints -->
- **POST /api/books/**
  
  **/reviews**: Add a review to a book

- **GET /api/books/**
  
  **/reviews**: Get all reviews for a book

<!--
## Future Features

- **Email Notifications**: Send users updates on their orders.
- **Search Autocomplete**: Provide search suggestions using Redis.
- **Recommendations**: Recommend books based on user preferences.
- **Docker** for containerization

## Challenges & Solutions

- **Performance Optimization**: Using Redis to cache frequent queries, like book searches.
- **Secure Payments**: Integrating a reliable payment gateway for secure book purchases. 
 -->

<!--
## Development Schedule

| **Task**                         | **Timeline**        |
|----------------------------------|---------------------|
| Project Setup                    | Day 1               |
| User Authentication              | Day 2-3             |
| Book & Author Management         | Day 4-5             |
| Redis Caching                    | Day 6-7             |
| Reviews & Ratings                | Day 8               |
| Order Management                 | Day 9               |
| Frontend (Views, EJS templates)  | Day 10              |
| Payment Gateway Integration      | Day 11              |
| Testing & Debugging              | Day 12              |
| Final Deployment & Documentation | Day 13-14           |
 -->

<!--## Tree of the project

```bash
readify/
├── .github/                # GitHub workflows, actions, etc.
│   └── workflows/
│       └── ci.yml          # GitHub CI workflow for testing
├── config/                 # Configuration files (DB, Redis, etc.)
│   └── db.js               # MongoDB connection
│   └── redis.js            # Redis configuration
├── controllers/            # Logic for handling requests
│   ├── authController.js   # Authentication (login, register)
│   ├── authorController.js # Author management
│   ├── bookController.js   # Book management
│   ├── orderController.js  # Order management
│   ├── reviewController.js # Reviews and ratings
│   └── userController.js   # User profile management
├── middlewares/            # Custom middlewares
│   ├── auth.js             # JWT authentication middleware
│   ├── errorHandler.js     # Error handling middleware
│   └── logger.js           # Request logging middleware
├── models/                 # Mongoose models (database schemas)
│   ├── Author.js           # Author schema
│   ├── Book.js             # Book schema
│   ├── Order.js            # Order schema
│   ├── Review.js           # Review schema
│   └── User.js             # User schema
├── routes/                 # API routes for each resource
│   ├── auth.js             # Routes for authentication
│   ├── authors.js          # Routes for authors
│   ├── books.js            # Routes for books
│   ├── orders.js           # Routes for orders
│   ├── reviews.js          # Routes for reviews
│   └── users.js            # Routes for user profiles
├── services/               # Business logic, external services (e.g., Redis)
│   ├── cacheService.js     # Redis caching service
│   ├── paymentService.js   # Payment gateway integration (Stripe/PayPal)
│   └── emailService.js     # Email notifications service
├── utils/                  # Utility functions
│   ├── validators.js       # Data validation logic
│   └── helpers.js          # Helper functions
├── views/                  # EJS templates (for forgot password, etc.)
│   ├── forgot-password.ejs
│   ├── link-send.ejs
│   ├── reset-password.ejs
│   └── success-password.ejs
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── app.js                  # Express app initialization
├── package.json            # NPM package file
├── README.md               # Project documentation
├── seeder.js               # Seed initial data into the database
└── tests/                  # Unit and integration tests
    ├── auth.test.js        # Tests for authentication
    ├── book.test.js        # Tests for book endpoints
    └── user.test.js        # Tests for user-related endpoints
```
-->
## Contribution

1. Fork the project
2. Create your feature branch (`git switch -c feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: <short-description>'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](https://) file for details.

## Contact

- Deployed Site: [Visit Readify](https://)
- Made by **Mohamed Dawoud**: [GitHub](https://github.com/mdawoud27) | [LinkedIn](https://www.linkedin.com/in/dawoud27) | [Twitter](https://x.com/mad_d27) | [Medium](https://medium.com/@dawoud27)
