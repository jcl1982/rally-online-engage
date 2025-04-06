
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Schéma de validation pour les formulaires d'authentification
export const authSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export type AuthFormData = z.infer<typeof authSchema>;

export type AuthMode = 'signin' | 'signup';

export const useAuthForm = (initialMode: AuthMode = 'signin') => {
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>(initialMode);
  const navigate = useNavigate();

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleAuth = async (data: AuthFormData) => {
    try {
      setIsLoading(true);
      
      if (authMode === 'signin') {
        console.log("Tentative de connexion avec:", data.email);
        const { data: authData, error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) throw error;
        
        toast.success("Connexion réussie");
        
        // Redirection basée sur la présence d'un utilisateur authentifié
        if (authData?.user) {
          // Récupération du profil utilisateur pour vérifier son rôle
          console.log("Récupération du profil pour:", authData.user.id);
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", authData.user.id)
            .single();

          if (profileError) {
            console.error("Erreur récupération profil:", profileError);
          }

          console.log("Profil récupéré:", profileData);

          // Redirection avec un délai pour laisser le temps au toast d'être affiché
          setTimeout(() => {
            // Si l'utilisateur est un organisateur ou un admin, rediriger vers l'espace organisateur
            if (profileData?.role === "organizer" || profileData?.role === "admin") {
              console.log("Redirection vers /organizer");
              navigate("/organizer");
            } else {
              // Sinon rediriger vers la page d'accueil
              console.log("Redirection vers /");
              navigate("/");
            }
          }, 1000);
        }
      } else {
        console.log("Tentative d'inscription avec:", data.email);
        const { data: authData, error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              first_name: "",
              last_name: "",
              role: "organizer" // Définir le rôle par défaut lors de l'inscription
            },
          }
        });

        if (error) throw error;
        
        if (authData?.user) {
          toast.success("Inscription réussie! Un email de confirmation vous a été envoyé.");
          // Redirection après inscription réussie
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          toast.info("Vérifiez votre email pour confirmer votre inscription.");
        }
      }
    } catch (error: any) {
      console.error("Erreur d'authentification:", error);
      const errorMessage = error.message === "Email not confirmed" 
        ? "Email non confirmé. Veuillez vérifier votre boîte de réception."
        : error.message === "Invalid login credentials" 
          ? "Identifiants invalides. Vérifiez votre email et mot de passe."
          : "Une erreur s'est produite lors de l'authentification.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    authMode,
    setAuthMode,
    handleAuth
  };
};
