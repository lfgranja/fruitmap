# Contributing to Fruit Map

Thank you for your interest in contributing to Fruit Map! This document provides comprehensive guidelines for contributing to this open-source platform for mapping fruit trees across Brazil, ensuring a smooth and collaborative development process.

## How to Contribute

We welcome contributions of all kinds, from bug reports to new features and documentation improvements.

1.  **Report Issues**: If you find any bugs, have suggestions for improvements, or want to propose a new feature, please open an issue on GitHub. Provide as much detail as possible, including steps to reproduce bugs, expected behavior, and screenshots where applicable.

2.  **Submit Pull Requests**:
    *   **Fork the repository**: Start by forking the `lfgranja/fruitmap` repository to your GitHub account.
    *   **Create a new branch**: Create a new branch from the `main` branch for your changes. Use a descriptive branch name, e.g., `feature/issue-123-add-new-feature` or `fix/issue-456-bug-description`.
    *   **Make your changes**: Implement your changes, ensuring they adhere to the project's guidelines outlined below.
    *   **Commit your changes**: Write clear and concise commit messages following the [Conventional Commits](#commit-message-guidelines) standard.
    *   **Submit a pull request**: Open a pull request from your branch to the `main` branch of the main repository. Provide a clear description of your changes, reference the issue it addresses (e.g., `Fixes #123`), and explain the "why" behind your changes.

## Development Setup

To get started with development, follow these steps:

### Prerequisites

*   **Node.js**: Ensure you have Node.js v18+ installed.
*   **PostgreSQL**: Ensure you have PostgreSQL with PostGIS extension installed.
*   **Git**: Ensure Git is installed for version control.

### Environment Setup

1.  **Clone your forked repository**:
    ```bash
    git clone https://github.com/YOUR_USERNAME/fruitmap.git
    cd fruitmap
    ```

2.  **Install backend dependencies**:
    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies**:
    ```bash
    cd ../frontend
    npm install
    ```

4.  **Set up environment variables**:
    ```bash
    # In the backend directory
    cp .env.example .env
    # Edit the .env file with your configuration
    ```

5.  **Set up the database**:
    ```bash
    # Make sure PostgreSQL is running
    # Create database and run migrations
    cd backend
    npm run migrate
    ```

### Running the Application

1.  **Start the backend server**:
    ```bash
    cd backend
    npm run dev
    ```

2.  **Start the frontend**:
    ```bash
    # In a new terminal
    cd frontend
    npm start
    ```

### Code Quality Checks

We use `eslint` for linting and `prettier` for formatting, and TypeScript compiler for type checking to maintain code quality and consistency in the frontend, and similar tools in the backend:

*   **Run frontend linter**:
    ```bash
    cd frontend
    npm run lint
    ```
*   **Run frontend formatter**:
    ```bash
    cd frontend
    npm run format
    ```
*   **Run backend linter**:
    ```bash
    cd backend
    npm run lint
    ```
*   **Run TypeScript type checker**:
    ```bash
    cd backend
    npx tsc --noEmit
    # or in frontend
    cd frontend
    npx tsc --noEmit
    ```

## Contribution Guidelines

### Code Style

Adherence to the project's code style is mandatory. Please refer to the [`agentic/STYLEGUIDE.md`](agentic/STYLEGUIDE.md) for detailed language-specific guidelines. Key points include:

*   **Consistency**: Match the style of surrounding code.
*   **Naming Conventions**: Use `camelCase` for variables and functions in JavaScript/TypeScript; `PascalCase` for React components and TypeScript types; `kebab-case` for CSS classes.
*   **Documentation**: Use JSDoc comments for exported functions and components.
*   **Type Safety**: Always use TypeScript with proper type annotations.
*   **Error Handling**: Use specific error handling appropriate for the context.

### Testing

All new features and bug fixes should be accompanied by appropriate tests.

*   **Test Coverage**: Aim for high test coverage, especially for critical functionality.
*   **Test Organization**: Organize tests in a structure that mirrors the source code (e.g., `tests/unit/`, `tests/integration/`).
*   **Test Descriptions**: Use descriptive test names that clearly indicate what is being tested.
*   **Mocking**: Use appropriate mocking strategies for external dependencies (e.g., map services, database calls).

### Documentation

Clear and up-to-date documentation is vital for the project's success.

*   **README.md**: Keep the main `README.md` up-to-date with project overview, installation instructions, and usage examples.
*   **Code Comments**: Add comments to explain complex logic or non-obvious implementation details, especially for geospatial calculations.
*   **API Documentation**: Document all public API endpoints with clear descriptions of parameters, return values, and examples.
*   **Architecture Documentation**: Maintain documentation explaining the project's architecture and design decisions.

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for commit messages. This helps with understanding the history of changes.

*   **Format**: `type(scope): description`
    *   **Types**: `feat` (new feature), `fix` (bug fix), `docs` (documentation only changes), `style` (formatting, missing semicolons, etc.), `refactor` (code change that neither fixes a bug nor adds a feature), `perf` (code change that improves performance), `test` (adding missing tests or correcting existing tests), `build` (changes that affect the build system or external dependencies), `ci` (changes to our CI configuration files and scripts), `chore` (other changes that don't modify src or test files), `revert` (reverts a previous commit).
    *   **Scope (optional)**: A noun describing the section of the codebase affected (e.g., `backend`, `frontend`, `map`, `api`, `database`, `geospatial`, `mobile`, `seasonal`, `ui`).
    *   **Description**: A concise, imperative, lowercase first letter, no period at the end.
*   **Body (optional)**: A longer explanation of the commit message, explaining *why* the change was made, especially performance implications for geospatial queries.
*   **Footer (optional)**: Reference issues (e.g., `Fixes #123`, `Closes #456`).

### Pull Request Best Practices

*   **Clear Description**: Provide a detailed description of your changes, including the problem it solves, how it was solved, and any relevant context, especially for geospatial features.
*   **Link Issues**: Always link your pull request to the relevant issue(s) using keywords like `Fixes #`, `Closes #`, or `Resolves #`.
*   **Self-Review**: Before submitting, review your own code for any obvious errors, style violations, or missing tests.
*   **Mobile Testing**: When making UI changes, ensure they work well on mobile devices as the app is designed to be mobile-first.

## Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

## Questions?

If you have any questions about contributing, feel free to open an issue for discussion.
