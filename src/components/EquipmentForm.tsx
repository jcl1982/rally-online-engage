
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { motion } from "framer-motion";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import DriverEquipmentSection from "@/components/forms/DriverEquipmentSection";
import CoDriverEquipmentSection from "@/components/forms/CoDriverEquipmentSection";
import VehicleEquipmentSection from "@/components/forms/VehicleEquipmentSection";
import SafetyEquipmentSection from "@/components/forms/SafetyEquipmentSection";

import { 
  equipmentSchema,
  EquipmentFormData,
  defaultEquipmentValues
} from "@/schemas/equipmentSchema";

interface EquipmentFormProps {
  onSubmitStep: (data: EquipmentFormData) => void;
  onPrevStep: () => void;
  initialData?: EquipmentFormData;
}

const EquipmentForm = ({
  onSubmitStep,
  onPrevStep,
  initialData,
}: EquipmentFormProps) => {
  const form = useForm<EquipmentFormData>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: initialData || defaultEquipmentValues,
  });

  const onSubmit = (data: EquipmentFormData) => {
    toast.success("Informations des équipements enregistrées");
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
            <DriverEquipmentSection />
            <CoDriverEquipmentSection />
            <VehicleEquipmentSection />
            <SafetyEquipmentSection />

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onPrevStep}
              >
                Précédent: Véhicule
              </Button>
              <Button type="submit" className="bg-rally-red hover:bg-red-700">
                Suivant: Récapitulatif
              </Button>
            </div>
          </form>
        </Form>
      </FormProvider>
    </motion.div>
  );
};

export default EquipmentForm;
