# Seasonal Produce - React SPA

This is a React Single Page Application (SPA) version of the Seasonal Produce website. It features smooth season transitions where the header and navigation bar transition together as one unit.

## Features

- **Smooth Season Transitions**: The header and nav bar transition together (0.3s ease-out) when seasons change
- **Unified Styling**: Header and nav bar always have matching styling and transition together
- **Smart Theme Application**: 
  - When navigating from a different season to About/Mission pages, the theme transitions to the current season
  - When clicking on a produce item, the theme transitions to that item's peak season
- **React Router**: Client-side routing for seamless navigation
- **Context API**: Shared season/theme state management

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── NavBar.jsx      # Navigation bar with mobile menu
│   ├── Header.jsx      # Page header with dropdown
│   └── Footer.jsx      # Footer component
├── contexts/           # React contexts
│   └── SeasonContext.jsx  # Season/theme state management
├── pages/              # Page components
│   ├── Home.jsx        # Main landing page
│   ├── AllItems.jsx    # All produce items page
│   ├── ProduceDetails.jsx  # Individual produce detail page
│   ├── About.jsx       # About page
│   └── Mission.jsx     # Mission page
├── data/               # Data files
│   └── produce-data.js # Produce data and season mappings
└── styles/             # CSS files
    ├── index.css       # Main stylesheet
    └── *.css           # Component-specific styles
```

## Key Implementation Details

### Season Transitions

The `SeasonContext` manages the selected period and applies theme colors via CSS custom properties. Both the header and nav bar have `transition: background-color 0.3s ease-out, color 0.3s ease-out` applied, ensuring they transition together.

### Navigation Behavior

- **Home Page**: Uses selected period from context, can be changed via dropdown
- **About/Mission Pages**: Automatically apply current season theme when navigated to
- **Produce Details**: Apply the produce item's peak season theme when viewed
- **All Items**: Uses current season theme

### Theme Application

Themes are applied via CSS custom properties (`--color-primary`, `--color-secondary`, etc.) which are updated in the `SeasonContext` when the period changes. This ensures smooth transitions across all components.

## Migration Notes

The original HTML/JS files are preserved. The React version uses:
- Vite for build tooling
- React Router for navigation
- Context API for state management
- All original CSS preserved with transitions added

