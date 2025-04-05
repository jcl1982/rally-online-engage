
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Stage } from '@/hooks/useStageForm';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StageTableProps {
  stages: Stage[];
  onEdit: (stage: Stage) => void;
  onDelete: (id: string) => void;
}

export const StageTable: React.FC<StageTableProps> = ({ 
  stages, 
  onEdit, 
  onDelete 
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'planned':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Planifiée</span>;
      case 'active':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Active</span>;
      case 'completed':
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">Terminée</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return 'Non définie';
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: fr });
    } catch (error) {
      return 'Date invalide';
    }
  };

  if (stages.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-md border border-gray-200">
        <p className="text-gray-500">Aucune épreuve trouvée</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
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
              <TableCell>{stage.distance}</TableCell>
              <TableCell>{getStatusBadge(stage.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(stage)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600"
                    onClick={() => onDelete(stage.id)}
                  >
                    <Trash2 className="h-4 w-4" />
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
