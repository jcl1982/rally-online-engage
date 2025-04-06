
import * as z from "zod";

export const statusOptions = [
  { value: "planned", label: "Planifiée" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Terminée" },
];

export const stageSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  location: z.string().min(2, "Le lieu doit contenir au moins 2 caractères"),
  distance: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "La distance doit être un nombre positif",
  }),
  description: z.string().optional(),
  status: z.enum(["planned", "active", "completed"]),
});

export type StageFormValues = z.infer<typeof stageSchema>;
