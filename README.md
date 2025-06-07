# FreshMart-Backend

FreshMart-Backend is a RESTful API server designed to power the backend of the FreshMart application, an online marketplace. This project handles user authentication, product management, order processing, and other core functionalities required for a modern e-commerce platform.

## Features

- User registration and authentication (JWT-based)
- Product catalog management (CRUD operations)
- Shopping cart and order management
- Role-based access control (admin, customer)
- Secure API endpoints
- Error handling and validation
- Environment-based configuration

## Tech Stack

- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **dotenv** for environment variables
- **express** for backend framework
- **bcrypt** for decrypting passwords
- **nodemon** for ease in development

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB

### Installation

```bash
git clone https://github.com/yourusername/FreshMart-Backend.git
cd FreshMart-Backend
npm install
```

### Configuration

Create a `.env` file in the root directory and set the following variables:

```env
PORT=your_port
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Server

```bash
npm run server
```
Or
```bash
npm run start
```

The server will start on `http://localhost:Your_port`.

### Running Tests(if applicable)

```bash
npm test
```

## API Endpoints

- `POST /api/v1/` - Home
- `POST /api/v1/auth/signup` - Register a new user
- `POST /api/v1/auth/login` - Login and receive a JWT
- `GET /api/v1/users` - List all  (admin only)
- `GET /api/v1/products` - List all products
- `POST /api/v1/product/create` - Add a new product (admin only)
- `PUT /api/v1/products/:id` - Update a product (admin only)
- `DELETE /api/v1/products/:id` - Delete a product (admin only)
- `POST /api/v1/orders` - Place a new order
- `GET /api/v1/orders` - List all orders (admin only)
- `GET /api/v1/user/orders` - List user orders
- `POST /api/v1/category/create` - Place a new category
- `GET /api/v1/categories` - List all category (admin only)

*More endpoints and details can be found in the documentation.*

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## Author

Obasi Ikechukwu Thompson (Dev-Iyke)

## License

This project is licensed under the MIT License.

---

## Documentation

You can find the full API documentation **[[here](https://documenter.getpostman.com/view/24242189/2sB2qcCfpE)]**