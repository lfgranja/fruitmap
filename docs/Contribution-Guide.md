# Contribution Guide - Fruit Map

## Welcome Contributors

Thank you for your interest in contributing to the Fruit Map project! This guide will help you understand how to contribute effectively to our community-driven open-source project that maps fruit trees across Brazil.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. We are committed to providing a welcoming and inclusive environment for everyone, regardless of background, identity, or experience level.

### Our Standards
- Be respectful and inclusive of all community members
- Show empathy and kindness toward others
- Give and receive constructive feedback gracefully
- Focus on what is best for the community
- Accept responsibility and apologize when needed

### Reporting Issues
If you encounter unacceptable behavior, please report it to the project maintainers at [contact email/repository issue tracker].

## Getting Started

### Prerequisites
- Git installed on your system
- Node.js (v18 or higher) and npm/yarn
- PostgreSQL with PostGIS extension
- Basic knowledge of React, TypeScript, and Node.js

### Setup Instructions

1. **Fork the Repository**
   - Go to the Fruit Map repository on GitHub
   - Click the "Fork" button in the top-right corner
   - Clone your fork to your local machine:
   ```bash
   git clone https://github.com/YOUR-USERNAME/fruit-map.git
   cd fruit-map
   ```

2. **Install Dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set Up Environment Variables**
   ```bash
   # In the backend directory, copy the example file:
   cp .env.example .env
   # Edit the .env file with your local configuration
   ```

4. **Set Up the Database**
   - Install PostgreSQL with PostGIS extension
   - Create a database named `fruit_map_dev`
   - Run the database migrations:
   ```bash
   cd backend
   npm run migrate
   ```

5. **Run the Development Server**
   ```bash
   # Start the backend server
   cd backend
   npm run dev
   
   # In a separate terminal, start the frontend:
   cd frontend
   npm start
   ```

## How to Contribute

### Reporting Bugs

1. Use the GitHub issue tracker to report bugs
2. Verify the bug exists in the latest version
3. Check if the issue has already been reported
4. Include detailed information:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Environment details (OS, browser, versions)
   - Screenshots if relevant

### Suggesting Features

1. Use the GitHub issue tracker for feature requests
2. Explain the problem the feature would solve
3. Describe your proposed solution
4. Include any relevant mockups or examples
5. Consider the impact on the broader user base

### Pull Requests

1. **Fork the repository** and create a feature branch
2. **Make changes** following the project's coding standards
3. **Write or update tests** as needed
4. **Ensure all tests pass**
5. **Update documentation** if necessary
6. **Submit a pull request** with a clear description

### Good First Issues

Look for issues labeled "good first issue" or "beginner-friendly" to start contributing. These are typically well-defined tasks that are suitable for new contributors.

## Development Guidelines

### Code Style

#### TypeScript/JavaScript
- Use 2 spaces for indentation
- Follow the style enforced by Prettier
- Use descriptive variable and function names
- Write JSDoc comments for exported functions

#### SQL
- Use lowercase for SQL keywords
- Properly format multi-line queries
- Use consistent naming conventions

### Git Workflow

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make commits with clear, descriptive messages:
   ```
   feat: Add user authentication to API
   fix: Correct geospatial query for tree locations
   docs: Update API documentation for seasonal data
   ```

3. Rebase before submitting a pull request:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

### Testing

- Write unit tests for new functionality
- Update existing tests that are affected by your changes
- Ensure all tests pass before submitting a pull request
- Add integration tests for new features

### Documentation

- Update the README when adding new features
- Document API endpoints with examples
- Include code examples when appropriate
- Update the documentation if your changes affect public interfaces

## Component Architecture

### Adding New Features

When adding new features:

1. Ensure they align with the project's mission and roadmap
2. Consider the impact on performance and user experience
3. Plan for accessibility and internationalization
4. Write comprehensive tests
5. Update relevant documentation

### API Development

When developing API endpoints:

1. Follow RESTful principles
2. Use proper HTTP status codes
3. Validate and sanitize input data
4. Implement rate limiting where appropriate
5. Document endpoints with OpenAPI/Swagger

## Community

### Communication Channels

- GitHub Issues: For bug reports and feature requests
- GitHub Discussions: For questions and community discussions
- Project Chat: [Add if applicable]

### Getting Help

If you need help:
1. Read the documentation
2. Search existing issues and discussions
3. Ask questions in a new GitHub issue or discussion
4. Be specific about your problem and what you've tried

## Recognition

We appreciate all contributions, from bug reports to major feature implementations. Contributors will be recognized in the project documentation and may be featured in the community showcase.

## Additional Resources

- [System Architecture](System-Architecture.md)
- [Database Schema](Database-Schema.md)
- [Technology Stack](Technology-Stack.md)
- [MVP Requirements](MVP-and-Requirements.md)

## Questions?

If you have questions about contributing, please open an issue in the GitHub repository or reach out to the maintainers. We're here to help and appreciate your interest in making Fruit Map better for the community!