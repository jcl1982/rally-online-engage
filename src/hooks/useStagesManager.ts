
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Stage } from "./useStageForm";
import { toast } from "sonner";

export const useStagesManager = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState<Stage | null>(null);
  const queryClient = useQueryClient();

  // Récupération des épreuves
  const { data: stages = [], isLoading } = useQuery({
    queryKey: ["stages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rally_stages")
        .select("*")
        .order("name");

      if (error) {
        console.error("Erreur lors de la récupération des épreuves:", error);
        toast.error("Erreur lors du chargement des épreuves");
        return [];
      }

      return data as Stage[];
    },
  });

  // Ouverture du modal pour ajouter une épreuve
  const openAddModal = () => {
    setCurrentStage(null);
    setModalOpen(true);
  };

  // Ouverture du modal pour modifier une épreuve
  const openEditModal = (stage: Stage) => {
    setCurrentStage(stage);
    setModalOpen(true);
  };

  // Fermeture du modal
  const closeModal = () => {
    setModalOpen(false);
    setCurrentStage(null);
  };

  // Soumission du formulaire (ajout ou modification)
  const handleSubmit = async (values: any) => {
    try {
      const stageData = {
        name: values.name,
        location: values.location,
        description: values.description || null,
        distance: Number(values.distance),
        status: values.status,
        rally_id: currentStage?.rally_id || stages[0]?.rally_id || "default-rally-id",
      };

      if (currentStage) {
        // Mise à jour d'une épreuve existante
        const { error } = await supabase
          .from("rally_stages")
          .update(stageData)
          .eq("id", currentStage.id);

        if (error) throw error;
        toast.success("Épreuve mise à jour avec succès");
      } else {
        // Création d'une nouvelle épreuve
        const { error } = await supabase
          .from("rally_stages")
          .insert(stageData);

        if (error) throw error;
        toast.success("Épreuve ajoutée avec succès");
      }

      queryClient.invalidateQueries({ queryKey: ["stages"] });
      closeModal();
    } catch (error: any) {
      console.error("Erreur lors de l'enregistrement:", error);
      toast.error("Une erreur s'est produite lors de l'enregistrement");
    }
  };

  // Suppression d'une épreuve
  const deleteStage = async (stageId: string) => {
    try {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer cette épreuve ?")) {
        const { error } = await supabase
          .from("rally_stages")
          .delete()
          .eq("id", stageId);

        if (error) throw error;
        toast.success("Épreuve supprimée avec succès");
        queryClient.invalidateQueries({ queryKey: ["stages"] });
      }
    } catch (error: any) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Une erreur s'est produite lors de la suppression");
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
  };
};
