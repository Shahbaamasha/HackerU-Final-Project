Node.js User and Card Management API

Overview
    This project is a RESTful API built using Node.js, Express, and MongoDB. It manages users and cards, supporting basic CRUD operations. There are two key entities:

    Users: Admin, business, and regular users.
    Cards: Business cards created by users.
    Business users can create, update, and delete cards, while admin users have additional permissions.

-Features
    User Management:
        Create a new user (Admin, Business, Regular)
        Update user details
        Delete a user
        Retrieve user details
        Lock user 
    Card Management:
        Create a new business card
        Update card information
        Delete a card
        Retrieve cards (by user, by card ID)
        Note: Only business users can create cards, and only the card creator can update or delete the card.

-Installation
    npm install

-Environment Variables
    NODE_ENV=development
    MONGO_URI=mongodb+srv://fdbslh:Zm2w3eFfpYhgkNhz@test.mfire.mongodb.net/
    PORT=5000
    JWT_SECRET=VoImKyidfS

-Running the Application
    npm run dev (for development environment)
    npm run prod (for production environment)

-API Endpoints
    Create User:
        POST /users/create
    Get All Users:
        GET /users
    Get User by ID:
        GET /users/:id
    Update User:    
        PUT /users/:id
    Delete User:
        DELETE /users/:id
    Create Card:    
        POST /cards/create
    Get All Cards:    
        GET /cards
    Get Card by ID:
        GET /cards/:id
    Update Card:
        PUT /cards/:id
    Delete Card:
        DELETE /cards/:id

-Technologies Used
    Node.js
    Express.js
    MongoDB (with Mongoose)
    Axios (for seeding data)
    Nodemon (for development)
    CORS (for cross-origin requests)

-Testing
    Inside the app tou can find postman folder including json files for collection and environment. You can import all this files into your local postman with all the api. 


