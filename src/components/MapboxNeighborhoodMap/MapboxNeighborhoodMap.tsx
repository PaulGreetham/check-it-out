import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import './MapboxNeighborhoodMap.scss';

// Set your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoicGF1bGdyZWV0aGFtIiwiYSI6ImNtMWIzOXVyZTF3amQyd3NianB5ZnZyOTMifQ.1EbyJg4L9zaOvmZYyrPtVA';

const MapboxNeighborhoodMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [geoData, setGeoData] = useState<any>(null);

  // Function to assign unique IDs to each feature
  const processGeoJSON = (data: any) => {
    return {
      ...data,
      features: data.features.map((feature: any, index: number) => ({
        ...feature,
        id: index,
      })),
    };
  };

  // Fetch GeoJSON data from the API
  const fetchGeoJSON = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://maps.amsterdam.nl/open_geodata/geojson_latlng.php?KAARTLAAG=INDELING_BUURT&THEMA=gebiedsindeling'
      );
      console.log('Fetched GeoJSON data:', response.data);
      const dataWithIDs = processGeoJSON(response.data);
      setGeoData(dataWithIDs);
    } catch (error) {
      console.error('Error fetching GeoJSON:', error);
    }
  }, []);

  // Initialize the map (runs once)
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [4.9041, 52.3676],
        zoom: 11,
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs once

  // Add layers and event handlers when geoData is available
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !geoData) return;

    const addLayers = () => {
      if (map.getSource('neighborhoods')) {
        return; // Layers already added
      }

      // Find the first symbol layer
      const layers = map.getStyle()!.layers;
      let firstSymbolId;
      for (const layer of layers) {
        if (layer.type === 'symbol') {
          firstSymbolId = layer.id;
          break;
        }
      }

      map.addSource('neighborhoods', {
        type: 'geojson',
        data: geoData,
      });

      map.addLayer(
        {
          id: 'neighborhoods-fill',
          type: 'fill',
          source: 'neighborhoods',
          paint: {
            'fill-color': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              '#D3ADF7', // Hover color
              '#9B40FF', // Default color
            ],
            'fill-opacity': 0.5,
          },
        },
        firstSymbolId
      );

      map.addLayer(
        {
          id: 'neighborhoods-outline',
          type: 'line',
          source: 'neighborhoods',
          paint: {
            'line-color': '#000',
            'line-width': 1,
          },
        },
        firstSymbolId
      );

      // Move layers to the top just in case
      map.moveLayer('neighborhoods-fill');
      map.moveLayer('neighborhoods-outline');

      // Add hover effect
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      let hoveredStateId: number | null = null;

      map.on('mousemove', 'neighborhoods-fill', (e) => {
        console.log('mousemove event triggered');
        if (e.features && e.features.length > 0) {
          const feature = e.features[0];
          map.getCanvas().style.cursor = 'pointer';

          const coordinates = e.lngLat;
          const buurtName = feature.properties?.Buurt;

          popup
            .setLngLat(coordinates)
            .setHTML(`<strong>${buurtName}</strong>`)
            .addTo(map);

          // if (hoveredStateId !== null) {
          //   map.setFeatureState(
          //     { source: 'neighborhoods', id: hoveredStateId },
          //     { hover: false }
          //   );
          // }

          // hoveredStateId = feature.id as number;

          // map.setFeatureState(
          //   { source: 'neighborhoods', id: hoveredStateId },
          //   { hover: true }
          // );
        }
      });

      map.on('mouseleave', 'neighborhoods-fill', () => {
        console.log('mouseleave event triggered');
        map.getCanvas().style.cursor = '';
        popup.remove();

        if (hoveredStateId !== null) {
          map.setFeatureState(
            { source: 'neighborhoods', id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = null;
      });

      console.log('GeoJSON layers added');
    };

    if (map.isStyleLoaded()) {
      addLayers();
    } else {
      map.once('load', addLayers);
    }
  }, [geoData]); // This useEffect runs when geoData changes

  // Fetch the GeoJSON data when the component mounts
  useEffect(() => {
    fetchGeoJSON();
  }, [fetchGeoJSON]);

  return (
    <div
      className="map-container"
      ref={mapContainerRef}
      style={{ width: '100%', height: '500px', border: '8px solid #9B40FF' }}
    />
  );
};

export default MapboxNeighborhoodMap;
