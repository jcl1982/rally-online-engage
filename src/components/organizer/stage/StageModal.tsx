
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Stage } from "@/hooks/useStagesManager";

const stageSchema = z.object({
  name: z.string().min(3, { message: "Le nom doit contenir au moins 3 caractères" }),
  location: z.string().min(3, { message: "La localisation doit contenir au moins 3 caractères" }),
  distance: z.coerce.number().min(0.1, { message: "La distance doit être supérieure à 0" }),
  description: z.string().optional(),
  status: z.string(),
  rally_id: z.string().uuid()
});

type StageFormValues = z.infer<typeof stageSchema>;

interface StageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: StageFormValues) => void;
  initialData: Stage | null;
  title: string;
}

export const StageModal: React.FC<StageModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title
}) => {
  const form = useForm<StageFormValues>({
    resolver: zodResolver(stageSchema),
    defaultValues: initialData || {
      name: "",
      location: "",
      distance: 0,
      description: "",
      status: "planned",
      rally_id: "00000000-0000-0000-0000-000000000000" // Placeholder UUID
    },
  });

  React.useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    } else {
      form.reset({
        name: "",
        location: "",
        distance: 0,
        description: "",
        status: "planned",
        rally_id: "00000000-0000-0000-0000-000000000000" // Placeholder UUID
      });
    }
  }, [initialData, form]);

  const handleSubmit = (values: StageFormValues) => {
    onSubmit(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de l'épreuve</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="ES1 - Col de Turini" />
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
                    <Input {...field} placeholder="Alpes-Maritimes, France" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="distance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distance (km)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="0.1" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Description de l'épreuve"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit" className="bg-rally-red hover:bg-red-700">
                {initialData ? "Mettre à jour" : "Ajouter"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
