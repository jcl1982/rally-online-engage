
import { useState, useEffect } from "react";
import { validateStageForm } from "@/components/organizer/stage/validation/stageFormSchema";

interface Stage {
  id: string;
  name: string;
  location: string;
  distance: number;
  description?: string;
  status: string;
  route_type?: string;
  difficulty_level?: string;
  stage_order?: number;
}

interface UseStageFormProps {
  initialStage: Stage | null;
  rallyId: string;
}

export const useStageForm = ({ initialStage, rallyId }: UseStageFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    distance: "",
    description: "",
    status: "planned",
    route_type: "mixed",
    difficulty_level: "medium",
    stage_order: "",
    rally_id: rallyId
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialStage) {
      setFormData({
        name: initialStage.name || "",
        location: initialStage.location || "",
        distance: initialStage.distance ? String(initialStage.distance) : "",
        description: initialStage.description || "",
        status: initialStage.status || "planned",
        route_type: initialStage.route_type || "mixed",
        difficulty_level: initialStage.difficulty_level || "medium",
        stage_order: initialStage.stage_order ? String(initialStage.stage_order) : "",
        rally_id: rallyId
      });
    } else {
      setFormData({
        name: "",
        location: "",
        distance: "",
        description: "",
        status: "planned",
        route_type: "mixed",
        difficulty_level: "medium",
        stage_order: "",
        rally_id: rallyId
      });
    }
    setErrors({});
  }, [initialStage, rallyId]);

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
    const newErrors = validateStageForm(formData);
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

  return {
    formData,
    errors,
    handleInputChange,
    handleSelectChange,
    validateForm,
    prepareDataForSubmission
  };
};
