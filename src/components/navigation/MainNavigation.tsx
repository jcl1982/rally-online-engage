
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Home, Flag, Calendar, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export const MainNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOrganizer } = useAuth();
  
  // Check if the current path is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  // Navigation link styles
  const linkStyles = "flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors";
  const activeLinkStyles = "bg-gray-100 font-medium";
  
  if (!isOrganizer) return null;
  
  return (
    <NavigationMenu className="max-w-full w-full bg-white border-b border-gray-200 shadow-sm">
      <NavigationMenuList className="container mx-auto p-2">
        <NavigationMenuItem>
          <Button 
            variant={isActive("/") ? "default" : "ghost"}
            className={cn(
              isActive("/") && "bg-rally-red text-white hover:bg-red-700",
              "gap-2"
            )}
            onClick={() => navigate("/")}
          >
            <Home size={18} />
            Accueil
          </Button>
        </NavigationMenuItem>
        
        {isOrganizer && (
          <>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(
                isActive("/organizer") && "bg-rally-red text-white hover:bg-red-700",
                "gap-2"
              )}>
                <Flag size={18} />
                Espace Organisateur
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-red-500 to-rally-red p-6 no-underline outline-none focus:shadow-md"
                        onClick={() => navigate("/organizer")}
                      >
                        <div className="mt-4 mb-2 text-lg font-medium text-white">
                          Gestion de Rallyes
                        </div>
                        <p className="text-sm leading-tight text-white/90">
                          Organisez et gérez tous les aspects de vos rallyes automobiles
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li onClick={() => navigate("/organizer/stages")}>
                    <a className={linkStyles}>
                      <Flag size={18} />
                      <div className="flex flex-col">
                        <span>Gestion des Épreuves</span>
                        <span className="text-xs text-gray-500">
                          Ajouter, modifier ou supprimer des épreuves
                        </span>
                      </div>
                    </a>
                  </li>
                  <li onClick={() => navigate("/organizer/rally/new")}>
                    <a className={linkStyles}>
                      <Calendar size={18} />
                      <div className="flex flex-col">
                        <span>Planification</span>
                        <span className="text-xs text-gray-500">
                          Planifier un nouveau rallye
                        </span>
                      </div>
                    </a>
                  </li>
                  <li onClick={() => navigate("/organizer/crews")}>
                    <a className={linkStyles}>
                      <Users size={18} />
                      <div className="flex flex-col">
                        <span>Équipages</span>
                        <span className="text-xs text-gray-500">
                          Gérer les équipages et inscriptions
                        </span>
                      </div>
                    </a>
                  </li>
                  <li onClick={() => navigate("/admin")}>
                    <a className={linkStyles}>
                      <Settings size={18} />
                      <div className="flex flex-col">
                        <span>Administration</span>
                        <span className="text-xs text-gray-500">
                          Paramètres avancés
                        </span>
                      </div>
                    </a>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Button 
                variant={isActive("/organizer/stages") ? "default" : "ghost"}
                className={cn(
                  isActive("/organizer/stages") && "bg-rally-red text-white hover:bg-red-700",
                  "gap-2"
                )}
                onClick={() => navigate("/organizer/stages")}
              >
                <Flag size={18} />
                Épreuves
              </Button>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Button 
                variant={isActive("/organizer/crews") ? "default" : "ghost"}
                className={cn(
                  isActive("/organizer/crews") && "bg-rally-red text-white hover:bg-red-700",
                  "gap-2"
                )}
                onClick={() => navigate("/organizer/crews")}
              >
                <Users size={18} />
                Équipages
              </Button>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
