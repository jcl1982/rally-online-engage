
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StageFormRalliesSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const StageFormRalliesSelect = ({ value, onChange, error }: StageFormRalliesSelectProps) => {
  const [rallies, setRallies] = useState<{id: string, name: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Charger les rallyes disponibles
  useEffect(() => {
    const fetchRallies = async () => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRallies();
  }, []);

  return (
    <div className="space-y-2">
      <Label htmlFor="rally_id">Rallye*</Label>
      <Select
        value={value}
        onValueChange={onChange}
        disabled={isLoading}
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
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
