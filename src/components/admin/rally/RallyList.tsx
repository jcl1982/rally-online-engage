
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronRight, Edit, Trash2 } from "lucide-react";

import { Rally, getStatusBadgeClass, getStatusLabel } from "@/schemas/rallySchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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

interface RallyListProps {
  rallies: Rally[];
  isLoading: boolean;
  onEdit: (rally: Rally) => void;
  onDelete: (id: string) => void;
  onViewStages: (rally: Rally) => void;
}

const RallyList = ({ rallies, isLoading, onEdit, onDelete, onViewStages }: RallyListProps) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMMM yyyy", { locale: fr });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red"></div>
      </div>
    );
  }

  if (rallies.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">Aucun rallye trouvé. Commencez par ajouter un rallye.</p>
        </CardContent>
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
              <TableHead>Dates</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Inscription</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rallies.map((rally) => (
              <TableRow key={rally.id}>
                <TableCell className="font-medium">{rally.name}</TableCell>
                <TableCell>{rally.location}</TableCell>
                <TableCell>
                  {formatDate(rally.start_date)} au {formatDate(rally.end_date)}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(rally.status)}`}
                  >
                    {getStatusLabel(rally.status)}
                  </span>
                </TableCell>
                <TableCell>
                  {rally.registration_open ? (
                    <span className="text-green-600 font-medium">Ouvertes</span>
                  ) : (
                    <span className="text-gray-500">Fermées</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(rally)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Cette action ne peut pas être annulée. Cela supprimera définitivement
                            le rallye "{rally.name}" et toutes ses épreuves.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(rally.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button
                      size="sm"
                      onClick={() => onViewStages(rally)}
                      className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-1"
                    >
                      <span>Épreuves</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
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

export default RallyList;
