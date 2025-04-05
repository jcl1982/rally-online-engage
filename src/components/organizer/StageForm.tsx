
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stage } from "./StageManagement";

const stageSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  location: z.string().min(3, "La localisation doit contenir au moins 3 caractères"),
  description: z.string().optional(),
  distance: z.coerce.number().positive("La distance doit être positive"),
  status: z.enum(["planned", "active", "completed"]),
});

type StageFormValues = z.infer<typeof stageSchema>;

interface StageFormProps {
  initialData?: Stage;
  onClose: () => void;
  defaultRallyId: string;
}

export const StageForm = ({ initialData, onClose, defaultRallyId }: StageFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const isEditMode = !!initialData;

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

  const saveStageMutation = useMutation({
    mutationFn: async (values: StageFormValues) => {
      if (isEditMode) {
        const { error } = await supabase
          .from("rally_stages")
          .update(values)
          .eq("id", initialData.id);
        
        if (error) throw error;
        return { ...values, id: initialData.id };
      } else {
        // Ajout du rally_id qui est requis par la table rally_stages
        const { data, error } = await supabase
          .from("rally_stages")
          .insert({
            ...values,
            rally_id: defaultRallyId // Utilisation du rallyId passé en prop
          })
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

  const onSubmit = async (values: StageFormValues) => {
    if (!defaultRallyId && !isEditMode) {
      toast.error("Aucun rallye sélectionné. Impossible d'ajouter l'épreuve.");
      return;
    }
    
    setIsSubmitting(true);
    saveStageMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mb-4">
          <h3 className="font-semibold text-lg">
            {isEditMode ? "Modifier l'épreuve" : "Ajouter une épreuve"}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l'épreuve</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Col de Turini" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Localisation</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Alpes-Maritimes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="distance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distance (km)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statut</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="planned">Planifiée</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Terminée</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Description détaillée de l'épreuve..." 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
