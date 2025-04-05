
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { StageTable } from "./StageTable";
import { StageModal } from "./StageModal";
import { useStagesManager } from '@/hooks/useStagesManager';
import { Stage } from '@/hooks/useStageForm';

export const StageManager: React.FC = () => {
  const {
    stages,
    currentStage,
    modalOpen,
    openAddModal,
    openEditModal,
    closeModal,
    handleSubmit,
    deleteStage,
  } = useStagesManager();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Liste des Épreuves</h2>
        <Button 
          onClick={openAddModal}
          className="bg-rally-red hover:bg-red-700 flex items-center gap-2"
        >
          <PlusCircle size={18} />
          Ajouter une épreuve
        </Button>
      </div>

      <StageTable 
        stages={stages} 
        onEdit={openEditModal} 
        onDelete={deleteStage} 
      />

      <StageModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={currentStage}
        title={currentStage ? "Modifier l'épreuve" : "Ajouter une nouvelle épreuve"}
      />
    </div>
  );
};
