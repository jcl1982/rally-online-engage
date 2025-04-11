
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { carGroups, carClasses } from "../constants/vehicleData";

interface GroupClassSelectorProps {
  selectedGroup: string;
  selectedClass: string;
  onGroupChange: (value: string) => void;
  onClassChange: (value: string) => void;
}

export const GroupClassSelector: React.FC<GroupClassSelectorProps> = ({
  selectedGroup,
  selectedClass,
  onGroupChange,
  onClassChange,
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="group">Groupe</Label>
        <Select
          value={selectedGroup}
          onValueChange={onGroupChange}
        >
          <SelectTrigger id="group">
            <SelectValue placeholder="Sélectionner un groupe" />
          </SelectTrigger>
          <SelectContent>
            {carGroups.map((group) => (
              <SelectItem key={group} value={group}>
                {group}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="class">Classe</Label>
        <Select
          value={selectedClass}
          onValueChange={onClassChange}
          disabled={!selectedGroup}
        >
          <SelectTrigger id="class">
            <SelectValue placeholder="Sélectionner une classe" />
          </SelectTrigger>
          <SelectContent>
            {selectedGroup && carClasses[selectedGroup] ? (
              carClasses[selectedGroup].map((carClass) => (
                <SelectItem key={carClass} value={carClass}>
                  {carClass}
                </SelectItem>
              ))
            ) : (
              <SelectItem key="no-class-placeholder" value="no-class">
                Sélectionnez d'abord un groupe
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
