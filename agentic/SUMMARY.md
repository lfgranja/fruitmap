# AGENTIC Framework for Fruit Map - Summary

## Overview

This directory contains the AGENTIC framework adapted specifically for the Fruit Map project - an open-source platform to map fruit trees across Brazil. The framework provides comprehensive guidelines for AI-powered software development agents working on this TypeScript/React/Node.js application with geospatial capabilities.

## Directory Structure

```
fruitmap/agentic/
├── AGENTIC.md      # Core behavioral guidelines for AI agents
├── WORKFLOW.md     # Development workflow specific to Fruit Map
├── QWEN.md         # Qwen-specific directives for Fruit Map
├── GEMINI.md       # Gemini-specific guidelines for Fruit Map
├── POSTPR.md       # Post-PR approval process for Fruit Map
├── STYLEGUIDE.md   # Code style guide for Fruit Map
└── SUMMARY.md      # This summary document
```

## Key Adaptations for Fruit Map Project
- **Project Focus:** Adapted from general AI automation to fruit tree mapping platform for Brazil
- **Frontend:** React.js, TypeScript, Leaflet.js for mapping functionality
- **Backend:** Node.js/Express with TypeScript for API services
- **Database:** PostgreSQL with PostGIS for geospatial data
- **Tools:** ESLint/Prettier/TSC for code quality

### Fruit Map-Specific Considerations
- **Geospatial Focus:** Guidelines for PostGIS queries, coordinate validation, and map performance
- **Mobile-First:** Emphasis on mobile responsiveness and field usage scenarios
- **Community Features:** Guidelines for user contributions and seasonal data management
- **Seasonal Data:** Special considerations for seasonal fruit availability information

## Core Principles Maintained

1. **Conventional Commits:** Following the `type(scope): description` format
2. **Quality Assurance:** Emphasis on testing, linting, and type-checking
3. **Documentation:** Post-PR documentation process (Lessons Learned, Future Work, Issues)
4. **Security:** Best practices for API security and geospatial data privacy
5. **Code Quality:** Strong typing, consistent style, and idiomatic code

## Implementation Benefits for Fruit Map

### Development Process
- Standardized workflow for contributors
- Consistent code quality across the team
- Better issue tracking and management
- Systematic documentation of decisions

### Geospatial Considerations
- Optimized queries using PostGIS functions
- Proper coordinate validation and error handling
- Performance considerations for map rendering
- Spatial data privacy guidelines

### Mobile Experience
- Focus on mobile-responsive design
- Field usage scenario considerations
- Performance optimization for mobile devices
- Touch interaction guidelines

## Usage Guidelines

When working with AI agents on the Fruit Map project:
1. Agents should follow the behavioral guidelines in `AGENTIC.md`
2. Adhere to the development workflow in `WORKFLOW.md`
3. Apply the code style guidelines in `STYLEGUIDE.md`
4. Follow the post-PR process in `POSTPR.md`
5. Refer to specific agent guidelines in `QWEN.md` or `GEMINI.md`

## Quality Assurance

The AGENTIC framework ensures:
- Consistent code quality across the Fruit Map codebase
- Proper handling of geospatial data
- Mobile-first development approach
- Comprehensive documentation of development decisions
- Security best practices for API and user data
- Performance considerations for map rendering and geospatial queries