
import { supabase } from "@/integrations/supabase/client";
import { Stage, StageFormValues } from "@/types/stage.types";

export const fetchStages = async (): Promise<Stage[]> => {
  const { data, error } = await supabase.from("rally_stages").select("*");
  
  if (error) {
    console.error("Error fetching stages:", error);
    throw new Error("Failed to fetch stages");
  }
  
  return data as Stage[];
};

export const fetchStagesByRallyId = async (rallyId: string): Promise<Stage[]> => {
  const { data, error } = await supabase
    .from("rally_stages")
    .select("*")
    .eq("rally_id", rallyId);
  
  if (error) {
    console.error("Error fetching stages by rally ID:", error);
    throw new Error(`Failed to fetch stages for rally ${rallyId}`);
  }
  
  return data as Stage[];
};

export const fetchStage = async (stageId: string): Promise<Stage> => {
  const { data, error } = await supabase
    .from("rally_stages")
    .select("*")
    .eq("id", stageId)
    .single();
  
  if (error) {
    console.error("Error fetching stage:", error);
    throw new Error(`Failed to fetch stage ${stageId}`);
  }
  
  return data as Stage;
};

export const createStage = async (
  stageData: StageFormValues & { rally_id: string }
): Promise<Stage> => {
  // Ensure location is always defined
  if (!stageData.location) {
    stageData.location = "À déterminer";
  }
  
  // Convert number values
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
    console.error("Error creating stage:", error);
    throw new Error("Failed to create stage");
  }
  
  return data as Stage;
};

export const updateStage = async (stage: Stage): Promise<Stage> => {
  // Ensure location is always defined
  if (!stage.location) {
    stage.location = "À déterminer";
  }
  
  const { id, created_at, updated_at, ...stageData } = stage;
  
  const { data, error } = await supabase
    .from("rally_stages")
    .update(stageData)
    .eq("id", id)
    .select()
    .single();
  
  if (error) {
    console.error("Error updating stage:", error);
    throw new Error("Failed to update stage");
  }
  
  return data as Stage;
};

export const deleteStage = async (stageId: string): Promise<void> => {
  const { error } = await supabase
    .from("rally_stages")
    .delete()
    .eq("id", stageId);
  
  if (error) {
    console.error("Error deleting stage:", error);
    throw new Error("Failed to delete stage");
  }
};
