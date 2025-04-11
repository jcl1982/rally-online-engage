
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { VehicleFormData } from "@/schemas/vehicleSchema";

interface VehicleTechnicalFieldsProps {
  form: UseFormReturn<VehicleFormData>;
}

export const VehicleTechnicalFields = ({ form }: VehicleTechnicalFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
  );
};
