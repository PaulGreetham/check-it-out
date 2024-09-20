import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapboxNeighborhoodMap.scss'; // Assuming you have a corresponding SCSS file
import 'mapbox-gl/dist/mapbox-gl.css';

// Set your Mapbox access token here
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || '';

const MapboxNeighborhoodMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);  // Reference to the map container
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [hoveredNeighborhood, setHoveredNeighborhood] = useState<string | null>(null);

  // Effect to initialize the map and add the GeoJSON layer
  useEffect(() => {
    if (mapContainerRef.current && !map) {
      const initializeMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11', // Mapbox style
        center: [4.9041, 52.3676], // Amsterdam coordinates
        zoom: 12,
      });

      initializeMap.on('load', () => {
        setMap(initializeMap);

        // Fetch GeoJSON data
        initializeMap.addSource('amsterdam-neighborhoods', {
          type: 'geojson',
          data: 'https://maps.amsterdam.nl/open_geodata/geojson_latlng.php?KAARTLAAG=INDELING_BUURT&THEMA=gebiedsindeling',
        });

        // Add neighborhoods fill layer
        initializeMap.addLayer({
          id: 'neighborhoods-fill',
          type: 'fill',
          source: 'amsterdam-neighborhoods',
          paint: {
            'fill-color': '#9B40FF',  // Check's brand purple color
            'fill-opacity': 0.5,
          },
        });

        // Add outline for neighborhoods
        initializeMap.addLayer({
          id: 'neighborhoods-outline',
          type: 'line',
          source: 'amsterdam-neighborhoods',
          paint: {
            'line-color': '#000',
            'line-width': 2,
          },
        });

        // Mousemove event for hover effect
        initializeMap.on('mousemove', 'neighborhoods-fill', (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            const neighborhoodName = feature.properties?.Buurt;
            setHoveredNeighborhood(neighborhoodName);
          }
        });

        // Mouseleave event to reset hover state
        initializeMap.on('mouseleave', 'neighborhoods-fill', () => {
          setHoveredNeighborhood(null);
        });
      });
    }

    // Cleanup the map instance when the component unmounts
    return () => map?.remove();
  }, [map]);

  return (
    <div className="mapbox-container">
      <div ref={mapContainerRef} className="mapbox-map" />
      {hoveredNeighborhood && (
        <div className="mapbox-tooltip">
          {hoveredNeighborhood}
        </div>
      )}
    </div>
  );
};

export default MapboxNeighborhoodMap;
