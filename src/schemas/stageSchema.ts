
import * as z from "zod";

export const stageStatusEnum = z.enum(["planned", "completed", "cancelled"]);
export type StageStatus = z.infer<typeof stageStatusEnum>;

export const stageSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  location: z.string().min(3, "La localisation doit contenir au moins 3 caractères"),
  distance: z.coerce.number().min(0.1, "La distance doit être supérieure à 0"),
  description: z.string().optional(),
  start_time: z.string().optional(),
  status: stageStatusEnum.default("planned"),
  start_latitude: z.coerce.number().optional(),
  start_longitude: z.coerce.number().optional(),
  finish_latitude: z.coerce.number().optional(),
  finish_longitude: z.coerce.number().optional(),
  map_zoom_level: z.coerce.number().default(13),
});

export type StageFormValues = z.infer<typeof stageSchema>;

export interface RallyStage {
  id: string;
  rally_id: string;
  name: string;
  location: string;
  description: string | null;
  distance: number;
  start_time: string | null;
  status: StageStatus;
  created_at: string;
  updated_at: string;
  start_latitude: number | null;
  start_longitude: number | null;
  finish_latitude: number | null;
  finish_longitude: number | null;
  map_zoom_level: number | null;
}

export interface Rally {
  id: string;
  name: string;
}

export const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "planned":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case "planned":
      return "Planifiée";
    case "completed":
      return "Terminée";
    case "cancelled":
      return "Annulée";
    default:
      return status;
  }
};

export const statusOptions = [
  { value: "planned", label: "Planifiée" },
  { value: "completed", label: "Terminée" },
  { value: "cancelled", label: "Annulée" },
];

// Fonction pour valider que le statut est conforme à notre enum
export const validateStageStatus = (status: string): StageStatus => {
  if (status === "planned" || status === "completed" || status === "cancelled") {
    return status;
  }
  return "planned"; // Valeur par défaut
};

// Schema pour les points de chronométrage
export const timingPointTypes = ["start", "split", "finish"] as const;
export const timingPointTypeEnum = z.enum(timingPointTypes);
export type TimingPointType = z.infer<typeof timingPointTypeEnum>;

export const timingPointSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  description: z.string().optional(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  point_type: timingPointTypeEnum,
  order_index: z.coerce.number().int().min(0),
});

export type TimingPointFormValues = z.infer<typeof timingPointSchema>;

export interface TimingPoint {
  id: string;
  stage_id: string;
  name: string;
  description: string | null;
  latitude: number;
  longitude: number;
  point_type: TimingPointType;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export const getTimingPointTypeLabel = (type: TimingPointType): string => {
  switch (type) {
    case "start":
      return "Départ";
    case "split":
      return "Intermédiaire";
    case "finish":
      return "Arrivée";
    default:
      return type;
  }
};

export const getTimingPointTypeColor = (type: TimingPointType): string => {
  switch (type) {
    case "start":
      return "bg-green-500";
    case "split":
      return "bg-blue-500";
    case "finish":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export const timingPointTypeOptions = [
  { value: "start", label: "Départ" },
  { value: "split", label: "Intermédiaire" },
  { value: "finish", label: "Arrivée" },
];
