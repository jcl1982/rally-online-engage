
import * as z from "zod";

// Schéma pour la validation des données des épreuves
export const stageSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  location: z.string().min(1, "La localisation est requise"),
  description: z.string().optional(),
  distance: z.coerce.number().min(0.01, "La distance doit être supérieure à 0"),
  status: z.enum(["planned", "active", "completed", "cancelled"], {
    required_error: "Le statut est requis",
  }),
  difficulty_level: z.enum(["easy", "medium", "hard", "expert"], {
    required_error: "Le niveau de difficulté est requis",
  }).default("medium"),
  route_type: z.enum(["tarmac", "gravel", "snow", "sand", "mixed"], {
    required_error: "Le type de parcours est requis",
  }).default("mixed"),
  max_participants: z.coerce.number().min(1, "Le nombre de participants doit être supérieur à 0").default(100),
  stage_order: z.coerce.number().min(0).default(0),
  rally_id: z.string().optional(),
  start_time: z.string().optional(),
});

export type StageFormValues = z.infer<typeof stageSchema>;

export interface Stage extends StageFormValues {
  id: string;
  rally_id: string;
  created_at: string;
  updated_at: string;
}
