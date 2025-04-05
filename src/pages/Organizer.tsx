
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, ChevronLeft } from "lucide-react";
import { StageManagement } from "@/components/organizer/StageManagement";

const Organizer = () => {
  const { signOut, profile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("stages");

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleBackToAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <RallyHeader />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToAdmin}
                className="flex items-center gap-1 text-gray-600"
              >
                <ChevronLeft size={16} />
                Retour
              </Button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Épreuves</h1>
            <p className="text-gray-600">
              Organisateur: {profile?.first_name || profile?.email}
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2">
            <LogOut size={16} />
            Déconnexion
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="stages">Épreuves</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="results">Résultats</TabsTrigger>
          </TabsList>

          <TabsContent value="stages" className="space-y-4">
            <StageManagement />
          </TabsContent>

          <TabsContent value="participants" className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Participants</h3>
              <p className="text-gray-500">
                Fonctionnalité à venir : gestion des participants.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Résultats</h3>
              <p className="text-gray-500">
                Fonctionnalité à venir : gestion des résultats.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <RallyFooter />
    </div>
  );
};

export default Organizer;
