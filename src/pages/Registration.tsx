
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import VehicleForm from "@/components/VehicleForm";
import EquipmentForm from "@/components/EquipmentForm";
import SummaryStep from "@/components/SummaryStep";
import RegistrationSteps from "@/components/RegistrationSteps";
import { PersonalInfoFormData } from "@/schemas/personalInfoSchema";

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
  const [currentStep, setCurrentStep] = useState(1);
  
  // État pour stocker les données du formulaire à chaque étape
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoFormData | null>(null);
  const [vehicleInfo, setVehicleInfo] = useState<any | null>(null);
  const [equipmentInfo, setEquipmentInfo] = useState<any | null>(null);

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
  
  // Gérer les soumissions d'étapes
  const handlePersonalInfoSubmit = (data: PersonalInfoFormData) => {
    setPersonalInfo(data);
    setCurrentStep(2);
  };

  const handleVehicleSubmit = (data: any) => {
    setVehicleInfo(data);
    setCurrentStep(3);
  };

  const handleEquipmentSubmit = (data: any) => {
    setEquipmentInfo(data);
    setCurrentStep(4);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitRegistration = async () => {
    if (!rallyId || !user) {
      toast.error("Informations d'engagement incomplètes");
      return;
    }

    try {
      toast.success("Engagement soumis avec succès");
      // Ici on ajoutera la logique pour envoyer les données à Supabase
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la soumission de l'engagement:", error);
      toast.error("Échec de la soumission de l'engagement");
    }
  };

  const handleRestartRegistration = () => {
    // Reset all form data and go back to step 1
    setPersonalInfo(null);
    setVehicleInfo(null);
    setEquipmentInfo(null);
    setCurrentStep(1);
  };

  // Rendre le formulaire actuel en fonction de l'étape
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm 
            onSubmitStep={handlePersonalInfoSubmit} 
            initialData={personalInfo || undefined}
          />
        );
      case 2:
        return (
          <VehicleForm 
            onSubmitStep={handleVehicleSubmit} 
            onPrevStep={handlePrevStep}
            initialData={vehicleInfo || undefined}
          />
        );
      case 3:
        return (
          <EquipmentForm 
            onSubmitStep={handleEquipmentSubmit} 
            onPrevStep={handlePrevStep}
            initialData={equipmentInfo || undefined}
          />
        );
      case 4:
        return (
          <SummaryStep 
            personalInfo={personalInfo}
            vehicleInfo={vehicleInfo}
            equipmentInfo={equipmentInfo}
            rallyInfo={rally}
            onPrevStep={handlePrevStep}
            onRestart={handleRestartRegistration}
            onSubmit={handleSubmitRegistration}
          />
        );
      default:
        return null;
    }
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
            <h2 className="text-xl font-semibold mb-4">Processus d'engagement</h2>
            <p className="text-gray-600 mb-4">
              {user?.email ? `Vous êtes connecté en tant que ${user.email}.` : ""}
              {" "}Complétez le formulaire ci-dessous pour vous engager.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red"></div>
            </div>
          ) : (
            <>
              <RegistrationSteps currentStep={currentStep} setCurrentStep={setCurrentStep} />
              {renderCurrentStep()}
            </>
          )}
        </div>
      </main>
      <RallyFooter />
    </div>
  );
};

export default Registration;
