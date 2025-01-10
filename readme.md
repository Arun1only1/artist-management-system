# Project Title

The Artist Management System is a comprehensive platform designed to streamline the management of artists.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Arun1only1/artist-management-system
   cd artist-management-system
   ```

2. Create a `.env` file in the root directory and configure the necessary environment variables:

   ```env
   NODE_ENV=production
   API_PORT=8080
   SYSTEM_LANGUAGE=en
   DB_TYPE=postgres
   DB_HOST=db
   DB_PORT=5432
   DB_USERNAME=myuser
   DB_PASSWORD=mypassword
   DB_DATABASE=mydatabase
   JWT_ACCESS_TOKEN_SECRET=secret
   JWT_ACCESS_TOKEN_EXPIRES_IN=1h
   JWT_REFRESH_TOKEN_SECRET=refreshsecret
   JWT_REFRESH_TOKEN_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

3. Build and start the services using Docker Compose:
   ```sh
   docker-compose up --build
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to see the frontend.

2. The backend API will be available at `http://localhost:8080`.

### Stopping the Services

To stop the Docker services, run:

```sh
docker-compose down
```
