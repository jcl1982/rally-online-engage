
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Stage } from "@/hooks/useStageForm";
import { toast } from "sonner";

interface StageFormData {
  name: string;
  location: string;
  distance: string;
  description?: string;
}

export const useStagesManager = () => {
  const [currentStage, setCurrentStage] = useState<Stage | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // Récupération des épreuves
  const { data: stages = [], isLoading } = useQuery({
    queryKey: ["stages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rally_stages")
        .select("*")
        .order("created_at");

      if (error) {
        toast.error("Erreur lors de la récupération des épreuves");
        throw error;
      }

      return data as Stage[];
    }
  });

  // Ajout d'une épreuve
  const addStageMutation = useMutation({
    mutationFn: async (stageData: StageFormData) => {
      // Utiliser le premier rallye disponible dans la base de données
      const { data: rallyData, error: rallyError } = await supabase
        .from("rallies")
        .select("id")
        .limit(1)
        .single();

      if (rallyError) throw rallyError;

      // Conversion du champ distance en nombre
      const preparedData = {
        ...stageData,
        rally_id: rallyData.id,
        distance: Number(stageData.distance)
      };

      const { data, error } = await supabase
        .from("rally_stages")
        .insert(preparedData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stages"] });
      toast.success("Épreuve ajoutée avec succès");
      setModalOpen(false);
    },
    onError: (error) => {
      console.error("Erreur lors de l'ajout:", error);
      toast.error("Erreur lors de l'ajout de l'épreuve");
    },
  });

  // Mise à jour d'une épreuve
  const updateStageMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: StageFormData }) => {
      // Conversion du champ distance en nombre
      const preparedData = {
        ...data,
        distance: Number(data.distance)
      };

      const { error } = await supabase
        .from("rally_stages")
        .update(preparedData)
        .eq("id", id);

      if (error) throw error;
      return { id, data: preparedData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stages"] });
      toast.success("Épreuve mise à jour avec succès");
      setModalOpen(false);
      setCurrentStage(null);
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Erreur lors de la mise à jour de l'épreuve");
    },
  });

  // Suppression d'une épreuve
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
      queryClient.invalidateQueries({ queryKey: ["stages"] });
      toast.success("Épreuve supprimée avec succès");
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression de l'épreuve");
    },
  });

  const openAddModal = () => {
    setCurrentStage(null);
    setModalOpen(true);
  };

  const openEditModal = (stage: Stage) => {
    setCurrentStage(stage);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentStage(null);
  };

  const handleSubmit = (data: StageFormData) => {
    if (currentStage) {
      updateStageMutation.mutate({ id: currentStage.id, data });
    } else {
      addStageMutation.mutate(data);
    }
  };

  const deleteStage = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette épreuve?")) {
      deleteStageMutation.mutate(id);
    }
  };

  return {
    stages,
    currentStage,
    modalOpen,
    openAddModal,
    openEditModal,
    closeModal,
    handleSubmit,
    deleteStage,
    isLoading: isLoading || addStageMutation.isPending || updateStageMutation.isPending || deleteStageMutation.isPending
  };
};
