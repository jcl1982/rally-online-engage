
import { useNavigate, useLocation } from "react-router-dom";
import { Flag, Calendar, Users, Settings, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OrganizerNavigationProps {
  rallyId?: string;
  currentSection?: 'overview' | 'stages' | 'calendar' | 'participants' | 'settings';
  showBackButton?: boolean;
}

const OrganizerNavigation = ({ 
  rallyId, 
  currentSection = 'overview',
  showBackButton = true 
}: OrganizerNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (section: string) => currentSection === section;
  
  // Common button classes for all navigation buttons
  const btnClass = "gap-2";
  const activeBtnClass = "bg-rally-red text-white hover:bg-red-700";
  
  return (
    <div className="bg-white border-b shadow-sm mb-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/organizer')}
              className="text-gray-600 hover:text-gray-900 mr-4"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Retour
            </Button>
          )}

          {rallyId ? (
            <>
              <Button
                variant={isActive('stages') ? "default" : "outline"}
                size="sm"
                onClick={() => navigate(`/organizer/rally/${rallyId}/stages`)}
                className={cn(btnClass, isActive('stages') && activeBtnClass)}
              >
                <Flag size={18} />
                Épreuves
              </Button>
              
              <Button
                variant={isActive('calendar') ? "default" : "outline"}
                size="sm"
                onClick={() => navigate(`/organizer/rally/${rallyId}/calendar`)}
                className={cn(btnClass, isActive('calendar') && activeBtnClass)}
              >
                <Calendar size={18} />
                Calendrier
              </Button>
              
              <Button
                variant={isActive('participants') ? "default" : "outline"}
                size="sm"
                onClick={() => navigate(`/organizer/rally/${rallyId}/participants`)}
                className={cn(btnClass, isActive('participants') && activeBtnClass)}
              >
                <Users size={18} />
                Participants
              </Button>
              
              <Button
                variant={isActive('settings') ? "default" : "outline"}
                size="sm"
                onClick={() => navigate(`/organizer/rally/${rallyId}/settings`)}
                className={cn(btnClass, isActive('settings') && activeBtnClass)}
              >
                <Settings size={18} />
                Paramètres
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={location.pathname === "/organizer" ? "default" : "outline"}
                size="sm"
                onClick={() => navigate("/organizer")}
                className={cn(
                  btnClass,
                  location.pathname === "/organizer" && activeBtnClass
                )}
              >
                <Flag size={18} />
                Vue d'ensemble
              </Button>
              
              <Button
                variant={location.pathname === "/organizer/stages" ? "default" : "outline"}
                size="sm"
                onClick={() => navigate("/organizer/stages")}
                className={cn(
                  btnClass,
                  location.pathname === "/organizer/stages" && activeBtnClass
                )}
              >
                <Flag size={18} />
                Épreuves
              </Button>
              
              <Button
                variant={location.pathname === "/organizer/rally/new" ? "default" : "outline"}
                size="sm"
                onClick={() => navigate("/organizer/rally/new")}
                className={cn(
                  btnClass,
                  location.pathname === "/organizer/rally/new" && activeBtnClass
                )}
              >
                <Calendar size={18} />
                Nouveau rallye
              </Button>
              
              <Button
                variant={location.pathname === "/organizer/crews" ? "default" : "outline"}
                size="sm"
                onClick={() => navigate("/organizer/crews")}
                className={cn(
                  btnClass,
                  location.pathname === "/organizer/crews" && activeBtnClass
                )}
              >
                <Users size={18} />
                Équipages
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizerNavigation;
