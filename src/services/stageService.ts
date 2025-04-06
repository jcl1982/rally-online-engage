
import { supabase } from "@/integrations/supabase/client";
import { Stage, StageFormValues } from "@/types/stage.types";

export const fetchStages = async (): Promise<Stage[]> => {
  try {
    const { data, error } = await supabase
      .from("rally_stages")
      .select("*")
      .order("name");

    if (error) {
      console.error("Erreur lors de la récupération des épreuves:", error);
      throw error;
    }

    return data as Stage[];
  } catch (error) {
    console.error("Exception lors de la récupération des épreuves:", error);
    throw error;
  }
};

export const fetchDefaultRally = async () => {
  try {
    const { data, error } = await supabase
      .from("rallies")
      .select("id")
      .limit(1)
      .single();

    if (error) {
      console.error("Erreur lors de la récupération du rallye par défaut:", error);
      return { id: "00000000-0000-0000-0000-000000000000" }; // ID par défaut au format UUID
    }

    return data;
  } catch (error) {
    console.error("Exception lors de la récupération du rallye par défaut:", error);
    return { id: "00000000-0000-0000-0000-000000000000" };
  }
};

export const addStage = async (stageData: StageFormValues & { rally_id: string }) => {
  console.log("Données soumises pour l'ajout:", stageData);
  
  // S'assurer que les données ont les types corrects pour la base de données
  const preparedData = {
    ...stageData,
    distance: Number(stageData.distance),
    start_latitude: stageData.start_latitude ? Number(stageData.start_latitude) : null,
    start_longitude: stageData.start_longitude ? Number(stageData.start_longitude) : null,
    finish_latitude: stageData.finish_latitude ? Number(stageData.finish_latitude) : null,
    finish_longitude: stageData.finish_longitude ? Number(stageData.finish_longitude) : null,
    map_zoom_level: stageData.map_zoom_level ? Number(stageData.map_zoom_level) : null,
    max_participants: stageData.max_participants ? Number(stageData.max_participants) : 100,
  };
  
  const { data, error } = await supabase
    .from("rally_stages")
    .insert(preparedData)
    .select()
    .single();

  if (error) {
    console.error("Erreur lors de l'insertion:", error);
    throw error;
  }
  
  return data;
};

export const updateStage = async ({ id, ...stageData }: Stage) => {
  console.log("Données soumises pour la mise à jour:", { id, ...stageData });
  
  const { error } = await supabase
    .from("rally_stages")
    .update(stageData)
    .eq("id", id);

  if (error) {
    console.error("Erreur lors de la mise à jour:", error);
    throw error;
  }
  
  return { id, ...stageData };
};

export const deleteStage = async (id: string) => {
  const { error } = await supabase
    .from("rally_stages")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return id;
};
