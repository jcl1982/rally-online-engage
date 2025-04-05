
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PlusCircle, Edit, Trash2, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { StageForm } from "./stage/StageForm";
import { Stage } from "@/hooks/useStageForm";

export const StageManagement = () => {
  const [isAddingStage, setIsAddingStage] = useState(false);
  const [editingStage, setEditingStage] = useState<Stage | null>(null);
  const queryClient = useQueryClient();

  // Récupération d'un ID de rallye par défaut pour tester
  // Dans une application complète, ce serait récupéré à partir de l'URL ou d'un contexte
  const { data: defaultRally } = useQuery({
    queryKey: ["default-rally"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rallies")
        .select("id")
        .limit(1)
        .single();

      if (error) {
        console.error("Erreur lors de la récupération du rallye par défaut:", error);
        return { id: null };
      }

      return data;
    },
  });

  // Récupération des épreuves
  const { data: stages, isLoading } = useQuery({
    queryKey: ["stages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rally_stages")
        .select("*")
        .order("name");

      if (error) {
        toast.error("Erreur lors de la récupération des épreuves");
        throw error;
      }

      return data as Stage[];
    },
  });

  // Suppression d'une épreuve
  const deleteStageMutation = useMutation({
    mutationFn: async (stageId: string) => {
      const { error } = await supabase
        .from("rally_stages")
        .delete()
        .eq("id", stageId);

      if (error) throw error;
      return stageId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stages"] });
      toast.success("Épreuve supprimée avec succès");
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression de l'épreuve");
    },
  });

  const handleDeleteStage = (stageId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette épreuve ?")) {
      deleteStageMutation.mutate(stageId);
    }
  };

  const handleCloseForm = () => {
    setIsAddingStage(false);
    setEditingStage(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Épreuves Spéciales</h2>
        <Button 
          onClick={() => setIsAddingStage(true)}
          className="bg-rally-red hover:bg-red-700"
        >
          <PlusCircle size={16} className="mr-2" /> Ajouter une épreuve
        </Button>
      </div>

      {(isAddingStage || editingStage) && (
        <Card className="p-4 mb-6">
          <StageForm 
            initialData={editingStage || undefined}
            onClose={handleCloseForm}
            defaultRallyId={defaultRally?.id || ""}
          />
        </Card>
      )}

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red"></div>
        </div>
      ) : !stages || stages.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500 mb-4">Aucune épreuve trouvée</p>
          {!isAddingStage && (
            <Button 
              onClick={() => setIsAddingStage(true)}
              className="bg-rally-red hover:bg-red-700"
            >
              <PlusCircle size={16} className="mr-2" /> Ajouter votre première épreuve
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stages.map((stage) => (
            <Card key={stage.id} className="overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{stage.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    stage.status === 'active' ? 'bg-green-100 text-green-800' : 
                    stage.status === 'planned' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {stage.status === 'active' ? 'Active' : 
                     stage.status === 'planned' ? 'Planifiée' : 'Terminée'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{stage.location}</p>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <Flag size={14} className="mr-1" />
                  <span>{stage.distance} km</span>
                </div>
                {stage.description && (
                  <p className="text-sm text-gray-700 mb-4 line-clamp-2">{stage.description}</p>
                )}
              </div>
              <div className="bg-gray-50 p-3 border-t flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setEditingStage(stage)}
                >
                  <Edit size={14} className="mr-1" /> Modifier
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => handleDeleteStage(stage.id)}
                >
                  <Trash2 size={14} className="mr-1" /> Supprimer
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
