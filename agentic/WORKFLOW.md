# Development Workflow for Fruit Map Project

This document provides a comprehensive development workflow for the Fruit Map project, incorporating best practices adapted specifically for this TypeScript/React/Node.js application.

## 1. Repository Setup

1. Fork the repository on GitHub
2. Clone your forked repository locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/fruitmap.git
   cd fruitmap
   ```
3. Navigate to the project directory and verify structure
4. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/lfgranja/fruitmap.git
   ```
5. Verify remotes:
   ```bash
   git remote -v
   ```

## 2. Issue Selection and Branching

### Issue Selection
1. Review open issues on GitHub, prioritizing:
   - Issues with `bug` label
   - Issues with `priority:high` label
   - Issues in the current milestone
2. For new features, create an issue first to discuss the proposal
3. Comment on the issue to indicate you're working on it
4. Assign the issue to yourself if possible

### Branching Strategy
1. Sync with upstream:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```
2. Create a new branch for your issue:
   ```bash
   git switch -c feature/issue-NUMBER-brief-description main
   ```
   - Replace `NUMBER` with the actual issue number
   - Use descriptive branch names in `kebab-case`
   - Always branch from `main`

## 3. Development Process

1. Create a detailed TODO list for the issue using `todo_write` tool
2. Follow the Fruit Map style guide for coding standards
3. Write tests for new functionality (Jest for backend, React Testing Library for frontend)
4. Run existing tests to ensure nothing is broken
5. Follow TDD (Test-Driven Development) where applicable
6. Commit frequently with descriptive messages following Conventional Commits

## 4. Code Quality and Testing for Fruit Map

1. Run linting tools:
   - Frontend: `npm run lint` (uses ESLint)
   - Backend: `npm run lint` (uses ESLint)
   - Type checking: `npx tsc --noEmit`
2. Run formatting tools:
   - Format all files: `npx prettier --write .`
3. Run tests:
   - Frontend: `npm run test` (uses Jest/React Testing Library)
   - Backend: `npm run test` (uses Jest)
4. Run builds:
   - Frontend: `npm run build`
   - Backend: `npm run build`
5. Always run project-specific build, linting and type-checking commands after making changes

## 5. Commit Guidelines

1. Create a Conventional Commit message:
   ```bash
   type(scope): description

   [optional body]

   [optional footer]
   ```
2. Use appropriate commit types:
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes (formatting, missing semicolons, etc.)
   - `refactor`: Code refactoring
   - `perf`: Performance improvements
   - `test`: Adding or modifying tests
   - `build`: Build system changes
   - `ci`: CI configuration changes
   - `chore`: Maintenance tasks
   - `revert`: Reverting a previous commit
3. Use appropriate scopes (examples):
   - Backend: `backend`
   - Frontend: `frontend`
   - Database: `database`
   - Map components: `map`
   - API routes: `api`
   - Authentication: `auth`
4. Keep descriptions concise, imperative, lowercase first letter, no period
5. Reference issues in the footer:
   ```bash
   Fixes #123
   Closes #456
   ```

## 6. Pre-Push Checklist

1. Stage only changes related to the current issue:
   ```bash
   # Add specific files related to the current issue
   git add frontend/src/path/to/modified-file.tsx
   git add backend/src/path/to/modified-file.ts
   ```
2. Review staged changes:
   ```bash
   git diff --staged
   ```
3. Run all quality checks (linting, formatting, type checking, tests)
4. Create a final commit with a Conventional Commit message:
   ```bash
   git commit -m "feat(frontend): add new tree detail view. Fixes #ISSUE_NUMBER"
   ```
5. Push to your fork:
   ```bash
   git push origin feature/issue-NUMBER-brief-description
   ```

## 7. Pull Request Process

1. Create a pull request from your branch to the `main` branch of the upstream repository
2. Use the PR template if available
3. Provide a clear description of the changes
4. Link to the related issue
5. Request review from maintainers
6. Address any feedback received during the review process

## 8. Post-PR Approval Process for Fruit Map

After a PR has been approved and merged, create the following documentation in the `docs/` directory:

### 8.1 LESSONS_LEARNED{PR_NUMBER}.md
Document key lessons learned during the development process:
- Technical challenges encountered and how they were solved
- Design decisions made and their rationale
- Unexpected issues or bugs discovered
- Performance considerations related to geospatial queries or map rendering
- Testing strategies that proved effective
- Any deviations from the original plan and reasons why

### 8.2 FUTURE_WORK_TODO{PR_NUMBER}.md
Document future work related to the implemented feature:
- Identified areas for improvement
- Potential optimizations (particularly for geospatial queries and map performance)
- Related features that could be implemented next
- Technical debt introduced (if any) and plans to address it
- Ideas for extending the current implementation

### 8.3 ISSUES_TO_CREATE{PR_NUMBER}.md
Create a list of issues that should be created in the repository:
- Detailed descriptions of each issue
- Appropriate labels and milestones
- Priority levels
- Estimated complexity
- Any relevant context or background information

## 9. Fruit Map Architecture and Technology Stack

### 9.1 Architecture
The Fruit Map project follows a three-tier architecture:
- **Frontend Layer**: React PWA client with map interface
- **Backend Layer**: Node.js/Express API server with multiple services
- **Data Layer**: PostgreSQL database with PostGIS extension

### 9.2 Technology Stack
- **Frontend**: React.js, TypeScript, Leaflet.js, React-Leaflet, Axios, React Router
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with PostGIS for geospatial data
- **Authentication**: JWT-based authentication
- **Testing**: Jest, React Testing Library, Supertest

### 9.3 Development Tools
- **Version Control**: Git with GitHub for hosting
- **Dependency Management**: npm
- **Testing**: Jest (backend), React Testing Library (frontend)
- **CI/CD**: GitHub Actions
- **Documentation**: Markdown files in the repository

## 10. Core Development Principles for Fruit Map

1. Always adhere to project conventions for style, structure, and architecture
2. Maintain backward compatibility when possible
3. Write clear, comprehensive documentation for new features
4. Follow security best practices (input validation, SQL injection prevention, JWT security)
5. Consider performance implications of geospatial queries and map rendering
6. Write tests for all new functionality
7. Use descriptive variable and function names
8. Keep functions small and focused
9. Avoid code duplication
10. Follow the Boy Scout Rule: "Always leave the code better than you found it"

## 11. Geospatial Data Considerations

1. Always use PostGIS functions for geospatial queries
2. Properly validate GeoJSON data before storing
3. Implement efficient spatial indexing
4. Consider performance implications of large geospatial datasets
5. Follow best practices for geospatial data security and privacy

## 12. Collaboration and Communication

1. Participate in discussions on GitHub issues
2. Be respectful and constructive in all interactions
3. Ask for help when needed
4. Provide feedback to other contributors
5. Follow the project's code of conduct

## 13. Security Considerations for Fruit Map

### 13.1 API Security
- Implement proper input validation and sanitization
- Use parameterized queries to prevent SQL injection
- Implement rate limiting to prevent abuse
- Properly validate and sanitize location data

### 13.2 Data Privacy
- Implement privacy controls for location data
- Use appropriate data retention policies
- Ensure compliance with local data protection regulations
- Consider geospatial data privacy implications