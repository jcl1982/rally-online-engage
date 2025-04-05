
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Stage } from "@/hooks/useStageForm";

// Schéma de validation pour une épreuve
const stageSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  distance: z.string().min(1, { message: "La distance est requise" }),
  description: z.string().optional(),
  location: z.string().min(2, { message: "La localisation est requise" }),
});

type StageFormData = z.infer<typeof stageSchema>;

interface StageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StageFormData) => void;
  initialData?: Stage | null;
  title: string;
}

export const StageModal: React.FC<StageModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StageFormData>({
    resolver: zodResolver(stageSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      distance: String(initialData.distance),
      description: initialData.description || "",
      location: initialData.location,
    } : {
      name: "",
      distance: "",
      description: "",
      location: "",
    },
  });

  // Reset form when initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          name: initialData.name,
          distance: String(initialData.distance),
          description: initialData.description || "",
          location: initialData.location,
        });
      } else {
        reset({
          name: "",
          distance: "",
          description: "",
          location: "",
        });
      }
    }
  }, [initialData, isOpen, reset]);

  const processSubmit = async (data: StageFormData) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'épreuve:", error);
      toast.error("Erreur lors de l'enregistrement de l'épreuve");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Remplissez les détails de l'épreuve ci-dessous.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(processSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom de l'épreuve</Label>
              <Input
                id="name"
                placeholder="ES1 - Col du Turini"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="distance">Distance (km)</Label>
              <Input
                id="distance"
                placeholder="12.5"
                {...register("distance")}
              />
              {errors.distance && (
                <p className="text-sm text-red-500">{errors.distance.message}</p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="location">Localisation</Label>
              <Input
                id="location"
                placeholder="Alpes-Maritimes, France"
                {...register("location")}
              />
              {errors.location && (
                <p className="text-sm text-red-500">{errors.location.message}</p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Une description détaillée de l'épreuve..."
                {...register("description")}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              className="bg-rally-red hover:bg-red-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
