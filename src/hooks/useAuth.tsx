
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  isOrganizer: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrganizer, setIsOrganizer] = useState(false);

  // Fonction pour récupérer le profil utilisateur
  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      
      // Utiliser la fonction RPC créée pour éviter les problèmes de récursion
      const { data, error } = await supabase
        .rpc('get_user_profile', { user_id: userId });

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }

      console.log("Profile fetched:", data);
      setProfile(data);
      
      // Définir isOrganizer basé sur le rôle récupéré
      const userIsOrganizer = data?.role === 'organizer' || data?.role === 'admin';
      setIsOrganizer(userIsOrganizer);
      console.log("User is organizer:", userIsOrganizer);
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Configurer l'écouteur de changement d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      console.log("Auth state changed:", session);
      setSession(session);
      setUser(session?.user ?? null);
      
      // Réinitialiser le profil si l'utilisateur est déconnecté
      if (!session?.user) {
        setProfile(null);
        setIsOrganizer(false);
        setIsLoading(false);
      } else {
        // Charger le profil si l'utilisateur est connecté
        fetchUserProfile(session.user.id);
      }
    });

    // Vérifier la session actuelle
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session:", session);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Déconnexion réussie");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      toast.error("Erreur lors de la déconnexion");
    }
  };

  const value = {
    session,
    user,
    profile,
    isLoading,
    isOrganizer,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};
