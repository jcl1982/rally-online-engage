
import { useRallyStagesList } from './useRallyStagesList';
import { useStageModal } from './useStageModal';
import { useStageCrud } from './useStageCrud';
import { StageFormValues } from '@/schemas/organizerStageSchema';

export const useStagesManager = (rallyId?: string) => {
  // Utiliser les hooks séparés
  const { stages, isLoading, defaultRally, fetchStages } = useRallyStagesList(rallyId);
  const { modalOpen, currentStage, openAddModal, openEditModal, closeModal } = useStageModal();
  const { handleSubmit: submitStageForm, deleteStage } = useStageCrud({ 
    rallyId, 
    defaultRallyId: defaultRally?.id,
    fetchStages 
  });

  // Wrapper pour la gestion des soumissions
  const handleSubmit = async (data: StageFormValues) => {
    const success = await submitStageForm(data, currentStage?.id);
    if (success) {
      closeModal();
    }
  };

  return {
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
  };
};
