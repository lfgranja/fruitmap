# Qwen Code Context for Fruit Map Project

## Project Overview

Fruit Map is an open-source platform to map fruit trees across Brazil, connecting people with accessible fruit trees in their communities. It's a mobile-responsive PWA application that allows users to discover, share, and locate fruit trees with seasonal information. The project follows a three-tier architecture:

1. **Frontend Layer** - React PWA client with map interface
2. **Backend Layer** - Node.js/Express API server with multiple services  
3. **Data Layer** - PostgreSQL database with PostGIS extension

## Key Features

- Interactive map of fruit trees across Brazil using Leaflet.js and OpenStreetMap
- Seasonal information by geographic region
- Community-driven content contribution
- Mobile-responsive PWA design
- Secure user authentication with JWT
- User reviews and ratings
- Location-based search with radius filtering

## Technology Stack

**Frontend:**
- React.js with TypeScript
- Leaflet.js for interactive maps
- React Leaflet for React components
- Axios for HTTP client
- React Router for routing
- CSS3 with responsive design (Flexbox/Grid)

**Backend:**
- Node.js with Express.js
- TypeScript
- PostgreSQL with PostGIS for geospatial data
- JWT-based authentication
- BCrypt for password hashing

**Additional Technologies:**
- Redis for caching
- Multer for file uploads
- Winston for logging
- Joi for input validation
- Helmet for security headers
- CORS support
- Rate limiting with express-rate-limit

## Development Guidelines

### Code Quality and Testing
- Run linting: `npm run lint`
- Type checking: `npx tsc --noEmit`
- Run tests: `npm test`
- Run builds: `npm run build`
- Format code: `npx prettier --write .`

### Development Workflow
1. Create a detailed TODO list for the issue using `todo_write` tool
2. Follow the Fruit Map style guide for coding standards
3. Write tests for new functionality (Jest for backend, React Testing Library for frontend)
4. Run existing tests to ensure nothing is broken
5. Follow TDD (Test-Driven Development) where applicable
6. Commit frequently with descriptive messages following Conventional Commits

### Commit Guidelines
Use the format: `type(scope): description`
- **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
- **Scopes**: `backend`, `frontend`, `map`, `api`, `database`, `auth`, `geospatial`, `mobile`, `seasonal`, `ui`
- **Description**: Concise, imperative, lowercase first letter, no period

### Style Guide
- **Frontend/Backend**: Use `camelCase` for variables and functions, `PascalCase` for React components and TypeScript types
- **CSS**: Use `kebab-case` for class names
- **SQL**: Use `snake_case` for tables and columns, plural table names
- Always use explicit TypeScript types and define interfaces for complex data structures
- Prioritize geospatial query performance and security

## Geospatial Data Considerations

The project heavily relies on geospatial data and PostGIS:
- Use PostGIS functions for geospatial queries (ST_DWithin, ST_Contains, etc.)
- Validate GeoJSON data before storage
- Implement efficient spatial indexing
- Consider performance implications of large geospatial datasets
- Follow data privacy guidelines for location data
- Validate coordinates in proper ranges (-90 to 90 for latitude, -180 to 180 for longitude)

## Project Structure

- `agentic/` - AI agent guidelines and development workflows
- `backend/` - Node.js/Express API server with TypeScript
- `docs/` - Project documentation
- `frontend/` - React PWA client with map interface
- `fruitmap/` - Additional project resources

## Building and Running

### Prerequisites
- Node.js (v18+)
- PostgreSQL with PostGIS extension
- Git

### Installation Steps
1. Install backend dependencies: `cd backend && npm install`
2. Install frontend dependencies: `cd frontend && npm install`
3. Set up environment variables: `cp .env.example .env` (in backend directory)
4. Set up the database: `npm run migrate` (in backend directory)
5. Run servers:
   - Backend: `cd backend && npm run dev`
   - Frontend: `cd frontend && npm start`

## Important Documentation

- `agentic/WORKFLOW.md` - Complete development workflow
- `agentic/STYLEGUIDE.md` - Code style guide
- `agentic/QWEN.md` - Qwen-specific directives
- `CONTRIBUTING.md` - Contribution guidelines
- `docs/` directory - Technical documentation