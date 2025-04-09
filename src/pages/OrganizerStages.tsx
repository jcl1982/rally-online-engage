
import { motion } from "framer-motion";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";
import { StageManagement } from "@/components/organizer/StageManagement";
import OrganizerNavigation from "@/components/navigation/OrganizerNavigation";

const OrganizerStages = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <RallyHeader />
      <OrganizerNavigation currentSection="stages" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Gestion des Épreuves</h1>
            <p className="text-gray-600">Ajoutez, modifiez ou supprimez des épreuves pour vos rallyes</p>
          </div>

          <StageManagement />
        </motion.div>
      </main>
      <RallyFooter />
    </div>
  );
};

export default OrganizerStages;
