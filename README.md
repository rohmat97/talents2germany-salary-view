# Talents2Germany Salary View

This is a monorepo project containing a Laravel backend API and a Next.js frontend for managing employee salary information.

## Project Structure

```
talents2germany-salary-view/
├── backend/          # Laravel API
│   ├── app/         # Laravel application code
│   ├── config/      # Configuration files
│   ├── database/    # Database migrations and seeds
│   ├── routes/      # API routes
│   └── ...          # Other Laravel files
└── frontend/        # Next.js frontend
    ├── app/         # Next.js app router pages
    ├── components/  # React components
    ├── lib/         # Utility functions
    └── ...          # Other Next.js files
```

## Requirements

- PHP 8.2+
- Composer
- Node.js 18+
- pnpm 10.14.0
- MySQL 8.0+ (for backend)

## Setup Instructions

### Backend (Laravel API)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update database configuration in `.env` to match your MySQL setup:
     ```
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=talents2germany
     DB_USERNAME=root
     DB_PASSWORD=password
     ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Run database migrations:
   ```bash
   php artisan migrate
   ```

6. Start the Laravel development server:
   ```bash
   php artisan serve
   ```
   The API will be available at `http://localhost:8000`.

### API Testing with Postman

To easily test the backend API endpoints, you can import the provided Postman collection:

1. Open Postman
2. Click "Import" in the top left
3. Select the `Talents2Germany-Salary-API.postman_collection.json` file from the project root
4. All endpoints are pre-configured with proper headers and sample data

The collection includes endpoints for:
- Health check
- Employee management (CRUD operations)


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
