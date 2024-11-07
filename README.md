# Readify - BookStore API Application

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Future Features](#future-features)
- [Challenges & Solutions](#challenges--solutions)
- [License](#license)
- [Contribution](#contribution)

## Description

**Readify** is a full-featured bookstore API that allows users to search, browse, and purchase books. It includes user authentication, book reviews, order management, and caching for optimal performance. Admins can manage books, authors, and users, all within a secure and efficient system.

[Demo](https://drive.google.com/file/d/1Bm1kbtUvZR95Emg1J_eXvYwfHkWd-BdV/view?usp=drive_link)

[Presentation](https://docs.google.com/presentation/d/1v05h9lUmALioyo76DtdWdrXOouYxqT6L/edit#slide=id.p1)

[Readify Deployment]() _(Soon)_

Made by **Mohamed Dawoud**: [GitHub](https://github.com/mdawoud27) | [LinkedIn](https://www.linkedin.com/in/dawoud27) | [Twitter](https://x.com/mad_d27) | [Medium](https://medium.com/@dawoud27)

## Features

- **User Authentication:** Secure login and registration using JWT.
- **Book Catalog:** Browse books by title, author, and genre.
- **Book Reviews & Ratings:** Users can submit and view reviews and ratings.
- **Order Management:** Cart and wishlist functionality for seamless book purchasing.
- **Admin Dashboard:** Admins can manage books, authors, and users.
- **Reviews management**
- **Reset Password functionality**
- **Upload Images for profiels and blog posts**
- **Contact Support:** A contact form allows users to reach out to support.

## Technologies Used

### Backend

- **Node.js** with **Express**
- **MongoDB** for database management
- **Mongoose** as the ORM for MongoDB
- **Redis** for caching frequently accessed data
- **JWT** for user authentication

### Frontend

- **HTML, CSS, and JavaScript**
- **EJS** for server-side templating

### DevOps

- **Vercel** for deployment using **GitHub Actions**

## Getting Started

### Prerequisites

- **Node.js**
- **MongoDB**
- **Redis** (For caching)
- **Postman**

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
   NODE_ENV=development
   MONGODB_URI="mongodb://localhost/readify"
   JWT_SECRET_KEY=your_jwt_secret
   REDIS_URL=redis://localhost:6379
   SESSION_SECRET=your_secret_session
   USER_EMAIL=user_email_address
   USER_PASS=user_googleApp_password
   VERCEL_TOKEN=your_generated_token
   ```

4. Run the application:

   ```bash
   npm start
   ```

5. Access the app at `http://localhost:5000`.

6. Insert data (optional cause you can insert your own)

   ```bash
   cd data/

   # Insert authors
   mongoimport --uri "mongodb://localhost:27017" --db readify --collection authors --file $(pwd)/authors.json --jsonArray

   # Insert books
   mongoimport --uri "mongodb://localhost:27017" --db readify --collection books --file $(pwd)/books.json --jsonArray
   ```

## API Endpoints

### Authentication

- **`POST /api/auth/register`**: Register a new user _(Public)_
- **`POST /api/auth/login`**: Login a user and receive a JWT token _(Public)_

### Password

- **`POST /password/forget-password`**: Send forgot password link _(Public)_
- **`POST /password/forget-password/:userId/:token`**: Reset the password _(Public)_

### Books

- **`GET /api/books`**: Get a list of all books _(Public)_
- **`GET /api/books/:id`**: Get a single book by its ID _(Public)_
- **`POST /api/books`**: Add a new book _(Admin only, Requires JWT)_
- **`PUT /api/books/:id`**: Update a book _(Admin only, Requires JWT)_
- **`DELETE /api/books/:id`**: Delete a book _(Admin only, Requires JWT)_

### Authors

- **`GET /api/authors`**: Get a list of all authors _(Public)_
- **`GET /api/authors/:id`**: Get a single author by its ID _(Public)_
- **`POST /api/authors`**: Add a new author _(Admin only, Requires JWT)_
- **`PUT /api/authors/:id`**: Update an author _(Admin only, Requires JWT)_
- **`DELETE /api/authors/:id`**: Delete an author _(Admin only, Requires JWT)_

### Users

- **`GET /api/users/`**: Get a list of all users _(Admin only, Requires JWT)_
- **`GET /api/users/:id`**: Get a user by id _(Admin only and user themselves, Requires JWT)_
- **`PUT /api/users/:id`**: Update a user _(Admin only and user themselves, Requires JWT)_
- **`DELETE /api/users/:id`**: Delete a user _(Admin only and user themselves, Requires JWT)_

### Orders

- **`GET /api/orders`**: Get all orders in the platform _(Requires JWT)_
- **`GET /api/orders/:id`**: Get an order by id _(Requires JWT)_
- **`POST /api/orders`**: Create a new order _(Requires JWT)_
- **`PUT /api/orders/:id`**: Update an order _(Requires JWT)_
- **`DELETE /api/orders/:id`**: Delete an order _(Requires JWT)_

### Reviews

- **`GET /api/reviews`**: Get all reviews in the platform _(Public)_
- **`GET /api/reviews/:id`**: Get a review by id _(Public)_
- **`POST /api/reviews`**: Create a new review _(Requires JWT)_
- **`PUT /api/reviews/:id`**: Update a review _(Requires JWT)_
- **`DELETE /api/reviews/:id`**: Delete a review _(Requires JWT)_

### Upload

- **`POST /api/upload`**: Upload images _(Requires JWT)_

### Contact

- **`POST /api/contact`**: Contact form submission _(Public)_

## Future Features

- **Email Notifications**: Send users updates on their orders.
- **Search Autocomplete**: Provide search suggestions using **_Redis_**.
- **Recommendations**: Recommend books based on user preferences.
- **Payment Integration:** Integration with Stripe or PayPal for handling payments.
- **Tests**: Test all app features using **_jest_** framework.
- **Complete Frontend**: Update Frontend Stack.
- **Configure `eslint` and `prettier` files and `husky`** for code and commits conventions and code quality.
- **Docker** for containerization

## Challenges & Solutions

- **Performance Optimization**: The application uses Redis to store frequently accessed data like book details, which speeds up book searches and reduces MongoDB queries.
- **JWT Security**: To prevent unauthorized access, all endpoints require a valid JWT. Tokens are verified on each request, and only authorized users can access restricted routes.
- **Data Consistency**: Managing relationships between authors and books posed challenges, especially during updates. We implemented helper functions to keep author-book records in sync, preventing any mismatched data.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Contribution

1. Fork the project
2. Create your feature branch (`git switch -c feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: <short-description>'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
