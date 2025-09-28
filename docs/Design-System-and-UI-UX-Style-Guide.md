# Design System and UI/UX Style Guide - Fruit Map

## Overview
This design system establishes consistent guidelines for the Fruit Map application's user interface and user experience. The design focuses on accessibility, usability, and the natural theme of fruit trees to create an intuitive experience for all users.

## Design Principles

### 1. Accessibility First
- Ensure all interfaces are usable by people with disabilities
- Maintain high contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Support for screen readers and keyboard navigation
- Clear focus indicators for interactive elements

### 2. Nature-Inspired Design
- Use colors and imagery inspired by fruit trees and nature
- Organic shapes and flowing transitions where appropriate
- Natural metaphors for navigation and interaction patterns
- Seasonal elements that reflect the app's purpose

### 3. Mobile-First Approach
- Design primarily for mobile devices first
- Progressive enhancement for larger screens
- Touch-friendly interfaces with minimum 44px touch targets
- Optimized performance for mobile networks

### 4. Community-Centric
- Encourage user contributions and participation
- Make sharing and collaboration easy
- Highlight community achievements and valuable contributions
- Build trust through transparency and verification systems

## Color Palette

### Primary Colors
- **Forest Green** (#2E8B57): Primary brand color, represents growth and nature
- **Fruit Green** (#3CB371): Secondary green for highlights and accents
- **Tree Bark Brown** (#8B4513): Complementary color for natural elements

### Secondary Colors
- **Mandarin Orange** (#FFA500): For important actions and highlights
- **Citrus Yellow** (#FFD700): For seasonal indicators and notifications
- **Pomegranate Red** (#C71585): For critical actions and warnings

### Neutral Colors
- **Pure White** (#FFFFFF): Primary background color
- **Soft Gray** (#F5F5F5): Secondary background and subtle elements
- **Light Gray** (#E0E0E0): Borders and dividers
- **Medium Gray** (#9E9E9E): Disabled elements and secondary text
- **Charcoal Gray** (#424242): Primary text color
- **Deep Charcoal** (#212121): Headings and emphasized text

### Color Usage Guidelines
- Primary color for main navigation and primary actions
- Accent colors for notifications, seasonal indicators, and important highlights
- Neutral colors for backgrounds, text, and subtle UI elements

## Typography

### Font Family
- **Primary Font**: Inter (for UI elements)
- **Secondary Font**: Lora (for headings and larger text blocks)

### Font Weights
- 400: Regular text and body content
- 500: Secondary headings and emphasized text
- 600: Primary headings and important UI elements
- 700: Page titles and key section headers

### Typography Scale
```
H1: 32px (2rem) - Page titles
H2: 24px (1.5rem) - Section headings
H3: 20px (1.25rem) - Subsection headings
H4: 18px (1.125rem) - Small section headings
Body: 16px (1rem) - Regular text
Small: 14px (0.875rem) - Captions and secondary information
Caption: 12px (0.75rem) - Labels and metadata
```

### Text Hierarchy
- Headings should clearly indicate information hierarchy
- Body text should have sufficient line height (1.5x) for readability
- Links should be visually distinct from regular text
- Use bold sparingly for emphasis

## Spacing System

### Base Unit: 8px
All spacing is based on multiples of 8px (0.5rem)
- 2x: 16px (1rem) - Small components and elements
- 3x: 24px (1.5rem) - Space between sections
- 4x: 32px (2rem) - Large components and cards
- 6x: 48px (3rem) - Major sections and page gutters
- 8x: 64px (4rem) - Large page sections

### Component Spacing
- Margins: Consistent spacing between components
- Padding: Consistent internal spacing within components
- Gutters: Consistent spacing in grid systems

## Iconography

### Icon Style
- Simple, line-based icons
- Consistent stroke width (2px)
- Rounded corners (4px radius)
- Consistent perspective and angle

### Core Icons
- Map/Location: Crosshairs or location pin
- Tree: Simplified tree silhouette
- Search: Magnifying glass
- Filter: Funnel
- Add: Plus sign
- Share: Arrow pointing outwards
- User Profile: Person silhouette
- Season: Calendar or seasonal symbol
- Navigation: Direction arrows
- Reviews: Speech bubble or star
- Camera: Camera icon for photos

### Icon Usage
- Use for navigation and primary actions
- Accompany text labels when helpful
- Maintain consistent size (24px for interface icons)
- Adapt color based on context and contrast needs

## Components

### 1. Buttons
#### Primary Button
- Background: Forest Green (#2E8B57)
- Text: Pure White (#FFFFFF)
- Border: None
- Padding: 12px 24px
- Border-radius: 8px
- Font-weight: 600
- Hover: Darken color by 10%

#### Secondary Button
- Background: Transparent
- Text: Forest Green (#2E8B57)
- Border: 2px solid Forest Green (#2E8B57)
- Padding: 10px 22px
- Border-radius: 8px
- Font-weight: 600
- Hover: Background with Forest Green

#### Danger Button
- Background: Pomegranate Red (#C71585)
- Text: Pure White (#FFFFFF)
- Padding: 12px 24px
- Border-radius: 8px
- Font-weight: 600

### 2. Cards
#### Tree Card
- Background: Pure White (#FFFFFF)
- Border: 1px solid Light Gray (#E0E0E0)
- Border-radius: 12px
- Padding: 16px
- Shadow: 0 2px 8px rgba(0,0,0,0.1)

#### Seasonal Card
- Background: Soft Gray (#F5F5F5)
- Border-radius: 8px
- Padding: 16px
- Border: 1px solid Light Gray (#E0E0E0)

### 3. Input Fields
#### Text Input
- Border: 1px solid Light Gray (#E0E0E0)
- Border-radius: 8px
- Padding: 12px
- Background: Pure White (#FFFFFF)
- Focus: Border color Forest Green (#2E8B57), box-shadow 0 0 0 2px rgba(46,139,87,0.2)

#### Search Input
- Left padding: 40px (to accommodate search icon)
- Border-radius: 24px
- Height: 48px

### 4. Navigation
#### Bottom Navigation (Mobile)
- Background: Pure White (#FFFFFF)
- Height: 80px
- Safe area padding (for notch devices)
- 3-5 primary navigation items
- Icons with labels below
- Active state: Forest Green (#2E8B57)

#### Top Navigation
- Height: 56px
- Background: Pure White (#FFFFFF)
- Border-bottom: 1px solid Light Gray (#E0E0E0)
- App title/text on left
- Action buttons on right

## Layout Patterns

### Mobile Layout
- Single column layout with centered content
- Navigation at the bottom (iOS-style)
- Cards with full-width on mobile
- Touch-friendly spacing between interactive elements

### Tablet Layout
- Adaptive single to two-column layout
- Sidebar navigation option for larger screens
- Wider cards and content areas
- More detailed information display

### Desktop Layout
- Multi-column layout with sidebar navigation
- Larger cards and more detailed information
- Advanced filtering options
- Map view with more controls

## Interaction Patterns

### Touch Targets
- Minimum 44px touch target size
- Adequate spacing between interactive elements
- Visual feedback on touch interaction
- Focus indicators for keyboard navigation

### Loading States
- Skeleton screens for content loading
- Progress indicators for longer operations
- Clear messaging when loading fails
- Optimize loading performance as much as possible

### Feedback
- Success, error, and warning states
- Toast notifications for quick feedback
- Clear error messaging
- Inline validation for forms

## Responsive Breakpoints

### Mobile
- 320px to 767px
- Single column layout
- Bottom navigation
- Touch-first interface

### Tablet
- 768px to 1023px
- Adaptive multi-column layout
- Side navigation possible
- Balance between touch and precision

### Desktop
- 1024px and above
- Multi-column layout
- Full feature set
- Mouse pointer optimized

## Accessibility Guidelines

### Color Contrast
- Maintain WCAG AA standards (4.5:1 for normal text)
- Test with color blindness simulators
- Provide alternative text for all images
- Use sufficient color contrast for interactive elements

### Keyboard Navigation
- All interactive elements accessible via keyboard
- Clear focus indicators
- Logical tab order
- Skip navigation links for screen readers

### Screen Reader Support
- Proper heading hierarchy (H1, H2, H3, etc.)
- Descriptive labels for interactive elements
- ARIA attributes where appropriate
- Semantic HTML structure

### Motion and Animation
- Respect reduced motion preferences
- Keep animations short (under 300ms)
- Provide animation control options
- Ensure animations don't cause accessibility issues

## Seasonal Theme Elements

### Visual Indicators
- Use color palettes that subtly reflect seasons
- Seasonal icons with different colors
- Seasonal patterns in backgrounds where appropriate
- Fruit-themed loading animations

### Seasonal Information Display
- Clear seasonal timing indicators
- Color-coded by season
- Calendar integration for seasonal planning
- Location-specific seasonal variations

## Cultural Considerations (Brazil-specific)

### Language Support
- Primary: Brazilian Portuguese
- Secondary: English (for wider accessibility)
- Cultural imagery and references that resonate with Brazilian users
- Localization for Brazilian states and regions

### Accessibility for Brazilian Users
- Consider economic diversity in feature design
- Optimize for various network speeds
- Account for different device capabilities
- Inclusive design for all social backgrounds

## Design Token System

### Color Tokens
```
--color-primary: #2E8B57;
--color-primary-dark: #226D42;
--color-secondary: #FFA500;
--color-background: #FFFFFF;
--color-surface: #F5F5F5;
--color-text-primary: #212121;
--color-text-secondary: #424242;
--color-text-disabled: #9E9E9E;
--color-border: #E0E0E0;
--color-error: #C71585;
```

### Spacing Tokens
```
--spacing-2: 2px;
--spacing-4: 4px;
--spacing-8: 8px;
--spacing-16: 16px;
--spacing-24: 24px;
--spacing-32: 32px;
--spacing-48: 48px;
--spacing-64: 64px;
```

### Typography Tokens
```
--font-family-primary: 'Inter', sans-serif;
--font-family-secondary: 'Lora', serif;
--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-lg: 1.125rem;
--font-size-xl: 1.25rem;
--font-size-2xl: 1.5rem;
--font-size-3xl: 2rem;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

## Implementation Guidelines

### CSS Architecture
- Use BEM methodology for class naming
- Component-first approach
- Utility classes for common patterns
- CSS custom properties for theming

### Component Reusability
- Build components that can be reused across the application
- Use props to customize component appearance/behavior
- Create a component library for consistent design
- Document component usage with examples

### Performance Considerations
- Optimize images and icons for web
- Use CSS containment where appropriate
- Limit complex animations on mobile devices
- Consider performance impact of design choices