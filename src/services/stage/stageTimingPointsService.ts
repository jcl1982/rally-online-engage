import { supabase } from '@/integrations/supabase/client';
import { TimingPointFormValues } from '@/types/stage.types';

// Service pour gérer les opérations sur les points de chronométrage
export const stageTimingPointsService = {
  // Récupérer tous les points de chronométrage pour une épreuve
  async getTimingPointsByStageId(stageId: string) {
    try {
      const { data, error } = await supabase
        .from('timing_points')
        .select('*')
        .eq('stage_id', stageId)
        .order('order_index', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching timing points:', error);
      return { data: null, error: error.message };
    }
  },

  // Créer un nouveau point de chronométrage
  async createTimingPoint(timingPointData: TimingPointFormValues & { stage_id: string }) {
    try {
      const { data, error } = await supabase
        .from('timing_points')
        .insert({
          ...timingPointData,
          stage_id: timingPointData.stage_id,
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Error creating timing point:', error);
      return { data: null, error: error.message };
    }
  },

  // Mettre à jour un point de chronométrage existant
  async updateTimingPoint(pointId: string, timingPointData: TimingPointFormValues) {
    try {
      const { data, error } = await supabase
        .from('timing_points')
        .update({ ...timingPointData })
        .eq('id', pointId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Error updating timing point:', error);
      return { data: null, error: error.message };
    }
  },

  // Supprimer un point de chronométrage
  async deleteTimingPoint(pointId: string) {
    try {
      const { error } = await supabase
        .from('timing_points')
        .delete()
        .eq('id', pointId);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error('Error deleting timing point:', error);
      return { error: error.message };
    }
  }
};
