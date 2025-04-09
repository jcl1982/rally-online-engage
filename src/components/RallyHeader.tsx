
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogIn, Users, Flag } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import MainNavigation from "./navigation/MainNavigation";

const RallyHeader = () => {
  const navigate = useNavigate();
  const { user, signOut, isOrganizer } = useAuth();
  
  return (
    <>
      <motion.header 
        className="py-6 bg-rally-black text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src="/lovable-uploads/b7bd7eb8-e95d-4931-bd8d-13de72e9990b.png" 
                alt="ASA Guadeloupe" 
                className="w-12 h-12 mr-3"
              />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold cursor-pointer" onClick={() => navigate("/")}>
                  <span className="text-rally-red">Rally</span>Engage
                </h1>
                <p className="text-sm md:text-base text-gray-300">Plateforme d'engagement en ligne pour rallyes automobiles</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline text-sm border-l-2 border-rally-red pl-4 py-1">
                Simplifiez votre engagement en rallye
              </span>
              
              {user ? (
                <div className="flex items-center space-x-2">
                  {isOrganizer && (
                    <Button 
                      variant="header" 
                      size="sm"
                      onClick={() => navigate("/organizer")}
                    >
                      <Flag size={16} className="mr-2" />
                      Espace Organisateur
                    </Button>
                  )}
                  <Button 
                    variant="header" 
                    size="sm"
                    onClick={signOut}
                  >
                    Déconnexion
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="header" 
                  size="sm"
                  onClick={() => navigate("/auth")}
                >
                  <LogIn size={16} className="mr-2" />
                  Connexion
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="hidden md:block absolute right-0 bottom-0 w-1/4 h-2 bg-rally-red"></div>
      </motion.header>
      <MainNavigation />
    </>
  );
};

export default RallyHeader;
