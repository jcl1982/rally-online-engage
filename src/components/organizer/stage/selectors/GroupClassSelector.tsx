
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
import { carGroups, carClasses } from "../constants/vehicleData";

interface GroupClassSelectorProps {
  form: any;
}

export const GroupClassSelector = ({ form }: GroupClassSelectorProps) => {
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  return (
    <>
      <FormField
        control={form.control}
        name="group"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Groupe</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                setSelectedGroup(value);
                // Reset class when group changes
                if (form.getValues("vehicleClass") && !carClasses[value]?.includes(form.getValues("vehicleClass"))) {
                  form.setValue("vehicleClass", "");
                }
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un groupe" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {carGroups.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
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
        name="vehicleClass"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Classe</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={!selectedGroup}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une classe" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {selectedGroup && carClasses[selectedGroup] ? (
                  carClasses[selectedGroup].map((carClass) => (
                    <SelectItem key={carClass} value={carClass}>
                      {carClass}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem key="no-class-selector" value="select-group-first">
                    Sélectionnez d'abord un groupe
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
