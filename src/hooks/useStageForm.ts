
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { StageFormValues } from "@/schemas/organizerStageSchema";

export interface Stage {
  id: string;
  rally_id: string;
  name: string;
  location: string;
  description?: string;
  distance: number;
  status: string;
  start_time?: string | null;
}

interface UseStageFormProps {
  initialData?: Stage;
  defaultRallyId: string;
  onClose: () => void;
}

export const useStageForm = ({ initialData, defaultRallyId, onClose }: UseStageFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const isEditMode = !!initialData;

  const saveStageMutation = useMutation({
    mutationFn: async (values: StageFormValues) => {
      if (isEditMode && initialData) {
        // Ensure all required fields are present
        const updatedValues = {
          name: values.name,
          location: values.location,
          description: values.description || null,
          distance: Number(values.distance),
          status: values.status
        };
        
        const { error } = await supabase
          .from("rally_stages")
          .update(updatedValues)
          .eq("id", initialData.id);
        
        if (error) throw error;
        return { ...updatedValues, id: initialData.id };
      } else {
        // Ajout du rally_id qui est requis par la table rally_stages
        const stageData = {
          rally_id: defaultRallyId,
          name: values.name,
          location: values.location,
          description: values.description || null,
          distance: Number(values.distance),
          status: values.status
        };
        
        const { data, error } = await supabase
          .from("rally_stages")
          .insert(stageData)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stages"] });
      toast.success(`Épreuve ${isEditMode ? "modifiée" : "ajoutée"} avec succès`);
      onClose();
    },
    onError: (error) => {
      console.error("Erreur lors de l'enregistrement:", error);
      toast.error(`Erreur lors de l'${isEditMode ? "modification" : "ajout"} de l'épreuve`);
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (values: StageFormValues) => {
    if (!defaultRallyId && !isEditMode) {
      toast.error("Aucun rallye sélectionné. Impossible d'ajouter l'épreuve.");
      return;
    }
    
    setIsSubmitting(true);
    saveStageMutation.mutate(values);
  };

  return {
    isSubmitting,
    isEditMode,
    handleSubmit
  };
};
