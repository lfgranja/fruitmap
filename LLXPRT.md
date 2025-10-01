# Fruit Map Project - LLXPRT Analysis

## Project Overview

Fruit Map is an open-source platform designed to map fruit trees across Brazil, connecting people with accessible fruit trees in their communities. This is a community-driven foraging map with location search, reviews, and mobile-friendly design.

**Project Type:** Full-stack web application with geospatial capabilities
**Primary Language:** TypeScript (both frontend and backend)
**Architecture:** Three-tier architecture (Frontend → Backend → Database)

## Directory Structure

```
/home/luis/fruit-map-app/
├───backend/              # Node.js/Express API server
│   ├───src/
│   │   ├───config/       # Database configuration
│   │   ├───controllers/  # Business logic handlers
│   │   ├───middleware/   # Authentication and other middleware
│   │   ├───migrations/  # Database migrations
│   │   ├───models/      # Sequelize data models
│   │   ├───routes/      # API route definitions
│   │   ├───services/     # Business logic services
│   │   └───validations/ # Input validation schemas
│   ├───dist/            # Compiled JavaScript output
│   ├───node_modules/    # Dependencies
│   └───*.config.*       # Configuration files
├───frontend/            # React PWA client
│   ├───src/
│   │   ├───services/    # API service clients
│   │   └───styles/      # CSS styling
│   ├───public/          # Static assets
│   └───node_modules/    # Dependencies
├───docs/                # Project documentation
├───agentic/             # AI agent development guidelines
├───.github/             # GitHub Actions workflows
└───*.md                # Project metadata files
```

## Technology Stack

### Frontend
- **Framework:** React.js 18.2.0 with TypeScript
- **Mapping:** Leaflet.js 1.9.4 with React-Leaflet 4.2.1
- **HTTP Client:** Axios 1.4.0
- **Routing:** React Router DOM 6.14.1
- **Styling:** CSS3 with responsive design (Flexbox/Grid)
- **Testing:** React Testing Library, Jest
- **Build Tool:** Create React App (react-scripts 5.0.1)

### Backend
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js 4.21.2 with TypeScript
- **Database:** PostgreSQL with PostGIS extension (geospatial data)
- **ORM:** Sequelize 6.37.5
- **Authentication:** JWT (JSON Web Tokens) with BCrypt password hashing
- **Security:** Helmet, CORS, express-rate-limit, express-validator
- **Logging:** Winston 3.17.0
- **File Upload:** Multer 2.0.0
- **Validation:** Joi 17.13.3
- **Testing:** Jest with Supertest

### Development Tools
- **Package Manager:** npm
- **TypeScript:** v5.7.2 (backend), v4.9.5 (frontend - downgraded for react-scripts compatibility)
- **Linting:** ESLint with love config and Prettier integration
- **Database Migrations:** Sequelize CLI
- **Hot Reload:** Nodemon for backend development

## Key Features

### Core Functionality
- **Interactive Map:** Leaflet.js with OpenStreetMap tiles for tree location visualization
- **Geospatial Queries:** PostGIS-powered location-based search with radius filtering
- **User Authentication:** JWT-based secure authentication system
- **Community Contributions:** Users can add new fruit trees with location data
- **Reviews and Ratings:** Community-driven quality assessment
- **Seasonal Information:** Geographic region-based fruit availability data
- **Mobile Responsive:** PWA design optimized for mobile devices

### Technical Capabilities
- **Real-time Map Interaction:** Click-to-select tree locations, dynamic markers
- **Form Validation:** Comprehensive input validation on both client and server
- **Error Handling:** Graceful error handling with user-friendly notifications
- **Offline Support:** Mock data fallback when API is unavailable
- **Geolocation:** Support for latitude/longitude coordinate systems
- **File Upload:** Image upload capabilities for tree documentation

## Development Conventions

### Code Style
- **TypeScript:** Strict type definitions throughout both frontend and backend
- **Component Architecture:** Functional React components with hooks
- **API Design:** RESTful API with consistent response formats
- **Database:** Sequelize ORM with proper model associations
- **Error Handling:** Comprehensive error handling with appropriate HTTP status codes

### Project Structure Patterns
- **Separation of Concerns:** Clear separation between controllers, models, routes, and services
- **Type Safety:** Extensive use of TypeScript interfaces and types
- **Configuration Management:** Environment-based configuration with .env files
- **Modular Architecture:** Feature-based organization of code

### Git Workflow
- **Branching Strategy:** Feature branches from main with issue numbers
- **Commit Messages:** Conventional Commits format (type(scope): description)
- **Pull Request Process:** Automated CI/CD with comprehensive checks
- **Code Review:** Required review process with automated testing

## Building and Running

### Prerequisites
- Node.js (v18+)
- PostgreSQL with PostGIS extension
- Git

### Installation Steps

1. **Clone and Setup Repository:**
   ```bash
   git clone https://github.com/lfgranja/fruitmap.git
   cd fruitmap
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your database configuration
   npm run migrate
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   # Edit .env with API URL if needed
   ```

### Development Commands

#### Backend
```bash
cd backend

# Development server with hot reload
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Run linting
npm run lint

# Database migrations
npm run migrate
npm run migrate:undo

# Database seeding
npm run seed
```

#### Frontend
```bash
cd frontend

# Development server
npm start

# Build for production
npm run build

# Run tests
npm run test

# Eject from Create React App (not recommended)
npm run eject
```

### Production Deployment

1. **Build Frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Build Backend:**
   ```bash
   cd backend
   npm run build
   ```

3. **Environment Configuration:**
   - Set `NODE_ENV=production`
   - Configure production database URL
   - Set JWT secret for production
   - Configure CORS for production frontend URL

4. **Start Services:**
   ```bash
   # Backend
   cd backend
   npm start

   # Frontend (serve static files with nginx/apache)
   # Serve the build/ directory
   ```

## Configuration

### Environment Variables

#### Backend (.env)
```bash
NODE_ENV=development
PORT=5000
DATABASE_URL=sqlite:./db.sqlite  # Development
# DATABASE_URL=postgresql://user:pass@localhost:5432/fruitmap  # Production
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_here_for_development
```

#### Frontend (.env)
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

### Database Configuration
- **Development:** SQLite for easy setup
- **Production:** PostgreSQL with PostGIS for geospatial queries
- **Migrations:** Sequelize CLI for database schema management

## Testing Strategy

### Frontend Testing
- **Framework:** React Testing Library with Jest
- **Testing Approach:** Component testing, integration testing
- **Coverage:** Comprehensive test coverage for user interactions

### Backend Testing
- **Framework:** Jest with Supertest for API testing
- **Testing Approach:** Unit tests for controllers/services, integration tests for API endpoints
- **Database:** Test database with proper setup/teardown

### End-to-End Testing
- **Manual:** Interactive testing through the web interface
- **Automated:** Future implementation with Cypress or similar

## Documentation

### Key Documentation Files
- `README.md`: Project overview and setup instructions
- `docs/System-Architecture.md`: Detailed system architecture
- `docs/Database-Schema.md`: Database structure and relationships
- `docs/MVP-and-Requirements.md`: Project requirements and features
- `docs/Technology-Stack.md`: Comprehensive technology overview

### AI Agent Guidelines
- `agentic/AGENTIC.md`: Behavioral guidelines for AI agents
- `agentic/WORKFLOW.md`: Development workflow and processes
- `agentic/STYLEGUIDE.md`: Code style and conventions
- `agentic/POSTPR.md`: Post-PR approval documentation

## Security Considerations

### Authentication & Authorization
- JWT-based authentication with secure token management
- BCrypt password hashing
- Role-based access control (future implementation)

### Data Security
- Input validation and sanitization
- SQL injection prevention through parameterized queries
- XSS protection through output encoding
- CSRF protection

### API Security
- Rate limiting to prevent abuse
- CORS configuration for cross-origin requests
- Security headers via Helmet middleware
- Request validation with express-validator

## Performance Considerations

### Frontend Performance
- Lazy loading of map components
- Optimized image handling
- Efficient state management
- Code splitting for large applications

### Backend Performance
- Database query optimization
- Caching strategies with Redis
- Efficient geospatial queries with PostGIS
- API response optimization

### Database Performance
- Proper indexing strategy
- Query optimization for geospatial data
- Connection pooling
- Read replicas for high-read operations

## Future Development

### Planned Features
- Real-time notifications for seasonal updates
- Advanced search and filtering capabilities
- User profiles and contribution tracking
- Mobile app development
- Social features (sharing, commenting)

### Technical Improvements
- GraphQL API for efficient data fetching
- Microservices architecture
- Advanced caching strategies
- Monitoring and analytics integration
- CI/CD pipeline optimization

## Troubleshooting

### Common Issues
- **Database Connection:** Verify PostgreSQL is running and credentials are correct
- **Map Display:** Ensure Leaflet CSS is properly imported
- **API Errors:** Check CORS configuration and environment variables
- **Build Failures:** Verify TypeScript versions and dependencies

### Debug Commands
```bash
# Check database connection
cd backend && npm run migrate

# Verify TypeScript compilation
npx tsc --noEmit

# Run linting
npm run lint

# Check build process
npm run build
```

## Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch from main
3. Implement changes with tests
4. Run quality checks (lint, build, test)
5. Submit pull request with detailed description
6. Address review feedback
7. Create post-PR documentation

### Code Quality Standards
- Follow TypeScript best practices
- Maintain consistent code formatting
- Write comprehensive tests
- Document new features and changes
- Follow security best practices

This LLXPRT analysis provides a comprehensive overview of the Fruit Map project, enabling AI agents to understand the project structure, conventions, and development processes for effective collaboration and development assistance.