# Talents2Germany Salary API

This is the Laravel backend API for the Talents2Germany salary management system.

## Features

- Employee management API with full CRUD operations
- MySQL database integration
- Validation for required fields and unique email constraints
- CORS configuration to allow frontend requests
- Health check endpoint

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/employees` - List all employees
- `POST /api/employees` - Create new employee
- `GET /api/employees/{id}` - Get specific employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

## Requirements

- PHP 8.2+
- Composer
- MySQL 8.0+

## Setup Instructions

1. Install PHP dependencies:
   ```bash
   composer install
   ```

2. Configure environment variables:
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

3. Generate application key:
   ```bash
   php artisan key:generate
   ```

4. Run database migrations:
   ```bash
   php artisan migrate
   ```

5. Start the Laravel development server:
   ```bash
   php artisan serve
   ```
   The API will be available at `http://localhost:8000`.

## Testing

You can test the API endpoints using the provided Postman collection in the project root directory, or using curl commands:

```bash
# Health check
curl http://localhost:8000/api/health

# List employees
curl http://localhost:8000/api/employees

# Create employee
curl -X POST http://localhost:8000/api/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","role":"Admin","salary":5500}'

# Get employee
curl http://localhost:8000/api/employees/1

# Update employee
curl -X PUT http://localhost:8000/api/employees/1 \
  -H "Content-Type: application/json" \
  -d '{"role":"Manager","salary":6000}'

# Delete employee
curl -X DELETE http://localhost:8000/api/employees/1
```

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
