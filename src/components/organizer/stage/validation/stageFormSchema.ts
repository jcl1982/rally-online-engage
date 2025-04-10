
import { z } from "zod";

export const stageFormSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  location: z.string().min(1, "Le lieu est requis"),
  distance: z.string().min(1, "La distance est requise").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "La distance doit être un nombre positif"
  ),
  description: z.string().optional(),
  status: z.string().min(1, "Le statut est requis"),
  route_type: z.string(),
  difficulty_level: z.string(),
  stage_order: z.string().refine(
    (val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0),
    "L'ordre doit être un nombre positif"
  ),
  rally_id: z.string().min(1, "Un rallye doit être sélectionné"),
});

export type StageFormValues = z.infer<typeof stageFormSchema>;

export const validateStageForm = (formData: any): Record<string, string> => {
  try {
    stageFormSchema.parse(formData);
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path) {
          formErrors[err.path[0]] = err.message;
        }
      });
      return formErrors;
    }
    return {};
  }
};
