
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Stage } from "@/hooks/useStagesManager";

interface StageTableProps {
  stages: Stage[];
  onEdit: (stage: Stage) => void;
  onDelete: (stageId: string) => void;
}

export const StageTable: React.FC<StageTableProps> = ({ 
  stages, 
  onEdit, 
  onDelete 
}) => {
  if (stages.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Aucune épreuve n'a été créée pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Nom</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Distance (km)</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stages.map((stage) => (
            <TableRow key={stage.id}>
              <TableCell className="font-medium">{stage.name}</TableCell>
              <TableCell>{stage.location}</TableCell>
              <TableCell>{stage.distance} km</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  stage.status === 'active' ? 'bg-green-100 text-green-800' : 
                  stage.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {stage.status === 'planned' ? 'Planifiée' : 
                   stage.status === 'active' ? 'Active' : 
                   stage.status === 'completed' ? 'Terminée' : stage.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mr-2"
                  onClick={() => onEdit(stage)}
                >
                  <Pencil size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onDelete(stage.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
