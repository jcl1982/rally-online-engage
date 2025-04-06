
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";
import { useNavigate } from "react-router-dom";
import { StageManager } from "@/components/organizer/stage/StageManager";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const OrganizerStages = () => {
  const navigate = useNavigate();
  const { isOrganizer, isLoading } = useAuth();

  // Rediriger si l'utilisateur n'est pas un organisateur
  useEffect(() => {
    if (!isLoading && !isOrganizer) {
      navigate("/");
    }
  }, [isOrganizer, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red"></div>
        <p className="mt-4 text-gray-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <RallyHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              className="mb-4"
              onClick={() => navigate("/organizer")}
            >
              <ChevronLeft size={16} className="mr-1" /> Retour au tableau de bord
            </Button>

            <h1 className="text-3xl font-bold">Gestion des Épreuves</h1>
            <p className="text-gray-600 mt-1">
              Ajoutez, modifiez ou supprimez les épreuves des rallyes
            </p>
          </div>

          <StageManager />
        </motion.div>
      </main>
      <RallyFooter />
    </div>
  );
};

export default OrganizerStages;
