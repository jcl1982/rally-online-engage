
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

interface Step {
  id: number;
  name: string;
  description: string;
}

interface RegistrationStepsProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const steps: Step[] = [
  {
    id: 1,
    name: "Pilote & Co-pilote",
    description: "Informations personnelles",
  },
  {
    id: 2,
    name: "Véhicule",
    description: "Détails du véhicule de course",
  },
  {
    id: 3,
    name: "Équipements",
    description: "Équipements de sécurité",
  },
  {
    id: 4,
    name: "Récapitulatif",
    description: "Validation et soumission",
  },
];

const RegistrationSteps = ({
  currentStep,
  setCurrentStep,
}: RegistrationStepsProps) => {
  return (
    <div className="mb-8">
      <div className="hidden sm:block">
        <ol className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {steps.map((step) => (
            <li key={step.id} className="relative">
              <button
                type="button"
                onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                className={cn(
                  "group flex w-full items-center",
                  currentStep > step.id ? "cursor-pointer" : "cursor-default"
                )}
              >
                <span
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md w-full",
                    currentStep === step.id
                      ? "bg-rally-red text-white"
                      : currentStep > step.id
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-500"
                  )}
                >
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center mr-2 rounded-full border-2 border-current">
                    {currentStep > step.id ? (
                      <CheckIcon className="w-4 h-4" />
                    ) : (
                      step.id
                    )}
                  </span>
                  <span className="font-medium">{step.name}</span>
                </span>
              </button>

              {step.id < steps.length && (
                <div
                  className={cn(
                    "hidden md:block absolute top-0 right-0 h-full w-5",
                    "transform translate-x-1/2 translate-y-7"
                  )}
                >
                  <div
                    className={cn(
                      "h-0.5 w-full",
                      currentStep > step.id
                        ? "bg-green-600"
                        : "bg-gray-300"
                    )}
                  />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="sm:hidden">
        <p className="text-sm font-medium text-gray-500 mb-1">
          Étape {currentStep} sur {steps.length}
        </p>
        <h3 className="text-lg font-medium text-gray-900">
          {steps[currentStep - 1].name}
        </h3>
        <p className="text-sm text-gray-500">
          {steps[currentStep - 1].description}
        </p>
      </div>
    </div>
  );
};

export default RegistrationSteps;
