
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStageModal } from "./useStageModal";
import { supabase } from "@/integrations/supabase/client";
import { Stage, StageFormValues } from "@/types/stage.types";

export { type Stage } from "@/types/stage.types";

export const useStagesManager = (rallyId?: string) => {
  const { 
    modalOpen, 
    currentStage, 
    openAddModal, 
    openEditModal, 
    closeModal 
  } = useStageModal();
  
  const queryClient = useQueryClient();

  // Récupérer l'ID du premier rallye pour les tests si aucun ID n'est fourni
  const { data: defaultRally } = useQuery({
    queryKey: ["default-rally"],
    queryFn: async () => {
      if (rallyId) return { id: rallyId };
      
      const { data, error } = await supabase
        .from("rallies")
        .select("id")
        .limit(1)
        .single();

      if (error) {
        console.error("Erreur lors de la récupération du rallye par défaut:", error);
        return { id: null };
      }

      return data;
    },
    enabled: !rallyId,
  });

  // Récupérer la liste des épreuves pour un rallye spécifique
  const { data: stages = [], isLoading } = useQuery({
    queryKey: ["rally-stages", rallyId || defaultRally?.id],
    queryFn: async () => {
      const currentRallyId = rallyId || defaultRally?.id;
      
      if (!currentRallyId) {
        return [];
      }

      try {
        // Utilisez la fonction RPC pour obtenir les étapes d'un rallye
        const { data, error } = await supabase
          .rpc('get_rally_stages', { rally_id_param: currentRallyId });

        if (error) throw error;
        return data as Stage[];
      } catch (error) {
        toast.error("Erreur lors de la récupération des épreuves");
        return [];
      }
    },
    enabled: !!rallyId || !!defaultRally?.id,
  });

  // Ajouter une nouvelle épreuve
  const addStageMutation = useMutation({
    mutationFn: async (stageData: Omit<Stage, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("rally_stages")
        .insert(stageData)
        .select();

      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rally-stages", rallyId || defaultRally?.id] });
      toast.success("Épreuve ajoutée avec succès");
    },
    onError: (error) => {
      console.error("Erreur lors de l'ajout:", error);
      toast.error("Erreur lors de l'ajout de l'épreuve");
    },
  });

  // Mettre à jour une épreuve existante
  const updateStageMutation = useMutation({
    mutationFn: async (stage: Stage) => {
      const { id, created_at, updated_at, ...updateData } = stage;
      const { data, error } = await supabase
        .from("rally_stages")
        .update(updateData)
        .eq("id", id)
        .select();

      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rally-stages", rallyId || defaultRally?.id] });
      toast.success("Épreuve mise à jour avec succès");
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Erreur lors de la mise à jour de l'épreuve");
    },
  });

  // Supprimer une épreuve
  const deleteStageMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("rally_stages")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rally-stages", rallyId || defaultRally?.id] });
      toast.success("Épreuve supprimée avec succès");
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression de l'épreuve");
    },
  });

  const handleSubmit = async (values: StageFormValues) => {
    try {
      const currentRallyId = values.rally_id || rallyId || defaultRally?.id;
      
      if (!currentRallyId) {
        toast.error("Impossible de déterminer le rallye associé");
        return;
      }
      
      // Assurez-vous que rally_id est défini
      const stageData = {
        ...values,
        rally_id: currentRallyId
      };
      
      console.log("Données préparées pour soumission:", stageData);

      if (currentStage) {
        // Mise à jour d'une épreuve existante
        await updateStageMutation.mutateAsync({
          ...stageData,
          id: currentStage.id,
          created_at: currentStage.created_at,
          updated_at: new Date().toISOString()
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
