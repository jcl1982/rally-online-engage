
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Données pour les listes déroulantes
const carMakes = [
  "Alfa Romeo", "Alpine", "Aston Martin", "Audi", "BMW", "Citroën", "Dacia", "DS", 
  "Ferrari", "Fiat", "Ford", "Honda", "Hyundai", "Jaguar", "Kia", "Lancia",
  "Land Rover", "Lexus", "Maserati", "Mazda", "Mercedes-Benz", "Mini", "Mitsubishi", 
  "Nissan", "Opel", "Peugeot", "Porsche", "Renault", "Seat", "Skoda", "Subaru", 
  "Suzuki", "Toyota", "Volkswagen", "Volvo"
];

// Modèles par marque (exemple simplifié)
const carModels: Record<string, string[]> = {
  "Alfa Romeo": ["Giulia", "Stelvio", "Tonale"],
  "Alpine": ["A110", "A310", "A610"],
  "Audi": ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q3", "Q5", "Q7", "TT", "R8"],
  "BMW": ["Série 1", "Série 2", "Série 3", "Série 4", "Série 5", "Série 7", "X1", "X3", "X5"],
  "Citroën": ["C3", "C4", "C5", "DS3", "DS4", "Xsara", "Saxo", "ZX", "AX"],
  "Ford": ["Fiesta", "Focus", "Mondeo", "Puma", "Kuga", "Mustang", "Escort", "Sierra"],
  "Hyundai": ["i20", "i30", "i40", "Kona", "Tucson", "Santa Fe"],
  "Lancia": ["Delta", "Stratos", "037", "Beta", "Fulvia"],
  "Mitsubishi": ["Lancer", "Lancer Evolution", "Outlander", "ASX", "Pajero"],
  "Peugeot": ["106", "205", "206", "207", "208", "306", "307", "308", "309", "405", "406", "407"],
  "Renault": ["Clio", "Megane", "Twingo", "Captur", "Kadjar", "R5", "Alpine"],
  "Seat": ["Ibiza", "Leon", "Ateca", "Arona"],
  "Skoda": ["Fabia", "Octavia", "Karoq", "Kodiaq", "Superb"],
  "Subaru": ["Impreza", "Forester", "Legacy", "BRZ", "WRX STI"],
  "Toyota": ["Yaris", "Corolla", "RAV4", "Supra", "Celica", "GR Yaris"],
  "Volkswagen": ["Polo", "Golf", "Passat", "Tiguan", "T-Roc", "Touareg"],
  // Ajouter d'autres marques et modèles au besoin
};

// Groupes de voitures pour rallye
const carGroups = [
  "Groupe A", "Groupe N", "Groupe R", "Groupe B (historique)", 
  "WRC", "Rally2", "Rally3", "Rally4", "Rally5", "RC1", "RC2", "RC3", "RC4", "RC5"
];

// Classes par groupe
const carClasses: Record<string, string[]> = {
  "Groupe A": ["A5", "A6", "A7", "A8"],
  "Groupe N": ["N1", "N2", "N3", "N4"],
  "Groupe R": ["R1", "R2", "R3", "R4", "R5"],
  "Rally2": ["Rally2", "R5"],
  "Rally3": ["Rally3"],
  "Rally4": ["Rally4", "R2"],
  "Rally5": ["Rally5", "R1"],
  "RC1": ["WRC"],
  "RC2": ["Rally2", "R5", "N4", "S2000"],
  "RC3": ["Rally3", "R3", "S1600"],
  "RC4": ["Rally4", "R2", "A6"],
  "RC5": ["Rally5", "R1", "A5", "N1"],
  // Ajouter d'autres groupes et classes au besoin
};

interface VehicleSelectorsProps {
  onMakeChange?: (make: string) => void;
  onModelChange?: (model: string) => void;
  onGroupChange?: (group: string) => void;
  onClassChange?: (carClass: string) => void;
  initialMake?: string;
  initialModel?: string;
  initialGroup?: string;
  initialClass?: string;
}

export const VehicleSelectors: React.FC<VehicleSelectorsProps> = ({
  onMakeChange,
  onModelChange,
  onGroupChange,
  onClassChange,
  initialMake,
  initialModel,
  initialGroup,
  initialClass
}) => {
  const [selectedMake, setSelectedMake] = useState<string>(initialMake || "");
  const [selectedGroup, setSelectedGroup] = useState<string>(initialGroup || "");

  const handleMakeChange = (make: string) => {
    setSelectedMake(make);
    if (onMakeChange) onMakeChange(make);
  };

  const handleModelChange = (model: string) => {
    if (onModelChange) onModelChange(model);
  };

  const handleGroupChange = (group: string) => {
    setSelectedGroup(group);
    if (onGroupChange) onGroupChange(group);
  };

  const handleClassChange = (carClass: string) => {
    if (onClassChange) onClassChange(carClass);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sélecteur de marque */}
        <div className="space-y-2">
          <Label htmlFor="car-make">Marque</Label>
          <Select 
            value={selectedMake} 
            onValueChange={handleMakeChange}
          >
            <SelectTrigger id="car-make">
              <SelectValue placeholder="Sélectionner une marque" />
            </SelectTrigger>
            <SelectContent>
              {carMakes.map(make => (
                <SelectItem key={make} value={make}>
                  {make}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sélecteur de modèle (dépendant de la marque sélectionnée) */}
        <div className="space-y-2">
          <Label htmlFor="car-model">Modèle</Label>
          <Select 
            value={initialModel || ""} 
            onValueChange={handleModelChange}
            disabled={!selectedMake}
          >
            <SelectTrigger id="car-model">
              <SelectValue placeholder="Sélectionner un modèle" />
            </SelectTrigger>
            <SelectContent>
              {selectedMake && carModels[selectedMake] ? 
                carModels[selectedMake].map(model => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                )) : 
                <SelectItem value="">Sélectionner d'abord une marque</SelectItem>
              }
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sélecteur de groupe */}
        <div className="space-y-2">
          <Label htmlFor="car-group">Groupe</Label>
          <Select 
            value={selectedGroup} 
            onValueChange={handleGroupChange}
          >
            <SelectTrigger id="car-group">
              <SelectValue placeholder="Sélectionner un groupe" />
            </SelectTrigger>
            <SelectContent>
              {carGroups.map(group => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sélecteur de classe (dépendant du groupe sélectionné) */}
        <div className="space-y-2">
          <Label htmlFor="car-class">Classe</Label>
          <Select 
            value={initialClass || ""} 
            onValueChange={handleClassChange}
            disabled={!selectedGroup}
          >
            <SelectTrigger id="car-class">
              <SelectValue placeholder="Sélectionner une classe" />
            </SelectTrigger>
            <SelectContent>
              {selectedGroup && carClasses[selectedGroup] ? 
                carClasses[selectedGroup].map(carClass => (
                  <SelectItem key={carClass} value={carClass}>
                    {carClass}
                  </SelectItem>
                )) : 
                <SelectItem value="">Sélectionner d'abord un groupe</SelectItem>
              }
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
