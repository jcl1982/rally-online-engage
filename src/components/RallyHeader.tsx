
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogIn, Users, Flag } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const RallyHeader = () => {
  const navigate = useNavigate();
  const { user, signOut, isOrganizer } = useAuth();
  
  return (
    <motion.header 
      className="py-6 bg-rally-black text-white mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold cursor-pointer" onClick={() => navigate("/")}>
              <span className="text-rally-red">Rally</span>Engage
            </h1>
            <p className="text-sm md:text-base text-gray-300">Plateforme d'engagement en ligne pour rallyes automobiles</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline text-sm border-l-2 border-rally-red pl-4 py-1">
              Simplifiez votre engagement en rallye
            </span>
            
            {user ? (
              <div className="flex items-center space-x-2">
                {isOrganizer && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-rally-red text-white hover:bg-rally-red flex items-center gap-2"
                    onClick={() => navigate("/organizer")}
                  >
                    <Flag size={16} />
                    Espace Organisateur
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-rally-red text-white hover:bg-rally-red"
                  onClick={signOut}
                >
                  Déconnexion
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                className="border-rally-red text-white hover:bg-rally-red"
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
  );
};

export default RallyHeader;
