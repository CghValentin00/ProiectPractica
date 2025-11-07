# Snake Game - Full Stack Project

A full-stack Snake game with Angular 20 frontend and ASP.NET Core 8 backend with SQL Server database for high scores.

## Project Structure

```
ProiectPractica/
├── frontend/          # Angular 20 application
├── backend/           # ASP.NET Core 8 Web API
│   └── beckendSnake/  # Solution and project files
└── README.md
```

## Prerequisites

- **Node.js** 20.19+ or 22.12+ (for Angular)
- **.NET 8 SDK** (for backend)
- **SQL Server LocalDB** (included with Visual Studio) or SQL Server instance

## Getting Started

### 1. Backend Setup

Navigate to the backend directory and run the API:

```bash
cd backend/beckendSnake/beckendSnake
dotnet restore
dotnet ef database update    # Apply migrations to create the database
dotnet run                    # Starts on https://localhost:7277 by default
```

The backend API will be available at:
- HTTPS: `https://localhost:7277`
- HTTP: `http://localhost:5000` (if configured)
- Swagger UI: `https://localhost:7277/swagger`

**Note:** If you encounter SQL LocalDB connection issues, update the connection string in `appsettings.json` to point to your SQL Server instance.

### 2. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
npm start              # Starts dev server with API proxy on http://localhost:4200
```

The Angular development server will:
- Run on `http://localhost:4200`
- Automatically proxy `/api/*` requests to the backend (configured in `proxy.conf.json`)
- Hot-reload when you modify source files

### 3. Open the Application

Once both servers are running:
1. Open your browser to `http://localhost:4200`
2. Play the Snake game
3. High scores are automatically saved to the SQL Server database via the backend API

## Development Workflow

### Running Both Services Together

**Option 1: Two Terminals**
- Terminal 1: `cd backend/beckendSnake/beckendSnake && dotnet run`
- Terminal 2: `cd frontend && npm start`

**Option 2: Without Proxy (direct API calls)**
- Run backend as above
- Frontend: `npm run start:no-proxy`
- Update service URLs in `frontend/src/app/services/` to use full backend URL

### Frontend Commands

```bash
npm start              # Start dev server with proxy
npm run build          # Production build
npm test               # Run unit tests
npm run watch          # Build in watch mode
```

### Backend Commands

```bash
dotnet run                        # Run the API
dotnet ef migrations add <Name>   # Create a new migration
dotnet ef database update         # Apply pending migrations
dotnet build                      # Build the project
```

## Project Features

- **Frontend (Angular 20)**
  - Snake game implementation with Canvas API
  - High scores display
  - Responsive UI
  - HTTP client service for API communication
  - Proxy configuration for seamless dev experience

- **Backend (ASP.NET Core 8)**
  - RESTful Web API
  - Entity Framework Core with SQL Server
  - CORS enabled for Angular dev server
  - Swagger/OpenAPI documentation
  - Score persistence with timestamps

## API Endpoints

- `POST /api/scores` - Submit a new score
- `GET /api/scores/highscores` - Get top 10 high scores
- `GET /api/scores/{id}` - Get a specific score by ID

## Troubleshooting

**Backend won't start:**
- Verify SQL Server LocalDB is installed: `sqllocaldb info`
- Check the connection string in `backend/beckendSnake/beckendSnake/appsettings.json`
- Ensure migrations are applied: `dotnet ef database update`

**Frontend build errors:**
- Delete `node_modules` and `.angular` folders, then run `npm install` again
- Check Node.js version: `node -v` (should be 20.19+)

**CORS errors in browser console:**
- Ensure backend is running
- Verify CORS policy in `Program.cs` includes `http://localhost:4200`
- Use the proxy by running `npm start` (not `npm run start:no-proxy`)

## Technologies Used

- **Frontend:** Angular 20, TypeScript, RxJS, Vite
- **Backend:** ASP.NET Core 8, Entity Framework Core, SQL Server
- **Dev Tools:** Angular CLI, .NET CLI, npm

## License

This is a practice project.
