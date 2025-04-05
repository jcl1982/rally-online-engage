
import React from 'react';
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { StageItem } from '@/types/stage';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StageTableProps {
  stages: StageItem[];
  onEdit: (stage: StageItem) => void;
  onDelete: (stage: StageItem) => void;
}

export const StageTable: React.FC<StageTableProps> = ({
  stages,
  onEdit,
  onDelete,
}) => {
  if (!stages || stages.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-lg shadow">
        <p className="text-gray-500">Aucune épreuve n'a été ajoutée pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Distance</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stages.map((stage) => (
            <TableRow key={stage.id}>
              <TableCell className="font-medium">{stage.name}</TableCell>
              <TableCell>{stage.distance} km</TableCell>
              <TableCell>{stage.location}</TableCell>
              <TableCell className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => onEdit(stage)}
                  title="Modifier"
                >
                  <Edit size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:border-red-700"
                  onClick={() => onDelete(stage)}
                  title="Supprimer"
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
