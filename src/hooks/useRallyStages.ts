
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  RallyStage, 
  Rally, 
  StageFormValues, 
  validateStageStatus 
} from "@/schemas/stageSchema";

export const useRallyStages = (rallyId: string) => {
  const [stages, setStages] = useState<RallyStage[]>([]);
  const [rally, setRally] = useState<Rally | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const addStage = async (values: StageFormValues) => {
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
      fetchStages();
      return true;
    } catch (error: any) {
      console.error("Erreur lors de l'ajout de l'épreuve:", error);
      toast.error("Impossible d'ajouter l'épreuve");
      return false;
    }
  };

  const updateStage = async (id: string, values: StageFormValues) => {
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
        .eq("id", id);

      if (error) throw error;

      toast.success("Épreuve mise à jour avec succès");
      fetchStages();
      return true;
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour de l'épreuve:", error);
      toast.error("Impossible de mettre à jour l'épreuve");
      return false;
    }
  };

  const deleteStage = async (id: string) => {
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

  useEffect(() => {
    fetchRallyDetails();
    fetchStages();
  }, [rallyId]);

  return {
    stages,
    rally,
    isLoading,
    addStage,
    updateStage,
    deleteStage,
  };
};
