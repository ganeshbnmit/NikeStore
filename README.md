# NikeStore
A Nike storefront application developed using Vue.js for the frontend, Node.js for the backend, and MySQL for the database. This project features a responsive user interface, admin management for products, cart functionality, and an order confirmation system. 

## Features

- User-friendly interface for browsing and purchasing Nike products.
- Admin panel for managing products.
- Responsive design using Bootstrap for a seamless experience across devices.
- Cart functionality allowing users to add, remove, and view products.
- Order confirmation page displaying customer details after checkout.

## Technologies Used

- **Frontend**: Vue.js, Axios, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **State Management**: Pinia
- **Styling**: CSS, Bootstrap

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- MySQL (version 8 )
- npm 

### Installation
1. Clone the repository
2. inside project folder run  **npm install**
3.  Create a .env file which contain
     - DB_HOST=localhost
     - DB_USER=root
     - DB_PASSWORD=your_password
     - DB_NAME=database_name
4. Use .env file in server.js
5. **node server.js**  command to start backend server
6. insde client (cd client) run **npm install**
7. **npm run serve** command to start frontend

### Usage
- localhost/admin   for admin sign in
    - Username:admin 
    - Password:admin 
- Admin can add products by selecting various category
