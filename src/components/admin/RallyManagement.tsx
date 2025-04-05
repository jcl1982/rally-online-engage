
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { Rally, RallyFormValues, validateRallyStatus } from "@/schemas/rallySchema";
import { Button } from "@/components/ui/button";
import {
  Card,
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
} from "@/components/ui/dialog";
import RallyForm from "@/components/admin/rally/RallyForm";
import RallyList from "@/components/admin/rally/RallyList";

interface RallyManagementProps {
  onRallySelect: (rallyId: string | null) => void;
}

const RallyManagement = ({ onRallySelect }: RallyManagementProps) => {
  const [rallies, setRallies] = useState<Rally[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRally, setSelectedRally] = useState<Rally | null>(null);

  useEffect(() => {
    fetchRallies();
  }, []);

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

  const handleAddRally = async (values: RallyFormValues) => {
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
      fetchRallies();
    } catch (error: any) {
      console.error("Erreur lors de l'ajout du rallye:", error);
      toast.error("Impossible d'ajouter le rallye");
    }
  };

  const handleEditRally = async (values: RallyFormValues) => {
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

  const handleEditClick = (rally: Rally) => {
    setSelectedRally(rally);
    setIsEditDialogOpen(true);
  };

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
            <RallyForm 
              onSubmit={handleAddRally}
              submitLabel="Ajouter le rallye"
            />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading || rallies.length > 0 ? (
        <RallyList
          rallies={rallies}
          isLoading={isLoading}
          onEdit={handleEditClick}
          onDelete={handleDeleteRally}
          onViewStages={handleViewStages}
        />
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
          {selectedRally && (
            <RallyForm
              initialData={{
                name: selectedRally.name,
                location: selectedRally.location,
                description: selectedRally.description || undefined,
                start_date: new Date(selectedRally.start_date),
                end_date: new Date(selectedRally.end_date),
                registration_open: selectedRally.registration_open,
                registration_deadline: selectedRally.registration_deadline 
                  ? new Date(selectedRally.registration_deadline) 
                  : undefined,
                status: selectedRally.status,
              }}
              onSubmit={handleEditRally}
              submitLabel="Enregistrer les modifications"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RallyManagement;
