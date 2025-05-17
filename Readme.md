This is a [Node.js](https://nodejs.org/) 22.11.0 API.

## What is inside?

This project uses lot of stuff as:

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com)
- [Swagger](https://swagger.io)
- [Zod](https://zod.dev)
- [Docker](https://www.docker.com)
- [Prisma](https://www.prisma.io)
- [Jest](https://jestjs.io)

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Note that you will need to install [pnpm](https://pnpm.io/installation) if you don't already have it installed.

or you can start the application using docker:

```bash
docker compose up -d
```

Open [http://localhost:3000/doc](http://localhost:3000/doc) with your browser to see the API documentation.

## Commands

- `dev`: runs your application on `localhost:3000`
- `migrate`: generate your migrations`
- `studio`: start prisma studio`
- `generate`: generate pre configured files using plop`
- `build`: creates the production build version
- `swagger`: generates the swagger documentation
- `lint`: runs the linter in all components and pages
- `test`: runs jest to test all components and pages
- `test:watch`: runs jest in watch mode
