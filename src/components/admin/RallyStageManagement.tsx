
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const stageStatusEnum = z.enum(["planned", "completed", "cancelled"]);
type StageStatus = z.infer<typeof stageStatusEnum>;

const stageSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  location: z.string().min(3, "La localisation doit contenir au moins 3 caractères"),
  distance: z.coerce.number().min(0.1, "La distance doit être supérieure à 0"),
  description: z.string().optional(),
  start_time: z.string().optional(),
  status: stageStatusEnum.default("planned"),
});

type StageFormValues = z.infer<typeof stageSchema>;

interface RallyStage {
  id: string;
  rally_id: string;
  name: string;
  location: string;
  description: string | null;
  distance: number;
  start_time: string | null;
  status: StageStatus;
  created_at: string;
  updated_at: string;
}

interface Rally {
  id: string;
  name: string;
}

interface RallyStageManagementProps {
  rallyId: string;
}

const RallyStageManagement = ({ rallyId }: RallyStageManagementProps) => {
  const [stages, setStages] = useState<RallyStage[]>([]);
  const [rally, setRally] = useState<Rally | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState<RallyStage | null>(null);

  const form = useForm<StageFormValues>({
    resolver: zodResolver(stageSchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
      distance: 0,
      start_time: "",
      status: "planned",
    },
  });

  const editForm = useForm<StageFormValues>({
    resolver: zodResolver(stageSchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
      distance: 0,
      start_time: "",
      status: "planned",
    },
  });

  useEffect(() => {
    fetchRallyDetails();
    fetchStages();
  }, [rallyId]);

  useEffect(() => {
    if (selectedStage && isEditDialogOpen) {
      editForm.reset({
        name: selectedStage.name,
        location: selectedStage.location,
        description: selectedStage.description || "",
        distance: selectedStage.distance,
        start_time: selectedStage.start_time || "",
        status: selectedStage.status,
      });
    }
  }, [selectedStage, isEditDialogOpen, editForm]);

  const fetchRallyDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("rallies")
        .select("id, name")
        .eq("id", rallyId)
        .single();

      if (error) throw error;
      setRally(data);
    } catch (error: any) {
      console.error("Erreur lors de la récupération du rallye:", error);
      toast.error("Impossible de charger les détails du rallye");
    }
  };

  const fetchStages = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("rally_stages")
        .select("*")
        .eq("rally_id", rallyId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      
      // Vérifie que le status correspond bien au type attendu
      const typedData = data.map(stage => ({
        ...stage,
        status: validateStageStatus(stage.status)
      })) as RallyStage[];
      
      setStages(typedData);
    } catch (error: any) {
      console.error("Erreur lors de la récupération des épreuves:", error);
      toast.error("Impossible de charger les épreuves");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fonction pour valider que le statut est conforme à notre enum
  const validateStageStatus = (status: string): StageStatus => {
    if (status === "planned" || status === "completed" || status === "cancelled") {
      return status;
    }
    return "planned"; // Valeur par défaut
  };

  const onSubmit = async (values: StageFormValues) => {
    try {
      const { error } = await supabase.from("rally_stages").insert([
        {
          rally_id: rallyId,
          name: values.name,
          location: values.location,
          description: values.description,
          distance: values.distance,
          start_time: values.start_time ? new Date(values.start_time).toISOString() : null,
          status: values.status,
        },
      ]);

      if (error) throw error;

      toast.success("Épreuve ajoutée avec succès");
      setIsAddDialogOpen(false);
      form.reset();
      fetchStages();
    } catch (error: any) {
      console.error("Erreur lors de l'ajout de l'épreuve:", error);
      toast.error("Impossible d'ajouter l'épreuve");
    }
  };

  const onEdit = async (values: StageFormValues) => {
    if (!selectedStage) return;

    try {
      const { error } = await supabase
        .from("rally_stages")
        .update({
          name: values.name,
          location: values.location,
          description: values.description,
          distance: values.distance,
          start_time: values.start_time ? new Date(values.start_time).toISOString() : null,
          status: values.status,
        })
        .eq("id", selectedStage.id);

      if (error) throw error;

      toast.success("Épreuve mise à jour avec succès");
      setIsEditDialogOpen(false);
      setSelectedStage(null);
      fetchStages();
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour de l'épreuve:", error);
      toast.error("Impossible de mettre à jour l'épreuve");
    }
  };

  const handleDeleteStage = async (id: string) => {
    try {
      const { error } = await supabase.from("rally_stages").delete().eq("id", id);

      if (error) throw error;

      toast.success("Épreuve supprimée avec succès");
      fetchStages();
    } catch (error: any) {
      console.error("Erreur lors de la suppression de l'épreuve:", error);
      toast.error("Impossible de supprimer l'épreuve");
    }
  };

  const formatDateTime = (dateTimeString: string | null) => {
    if (!dateTimeString) return "Non définie";
    return format(new Date(dateTimeString), "dd/MM/yyyy HH:mm", { locale: fr });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "planned":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "planned":
        return "Planifiée";
      case "completed":
        return "Terminée";
      case "cancelled":
        return "Annulée";
      default:
        return status;
    }
  };

  const statusOptions = [
    { value: "planned", label: "Planifiée" },
    { value: "completed", label: "Terminée" },
    { value: "cancelled", label: "Annulée" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Épreuves du {rally?.name || "rallye"}
          </h2>
          <p className="text-gray-500">Gérez les épreuves spéciales de ce rallye</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-rally-red hover:bg-red-700">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une épreuve
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle épreuve</DialogTitle>
              <DialogDescription>
                Remplissez les détails de l'épreuve spéciale
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de l'épreuve</FormLabel>
                      <FormControl>
                        <Input placeholder="ES1 - Col de Turini" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localisation</FormLabel>
                      <FormControl>
                        <Input placeholder="Col de Turini, France" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="distance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distance (km)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="15.5"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description de l'épreuve..."
                          className="resize-none"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="start_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date et heure de début</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut</FormLabel>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Annuler
                    </Button>
                  </DialogClose>
                  <Button type="submit" className="bg-rally-red hover:bg-red-700">
                    Ajouter l'épreuve
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red"></div>
        </div>
      ) : stages.length > 0 ? (
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
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedStage(stage);
                            setIsEditDialogOpen(true);
                          }}
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
                                onClick={() => handleDeleteStage(stage.id)}
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
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Aucune épreuve trouvée</CardTitle>
            <CardDescription>
              Commencez par ajouter une épreuve en utilisant le bouton ci-dessus.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l'épreuve</DialogTitle>
            <DialogDescription>
              Modifiez les détails de l'épreuve spéciale
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEdit)} className="space-y-4 py-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l'épreuve</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localisation</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="distance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distance (km)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="start_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date et heure de début</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut</FormLabel>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Annuler
                  </Button>
                </DialogClose>
                <Button type="submit" className="bg-rally-red hover:bg-red-700">
                  Enregistrer les modifications
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RallyStageManagement;
