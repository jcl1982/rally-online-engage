
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowLeft, Flag, Users } from "lucide-react";
import { toast } from "sonner";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";
import { useAuth } from "@/hooks/useAuth";
import { getStatusBadgeClass, getStatusLabel } from "@/schemas/rallySchema";

interface RallyDetails {
  id: string;
  name: string;
  location: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
  registration_open: boolean;
  registration_deadline: string | null;
}

const RallyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [rally, setRally] = useState<RallyDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stages, setStages] = useState<any[]>([]);

  useEffect(() => {
    const fetchRallyDetails = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("rallies")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setRally(data as RallyDetails);

        // Récupérer les épreuves associées
        const { data: stagesData, error: stagesError } = await supabase
          .from("rally_stages")
          .select("*")
          .eq("rally_id", id)
          .order("name");

        if (stagesError) throw stagesError;
        setStages(stagesData);

      } catch (error) {
        console.error("Erreur lors du chargement des détails du rallye:", error);
        toast.error("Impossible de charger les détails du rallye");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRallyDetails();
  }, [id]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleRegister = () => {
    if (user) {
      navigate(`/registration?rally=${id}`);
    } else {
      toast("Veuillez vous connecter pour vous inscrire");
      navigate("/auth", { state: { from: `/rally/${id}` } });
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <RallyHeader />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-rally-red"></div>
        </div>
        <RallyFooter />
      </div>
    );
  }

  if (!rally) {
    return (
      <div className="min-h-screen flex flex-col">
        <RallyHeader />
        <div className="flex-grow container mx-auto px-4 py-8">
          <Button onClick={handleGoBack} className="mb-4 flex items-center gap-2">
            <ArrowLeft size={16} />
            Retour
          </Button>
          <div className="text-center p-8 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">Rallye introuvable</h2>
            <p className="text-gray-600 mb-4">Ce rallye n'existe pas ou a été supprimé.</p>
            <Button onClick={() => navigate("/")} className="bg-rally-red hover:bg-red-700">
              Retour à l'accueil
            </Button>
          </div>
        </div>
        <RallyFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <RallyHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button onClick={handleGoBack} className="mb-4 flex items-center gap-2">
          <ArrowLeft size={16} />
          Retour
        </Button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-64">
            <img
              src="/placeholder.svg"
              alt={rally.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h1 className="text-3xl font-bold text-white mb-2">{rally.name}</h1>
              <div className="flex flex-wrap gap-4 text-white">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span>{formatDate(rally.start_date)} - {formatDate(rally.end_date)}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  <span>{rally.location}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(rally.status)}`}>
                  {getStatusLabel(rally.status)}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-gray-700">{rally.description || "Aucune description disponible."}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Informations d'inscription</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Statut des inscriptions</h3>
                  <p className={`text-${rally.registration_open ? 'green' : 'red'}-600 font-medium`}>
                    {rally.registration_open ? "Ouvertes" : "Fermées"}
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Date limite d'inscription</h3>
                  <p className="text-gray-700">{rally.registration_deadline ? formatDate(rally.registration_deadline) : "Non spécifiée"}</p>
                </div>
              </div>
              {rally.registration_open && (
                <div className="mt-4">
                  <Button
                    onClick={handleRegister}
                    className="bg-rally-red hover:bg-red-700 w-full md:w-auto"
                  >
                    S'inscrire à ce rallye
                  </Button>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Épreuves ({stages.length})</h2>
              {stages.length > 0 ? (
                <div className="space-y-3">
                  {stages.map((stage) => (
                    <div key={stage.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{stage.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(stage.status)}`}>
                          {getStatusLabel(stage.status)}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1" />
                          <span>{stage.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Flag size={14} className="mr-1" />
                          <span>{stage.distance} km</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 italic">Aucune épreuve n'a encore été ajoutée pour ce rallye.</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <RallyFooter />
    </div>
  );
};

export default RallyDetails;
