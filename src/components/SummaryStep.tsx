
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

interface SummaryProps {
  personalInfo: any;
  vehicleInfo: any;
  equipmentInfo: any;
  onPrevStep: () => void;
  onRestart: () => void;
}

const SummaryStep = ({
  personalInfo,
  vehicleInfo,
  equipmentInfo,
  onPrevStep,
  onRestart,
}: SummaryProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitRegistration = () => {
    // Simuler l'envoi à un serveur
    setTimeout(() => {
      setIsSubmitted(true);
      toast.success("Votre inscription a été soumise avec succès !");
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center py-12"
      >
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Inscription confirmée !
        </h2>
        <p className="mb-8 text-gray-600">
          Votre engagement au rallye a été enregistré avec succès. Vous recevrez
          prochainement un email de confirmation avec tous les détails.
        </p>
        <Button
          onClick={onRestart}
          className="bg-rally-red hover:bg-red-700"
        >
          Nouvelle inscription
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="rallyForm"
    >
      <div className="rallyFormSection">
        <h3 className="rallyFormTitle">Récapitulatif de l'inscription</h3>
        <p className="text-gray-500 mb-6">
          Veuillez vérifier toutes les informations avant de soumettre votre
          inscription.
        </p>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2 text-rally-red">
            Équipage
          </h4>
          <Separator className="mb-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4 bg-gray-50">
              <h5 className="font-semibold mb-2">Pilote</h5>
              <p>
                <span className="font-medium">Nom:</span>{" "}
                {personalInfo.driverLastName} {personalInfo.driverFirstName}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {personalInfo.driverEmail}
              </p>
              <p>
                <span className="font-medium">Téléphone:</span>{" "}
                {personalInfo.driverPhone}
              </p>
              <p>
                <span className="font-medium">Licence:</span>{" "}
                {personalInfo.driverLicenseNumber} (
                {personalInfo.driverLicenseCategory})
              </p>
              {personalInfo.driverBloodType && (
                <p>
                  <span className="font-medium">Groupe sanguin:</span>{" "}
                  {personalInfo.driverBloodType}
                </p>
              )}
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <h5 className="font-semibold mb-2">Co-pilote</h5>
              <p>
                <span className="font-medium">Nom:</span>{" "}
                {personalInfo.coDriverLastName} {personalInfo.coDriverFirstName}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {personalInfo.coDriverEmail}
              </p>
              <p>
                <span className="font-medium">Téléphone:</span>{" "}
                {personalInfo.coDriverPhone}
              </p>
              <p>
                <span className="font-medium">Licence:</span>{" "}
                {personalInfo.coDriverLicenseNumber} (
                {personalInfo.coDriverLicenseCategory})
              </p>
              {personalInfo.coDriverBloodType && (
                <p>
                  <span className="font-medium">Groupe sanguin:</span>{" "}
                  {personalInfo.coDriverBloodType}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2 text-rally-red">
            Véhicule
          </h4>
          <Separator className="mb-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4 bg-gray-50">
              <h5 className="font-semibold mb-2">Informations générales</h5>
              <p>
                <span className="font-medium">Marque & Modèle:</span>{" "}
                {vehicleInfo.make} {vehicleInfo.model} ({vehicleInfo.year})
              </p>
              <p>
                <span className="font-medium">Immatriculation:</span>{" "}
                {vehicleInfo.registrationNumber}
              </p>
              <p>
                <span className="font-medium">N° de châssis:</span>{" "}
                {vehicleInfo.chassisNumber}
              </p>
              <p>
                <span className="font-medium">N° de moteur:</span>{" "}
                {vehicleInfo.engineNumber}
              </p>
              <p>
                <span className="font-medium">Cylindrée:</span>{" "}
                {vehicleInfo.engineCapacity}
              </p>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <h5 className="font-semibold mb-2">Classification</h5>
              <p>
                <span className="font-medium">Catégorie:</span>{" "}
                {vehicleInfo.category}
              </p>
              <p>
                <span className="font-medium">Groupe:</span>{" "}
                {vehicleInfo.group}
              </p>
              <p>
                <span className="font-medium">Classe:</span>{" "}
                {vehicleInfo.class}
              </p>
              <p>
                <span className="font-medium">N° d'homologation:</span>{" "}
                {vehicleInfo.homologationNumber}
              </p>
              <p>
                <span className="font-medium">N° de passeport technique:</span>{" "}
                {vehicleInfo.technicalPassportNumber}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2 text-rally-red">
            Équipements de sécurité
          </h4>
          <Separator className="mb-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <h5 className="font-semibold mb-2">Équipement du pilote</h5>
              <p>
                <span className="font-medium">Casque:</span>{" "}
                {equipmentInfo.driverHelmet.brand}{" "}
                {equipmentInfo.driverHelmet.model} (Expire:{" "}
                {equipmentInfo.driverHelmet.expirationDate})
              </p>
              <p>
                <span className="font-medium">Combinaison:</span>{" "}
                {equipmentInfo.driverSuit.brand} (Expire:{" "}
                {equipmentInfo.driverSuit.expirationDate})
              </p>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <h5 className="font-semibold mb-2">Équipement du co-pilote</h5>
              <p>
                <span className="font-medium">Casque:</span>{" "}
                {equipmentInfo.coDriverHelmet.brand}{" "}
                {equipmentInfo.coDriverHelmet.model} (Expire:{" "}
                {equipmentInfo.coDriverHelmet.expirationDate})
              </p>
              <p>
                <span className="font-medium">Combinaison:</span>{" "}
                {equipmentInfo.coDriverSuit.brand} (Expire:{" "}
                {equipmentInfo.coDriverSuit.expirationDate})
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4 bg-gray-50">
              <h5 className="font-semibold mb-2">Équipement du véhicule</h5>
              <p>
                <span className="font-medium">Sièges:</span>{" "}
                {equipmentInfo.seats.brand} (Expire:{" "}
                {equipmentInfo.seats.expirationDate})
              </p>
              <p>
                <span className="font-medium">Harnais:</span>{" "}
                {equipmentInfo.belts.brand} (Expire:{" "}
                {equipmentInfo.belts.expirationDate})
              </p>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <h5 className="font-semibold mb-2">
                Équipements obligatoires
              </h5>
              <ul className="list-disc pl-5">
                <li className={equipmentInfo.hasFIA_HANS ? "text-green-600" : "text-red-600"}>
                  Système HANS homologué FIA
                </li>
                <li className={equipmentInfo.hasExtinguisher ? "text-green-600" : "text-red-600"}>
                  Extincteur automatique
                </li>
                <li className={equipmentInfo.hasFirstAidKit ? "text-green-600" : "text-red-600"}>
                  Kit de premier secours
                </li>
                <li className={equipmentInfo.hasTowRope ? "text-green-600" : "text-red-600"}>
                  Sangle de remorquage
                </li>
                <li className={equipmentInfo.hasWarningTriangle ? "text-green-600" : "text-red-600"}>
                  Triangle de signalisation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button type="button" variant="outline" onClick={onPrevStep}>
          Précédent: Équipements
        </Button>
        <Button
          type="button"
          className="bg-rally-red hover:bg-red-700"
          onClick={handleSubmitRegistration}
        >
          Soumettre l'engagement
        </Button>
      </div>
    </motion.div>
  );
};

export default SummaryStep;
