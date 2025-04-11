
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Stage } from "@/hooks/useStageForm";

export const useStagesManager = (rallyId?: string) => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStages = useCallback(async () => {
    if (!rallyId) return;
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('rally_stages')
        .select('*')
        .eq('rally_id', rallyId)
        .order('stage_order', { ascending: true })
        .order('name', { ascending: true });
        
      if (error) {
        console.error("Erreur lors du chargement des épreuves:", error);
        throw error;
      }
      
      // Ensure the status field conforms to the expected type
      const typedStages = data?.map(stage => ({
        ...stage,
        status: stage.status as "active" | "planned" | "cancelled" | "completed"
      })) || [];
      
      setStages(typedStages);
    } catch (error: any) {
      console.error("Erreur complète:", error);
      toast.error("Erreur lors du chargement des épreuves");
    } finally {
      setIsLoading(false);
    }
  }, [rallyId]);

  const createStage = async (stageData: Omit<Stage, 'id'>) => {
    if (!stageData.rally_id) {
      console.error("Erreur: rally_id manquant dans les données de l'épreuve");
      throw new Error("rally_id est requis pour créer une épreuve");
    }
    
    try {
      console.log("Données envoyées pour création:", stageData);
      
      const { data, error } = await supabase
        .from('rally_stages')
        .insert(stageData)
        .select()
        .single();
        
      if (error) {
        console.error("Erreur lors de la création de l'épreuve:", error);
        throw error;
      }
      
      console.log("Épreuve créée avec succès:", data);
      setStages(prevStages => [...prevStages, data as Stage]);
      return data;
    } catch (error: any) {
      console.error("Erreur complète:", error);
      throw error;
    }
  };

  const updateStage = async (stageId: string, stageData: Partial<Stage>) => {
    try {
      console.log("Mise à jour de l'épreuve:", stageId, stageData);
      
      const { data, error } = await supabase
        .from('rally_stages')
        .update(stageData)
        .eq('id', stageId)
        .select()
        .single();
        
      if (error) {
        console.error("Erreur lors de la mise à jour de l'épreuve:", error);
        throw error;
      }
      
      console.log("Épreuve mise à jour avec succès:", data);
      setStages(prevStages => 
        prevStages.map(stage => 
          stage.id === stageId ? { ...stage, ...data } as Stage : stage
        )
      );
      return data;
    } catch (error: any) {
      console.error("Erreur complète:", error);
      throw error;
    }
  };

  const deleteStage = async (stageId: string) => {
    try {
      const { error } = await supabase
        .from('rally_stages')
        .delete()
        .eq('id', stageId);
        
      if (error) {
        console.error("Erreur lors de la suppression de l'épreuve:", error);
        throw error;
      }
      
      setStages(prevStages => 
        prevStages.filter(stage => stage.id !== stageId)
      );
      return true;
    } catch (error: any) {
      console.error("Erreur complète:", error);
      throw error;
    }
  };

  return {
    stages,
    isLoading,
    fetchStages,
    createStage,
    updateStage,
    deleteStage
  };
};
