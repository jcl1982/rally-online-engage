
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { VehicleFormData } from "@/schemas/vehicleSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VehicleClassificationFieldsProps {
  form: UseFormReturn<VehicleFormData>;
}

export const VehicleClassificationFields = ({ form }: VehicleClassificationFieldsProps) => {
  return (
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
      
      {/* Les champs groupe et classe sont gérés par VehicleSelectorStandalone */}
      <input type="hidden" {...form.register("group")} />
      <input type="hidden" {...form.register("class")} />
    </div>
  );
};
