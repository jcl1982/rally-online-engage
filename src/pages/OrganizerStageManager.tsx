
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useRallyStages } from "@/hooks/useRallyStages";
import { Rally, validateRallyStatus } from "@/schemas/rallySchema";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";
import RallyActionBar from "@/components/organizer/rally/RallyActionBar";
import { StageManager } from "@/components/organizer/stage/StageManager";
import { motion } from "framer-motion";

const OrganizerStageManager = () => {
  const { rallyId } = useParams<{ rallyId: string }>();
  const navigate = useNavigate();
  const { isOrganizer, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [rally, setRally] = useState<Rally | null>(null);

  // Fetch the rally details
  useEffect(() => {
    const fetchRally = async () => {
      if (!rallyId) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("rallies")
          .select("*")
          .eq("id", rallyId)
          .single();

        if (error) throw error;
        
        // Ensure the status is properly typed
        if (data) {
          const validatedRally = {
            ...data,
            status: validateRallyStatus(data.status)
          };
          setRally(validatedRally);
        }
      } catch (error) {
        console.error("Error fetching rally details:", error);
        toast.error("Impossible de charger les détails du rallye");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRally();
  }, [rallyId]);

  // Redirect if not an organizer
  useEffect(() => {
    if (!authLoading && !isOrganizer) {
      navigate("/");
    }
  }, [isOrganizer, authLoading, navigate]);

  // Show loading state
  if (authLoading || isLoading || !rally) {
    return (
      <div className="min-h-screen flex flex-col">
        <RallyHeader />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red"></div>
          </div>
        </main>
        <RallyFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <RallyHeader />
      <RallyActionBar rally={rally} currentTab="stages" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Gestion des Épreuves</h1>
            <p className="text-gray-600 mt-1">
              Ajoutez, modifiez ou supprimez les épreuves pour le rallye {rally.name}
            </p>
          </div>

          <StageManager rallyId={rallyId} />
        </motion.div>
      </main>
      <RallyFooter />
    </div>
  );
};

export default OrganizerStageManager;
