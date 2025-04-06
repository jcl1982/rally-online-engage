
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";
import { RallyPlanningForm } from "@/components/organizer/rally/RallyPlanningForm";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";

const RallyPlanning = () => {
  const navigate = useNavigate();
  const { profile, isLoading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  
  // Rediriger si l'utilisateur n'est pas un organisateur ou un administrateur
  if (!isLoading && profile && profile.role !== 'organizer' && profile.role !== 'admin') {
    navigate('/');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <RallyHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Planifier un Rallye</h1>
            <p className="text-gray-600">
              Configurez les détails de votre nouveau rallye
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red"></div>
            </div>
          ) : (
            <RallyPlanningForm 
              isSubmitting={submitting}
              setIsSubmitting={setSubmitting}
            />
          )}
        </motion.div>
      </main>
      <RallyFooter />
    </div>
  );
};

export default RallyPlanning;
