
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface RallyFormActionsProps {
  isSubmitting: boolean;
}

export const RallyFormActions = ({ isSubmitting }: RallyFormActionsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end space-x-2">
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => navigate("/organizer")}
      >
        Annuler
      </Button>
      <Button 
        type="submit" 
        variant="rally"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Création en cours..." : "Créer le rallye"}
      </Button>
    </div>
  );
};
