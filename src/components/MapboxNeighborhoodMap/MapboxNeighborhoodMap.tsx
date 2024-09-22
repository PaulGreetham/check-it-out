import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import './MapboxNeighborhoodMap.scss';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || '';

const MapboxNeighborhoodMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [geoData, setGeoData] = useState<any>(null);

  // Fetch GeoJSON data from the API
  const fetchGeoJSON = async () => {
    try {
      const response = await axios.get(
        'https://maps.amsterdam.nl/open_geodata/geojson_latlng.php?KAARTLAAG=INDELING_BUURT&THEMA=gebiedsindeling'
      );
      console.log('Fetched GeoJSON data:', response.data);
      setGeoData(response.data);
    } catch (error) {
      console.error('Error fetching GeoJSON:', error);
    }
  };

  // Initialize the map
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [4.9041, 52.3676],
        zoom: 11,
      });

      mapRef.current.on('load', () => {
        console.log('Map loaded');
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Add GeoJSON data and layers when data is available
  useEffect(() => {
    const map = mapRef.current;
    if (map && geoData && map.isStyleLoaded()) {
      console.log('Adding GeoJSON to map...');

      if (!map.getSource('neighborhoods')) {
        map.addSource('neighborhoods', {
          type: 'geojson',
          data: geoData,
        });

        map.addLayer({
          id: 'neighborhoods-fill',
          type: 'fill',
          source: 'neighborhoods',
          paint: {
            'fill-color': '#9B40FF',
            'fill-opacity': 0.5,
          },
        });

        map.addLayer({
          id: 'neighborhoods-outline',
          type: 'line',
          source: 'neighborhoods',
          paint: {
            'line-color': '#000',
            'line-width': 1,
          },
        });

        // Add hover effect
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });

        map.on('mousemove', 'neighborhoods-fill', (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            map.getCanvas().style.cursor = 'pointer';

            const coordinates = e.lngLat;
            const buurtName = feature.properties?.Buurt;

            popup.setLngLat(coordinates)
              .setHTML(`<strong>${buurtName}</strong>`)
              .addTo(map);

            // Only set feature state if feature.id is defined
            if (feature.id !== undefined) {
              map.setFeatureState(
                { source: 'neighborhoods', id: feature.id },
                { hover: true }
              );
            }
          }
        });

        map.on('mouseleave', 'neighborhoods-fill', () => {
          map.getCanvas().style.cursor = '';
          popup.remove();

          // Clear feature state for all features
          map.removeFeatureState({
            source: 'neighborhoods'
          });
        });

        console.log('GeoJSON layers added');
      }
    }
  }, [geoData]);

  // Fetch the GeoJSON data when the component mounts
  useEffect(() => {
    fetchGeoJSON();
  }, []);

  return (
    <div
      className="map-container"
      ref={mapContainerRef}
      style={{ width: '100%', height: '500px', border: '8px solid #9B40FF' }}
    />
  );
};

export default MapboxNeighborhoodMap;
