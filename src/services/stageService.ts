
import { stageBasicService } from './stage/stageBasicService';
import { stageTimingPointsService } from './stage/stageTimingPointsService';
import type { StageFormValues, TimingPointFormValues } from '@/types/stage.types';

// Réexporter les services pour maintenir la compatibilité avec le code existant
export const stageService = {
  // Opérations CRUD de base sur les épreuves
  getStagesByRallyId: stageBasicService.getStagesByRallyId,
  getStageById: stageBasicService.getStageById,
  createStage: stageBasicService.createStage,
  updateStage: stageBasicService.updateStage,
  deleteStage: stageBasicService.deleteStage,
  
  // Opérations sur les points de chronométrage
  getTimingPointsByStageId: stageTimingPointsService.getTimingPointsByStageId,
  createTimingPoint: stageTimingPointsService.createTimingPoint,
  updateTimingPoint: stageTimingPointsService.updateTimingPoint,
  deleteTimingPoint: stageTimingPointsService.deleteTimingPoint
};

// Exporter les types depuis les services pour la compatibilité
export type { StageFormValues, TimingPointFormValues };
