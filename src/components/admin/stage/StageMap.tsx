
import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { TimingPoint, getTimingPointTypeColor } from '@/schemas/stageSchema';
import { Button } from "@/components/ui/button";
import { AlertTriangle } from 'lucide-react';

// Remplacez cette clé par votre propre clé MapBox
// Cette clé est temporaire et ne devrait pas être utilisée en production
const MAPBOX_TOKEN = "pk.eyJ1IjoibG92YWJsZS1kZXYiLCJhIjoiY2xvdW80eTQxMHVvNjJrcnZhMnBqcGFjYSJ9.usLHwyyWZlFc1GjlFMDnvg";

interface MapPosition {
  latitude: number;
  longitude: number;
}

interface StageMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  timingPoints: TimingPoint[];
  onPositionSelect?: (position: MapPosition) => void;
  readOnly?: boolean;
  startPosition?: { lat: number | null; lng: number | null };
  finishPosition?: { lat: number | null; lng: number | null };
}

const defaultCenter = { lat: 46.227638, lng: 2.213749 }; // Centre de la France
const defaultZoom = 5;

const StageMap = ({
  center = defaultCenter,
  zoom = defaultZoom,
  timingPoints = [],
  onPositionSelect,
  readOnly = false,
  startPosition,
  finishPosition,
}: StageMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapKey, setMapKey] = useState(Date.now());
  const [mapTokenError, setMapTokenError] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;

      // Centrer sur le premier point si disponible
      let initialCenter = center;
      let initialZoom = zoom;

      if (startPosition && startPosition.lat && startPosition.lng) {
        initialCenter = { lat: startPosition.lat, lng: startPosition.lng };
        initialZoom = 13;
      } else if (timingPoints.length > 0) {
        const firstPoint = timingPoints[0];
        initialCenter = { lat: Number(firstPoint.latitude), lng: Number(firstPoint.longitude) };
        initialZoom = 13;
      }

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [initialCenter.lng, initialCenter.lat],
        zoom: initialZoom,
      });

      // Ajouter les contrôles de navigation
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Ajouter les marqueurs pour les points de chronométrage
      map.current.on('load', () => {
        addTimingPointMarkers();
        
        // Ajouter le départ et l'arrivée s'ils sont définis
        if (startPosition?.lat && startPosition?.lng) {
          const startMarker = new mapboxgl.Marker({ color: '#10b981' })
            .setLngLat([startPosition.lng, startPosition.lat])
            .addTo(map.current!);
          markers.current.push(startMarker);
        }
        
        if (finishPosition?.lat && finishPosition?.lng) {
          const finishMarker = new mapboxgl.Marker({ color: '#ef4444' })
            .setLngLat([finishPosition.lng, finishPosition.lat])
            .addTo(map.current!);
          markers.current.push(finishMarker);
        }
      });

      // Si la carte est interactive, ajouter un événement de clic
      if (!readOnly && onPositionSelect) {
        map.current.on('click', (e) => {
          onPositionSelect({
            latitude: e.lngLat.lat,
            longitude: e.lngLat.lng,
          });
        });
      }
      
      setMapTokenError(false);
    } catch (error) {
      console.error("Erreur lors de l'initialisation de la carte:", error);
      setMapTokenError(true);
    }
  };

  const addTimingPointMarkers = () => {
    if (!map.current) return;
    
    // Supprimer les marqueurs existants
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    
    // Ajouter les nouveaux marqueurs
    timingPoints.forEach(point => {
      const markerColor = getTimingPointTypeColor(point.point_type).replace('bg-', '#').replace('-500', '');
      const marker = new mapboxgl.Marker({ color: markerColor })
        .setLngLat([Number(point.longitude), Number(point.latitude)])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${point.name}</h3>
             <p>${point.description || ''}</p>`
          )
        )
        .addTo(map.current!);
      
      markers.current.push(marker);
    });
  };

  // Réinitialiser la carte lorsque les props changent
  useEffect(() => {
    if (map.current) return;
    
    initializeMap();
    
    return () => {
      markers.current.forEach(marker => marker.remove());
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapKey]);

  // Mettre à jour les marqueurs lorsque les points de chronométrage changent
  useEffect(() => {
    if (!map.current) return;
    addTimingPointMarkers();
  }, [timingPoints]);

  const handleReloadMap = () => {
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
    setMapKey(Date.now());
  };

  if (mapTokenError) {
    return (
      <div className="border border-yellow-300 bg-yellow-50 p-4 rounded-md text-center">
        <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
        <h3 className="text-lg font-semibold mb-2">Erreur de carte</h3>
        <p className="text-sm text-gray-600 mb-4">
          Impossible de charger la carte MapBox. Vérifiez votre clé d'API ou votre connexion internet.
        </p>
        <Button onClick={handleReloadMap} variant="outline">
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] rounded-md overflow-hidden border shadow-sm">
      <div ref={mapContainer} className="absolute inset-0" />
      {!readOnly && (
        <div className="absolute bottom-2 left-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded text-xs text-center">
          Cliquez sur la carte pour sélectionner une position
        </div>
      )}
    </div>
  );
};

export default StageMap;
