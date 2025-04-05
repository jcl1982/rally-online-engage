
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StageForm } from "./stage/StageForm";
import { StageList } from "./stage/StageList";
import { useStageManagement } from "@/hooks/useStageManagement";

export const StageManagement = () => {
  const {
    stages,
    isLoading,
    isAddingStage,
    editingStage,
    defaultRallyId,
    handleAddStage,
    handleEditStage,
    handleDeleteStage,
    handleCloseForm
  } = useStageManagement();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Épreuves Spéciales</h2>
        <Button 
          onClick={handleAddStage}
          className="bg-rally-red hover:bg-red-700"
        >
          <PlusCircle size={16} className="mr-2" /> Ajouter une épreuve
        </Button>
      </div>

      {(isAddingStage || editingStage) && (
        <Card className="p-4 mb-6">
          <StageForm 
            initialData={editingStage || undefined}
            onClose={handleCloseForm}
            defaultRallyId={defaultRallyId}
          />
        </Card>
      )}

      <StageList 
        stages={stages} 
        isLoading={isLoading}
        onAddStage={handleAddStage}
        onEditStage={handleEditStage}
        onDeleteStage={handleDeleteStage}
      />
    </div>
  );
};
