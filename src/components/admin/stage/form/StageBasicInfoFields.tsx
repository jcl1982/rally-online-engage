
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { statusOptions } from "@/schemas/stageSchema";
import { Control } from "react-hook-form";
import { StageFormValues } from "@/schemas/stageSchema";

interface StageBasicInfoFieldsProps {
  control: Control<StageFormValues>;
}

const StageBasicInfoFields = ({ control }: StageBasicInfoFieldsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom de l'épreuve</FormLabel>
            <FormControl>
              <Input placeholder="ES1 - Col de Turini" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Localisation</FormLabel>
            <FormControl>
              <Input placeholder="Col de Turini, France" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="distance"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Distance (km)</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.1"
                placeholder="15.5"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Description de l'épreuve..."
                className="resize-none"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="start_time"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date et heure de début</FormLabel>
            <FormControl>
              <Input
                type="datetime-local"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Statut</FormLabel>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default StageBasicInfoFields;
