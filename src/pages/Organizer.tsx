
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";
import { StageManager } from "@/components/organizer/stage/StageManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";

const Organizer = () => {
  const [activeTab, setActiveTab] = useState("stages");
  const { profile } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <RallyHeader />
      <motion.main 
        className="flex-grow container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold border-b pb-4">Espace Organisateur</h1>
          <div className="text-gray-600">
            Connecté en tant que {profile?.first_name || profile?.email}
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="stages">Épreuves Spéciales</TabsTrigger>
            <TabsTrigger value="registrations">Engagements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stages">
            <StageManager />
          </TabsContent>
          
          <TabsContent value="registrations">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Gestion des Engagements</h2>
              <p className="text-gray-600 mb-4">
                Cette section vous permet de gérer les engagements des participants aux rallyes.
              </p>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-yellow-700">
                  Fonctionnalité en cours de développement. Vous pourrez bientôt:
                </p>
                <ul className="list-disc ml-5 mt-2 text-yellow-700">
                  <li>Voir la liste des participants inscrits</li>
                  <li>Valider ou refuser des engagements</li>
                  <li>Communiquer avec les participants</li>
                  <li>Gérer les documents d'engagement</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.main>
      <RallyFooter />
    </div>
  );
};

export default Organizer;
