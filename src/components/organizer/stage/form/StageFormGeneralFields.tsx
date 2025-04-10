
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface StageFormGeneralFieldsProps {
  values: {
    name: string;
    location: string;
  };
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StageFormGeneralFields = ({ values, errors, onChange }: StageFormGeneralFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Nom de l'épreuve*</Label>
        <Input
          id="name"
          name="name"
          value={values.name}
          onChange={onChange}
          placeholder="ES1 - Nom de l'épreuve"
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Lieu*</Label>
        <Input
          id="location"
          name="location"
          value={values.location}
          onChange={onChange}
          placeholder="Lieu de l'épreuve"
        />
        {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
      </div>
    </>
  );
};
