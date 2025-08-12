# Talents2Germany Salary API

This is the Laravel backend API for the Talents2Germany salary management system.

## Features

- Employee management API with full CRUD operations
- MySQL database integration
- Validation for required fields and unique email constraints
- CORS configuration to allow frontend requests
- Health check endpoint
- Unique email handling (updates existing records instead of creating duplicates)
- Admin panel with salary management capabilities
- Automatic displayed salary calculation (salary in euros + commission)

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/employees` - List all employees
- `POST /api/employees` - Create new employee or update existing employee with same email
  - Required fields: name, email, role, salary_in_local_currency
- `GET /api/employees/{id}` - Get specific employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

### Admin API Endpoints

- `GET /api/admin/employees` - List all employees with detailed salary information (admin only)
- `PUT /api/admin/employees/{id}/salary` - Update employee salary in euros and commission (admin only)
  - Optional fields: salary_in_euros, commission

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

5. Seed the database with example data (optional):
   ```bash
   php artisan db:seed --class=EmployeeSeeder
   ```
   This will generate 20 example employee records for testing.

6. Start the Laravel development server:
   ```bash
   php artisan serve
   ```
   The API will be available at `http://localhost:8000`.

## Testing

You can test the API endpoints using the provided Postman collection in the project root directory, or using curl commands:

```bash
# Create or update employee
curl -X POST http://localhost:8000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "developer",
    "salary_in_local_currency": 50000
  }'

# List all employees (user endpoint)
curl http://localhost:8000/api/employees

# Get specific employee (user endpoint)
curl http://localhost:8000/api/employees/1

# Update employee (user endpoint)
curl -X PUT http://localhost:8000/api/employees/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "role": "senior developer"
  }'

# Delete employee (user endpoint)
curl -X DELETE http://localhost:8000/api/employees/1

# List all employees with salary details (admin endpoint)
# Note: For testing purposes, add bypass_auth=1 to bypass admin authentication
curl http://localhost:8000/api/admin/employees?bypass_auth=1

# Update employee salary details (admin endpoint)
# Note: For testing purposes, add bypass_auth=1 to bypass admin authentication
curl -X PUT http://localhost:8000/api/admin/employees/1/salary?bypass_auth=1 \
  -H "Content-Type: application/json" \
  -d '{
    "salary_in_euros": 45000,
    "commission": 1000
  }'
```

## Database Schema

The employees table contains the following fields:
- `id` - Unique identifier
- `name` - Employee name
- `email` - Employee email (unique)
- `role` - Employee role
- `salary` - Legacy salary field
- `salary_in_local_currency` - Salary in local currency (nullable)
- `salary_in_euros` - Salary in euros (default: 0)
- `commission` - Commission amount (default: 500)
- `displayed_salary` - Calculated field (salary in euros + commission)
- `created_at` - Record creation timestamp
- `updated_at` - Record update timestamp# Health check
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
