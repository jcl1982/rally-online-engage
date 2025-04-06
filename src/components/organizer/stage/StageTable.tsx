
import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { Stage } from '@/hooks/useStageForm';

interface StageTableProps {
  stages: Stage[];
  onEdit: (stage: Stage) => void;
  onDelete: (stageId: string) => void;
}

export const StageTable: React.FC<StageTableProps> = ({ stages, onEdit, onDelete }) => {
  const formatDistance = (distance: number) => {
    return `${distance.toFixed(2)} km`;
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case 'planned':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Planifiée</span>;
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Terminée</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {stages.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Localisation</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stages.map((stage) => (
                <TableRow key={stage.id}>
                  <TableCell className="font-medium">{stage.name}</TableCell>
                  <TableCell>{stage.location}</TableCell>
                  <TableCell>{formatDistance(stage.distance)}</TableCell>
                  <TableCell>{formatStatus(stage.status)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onEdit(stage)}
                    >
                      <Edit size={16} className="mr-1" /> Modifier
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => onDelete(stage.id)}
                    >
                      <Trash2 size={16} className="mr-1" /> Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">
          Aucune épreuve trouvée. Ajoutez votre première épreuve en cliquant sur "Ajouter une épreuve".
        </div>
      )}
    </div>
  );
};
