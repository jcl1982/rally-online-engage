
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Flag } from "lucide-react";
import RallyManagement from "@/components/admin/RallyManagement";
import RallyStageManagement from "@/components/admin/RallyStageManagement";

const Admin = () => {
  const { signOut, profile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("rallies");
  const [selectedRallyId, setSelectedRallyId] = useState<string | null>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleRallySelect = (rallyId: string | null) => {
    setSelectedRallyId(rallyId);
    if (rallyId) {
      setActiveTab("stages");
    }
  };

  const navigateToOrganizer = () => {
    navigate("/organizer");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <RallyHeader />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Espace Administrateur</h1>
            <p className="text-gray-600">
              Bienvenue, {profile?.first_name || profile?.email}
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={navigateToOrganizer} 
              className="bg-rally-red hover:bg-red-700 flex items-center gap-2"
            >
              <Flag size={16} />
              Gérer les Épreuves
            </Button>
            <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2">
              <LogOut size={16} />
              Déconnexion
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="rallies">Rallyes</TabsTrigger>
            <TabsTrigger value="stages" disabled={!selectedRallyId}>
              Épreuves Spéciales
            </TabsTrigger>
            <TabsTrigger value="registrations">Inscriptions</TabsTrigger>
          </TabsList>

          <TabsContent value="rallies" className="space-y-4">
            <RallyManagement onRallySelect={handleRallySelect} />
          </TabsContent>

          <TabsContent value="stages" className="space-y-4">
            {selectedRallyId && (
              <RallyStageManagement rallyId={selectedRallyId} />
            )}
          </TabsContent>

          <TabsContent value="registrations" className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Gestion des inscriptions</h3>
              <p className="text-gray-500">
                Fonctionnalité à venir : gestion des inscriptions des participants.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <RallyFooter />
    </div>
  );
};

export default Admin;
