
import { z } from "zod";
import { Stage } from "@/types/stage.types";

// Schéma de validation pour les formulaires d'épreuves
export const stageSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  location: z.string().min(1, { message: "L'emplacement est requis" }),
  description: z.string().optional(),
  distance: z.number({ required_error: "La distance est requise" }).min(0.1, { message: "La distance doit être supérieure à 0" }),
  difficulty_level: z.enum(["easy", "medium", "hard", "expert"], { required_error: "La difficulté est requise" }),
  route_type: z.enum(["tarmac", "gravel", "snow", "sand", "mixed"], { required_error: "Le type de route est requis" }),
  start_time: z.string().optional(),
  start_latitude: z.number().optional().nullable(),
  start_longitude: z.number().optional().nullable(),
  finish_latitude: z.number().optional().nullable(),
  finish_longitude: z.number().optional().nullable(),
  map_zoom_level: z.number().optional().nullable(),
  max_participants: z.number().optional(),
  stage_order: z.number().optional().nullable(),
  status: z.enum(["planned", "active", "completed", "cancelled"]).default("planned"),
});

export type StageFormValues = z.infer<typeof stageSchema>;

// Export the Stage type from @/types/stage.types to ensure consistency
export type { Stage };
