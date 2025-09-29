# Post-PR Approval Process for Fruit Map

This document contains the complete post-PR approval process with detailed steps for documentation creation, issue tracking, and quality assurance specific to the Fruit Map project.

## 1. Documentation Creation

After a PR has been approved and merged, create the following documentation in the `docs/` directory:

### 1.1. LESSONS_LEARNED{PR_NUMBER}.md

Create a document that captures key lessons learned during the development process for Fruit Map:

- Technical challenges encountered with geospatial queries, map rendering, or mobile responsiveness and how they were solved
- Design decisions made for fruit tree data models, seasonal information, or user contribution workflows and their rationale
- Unexpected issues or bugs discovered in the geospatial or mapping components
- Performance considerations for map rendering or geospatial query optimization
- Testing strategies that proved effective for map components or geospatial functionality
- Any deviations from the original plan and reasons why
- Insights about seasonal data handling or community features

### 1.2. FUTURE_WORK_TODO{PR_NUMBER}.md

Document future work related to the implemented feature or bug fix in Fruit Map:

- Identified areas for improvement in map performance or geospatial queries
- Potential optimizations for tree search or seasonal filtering
- Related features that could be implemented next (e.g., offline maps, advanced filters)
- Technical debt introduced in geospatial functionality (if any) and plans to address it
- Ideas for extending the current mapping or community features
- Mobile experience enhancements
- Seasonal data accuracy improvements

### 1.3. ISSUES_TO_CREATE{PR_NUMBER}.md

Based on the work completed and future considerations, create a list of issues that should be created in the Fruit Map repository:

- Detailed descriptions of each issue, particularly around geospatial features or community functionality
- Appropriate labels and milestones
- Priority levels
- Estimated complexity
- Any relevant context or background information specific to fruit tree mapping
- Seasonal data considerations
- Mobile usage scenarios

## 2. Issue Creation Process

After the PR is merged, create the issues documented in `ISSUES_TO_CREATE{PR_NUMBER}.md`:

1. Parse the ISSUES_TO_CREATE{PR_NUMBER}.md file
2. For each issue:
   - Create a new issue in the Fruit Map repository
   - Apply appropriate labels (e.g., `enhancement`, `bug`, `geospatial`, `map`, `community`, `technical debt`, `help wanted`)
   - Assign to the appropriate milestone if applicable
   - Set priority levels using labels (e.g., `priority:high`, `priority:medium`, `priority:low`)
   - Include all relevant context and background information from the document
3. Link related issues to each other
4. Update the ISSUES_TO_CREATE{PR_NUMBER}.md file to indicate which issues have been created

## 3. Quality Assurance for Fruit Map

Before considering the post-PR process complete:

1. Verify that all documentation has been properly created and is accurate
2. Confirm that all issues identified for creation have been created
3. Ensure that the newly created issues have appropriate labels, milestones, and descriptions
4. Review the code changes one final time to ensure they meet all Fruit Map project standards
5. Update any relevant project documentation (README.md, architecture docs, etc.) if necessary
6. Test map functionality and geospatial queries if relevant to the changes
7. Verify mobile responsiveness of UI changes

## 4. Knowledge Sharing

1. Share key learnings about geospatial implementation or mobile UX with the team
2. Update internal knowledge bases or wikis if applicable
3. Consider documenting successful patterns for community features or seasonal data handling
4. Present the work in team meetings or demos if appropriate

## 5. Follow-up Actions

1. Monitor the created issues to see if they receive community interest
2. Be prepared to provide additional context or clarification on created issues related to geospatial features
3. Track the implementation of future work items, especially those related to map performance or user experience
4. Gather feedback from users or other developers on the implemented fruit tree mapping features
5. Monitor for any performance regressions in geospatial queries or map rendering
6. Follow up on seasonal data accuracy or community usage patterns

## 6. Fruit Map-Specific Considerations

### 6.1. Geospatial Data Quality
- Verify that new geospatial queries maintain accuracy and performance
- Document any changes to geospatial indexing strategies
- Consider spatial data privacy implications in documentation

### 6.2. Mobile Experience
- Document mobile testing results and any mobile-specific issues found
- Capture lessons learned about field usage scenarios
- Record performance on mobile devices if relevant

### 6.3. Community Features
- Document insights about user contribution workflows
- Capture lessons about community engagement features
- Record any moderation or quality control considerations

## 7. Automation Opportunities

Consider automating parts of this process:
- Template creation for the three documentation files
- Automated issue creation based on documentation
- Integration with GitHub Actions for documentation generation
- Automated quality checks for geospatial code