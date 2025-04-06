
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
  route_type?: "tarmac" | "gravel" | "mixed" | "snow";
  max_participants?: number;
  stage_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface StageFormValues {
  name: string;
  description?: string;
  location: string;
  distance: number;
  start_latitude?: number;
  start_longitude?: number;
  finish_latitude?: number;
  finish_longitude?: number;
  map_zoom_level?: number;
  start_date?: string;
  start_time?: string;
  status?: "planned" | "active" | "completed" | "cancelled";
  difficulty_level?: "easy" | "medium" | "hard" | "expert";
  route_type?: "tarmac" | "gravel" | "mixed" | "snow";
  max_participants?: number;
  stage_order?: number;
}
