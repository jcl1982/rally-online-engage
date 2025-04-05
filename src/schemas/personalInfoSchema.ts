
import * as z from "zod";

export const personalInfoSchema = z.object({
  // Pilote
  driverFirstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  driverLastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  driverEmail: z.string().email("Email invalide"),
  driverPhone: z.string().min(10, "Numéro de téléphone invalide"),
  driverLicenseNumber: z.string().min(1, "Numéro de licence obligatoire"),
  driverLicenseCategory: z.string().min(1, "Catégorie de licence obligatoire"),
  driverBloodType: z.string().optional(),
  
  // Co-pilote
  coDriverFirstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  coDriverLastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  coDriverEmail: z.string().email("Email invalide"),
  coDriverPhone: z.string().min(10, "Numéro de téléphone invalide"),
  coDriverLicenseNumber: z.string().min(1, "Numéro de licence obligatoire"),
  coDriverLicenseCategory: z.string().min(1, "Catégorie de licence obligatoire"),
  coDriverBloodType: z.string().optional(),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

export const defaultPersonalInfoValues: PersonalInfoFormData = {
  driverFirstName: "",
  driverLastName: "",
  driverEmail: "",
  driverPhone: "",
  driverLicenseNumber: "",
  driverLicenseCategory: "",
  driverBloodType: "",
  coDriverFirstName: "",
  coDriverLastName: "",
  coDriverEmail: "",
  coDriverPhone: "",
  coDriverLicenseNumber: "",
  coDriverLicenseCategory: "",
  coDriverBloodType: "",
};
