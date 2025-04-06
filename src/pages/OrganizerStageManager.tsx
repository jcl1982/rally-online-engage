import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";
import { useAuth } from "@/hooks/useAuth";
import { StageModal } from "@/components/organizer/stage/StageModal";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { StageFormValues } from "@/types/stage.types";
import RallyActionBar from "@/components/organizer/rally/RallyActionBar";
import { Rally } from "@/schemas/rallySchema";

const OrganizerStageManager = () => {
  const { rallyId } = useParams();
  const navigate = useNavigate();
  const { profile, isLoading } = useAuth();
  const [rally, setRally] = useState<Rally | null>(null);
  const [stages, setStages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState(null);
  const [isLoading2, setIsLoading2] = useState(true);

  // Vérifier si l'utilisateur est un organisateur
  useEffect(() => {
    if (!isLoading && profile && profile.role !== 'organizer' && profile.role !== 'admin') {
      navigate('/');
    }
  }, [isLoading, profile, navigate]);

  // Charger les informations sur le rallye
  useEffect(() => {
    const fetchRallyInfo = async () => {
      try {
        if (!rallyId) return;
        
        const { data, error } = await supabase
          .from('rallies')
          .select('*')
          .eq('id', rallyId)
          .single();
        
        if (error) throw error;
        setRally(data);
      } catch (error) {
        console.error("Erreur lors du chargement du rallye:", error);
        toast.error("Impossible de charger les informations du rallye");
      }
    };
    
    fetchRallyInfo();
  }, [rallyId]);

  // Charger les épreuves du rallye
  useEffect(() => {
    const fetchStages = async () => {
      try {
        if (!rallyId) return;
        
        const { data, error } = await supabase
          .from('rally_stages')
          .select('*')
          .eq('rally_id', rallyId)
          .order('name');
        
        if (error) throw error;
        setStages(data || []);
      } catch (error) {
        console.error("Erreur lors du chargement des épreuves:", error);
        toast.error("Impossible de charger les épreuves");
      } finally {
        setIsLoading2(false);
      }
    };
    
    fetchStages();
  }, [rallyId]);

  const handleAddStage = () => {
    setCurrentStage(null);
    setIsModalOpen(true);
  };

  const handleEditStage = (stage) => {
    setCurrentStage(stage);
    setIsModalOpen(true);
  };

  const handleDeleteStage = async (stageId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette épreuve ?")) return;
    
    try {
      const { error } = await supabase
        .from('rally_stages')
        .delete()
        .eq('id', stageId);
      
      if (error) throw error;
      
      setStages(stages.filter(stage => stage.id !== stageId));
      toast.success("Épreuve supprimée avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression de l'épreuve");
    }
  };

  const handleSubmitStage = async (values: StageFormValues) => {
    try {
      if (currentStage) {
        // Mise à jour d'une épreuve existante
        const { error } = await supabase
          .from('rally_stages')
          .update({
            name: values.name,
            location: values.location,
            description: values.description,
            distance: values.distance,
            status: values.status
          })
          .eq('id', currentStage.id);
        
        if (error) throw error;
        
        setStages(stages.map(stage => 
          stage.id === currentStage.id 
            ? { ...stage, ...values } 
            : stage
        ));
        
        toast.success("Épreuve mise à jour avec succès");
      } else {
        // Ajout d'une nouvelle épreuve
        const { data, error } = await supabase
          .from('rally_stages')
          .insert({
            rally_id: rallyId,
            name: values.name,
            location: values.location,
            description: values.description,
            distance: values.distance,
            status: values.status
          })
          .select();
        
        if (error) throw error;
        
        setStages([...stages, data[0]]);
        toast.success("Épreuve ajoutée avec succès");
      }
      
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      toast.error("Erreur lors de l'enregistrement de l'épreuve");
    }
  };

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <RallyHeader />
        <div className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red"></div>
        </div>
        <RallyFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <RallyHeader />
      
      {rally && <RallyActionBar rally={rally} currentTab="stages" />}
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Épreuves du rallye</h1>
              <p className="text-gray-600">
                Gérez les épreuves spéciales pour ce rallye
              </p>
            </div>
            <Button 
              onClick={handleAddStage} 
              className="bg-rally-red hover:bg-red-700"
            >
              <Plus className="mr-2 h-4 w-4" /> Ajouter une épreuve
            </Button>
          </div>
          
          {isLoading2 ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red"></div>
            </div>
          ) : stages.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8">
                <p className="text-gray-500 mb-4">Aucune épreuve n'a encore été ajoutée pour ce rallye.</p>
                <Button 
                  onClick={handleAddStage} 
                  variant="outline" 
                  className="border-rally-red text-rally-red hover:bg-red-50"
                >
                  <Plus className="mr-2 h-4 w-4" /> Ajouter votre première épreuve
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stages.map((stage) => (
                <Card key={stage.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{stage.name}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditStage(stage)}
                          className="p-1 rounded-full hover:bg-gray-100"
                          title="Modifier"
                        >
                          <Pencil className="h-4 w-4 text-gray-500" />
                        </button>
                        <button
                          onClick={() => handleDeleteStage(stage.id)}
                          className="p-1 rounded-full hover:bg-gray-100"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{stage.location}</p>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Distance: {stage.distance} km</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        stage.status === 'planned' ? 'bg-blue-100 text-blue-800' : 
                        stage.status === 'active' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {stage.status === 'planned' ? 'Planifiée' : 
                         stage.status === 'active' ? 'Active' : 'Terminée'}
                      </span>
                    </div>
                    {stage.description && (
                      <p className="text-sm text-gray-500 line-clamp-2">{stage.description}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </main>
      
      <StageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitStage}
        initialData={currentStage}
        title={currentStage ? "Modifier l'épreuve" : "Ajouter une épreuve"}
      />
      
      <RallyFooter />
    </div>
  );
};

export default OrganizerStageManager;
