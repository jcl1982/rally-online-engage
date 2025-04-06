
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStageModal } from "./useStageModal";
import { 
  fetchStages, 
  fetchDefaultRally, 
  addStage, 
  updateStage,
  deleteStage as deleteStageService 
} from "@/services/stageService";
import { Stage, StageFormValues } from "@/types/stage.types";

export { type Stage } from "@/types/stage.types";

export const useStagesManager = () => {
  const { 
    modalOpen, 
    currentStage, 
    openAddModal, 
    openEditModal, 
    closeModal 
  } = useStageModal();
  
  const queryClient = useQueryClient();

  // Récupérer l'ID du premier rallye pour les tests
  const { data: defaultRally } = useQuery({
    queryKey: ["default-rally"],
    queryFn: fetchDefaultRally,
  });

  // Récupérer la liste des épreuves
  const { data: stages = [], isLoading } = useQuery({
    queryKey: ["rally-stages"],
    queryFn: async () => {
      try {
        const data = await fetchStages();
        return data;
      } catch (error) {
        toast.error("Erreur lors de la récupération des épreuves");
        return [];
      }
    },
  });

  // Ajouter une nouvelle épreuve
  const addStageMutation = useMutation({
    mutationFn: addStage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rally-stages"] });
      toast.success("Épreuve ajoutée avec succès");
    },
    onError: (error) => {
      console.error("Erreur lors de l'ajout:", error);
      toast.error("Erreur lors de l'ajout de l'épreuve");
    },
  });

  // Mettre à jour une épreuve existante
  const updateStageMutation = useMutation({
    mutationFn: updateStage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rally-stages"] });
      toast.success("Épreuve mise à jour avec succès");
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Erreur lors de la mise à jour de l'épreuve");
    },
  });

  // Supprimer une épreuve
  const deleteStageMutation = useMutation({
    mutationFn: deleteStageService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rally-stages"] });
      toast.success("Épreuve supprimée avec succès");
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression de l'épreuve");
    },
  });

  const handleSubmit = async (values: StageFormValues) => {
    try {
      // Assurez-vous que rally_id est défini et conservez une trace des valeurs
      const stageData = {
        ...values,
        rally_id: values.rally_id || defaultRally?.id || "00000000-0000-0000-0000-000000000000"
      };
      
      console.log("Données préparées pour soumission:", stageData);

      if (currentStage) {
        // Mise à jour d'une épreuve existante
        await updateStageMutation.mutateAsync({
          ...stageData,
          id: currentStage.id,
        } as Stage);
      } else {
        // Ajout d'une nouvelle épreuve
        await addStageMutation.mutateAsync(stageData as Omit<Stage, "id" | "created_at" | "updated_at">);
      }
      closeModal();
    } catch (error) {
      console.error("Erreur lors de l'opération:", error);
      toast.error("Une erreur s'est produite lors de l'enregistrement de l'épreuve");
    }
  };

  const deleteStage = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette épreuve ?")) {
      await deleteStageMutation.mutateAsync(id);
    }
  };

  return {
    stages,
    isLoading,
    currentStage,
    modalOpen,
    openAddModal,
    openEditModal,
    closeModal,
    handleSubmit,
    deleteStage,
    defaultRally,
  };
};
