// src/types/api.d.ts

// Define a generic API response interface
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Example of a User interface (if fetching user data)
export interface User {
  id: number;
  name: string;
  email: string;
}

// Example of a Mapbox Neighborhood API response (using GeoJSON format)
export interface NeighborhoodFeature {
  type: 'Feature';
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  properties: {
    Buurt: string;  // Neighborhood name (from GeoJSON properties)
  };
}

export interface NeighborhoodsResponse {
  type: 'FeatureCollection';
  features: NeighborhoodFeature[];
}
