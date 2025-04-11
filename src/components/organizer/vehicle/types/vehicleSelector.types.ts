
export interface VehicleSelectorProps {
  onMakeChange?: (value: string) => void;
  onModelChange?: (value: string) => void;
  onGroupChange?: (value: string) => void;
  onClassChange?: (value: string) => void;
  initialMake?: string;
  initialModel?: string;
  initialGroup?: string;
  initialClass?: string;
  className?: string;
}
