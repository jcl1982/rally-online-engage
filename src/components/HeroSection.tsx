
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onStartRegistration: () => void;
}

const HeroSection = ({ onStartRegistration }: HeroSectionProps) => {
  return (
    <div className="relative bg-rally-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-rally-black to-transparent opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600064597260-c3a1ec6e2b39?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-rally-red">Rally</span>Engage
          </motion.h1>
          
          <motion.h2 
            className="text-2xl md:text-3xl font-semibold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Simplifiez votre engagement en rallye
          </motion.h2>
          
          <motion.p 
            className="text-lg mb-8 text-gray-300 max-w-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Remplissez votre feuille d'engagement et enregistrez vos équipements en quelques clics. 
            Une solution rapide et sécurisée conforme aux exigences des fédérations sportives.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              onClick={onStartRegistration}
              size="lg" 
              className="bg-rally-red hover:bg-red-700 text-white"
            >
              Commencer mon engagement
            </Button>
          </motion.div>
        </div>
      </div>
      
      <div className="hidden md:block absolute right-0 bottom-0 w-1/4 h-2 bg-rally-red"></div>
    </div>
  );
};

export default HeroSection;
