
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface StageFormDescriptionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const StageFormDescription = ({ value, onChange }: StageFormDescriptionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        name="description"
        value={value}
        onChange={onChange}
        placeholder="Description de l'épreuve..."
        rows={3}
      />
    </div>
  );
};
