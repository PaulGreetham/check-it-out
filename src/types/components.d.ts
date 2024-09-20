// src/types/components.d.ts

// Navbar Props (if needed)
export interface NavbarProps {
  title: string;    // The title of the Navbar (if configurable)
  links: NavLink[]; // Links array for navigation
}

export interface NavLink {
  name: string;     // Link text
  path: string;     // Route path
}

// TaskTimeCalculator component props (optional)
export interface TaskTimeCalculatorProps {
  initialMopeds?: string[];   // Optional initial mopeds data
  initialDistances?: number[]; // Optional initial distances data
}

// TaskTimeCalculator component state (optional)
export interface TaskTimeCalculatorState {
  mopeds: string[];
  distances: number[];
  totalTime: number | null;
}

// MapboxNeighborhoodMap Props (if configurable)
export interface MapboxNeighborhoodMapProps {
  center?: [number, number]; // Optional center coordinates
  zoom?: number;             // Optional zoom level
}

// MapboxNeighborhoodMap State (optional)
export interface MapboxNeighborhoodMapState {
  hoveredNeighborhood: string | null;
}
