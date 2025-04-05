
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RallyStage, StageFormValues } from "@/schemas/stageSchema";
import { useRallyStages } from "@/hooks/useRallyStages";
import StageList from "./stage/StageList";
import StageForm from "./stage/StageForm";
import StageDetailsPage from "./stage/StageDetailsPage";

interface RallyStageManagementProps {
  rallyId: string;
}

const RallyStageManagement = ({ rallyId }: RallyStageManagementProps) => {
  const { stages, rally, isLoading, addStage, updateStage, deleteStage } = useRallyStages(rallyId);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState<RallyStage | null>(null);
  const [viewingStageId, setViewingStageId] = useState<string | null>(null);

  const handleAddStage = async (values: StageFormValues) => {
    const success = await addStage(values);
    if (success) {
      setIsAddDialogOpen(false);
    }
  };

  const handleEditStage = async (values: StageFormValues) => {
    if (!selectedStage) return;
    const success = await updateStage(selectedStage.id, values);
    if (success) {
      setIsEditDialogOpen(false);
      setSelectedStage(null);
    }
  };

  const handleOpenEditDialog = (stage: RallyStage) => {
    setSelectedStage(stage);
    setIsEditDialogOpen(true);
  };

  const handleViewStageDetails = (stage: RallyStage) => {
    setViewingStageId(stage.id);
  };

  const handleBackToList = () => {
    setViewingStageId(null);
  };

  if (viewingStageId) {
    return <StageDetailsPage stageId={viewingStageId} rallyId={rallyId} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Épreuves du {rally?.name || "rallye"}
          </h2>
          <p className="text-gray-500">Gérez les épreuves spéciales de ce rallye</p>
        </div>
        <Button 
          className="bg-rally-red hover:bg-red-700"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une épreuve
        </Button>
      </div>

      <StageList
        stages={stages}
        isLoading={isLoading}
        onEdit={handleOpenEditDialog}
        onDelete={deleteStage}
        onView={handleViewStageDetails}
      />

      <StageForm
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddStage}
        title="Ajouter une nouvelle épreuve"
        description="Remplissez les détails de l'épreuve spéciale"
        submitLabel="Ajouter l'épreuve"
      />

      {selectedStage && (
        <StageForm
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={handleEditStage}
          defaultValues={{
            name: selectedStage.name,
            location: selectedStage.location,
            description: selectedStage.description || "",
            distance: selectedStage.distance,
            start_time: selectedStage.start_time || "",
            status: selectedStage.status,
          }}
          title="Modifier l'épreuve"
          description="Modifiez les détails de l'épreuve spéciale"
          submitLabel="Enregistrer les modifications"
        />
      )}
    </div>
  );
};

export default RallyStageManagement;
