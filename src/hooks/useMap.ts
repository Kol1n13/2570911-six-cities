import { useEffect, useState, useRef, MutableRefObject } from 'react';
import leaflet from 'leaflet';
import { CityType } from '../types/city-type';

export function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: CityType) {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const zoomLevel = city.location.zoom ?? 13;
      
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: zoomLevel,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef]);

  useEffect(() => {
    if (map) {
      const zoomLevel = city.location.zoom ?? 13;
      map.setView(
        {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoomLevel,
      );
    }
  }, [map, city]);

  return map;
}
