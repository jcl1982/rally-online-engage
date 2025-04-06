
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Stage {
  id: string;
  name: string;
  distance: number;
  location: string;
  description?: string;
  rally_id: string;
  status: string;
}

export const useStagesManager = () => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState<Stage | null>(null);

  const fetchStages = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("rally_stages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setStages(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des épreuves:", error);
      toast.error("Impossible de charger les épreuves");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStages();
  }, []);

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

  const handleSubmit = async (stageData: Partial<Stage>) => {
    try {
      if (currentStage?.id) {
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
          .insert([stageData]);

        if (error) throw error;
        toast.success("Nouvelle épreuve ajoutée");
      }

      closeModal();
      fetchStages();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'épreuve:", error);
      toast.error("Impossible d'enregistrer l'épreuve");
    }
  };

  const deleteStage = async (stageId: string) => {
    try {
      const { error } = await supabase
        .from("rally_stages")
        .delete()
        .eq("id", stageId);

      if (error) throw error;
      
      toast.success("Épreuve supprimée avec succès");
      fetchStages();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'épreuve:", error);
      toast.error("Impossible de supprimer l'épreuve");
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
