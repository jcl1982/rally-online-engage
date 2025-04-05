
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stageSchema } from "@/schemas/organizerStageSchema";
import { Stage } from "@/hooks/useStageForm";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { StageFormFields } from "./StageFormFields";

interface StageFormProps {
  initialData?: Stage;
  onClose: () => void;
  defaultRallyId: string;
}

export const StageForm: React.FC<StageFormProps> = ({
  initialData,
  onClose,
  defaultRallyId,
}) => {
  const { isSubmitting, isEditMode, handleSubmit } = useStageForm({
    initialData,
    defaultRallyId,
    onClose,
  });

  const form = useForm({
    resolver: zodResolver(stageSchema),
    defaultValues: {
      name: initialData?.name || "",
      location: initialData?.location || "",
      description: initialData?.description || "",
      distance: initialData?.distance || 0,
      status: initialData?.status || "planned",
    },
  });

  const onSubmit = (values) => {
    handleSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {isEditMode ? "Modifier l'épreuve" : "Ajouter une épreuve"}
          </h3>
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
        </div>

        <StageFormFields form={form} />

        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-rally-red hover:bg-red-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enregistrement..." : isEditMode ? "Mettre à jour" : "Ajouter"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
