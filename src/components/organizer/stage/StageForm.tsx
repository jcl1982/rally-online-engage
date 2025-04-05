
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { stageSchema, StageFormValues } from "@/schemas/organizerStageSchema";
import StageFormFields from "./StageFormFields";
import { useStageForm, Stage } from "@/hooks/useStageForm";

interface StageFormProps {
  initialData?: Stage;
  onClose: () => void;
  defaultRallyId: string;
}

export const StageForm = ({ initialData, onClose, defaultRallyId }: StageFormProps) => {
  const { isSubmitting, isEditMode, handleSubmit } = useStageForm({
    initialData,
    defaultRallyId,
    onClose
  });

  const form = useForm<StageFormValues>({
    resolver: zodResolver(stageSchema),
    defaultValues: {
      name: initialData?.name || "",
      location: initialData?.location || "",
      description: initialData?.description || "",
      distance: initialData?.distance || 0,
      status: (initialData?.status as "planned" | "active" | "completed") || "planned",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="mb-4">
          <h3 className="font-semibold text-lg">
            {isEditMode ? "Modifier l'épreuve" : "Ajouter une épreuve"}
          </h3>
        </div>

        <StageFormFields control={form.control} />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            type="submit" 
            className="bg-rally-red hover:bg-red-700"
            disabled={isSubmitting || (!defaultRallyId && !isEditMode)}
          >
            {isSubmitting ? "Enregistrement..." : isEditMode ? "Modifier" : "Ajouter"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StageForm;
