# BuzzCreator

BuzzCreator is a RESTful API developed with Node.js, TypeScript, Express, and Prisma. The system aims to manage a catalog of books and orders, with admin authentication for protected routes.

---

## Front-End

This back-end can be used together with the front-end available in the repository: **[buzzcreator-front](https://github.com/WillianSantosC/buzzcreator-front)**

---

## Features

- CRUD for books (`Books`)
- Order management (`Orders`)
- Basic admin authentication
- Data validation with Zod
- Automatic documentation with Swagger
- Integration tests with Jest and Supertest

---

## Technologies Used

- **Node.js** + **Express** + **TypeScript** (framework and typing)
- **Prisma ORM** (ORM)
- **PostgreSQL** (database)
- **Swagger** (documentation)
- **ESLint** + **Prettier** (code standardization)
- **Jest** + **Supertest** (testing)
- **Docker** (run project - optional)
- **Render** (deploy)
- **Husky** + **Lint-staged** (pre-commit validation)
- **GitHub Actions** (CI/CD)

---

## Architecture and Technical Decisions

- **Architecture**: The project follows **Clean Architecture** as a base for organization, clearly separating responsibilities into layers:

  - **Domain**: definition of entities and repositories.

  - **Application**: use cases that orchestrate business logic.

  - **Infrastructure**: integration with external technologies such as databases and frameworks.

  - **Web**: delivery layer responsible for HTTP routes and their validations.

  > This approach facilitates maintenance, scalability, and testability of the system, while reducing coupling between parts.

* **Framework**: **Express.js** was chosen, a minimalist and flexible framework for building REST APIs, making it easier to implement routes, middlewares, and integrate third-party libraries.

* **Typing**: The entire codebase uses **TypeScript** to provide greater safety, clarity, and scalability, reducing runtime errors.

* **ORM**: **Prisma** is used for object-relational mapping, offering a safe, type-safe abstraction layer over the database and simplifying operations like migrations and automatic type generation.

* **Database**: **PostgreSQL** was chosen as a robust and reliable relational storage system, ensuring data integrity and scalability.

* **Authentication**: Authentication is implemented via **JWT (JSON Web Token)** for protected routes. For simplicity and focus on core system logic, admin authentication is mocked; in production, it would be replaced by a robust system with persistence, password hashing, and a repository.

* **Data Validation**: **Zod** is used for schema validation, ensuring that data received and processed by the API is always in the expected format, avoiding failures and inconsistencies.

* **API Documentation**: Automatically generated documentation using **Swagger**, facilitating understanding, integration, and testing of the API by other developers or services.

* **Testing**: Testing strategy is based on **Jest** and **Supertest** for integration tests, ensuring that routes and business logic work as expected. The test environment uses table truncation before each suite, ensuring isolation between tests.

* **Code Standardization**: Using **ESLint**, **Prettier**, and **Husky** to ensure code quality, consistency, and standardization, plus pre-commit hooks with **Lint-staged** for automatic validation before each commit.

* **Deploy**: Performed via **Render**, taking advantage of support for containers and Node.js applications.

---

## Useful Scripts

```bash
# Development environment
pnpm dev

# Compile the project
pnpm build

# Run the compiled application
pnpm start

# Run Swagger to update documentation
pnpm swagger

# Run tests
pnpm test

# Access Prisma Studio
pnpm studio
```

---

## How to Run the Project Locally

### Prerequisites

- Node.js 22+
- PNPM (recommended)
- Local PostgreSQL or Docker
- Docker (optional)

### 1. Clone the repository

```bash
git clone https://github.com/WillianSantosC/buzzcreator-back.git
&&
cd buzzcreator-back
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Create the `.env` file

Create a `.env` file in the root of the project with the following content:

```env
API_PORT=
NODE_ENV=
JWT_SECRET=

DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
CLIENT_URL=

DATABASE_URL="postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?schema=public"
```

> Replace the values with your environment's correct configuration.

### 4. Generate Prisma files and run migrations

```bash
pnpm prisma generate
pnpm prisma migrate dev
```

### 5. Start the application

```bash
pnpm dev
```

---

## Running the Tests

```bash
# Run all tests
NODE_ENV=test; pnpm test
```

---

## Running with Docker (Optional)

### 1. Requirements

- Docker installed
- Environment variables set correctly

### 2. Environment variables to run the application

Configure the following variables:

```env
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=buzzcreator
```

Example usage in the `DATABASE_URL` variable:

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/buzzcreator?schema=public"
```

### 3. Start the containers

```bash
docker-compose up -d
```

---

## Authentication

### Admin Login

- Endpoint: `POST /admin/login`
- Payload:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

### Note

> **For simplicity and focus on core system logic, admin authentication was implemented with mocked data. In production, it would be replaced by a system with persistence, password hashing, etc.**

---

## API Documentation

The documentation is automatically generated with Swagger and can be accessed at:

```
GET /docs
```

---

## Deploy

This project was deployed on the **Render** platform.

🔗 Access the production application:
**[https://buzzcreator-back.onrender.com](#)**
