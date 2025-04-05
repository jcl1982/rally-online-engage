
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";
import HeroSection from "@/components/HeroSection";
import RegistrationSteps from "@/components/RegistrationSteps";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import VehicleForm from "@/components/VehicleForm";
import EquipmentForm from "@/components/EquipmentForm";
import SummaryStep from "@/components/SummaryStep";

const Index = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // État pour stocker les données des différents formulaires
  const [personalInfo, setPersonalInfo] = useState<any>(null);
  const [vehicleInfo, setVehicleInfo] = useState<any>(null);
  const [equipmentInfo, setEquipmentInfo] = useState<any>(null);

  const startRegistration = () => {
    setIsRegistering(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePersonalInfoSubmit = (data: any) => {
    setPersonalInfo(data);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleVehicleInfoSubmit = (data: any) => {
    setVehicleInfo(data);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEquipmentInfoSubmit = (data: any) => {
    setEquipmentInfo(data);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRestart = () => {
    setPersonalInfo(null);
    setVehicleInfo(null);
    setEquipmentInfo(null);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <RallyHeader />
      
      {!isRegistering ? (
        <HeroSection onStartRegistration={startRegistration} />
      ) : (
        <div className="container mx-auto px-4 py-8 flex-grow">
          <RegistrationSteps
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />

          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <PersonalInfoForm
                onSubmitStep={handlePersonalInfoSubmit}
                initialData={personalInfo}
              />
            )}

            {currentStep === 2 && (
              <VehicleForm
                onPrevStep={() => setCurrentStep(1)}
                onSubmitStep={handleVehicleInfoSubmit}
                initialData={vehicleInfo}
              />
            )}

            {currentStep === 3 && (
              <EquipmentForm
                onPrevStep={() => setCurrentStep(2)}
                onSubmitStep={handleEquipmentInfoSubmit}
                initialData={equipmentInfo}
              />
            )}

            {currentStep === 4 && (
              <SummaryStep
                personalInfo={personalInfo}
                vehicleInfo={vehicleInfo}
                equipmentInfo={equipmentInfo}
                onPrevStep={() => setCurrentStep(3)}
                onRestart={handleRestart}
              />
            )}
          </AnimatePresence>
        </div>
      )}

      <RallyFooter />
    </div>
  );
};

export default Index;
