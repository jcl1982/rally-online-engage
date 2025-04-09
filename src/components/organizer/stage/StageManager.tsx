
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import StageTable from "./StageTable";
import { StageModal } from "./StageModal";
import { useStagesManager } from '@/hooks/useStagesManager';
import { StageFormValues } from '@/schemas/organizerStageSchema';

interface StageManagerProps {
  rallyId?: string;
}

export const StageManager: React.FC<StageManagerProps> = ({ rallyId }) => {
  const {
    stages,
    isLoading,
    modalOpen,
    currentStage,
    defaultRally,
    openAddModal,
    openEditModal,
    closeModal,
    handleSubmit,
    deleteStage
  } = useStagesManager(rallyId);

  console.log("StageManager - defaultRally:", defaultRally);
  console.log("StageManager - currentStage:", currentStage);
  console.log("StageManager - rallyId provided:", rallyId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Liste des Épreuves</h2>
        <Button 
          onClick={openAddModal}
          className="flex items-center gap-2"
        >
          <PlusCircle size={18} />
          Ajouter une épreuve
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rally-red"></div>
        </div>
      ) : (
        <StageTable 
          stages={stages} 
          onEdit={openEditModal} 
          onDelete={deleteStage} 
        />
      )}

      <StageModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={(data: StageFormValues) => handleSubmit(data)}
        initialData={currentStage ? {
          name: currentStage.name,
          location: currentStage.location,
          description: currentStage.description || "",
          distance: currentStage.distance,
          status: currentStage.status,
          start_time: currentStage.start_time,
          difficulty_level: currentStage.difficulty_level,
          route_type: currentStage.route_type,
          map_zoom_level: currentStage.map_zoom_level || undefined,
          max_participants: currentStage.max_participants || undefined
        } : undefined}
        title={currentStage ? "Modifier l'épreuve" : "Ajouter une nouvelle épreuve"}
        rallyId={rallyId || defaultRally?.id}
      />
    </div>
  );
};
