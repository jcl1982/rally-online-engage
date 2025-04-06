
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Stage } from "@/hooks/useStageForm";
import { stageSchema } from "@/schemas/organizerStageSchema";
import { StageFormFields } from "./StageFormFields";
import { useState } from "react";

interface StageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData: Stage | null;
  title: string;
}

export const StageModal: React.FC<StageModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(stageSchema),
    defaultValues: {
      name: initialData?.name || "",
      location: initialData?.location || "",
      description: initialData?.description || "",
      distance: initialData?.distance ? initialData?.distance.toString() : "",
      status: initialData?.status || "planned",
    },
  });

  // Reset form when initialData changes
  React.useEffect(() => {
    if (isOpen) {
      form.reset({
        name: initialData?.name || "",
        location: initialData?.location || "",
        description: initialData?.description || "",
        distance: initialData?.distance ? initialData?.distance.toString() : "",
        status: initialData?.status || "planned",
      });
    }
  }, [form, initialData, isOpen]);

  const handleSubmit = async (values: any) => {
    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <StageFormFields form={form} />
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="bg-rally-red hover:bg-red-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enregistrement..." : initialData ? "Mettre à jour" : "Ajouter"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
