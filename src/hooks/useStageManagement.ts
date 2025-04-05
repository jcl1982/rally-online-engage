
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Stage } from "@/hooks/useStageForm";

export const useStageManagement = () => {
  const [isAddingStage, setIsAddingStage] = useState(false);
  const [editingStage, setEditingStage] = useState<Stage | null>(null);
  const queryClient = useQueryClient();

  // Récupération d'un ID de rallye par défaut pour tester
  const { data: defaultRally } = useQuery({
    queryKey: ["default-rally"],
    queryFn: async () => {
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

  // Récupération des épreuves
  const { data: stages, isLoading } = useQuery({
    queryKey: ["stages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rally_stages")
        .select("*")
        .order("name");

      if (error) {
        toast.error("Erreur lors de la récupération des épreuves");
        throw error;
      }

      return data as Stage[];
    },
  });

  // Suppression d'une épreuve
  const deleteStageMutation = useMutation({
    mutationFn: async (stageId: string) => {
      const { error } = await supabase
        .from("rally_stages")
        .delete()
        .eq("id", stageId);

      if (error) throw error;
      return stageId;
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

  const handleDeleteStage = (stageId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette épreuve ?")) {
      deleteStageMutation.mutate(stageId);
    }
  };

  const handleAddStage = () => {
    setIsAddingStage(true);
  };

  const handleEditStage = (stage: Stage) => {
    setEditingStage(stage);
  };

  const handleCloseForm = () => {
    setIsAddingStage(false);
    setEditingStage(null);
  };

  return {
    stages,
    isLoading,
    isAddingStage,
    editingStage,
    defaultRallyId: defaultRally?.id || "",
    handleAddStage,
    handleEditStage,
    handleDeleteStage,
    handleCloseForm,
  };
};
