
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export interface Stage {
  id: string;
  name: string;
  location: string;
  description?: string;
  distance: number;
  status: "planned" | "active" | "completed";
  rally_id: string;
}

interface UseStageFormProps {
  initialData?: Stage;
  defaultRallyId: string;
  onClose: () => void;
}

export const useStageForm = ({ initialData, defaultRallyId, onClose }: UseStageFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!initialData;

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const stageData = {
        name: values.name,
        location: values.location,
        description: values.description || null,
        distance: Number(values.distance),
        status: values.status,
        rally_id: defaultRallyId,
      };

      if (isEditMode && initialData) {
        // Update existing stage
        const { error } = await supabase
          .from("rally_stages")
          .update(stageData)
          .eq("id", initialData.id);

        if (error) throw error;
        toast.success("Épreuve mise à jour avec succès");
      } else {
        // Create new stage
        const { error } = await supabase
          .from("rally_stages")
          .insert(stageData);

        if (error) throw error;
        toast.success("Épreuve ajoutée avec succès");
      }

      onClose();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      toast.error("Une erreur s'est produite lors de l'enregistrement");
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
