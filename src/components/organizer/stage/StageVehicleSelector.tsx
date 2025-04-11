
import { useState, useEffect } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface StageVehicleSelectorProps {
  form: any;
}

export const StageVehicleSelector = ({ form }: StageVehicleSelectorProps) => {
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  useEffect(() => {
    // Reset model when make changes
    if (form.getValues("model") && !carModels[selectedMake]?.includes(form.getValues("model"))) {
      form.setValue("model", "");
    }
  }, [selectedMake, form]);

  useEffect(() => {
    // Reset class when group changes
    if (form.getValues("vehicleClass") && !carClasses[selectedGroup]?.includes(form.getValues("vehicleClass"))) {
      form.setValue("vehicleClass", "");
    }
  }, [selectedGroup, form]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Informations véhicule</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="make"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marque</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedMake(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une marque" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {carMakes.map((make) => (
                    <SelectItem key={make} value={make}>
                      {make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modèle</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!selectedMake}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un modèle" />
                  </SelectTrigger>
                </FormControl>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Groupe</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedGroup(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un groupe" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {carGroups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vehicleClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Classe</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!selectedGroup}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une classe" />
                  </SelectTrigger>
                </FormControl>
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
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
