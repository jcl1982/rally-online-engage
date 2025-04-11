
import React, { useState } from "react";
import { MakeModelSelector } from "./selectors/MakeModelSelector";
import { GroupClassSelector } from "./selectors/GroupClassSelector";
import { VehicleSelectorProps } from "./types/vehicleSelector.types";

export const VehicleSelectorStandalone: React.FC<VehicleSelectorProps> = ({
  onMakeChange,
  onModelChange,
  onGroupChange,
  onClassChange,
  initialMake = "",
  initialModel = "",
  initialGroup = "",
  initialClass = "",
  className = "",
}) => {
  const [selectedMake, setSelectedMake] = useState<string>(initialMake);
  const [selectedModel, setSelectedModel] = useState<string>(initialModel);
  const [selectedGroup, setSelectedGroup] = useState<string>(initialGroup);
  const [selectedClass, setSelectedClass] = useState<string>(initialClass);

  const handleMakeChange = (value: string) => {
    setSelectedMake(value);
    setSelectedModel("");
    if (onMakeChange) onMakeChange(value);
  };

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    if (onModelChange) onModelChange(value);
  };

  const handleGroupChange = (value: string) => {
    setSelectedGroup(value);
    setSelectedClass("");
    if (onGroupChange) onGroupChange(value);
  };

  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    if (onClassChange) onClassChange(value);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MakeModelSelector 
          selectedMake={selectedMake}
          selectedModel={selectedModel}
          onMakeChange={handleMakeChange}
          onModelChange={handleModelChange}
        />
        
        <GroupClassSelector 
          selectedGroup={selectedGroup}
          selectedClass={selectedClass}
          onGroupChange={handleGroupChange}
          onClassChange={handleClassChange}
        />
      </div>
    </div>
  );
};
