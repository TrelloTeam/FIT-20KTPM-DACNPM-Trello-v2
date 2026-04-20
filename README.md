# Trello Clone (FIT-20KTPM-DACNPM) 📋

A full-stack project management application inspired by Trello, developed as part of the Software Architecture/Engineering course (FIT-20KTPM-DACNPM). This project uses a modern monorepo architecture, separating the client, server, and shared resources.

## 🛠 Tech Stack

* **Frontend:** React, TypeScript, CSS
* **Backend:** NestJS, TypeScript
* **Shared Packages:** Rollup (for building shared TypeScript interfaces/utils)
* **Authentication:** Keycloak (via Docker)
* **Infrastructure/DevOps:** Docker, Docker Compose, Envoy Proxy, CircleCI, GitHub Actions

## 📂 Repository Structure

This project uses a monorepo setup:
* `/Frontend` - The React user interface.
* `/Backend` - The NestJS REST API.
* `/packages/shared` - Shared types, DTOs, and utility functions used by both Frontend and Backend.
* `/configs` - Configuration files for the project.

---

## 🚀 Getting Started

Follow the steps below to run the project in a local development environment. 

### Prerequisites
* Node.js and npm installed.
* Docker and Docker Compose installed.

### 1. Build the Shared Package
Since both the Frontend and Backend depend on shared code, you must build the shared package first.

```bash
# Move to the shared package directory
cd packages/shared

# Install dependencies
npm install

# Build the package
npm run build
```

### 2. Setup the Backend
The backend utilizes NestJS and requires a database instance to run.

```bash
# Open a new terminal and move to the Backend directory
cd Backend

# Install backend dependencies
npm install

# Start the database and required services (like Keycloak/Envoy) using Docker
docker compose up -d

# Run the NestJS server in development mode
npm run start:dev
```
*Note: Ensure your `.env` variables are properly configured in the Backend folder if required.*

### 3. Setup the Frontend
The frontend is a React application that communicates with the NestJS backend.

```bash
# Open a new terminal and move to the Frontend directory
cd Frontend

# Install frontend dependencies
npm install

# Run the React app in development mode
npm run dev
```

---

## 🐳 Docker Deployment

The repository includes ready-to-use Dockerfiles for production or containerized environments:
* `Dockerfile.frontend`
* `Dockerfile.backend`
* `Dockerfile.keycloak`
* `Dockerfile.envoy`

To run the entire stack using the production configuration:
```bash
docker compose -f docker-compose.production.yml up --build
```
