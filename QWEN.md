# Fruit Map Project Context

## Project Overview

Fruit Map is an open-source platform to map fruit trees across Brazil, connecting people with accessible fruit trees in their communities. The project aims to create a mobile-responsive PWA application that allows users to discover, share, and locate fruit trees with seasonal information. It's a community-driven foraging map with location search, reviews, and a mobile-friendly design.

### Key Features
- Interactive map of fruit trees across Brazil using Leaflet.js and OpenStreetMap
- Seasonal information by geographic region
- Community-driven content contribution
- Mobile-responsive PWA design
- Secure user authentication with JWT
- User reviews and ratings
- Location-based search with radius filtering

### Technology Stack

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

## Architecture

The project follows a three-tier architecture:
1. **Frontend Layer** - React PWA client with map interface
2. **Backend Layer** - Node.js/Express API server with multiple services
3. **Data Layer** - PostgreSQL database with PostGIS extension

The backend implements a service-oriented approach with distinct components for:
- API Gateway
- Authentication Service
- Tree Management Service
- Seasonal Data Service
- File Upload Service
- Notification Service

## Database Schema

The database uses PostgreSQL with PostGIS for geospatial capabilities and includes these core tables:

- **users**: User accounts and profiles
- **tree_species**: Standardized list of fruit tree species
- **trees**: Fruit tree locations and details with geospatial data
- **tree_images**: Images associated with trees
- **seasonal_data**: Seasonal information by region
- **reviews**: User ratings and reviews
- **reports**: Moderation reports

## Building and Running

### Prerequisites
- Node.js (v18+)
- PostgreSQL with PostGIS extension
- Git

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/lfgranja/fruitmap.git
   cd fruitmap
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   ```bash
   # In the backend directory
   cp .env.example .env
   # Edit the .env file with your configuration
   ```

5. Set up the database:
   ```bash
   # Make sure PostgreSQL is running
   # Create database and run migrations
   cd backend
   npm run migrate
   ```

6. Run the development servers:
   ```bash
   # Terminal 1: Start the backend
   cd backend
   npm run dev
   
   # Terminal 2: Start the frontend
   cd frontend
   npm start
   ```

### Key Scripts
- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm run migrate` - Run database migrations
- `npm run test` - Run tests
- `npm run lint` - Run linting

## Development Conventions

### Code Style
- Use 2 spaces for indentation
- Follow Prettier formatting
- Use descriptive variable and function names
- Write JSDoc comments for exported functions
- Use lowercase for SQL keywords in queries

### Git Workflow
- Create feature branches from `main`
- Make commits with clear, descriptive messages following conventional commits format
- Use rebase before submitting pull requests
- Example commit messages:
  - `feat: Add user authentication to API`
  - `fix: Correct geospatial query for tree locations`
  - `docs: Update API documentation for seasonal data`

### Testing
- Write unit tests using Jest
- Include integration tests for API endpoints
- Ensure all tests pass before submitting pull requests
- Update tests when modifying existing functionality

## Project Structure
```
fruit-map-app/
├── backend/                 # Node.js/Express API server
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # API controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── migrations/     # Database migration scripts
│   │   ├── models/         # Database models
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic
│   │   └── validations/    # Input validation schemas
├── frontend/               # React PWA client
│   ├── public/
│   ├── src/
│   │   ├── styles/
│   │   ├── components/
│   │   └── pages/
├── docs/                   # Project documentation
│   ├── System-Architecture.md
│   ├── Database-Schema.md
│   ├── MVP-and-Requirements.md
│   └── Technology-Stack.md
└── README.md               # Project overview
```

## API Endpoints

The backend provides the following main API routes:
- `/api/auth` - Authentication endpoints (login, register, etc.)
- `/api/trees` - Tree management endpoints (CRUD, search, etc.)
- `/api/reviews` - Review management endpoints
- `/health` - Health check endpoint

## Issue Tracking

The project uses GitHub Issues for tracking work. Issues are organized into:
- Epics for major work areas
- User stories and tasks for specific features
- Bug reports with detailed reproduction steps

## Project Goals

The project aims to:
- Create an accessible platform for foraging fruit trees across Brazil
- Build a community-driven platform where users can contribute and access fruit tree locations
- Provide seasonal information to help users know when fruits are available in their regions
- Encourage sustainable food access and connection with nature
- Support both urban and rural communities in Brazil

## Contribution Guidelines

The project welcomes contributions from the community. Contributors should:
- Follow the code of conduct emphasizing respect and inclusivity
- Follow the established code style and development conventions
- Write tests for new functionality
- Update documentation as needed
- Submit pull requests with clear descriptions
- Focus on the project's mission of mapping fruit trees across Brazil

The project maintains a "good first issue" label for newcomers and encourages community engagement through GitHub issues and discussions.

---

## AGENTIC GUIDELINES FOR FRUIT MAP PROJECT

FOLLOW STRICTLY WHAT IS DEFINED IN THE FOLLOWING AGENTIC FILES:
- `/fruitmap/agentic/AGENTIC.md`
- `/fruitmap/agentic/WORKFLOW.md` 
- `/fruitmap/agentic/QWEN.md`
- `/fruitmap/agentic/GEMINI.md`
- `/fruitmap/agentic/POSTPR.md`
- `/fruitmap/agentic/STYLEGUIDE.md`
- `/fruitmap/agentic/SUMMARY.md`

When performing tasks for the Fruit Map project:
1. Adhere to the behavioral guidelines in `/fruitmap/agentic/AGENTIC.md`
2. Follow the development workflow in `/fruitmap/agentic/WORKFLOW.md`
3. Apply the code style guide in `/fruitmap/agentic/STYLEGUIDE.md`
4. Implement the post-PR process in `/fruitmap/agentic/POSTPR.md`
5. Use the specific agent guidelines in `/fruitmap/agentic/QWEN.md` or `/fruitmap/agentic/GEMINI.md`

Special considerations for Fruit Map:
- Prioritize mobile responsiveness and field usage scenarios
- Follow geospatial data handling best practices using PostGIS
- Consider seasonal data and regional variations
- Focus on community-driven features
- Optimize for map rendering and geospatial query performance
- Follow security best practices, especially for location data privacy