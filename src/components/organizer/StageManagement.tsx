
import { useState, useEffect } from "react";
import { StageManager } from "./stage/StageManager";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const StageManagement = () => {
  const [defaultRallyId, setDefaultRallyId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDefaultRally = async () => {
      try {
        setIsLoading(true);
        // Récupérer le premier rallye disponible comme rallye par défaut
        const { data, error } = await supabase
          .from('rallies')
          .select('id')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          console.error("Erreur lors de la récupération du rallye par défaut:", error);
          return;
        }
        
        if (data) {
          setDefaultRallyId(data.id);
        }
      } catch (error) {
        console.error("Erreur:", error);
        toast.error("Erreur lors du chargement des données");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDefaultRally();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StageManager rallyId={defaultRallyId} />
    </div>
  );
};
