import React, { useRef, useEffect, useCallback } from 'react';
import mapboxgl, { Map, AnyLayer } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FeatureCollection, Polygon, MultiPolygon } from 'geojson';

// **IMPORTANT:** Access token is now managed via environment variables.
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || '';

const MapboxNeighborhoodMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  // Type guard to check if a coordinate is [number, number]
  const isLngLat = (coord: any): coord is [number, number] => {
    return (
      Array.isArray(coord) &&
      coord.length === 2 &&
      typeof coord[0] === 'number' &&
      typeof coord[1] === 'number'
    );
  };

  // **Option 2: Using useCallback to memoize flipGeoJSON**
  const flipCoordinates = useCallback((coords: any): any => {
    if (typeof coords[0] === 'number' && typeof coords[1] === 'number') {
      // [lat, lng] to [lng, lat]
      return [coords[1], coords[0]];
    } else {
      return coords.map((coord: any) => flipCoordinates(coord));
    }
  }, []); // No dependencies, so it's memoized once

  const flipGeoJSON = useCallback(
    (geojson: FeatureCollection<Polygon | MultiPolygon>): FeatureCollection<Polygon | MultiPolygon> => {
      return {
        ...geojson,
        features: geojson.features.map((feature) => ({
          ...feature,
          geometry: {
            ...feature.geometry,
            coordinates: flipCoordinates(feature.geometry.coordinates),
          },
        })),
      };
    },
    [flipCoordinates] // Dependency on flipCoordinates
  );

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v10', // You can change this to any desired style
      center: [4.9041, 52.3676], // Initial center; will be adjusted to fit bounds
      zoom: 11,
    });

    mapRef.current = map;

    // Add navigation controls to the top-right corner
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Initialize a popup but keep it hidden initially
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    // Fetch and add GeoJSON data to the map
    map.on('load', async () => {
      try {
        const response = await fetch(
          'https://maps.amsterdam.nl/open_geodata/geojson_latlng.php?KAARTLAAG=INDELING_BUURT&THEMA=gebiedsindeling'
        );
        let geojsonData: FeatureCollection<Polygon | MultiPolygon> = await response.json();

        console.log('Fetched GeoJSON data:', geojsonData);

        // Inspect the first feature's coordinates
        const firstFeature = geojsonData.features[0];
        console.log('First Feature Geometry Type:', firstFeature.geometry.type);
        console.log(
          'First Feature Coordinates (First Ring, first 5 coords):',
          firstFeature.geometry.coordinates[0].slice(0, 5)
        );

        // Flip coordinates assuming they are in [lat, lng] order
        console.log('Flipping GeoJSON coordinates from [lat, lng] to [lng, lat]...');
        geojsonData = flipGeoJSON(geojsonData);
        console.log('Coordinate flipping complete.');

        // Add source for the GeoJSON
        if (map.getSource('amsterdam-neighbourhood')) {
          (map.getSource('amsterdam-neighbourhood') as mapboxgl.GeoJSONSource).setData(geojsonData);
        } else {
          map.addSource('amsterdam-neighbourhood', {
            type: 'geojson',
            data: geojsonData,
          });
        }

        // Add a fill layer for neighborhoods
        if (!map.getLayer('neighbourhood-fill')) {
          map.addLayer({
            id: 'neighbourhood-fill',
            type: 'fill',
            source: 'amsterdam-neighbourhood',
            layout: {},
            paint: {
              'fill-color': '#6C2DC7', // Check purple
              'fill-opacity': 0.6,
            },
          } as AnyLayer);
        }

        // Add a line layer for the polygon borders
        if (!map.getLayer('neighbourhood-border')) {
          map.addLayer({
            id: 'neighbourhood-border',
            type: 'line',
            source: 'amsterdam-neighbourhood',
            layout: {},
            paint: {
              'line-color': '#ffffff',
              'line-width': 2,
            },
          } as AnyLayer);
        }

        // Add interactivity: highlight on hover and show tooltip
        map.on('mousemove', 'neighbourhood-fill', (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            map.getCanvas().style.cursor = 'pointer';

            // Set popup content
            const buurtName = feature.properties?.Buurt || 'Unknown';
            popup
              .setLngLat(e.lngLat)
              .setHTML(`<strong>${buurtName}</strong>`)
              .addTo(map);
          }
        });

        map.on('mouseleave', 'neighbourhood-fill', () => {
          map.getCanvas().style.cursor = '';
          popup.remove();
        });

        // Fit map to the GeoJSON bounds
        const bounds = new mapboxgl.LngLatBounds();
        geojsonData.features.forEach((feature) => {
          const geometry = feature.geometry;
          if (geometry.type === 'Polygon') {
            geometry.coordinates[0].forEach((coord) => {
              if (isLngLat(coord)) {
                bounds.extend(coord);
              }
            });
          } else if (geometry.type === 'MultiPolygon') {
            geometry.coordinates.forEach((polygon) => {
              polygon[0].forEach((coord) => {
                if (isLngLat(coord)) {
                  bounds.extend(coord);
                }
              });
            });
          }
        });
        map.fitBounds(bounds, { padding: 20 });
      } catch (error) {
        console.error('Error fetching or adding GeoJSON data:', error);
      }
    });

    // Clean up on unmount
    return () => {
      map.remove();
    };
  }, [flipGeoJSON]); // Include flipGeoJSON in dependencies

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: '100%',
        height: '600px',
      }}
    />
  );
};

export default MapboxNeighborhoodMap;
