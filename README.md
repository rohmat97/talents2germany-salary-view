# talents2germany-salary-view

Custom Salary view for Admin with Laravel (backend) and Next.js 14 + Tailwind (frontend). This repository is a monorepo containing two projects: `backend/` and `frontend/`.

## Structure

```
.
├── backend/   # Laravel API
└── frontend/  # Next.js 14 (App Router, TS, Tailwind)
```

## Requirements

- PHP 8.2+
- Composer 2+
- Node.js 18+
- pnpm 10+ (frontend package manager)

## Backend (Laravel)

1) Install PHP dependencies (already installed by scaffolding; run again if needed):

```
cd backend
composer install
```

2) Environment:

- Copy `.env.example` to `.env` and adjust as needed (SQLite is ready by default):

```
cp .env.example .env
php artisan key:generate
```

3) Run migrations (done during scaffold, run again if necessary):

```
php artisan migrate
```

4) Start the server:

```
php artisan serve
```

Backend URL: http://localhost:8000

Health endpoint: http://localhost:8000/api/health

## Frontend (Next.js 14 + Tailwind, pnpm)

1) Install dependencies with pnpm:

```
cd frontend
pnpm install
```

2) Optional: create `.env.local` to override API base URL

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

3) Start the dev server:

```
pnpm dev
```

Frontend URL: http://localhost:3000

Navigate to the Admin Salaries page: http://localhost:3000/admin/salaries

## Notes

- CORS is configured in `backend/config/cors.php` to allow `http://localhost:3000`.
- API routes are registered via `backend/bootstrap/app.php` and implemented in `backend/routes/api.php`.
- Frontend uses `frontend/lib/api.ts` to call the backend and reads `NEXT_PUBLIC_API_BASE_URL`.
