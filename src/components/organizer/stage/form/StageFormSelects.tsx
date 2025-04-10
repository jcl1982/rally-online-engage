
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  stageStatusOptions, 
  routeTypeOptions, 
  difficultyLevelOptions 
} from "../constants/stageFormOptions";

interface StageFormSelectsProps {
  values: {
    status: string;
    difficulty_level: string;
    route_type: string;
  };
  onChange: (name: string, value: string) => void;
}

export const StageFormSelects = ({ values, onChange }: StageFormSelectsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <Select
            value={values.status}
            onValueChange={(value) => onChange("status", value)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              {stageStatusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="difficulty_level">Niveau de difficulté</Label>
          <Select
            value={values.difficulty_level}
            onValueChange={(value) => onChange("difficulty_level", value)}
          >
            <SelectTrigger id="difficulty_level">
              <SelectValue placeholder="Sélectionner un niveau" />
            </SelectTrigger>
            <SelectContent>
              {difficultyLevelOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="route_type">Type de route</Label>
        <Select
          value={values.route_type}
          onValueChange={(value) => onChange("route_type", value)}
        >
          <SelectTrigger id="route_type">
            <SelectValue placeholder="Sélectionner un type" />
          </SelectTrigger>
          <SelectContent>
            {routeTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
