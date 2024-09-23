# Check Moped Manager

A web application designed to optimize moped maintenance routes and visualize Amsterdam's neighborhoods. Built with a modern tech stack, it offers tools for calculating task times and interactive maps for efficient workflow management.

## Features

- **Task Time Calculator:** Input moped tasks and travel distances to calculate the total time required by a team of Swapper, Fixer, and Mechanic.
- **Interactive Map:** Visualize Amsterdam's neighborhoods with tooltips displaying neighborhood names and hover effects.
- **Language Support:** Toggle between English and Dutch to accommodate a wider range of users.
- **Theme Switching:** Switch between light and dark modes to suit your preference.

## Tech Stack

- **Frontend:** React.js
- **Styling:** SCSS, Material-UI (MUI)
- **Mapping:** Mapbox GL JS
- **State Management:** React Hooks
- **Routing:** React Router
- **Internationalization:** react-i18next
- **Notifications:** SweetAlert2


## Usage

### Task Time Calculator

1. Navigate to the Calculator via the navbar.
2. Input tasks for each moped and the travel distances between them.
3. Click **"Calculate"** to view the total time and a detailed breakdown for each worker.

### Interactive Map

- Access the map through the navbar.
- Hover over neighborhoods to see their names.
- The map is styled in Check's signature purple and highlights neighborhoods on hover.

### Language Switching

- Use the language switcher in the navbar to toggle between English and Dutch.

### Theme Switching

- Toggle between light and dark modes using the theme switcher in the navbar.

## Deployment

The application is deployed on Netlify for continuous deployment.

## Concept

At Check, managing a fleet of mopeds efficiently is essential. This application serves as a tool for:

- **Optimizing Maintenance Routes:** Calculate the most time-efficient routes for maintenance teams.
- **Visualizing Operational Areas:** Understand and manage the geographical distribution of tasks within Amsterdam.
- **Enhancing User Experience:** Provide an intuitive interface for team members to plan and execute their tasks effectively.

## Style

The application adheres to Check's branding guidelines with a focus on:

- **Clean Design:** Utilizing Material-UI for consistent and user-friendly components.
- **Brand Colors:** Incorporating Check's signature purple (`#9B40FF`) for a cohesive look.
- **Typography:** Employing the 'Bebas Neue' font for a distinctive appearance.

## Dependencies

- **React:** Frontend library for building user interfaces.
- **React Router:** Managing navigation and routing within the app.
- **Material-UI (MUI):** UI component library for styling and theming.
- **Mapbox GL JS:** Rendering interactive maps with GeoJSON data.
- **react-i18next:** Handling internationalization and localization.
- **SweetAlert2:** Displaying alerts and notifications.
- **SCSS:** Enhancing CSS with variables and nested rules for better maintainability.

## Languages

- **JavaScript (TypeScript):** Ensuring type safety and robust code.
- **SCSS:** Writing modular and maintainable stylesheets.
- **HTML:** Structuring the frontend components.

## License

MIT License. Feel free to contribute or raise issues if you encounter any problems.
