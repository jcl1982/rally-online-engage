
import * as z from "zod";

export const vehicleSchema = z.object({
  make: z.string().min(1, "Marque obligatoire"),
  model: z.string().min(1, "Modèle obligatoire"),
  year: z.string().regex(/^\d{4}$/, "Année invalide (format: YYYY)"),
  registrationNumber: z.string().min(1, "Numéro d'immatriculation obligatoire"),
  chassisNumber: z.string().min(1, "Numéro de châssis obligatoire"),
  engineNumber: z.string().min(1, "Numéro de moteur obligatoire"),
  engineCapacity: z.string().min(1, "Cylindrée obligatoire"),
  homologationNumber: z.string().min(1, "Numéro d'homologation obligatoire"),
  technicalPassportNumber: z.string().min(1, "Numéro de passeport technique obligatoire"),
  category: z.string().min(1, "Catégorie obligatoire"),
  group: z.string().min(1, "Groupe obligatoire"),
  class: z.string().min(1, "Classe obligatoire"),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;

export const defaultVehicleValues: VehicleFormData = {
  make: "",
  model: "",
  year: "",
  registrationNumber: "",
  chassisNumber: "",
  engineNumber: "",
  engineCapacity: "",
  homologationNumber: "",
  technicalPassportNumber: "",
  category: "",
  group: "",
  class: "",
};
