
import { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { carMakes, carModels } from "../constants/vehicleData";

interface MakeModelSelectorProps {
  form: any;
}

export const MakeModelSelector = ({ form }: MakeModelSelectorProps) => {
  const [selectedMake, setSelectedMake] = useState<string>("");

  return (
    <>
      <FormField
        control={form.control}
        name="make"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Marque</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                setSelectedMake(value);
                // Reset model when make changes
                if (form.getValues("model") && !carModels[value]?.includes(form.getValues("model"))) {
                  form.setValue("model", "");
                }
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une marque" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {carMakes.map((make) => (
                  <SelectItem key={make} value={make}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={!selectedMake}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un modèle" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {selectedMake && carModels[selectedMake] ? (
                  carModels[selectedMake].map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem key="no-model-selector" value="select-make-first">
                    Sélectionnez d'abord une marque
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
