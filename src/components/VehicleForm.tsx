
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const vehicleSchema = z.object({
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

type VehicleFormData = z.infer<typeof vehicleSchema>;

interface VehicleFormProps {
  onSubmitStep: (data: VehicleFormData) => void;
  onPrevStep: () => void;
  initialData?: VehicleFormData;
}

const defaultValues: VehicleFormData = {
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

const VehicleForm = ({
  onSubmitStep,
  onPrevStep,
  initialData,
}: VehicleFormProps) => {
  const form = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: initialData || defaultValues,
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="make"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marque</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Citroën" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modèle</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: C3 WRC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Année</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 2023" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="registrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro d'immatriculation</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: AA-123-BB" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="chassisNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de châssis</FormLabel>
                    <FormControl>
                      <Input placeholder="Numéro de châssis" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="engineNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de moteur</FormLabel>
                    <FormControl>
                      <Input placeholder="Numéro de moteur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="engineCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cylindrée</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 1600cc" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="homologationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro d'homologation</FormLabel>
                    <FormControl>
                      <Input placeholder="Numéro d'homologation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="technicalPassportNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de passeport technique</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Numéro de passeport technique"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="rallyFormSection">
            <h3 className="rallyFormTitle">Classification</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="rally1">Rally1</SelectItem>
                        <SelectItem value="rally2">Rally2</SelectItem>
                        <SelectItem value="rally3">Rally3</SelectItem>
                        <SelectItem value="rally4">Rally4</SelectItem>
                        <SelectItem value="rally5">Rally5</SelectItem>
                        <SelectItem value="rgt">RGT</SelectItem>
                        <SelectItem value="historic">Historique</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="group"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Groupe</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="A">Groupe A</SelectItem>
                        <SelectItem value="N">Groupe N</SelectItem>
                        <SelectItem value="R">Groupe R</SelectItem>
                        <SelectItem value="GT">Groupe GT</SelectItem>
                        <SelectItem value="F2000">Groupe F2000</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Classe</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Classe 1</SelectItem>
                        <SelectItem value="2">Classe 2</SelectItem>
                        <SelectItem value="3">Classe 3</SelectItem>
                        <SelectItem value="4">Classe 4</SelectItem>
                        <SelectItem value="5">Classe 5</SelectItem>
                        <SelectItem value="6">Classe 6</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
