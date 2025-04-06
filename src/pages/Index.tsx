
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, MapPin, Flag, Users, Shield } from "lucide-react";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";
import HeroSection from "@/components/HeroSection";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface UpcomingRally {
  id: string;
  name: string;
  location: string;
  start_date: string;
  end_date: string;
  image?: string;
}

const Index = () => {
  const navigate = useNavigate();
  const { user, isOrganizer, profile } = useAuth();
  const [upcomingRallies, setUpcomingRallies] = useState<UpcomingRally[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingRallies = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("upcoming_rallies")
          .select("id, name, location, start_date, end_date")
          .limit(3);

        if (error) {
          throw error;
        }

        // Format the data for display
        const formattedRallies = data.map(rally => ({
          id: rally.id,
          name: rally.name,
          location: rally.location,
          start_date: rally.start_date,
          end_date: rally.end_date,
          image: "/placeholder.svg" // Default image for now
        }));

        setUpcomingRallies(formattedRallies);
      } catch (error) {
        console.error("Erreur lors du chargement des rallyes:", error);
        toast.error("Impossible de charger les prochains rallyes");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpcomingRallies();
  }, []);

  const handleOrganizerAccess = () => {
    navigate("/organizer");
  };

  const handleAdminAccess = () => {
    navigate("/admin");
  };
  
  const handleStartRegistration = () => {
    if (user) {
      navigate("/registration");
    } else {
      toast("Veuillez vous connecter pour commencer votre engagement");
      navigate("/auth", { state: { from: "/registration" } });
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <RallyHeader />
      <main className="flex-grow">
        <HeroSection onStartRegistration={handleStartRegistration} />

        {user && (
          <section className="bg-white py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6 text-center">Votre espace</h2>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                {profile?.role === "admin" && (
                  <Button 
                    onClick={handleAdminAccess} 
                    className="bg-rally-red hover:bg-red-700 flex items-center gap-2"
                  >
                    <Shield size={18} />
                    Accès administration
                  </Button>
                )}
                
                {(profile?.role === "organizer" || profile?.role === "admin") && (
                  <Button 
                    onClick={handleOrganizerAccess} 
                    className="bg-rally-red hover:bg-red-700 flex items-center gap-2"
                  >
                    <Flag size={18} />
                    Espace Organisateur
                  </Button>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Prochains Rallyes</h2>
            {isLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red"></div>
              </div>
            ) : upcomingRallies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {upcomingRallies.map((rally) => (
                  <motion.div
                    key={rally.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      src={rally.image || "/placeholder.svg"}
                      alt={rally.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{rally.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Calendar size={16} className="mr-2" />
                        <span>{formatDate(rally.start_date)} - {formatDate(rally.end_date)}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin size={16} className="mr-2" />
                        <span>{rally.location}</span>
                      </div>
                      <Button 
                        className="w-full bg-rally-red hover:bg-red-700"
                        onClick={() => navigate(`/rally/${rally.id}`)}
                      >
                        Détails
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-white rounded-lg shadow">
                <p className="text-gray-600">Aucun prochain rallye n'est actuellement prévu.</p>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Pourquoi utiliser RallyEngage?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border border-gray-200 rounded-lg text-center">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Flag className="w-8 h-8 text-rally-red" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Inscription Simplifiée</h3>
                <p className="text-gray-600">
                  Inscrivez-vous aux rallyes en quelques clics, sans paperasse et sans
                  déplacement.
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg text-center">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-rally-red" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Gestion d'équipage</h3>
                <p className="text-gray-600">
                  Gérez facilement vos informations pilote, copilote et véhicule pour toutes
                  vos compétitions.
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg text-center">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-rally-red" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Suivi en temps réel</h3>
                <p className="text-gray-600">
                  Suivez votre engagement, recevez des notifications et consultez votre
                  planning de rallye.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <RallyFooter />
    </div>
  );
};

export default Index;
