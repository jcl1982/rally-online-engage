
import { TimingPoint, getTimingPointTypeLabel } from "@/schemas/stageSchema";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MapPin } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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

interface TimingPointListProps {
  timingPoints: TimingPoint[];
  isLoading: boolean;
  onEdit: (point: TimingPoint) => void;
  onDelete: (id: string) => void;
}

const TimingPointList = ({ 
  timingPoints, 
  isLoading, 
  onEdit, 
  onDelete 
}: TimingPointListProps) => {
  const formatCoordinates = (lat: number, lng: number) => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red"></div>
      </div>
    );
  }

  if (timingPoints.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Aucun point de chronométrage</CardTitle>
          <CardDescription>
            Ajoutez des points de chronométrage pour cette épreuve en utilisant le bouton ci-dessus.
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
              <TableHead>Ordre</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Coordonnées</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {timingPoints
              .sort((a, b) => a.order_index - b.order_index)
              .map((point) => (
                <TableRow key={point.id}>
                  <TableCell>{point.order_index}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className={`w-3 h-3 rounded-full inline-block ${
                        point.point_type === 'start' ? 'bg-green-500' :
                        point.point_type === 'split' ? 'bg-blue-500' :
                        'bg-red-500'
                      }`}></span>
                      <span>{getTimingPointTypeLabel(point.point_type)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{point.name}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {point.description || "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        {formatCoordinates(Number(point.latitude), Number(point.longitude))}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(point)}
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
                              définitivement le point "{point.name}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDelete(point.id)}
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

export default TimingPointList;
