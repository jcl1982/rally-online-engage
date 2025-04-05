
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const equipmentSchema = z.object({
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

type EquipmentFormData = z.infer<typeof equipmentSchema>;

interface EquipmentFormProps {
  onSubmitStep: (data: EquipmentFormData) => void;
  onPrevStep: () => void;
  initialData?: EquipmentFormData;
}

const defaultValues: EquipmentFormData = {
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

const EquipmentForm = ({
  onSubmitStep,
  onPrevStep,
  initialData,
}: EquipmentFormProps) => {
  const form = useForm<EquipmentFormData>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: initialData || defaultValues,
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="rallyFormSection">
            <h3 className="rallyFormTitle">Équipement du pilote</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="border-l-2 border-rally-red pl-4 py-2">
                <h4 className="font-semibold mb-4">Casque</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="driverHelmet.brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marque</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Stilo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="driverHelmet.model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Modèle</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: ST5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="driverHelmet.homologationNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro d'homologation</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: FIA 8860-2018" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="driverHelmet.expirationDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date d'expiration</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 2028" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="border-l-2 border-rally-red pl-4 py-2">
                <h4 className="font-semibold mb-4">Combinaison</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="driverSuit.brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marque</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Sparco" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="driverSuit.homologationNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro d'homologation</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: FIA 8856-2018" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="driverSuit.expirationDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date d'expiration</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 2028" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rallyFormSection">
            <h3 className="rallyFormTitle">Équipement du co-pilote</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="border-l-2 border-rally-red pl-4 py-2">
                <h4 className="font-semibold mb-4">Casque</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="coDriverHelmet.brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marque</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Bell" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coDriverHelmet.model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Modèle</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: HP77" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coDriverHelmet.homologationNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro d'homologation</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: FIA 8860-2018" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coDriverHelmet.expirationDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date d'expiration</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 2028" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="border-l-2 border-rally-red pl-4 py-2">
                <h4 className="font-semibold mb-4">Combinaison</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="coDriverSuit.brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marque</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: OMP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coDriverSuit.homologationNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro d'homologation</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: FIA 8856-2018" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coDriverSuit.expirationDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date d'expiration</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 2028" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rallyFormSection">
            <h3 className="rallyFormTitle">Équipement du véhicule</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="border-l-2 border-rally-red pl-4 py-2">
                <h4 className="font-semibold mb-4">Sièges</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="seats.brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marque</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Sabelt" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="seats.homologationNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro d'homologation</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: FIA 8855-1999" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="seats.expirationDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date d'expiration</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 2026" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="border-l-2 border-rally-red pl-4 py-2">
                <h4 className="font-semibold mb-4">Harnais</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="belts.brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marque</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Schroth" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="belts.homologationNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro d'homologation</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: FIA 8853-2016" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="belts.expirationDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date d'expiration</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 2026" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rallyFormSection">
            <h3 className="rallyFormTitle">Équipements de sécurité obligatoires</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="hasFIA_HANS"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Système HANS homologué FIA</FormLabel>
                      <FormDescription>
                        Obligatoire selon la réglementation FIA
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hasExtinguisher"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Extincteur automatique</FormLabel>
                      <FormDescription>
                        Conforme à l'annexe J de la FIA
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hasFirstAidKit"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Kit de premier secours</FormLabel>
                      <FormDescription>
                        Accessible au pilote et au co-pilote
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hasTowRope"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Sangle de remorquage</FormLabel>
                      <FormDescription>
                        Conforme à la règlementation technique
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hasWarningTriangle"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Triangle de signalisation</FormLabel>
                      <FormDescription>
                        Obligatoire pour la sécurité
                      </FormDescription>
                    </div>
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
              Précédent: Véhicule
            </Button>
            <Button type="submit" className="bg-rally-red hover:bg-red-700">
              Suivant: Récapitulatif
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default EquipmentForm;
