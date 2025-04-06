
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Map } from "lucide-react";
import { Stage } from "@/types/stage.types";

interface StageTableProps {
  stages: Stage[];
  onEdit: (stage: Stage) => void;
  onDelete: (id: string) => void;
  onViewMap?: (stage: Stage) => void;
}

const StageTable = ({ stages, onEdit, onDelete, onViewMap }: StageTableProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-orange-100 text-orange-800";
      case "expert":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "planned":
        return "bg-blue-100 text-blue-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getRouteTypeLabel = (type?: string) => {
    switch (type) {
      case "tarmac":
        return "Asphalte";
      case "gravel":
        return "Terre";
      case "mixed":
        return "Mixte";
      case "snow":
        return "Neige";
      default:
        return "Non spécifié";
    }
  };
  
  const getDifficultyLabel = (difficulty?: string) => {
    switch (difficulty) {
      case "easy":
        return "Facile";
      case "medium":
        return "Moyenne";
      case "hard":
        return "Difficile";
      case "expert":
        return "Expert";
      default:
        return "Non spécifiée";
    }
  };
  
  const getStatusLabel = (status?: string) => {
    switch (status) {
      case "planned":
        return "Planifiée";
      case "active":
        return "Active";
      case "completed":
        return "Terminée";
      case "cancelled":
        return "Annulée";
      default:
        return "Planifiée";
    }
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium">Nom</TableHead>
            <TableHead className="font-medium">Distance</TableHead>
            <TableHead className="font-medium">Type</TableHead>
            <TableHead className="font-medium">Difficulté</TableHead>
            <TableHead className="font-medium">Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stages.length > 0 ? (
            stages.map((stage) => (
              <>
                <TableRow 
                  key={stage.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleExpand(stage.id)}
                >
                  <TableCell className="font-medium">{stage.name}</TableCell>
                  <TableCell>{stage.distance} km</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs">
                      {getRouteTypeLabel(stage.route_type)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(stage.difficulty_level)}`}>
                      {getDifficultyLabel(stage.difficulty_level)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(stage.status)}`}>
                      {getStatusLabel(stage.status)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      {onViewMap && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onViewMap(stage)}
                        >
                          <Map size={16} />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(stage)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(stage.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedId === stage.id && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className="p-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Localisation:</p>
                            <p className="text-sm text-gray-600">{stage.location}</p>
                          </div>
                          {stage.description && (
                            <div>
                              <p className="text-sm font-medium">Description:</p>
                              <p className="text-sm text-gray-600">{stage.description}</p>
                            </div>
                          )}
                          {stage.start_date && (
                            <div>
                              <p className="text-sm font-medium">Date de début:</p>
                              <p className="text-sm text-gray-600">{new Date(stage.start_date).toLocaleDateString()}</p>
                            </div>
                          )}
                          {stage.start_time && (
                            <div>
                              <p className="text-sm font-medium">Heure de début:</p>
                              <p className="text-sm text-gray-600">{stage.start_time}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                Aucune épreuve n'a été ajoutée pour ce rallye.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StageTable;
