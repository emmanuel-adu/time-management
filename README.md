This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# time-management

## Starting Application

```bash
npx create-next-app@latest --experimental-app
```

dependencies: 

```json
{
  "@prisma/client": "4.6.1",
  "bcrypt": "5.1.0",
  "class-variance-authority": "0.4.0",
  "clsx": "1.2.1",
  "cookie": "0.5.0",
  "css-reset-and-normalize": "2.3.6",
  "jose": "4.11.1",
  "react-feather": "2.0.10"
}
```

The dev dependencies:

```json
{
  "prisma": "4.6.1",
  "tailwindcss": "3.2.4",
  "ts-node": "10.9.1",
  "tsconfig-paths": "4.1.1"
}
```

## Folder Structure

![](attachments/Pasted%20image%2020230208162820.png)

## Database

The fastest and easiest way to setup a Psql DB if you don't already have one is to use a hosted one.

Checkout [Railway](https://railway.app/) to setup a free one. Either way, you'll need the connection string. Inside your `.env` file, add your DB connection string

```bash
DATABASE_URL="your-connection-string"
```

We can then initialize a prisma project with: `npx prisma init`

### Schema
- Prisma schema documentation: https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference

Format schema :

`npx prisma format` 

### Migrations

After creating our schema, we need to do a few things:

1.  Sync our DB and schema together
2.  Generate a typesafe ORM based on our schema so we can interact with the DB

Luckily for us, prisma handles all of this for us. We can use the migrate command.

`npx prisma migrate dev`

If we make changes to our Schema we need to run 

`npx prisma generate`

### DB Helper Functions

Because Next API functions run in a serveless environment, we're going to cache our Prisma client and reuse it when possible to avoid having too many connections.

In `/lib/db.ts` add this

```ts
import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
```

### Seed Script

All we have to do is write a seed script. A seed script is just a piece of code that inserts fake data into our dev DB so we can use it for development.

Let's create a seed script. Make file in the prisma folder called `seed.ts`

Next, let's adjust our package.json.

```json
{
  "prisma": {
    "seed": "ts-node -P tsconfig-seed.json -r tsconfig-paths/register --transpileOnly prisma/seed.ts"
  }
}
```

### Seed database

run migration to seed

```shell
npx prisma migrate dev
```

run seed:

```shell
npx prisma db seed
```

check that data was seeded currectly:

```shell
npx prisma studio
```

## Routes

The routes for app will be as follows:

```bash
/register
/signin
/home
/project/[id]
```

we'll use route grouping here. This will allow us to have two root layouts without adding segments to the url.

```bash
(auth)
  layout
  register
    page
  signin
    page
(dashboard)
  layout
  home
    page
  project
    [id]
      page
```

