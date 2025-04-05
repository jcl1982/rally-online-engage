
import * as z from "zod";

export const equipmentSchema = z.object({
  // Équipement du pilote
  driverHelmet: z.object({
    brand: z.string().min(1, "Marque obligatoire"),
    model: z.string().min(1, "Modèle obligatoire"),
    homologationNumber: z.string().min(1, "Numéro d'homologation obligatoire"),
    expirationDate: z.string().min(1, "Date d'expiration obligatoire"),
  }),
  driverSuit: z.object({
    brand: z.string().min(1, "Marque obligatoire"),
    homologationNumber: z.string().min(1, "Numéro d'homologation obligatoire"),
    expirationDate: z.string().min(1, "Date d'expiration obligatoire"),
  }),
  
  // Équipement du co-pilote
  coDriverHelmet: z.object({
    brand: z.string().min(1, "Marque obligatoire"),
    model: z.string().min(1, "Modèle obligatoire"),
    homologationNumber: z.string().min(1, "Numéro d'homologation obligatoire"),
    expirationDate: z.string().min(1, "Date d'expiration obligatoire"),
  }),
  coDriverSuit: z.object({
    brand: z.string().min(1, "Marque obligatoire"),
    homologationNumber: z.string().min(1, "Numéro d'homologation obligatoire"),
    expirationDate: z.string().min(1, "Date d'expiration obligatoire"),
  }),
  
  // Équipement du véhicule
  seats: z.object({
    brand: z.string().min(1, "Marque obligatoire"),
    homologationNumber: z.string().min(1, "Numéro d'homologation obligatoire"),
    expirationDate: z.string().min(1, "Date d'expiration obligatoire"),
  }),
  belts: z.object({
    brand: z.string().min(1, "Marque obligatoire"),
    homologationNumber: z.string().min(1, "Numéro d'homologation obligatoire"),
    expirationDate: z.string().min(1, "Date d'expiration obligatoire"),
  }),
  
  // Équipements de sécurité
  hasFIA_HANS: z.boolean().default(true),
  hasExtinguisher: z.boolean().default(true),
  hasFirstAidKit: z.boolean().default(true),
  hasTowRope: z.boolean().default(true),
  hasWarningTriangle: z.boolean().default(true),
});

export type EquipmentFormData = z.infer<typeof equipmentSchema>;

export const defaultEquipmentValues: EquipmentFormData = {
  driverHelmet: {
    brand: "",
    model: "",
    homologationNumber: "",
    expirationDate: "",
  },
  driverSuit: {
    brand: "",
    homologationNumber: "",
    expirationDate: "",
  },
  coDriverHelmet: {
    brand: "",
    model: "",
    homologationNumber: "",
    expirationDate: "",
  },
  coDriverSuit: {
    brand: "",
    homologationNumber: "",
    expirationDate: "",
  },
  seats: {
    brand: "",
    homologationNumber: "",
    expirationDate: "",
  },
  belts: {
    brand: "",
    homologationNumber: "",
    expirationDate: "",
  },
  hasFIA_HANS: true,
  hasExtinguisher: true,
  hasFirstAidKit: true,
  hasTowRope: true,
  hasWarningTriangle: true,
};
