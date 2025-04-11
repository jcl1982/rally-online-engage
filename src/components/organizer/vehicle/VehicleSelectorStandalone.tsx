
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Données pour les listes déroulantes
const carMakes = [
  "Alfa Romeo", "Alpine", "Aston Martin", "Audi", "BMW", "Citroën", "Dacia",
  "Ferrari", "Fiat", "Ford", "Honda", "Hyundai", "Jaguar", "Kia", "Lancia",
  "Land Rover", "Lexus", "Maserati", "Mazda", "Mercedes-Benz", "Mini", "Mitsubishi", 
  "Nissan", "Opel", "Peugeot", "Porsche", "Renault", "Seat", "Skoda", "Subaru", 
  "Suzuki", "Toyota", "Volkswagen", "Volvo"
];

// Modèles par marque
const carModels: Record<string, string[]> = {
  "Alfa Romeo": ["Giulia", "Stelvio", "Tonale"],
  "Alpine": ["A110", "A310", "A610"],
  "Audi": ["A1", "A3", "A4", "A5", "Q3", "Q5", "TT", "R8"],
  "BMW": ["Série 1", "Série 3", "Série 5", "X1", "X3", "X5"],
  "Citroën": ["C3", "C4", "C5", "DS3", "Xsara", "Saxo", "ZX"],
  "Ford": ["Fiesta", "Focus", "Escort", "Sierra", "Puma"],
  "Hyundai": ["i20", "i30", "Kona", "Tucson"],
  "Lancia": ["Delta", "Stratos", "037", "Fulvia"],
  "Mitsubishi": ["Lancer", "Lancer Evolution", "Outlander"],
  "Peugeot": ["106", "205", "206", "208", "306", "308", "309", "405"],
  "Renault": ["Clio", "Megane", "R5", "Alpine"],
  "Seat": ["Ibiza", "Leon"],
  "Skoda": ["Fabia", "Octavia"],
  "Subaru": ["Impreza", "Forester", "WRX STI"],
  "Toyota": ["Yaris", "Corolla", "GR Yaris"],
  "Volkswagen": ["Polo", "Golf", "Passat"],
};

// Groupes de voitures
const carGroups = [
  "Groupe A", "Groupe N", "Groupe R", "Groupe B",
  "WRC", "Rally1", "Rally2", "Rally3", "Rally4", "Rally5",
  "RC1", "RC2", "RC3", "RC4", "RC5"
];

// Classes par groupe
const carClasses: Record<string, string[]> = {
  "Groupe A": ["A5", "A6", "A7", "A8"],
  "Groupe N": ["N1", "N2", "N3", "N4"],
  "Groupe R": ["R1", "R2", "R3", "R4", "R5"],
  "Rally1": ["Rally1"],
  "Rally2": ["Rally2", "R5"],
  "Rally3": ["Rally3"],
  "Rally4": ["Rally4", "R2"],
  "Rally5": ["Rally5", "R1"],
  "RC1": ["WRC"],
  "RC2": ["Rally2", "R5", "N4"],
  "RC3": ["Rally3", "R3"],
  "RC4": ["Rally4", "R2", "A6"],
  "RC5": ["Rally5", "R1", "A5"],
  "Groupe B": ["B1", "B2", "B3"]
};

interface VehicleSelectorStandaloneProps {
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

export const VehicleSelectorStandalone: React.FC<VehicleSelectorStandaloneProps> = ({
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
        <div className="space-y-2">
          <Label htmlFor="make">Marque</Label>
          <Select
            value={selectedMake}
            onValueChange={handleMakeChange}
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
            onValueChange={handleModelChange}
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
                <SelectItem value="" disabled>
                  Sélectionnez d'abord une marque
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="group">Groupe</Label>
          <Select
            value={selectedGroup}
            onValueChange={handleGroupChange}
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
            onValueChange={handleClassChange}
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
                <SelectItem value="" disabled>
                  Sélectionnez d'abord un groupe
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
