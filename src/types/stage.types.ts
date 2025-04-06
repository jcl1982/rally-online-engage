
import * as z from "zod";

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
  route_type: z.enum(["tarmac", "gravel", "mixed", "snow", "sand"], {
    required_error: "Le type de parcours est requis",
  }).default("mixed"),
  max_participants: z.coerce.number().default(100),
  stage_order: z.coerce.number().optional(),
  rally_id: z.string().optional(),
  start_latitude: z.coerce.number().optional(),
  start_longitude: z.coerce.number().optional(),
  finish_latitude: z.coerce.number().optional(),
  finish_longitude: z.coerce.number().optional(),
  map_zoom_level: z.coerce.number().optional(),
  start_date: z.string().optional(),
  start_time: z.string().optional(),
});

export interface Stage {
  id: string;
  name: string;
  description?: string;
  location: string;
  distance: number;
  rally_id: string;
  start_latitude?: number;
  start_longitude?: number;
  finish_latitude?: number;
  finish_longitude?: number;
  map_zoom_level?: number;
  start_date?: string;
  start_time?: string;
  status?: "planned" | "active" | "completed" | "cancelled";
  difficulty_level?: "easy" | "medium" | "hard" | "expert";
  route_type?: "tarmac" | "gravel" | "mixed" | "snow" | "sand";
  max_participants?: number;
  stage_order?: number;
  created_at?: string;
  updated_at?: string;
}

export type StageFormValues = z.infer<typeof stageSchema>;
