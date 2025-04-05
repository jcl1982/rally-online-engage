
import { motion } from "framer-motion";

const RallyHeader = () => {
  return (
    <motion.header 
      className="py-6 bg-rally-black text-white mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="text-rally-red">Rally</span>Engage
            </h1>
            <p className="text-sm md:text-base text-gray-300">Plateforme d'engagement en ligne pour rallyes automobiles</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline text-sm border-l-2 border-rally-red pl-4 py-1">
              Simplifiez votre engagement en rallye
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default RallyHeader;
