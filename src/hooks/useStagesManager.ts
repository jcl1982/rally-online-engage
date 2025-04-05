
import { useState } from 'react';
import { StageItem, StageFormData } from '@/types/stage';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export const useStagesManager = () => {
  const [stages, setStages] = useState<StageItem[]>([
    {
      id: '1',
      name: 'ES1 - Col du Turini',
      distance: '12.5',
      location: 'Alpes-Maritimes, France',
      description: 'Une montée technique dans les Alpes-Maritimes',
    },
    {
      id: '2',
      name: 'ES2 - Col de Braus',
      distance: '8.2',
      location: 'Alpes-Maritimes, France',
      description: 'Descente rapide avec de nombreux virages en épingle',
    },
  ]);
  const [currentStage, setCurrentStage] = useState<StageItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const addStage = (data: StageFormData) => {
    const newStage: StageItem = {
      id: uuidv4(),
      ...data,
    };
    setStages([...stages, newStage]);
    toast.success('Épreuve ajoutée avec succès');
    return Promise.resolve();
  };

  const updateStage = (data: StageFormData) => {
    if (!currentStage) return Promise.reject('Aucune épreuve sélectionnée');
    
    const updatedStages = stages.map(stage => 
      stage.id === currentStage.id ? { ...stage, ...data } : stage
    );
    
    setStages(updatedStages);
    toast.success('Épreuve mise à jour avec succès');
    return Promise.resolve();
  };

  const deleteStage = (stage: StageItem) => {
    const updatedStages = stages.filter(s => s.id !== stage.id);
    setStages(updatedStages);
    toast.success('Épreuve supprimée avec succès');
  };

  const openAddModal = () => {
    setCurrentStage(null);
    setModalOpen(true);
  };

  const openEditModal = (stage: StageItem) => {
    setCurrentStage(stage);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (data: StageFormData) => {
    return currentStage ? updateStage(data) : addStage(data);
  };

  return {
    stages,
    currentStage,
    modalOpen,
    openAddModal,
    openEditModal,
    closeModal,
    handleSubmit,
    deleteStage,
  };
};
