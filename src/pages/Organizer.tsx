
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";
import { Button } from "@/components/ui/button";
import { LogOut, ChevronLeft, Flag, Users, Award, CalendarClock } from "lucide-react";
import { StageManagement } from "@/components/organizer/StageManagement";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Card } from "@/components/ui/card";

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

  const renderContent = () => {
    switch (activeTab) {
      case "stages":
        return <StageManagement />;
      case "participants":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Gestion des Participants</h3>
            <p className="text-gray-500 mb-4">
              Cette section vous permet de gérer les inscriptions et les participants à votre rallye.
            </p>
            <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
              <h4 className="font-medium text-gray-700 mb-2">Fonctionnalités à venir :</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Liste des participants inscrits</li>
                <li>Validation des inscriptions</li>
                <li>Attribution des numéros de course</li>
                <li>Vérifications techniques et administratives</li>
              </ul>
            </div>
          </div>
        );
      case "results":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Gestion des Résultats</h3>
            <p className="text-gray-500 mb-4">
              Cette section vous permettra de saisir et de consulter les résultats des épreuves.
            </p>
            <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
              <h4 className="font-medium text-gray-700 mb-2">Fonctionnalités à venir :</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Saisie des temps par spéciale</li>
                <li>Classement général et par catégorie</li>
                <li>Calcul des pénalités</li>
                <li>Publication des résultats en direct</li>
              </ul>
            </div>
          </div>
        );
      case "planning":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Planning et Horaires</h3>
            <p className="text-gray-500 mb-4">
              Cette section vous permettra de gérer le planning et les horaires du rallye.
            </p>
            <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
              <h4 className="font-medium text-gray-700 mb-2">Fonctionnalités à venir :</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Création des horaires de départ</li>
                <li>Gestion des ordres de passage</li>
                <li>Planification des reconnaissances</li>
                <li>Horaires des vérifications techniques</li>
              </ul>
            </div>
          </div>
        );
      default:
        return <StageManagement />;
    }
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
            <h1 className="text-3xl font-bold text-gray-900">Espace Organisateur</h1>
            <p className="text-gray-600">
              Organisateur: {profile?.first_name || profile?.email}
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2">
            <LogOut size={16} />
            Déconnexion
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card className="p-4">
              <nav className="space-y-1">
                <Button
                  variant={activeTab === "stages" ? "default" : "ghost"}
                  className={`w-full justify-start ${activeTab === "stages" ? "bg-rally-red hover:bg-red-700" : ""}`}
                  onClick={() => setActiveTab("stages")}
                >
                  <Flag size={18} className="mr-2" />
                  Épreuves
                </Button>
                <Button
                  variant={activeTab === "participants" ? "default" : "ghost"}
                  className={`w-full justify-start ${activeTab === "participants" ? "bg-rally-red hover:bg-red-700" : ""}`}
                  onClick={() => setActiveTab("participants")}
                >
                  <Users size={18} className="mr-2" />
                  Participants
                </Button>
                <Button
                  variant={activeTab === "results" ? "default" : "ghost"}
                  className={`w-full justify-start ${activeTab === "results" ? "bg-rally-red hover:bg-red-700" : ""}`}
                  onClick={() => setActiveTab("results")}
                >
                  <Award size={18} className="mr-2" />
                  Résultats
                </Button>
                <Button
                  variant={activeTab === "planning" ? "default" : "ghost"}
                  className={`w-full justify-start ${activeTab === "planning" ? "bg-rally-red hover:bg-red-700" : ""}`}
                  onClick={() => setActiveTab("planning")}
                >
                  <CalendarClock size={18} className="mr-2" />
                  Planning
                </Button>
              </nav>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
      <RallyFooter />
    </div>
  );
};

export default Organizer;
