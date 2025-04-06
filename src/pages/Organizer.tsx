
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";
import StageManagement from "@/components/organizer/StageManagement";
import { useAuth } from "@/hooks/useAuth";

const Organizer = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("stages");

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <RallyHeader />
        <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red mx-auto mb-4"></div>
            <p>Chargement des informations organisateur...</p>
          </div>
        </main>
        <RallyFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <RallyHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Espace Organisateur</h1>
            <div className="mt-4 md:mt-0">
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="ml-2"
              >
                Retour à l'accueil
              </Button>
            </div>
          </div>

          <Tabs defaultValue="stages" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="stages">Gestion des Épreuves</TabsTrigger>
              <TabsTrigger value="registrations">Inscriptions</TabsTrigger>
              <TabsTrigger value="results">Résultats</TabsTrigger>
            </TabsList>

            <TabsContent value="stages" className="space-y-6">
              <StageManagement />
            </TabsContent>

            <TabsContent value="registrations" className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-lg font-medium mb-4">Gestion des inscriptions</h3>
                <p className="text-gray-600">
                  Cette section est en cours de développement et sera bientôt disponible.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-lg font-medium mb-4">Gestion des résultats</h3>
                <p className="text-gray-600">
                  Cette section est en cours de développement et sera bientôt disponible.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <RallyFooter />
    </div>
  );
};

export default Organizer;
