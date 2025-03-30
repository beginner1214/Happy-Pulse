![Screenshot 2025-02-23 004747](https://github.com/user-attachments/assets/ead1fca3-8f47-482f-b352-947af0564ac1)
![image](https://github.com/user-attachments/assets/e4692a1f-4b8a-47e1-a1aa-80a3cde26028)
![image](https://github.com/user-attachments/assets/5f5299c7-2c0e-4949-83c5-d33eb7ff382c)
![image](https://github.com/user-attachments/assets/33d86215-dbe0-4096-8ead-e6e45935ced9)
![image](https://github.com/user-attachments/assets/965b38e9-c0bf-4fc4-8361-d4567c51aeaf)
![Screenshot 2025-02-23 004134](https://github.com/user-attachments/assets/b204c563-2b0c-415f-be48-d2fb23753236)
![image](https://github.com/user-attachments/assets/36169954-ddf1-4fbd-9dbc-a1002f85e445)
![Screenshot 2025-02-23 005439](https://github.com/user-attachments/assets/4cae7821-3533-4d8a-8aa9-2a15f0e6352c)


# Modern Medical Platform

Welcome to the Happy Pulse! This project is a full-stack application designed to provide a modern, scalable solution for medical services. It includes a backend built with Node.js and Express, and a frontend powered by React and Vite, with integrations for video conferencing, authentication, and more.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Setup Instructions](#setup-instructions)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
4. [Running the Project](#running-the-project)
5. [Environment Variables](#environment-variables)
6. [Available Scripts](#available-scripts)
7. [Dependencies](#dependencies)
8. [Contributing](#contributing)
9. [License](#license)

---

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16.x or higher recommended)
- [npm](https://www.npmjs.com/) (v8.x or higher) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance like MongoDB Atlas)
- A code editor (e.g., [VS Code](https://code.visualstudio.com/))

---

## Project Structure

```
modern-medical-platform/
├── backend/                # Backend source code
│   ├── index.js            # Entry point for the backend
│   ├── package.json        # Backend dependencies and scripts
│   └── ...                 # Other backend files (routes, models, etc.)
├── frontend/               # Frontend source code
│   ├── src/                # React components, pages, and logic
│   ├── package.json        # Frontend dependencies and scripts
│   └── ...                 # Other frontend files (public, config, etc.)
└── README.md               # This file
```

---

## Setup Instructions

### Backend Setup

1. **Navigate to the Backend Directory**
   ```bash
   cd backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   This installs all the required packages listed in `backend/package.json`.

3. **Set Up Environment Variables**
   Create a `.env` file in the `backend/` directory and add the following variables (adjust values as needed):
   ```
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   NODEMAILER_EMAIL=<your-email>
   NODEMAILER_PASS=<your-email-password>
   GOOGLE_API_KEY=<your-google-api-key>
   ```
   - `MONGO_URI`: Your MongoDB connection string (e.g., from MongoDB Atlas).
   - `JWT_SECRET`: A secure key for JSON Web Tokens.
   - `NODEMAILER_EMAIL` & `NODEMAILER_PASS`: Credentials for sending emails.
   - `GOOGLE_API_KEY`: For Google Generative AI integration.

4. **Verify MongoDB Connection**
   Ensure your MongoDB instance is running locally or accessible via the provided URI.  
---

### Frontend Setup

1. **Navigate to the Frontend Directory**
   ```bash
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   This installs all the required packages listed in `frontend/package.json`.

3. **Set Up Environment Variables**
   Create a `.env` file in the `frontend/` directory and add the following variables:
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_GOOGLE_API_KEY=<your-google-api-key>
   VITE_ZEGOCLOUD_APP_ID=<your-zegocloud-app-id>
   VITE_ZEGOCLOUD_SERVER_SECRET=<your-zegocloud-server-secret>
   ```
   - `VITE_API_URL`: The URL of your backend API.
   - `VITE_GOOGLE_API_KEY`: For Google Generative AI features.
   - `VITE_ZEGOCLOUD_APP_ID` & `VITE_ZEGOCLOUD_SERVER_SECRET`: For Zegocloud video conferencing (if used).

---

## Running the Project

1. **Start the Backend**
   In the `backend/` directory, run:
   ```bash
    Nodemon server.js
   ```
   This uses `nodemon` to start the server and auto-restart on changes. The backend will run on `http://localhost:5000` (or the port specified in `.env`).

2. **Start the Frontend**
   In a separate terminal, navigate to the `frontend/` directory and run:
   ```bash
   npm run dev
   ```
   This starts the Vite development server, typically at `http://localhost:5173`.

3. **Access the Application**
   Open your browser and go to `http://localhost:5173` to view the frontend. It will communicate with the backend at `http://localhost:5000`.

---

## Environment Variables

The project relies on environment variables for configuration. Ensure the `.env` files in both `backend/` and `frontend/` are correctly set up. Do not commit these files to version control—use `.env.example` files instead for templates.

---

## Available Scripts

### Backend
- `node server`: Starts the server with `nodemon` for development.
- `npm test`: Placeholder for tests (currently outputs an error).

### Frontend
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code issues.
- `npm run preview`: Previews the production build locally.

---

## Dependencies

### Backend
- **Express**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling.
- **JWT**: Authentication with JSON Web Tokens.
- **Nodemailer**: Email sending functionality.
- **Multer**: File uploads.
- **Google Generative AI**: AI-powered features.

### Frontend
- **React**: UI library.
- **Vite**: Fast build tool and development server.
- **MUI**: Material-UI components for styling.
- **Radix UI**: Accessible, unstyled UI primitives.
- **Zegocloud**: Video conferencing integration.
- **Tailwind CSS**: Utility-first CSS framework.

For a full list, see `backend/package.json` and `frontend/package.json`.

---

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## License

This project is licensed under the ISC License. See the `backend/package.json` for details.

---

Feel free to customize this README further based on additional features, deployment instructions, or specific project details! Let me know if you'd like to refine it more.
