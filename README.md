"Nextrip", an online travel agent platform where you can book tickets for trains, planes and even cruise. Find the travel that you want most!

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Config files

```bash
cp .env.example .env.local
vim .env.local
# And change required fields
```

### Run dev server

```bash
pnpm dev
```

Then go to `http://localhost:3000` and you should see the home page of this project.

## Develop

To develop on this project:

```bash
git branch -a
git checkout develop
git checkout -b <new_branch_name>
```

TODO: add more info on PR and merging.

## Deployment

Currently, the `main` branch of this projecct is automatically deployed on the vercel platform.

## TeckStack

- Framework: `Next.js`
- Package manager: `pnpm`
- ORM: `drizzle-orm`
- SQL db: `pgsql`
- CI/CD: `vercel` and `github actions`
- UI: `shadcn`
- Code Quality: `ESLint`, `Prettier`, `Husky`
- Data Validation: `Zod`
