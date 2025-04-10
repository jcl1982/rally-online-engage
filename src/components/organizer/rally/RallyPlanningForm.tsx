
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { rallySchema, RallyFormValues, rallyStatusEnum } from "@/schemas/rallySchema";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { RallyBasicInfoFields } from "./form/RallyBasicInfoFields";
import { RallyDateFields } from "./form/RallyDateFields";
import { RallyStatusField } from "./form/RallyStatusField";
import { RallyRegistrationFields } from "./form/RallyRegistrationFields";
import { RallyFormActions } from "./form/RallyFormActions";

interface RallyPlanningFormProps {
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
}

export const RallyPlanningForm = ({ isSubmitting, setIsSubmitting }: RallyPlanningFormProps) => {
  const navigate = useNavigate();
  
  const form = useForm<RallyFormValues>({
    resolver: zodResolver(rallySchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
      start_date: new Date(),
      end_date: new Date(new Date().setDate(new Date().getDate() + 1)),
      registration_open: false,
      registration_deadline: undefined,
      status: "upcoming",
    },
  });

  const onSubmit = async (values: RallyFormValues) => {
    try {
      setIsSubmitting(true);
      console.log("Valeurs soumises:", values);
      
      // Convertir les dates en format ISO string pour Supabase
      const rallyData = {
        name: values.name,
        location: values.location,
        description: values.description || null,
        start_date: values.start_date.toISOString().split('T')[0],
        end_date: values.end_date.toISOString().split('T')[0],
        registration_deadline: values.registration_deadline 
          ? values.registration_deadline.toISOString().split('T')[0] 
          : null,
        registration_open: values.registration_open,
        status: values.status,
        // Ajouter is_upcoming pour les rallyes à venir
        is_upcoming: values.status === 'upcoming' && new Date(values.start_date) > new Date()
      };
      
      // Logging pour débogage
      console.log("Données à insérer:", rallyData);
      
      const { data, error } = await supabase
        .from('rallies')
        .insert(rallyData)
        .select()
        .single();
      
      if (error) {
        console.error("Erreur lors de la création du rallye:", error);
        throw error;
      }
      
      toast.success("Rallye créé avec succès !");
      // Redirection vers la page de gestion des épreuves du rallye créé
      navigate(`/organizer/rally/${data.id}/stages`);
    } catch (error: any) {
      console.error("Erreur complète:", error);
      toast.error(error.message || "Erreur lors de la création du rallye");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <RallyBasicInfoFields form={form} />
            <RallyDateFields form={form} />
            <RallyStatusField form={form} />
            <RallyRegistrationFields form={form} />
            <RallyFormActions isSubmitting={isSubmitting} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
