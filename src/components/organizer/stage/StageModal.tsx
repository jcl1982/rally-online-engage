
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useStageForm } from "@/hooks/useStageForm";
import { StageFormGeneralFields } from "./form/StageFormGeneralFields";
import { StageFormMetricsFields } from "./form/StageFormMetricsFields";
import { StageFormSelects } from "./form/StageFormSelects";
import { StageFormDescription } from "./form/StageFormDescription";
import { StageFormRalliesSelect } from "./form/StageFormRalliesSelect";

interface Stage {
  id: string;
  name: string;
  location: string;
  distance: number;
  description?: string;
  status: string;
  route_type?: string;
  difficulty_level?: string;
  stage_order?: number;
  rally_id: string;
}

interface StageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (stageData: any) => void;
  stage: Stage | null;
  rallyId: string;
}

export const StageModal = ({ isOpen, onClose, onSave, stage, rallyId }: StageModalProps) => {
  const { 
    formData, 
    errors, 
    handleInputChange, 
    handleSelectChange,
    handleSubmit 
  } = useStageForm({ 
    initialData: stage || undefined, 
    defaultRallyId: rallyId,
    onClose: () => {
      onClose();
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{stage ? "Modifier l'épreuve" : "Ajouter une épreuve"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid grid-cols-1 gap-4">
            <StageFormGeneralFields 
              values={{
                name: formData.name,
                location: formData.location
              }}
              errors={errors}
              onChange={handleInputChange}
            />

            <StageFormRalliesSelect 
              value={formData.rally_id}
              onChange={(value) => handleSelectChange("rally_id", value)}
              error={errors.rally_id}
            />

            <StageFormMetricsFields 
              values={{
                distance: formData.distance,
                stage_order: formData.stage_order
              }}
              errors={errors}
              onChange={handleInputChange}
            />

            <StageFormSelects 
              values={{
                status: formData.status,
                difficulty_level: formData.difficulty_level,
                route_type: formData.route_type
              }}
              onChange={handleSelectChange}
            />

            <StageFormDescription 
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-rally-red hover:bg-red-700">
              {stage ? "Mettre à jour" : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
