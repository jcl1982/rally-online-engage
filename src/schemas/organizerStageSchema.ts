
import * as z from "zod";

export const stageSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  location: z.string().min(1, "La localisation est requise"),
  description: z.string().optional(),
  distance: z.coerce.number().min(0.01, "La distance doit être supérieure à 0"),
  status: z.enum(["planned", "active", "completed", "cancelled"], {
    required_error: "Le statut est requis",
  }),
  start_time: z.string().optional(),
  difficulty_level: z.enum(["easy", "medium", "hard", "expert"], {
    required_error: "La difficulté est requise",
  }).default("medium"),
  route_type: z.enum(["tarmac", "gravel", "snow", "sand", "mixed"], {
    required_error: "Le type de route est requis",
  }).default("mixed"),
  map_zoom_level: z.number().optional().nullable(),
  max_participants: z.number().optional(),
  stage_order: z.number().optional().nullable(),
  start_latitude: z.number().optional().nullable(),
  start_longitude: z.number().optional().nullable(),
  finish_latitude: z.number().optional().nullable(),
  finish_longitude: z.number().optional().nullable(),
});

export type StageFormValues = z.infer<typeof stageSchema>;
