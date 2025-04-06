
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface RallyBasicInfo {
  id: string;
  name: string;
}

const Registration = () => {
  const [searchParams] = useSearchParams();
  const rallyId = searchParams.get("rally");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [rally, setRally] = useState<RallyBasicInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRallyInfo = async () => {
      if (rallyId) {
        try {
          setIsLoading(true);
          const { data, error } = await supabase
            .from("rallies")
            .select("id, name")
            .eq("id", rallyId)
            .single();

          if (error) throw error;
          setRally(data);
        } catch (error) {
          console.error("Erreur lors de la récupération du rallye:", error);
          toast.error("Impossible de charger les informations du rallye");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchRallyInfo();
  }, [rallyId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <RallyHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button onClick={handleGoBack} className="mb-4 flex items-center gap-2">
          <ArrowLeft size={16} />
          Retour
        </Button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-6">
            {rally ? `Engagement pour: ${rally.name}` : "Formulaire d'engagement"}
          </h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Bienvenue dans le processus d'engagement</h2>
            <p className="text-gray-600 mb-4">
              {user?.email ? `Vous êtes connecté en tant que ${user.email}.` : ""}
              {" "}Complétez le formulaire ci-dessous pour vous engager.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-lg font-medium mb-4">Cette page est en cours de développement</h3>
              <p className="text-gray-600 mb-4">
                Le formulaire complet d'engagement sera bientôt disponible avec les sections suivantes :
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 mb-4">
                <li>Informations personnelles du pilote et co-pilote</li>
                <li>Détails du véhicule</li>
                <li>Équipements de sécurité</li>
                <li>Documents officiels et licences</li>
                <li>Paiement des frais d'engagement</li>
              </ul>
              <p className="text-gray-600">
                Merci de votre patience pendant que nous finalisons cette fonctionnalité.
              </p>
            </div>
          </div>
        </div>
      </main>
      <RallyFooter />
    </div>
  );
};

export default Registration;
