
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Stage } from '@/types/stage.types';

interface Rally {
  id: string;
  name: string;
}

export const useRallyStagesList = (rallyId?: string) => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  return {
    stages,
    isLoading,
    defaultRally,
    fetchStages
  };
};
