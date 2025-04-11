
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export interface Stage {
  id: string;
  name: string;
  location: string;
  description?: string;
  distance: number;
  status: "planned" | "active" | "completed" | "cancelled";
  rally_id: string;
  route_type?: string;
  difficulty_level?: string;
  stage_order?: number;
}

interface UseStageFormProps {
  initialData?: Stage;
  defaultRallyId: string;
  onClose: () => void;
}

export const useStageForm = ({ initialData, defaultRallyId, onClose }: UseStageFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!initialData;
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    location: initialData?.location || "",
    distance: initialData?.distance ? String(initialData.distance) : "",
    description: initialData?.description || "",
    status: initialData?.status || "planned",
    route_type: initialData?.route_type || "mixed",
    difficulty_level: initialData?.difficulty_level || "medium",
    stage_order: initialData?.stage_order ? String(initialData.stage_order) : "",
    rally_id: initialData?.rally_id || defaultRallyId
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }
    
    if (!formData.location.trim()) {
      newErrors.location = "Le lieu est requis";
    }
    
    if (!formData.distance || parseFloat(formData.distance) <= 0) {
      newErrors.distance = "La distance doit être supérieure à 0";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const prepareDataForSubmission = () => {
    return {
      name: formData.name,
      location: formData.location,
      description: formData.description,
      distance: parseFloat(formData.distance),
      status: formData.status,
      route_type: formData.route_type,
      difficulty_level: formData.difficulty_level,
      rally_id: formData.rally_id,
      stage_order: formData.stage_order ? parseInt(formData.stage_order) : null,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      const stageData = prepareDataForSubmission();

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
    formData,
    errors,
    isSubmitting,
    isEditMode,
    handleInputChange,
    handleSelectChange,
    validateForm,
    prepareDataForSubmission,
    handleSubmit
  };
};
