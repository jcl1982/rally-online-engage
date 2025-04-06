
import * as z from "zod";

// Schéma pour la validation des données d'une épreuve
export const stageSchema = z.object({
  name: z.string().min(3, { message: "Le nom doit contenir au moins 3 caractères" }),
  location: z.string().min(3, { message: "La localisation doit contenir au moins 3 caractères" }),
  distance: z.coerce.number().min(0.1, { message: "La distance doit être supérieure à 0" }),
  description: z.string().optional(),
  status: z.enum(["planned", "active", "completed"], {
    required_error: "Le statut est requis",
  }),
  rally_id: z.string().optional()
});

export type StageFormValues = z.infer<typeof stageSchema>;

export type Stage = {
  id: string;
  name: string;
  location: string;
  distance: number;
  description?: string;
  status: "planned" | "active" | "completed";
  rally_id: string;
  created_at?: string;
  updated_at?: string;
};
