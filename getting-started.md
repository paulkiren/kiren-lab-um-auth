# Getting Started with User Management & OAuth Microservices

This guide will help you set up and run the microservices described in the architecture.

## Prerequisites

1. **Node.js** (v14 or later)
2. **Java** (JDK 11 or later)
3. **PostgreSQL** (v12 or later)
4. **Maven** (for Spring Boot services)
5. **Docker** (optional, for containerized deployment)

## Setup Steps

### 1. Clone the Repository
```bash
git clone <repository-url>
cd kiren-lab-um-auth
```

### 2. Configure the Database
- Create a PostgreSQL database named `kiren_lab`.
- Update the database credentials in the environment files or configuration files for each service.

### 3. Start the Services

#### API Gateway (Node.js)
1. Navigate to the API Gateway directory:
   ```bash
   cd api-gateway
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the service:
   ```bash
   npm start
   ```

#### Auth Service (Spring Boot)
1. Navigate to the Auth Service directory:
   ```bash
   cd auth-service
   ```
2. Build the project:
   ```bash
   mvn clean install
   ```
3. Run the service:
   ```bash
   java -jar target/auth-service.jar
   ```

#### User Service (Spring Boot)
1. Navigate to the User Service directory:
   ```bash
   cd user-service
   ```
2. Build the project:
   ```bash
   mvn clean install
   ```
3. Run the service:
   ```bash
   java -jar target/user-service.jar
   ```

#### Email Service (Node.js)
1. Navigate to the Email Service directory:
   ```bash
   cd email-service
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the service:
   ```bash
   npm start
   ```

### 4. Verify the Setup
- Access the API Gateway at `http://localhost:<gateway-port>`.
- Use tools like Postman to test the endpoints for each service.

## Optional: Run with Docker
1. Build Docker images for each service.
2. Use `docker-compose` to orchestrate the services:
   ```bash
   docker-compose up
   ```

## Next Steps
- Implement additional features or customize the services as needed.
- Set up monitoring and logging for production environments.
