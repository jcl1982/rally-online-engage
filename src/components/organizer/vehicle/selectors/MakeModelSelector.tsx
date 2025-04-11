
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { carMakes, carModels } from "../constants/vehicleData";

interface MakeModelSelectorProps {
  selectedMake: string;
  selectedModel: string;
  onMakeChange: (value: string) => void;
  onModelChange: (value: string) => void;
}

export const MakeModelSelector: React.FC<MakeModelSelectorProps> = ({
  selectedMake,
  selectedModel,
  onMakeChange,
  onModelChange,
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="make">Marque</Label>
        <Select
          value={selectedMake}
          onValueChange={onMakeChange}
        >
          <SelectTrigger id="make">
            <SelectValue placeholder="Sélectionner une marque" />
          </SelectTrigger>
          <SelectContent>
            {carMakes.map((make) => (
              <SelectItem key={make} value={make}>
                {make}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="model">Modèle</Label>
        <Select
          value={selectedModel}
          onValueChange={onModelChange}
          disabled={!selectedMake}
        >
          <SelectTrigger id="model">
            <SelectValue placeholder="Sélectionner un modèle" />
          </SelectTrigger>
          <SelectContent>
            {selectedMake && carModels[selectedMake] ? (
              carModels[selectedMake].map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))
            ) : (
              <SelectItem key="no-model-placeholder" value="no-model">
                Sélectionnez d'abord une marque
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
