
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { VehicleSelectorStandalone } from "./organizer/vehicle/VehicleSelectorStandalone";
import { VehicleTechnicalFields } from "./vehicle/VehicleTechnicalFields";
import { VehicleClassificationFields } from "./vehicle/VehicleClassificationFields";
import { vehicleSchema, VehicleFormData, defaultVehicleValues } from "@/schemas/vehicleSchema";

interface VehicleFormProps {
  onSubmitStep: (data: VehicleFormData) => void;
  onPrevStep: () => void;
  initialData?: VehicleFormData;
}

const VehicleForm = ({
  onSubmitStep,
  onPrevStep,
  initialData,
}: VehicleFormProps) => {
  const form = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: initialData || defaultVehicleValues,
  });

  const onSubmit = (data: VehicleFormData) => {
    toast.success("Informations du véhicule enregistrées");
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="rallyFormSection">
            <h3 className="rallyFormTitle">Informations du véhicule</h3>
            <div className="md:col-span-2">
              <VehicleSelectorStandalone
                initialMake={form.getValues("make")}
                initialModel={form.getValues("model")}
                initialGroup={form.getValues("group")}
                initialClass={form.getValues("class")}
                onMakeChange={(value) => form.setValue("make", value)}
                onModelChange={(value) => form.setValue("model", value)}
                onGroupChange={(value) => form.setValue("group", value)}
                onClassChange={(value) => form.setValue("class", value)}
              />
            </div>
            
            <VehicleTechnicalFields form={form} />
          </div>

          <div className="rallyFormSection">
            <h3 className="rallyFormTitle">Classification</h3>
            <VehicleClassificationFields form={form} />
          </div>

          <div className="flex justify-between mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onPrevStep}
            >
              Précédent: Pilotes
            </Button>
            <Button type="submit" className="bg-rally-red hover:bg-red-700">
              Suivant: Équipements
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default VehicleForm;
