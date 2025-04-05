
import { Stage } from "@/hooks/useStageForm";
import { StageCard } from "./StageCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface StageListProps {
  stages?: Stage[];
  isLoading: boolean;
  onAddStage: () => void;
  onEditStage: (stage: Stage) => void;
  onDeleteStage: (stageId: string) => void;
}

export const StageList = ({ 
  stages, 
  isLoading, 
  onAddStage, 
  onEditStage, 
  onDeleteStage 
}: StageListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red"></div>
      </div>
    );
  }

  if (!stages || stages.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow text-center">
        <p className="text-gray-500 mb-4">Aucune épreuve trouvée</p>
        <Button 
          onClick={onAddStage}
          className="bg-rally-red hover:bg-red-700"
        >
          <PlusCircle size={16} className="mr-2" /> Ajouter votre première épreuve
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stages.map((stage) => (
        <StageCard 
          key={stage.id} 
          stage={stage} 
          onEdit={onEditStage} 
          onDelete={onDeleteStage} 
        />
      ))}
    </div>
  );
};
