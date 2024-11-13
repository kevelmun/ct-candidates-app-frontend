
# 🎨 Ticket Reservation System - Frontend

This is the frontend service for the Ticket Reservation System, designed to provide an intuitive interface for users to view events and reserve tickets.

## 📜 Project Overview

The frontend allows users to:
- 👀 View available events
- 🔍 Filter events by date, location, and ticket availability
- 🎟️ Reserve tickets for selected events
- ✅ Confirm their reservations

The frontend is built using modern JavaScript frameworks such as [React.js](https://reactjs.org/) or [Vue.js](https://vuejs.org/) and is fully dockerized for easy deployment.

## ⚙️ Requirements

- Node.js
- Docker
- Docker Compose

## 🚀 Setup

### 1. 📂 Clone the Repository

```bash
git clone https://github.com/codediaz/ct-candidates-app-frontend.git
cd ct-candidates-app-frontend
```

### 2. 🔧 Environment Variables

Create a `.env` file in the frontend root directory to configure environment variables such as the backend API URL.

Example `.env` file:

```
REACT_APP_API_URL=http://localhost:3000
PORT=3001
```

### 3. 🐳 Docker Setup

Ensure Docker and Docker Compose are installed on your machine. Build and start the frontend container using the following command:

```bash
docker-compose up --build
```

This will start the frontend service and link it to the backend as defined in Docker Compose.

### 4. 💻 Access the Application

Once the containers are running, access the application in your web browser at:

```
http://localhost:3001
```

## 🛠️ Usage

The frontend interacts with the backend API to fetch event data and handle ticket reservations. Ensure the backend service is running to experience the full functionality.

## 🤝 Contribution

### Pull Request Guidelines for Candidates

If you are a candidate completing this technical test, please ensure your Pull Request (PR) includes:
1. A clear title summarizing the changes (e.g., "Implement event filtering and reservation functionality").
2. A detailed description covering:
   - The purpose of the PR.
   - The main changes introduced, including any UI components or interactions added.
   - Any new dependencies or setup steps.
   - Instructions for testing your implementation, if applicable.
3. Ensure that your code follows best practices, with clean and commented code.

Follow the [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) model.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 📬 Contact

For any inquiries, please reach out to [Sergio Díaz](mailto:sergio.diaz@funiber.org).
