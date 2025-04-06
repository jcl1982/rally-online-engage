
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Stage {
  id: string;
  name: string;
  location: string;
  distance: number;
  description?: string;
  rally_id: string;
  status: string;
}

const OrganizerStages = () => {
  const navigate = useNavigate();
  const { user, isOrganizer } = useAuth();
  const [stages, setStages] = useState<Stage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOrganizer) {
      toast.error("Vous n'avez pas les permissions nécessaires");
      navigate("/");
      return;
    }

    fetchStages();
  }, [isOrganizer, navigate]);

  const fetchStages = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("rally_stages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setStages(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des épreuves:", error);
      toast.error("Impossible de charger les épreuves");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStage = () => {
    // TODO: Implémenter la logique d'ajout d'une épreuve
    toast.info("Fonctionnalité d'ajout d'épreuve à implémenter");
  };

  const handleEditStage = (id: string) => {
    // TODO: Implémenter la logique de modification d'une épreuve
    toast.info(`Modification de l'épreuve ${id} à implémenter`);
  };

  const handleDeleteStage = async (id: string) => {
    try {
      const { error } = await supabase
        .from("rally_stages")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      toast.success("Épreuve supprimée avec succès");
      fetchStages();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'épreuve:", error);
      toast.error("Impossible de supprimer l'épreuve");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <RallyHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Gestion des Épreuves</h1>
            <Button onClick={handleAddStage} className="bg-rally-red hover:bg-red-700">
              <Plus size={16} className="mr-2" /> 
              Ajouter une épreuve
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stages.length > 0 ? (
                stages.map((stage) => (
                  <Card key={stage.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <CardTitle>{stage.name}</CardTitle>
                      <CardDescription>{stage.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3">{stage.description || "Pas de description disponible."}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{stage.distance} km</span>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-rally-red text-rally-red hover:bg-rally-red hover:text-white"
                            onClick={() => handleEditStage(stage.id)}
                          >
                            <Edit size={14} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => handleDeleteStage(stage.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center p-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Aucune épreuve n'a été créée pour le moment.</p>
                  <Button 
                    onClick={handleAddStage} 
                    variant="link" 
                    className="text-rally-red mt-2"
                  >
                    Créer votre première épreuve
                  </Button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </main>
      <RallyFooter />
    </div>
  );
};

export default OrganizerStages;
