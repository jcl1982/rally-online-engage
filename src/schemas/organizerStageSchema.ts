
import * as z from "zod";

export const stageSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  location: z.string().min(1, "La localisation est requise"),
  description: z.string().optional(),
  distance: z.coerce.number().min(0.01, "La distance doit être supérieure à 0"),
  status: z.enum(["planned", "active", "completed"], {
    required_error: "Le statut est requis",
  }),
});

export type StageFormValues = z.infer<typeof stageSchema>;
