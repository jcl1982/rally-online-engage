
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface StageFormMetricsFieldsProps {
  values: {
    distance: string;
    stage_order: string;
  };
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StageFormMetricsFields = ({ values, errors, onChange }: StageFormMetricsFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="distance">Distance (km)*</Label>
        <Input
          id="distance"
          name="distance"
          value={values.distance}
          onChange={onChange}
          placeholder="0.0"
          type="number"
          step="0.1"
        />
        {errors.distance && <p className="text-sm text-red-500">{errors.distance}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="stage_order">Ordre</Label>
        <Input
          id="stage_order"
          name="stage_order"
          value={values.stage_order}
          onChange={onChange}
          placeholder="1"
          type="number"
        />
        {errors.stage_order && <p className="text-sm text-red-500">{errors.stage_order}</p>}
      </div>
    </div>
  );
};
