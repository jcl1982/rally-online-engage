
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { motion } from "framer-motion";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import DriverFormSection from "@/components/forms/DriverFormSection";
import CoDriverFormSection from "@/components/forms/CoDriverFormSection";
import { 
  personalInfoSchema, 
  PersonalInfoFormData, 
  defaultPersonalInfoValues 
} from "@/schemas/personalInfoSchema";

interface PersonalInfoFormProps {
  onSubmitStep: (data: PersonalInfoFormData) => void;
  initialData?: PersonalInfoFormData;
}

const PersonalInfoForm = ({ onSubmitStep, initialData }: PersonalInfoFormProps) => {
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: initialData || defaultPersonalInfoValues,
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    toast.success("Informations personnelles enregistrées");
    onSubmitStep(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="rallyForm"
    >
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DriverFormSection />
            <CoDriverFormSection />

            <div className="flex justify-end mt-6">
              <Button type="submit" className="bg-rally-red hover:bg-red-700">
                Suivant: Véhicule
              </Button>
            </div>
          </form>
        </Form>
      </FormProvider>
    </motion.div>
  );
};

export default PersonalInfoForm;
