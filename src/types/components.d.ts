// src/types/components.d.ts

// Navbar Props (if needed)
export interface NavbarProps {
  title: string;    // The title of the Navbar (if configurable)
  links: NavLink[]; // Links array for navigation
}

export interface NavLink {
  name: string; // Link text
  path: string; // Route path
}

// TaskTimeCalculator component props
export interface TaskTimeCalculatorProps {
  initialMopeds?: string;    // Optional initial mopeds data as a string
  initialDistances?: string; // Optional initial distances data as a string
}

// Worker Breakdown Item
export interface WorkerBreakdownItem {
  type: 'task' | 'travel' | 'no-tasks';
  description: string;
}

// Worker Breakdown
export interface WorkerBreakdown {
  workerName: string;
  time: number;
  breakdownItems: WorkerBreakdownItem[];
}

// Total Time Result
export interface TotalTimeResult {
  totalTime: number;
  workerBreakdowns: WorkerBreakdown[];
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
