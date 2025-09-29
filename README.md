# Fruit Map Project

Open-source platform to map fruit trees across Brazil, connecting people with accessible fruit trees in their communities.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Overview

Fruit Map is an open-source platform to map fruit trees across Brazil, connecting people with accessible fruit trees in their communities. The project aims to create a mobile-responsive PWA application that allows users to discover, share, and locate fruit trees with seasonal information. It's a community-driven foraging map with location search, reviews, and a mobile-friendly design.

### Key Features
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

## Architecture

The project follows a three-tier architecture:
1. **Frontend Layer** - React PWA client with map interface
2. **Backend Layer** - Node.js/Express API server with multiple services
3. **Data Layer** - PostgreSQL database with PostGIS extension

## Development Guidelines

This project uses AI agent guidelines for development, which are stored in the `agentic/` directory:
- [`agentic/AGENTIC.md`](agentic/AGENTIC.md) - Behavioral guidelines for agents
- [`agentic/WORKFLOW.md`](agentic/WORKFLOW.md) - Development workflow for Fruit Map project
- [`agentic/POSTPR.md`](agentic/POSTPR.md) - Post-PR approval process documentation
- [`agentic/QWEN.md`](agentic/QWEN.md) - Qwen-specific directives
- [`agentic/GEMINI.md`](agentic/GEMINI.md) - Gemini-specific guidelines
- [`agentic/STYLEGUIDE.md`](agentic/STYLEGUIDE.md) - Code style guide for Fruit Map

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

## Documentation

Complete project documentation is available in the `docs/` directory:
- [`docs/System-Architecture.md`](docs/System-Architecture.md)
- [`docs/Database-Schema.md`](docs/Database-Schema.md)
- [`docs/MVP-and-Requirements.md`](docs/MVP-and-Requirements.md)
- [`docs/Technology-Stack.md`](docs/Technology-Stack.md)
- And more in the [`docs/`](docs/) directory

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
