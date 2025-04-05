
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Map, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useStageDetails } from "@/hooks/useStageDetails";
import { getStatusBadgeClass, getStatusLabel, TimingPoint, TimingPointFormValues } from "@/schemas/stageSchema";
import TimingPointList from "./TimingPointList";
import TimingPointForm from "./TimingPointForm";
import StageDetailsForm from "./StageDetailsForm";
import StageMap from "./StageMap";

interface StageDetailsPageProps {
  stageId: string;
  rallyId: string;
}

const StageDetailsPage = ({ stageId, rallyId }: StageDetailsPageProps) => {
  const navigate = useNavigate();
  const { 
    stage, 
    timingPoints, 
    isLoading, 
    updateStage, 
    addTimingPoint, 
    updateTimingPoint, 
    deleteTimingPoint 
  } = useStageDetails(stageId);
  
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddTimingPointOpen, setIsAddTimingPointOpen] = useState(false);
  const [isEditTimingPointOpen, setIsEditTimingPointOpen] = useState(false);
  const [isEditStageOpen, setIsEditStageOpen] = useState(false);
  const [selectedTimingPoint, setSelectedTimingPoint] = useState<TimingPoint | null>(null);

  const handleAddTimingPoint = async (values: TimingPointFormValues) => {
    const success = await addTimingPoint(values);
    if (success) {
      setIsAddTimingPointOpen(false);
    }
  };

  const handleEditTimingPoint = async (values: TimingPointFormValues) => {
    if (!selectedTimingPoint) return;
    const success = await updateTimingPoint(selectedTimingPoint.id, values);
    if (success) {
      setIsEditTimingPointOpen(false);
      setSelectedTimingPoint(null);
    }
  };

  const handleOpenEditTimingPoint = (point: TimingPoint) => {
    setSelectedTimingPoint(point);
    setIsEditTimingPointOpen(true);
  };

  const handleEditStage = async (values: any) => {
    const success = await updateStage(values);
    if (success) {
      setIsEditStageOpen(false);
    }
  };

  const handleBackToStages = () => {
    navigate(`/admin?tab=stages&rally=${rallyId}`);
  };

  const formatDateTime = (dateTimeString: string | null) => {
    if (!dateTimeString) return "Non définie";
    return format(new Date(dateTimeString), "dd/MM/yyyy HH:mm", { locale: fr });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red"></div>
      </div>
    );
  }

  if (!stage) {
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl font-bold text-gray-800">Épreuve non trouvée</h3>
        <p className="text-gray-500 mt-2">L'épreuve que vous recherchez n'existe pas ou a été supprimée.</p>
        <Button onClick={handleBackToStages} variant="outline" className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux épreuves
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Button variant="ghost" onClick={handleBackToStages} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux épreuves
          </Button>
          <h2 className="text-2xl font-bold text-gray-900">{stage.name}</h2>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">{stage.location}</span>
            <span>•</span>
            <span className="text-gray-500">{stage.distance} km</span>
            <span>•</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(stage.status)}`}>
              {getStatusLabel(stage.status)}
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => setIsEditStageOpen(true)}
          className="flex items-center"
        >
          <Edit className="mr-2 h-4 w-4" />
          Modifier l'épreuve
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="timing-points">Points de chronométrage</TabsTrigger>
          <TabsTrigger value="map">Carte</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <div className="text-sm font-medium text-gray-500">Description</div>
                  <div>{stage.description || "Aucune description"}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Date et heure de départ</div>
                  <div>{formatDateTime(stage.start_time)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Distance</div>
                  <div>{stage.distance} km</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Statut</div>
                  <div className="flex items-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(stage.status)}`}>
                      {getStatusLabel(stage.status)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Carte</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <StageMap
                    readOnly
                    timingPoints={timingPoints}
                    center={
                      stage.start_latitude && stage.start_longitude 
                        ? { lat: stage.start_latitude, lng: stage.start_longitude } 
                        : undefined
                    }
                    zoom={stage.map_zoom_level || 13}
                    startPosition={
                      stage.start_latitude && stage.start_longitude 
                        ? { lat: stage.start_latitude, lng: stage.start_longitude } 
                        : undefined
                    }
                    finishPosition={
                      stage.finish_latitude && stage.finish_longitude 
                        ? { lat: stage.finish_latitude, lng: stage.finish_longitude } 
                        : undefined
                    }
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-sm text-gray-500"
                    onClick={() => setActiveTab("map")}
                  >
                    <Map className="h-4 w-4 mr-1" />
                    Afficher en plein écran
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Points de chronométrage</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActiveTab("timing-points")}
                >
                  Gérer les points
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {timingPoints.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  Aucun point de chronométrage défini
                </div>
              ) : (
                <div className="space-y-2">
                  {timingPoints
                    .sort((a, b) => a.order_index - b.order_index)
                    .map((point) => (
                      <div 
                        key={point.id} 
                        className="flex items-center justify-between p-2 border rounded-md"
                      >
                        <div className="flex items-center space-x-2">
                          <span className={`w-3 h-3 rounded-full inline-block ${
                            point.point_type === 'start' ? 'bg-green-500' :
                            point.point_type === 'split' ? 'bg-blue-500' :
                            'bg-red-500'
                          }`}></span>
                          <span className="font-medium">{point.name}</span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timing-points">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Points de chronométrage</h3>
            <Button
              onClick={() => setIsAddTimingPointOpen(true)}
              className="bg-rally-red hover:bg-red-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un point
            </Button>
          </div>
          
          <TimingPointList
            timingPoints={timingPoints}
            isLoading={isLoading}
            onEdit={handleOpenEditTimingPoint}
            onDelete={deleteTimingPoint}
          />
        </TabsContent>

        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Carte de l'épreuve</CardTitle>
              <CardDescription>
                Visualisation cartographique de l'épreuve et des points de chronométrage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[600px]">
                <StageMap
                  readOnly
                  timingPoints={timingPoints}
                  center={
                    stage.start_latitude && stage.start_longitude 
                      ? { lat: stage.start_latitude, lng: stage.start_longitude } 
                      : undefined
                  }
                  zoom={stage.map_zoom_level || 13}
                  startPosition={
                    stage.start_latitude && stage.start_longitude 
                      ? { lat: stage.start_latitude, lng: stage.start_longitude } 
                      : undefined
                  }
                  finishPosition={
                    stage.finish_latitude && stage.finish_longitude 
                      ? { lat: stage.finish_latitude, lng: stage.finish_longitude } 
                      : undefined
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <TimingPointForm
        isOpen={isAddTimingPointOpen}
        onOpenChange={setIsAddTimingPointOpen}
        onSubmit={handleAddTimingPoint}
        title="Ajouter un point de chronométrage"
        description="Remplissez les détails du nouveau point de chronométrage"
        submitLabel="Ajouter le point"
        timingPoints={timingPoints}
      />

      {selectedTimingPoint && (
        <TimingPointForm
          isOpen={isEditTimingPointOpen}
          onOpenChange={setIsEditTimingPointOpen}
          onSubmit={handleEditTimingPoint}
          defaultValues={{
            name: selectedTimingPoint.name,
            description: selectedTimingPoint.description || "",
            latitude: Number(selectedTimingPoint.latitude),
            longitude: Number(selectedTimingPoint.longitude),
            point_type: selectedTimingPoint.point_type,
            order_index: selectedTimingPoint.order_index,
          }}
          title="Modifier le point de chronométrage"
          description="Modifiez les détails du point de chronométrage"
          submitLabel="Enregistrer les modifications"
          timingPoints={timingPoints}
        />
      )}

      <StageDetailsForm
        isOpen={isEditStageOpen}
        onOpenChange={setIsEditStageOpen}
        onSubmit={handleEditStage}
        defaultValues={{
          name: stage.name,
          location: stage.location,
          description: stage.description || "",
          distance: stage.distance,
          start_time: stage.start_time || "",
          status: stage.status,
          start_latitude: stage.start_latitude || undefined,
          start_longitude: stage.start_longitude || undefined,
          finish_latitude: stage.finish_latitude || undefined,
          finish_longitude: stage.finish_longitude || undefined,
          map_zoom_level: stage.map_zoom_level || 13,
        }}
        title="Modifier l'épreuve"
        description="Modifiez les détails de l'épreuve spéciale"
        submitLabel="Enregistrer les modifications"
      />
    </div>
  );
};

export default StageDetailsPage;
