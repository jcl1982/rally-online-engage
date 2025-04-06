
import { useState } from "react";
import { Stage } from "@/types/stage.types";

export const useStageModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState<Stage | null>(null);

  const openAddModal = () => {
    setCurrentStage(null);
    setModalOpen(true);
  };

  const openEditModal = (stage: Stage) => {
    setCurrentStage(stage);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentStage(null);
  };

  return {
    modalOpen,
    currentStage,
    openAddModal,
    openEditModal,
    closeModal
  };
};
