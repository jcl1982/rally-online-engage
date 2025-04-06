
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Map, Calendar, Users, Settings, ChevronLeft } from "lucide-react";
import { Rally } from "@/schemas/rallySchema";

interface RallyActionBarProps {
  rally: Rally;
  currentTab?: 'stages' | 'calendar' | 'participants' | 'settings';
  showBackButton?: boolean;
}

const RallyActionBar = ({ rally, currentTab, showBackButton = true }: RallyActionBarProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white border-b shadow-sm mb-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button
                variant="header"
                size="sm"
                onClick={() => navigate('/organizer')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Retour aux rallyes
              </Button>
            )}
            <h2 className="text-xl font-semibold">{rally.name}</h2>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={currentTab === 'stages' ? 'default' : 'outline'}
              size="sm"
              onClick={() => navigate(`/organizer/rally/${rally.id}/stages`)}
              className={currentTab === 'stages' ? 'bg-rally-red hover:bg-red-700 text-white' : ''}
            >
              <Map className="h-4 w-4 mr-2" />
              Épreuves
            </Button>
            
            <Button
              variant={currentTab === 'calendar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => navigate(`/organizer/rally/${rally.id}/calendar`)}
              className={currentTab === 'calendar' ? 'bg-rally-red hover:bg-red-700 text-white' : ''}
              disabled={!rally.id} // Désactiver si le rallye n'existe pas encore
            >
              <Calendar className="h-4 w-4 mr-2" />
              Calendrier
            </Button>
            
            <Button
              variant={currentTab === 'participants' ? 'default' : 'outline'}
              size="sm"
              onClick={() => navigate(`/organizer/rally/${rally.id}/participants`)}
              className={currentTab === 'participants' ? 'bg-rally-red hover:bg-red-700 text-white' : ''}
              disabled={!rally.id} // Désactiver si le rallye n'existe pas encore
            >
              <Users className="h-4 w-4 mr-2" />
              Participants
            </Button>
            
            <Button
              variant={currentTab === 'settings' ? 'default' : 'outline'}
              size="sm"
              onClick={() => navigate(`/organizer/rally/${rally.id}/settings`)}
              className={currentTab === 'settings' ? 'bg-rally-red hover:bg-red-700 text-white' : ''}
              disabled={!rally.id} // Désactiver si le rallye n'existe pas encore
            >
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RallyActionBar;
