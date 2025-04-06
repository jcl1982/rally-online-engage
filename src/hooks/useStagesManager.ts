
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import * as z from "zod";

// Schéma pour la validation des données d'une épreuve
const stageSchema = z.object({
  name: z.string().min(3, { message: "Le nom doit contenir au moins 3 caractères" }),
  location: z.string().min(3, { message: "La localisation doit contenir au moins 3 caractères" }),
  distance: z.coerce.number().min(0.1, { message: "La distance doit être supérieure à 0" }),
  description: z.string().optional(),
  status: z.enum(["planned", "active", "completed"], {
    required_error: "Le statut est requis",
  }),
  rally_id: z.string().optional()
});

export type Stage = {
  id: string;
  name: string;
  location: string;
  distance: number;
  description?: string;
  status: "planned" | "active" | "completed";
  rally_id: string;
  created_at?: string;
  updated_at?: string;
};

export const useStagesManager = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState<Stage | null>(null);
  const queryClient = useQueryClient();

  // Récupérer l'ID du premier rallye pour les tests
  const { data: defaultRally } = useQuery({
    queryKey: ["default-rally"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("rallies")
          .select("id")
          .limit(1)
          .single();

        if (error) {
          console.error("Erreur lors de la récupération du rallye par défaut:", error);
          return { id: "00000000-0000-0000-0000-000000000000" }; // ID par défaut au format UUID
        }

        return data;
      } catch (error) {
        console.error("Exception lors de la récupération du rallye par défaut:", error);
        return { id: "00000000-0000-0000-0000-000000000000" };
      }
    },
  });

  // Récupérer la liste des épreuves
  const { data: stages = [], isLoading } = useQuery({
    queryKey: ["rally-stages"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("rally_stages")
          .select("*")
          .order("name");

        if (error) {
          toast.error("Erreur lors de la récupération des épreuves");
          throw error;
        }

        return data as Stage[];
      } catch (error) {
        console.error("Exception lors de la récupération des épreuves:", error);
        toast.error("Erreur lors de la récupération des épreuves");
        return [];
      }
    },
  });

  // Ajouter une nouvelle épreuve
  const addStageMutation = useMutation({
    mutationFn: async (stageData: Omit<Stage, "id" | "created_at" | "updated_at">) => {
      console.log("Données soumises pour l'ajout:", stageData);
      
      const { data, error } = await supabase
        .from("rally_stages")
        .insert(stageData)
        .select()
        .single();

      if (error) {
        console.error("Erreur lors de l'insertion:", error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rally-stages"] });
      toast.success("Épreuve ajoutée avec succès");
    },
    onError: (error) => {
      console.error("Erreur lors de l'ajout:", error);
      toast.error("Erreur lors de l'ajout de l'épreuve");
    },
  });

  // Mettre à jour une épreuve existante
  const updateStageMutation = useMutation({
    mutationFn: async ({ id, ...stageData }: Stage) => {
      console.log("Données soumises pour la mise à jour:", { id, ...stageData });
      
      const { error } = await supabase
        .from("rally_stages")
        .update(stageData)
        .eq("id", id);

      if (error) {
        console.error("Erreur lors de la mise à jour:", error);
        throw error;
      }
      
      return { id, ...stageData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rally-stages"] });
      toast.success("Épreuve mise à jour avec succès");
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Erreur lors de la mise à jour de l'épreuve");
    },
  });

  // Supprimer une épreuve
  const deleteStageMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("rally_stages")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rally-stages"] });
      toast.success("Épreuve supprimée avec succès");
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression de l'épreuve");
    },
  });

  // Fonctions pour gérer les actions sur les épreuves
  const openAddModal = () => {
    setCurrentStage(null);
    setModalOpen(true);
  };

  const openEditModal = (stage: Stage) => {
    setCurrentStage(stage);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentStage(null);
  };

  const handleSubmit = async (values: any) => {
    try {
      // Assurez-vous que rally_id est défini et conservez une trace des valeurs
      const stageData = {
        ...values,
        rally_id: values.rally_id || defaultRally?.id || "00000000-0000-0000-0000-000000000000"
      };
      
      console.log("Données préparées pour soumission:", stageData);

      if (currentStage) {
        // Mise à jour d'une épreuve existante
        await updateStageMutation.mutateAsync({
          ...stageData,
          id: currentStage.id,
        } as Stage);
      } else {
        // Ajout d'une nouvelle épreuve
        await addStageMutation.mutateAsync(stageData as Omit<Stage, "id" | "created_at" | "updated_at">);
      }
      closeModal();
    } catch (error) {
      console.error("Erreur lors de l'opération:", error);
      toast.error("Une erreur s'est produite lors de l'enregistrement de l'épreuve");
    }
  };

  const deleteStage = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette épreuve ?")) {
      await deleteStageMutation.mutateAsync(id);
    }
  };

  return {
    stages,
    isLoading,
    currentStage,
    modalOpen,
    openAddModal,
    openEditModal,
    closeModal,
    handleSubmit,
    deleteStage,
    defaultRally,
  };
};
