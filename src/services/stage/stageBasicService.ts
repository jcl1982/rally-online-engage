
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { StageFormValues } from '@/types/stage.types';

// Service pour gérer les opérations CRUD de base sur les épreuves
export const stageBasicService = {
  // Récupérer toutes les épreuves d'un rallye
  async getStagesByRallyId(rallyId: string) {
    try {
      const { data, error } = await supabase
        .from('rally_stages')
        .select('*')
        .eq('rally_id', rallyId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching stages:', error);
      return { data: null, error: error.message };
    }
  },

  // Récupérer une épreuve par son ID
  async getStageById(stageId: string) {
    try {
      const { data, error } = await supabase
        .from('rally_stages')
        .select('*')
        .eq('id', stageId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching stage:', error);
      return { data: null, error: error.message };
    }
  },

  // Créer une nouvelle épreuve
  async createStage(stageData: StageFormValues & { rally_id: string }) {
    try {
      // Ensure required fields are provided
      if (!stageData.name || !stageData.location) {
        throw new Error("Le nom et l'emplacement sont requis");
      }

      const { data, error } = await supabase
        .from('rally_stages')
        .insert({
          name: stageData.name,
          location: stageData.location,
          description: stageData.description,
          distance: stageData.distance,
          difficulty_level: stageData.difficulty_level,
          route_type: stageData.route_type,
          start_time: stageData.start_time,
          start_latitude: stageData.start_latitude,
          start_longitude: stageData.start_longitude,
          finish_latitude: stageData.finish_latitude,
          finish_longitude: stageData.finish_longitude,
          map_zoom_level: stageData.map_zoom_level,
          max_participants: stageData.max_participants,
          stage_order: stageData.stage_order,
          status: stageData.status || 'planned',
          rally_id: stageData.rally_id,
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Error creating stage:', error);
      return { data: null, error: error.message };
    }
  },

  // Mettre à jour une épreuve existante
  async updateStage(stageId: string, stageData: StageFormValues) {
    try {
      // Ensure required fields are provided
      if (!stageData.name || !stageData.location) {
        throw new Error("Le nom et l'emplacement sont requis");
      }

      const { data, error } = await supabase
        .from('rally_stages')
        .update({
          name: stageData.name,
          location: stageData.location,
          description: stageData.description,
          distance: stageData.distance,
          difficulty_level: stageData.difficulty_level,
          route_type: stageData.route_type,
          start_time: stageData.start_time,
          start_latitude: stageData.start_latitude,
          start_longitude: stageData.start_longitude,
          finish_latitude: stageData.finish_latitude,
          finish_longitude: stageData.finish_longitude,
          map_zoom_level: stageData.map_zoom_level,
          max_participants: stageData.max_participants,
          stage_order: stageData.stage_order,
          status: stageData.status,
        })
        .eq('id', stageId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Error updating stage:', error);
      return { data: null, error: error.message };
    }
  },

  // Supprimer une épreuve
  async deleteStage(stageId: string) {
    try {
      const { error } = await supabase
        .from('rally_stages')
        .delete()
        .eq('id', stageId);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error('Error deleting stage:', error);
      return { error: error.message };
    }
  }
};
