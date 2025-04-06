
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export interface Stage {
  id: string;
  name: string;
  location: string;
  distance: number;
  status: 'planned' | 'active' | 'completed';
  description?: string;
  rally_id: string;
}

export const useStagesManager = () => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Charger les épreuves
  const loadStages = async () => {
    try {
      setIsLoading(true);
      
      // Pour l'instant, on charge toutes les épreuves, plus tard on pourra filtrer par rallye
      const { data, error } = await supabase
        .from('rally_stages')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setStages(data || []);
    } catch (error: any) {
      console.error("Erreur lors du chargement des épreuves:", error.message);
      toast.error("Impossible de charger les épreuves");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Créer ou mettre à jour une épreuve
  const saveStage = async (stage: Partial<Stage>): Promise<boolean> => {
    try {
      setIsSubmitting(true);
      
      // S'il y a un ID, on met à jour, sinon on crée
      if (stage.id) {
        // Update existing stage
        const { error } = await supabase
          .from('rally_stages')
          .update({
            name: stage.name,
            location: stage.location,
            distance: stage.distance,
            status: stage.status,
            description: stage.description,
            rally_id: stage.rally_id,
          })
          .eq('id', stage.id);
          
        if (error) throw error;
        toast.success("Épreuve mise à jour avec succès");
      } else {
        // Create new stage with all required fields
        const newStage = {
          name: stage.name || "",
          location: stage.location || "",
          distance: stage.distance || 0,
          status: stage.status || 'planned',
          description: stage.description,
          rally_id: stage.rally_id || "default-rally-id", // Idéalement, sélectionner un rallye existant
        };
        
        const { error } = await supabase
          .from('rally_stages')
          .insert([newStage]);
          
        if (error) throw error;
        toast.success("Épreuve créée avec succès");
      }
      
      // Recharger les épreuves
      await loadStages();
      return true;
    } catch (error: any) {
      console.error("Erreur lors de la sauvegarde de l'épreuve:", error.message);
      toast.error("Erreur lors de la sauvegarde de l'épreuve");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Supprimer une épreuve
  const deleteStage = async (stageId: string): Promise<boolean> => {
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('rally_stages')
        .delete()
        .eq('id', stageId);
        
      if (error) throw error;
      
      // Mettre à jour la liste locale
      setStages(stages.filter(stage => stage.id !== stageId));
      toast.success("Épreuve supprimée avec succès");
      return true;
    } catch (error: any) {
      console.error("Erreur lors de la suppression de l'épreuve:", error.message);
      toast.error("Erreur lors de la suppression de l'épreuve");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Charger les épreuves au montage du composant
  useEffect(() => {
    loadStages();
  }, []);
  
  return {
    stages,
    isLoading,
    isSubmitting,
    loadStages,
    saveStage,
    deleteStage
  };
};
