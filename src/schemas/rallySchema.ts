
import * as z from "zod";

export const rallyStatusEnum = z.enum(["upcoming", "active", "completed", "cancelled"]);
export type RallyStatus = z.infer<typeof rallyStatusEnum>;

export const rallySchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  location: z.string().min(3, "La localisation doit contenir au moins 3 caractères"),
  description: z.string().optional(),
  start_date: z.date({
    required_error: "La date de début est requise",
  }),
  end_date: z.date({
    required_error: "La date de fin est requise",
  }),
  registration_open: z.boolean().default(false),
  registration_deadline: z.date().optional(),
  status: rallyStatusEnum.default("upcoming"),
});

export type RallyFormValues = z.infer<typeof rallySchema>;

export interface Rally {
  id: string;
  name: string;
  location: string;
  description: string | null;
  start_date: string;
  end_date: string;
  registration_open: boolean;
  registration_deadline: string | null;
  status: RallyStatus;
  created_at: string;
  updated_at: string;
}

export const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "upcoming":
      return "bg-blue-100 text-blue-800";
    case "active":
      return "bg-green-100 text-green-800";
    case "completed":
      return "bg-gray-100 text-gray-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case "upcoming":
      return "À venir";
    case "active":
      return "En cours";
    case "completed":
      return "Terminé";
    case "cancelled":
      return "Annulé";
    default:
      return status;
  }
};

export const statusOptions = [
  { value: "upcoming", label: "À venir" },
  { value: "active", label: "En cours" },
  { value: "completed", label: "Terminé" },
  { value: "cancelled", label: "Annulé" },
];

// Fonction pour valider que le statut est conforme à notre enum
export const validateRallyStatus = (status: string): RallyStatus => {
  if (status === "upcoming" || status === "active" || 
      status === "completed" || status === "cancelled") {
    return status;
  }
  return "upcoming"; // Valeur par défaut
};
