
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { StageManagement } from "@/components/organizer/StageManagement";
import { toast } from "sonner";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";

const Organizer = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <RallyHeader />
      <motion.main 
        className="flex-grow container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-8 border-b pb-4">Espace Organisateur</h1>
        <StageManagement />
      </motion.main>
      <RallyFooter />
    </div>
  );
};

export default Organizer;
