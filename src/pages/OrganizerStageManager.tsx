
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";
import { StageManager } from "@/components/organizer/stage/StageManager";
import { useAuth } from "@/hooks/useAuth";
import OrganizerNavigation from "@/components/navigation/OrganizerNavigation";

interface Rally {
  id: string;
  name: string;
}

const OrganizerStageManager = () => {
  const { rallyId } = useParams<{ rallyId: string }>();
  const [rally, setRally] = useState<Rally | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { profile, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est un organisateur
  useEffect(() => {
    if (!authLoading && profile && profile.role !== 'organizer' && profile.role !== 'admin') {
      toast.error("Accès non autorisé");
      navigate('/');
    }
  }, [profile, authLoading, navigate]);

  // Récupérer les détails du rallye
  useEffect(() => {
    const fetchRallyDetails = async () => {
      if (!rallyId) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('rallies')
          .select('id, name')
          .eq('id', rallyId)
          .single();
          
        if (error) {
          console.error("Erreur lors de la récupération du rallye:", error);
          throw error;
        }

        setRally(data);
      } catch (error: any) {
        console.error("Erreur:", error);
        toast.error("Erreur lors du chargement du rallye");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRallyDetails();
  }, [rallyId]);

  return (
    <div className="min-h-screen flex flex-col">
      <RallyHeader />
      <OrganizerNavigation rallyId={rallyId} currentSection="stages" />
      <main className="flex-grow container mx-auto px-4 py-8">
        {!isLoading && rally ? (
          <>
            <h1 className="text-3xl font-bold mb-6">
              Épreuves du rallye: {rally.name}
            </h1>
            <StageManager rallyId={rallyId} />
          </>
        ) : (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red"></div>
          </div>
        )}
      </main>
      <RallyFooter />
    </div>
  );
};

export default OrganizerStageManager;
