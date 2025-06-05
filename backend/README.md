# NestJS Backend

This directory contains a simple NestJS backend using TypeORM and PostgreSQL. It is configured to connect to a Supabase database via the `DATABASE_URL` environment variable.

## Development

```bash
cd backend
npm install
npm run start:dev
```

The server listens on `PORT` (default: 3000). Example endpoints:

- `GET /` – returns `Hello World!`
- `GET /tasks` – list tasks
- `POST /tasks` – create a task with JSON body `{ "title": "..." }`

## Configuration

Copy `.env.example` to `.env` and update your Supabase credentials.
