

## Table of Contents

- [Features](#features)
  - [Public Pages](#public-pages)
  - [Protected Pages](#protected-pages-requires-login)
  - [Role-Based Features](#role-based-features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Testing](#testing)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Public Pages

- **Login Page**
  - Allows users to log in with their registered email and password.
  - Includes validation for proper email format.
- **Signup Page**
  - Enables new users to register with an email, password, and additional details.
  - Validates email format and password strength.
- **All Cards Page**
  - Displays all available cards, accessible to both logged-in and guest users.
  - Includes a navbar input field for filtering cards by title or criteria.
- **Home Page**
  - Acts as a wrapper and navigation hub for all app pages.

### Protected Pages (Requires Login)

- **User Cards Page**
  - Displays cards created by the logged-in user.
  - Features for updating or deleting their own cards.
- **Favorites Page**
  - Shows the logged-in user's favorite cards.

### Role-Based Features

- **General User**
  - View and filter all cards.
  - Manage (update/delete) their own cards.
  - Favorite cards and view them on the Favorites Page.
- **Business User**
  - Create new cards.
  - Update or delete only the cards they have created.
- **Admin User**
  - Delete any user.
  - Update details of any user.
  - View and manage all cards.

---

## Installation

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm or yarn

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/react-card-app.git
   ```
2. Navigate to the **frontend** folder and install dependencies:
   ```bash
   cd frontend
   npm install
   npm start
   ```
3. Navigate to the **backend** folder and install dependencies:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. Open the app in your browser at:
   - `http://localhost:3000`

---

## Usage

The app provides the following functionalities:
- **Card Management:** Create, update, delete, and filter cards.
- **User Management:** Admins can delete/update any user, while regular users manage their own accounts.
- **Authentication:** Role-based access control for features.
- **Favorites:** Mark and view favorite cards.

---

## Project Structure

```plaintext
frontend/
  ├── src/
  │   ├── components/    # Reusable React components (Navbar, Card, etc.)
  │   ├── pages/         # Page components (Login, Signup, All Cards, etc.)
  │   ├── hooks/         # Custom hooks for managing state and side effects
  │   ├── services/      # API calls for backend interaction
  │   └── utils/         # Utility functions (validation, helpers)

backend/
  ├── models/            # Mongoose models for users and cards
  ├── routes/            # Express routes for APIs
  ├── controllers/       # Business logic for endpoints
  ├── middlewares/       # Authentication and error-handling logic
  └── config/            # Database connection and environment settings
```

---

## API Endpoints

<details>
<summary><b>User Endpoints</b></summary>

- **Get All Users**
  - `GET /api/users`
- **Get User by ID**
  - `GET /api/users/:id`
- **Update User**
  - `PUT /api/users/:id`
- **Delete User**
  - `DELETE /api/users/:id`
- **Change isBusiness Property**
  - `PATCH /api/users/:id/business`

</details>

<details>
<summary><b>Card Endpoints</b></summary>

- **Get All Cards**
  - `GET /api/cards`
- **Get Card by ID**
  - `GET /api/cards/:id`
- **Update Card**
  - `PUT /api/cards/:id`
- **Delete Card**
  - `DELETE /api/cards/:id`
- **Mark Card as Liked**
  - `POST /api/cards/:id/like`

</details>

---

## Technologies Used

- **Frontend:** React, TypeScript, Material-UI, React Router
- **Backend:** Node.js, Express.js, MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **Other Tools:** Axios, Nodemon, CORS

---

## Testing

- Use the included Postman collection in the `postman/` folder for testing API endpoints.
- Import the collection into Postman to test all API routes.

---

## Screenshots

### Login Page
![Login Page](https://via.placeholder.com/800x400)

### Card Management
![Card Management](https://via.placeholder.com/800x400)

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
```

---

You can copy-paste this README into your GitHub repository's README.md file. Let me know if you'd like further customization or additions!