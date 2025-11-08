# Innofest Frontend

This is a Vite + React + TypeScript frontend scaffold for the Innofest portal.

Features included:
- Landing page showing teams
- Signup page for team leaders
- Team dashboard to add members and upload PPT
- Admin dashboard skeleton
- Mocked API using MSW (so you can develop without the backend)

How to run locally:

1. Install dependencies

```bash
cd frontend
npm install
```

2. Start dev server (mock API runs automatically in dev)

```bash
npm run dev
```

Configuration:
- The frontend reads `VITE_API_BASE_URL` for the real backend base URL. When you have backend endpoints, set this value in an `.env` file at `frontend/.env`:

```
VITE_API_BASE_URL=http://localhost:8000/api
```

Notes:
- This scaffold uses a mocked API with MSW. To connect to an actual Django backend you will either:
  - Implement the REST endpoints matching the mocked handlers, or
  - Update `src/api/api.ts` to match your endpoints.

Next steps I can do for you:
- Implement the required Django REST API endpoints in your repository so the frontend can fully integrate.
- Add authentication flows (JWT/session-based) and email confirmation endpoints.
