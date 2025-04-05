
import { z } from "zod";

export const stageSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  location: z.string().min(3, "La localisation doit contenir au moins 3 caractères"),
  description: z.string().optional(),
  distance: z.coerce.number().positive("La distance doit être positive"),
  status: z.enum(["planned", "active", "completed"]),
});

export type StageFormValues = z.infer<typeof stageSchema>;

export const statusOptions = [
  { value: "planned", label: "Planifiée" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Terminée" },
];

export const getStatusLabel = (status: string) => {
  switch (status) {
    case "planned": return "Planifiée";
    case "active": return "Active";
    case "completed": return "Terminée";
    default: return status;
  }
};
