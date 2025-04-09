
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { StageFormValues } from '@/schemas/organizerStageSchema';

interface UseStageCrudProps {
  rallyId?: string;
  defaultRallyId?: string;
  fetchStages: (rallyId: string) => Promise<void>;
}

export const useStageCrud = ({ rallyId, defaultRallyId, fetchStages }: UseStageCrudProps) => {
  
  // Fonction pour gérer la soumission du formulaire (ajout ou modification)
  const handleSubmit = async (data: StageFormValues, currentStageId?: string) => {
    const rallyIdToUse = rallyId || defaultRallyId;
    
    if (!rallyIdToUse) {
      toast.error("Aucun rallye sélectionné");
      return;
    }

    try {
      if (currentStageId) {
        // Mise à jour d'une étape existante
        const { error } = await supabase
          .from('rally_stages')
          .update({ 
            name: data.name,
            location: data.location,
            description: data.description,
            distance: data.distance,
            status: data.status,
            start_time: data.start_time,
            difficulty_level: data.difficulty_level,
            route_type: data.route_type,
            map_zoom_level: data.map_zoom_level,
            max_participants: data.max_participants,
            stage_order: data.stage_order,
            start_latitude: data.start_latitude,
            start_longitude: data.start_longitude,
            finish_latitude: data.finish_latitude,
            finish_longitude: data.finish_longitude,
          })
          .eq('id', currentStageId);

        if (error) throw error;
        toast.success("Épreuve mise à jour avec succès");
      } else {
        // Création d'une nouvelle étape
        const { error } = await supabase
          .from('rally_stages')
          .insert([{ 
            name: data.name,
            location: data.location,
            description: data.description,
            distance: data.distance,
            rally_id: rallyIdToUse,
            status: data.status,
            start_time: data.start_time,
            difficulty_level: data.difficulty_level,
            route_type: data.route_type,
            map_zoom_level: data.map_zoom_level,
            max_participants: data.max_participants,
            stage_order: data.stage_order,
            start_latitude: data.start_latitude,
            start_longitude: data.start_longitude,
            finish_latitude: data.finish_latitude,
            finish_longitude: data.finish_longitude,
          }]);

        if (error) throw error;
        toast.success("Épreuve ajoutée avec succès");
      }

      // Rafraîchir la liste des étapes après modification
      fetchStages(rallyIdToUse);
      return true;
    } catch (error: any) {
      console.error("Error saving stage:", error);
      toast.error(`Erreur: ${error.message}`);
      return false;
    }
  };

  // Fonction pour supprimer une étape
  const deleteStage = async (stageId: string) => {
    const rallyIdToUse = rallyId || defaultRallyId;
    
    if (!rallyIdToUse) {
      toast.error("Aucun rallye sélectionné");
      return;
    }

    if (!confirm("Êtes-vous sûr de vouloir supprimer cette épreuve ?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from('rally_stages')
        .delete()
        .eq('id', stageId);

      if (error) throw error;
      
      toast.success("Épreuve supprimée avec succès");
      fetchStages(rallyIdToUse);
    } catch (error: any) {
      console.error("Error deleting stage:", error);
      toast.error(`Erreur: ${error.message}`);
    }
  };

  return {
    handleSubmit,
    deleteStage
  };
};
