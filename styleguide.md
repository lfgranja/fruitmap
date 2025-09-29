# Fruit Map Project Code Style Guide

This document provides actionable style guidelines for the AI agent when generating or modifying code within the Fruit Map project.

---

## 1. General Principles

*   **Consistency:** Match the style of surrounding code.
*   **Readability:** Prioritize clear, unambiguous code.
*   **Idiomatic:** Use language-specific and framework-specific idioms.
*   **Maintainability:** Write code that is easy to maintain and extend.
*   **Performance:** Consider performance implications, especially for geospatial queries and map rendering.

---

## 2. Language-Specific Guidelines

### 2.1. TypeScript / React (Frontend)

*   **Linting Tool:** Use `eslint`.
    *   **Command:** `npm run lint`
*   **Formatting Tool:** Use `prettier`.
    *   **Command:** `npm run format`
*   **Type Checking Tool:** Use TypeScript compiler.
    *   **Command:** `npx tsc --noEmit`
*   **Naming Conventions:**
    *   Variables, functions, properties: `camelCase`
    *   React Components, types/interfaces: `PascalCase`
    *   CSS classes: `kebab-case`
*   **TypeScript Usage:** Always use explicit types. Define interfaces for complex data structures like Tree, User, and seasonal information.
*   **React Best Practices:**
    *   Use functional components with hooks
    *   Follow the container/presentational component pattern where appropriate
    *   Use React-Leaflet properly for map components
    *   Implement proper error boundaries
    *   Use React's key prop correctly for lists
*   **Testing:** Use React Testing Library for component testing. Write tests that simulate user interactions with map components.

### 2.2. TypeScript / Express (Backend)

*   **Linting Tool:** Use `eslint`.
    *   **Command:** `npm run lint`
*   **Formatting Tool:** Use `prettier`.
    *   **Command:** `npm run format`
*   **Type Checking Tool:** Use TypeScript compiler.
    *   **Command:** `npx tsc --noEmit`
*   **Naming Conventions:**
    *   Variables, functions: `camelCase`
    *   Classes: `PascalCase`
    *   Constants: `UPPER_SNAKE_CASE`
    *   API routes: Use plural nouns (e.g., `/trees`, `/users`)
*   **TypeScript Usage:** Always use explicit types. Define interfaces for request/response objects, database models, and configuration.
*   **Express Best Practices:**
    *   Use middleware appropriately
    *   Implement proper error handling middleware
    *   Use async/await for asynchronous operations
    *   Structure routes in separate files
*   **Database (Sequelize/PostgreSQL):**
    *   Use proper model definitions with TypeScript interfaces
    *   Implement associations correctly
    *   Use proper transaction handling when needed
*   **Geospatial Code:**
    *   Use PostGIS functions directly when possible
    *   Validate GeoJSON before processing
    *   Implement efficient spatial queries
*   **Testing:** Use Jest for backend testing. Include tests for geospatial queries and API endpoints.

### 2.3. SQL / PostgreSQL with PostGIS

*   **Naming Conventions:**
    *   Tables: plural, `snake_case` (e.g., `fruit_trees`)
    *   Columns: `snake_case`
    *   Functions: `snake_case`
*   **Geospatial Queries:**
    *   Use PostGIS functions (ST_DWithin, ST_Contains, etc.) for spatial operations
    *   Ensure proper spatial indexing on geospatial columns
    *   Validate input coordinates before geospatial operations
*   **Security:**
    *   Use parameterized queries to prevent SQL injection
    *   Implement proper access controls in queries where applicable

### 2.4. CSS / Styling

*   **Naming Conventions:** Use `kebab-case` for class names
*   **Methodology:** Follow BEM methodology or use CSS-in-JS for local scoping
*   **Responsive Design:** Ensure all components work well on mobile and desktop
*   **Accessibility:** Implement proper ARIA attributes and semantic HTML

---

## 3. Fruit Map-Specific Guidelines

### 3.1. Geospatial Data Handling

*   **Coordinate Validation:** Always validate latitude and longitude ranges (-90 to 90, -180 to 180)
*   **GeoJSON:** Use proper GeoJSON formatting for spatial data
*   **Performance:** Optimize geospatial queries using appropriate indexes
*   **Privacy:** Consider privacy implications of location data

### 3.2. Map Component Guidelines

*   **Performance:** Implement proper clustering or pagination for large numbers of markers
*   **Mobile:** Ensure touch interactions work properly on mobile devices
*   **Accessibility:** Provide alternative ways to access map information
*   **Loading States:** Handle map loading and error states gracefully

### 3.3. Seasonal Information

*   **Data Structure:** Use consistent formats for seasonal data
*   **Validation:** Validate seasonal ranges and patterns
*   **Caching:** Consider caching seasonal data appropriately

---

## 4. Commit Message Guidelines

*   **Format:** `type(scope): description`
    *   **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
    *   **Scope (optional):** `frontend`, `backend`, `map`, `api`, `database`, `auth`, `geospatial`, `mobile`, `seasonal`, `ui`.
    *   **Description:** Concise, imperative, lowercase first letter, no period.
*   **Body (optional):** Explain *why* the change was made, especially performance implications for geospatial queries.
*   **Footer (optional):** Reference issues (e.g., `Fixes #123`).

Examples:
*   `feat(map): improve marker clustering performance`
*   `fix(geospatial): fix query to use PostGIS index`
*   `feat(seasonal): add regional seasonal data support`

---

## 5. Documentation Guidelines

*   **README.md:** Keep it up-to-date with project overview, installation instructions, and usage examples for fruit tree mapping.
*   **Code Comments:** Add comments to explain complex geospatial logic or non-obvious implementation details.
*   **API Documentation:** Document all public API endpoints with clear descriptions of parameters, return values, and examples.
*   **Architecture Documentation:** Maintain documentation explaining the three-tier architecture and geospatial data flow.
*   **Geospatial Documentation:** Document complex geospatial queries and performance considerations.

---

## 6. Testing Guidelines

*   **Test Coverage:** Aim for high test coverage, especially for critical geospatial functionality.
*   **Test Organization:** Organize tests in a structure that mirrors the source code (e.g., `tests/unit/`, `tests/integration/`).
*   **Test Descriptions:** Use descriptive test names that clearly indicate what is being tested, especially for geospatial and map functionality.
*   **Mocking:** Use appropriate mocking strategies for external dependencies like geospatial services.
*   **Integration Tests:** Include integration tests for critical workflows like tree creation, geospatial search, and map rendering.
*   **Mobile Tests:** Test mobile responsiveness and touch interactions where applicable.