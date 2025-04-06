
import { motion } from "framer-motion";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";
import { CrewManager } from "@/components/organizer/crew/CrewManager";

const OrganizerCrews = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <RallyHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Gestion des Équipages</h1>
            <p className="text-gray-600">Consultez et gérez les équipages inscrits à vos rallyes</p>
          </div>

          <CrewManager />
        </motion.div>
      </main>
      <RallyFooter />
    </div>
  );
};

export default OrganizerCrews;
