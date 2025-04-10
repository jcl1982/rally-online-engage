
import { StageFormValues } from '@/types/stage.types';
import { TimingPointFormValues } from '@/types/stage.types';

// Validation functions for stage data
export const validateStageData = (data: StageFormValues): boolean => {
  // Basic validation
  if (!data.name || !data.location || !data.distance) {
    return false;
  }
  
  // Distance must be greater than 0
  if (data.distance <= 0) {
    return false;
  }
  
  return true;
};

// Validation functions for timing point data
export const validateTimingPointData = (data: TimingPointFormValues): boolean => {
  // Basic validation
  if (!data.name || !data.latitude || !data.longitude) {
    return false;
  }
  
  // Order index must be a non-negative integer
  if (data.order_index < 0 || !Number.isInteger(data.order_index)) {
    return false;
  }
  
  // Point type must be one of the allowed values
  if (!['start', 'split', 'finish'].includes(data.point_type)) {
    return false;
  }
  
  return true;
};
