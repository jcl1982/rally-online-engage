
import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Edit, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Stage } from "@/hooks/useStagesManager";

interface StageTableProps {
  stages: Stage[];
  onEdit: (stage: Stage) => void;
  onDelete: (id: string) => void;
}

export const StageTable: React.FC<StageTableProps> = ({ stages, onEdit, onDelete }) => {
  // Fonction pour afficher le statut de l'épreuve avec la bonne couleur
  const getStatusBadge = (status: string) => {
    const statusClasses = {
      planned: "bg-blue-100 text-blue-800",
      active: "bg-green-100 text-green-800",
      completed: "bg-gray-100 text-gray-800",
    };
    
    const statusLabels = {
      planned: "Planifiée",
      active: "Active",
      completed: "Terminée",
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || ""}`}>
        {statusLabels[status] || status}
      </span>
    );
  };

  // Formater la date au format français
  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return "Non définie";
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: fr });
    } catch (error) {
      return "Date invalide";
    }
  };

  return (
    <div className="rounded-md border">
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
          {stages.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                Aucune épreuve trouvée
              </TableCell>
            </TableRow>
          ) : (
            stages.map((stage) => (
              <TableRow key={stage.id}>
                <TableCell className="font-medium">{stage.name}</TableCell>
                <TableCell>{stage.location}</TableCell>
                <TableCell>{stage.distance}</TableCell>
                <TableCell>{getStatusBadge(stage.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(stage)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(stage.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
