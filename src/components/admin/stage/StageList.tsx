
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Edit, Trash2, Eye } from "lucide-react";
import { RallyStage, getStatusBadgeClass, getStatusLabel } from "@/schemas/stageSchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface StageListProps {
  stages: RallyStage[];
  isLoading: boolean;
  onEdit: (stage: RallyStage) => void;
  onDelete: (id: string) => void;
  onView?: (stage: RallyStage) => void;
}

const StageList = ({ stages, isLoading, onEdit, onDelete, onView }: StageListProps) => {
  const formatDateTime = (dateTimeString: string | null) => {
    if (!dateTimeString) return "Non définie";
    return format(new Date(dateTimeString), "dd/MM/yyyy HH:mm", { locale: fr });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red"></div>
      </div>
    );
  }

  if (stages.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Aucune épreuve trouvée</CardTitle>
          <CardDescription>
            Commencez par ajouter une épreuve en utilisant le bouton ci-dessus.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead>Distance (km)</TableHead>
              <TableHead>Date et heure</TableHead>
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
                <TableCell>{formatDateTime(stage.start_time)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                      stage.status
                    )}`}
                  >
                    {getStatusLabel(stage.status)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    {onView && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onView(stage)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(stage)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Cette action ne peut pas être annulée. Cela supprimera
                            définitivement l'épreuve "{stage.name}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(stage.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StageList;
