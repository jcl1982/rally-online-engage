
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
