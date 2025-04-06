
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Stage {
  id: string;
  rally_id: string;
  name: string;
  location: string;
  description: string | null;
  distance: number;
  status: "planned" | "active" | "completed";
  created_at: string;
  updated_at: string;
}

interface StageFormProps {
  initialData?: Stage;
  defaultRallyId: string;
  onClose: () => void;
}

export const useStageForm = ({ initialData, defaultRallyId, onClose }: StageFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!initialData;
  const queryClient = useQueryClient();

  const handleSubmit = async (values: any) => {
    try {
      setIsSubmitting(true);
      
      // Préparer les données pour la soumission
      const stageData = {
        ...values,
        distance: Number(values.distance),
        rally_id: initialData?.rally_id || defaultRallyId,
      };
      
      if (isEditMode) {
        // Mise à jour d'une épreuve existante
        const { error } = await supabase
          .from("rally_stages")
          .update(stageData)
          .eq("id", initialData.id);
          
        if (error) throw error;
        toast.success("Épreuve mise à jour avec succès");
      } else {
        // Création d'une nouvelle épreuve
        const { error } = await supabase
          .from("rally_stages")
          .insert(stageData);
          
        if (error) throw error;
        toast.success("Épreuve créée avec succès");
      }
      
      // Invalider le cache de requêtes pour recharger les données
      queryClient.invalidateQueries({ queryKey: ["stages"] });
      
      // Fermer le formulaire
      onClose();
    } catch (error: any) {
      console.error("Erreur lors de la soumission:", error);
      toast.error(error.message || "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    isEditMode,
    handleSubmit,
  };
};
