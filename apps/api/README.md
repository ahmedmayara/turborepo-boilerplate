# Turborepo Starter: Hono API + React App + Prisma

This repository is a monorepo built with [Turborepo](https://turbo.build/) containing:

- **`apps/api`**: A backend API built with [Hono](https://hono.dev/)
- **`apps/web`**: A frontend application built with [React](https://react.dev/) and [TanStack Router](https://tanstack.com/router)
- **`packages/db`**: A shared package containing Prisma ORM setup

## 🚀 Features

- **Monorepo structure** powered by Turborepo
- **Efficient API development** using Hono
- **Modern frontend** with React and TanStack Router
- **Shared database layer** with Prisma
- **Fast builds and caching** with Turborepo

## 📂 Project Structure

```
/turborepo-starter
│── apps/
│   ├── api/          # Hono backend API
│   ├── web/          # React frontend with TanStack Router
│
│── packages/
│   ├── database/           # Shared Prisma ORM setup
│
│── turbo.json        # Turborepo configuration
│── package.json      # Root package manager config
│── tsconfig.json     # Shared TypeScript configuration
```

## 🛠️ Setup & Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- [pnpm](https://pnpm.io/) (recommended package manager)

### Install Dependencies

```sh
pnpm install
```

### Database Setup

1. Create a `.env` file in `packages/db` with your database URL:
   ```sh
   DATABASE_URL="your-database-url"
   ```
2. Run Prisma migrations:
   ```sh
   pnpm db:push
   ```

### Running the Applications

#### Start the Backend API

```sh
pnpm dev:api
```

This starts the Hono server in development mode.

#### Start the Web Application

```sh
pnpm dev:web
```

This starts the React application in development mode.

### Running in Parallel

You can run both applications together using Turborepo:

```sh
pnpm dev
```

## 🧪 Testing

Run tests for all packages:

```sh
pnpm test
```

## 📜 License

This project is licensed under the MIT License.
