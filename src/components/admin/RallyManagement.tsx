
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Plus, Edit, Trash2, ChevronRight } from "lucide-react";
import { toast } from "sonner";
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

const rallyStatusEnum = z.enum(["upcoming", "active", "completed", "cancelled"]);
type RallyStatus = z.infer<typeof rallyStatusEnum>;

const rallySchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  location: z.string().min(3, "La localisation doit contenir au moins 3 caractères"),
  description: z.string().optional(),
  start_date: z.date({
    required_error: "La date de début est requise",
  }),
  end_date: z.date({
    required_error: "La date de fin est requise",
  }),
  registration_open: z.boolean().default(false),
  registration_deadline: z.date().optional(),
  status: rallyStatusEnum.default("upcoming"),
});

type RallyFormValues = z.infer<typeof rallySchema>;

interface Rally {
  id: string;
  name: string;
  location: string;
  description: string | null;
  start_date: string;
  end_date: string;
  registration_open: boolean;
  registration_deadline: string | null;
  status: RallyStatus;
  created_at: string;
  updated_at: string;
}

interface RallyManagementProps {
  onRallySelect: (rallyId: string | null) => void;
}

const RallyManagement = ({ onRallySelect }: RallyManagementProps) => {
  const [rallies, setRallies] = useState<Rally[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRally, setSelectedRally] = useState<Rally | null>(null);

  const form = useForm<RallyFormValues>({
    resolver: zodResolver(rallySchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
      start_date: new Date(),
      end_date: new Date(),
      registration_open: false,
      status: "upcoming",
    },
  });

  const editForm = useForm<RallyFormValues>({
    resolver: zodResolver(rallySchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
      start_date: new Date(),
      end_date: new Date(),
      registration_open: false,
      status: "upcoming",
    },
  });

  useEffect(() => {
    fetchRallies();
  }, []);

  useEffect(() => {
    if (selectedRally && isEditDialogOpen) {
      editForm.reset({
        name: selectedRally.name,
        location: selectedRally.location,
        description: selectedRally.description || "",
        start_date: new Date(selectedRally.start_date),
        end_date: new Date(selectedRally.end_date),
        registration_open: selectedRally.registration_open,
        registration_deadline: selectedRally.registration_deadline 
          ? new Date(selectedRally.registration_deadline) 
          : undefined,
        status: selectedRally.status,
      });
    }
  }, [selectedRally, isEditDialogOpen, editForm]);

  const fetchRallies = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("rallies")
        .select("*")
        .order("start_date", { ascending: false });

      if (error) throw error;
      
      // Vérifie que le status correspond bien au type attendu
      const typedData = data.map(rally => ({
        ...rally,
        status: validateRallyStatus(rally.status)
      })) as Rally[];
      
      setRallies(typedData);
    } catch (error: any) {
      console.error("Erreur lors de la récupération des rallyes:", error);
      toast.error("Impossible de charger les rallyes");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fonction pour valider que le statut est conforme à notre enum
  const validateRallyStatus = (status: string): RallyStatus => {
    if (status === "upcoming" || status === "active" || 
        status === "completed" || status === "cancelled") {
      return status;
    }
    return "upcoming"; // Valeur par défaut
  };

  const onSubmit = async (values: RallyFormValues) => {
    try {
      const { error } = await supabase.from("rallies").insert([
        {
          name: values.name,
          location: values.location,
          description: values.description,
          start_date: values.start_date.toISOString().split("T")[0],
          end_date: values.end_date.toISOString().split("T")[0],
          registration_open: values.registration_open,
          registration_deadline: values.registration_deadline
            ? values.registration_deadline.toISOString().split("T")[0]
            : null,
          status: values.status,
        },
      ]);

      if (error) throw error;

      toast.success("Rallye ajouté avec succès");
      setIsAddDialogOpen(false);
      form.reset();
      fetchRallies();
    } catch (error: any) {
      console.error("Erreur lors de l'ajout du rallye:", error);
      toast.error("Impossible d'ajouter le rallye");
    }
  };

  const onEdit = async (values: RallyFormValues) => {
    if (!selectedRally) return;

    try {
      const { error } = await supabase
        .from("rallies")
        .update({
          name: values.name,
          location: values.location,
          description: values.description,
          start_date: values.start_date.toISOString().split("T")[0],
          end_date: values.end_date.toISOString().split("T")[0],
          registration_open: values.registration_open,
          registration_deadline: values.registration_deadline
            ? values.registration_deadline.toISOString().split("T")[0]
            : null,
          status: values.status,
        })
        .eq("id", selectedRally.id);

      if (error) throw error;

      toast.success("Rallye mis à jour avec succès");
      setIsEditDialogOpen(false);
      setSelectedRally(null);
      fetchRallies();
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour du rallye:", error);
      toast.error("Impossible de mettre à jour le rallye");
    }
  };

  const handleDeleteRally = async (id: string) => {
    try {
      const { error } = await supabase.from("rallies").delete().eq("id", id);

      if (error) throw error;

      toast.success("Rallye supprimé avec succès");
      fetchRallies();
      onRallySelect(null);
    } catch (error: any) {
      console.error("Erreur lors de la suppression du rallye:", error);
      toast.error("Impossible de supprimer le rallye");
    }
  };

  const handleViewStages = (rally: Rally) => {
    setSelectedRally(rally);
    onRallySelect(rally.id);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMMM yyyy", { locale: fr });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "upcoming":
        return "À venir";
      case "active":
        return "En cours";
      case "completed":
        return "Terminé";
      case "cancelled":
        return "Annulé";
      default:
        return status;
    }
  };

  const statusOptions = [
    { value: "upcoming", label: "À venir" },
    { value: "active", label: "En cours" },
    { value: "completed", label: "Terminé" },
    { value: "cancelled", label: "Annulé" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Rallyes</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-rally-red hover:bg-red-700">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un rallye
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau rallye</DialogTitle>
              <DialogDescription>
                Remplissez les détails du rallye ci-dessous
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom du rallye</FormLabel>
                        <FormControl>
                          <Input placeholder="Rallye du Mont-Blanc" {...field} />
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
                          <Input placeholder="Chamonix, France" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description du rallye..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date de début</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={
                                  "w-full pl-3 text-left font-normal"
                                }
                              >
                                {field.value ? (
                                  format(field.value, "dd MMMM yyyy", { locale: fr })
                                ) : (
                                  <span>Choisir une date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="end_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date de fin</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={
                                  "w-full pl-3 text-left font-normal"
                                }
                              >
                                {field.value ? (
                                  format(field.value, "dd MMMM yyyy", { locale: fr })
                                ) : (
                                  <span>Choisir une date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < form.getValues("start_date")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="registration_open"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Inscriptions ouvertes</FormLabel>
                          <FormDescription>
                            Autoriser les inscriptions à ce rallye
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registration_deadline"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date limite d'inscription</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={
                                  "w-full pl-3 text-left font-normal"
                                }
                                disabled={!form.getValues("registration_open")}
                              >
                                {field.value ? (
                                  format(field.value, "dd MMMM yyyy", { locale: fr })
                                ) : (
                                  <span>Choisir une date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value || undefined}
                              onSelect={field.onChange}
                              disabled={(date) => date > form.getValues("start_date")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                    <Button type="button" variant="outline">Annuler</Button>
                  </DialogClose>
                  <Button type="submit" className="bg-rally-red hover:bg-red-700">Ajouter le rallye</Button>
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
      ) : rallies.length > 0 ? (
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
                          onClick={() => {
                            setSelectedRally(rally);
                            setIsEditDialogOpen(true);
                          }}
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
                                onClick={() => handleDeleteRally(rally.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Button
                          size="sm"
                          onClick={() => handleViewStages(rally)}
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
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Aucun rallye trouvé</CardTitle>
            <CardDescription>
              Commencez par ajouter un rallye en utilisant le bouton ci-dessus.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Modifier le rallye</DialogTitle>
            <DialogDescription>
              Modifiez les détails du rallye
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEdit)} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du rallye</FormLabel>
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
              </div>
              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date de début</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={"w-full pl-3 text-left font-normal"}
                            >
                              {field.value ? (
                                format(field.value, "dd MMMM yyyy", { locale: fr })
                              ) : (
                                <span>Choisir une date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date de fin</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={"w-full pl-3 text-left font-normal"}
                            >
                              {field.value ? (
                                format(field.value, "dd MMMM yyyy", { locale: fr })
                              ) : (
                                <span>Choisir une date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < editForm.getValues("start_date")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="registration_open"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Inscriptions ouvertes</FormLabel>
                        <FormDescription>
                          Autoriser les inscriptions à ce rallye
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="registration_deadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date limite d'inscription</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={"w-full pl-3 text-left font-normal"}
                              disabled={!editForm.getValues("registration_open")}
                            >
                              {field.value ? (
                                format(field.value, "dd MMMM yyyy", { locale: fr })
                              ) : (
                                <span>Choisir une date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            disabled={(date) => date > editForm.getValues("start_date")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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

export default RallyManagement;
