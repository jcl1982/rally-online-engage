
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ProtectedRouteProps {
  requireOrganizer?: boolean;
}

const ProtectedRoute = ({ requireOrganizer = false }: ProtectedRouteProps) => {
  const { user, isLoading, isOrganizer } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red"></div>
      </div>
    );
  }

  if (!user) {
    toast.error("Vous devez être connecté pour accéder à cette page");
    return <Navigate to="/auth" replace />;
  }

  // Vérifie si l'utilisateur est un organisateur quand c'est requis
  if (requireOrganizer && !isOrganizer) {
    console.log("Accès refusé - Organizer requis, isOrganizer:", isOrganizer);
    toast.error("Vous n'avez pas les permissions nécessaires pour accéder à cette page");
    return <Navigate to="/" replace />;
  }

  console.log("Accès autorisé - isOrganizer:", isOrganizer);
  return <Outlet />;
};

export default ProtectedRoute;
