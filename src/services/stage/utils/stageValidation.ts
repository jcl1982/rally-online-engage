
import { StageFormValues, TimingPointFormValues } from '@/types/stage.types';

// Fonctions d'aide pour la validation des données d'épreuve et de points de chronométrage
export const stageValidation = {
  // Valider les données d'une épreuve
  validateStageData(data: Partial<StageFormValues>): { isValid: boolean; error?: string } {
    if (!data.name || data.name.trim().length === 0) {
      return { isValid: false, error: "Le nom de l'épreuve est requis" };
    }
    
    if (!data.location || data.location.trim().length === 0) {
      return { isValid: false, error: "L'emplacement de l'épreuve est requis" };
    }
    
    if (data.distance === undefined || data.distance <= 0) {
      return { isValid: false, error: "La distance doit être supérieure à 0" };
    }
    
    return { isValid: true };
  },
  
  // Valider les données d'un point de chronométrage
  validateTimingPointData(data: Partial<TimingPointFormValues>): { isValid: boolean; error?: string } {
    if (!data.name || data.name.trim().length === 0) {
      return { isValid: false, error: "Le nom du point est requis" };
    }
    
    if (data.latitude === undefined || data.longitude === undefined) {
      return { isValid: false, error: "Les coordonnées du point sont requises" };
    }
    
    if (data.point_type === undefined) {
      return { isValid: false, error: "Le type de point est requis" };
    }
    
    if (data.order_index === undefined || data.order_index < 0) {
      return { isValid: false, error: "L'ordre du point est requis et doit être positif" };
    }
    
    return { isValid: true };
  }
};
