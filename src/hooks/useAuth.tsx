
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define the shape of a user profile
interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isOrganizer: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrganizer, setIsOrganizer] = useState(false);

  // Fonction pour récupérer le profil utilisateur
  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      
      // Call the function directly without using rpc for better type safety
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name, role')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }

      console.log("Profile fetched:", data);
      
      // Cast the data to UserProfile type
      const userProfile = data as UserProfile;
      setProfile(userProfile);
      
      // Définir isOrganizer basé sur le rôle récupéré
      const userIsOrganizer = userProfile?.role === 'organizer' || userProfile?.role === 'admin';
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed, event:", event, "session:", session ? "exists" : "null");
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
      console.log("Initial session:", session ? "exists" : "null");
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
    console.log("Attempting to sign out...");
    setIsLoading(true);
    
    try {
      // Force le rafraîchissement de la session avant la déconnexion
      await supabase.auth.refreshSession();
      console.log("Session refreshed before logout");
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Erreur lors de la déconnexion:", error);
        toast.error("Erreur lors de la déconnexion");
        throw error;
      }
      
      console.log("Sign out successful");
      
      // Force reset local state since sometimes onAuthStateChange might not trigger immediately
      setSession(null);
      setUser(null);
      setProfile(null);
      setIsOrganizer(false);
      
      toast.success("Déconnexion réussie");
    } catch (error) {
      console.error("Erreur critique lors de la déconnexion:", error);
      toast.error("Erreur lors de la déconnexion, veuillez réessayer");
    } finally {
      setIsLoading(false);
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
