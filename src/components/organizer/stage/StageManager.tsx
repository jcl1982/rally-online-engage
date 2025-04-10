
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { StageModal } from "./StageModal";
import { StageTable } from "./StageTable";
import { useStagesManager } from "@/hooks/useStagesManager";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Stage {
  id: string;
  name: string;
  location: string;
  distance: number;
  status: string;
  rally_id: string;
}

interface StageManagerProps {
  rallyId?: string;
}

export const StageManager = ({ rallyId }: StageManagerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStage, setEditingStage] = useState<Stage | null>(null);
  const [selectedRallyId, setSelectedRallyId] = useState<string | undefined>(rallyId);
  const [availableRallies, setAvailableRallies] = useState<{ id: string; name: string }[]>([]);
  const { stages, isLoading, fetchStages, createStage, updateStage, deleteStage } = useStagesManager(selectedRallyId);

  // Récupération des rallyes disponibles si aucun n'est fourni
  useEffect(() => {
    const fetchRallies = async () => {
      try {
        const { data, error } = await supabase
          .from('rallies')
          .select('id, name')
          .order('name', { ascending: true });
          
        if (error) {
          console.error("Erreur lors du chargement des rallyes:", error);
          toast.error("Erreur lors du chargement des rallyes");
          return;
        }
        
        if (data && data.length > 0) {
          setAvailableRallies(data);
          if (!selectedRallyId && data.length > 0) {
            setSelectedRallyId(data[0].id);
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement des rallyes:", error);
        toast.error("Erreur lors du chargement des rallyes");
      }
    };
      
    fetchRallies();
  }, [rallyId, selectedRallyId]);

  // Charger les épreuves quand le rally change
  useEffect(() => {
    if (selectedRallyId) {
      fetchStages();
    }
  }, [selectedRallyId, fetchStages]);

  const handleRallyChange = (rallyId: string) => {
    setSelectedRallyId(rallyId);
  };

  const handleAddStage = () => {
    setEditingStage(null);
    setIsModalOpen(true);
  };

  const handleEditStage = (stage: Stage) => {
    setEditingStage(stage);
    setIsModalOpen(true);
  };

  const handleDeleteStage = async (stageId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette épreuve ?")) {
      return;
    }
    
    try {
      await deleteStage(stageId);
      toast.success("Épreuve supprimée avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'épreuve:", error);
      toast.error("Erreur lors de la suppression de l'épreuve");
    }
  };

  const handleSaveStage = async (stageData: any) => {
    try {
      // S'assurer que le rally_id est défini
      if (!stageData.rally_id) {
        toast.error("Aucun rallye sélectionné");
        return;
      }
      
      if (editingStage) {
        await updateStage(editingStage.id, stageData);
        toast.success("Épreuve mise à jour avec succès");
      } else {
        await createStage(stageData);
        toast.success("Épreuve créée avec succès");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'épreuve:", error);
      toast.error("Erreur lors de la sauvegarde de l'épreuve");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des Épreuves</h2>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span>Rallye :</span>
            <Select 
              value={selectedRallyId || ""}
              onValueChange={handleRallyChange}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sélectionner un rallye" />
              </SelectTrigger>
              <SelectContent>
                {availableRallies.map((rally) => (
                  <SelectItem key={rally.id} value={rally.id}>
                    {rally.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button
            onClick={handleAddStage}
            className="bg-rally-red hover:bg-red-700 flex items-center gap-2"
            disabled={!selectedRallyId}
          >
            <Plus size={18} />
            Ajouter une épreuve
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red"></div>
        </div>
      ) : (
        <StageTable 
          stages={stages} 
          onEdit={handleEditStage} 
          onDelete={handleDeleteStage}
        />
      )}

      <StageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveStage}
        stage={editingStage}
        rallyId={selectedRallyId || ""}
      />
    </div>
  );
};
