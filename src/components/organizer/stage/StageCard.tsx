
import { Stage } from "@/hooks/useStageForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Flag } from "lucide-react";

interface StageCardProps {
  stage: Stage;
  onEdit: (stage: Stage) => void;
  onDelete: (stageId: string) => void;
}

export const StageCard = ({ stage, onEdit, onDelete }: StageCardProps) => {
  return (
    <Card key={stage.id} className="overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{stage.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs ${
            stage.status === 'active' ? 'bg-green-100 text-green-800' : 
            stage.status === 'planned' ? 'bg-blue-100 text-blue-800' : 
            'bg-gray-100 text-gray-800'
          }`}>
            {stage.status === 'active' ? 'Active' : 
             stage.status === 'planned' ? 'Planifiée' : 'Terminée'}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-2">{stage.location}</p>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Flag size={14} className="mr-1" />
          <span>{stage.distance} km</span>
        </div>
        {stage.description && (
          <p className="text-sm text-gray-700 mb-4 line-clamp-2">{stage.description}</p>
        )}
      </div>
      <div className="bg-gray-50 p-3 border-t flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onEdit(stage)}
        >
          <Edit size={14} className="mr-1" /> Modifier
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-red-600 hover:bg-red-50"
          onClick={() => onDelete(stage.id)}
        >
          <Trash2 size={14} className="mr-1" /> Supprimer
        </Button>
      </div>
    </Card>
  );
};
