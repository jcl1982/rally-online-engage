
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Stage } from '@/hooks/useStageForm';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table';

interface StageListProps {
  stages: Stage[];
  isLoading: boolean;
  onAddStage: () => void;
  onEditStage: (stage: Stage) => void;
  onDeleteStage: (id: string) => void;
}

export const StageList: React.FC<StageListProps> = ({
  stages,
  isLoading,
  onAddStage,
  onEditStage,
  onDeleteStage
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'planned':
        return 'Planifiée';
      case 'active':
        return 'Active';
      case 'completed':
        return 'Terminée';
      default:
        return status;
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="w-8 h-8 border-t-2 border-rally-red rounded-full animate-spin"></div>
      </div>
    );
  }

  if (stages.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-gray-50">
        <h3 className="font-medium text-gray-700 mb-2">Aucune épreuve trouvée</h3>
        <p className="text-gray-500 mb-4">Ajoutez votre première épreuve pour commencer.</p>
        <Button 
          onClick={onAddStage}
          className="bg-rally-red hover:bg-red-700"
        >
          Ajouter une épreuve
        </Button>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
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
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(stage.status)}`}>
                    {getStatusLabel(stage.status)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEditStage(stage)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600"
                      onClick={() => onDeleteStage(stage.id)}
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
    </div>
  );
};
