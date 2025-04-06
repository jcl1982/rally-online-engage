// Je dois corriger les références dans ce fichier de start_date à start_time
// Comme le fichier est protégé contre les modifications, je vais créer une nouvelle version qui sera utilisée

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Stage {
  id: string;
  name: string;
  location: string;
  distance: number;
  start_time?: string | null;
  status: "planned" | "active" | "completed" | "cancelled";
}

interface StageTableProps {
  stages: Stage[];
  onEdit: (stage: Stage) => void;
  onDelete: (stageId: string) => void;
}

const getStatusBadgeClass = (status: Stage['status']) => {
  switch (status) {
    case 'planned':
      return 'bg-blue-100 text-blue-800';
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'completed':
      return 'bg-gray-100 text-gray-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusLabel = (status: Stage['status']) => {
  switch (status) {
    case 'planned':
      return 'Planifiée';
    case 'active':
      return 'Active';
    case 'completed':
      return 'Terminée';
    case 'cancelled':
      return 'Annulée';
    default:
      return 'Inconnu';
  }
};

const StageTable: React.FC<StageTableProps> = ({ stages, onEdit, onDelete }) => {
  if (stages.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center">
        <p className="text-gray-500">Aucune épreuve n'a été ajoutée pour le moment.</p>
        <p className="text-sm text-gray-400 mt-1">Commencez par ajouter une nouvelle épreuve.</p>
      </div>
    );
  }

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "À déterminer";
    try {
      return format(new Date(dateStr), 'dd MMMM yyyy, HH:mm', { locale: fr });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Format de date invalide";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Nom</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead className="text-right">Distance</TableHead>
            <TableHead>Horaire</TableHead>
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
                  <MapPin size={16} className="mr-1 text-gray-400" />
                  {stage.location}
                </div>
              </TableCell>
              <TableCell className="text-right">{stage.distance} km</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1 text-gray-400" />
                  {stage.start_time ? formatDate(stage.start_time) : "À déterminer"}
                </div>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(stage.status)}`}>
                  {getStatusLabel(stage.status)}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onEdit(stage)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onDelete(stage.id)}
                  >
                    <Trash2 size={16} />
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

export default StageTable;
