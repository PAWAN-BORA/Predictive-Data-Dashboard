# Predictive Data Dashboard Backend

Minimal Express + TypeScript REST API boilerplate with modular structure for rapid prototyping and clear code separation.

## Getting Started

1. Install dependencies
   ```sh
   npm install
   ```

2. Run in development mode (hot reload)
   ```sh
   npm run dev
   ```

3. Build and run in production
   ```sh
   npm run build
   npm start
   ```

## API Endpoints

- **GET /api/health**
  - Description: Health check endpoint (returns `{ status: "ok" }` if server is running)

## Project Structure

- `models/` – Data layer (dummy, async)
- `services/` – Business logic layer (async)
- `controllers/` – API request handlers
- `routes/` – Express routers, maps URL to controller logic
- `middleware/` – Shared middleware (e.g., error handler)

## Error Handling

All errors are caught and passed to a centralized error-handling middleware. Errors return a JSON structure:

```json
{
  "error": "Error message"
}
```
with proper HTTP status codes.

## Example

**GET /api/health**

Response:
```json
{ "status": "ok" }
```

---
