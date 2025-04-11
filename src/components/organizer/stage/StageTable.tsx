
import { useState } from "react";
import { Edit, Trash, Flag, MapPin, ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Stage } from "@/hooks/useStageForm";

interface StageTableProps {
  stages: Stage[];
  onEdit: (stage: Stage) => void;
  onDelete: (stageId: string) => void;
}

export const StageTable = ({ stages, onEdit, onDelete }: StageTableProps) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planned':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (stages.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <Flag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          Aucune épreuve disponible
        </h3>
        <p className="text-gray-500 mb-6">
          Ajoutez une nouvelle épreuve pour commencer
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Lieu</TableHead>
            <TableHead>Distance</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stages.map((stage) => (
            <TableRow key={stage.id}>
              <TableCell className="font-medium">{stage.name}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1 text-gray-500" />
                  {stage.location}
                </div>
              </TableCell>
              <TableCell>{stage.distance} km</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                    stage.status
                  )}`}
                >
                  {stage.status === 'active'
                    ? 'Active'
                    : stage.status === 'planned'
                    ? 'Planifiée'
                    : stage.status === 'cancelled'
                    ? 'Annulée'
                    : 'Terminée'}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(stage)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(stage.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
