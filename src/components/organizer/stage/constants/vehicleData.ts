
// Vehicle data for selectors

// Données pour les listes déroulantes
export const carMakes = [
  "Alfa Romeo", "Alpine", "Aston Martin", "Audi", "BMW", "Citroën", "Dacia",
  "Ferrari", "Fiat", "Ford", "Honda", "Hyundai", "Jaguar", "Kia", "Lancia",
  "Land Rover", "Lexus", "Maserati", "Mazda", "Mercedes-Benz", "Mini", "Mitsubishi", 
  "Nissan", "Opel", "Peugeot", "Porsche", "Renault", "Seat", "Skoda", "Subaru", 
  "Suzuki", "Toyota", "Volkswagen", "Volvo"
];

// Modèles par marque
export const carModels: Record<string, string[]> = {
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
export const carGroups = [
  "Groupe A", "Groupe N", "Groupe R", "Groupe B",
  "WRC", "Rally1", "Rally2", "Rally3", "Rally4", "Rally5",
  "RC1", "RC2", "RC3", "RC4", "RC5"
];

// Classes par groupe
export const carClasses: Record<string, string[]> = {
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
