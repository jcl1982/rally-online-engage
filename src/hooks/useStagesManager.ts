
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { StageFormValues } from '@/schemas/organizerStageSchema';

export interface Stage {
  id: string;
  rally_id: string;
  name: string; 
  location: string; 
  description?: string;
  distance: number;
  start_time?: string;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  difficulty_level: 'easy' | 'medium' | 'hard' | 'expert';
  route_type: 'tarmac' | 'gravel' | 'snow' | 'sand' | 'mixed';
  start_latitude?: number | null;
  start_longitude?: number | null;
  finish_latitude?: number | null;
  finish_longitude?: number | null;
  map_zoom_level?: number | null;
  max_participants?: number | null;
  stage_order?: number | null;
  created_at: string;
  updated_at: string;
}

interface Rally {
  id: string;
  name: string;
}

export const useStagesManager = (rallyId?: string) => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState<Stage | null>(null);
  const [defaultRally, setDefaultRally] = useState<Rally | null>(null);

  // Récupérer les étapes pour le rallye spécifié
  const fetchStages = async (rallId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('rally_stages')
        .select('*')
        .eq('rally_id', rallId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching stages:", error);
        toast.error("Erreur lors de la récupération des épreuves");
        return;
      }
      
      setStages(data as Stage[]);
    } catch (error) {
      console.error("Error fetching stages:", error);
      toast.error("Erreur lors de la récupération des épreuves");
    } finally {
      setIsLoading(false);
    }
  };

  // Récupérer le rallye par défaut si aucun rallyId n'est fourni
  const fetchDefaultRally = async () => {
    try {
      const { data, error } = await supabase
        .from('rallies')
        .select('id, name')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error("Error fetching default rally:", error);
        return;
      }

      if (data && data.length > 0) {
        setDefaultRally(data[0]);
        fetchStages(data[0].id);
      }
    } catch (error) {
      console.error("Error fetching default rally:", error);
    }
  };

  useEffect(() => {
    if (rallyId) {
      fetchStages(rallyId);
    } else {
      fetchDefaultRally();
    }
  }, [rallyId]);

  const openAddModal = () => {
    setCurrentStage(null);
    setModalOpen(true);
  };

  const openEditModal = (stage: Stage) => {
    setCurrentStage(stage);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentStage(null);
  };

  // Fonction pour gérer la soumission du formulaire (ajout ou modification)
  const handleSubmit = async (data: StageFormValues) => {
    const rallyIdToUse = rallyId || defaultRally?.id;
    
    if (!rallyIdToUse) {
      toast.error("Aucun rallye sélectionné");
      return;
    }

    try {
      if (currentStage) {
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
          .eq('id', currentStage.id);

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
      closeModal();
    } catch (error: any) {
      console.error("Error saving stage:", error);
      toast.error(`Erreur: ${error.message}`);
    }
  };

  // Fonction pour supprimer une étape
  const deleteStage = async (stageId: string) => {
    const rallyIdToUse = rallyId || defaultRally?.id;
    
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
    stages,
    isLoading,
    modalOpen,
    currentStage,
    defaultRally,
    openAddModal,
    openEditModal,
    closeModal,
    handleSubmit,
    deleteStage
  };
};
