
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  RallyStage, 
  StageFormValues, 
  TimingPoint,
  TimingPointFormValues,
  validateStageStatus
} from "@/schemas/stageSchema";

export const useStageDetails = (stageId: string) => {
  const [stage, setStage] = useState<RallyStage | null>(null);
  const [timingPoints, setTimingPoints] = useState<TimingPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStageDetails = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("rally_stages")
        .select("*")
        .eq("id", stageId)
        .single();

      if (error) throw error;
      
      // Vérifie que le statut correspond bien au type attendu
      const typedData = {
        ...data,
        status: validateStageStatus(data.status)
      } as RallyStage;
      
      setStage(typedData);
    } catch (error: any) {
      console.error("Erreur lors de la récupération des détails de l'épreuve:", error);
      toast.error("Impossible de charger les détails de l'épreuve");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTimingPoints = async () => {
    try {
      // Utiliser la méthode rpc pour contourner les problèmes de typage
      const { data, error } = await supabase
        .rpc('get_timing_points', { stage_id_param: stageId });

      if (error) throw error;
      
      setTimingPoints(data as unknown as TimingPoint[]);
    } catch (error: any) {
      console.error("Erreur lors de la récupération des points de chronométrage:", error);
      toast.error("Impossible de charger les points de chronométrage");
      setTimingPoints([]);
    }
  };

  const updateStage = async (values: StageFormValues) => {
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
          start_latitude: values.start_latitude || null,
          start_longitude: values.start_longitude || null,
          finish_latitude: values.finish_latitude || null,
          finish_longitude: values.finish_longitude || null,
          map_zoom_level: values.map_zoom_level || 13,
        })
        .eq("id", stageId);

      if (error) throw error;

      toast.success("Épreuve mise à jour avec succès");
      fetchStageDetails();
      return true;
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour de l'épreuve:", error);
      toast.error("Impossible de mettre à jour l'épreuve");
      return false;
    }
  };

  const addTimingPoint = async (values: TimingPointFormValues) => {
    try {
      // Utiliser la méthode rpc pour contourner les problèmes de typage
      const { error } = await supabase.rpc('add_timing_point', {
        p_stage_id: stageId,
        p_name: values.name,
        p_description: values.description || '',
        p_latitude: values.latitude,
        p_longitude: values.longitude,
        p_point_type: values.point_type,
        p_order_index: values.order_index
      });

      if (error) throw error;

      toast.success("Point de chronométrage ajouté avec succès");
      fetchTimingPoints();
      return true;
    } catch (error: any) {
      console.error("Erreur lors de l'ajout du point de chronométrage:", error);
      toast.error("Impossible d'ajouter le point de chronométrage");
      return false;
    }
  };

  const updateTimingPoint = async (id: string, values: TimingPointFormValues) => {
    try {
      // Utiliser la méthode rpc pour contourner les problèmes de typage
      const { error } = await supabase.rpc('update_timing_point', {
        p_id: id,
        p_name: values.name,
        p_description: values.description || '',
        p_latitude: values.latitude,
        p_longitude: values.longitude,
        p_point_type: values.point_type,
        p_order_index: values.order_index
      });

      if (error) throw error;

      toast.success("Point de chronométrage mis à jour avec succès");
      fetchTimingPoints();
      return true;
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour du point de chronométrage:", error);
      toast.error("Impossible de mettre à jour le point de chronométrage");
      return false;
    }
  };

  const deleteTimingPoint = async (id: string) => {
    try {
      // Utiliser la méthode rpc pour contourner les problèmes de typage
      const { error } = await supabase.rpc('delete_timing_point', { p_id: id });

      if (error) throw error;

      toast.success("Point de chronométrage supprimé avec succès");
      fetchTimingPoints();
    } catch (error: any) {
      console.error("Erreur lors de la suppression du point de chronométrage:", error);
      toast.error("Impossible de supprimer le point de chronométrage");
    }
  };

  useEffect(() => {
    if (stageId) {
      fetchStageDetails();
      fetchTimingPoints();
    }
  }, [stageId]);

  return {
    stage,
    timingPoints,
    isLoading,
    updateStage,
    addTimingPoint,
    updateTimingPoint,
    deleteTimingPoint,
  };
};
