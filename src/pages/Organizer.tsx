
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flag, Calendar, TrendingUp, Settings, Users } from "lucide-react";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import OrganizerNavigation from "@/components/navigation/OrganizerNavigation";

const Organizer = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <RallyHeader />
      <OrganizerNavigation showBackButton={false} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Espace Organisateur</h1>
              <p className="text-gray-600">Gérez vos rallyes et équipages</p>
            </div>
            <div>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {profile?.role === 'admin' ? 'Administrateur' : 'Organisateur'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" 
                  onClick={() => navigate("/organizer/stages")}>
              <CardHeader className="pb-2">
                <Flag className="h-6 w-6 text-rally-red mb-2" />
                <CardTitle>Gestion des Épreuves</CardTitle>
                <CardDescription>
                  Ajouter, modifier ou supprimer des épreuves de rallye
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full"
                  onClick={() => navigate("/organizer/stages")}
                >
                  Gérer les épreuves
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate("/organizer/rally/new")}>
              <CardHeader className="pb-2">
                <Calendar className="h-6 w-6 text-rally-red mb-2" />
                <CardTitle>Planification</CardTitle>
                <CardDescription>
                  Planifiez vos prochains rallyes et événements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full"
                  onClick={() => navigate("/organizer/rally/new")}
                >
                  Planifier un rallye
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate("/organizer/crews")}>
              <CardHeader className="pb-2">
                <Users className="h-6 w-6 text-rally-red mb-2" />
                <CardTitle>Équipages</CardTitle>
                <CardDescription>
                  Gérer les équipages et les inscriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full"
                  onClick={() => navigate("/organizer/crews")}
                >
                  Voir les équipages
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
      <RallyFooter />
    </div>
  );
};

export default Organizer;
