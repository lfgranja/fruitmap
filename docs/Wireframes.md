# Wireframes - Fruit Map

## Overview
This document outlines the wireframe designs for the Fruit Map application. The wireframes focus on usability, accessibility, and efficient discovery of fruit trees across Brazil.

## Design Principles
- Mobile-first approach (designed primarily for mobile devices)
- Simple and intuitive navigation
- Prominent map display
- Clear information hierarchy
- Accessibility standards compliance
- Fast loading and performance

## Screen 1: Home/Map Screen

```
┌─────────────────────────────────────┐
│  Fruit Map                [Profile] │
├─────────────────────────────────────┤
│                                     │
│              [MAP VIEW]             │
│      ● ○ ●     ○                   │
│    ○     ● ● ●   ○                 │
│  ●   ○ ○   ●   ○                   │
│    ○     ●                         │
│                                     │
│                                     │
├─────────────────────────────────────┤
│ [Search]  [Add Tree]  [Filter]      │
└─────────────────────────────────────┘
```

**Elements:**
- Header with app title and profile access
- Interactive map taking up 70% of screen
- Tree markers indicating locations
- Bottom navigation bar with primary actions
- Search button for location/fruit search
- Add tree button for contributions
- Filter button for search criteria

## Screen 2: Tree Detail Screen

```
┌─────────────────────────────────────┐
│ ┌─┐  Mandarin Tree                  │
│ │O│  0.2 km away                   │
├─────────────────────────────────────┤
│                                     │
│             [TREE IMAGE]            │
│                                     │
├─────────────────────────────────────┤
│ Type: Citrus reticulata             │
│ Season: Jan - Mar                   │
│ Accessibility: Public               │
│ Contributed by: João Silva          │
├─────────────────────────────────────┤
│ [Navigate] [Add Review] [Share]     │
│                                     │
│ Reviews (4.2 ★★★★☆)                │
│ ┌─────────────────────────────────┐ │
│ │Great mandarins! Fresh and      │ │
│ │sweet, usually ready by Feb.    │ │
│ │ - Maria, 3 days ago            │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Elements:**
- Tree title with distance indicator
- Primary image of the tree
- Key information (type, season, accessibility)
- Contributed by information
- Action buttons (Navigate, Add Review, Share)
- User reviews section with ratings

## Screen 3: Search/Filter Screen

```
┌─────────────────────────────────────┐
│  Search Trees                       │
├─────────────────────────────────────┤
│ [Search by location, fruit type]    │
│                                     │
│ Current Location: São Paulo, SP     │
│ [Use Current Location]              │
│                                     │
│ Filter by:                          │
│ ☑ Fruit Type                        │
│ ├─ citrus, mango, avocado...       │
│ ☑ Season                            │
│ ├─ currently in season               │
│ ☑ Accessibility                     │
│ ├─ public, community gardens       │
│ ☑ Distance                        │
│ ├─ Within 5km, 10km, 20km          │
└─────────────────────────────────────┘
```

**Elements:**
- Search bar for location/fruit type
- Current location indicator
- Use current location button
- Expandable filter categories
- Multi-select options for fruit types
- Season and accessibility filters
- Distance radius selector

## Screen 4: Add Tree Screen

```
┌─────────────────────────────────────┐
│  Add New Tree                       │
├─────────────────────────────────────┤
│ Tree Name: [Enter tree description] │
│                                     │
│ Location: [Current Map View]        │
│ [Set on Map]                        │
│                                     │
│ Fruit Type: [Dropdown]              │
│ ├─ Select type...                  │
│ │  citrus, mango, avocado...       │
│ │  jackfruit, banana, ...          │
│                                     │
│ Accessibility: [Dropdown]           │
│ ├─ Public access, Community garden │
│ │  Private with permission, ...    │
│                                     │
│ Description: [Optional details]     │
│                                     │
│ [Upload Photo]                      │
│                                     │
│ [Submit Tree] [Cancel]              │
└─────────────────────────────────────┘
```

**Elements:**
- Tree name/description field
- Location setting with map view
- Set on map button to adjust location
- Fruit type dropdown with options
- Accessibility level selection
- Description text area
- Photo upload button
- Submit and cancel buttons

## Screen 5: User Profile Screen

```
┌─────────────────────────────────────┐
│  João Silva                         │
├─────────────────────────────────────┤
│  Contributions: 24 trees            │
│  Reviews: 12                        │
│  Joined: March 2024                 │
├─────────────────────────────────────┤
│ My Contributed Trees                │
│ ┌─────────────────────────────────┐ │
│ │Mango Tree - Ibirapuera Park   │ │
│ │●●●●○ 4.0 ★ (3 reviews)        │ │
│ │2 days ago                      │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │Guava Tree - Vila Madalena     │ │
│ │●●●●● 5.0 ★ (1 review)         │ │
│ │1 week ago                      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Edit Profile] [Sign Out]           │
└─────────────────────────────────────┘
```

**Elements:**
- User information and stats
- Contributed trees with ratings
- Contribution history
- Edit profile button
- Sign out button

## Screen 6: Seasonal Calendar Screen

```
┌─────────────────────────────────────┐
│  Seasonal Calendar                  │
├─────────────────────────────────────┤
│ Region: São Paulo, SP               │
│ [Change Region]                     │
│                                     │
│ January     February     March      │
│ ● Mandarin  ● Orange     ● Lemon   │
│ ○ Avocado   ○ Mango      ○ Cashew  │
│                                     │
│ April       May         June       │
│ ○ Tangerine ● Guava      ● Jackfruit│
│ ● Lime      ○ Passionfruit ○ Pineapple │
│                                     │
│ July        August      September  │
│ ○ Grape     ○ Fig        ● Apple    │
│ ● Papaya    ○ Pomegranate ● Acerola │
│                                     │
│ October     November    December   │
│ ○ Persimmon ● Pear       ● Banana   │
│ ● Starfruit ○ Walnut     ○ Cherry   │
└─────────────────────────────────────┘
```

**Elements:**
- Region selection
- Monthly calendar view
- Fruit availability indicators
- Color coding for different fruit types
- Current month highlighting

## Screen 7: Navigation Screen

```
┌─────────────────────────────────────┐
│  Navigate to Tree                   │
├─────────────────────────────────────┤
│                                     │
│            [NAVIGATION MAP]         │
│        ┌─────────────────┐          │
│        │  ○ You are here  │          │
│        │      ↓           │          │
│        │    [ROUTE]       │          │
│        │      ↓           │          │
│        │  ● Fruit Tree    │          │
│        └─────────────────┘          │
│                                     │
├─────────────────────────────────────┤
│ Walking: 8 min (0.6 km)             │
│                                     │
│ [Open in Maps App] [Cancel]         │
└─────────────────────────────────────┘
```

**Elements:**
- Navigation-focused map
- Current location indicator
- Route visualization
- Destination marker
- Travel time and distance
- Open in maps app button

## Screen 8: Settings Screen

```
┌─────────────────────────────────────┐
│  Settings                           │
├─────────────────────────────────────┤
│ Account                             │
│ ├─ Profile                      >   │
│ ├─ Notifications                  > │
│ ├─ Privacy                        > │
│                                     │
│ App Settings                        │
│ ├─ Map Preferences                > │
│ ├─ Accessibility                  > │
│ ├─ Language (Português)           > │
│                                     │
│ About                               │
│ ├─ Version Info                   > │
│ ├─ Open Source License            > │
│ ├─ Contribute to Project          > │
└─────────────────────────────────────┘
```

**Elements:**
- Account-related settings
- App preferences
- Accessibility options
- About information
- Open source license details
- Contribute information

## Responsive Design Considerations

### Mobile (320px - 768px)
- Single column layout
- Touch-friendly buttons (minimum 44px)
- Large text for readability
- Optimized for thumb-based navigation

### Tablet (768px - 1024px)
- May use two-column layouts on some screens
- Larger interactive elements
- More detailed information display
- Optimized for both portrait and landscape

### Desktop (1024px+)
- Multi-column layouts
- More detailed information panels
- Additional tools and filters
- Mouse and keyboard support

## Accessibility Features

### Screen Reader Support
- Semantic HTML structure
- ARIA labels for interactive elements
- Proper heading hierarchy
- Alternative text for images

### Visual Considerations
- High contrast ratios (4.5:1 minimum)
- Scalable text up to 200%
- Color not used as sole indicator
- Focus indicators for keyboard navigation

### Motor Accessibility
- Large touch targets
- Minimal gestural interactions
- Voice control compatibility
- Keyboard navigation support