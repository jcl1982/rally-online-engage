
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Control } from "react-hook-form";
import { StageFormValues } from "@/schemas/stageSchema";

interface StageLocationFieldsProps {
  control: Control<StageFormValues>;
  onScrollToMap: () => void;
}

const StageLocationFields = ({ control, onScrollToMap }: StageLocationFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="font-medium text-sm">Point de départ</div>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={control}
            name="start_latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input type="number" step="any" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="start_longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input type="number" step="any" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => {
            const form = control._formState.defaultValues;
            control._fields.start_latitude?._f.onChange(undefined);
            control._fields.start_longitude?._f.onChange(undefined);
          }}
          className="w-full"
        >
          Effacer le point de départ
        </Button>
      </div>

      <div className="space-y-2">
        <div className="font-medium text-sm">Point d'arrivée</div>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={control}
            name="finish_latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input type="number" step="any" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="finish_longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input type="number" step="any" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => {
            control._fields.finish_latitude?._f.onChange(undefined);
            control._fields.finish_longitude?._f.onChange(undefined);
          }}
          className="w-full"
        >
          Effacer le point d'arrivée
        </Button>
      </div>

      <FormField
        control={control}
        name="map_zoom_level"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Niveau de zoom</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="1"
                max="20"
                step="1"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2 pt-2">
        <div className="font-medium text-sm">Sélection sur la carte</div>
        <div className="flex space-x-2">
          <Button 
            type="button"
            variant="outline"
            onClick={onScrollToMap}
            className="flex-1"
          >
            Départ
          </Button>
          <Button 
            type="button"
            variant="outline"
            onClick={onScrollToMap}
            className="flex-1"
          >
            Arrivée
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StageLocationFields;
