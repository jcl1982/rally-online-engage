
import { Button } from "@/components/ui/button";
import StageMap from "../StageMap";
import { TimingPoint } from "@/schemas/stageSchema";

interface MapContainerProps {
  startPosition?: { lat: number | null; lng: number | null };
  finishPosition?: { lat: number | null; lng: number | null };
  mapZoomLevel: number;
  timingPoints?: TimingPoint[];
  handleStartPositionSelect: (position: { latitude: number; longitude: number }) => void;
  handleFinishPositionSelect: (position: { latitude: number; longitude: number }) => void;
}

const MapContainer = ({
  startPosition,
  finishPosition,
  mapZoomLevel,
  timingPoints = [], // Fournir un tableau vide par défaut
  handleStartPositionSelect,
  handleFinishPositionSelect,
}: MapContainerProps) => {
  const center = startPosition?.lat && startPosition?.lng
    ? { lat: startPosition.lat, lng: startPosition.lng }
    : undefined;

  return (
    <div>
      <div className="font-medium mb-2">Carte</div>
      <div id="stage-map-container" className="border rounded-md overflow-hidden">
        <div className="flex border-b">
          <Button
            type="button"
            variant="ghost"
            className="flex-1 rounded-none border-r"
          >
            Définir point de départ
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="flex-1 rounded-none"
          >
            Définir point d'arrivée
          </Button>
        </div>
        <div className="h-[300px]">
          <StageMap
            center={center}
            zoom={mapZoomLevel}
            onPositionSelect={handleStartPositionSelect}
            startPosition={startPosition}
            finishPosition={finishPosition}
            timingPoints={timingPoints}
          />
        </div>
      </div>
    </div>
  );
};

export default MapContainer;
