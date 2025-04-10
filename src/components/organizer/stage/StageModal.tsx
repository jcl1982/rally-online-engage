
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

interface Stage {
  id: string;
  name: string;
  location: string;
  distance: number;
  description?: string;
  status: string;
  route_type?: string;
  difficulty_level?: string;
  stage_order?: number;
}

interface StageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (stageData: any) => void;
  stage: Stage | null;
  rallyId: string;
}

export const StageModal = ({ isOpen, onClose, onSave, stage, rallyId }: StageModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    distance: "",
    description: "",
    status: "planned",
    route_type: "mixed",
    difficulty_level: "medium",
    stage_order: "",
    rally_id: rallyId
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rallies, setRallies] = useState<{id: string, name: string}[]>([]);

  // Charger les rallyes disponibles
  useEffect(() => {
    const fetchRallies = async () => {
      try {
        const { data, error } = await supabase
          .from('rallies')
          .select('id, name')
          .order('name', { ascending: true });
          
        if (error) throw error;
        
        if (data) {
          setRallies(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des rallyes:", error);
      }
    };
    
    fetchRallies();
  }, []);

  useEffect(() => {
    if (stage) {
      setFormData({
        name: stage.name || "",
        location: stage.location || "",
        distance: stage.distance ? String(stage.distance) : "",
        description: stage.description || "",
        status: stage.status || "planned",
        route_type: stage.route_type || "mixed",
        difficulty_level: stage.difficulty_level || "medium",
        stage_order: stage.stage_order ? String(stage.stage_order) : "",
        rally_id: rallyId
      });
    } else {
      setFormData({
        name: "",
        location: "",
        distance: "",
        description: "",
        status: "planned",
        route_type: "mixed",
        difficulty_level: "medium",
        stage_order: "",
        rally_id: rallyId
      });
    }
    setErrors({});
  }, [stage, isOpen, rallyId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const validationSchema = z.object({
      name: z.string().min(1, "Le nom est requis"),
      location: z.string().min(1, "Le lieu est requis"),
      distance: z.string().min(1, "La distance est requise").refine(
        (val) => !isNaN(Number(val)) && Number(val) > 0,
        "La distance doit être un nombre positif"
      ),
      status: z.string().min(1, "Le statut est requis"),
      route_type: z.string(),
      difficulty_level: z.string(),
      stage_order: z.string().refine(
        (val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0),
        "L'ordre doit être un nombre positif"
      ),
      rally_id: z.string().min(1, "Un rallye doit être sélectionné"),
    });

    try {
      validationSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Convert string values to appropriate types
    const dataToSubmit = {
      name: formData.name,
      location: formData.location,
      description: formData.description,
      distance: parseFloat(formData.distance),
      status: formData.status,
      route_type: formData.route_type,
      difficulty_level: formData.difficulty_level,
      rally_id: formData.rally_id,
      stage_order: formData.stage_order ? parseInt(formData.stage_order) : null,
    };

    onSave(dataToSubmit);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{stage ? "Modifier l'épreuve" : "Ajouter une épreuve"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de l'épreuve*</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="ES1 - Nom de l'épreuve"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rally_id">Rallye*</Label>
              <Select
                value={formData.rally_id}
                onValueChange={(value) => handleSelectChange("rally_id", value)}
              >
                <SelectTrigger id="rally_id">
                  <SelectValue placeholder="Sélectionner un rallye" />
                </SelectTrigger>
                <SelectContent>
                  {rallies.map((rally) => (
                    <SelectItem key={rally.id} value={rally.id}>
                      {rally.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.rally_id && <p className="text-sm text-red-500">{errors.rally_id}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lieu*</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Lieu de l'épreuve"
              />
              {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="distance">Distance (km)*</Label>
                <Input
                  id="distance"
                  name="distance"
                  value={formData.distance}
                  onChange={handleChange}
                  placeholder="0.0"
                  type="number"
                  step="0.1"
                />
                {errors.distance && <p className="text-sm text-red-500">{errors.distance}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="stage_order">Ordre</Label>
                <Input
                  id="stage_order"
                  name="stage_order"
                  value={formData.stage_order}
                  onChange={handleChange}
                  placeholder="1"
                  type="number"
                />
                {errors.stage_order && <p className="text-sm text-red-500">{errors.stage_order}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planifiée</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Terminée</SelectItem>
                    <SelectItem value="cancelled">Annulée</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty_level">Niveau de difficulté</Label>
                <Select
                  value={formData.difficulty_level}
                  onValueChange={(value) => handleSelectChange("difficulty_level", value)}
                >
                  <SelectTrigger id="difficulty_level">
                    <SelectValue placeholder="Sélectionner un niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Facile</SelectItem>
                    <SelectItem value="medium">Moyen</SelectItem>
                    <SelectItem value="hard">Difficile</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="route_type">Type de route</Label>
              <Select
                value={formData.route_type}
                onValueChange={(value) => handleSelectChange("route_type", value)}
              >
                <SelectTrigger id="route_type">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tarmac">Asphalte</SelectItem>
                  <SelectItem value="gravel">Terre</SelectItem>
                  <SelectItem value="mixed">Mixte</SelectItem>
                  <SelectItem value="snow">Neige</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description de l'épreuve..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-rally-red hover:bg-red-700">
              {stage ? "Mettre à jour" : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
