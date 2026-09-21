# Ahmed Fayyaz — Portfolio

A database-driven portfolio built with Next.js, Tailwind CSS, Node.js, Express, and MongoDB. Portfolio content is served by the API from MongoDB, and consultation requests are validated and saved as booking records.

## Structure

```text
backend/
  src/config        MongoDB connection
  src/controllers   API request handlers
  src/middleware    Error handling
  src/models        Portfolio and booking schemas
  src/routes        API routes
  src/seed.js       Initial CV-based MongoDB content
frontend/
  app               Next.js App Router entry and global styles
  components        Portfolio UI and booking form
  lib               API client
  public            Selected project and profile assets
  types             Shared frontend data types
```

## Setup

The supplied MongoDB Atlas credentials are stored locally in `backend/.env` and excluded by `.gitignore`. Never commit that file. See [COMMANDS.md](./COMMANDS.md) for install, seed, development, and production commands.

For normal development, run `npm run dev` from the project root. This starts the backend and frontend together; the browser cannot load MongoDB portfolio content if only the frontend is running.

The backend exposes:

- `GET /api/health`
- `GET /api/portfolio`
- `POST /api/bookings`
