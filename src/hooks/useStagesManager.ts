
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStageModal } from "./useStageModal";
import { supabase } from "@/integrations/supabase/client";
import { Stage, StageFormValues } from "@/types/stage.types";

export const useStagesManager = (rallyId?: string) => {
  const { 
    modalOpen, 
    currentStage, 
    openAddModal, 
    openEditModal,
    closeModal
  } = useStageModal();
  
  const queryClient = useQueryClient();

  // Récupérer un rallye par défaut si aucun rallyId n'est fourni
  const {
    data: defaultRally,
    isLoading: isLoadingDefaultRally
  } = useQuery({
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
  });

  // Récupérer les épreuves pour un rallye spécifique
  const {
    data: stages = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["stages", rallyId],
    queryFn: async () => {
      const effectiveRallyId = rallyId || defaultRally?.id;
      
      if (!effectiveRallyId) {
        return [];
      }
      
      console.log("Chargement des épreuves pour le rallye:", effectiveRallyId);
      
      try {
        const { data, error } = await supabase
          .from("rally_stages")
          .select("*")
          .eq("rally_id", effectiveRallyId)
          .order("stage_order", { ascending: true });
        
        if (error) {
          throw new Error(error.message);
        }
        
        console.log("Épreuves chargées:", data);
        return data as Stage[];
      } catch (err) {
        console.error("Erreur lors du chargement des épreuves:", err);
        throw err;
      }
    },
    enabled: !!rallyId || !!defaultRally?.id,
  });

  // Ajouter une nouvelle épreuve
  const addStageMutation = useMutation({
    mutationFn: async (stageData: StageFormValues & { rally_id: string }) => {
      // Vérification et conversion des types pour s'assurer de la compatibilité avec Supabase
      const preparedData = {
        ...stageData,
        distance: Number(stageData.distance),
        start_latitude: stageData.start_latitude ? Number(stageData.start_latitude) : null,
        start_longitude: stageData.start_longitude ? Number(stageData.start_longitude) : null,
        finish_latitude: stageData.finish_latitude ? Number(stageData.finish_latitude) : null,
        finish_longitude: stageData.finish_longitude ? Number(stageData.finish_longitude) : null,
        map_zoom_level: stageData.map_zoom_level ? Number(stageData.map_zoom_level) : null,
        max_participants: stageData.max_participants ? Number(stageData.max_participants) : 100,
      };
      
      const { data, error } = await supabase
        .from("rally_stages")
        .insert(preparedData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data as Stage;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stages", rallyId] });
      toast.success("Épreuve ajoutée avec succès");
    },
    onError: (error) => {
      console.error("Erreur lors de l'ajout de l'épreuve:", error);
      toast.error("Erreur lors de l'ajout de l'épreuve");
    },
  });

  // Mettre à jour une épreuve existante
  const updateStageMutation = useMutation({
    mutationFn: async ({ id, ...stageData }: Stage) => {
      const { error } = await supabase
        .from("rally_stages")
        .update(stageData)
        .eq("id", id);

      if (error) {
        throw error;
      }

      return { id, ...stageData } as Stage;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stages", rallyId] });
      toast.success("Épreuve mise à jour avec succès");
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour de l'épreuve:", error);
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

      if (error) {
        throw error;
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stages", rallyId] });
      toast.success("Épreuve supprimée avec succès");
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression de l'épreuve:", error);
      toast.error("Erreur lors de la suppression de l'épreuve");
    },
  });

  // Fonction pour confirmer la suppression d'une épreuve
  const handleDeleteStage = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette épreuve ?")) {
      try {
        await deleteStageMutation.mutateAsync(id);
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };

  // Fonction pour gérer la soumission du formulaire (ajout ou mise à jour)
  const handleSubmit = async (stageData: StageFormValues) => {
    try {
      // S'assurer que rallyId est disponible
      const effectiveRallyId = rallyId || defaultRally?.id;
      
      if (!effectiveRallyId) {
        toast.error("ID du rallye non disponible");
        return;
      }
      
      const completeStageData = {
        ...stageData,
        rally_id: effectiveRallyId,
      };
      
      console.log("Données à soumettre:", completeStageData);
      
      if (currentStage?.id) {
        // Mise à jour d'une épreuve existante
        await updateStageMutation.mutateAsync({
          ...completeStageData,
          id: currentStage.id,
        } as Stage);
      } else {
        // Ajout d'une nouvelle épreuve
        await addStageMutation.mutateAsync(completeStageData as StageFormValues & { rally_id: string });
      }
      closeModal();
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      toast.error("Une erreur est survenue lors de la soumission du formulaire");
    }
  };

  return {
    stages,
    isLoading: isLoading || isLoadingDefaultRally,
    error,
    modalOpen,
    currentStage,
    openAddModal,
    openEditModal,
    closeModal,
    handleSubmit,
    defaultRally,
    deleteStage: handleDeleteStage
  };
};
