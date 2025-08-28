# NestJS Clean Architecture Starter

A simple starter template for NestJS projects following **Clean Architecture** principles.  
This project provides a basic structure to separate layers like **presentation, application, core (domain), infrastructure**, and **shared**.

## Features

- Clean Architecture folder structure
- Dependency inversion and separation of concerns
- Example modules and services
- Basic DTOs, entities, and repositories
- Ready to extend for larger projects

## Folder Structure

```
src/
├─ core/              # Domain entities, value objects, domain services
├─ application/       # Use cases, application DTOs
├─ infrastructure/    # Database, external services, repositories, modules
├─ presentation/      # Controllers, DTOs, validation
├─ shared/            # Common utilities, helpers, constants, interceptors, filters, exceptions, guards
├─ app.module.ts      # Root module of the application
├─ main.ts            # Application entry point
.env                  # Environment variables (do not commit)
.env.example          # Example env file
Dockerfile            # Instructions to build Docker image
docker-compose.yml    # Define and run multi-container Docker applications
```

## Prerequisites

Before running the application, make sure you have the following installed:

- **Node.js** v23 or higher
- **npm** (comes with Node.js)
- **Docker** and **Docker Compose**

Optional: **pgAdmin** or any PostgreSQL client to view/manage the database

## Environment Variables

Create a `.env` file in the root folder based on `.env.example`:

```bash
cp .env.example .env
```

Then update the values according to your environment, e.g.:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=testdb
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/lengocanh2005it/nestjs-clean-architecture.git
cd nestjs-clean-architecture
```

2. Install dependencies:

```
npm install
```

## Running with Docker Compose

The project includes a `docker-compose.yml` that starts two services:

1. `postgres_db` - PostgreSQL database
2. `nest_app` - NestJS application

### Steps

1. Build and start the services:

```bash
docker-compose up --build
```

2. The NestJS app will run on port 3000 by default
3. PostgreSQL runs on port 5432

## Running the Application

After running `docker-compose up --build`, if the app starts successfully you will see logs in the **Docker container terminal** similar to the following:

<p align="center">
  <img src="https://qwilddaqnrznqbhuskzx.supabase.co/storage/v1/object/public/files/Screenshot%202025-08-28%20222519.png" alt="Docker containers are running" width="700" style="border: 1px solid #ccc; border-radius: 8px;" />
</p>

<p align="center">
  <img src="https://qwilddaqnrznqbhuskzx.supabase.co/storage/v1/object/public/files/Screenshot%202025-08-28%20222556.png" alt="PostgresQL service running successfully" width="700" style="border: 1px solid #ccc; border-radius: 8px;" />
</p>

<p align="center">
  <img src="https://qwilddaqnrznqbhuskzx.supabase.co/storage/v1/object/public/files/Screenshot%202025-08-28%20222542.png" alt="NestJS app running successfully" width="700" style="border: 1px solid #ccc; border-radius: 8px;" />
</p>
At this point, your API server will be running on the port mapped in the `docker-compose.yml` file (by default `http://localhost:3000` on the host machine). You can verify it using Postman, curl, or any HTTP client.

## Example API Endpoints

### 1. Create a new user

**POST** `/users`

**Request Body Example:**

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response Example:**

```json
{
  "id": "6f825d4b-d756-40c0-9c93-82b1b547d070",
  "email": "user@example.com"
}
```

### 2. Get all users

**GET** `/users`

**Response Example:**

```json
[
  {
    "id": "6f825d4c-d756-40c0-9c93-82b1b547d070",
    "email": "user1@example.com"
  },
  {
    "id": "6f825d4c-d756-40c0-9c93-82b1b548c070",
    "email": "anotheruser@example.com"
  }
]
```

## Contributing

Contributions are welcome.  
You can help by opening an issue, suggesting improvements, or submitting a pull request.

Please follow the existing code style and write clear commit messages.

## License

This project does not include a license.  
All rights reserved by the author. You may not use, copy, or distribute this code without permission.
