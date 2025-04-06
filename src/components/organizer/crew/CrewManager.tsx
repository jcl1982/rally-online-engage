
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CrewTable } from "./CrewTable";
import { Users, AlertCircle } from "lucide-react";

export const CrewManager: React.FC = () => {
  const [selectedRally, setSelectedRally] = useState<string | null>(null);
  
  // Récupérer la liste des rallyes
  const { data: rallies, isLoading: isLoadingRallies } = useQuery({
    queryKey: ["organizer-rallies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rallies")
        .select("id, name, start_date")
        .order("start_date", { ascending: false });
        
      if (error) throw error;
      return data;
    }
  });
  
  // Récupérer les inscriptions avec les informations des participants
  const { data: registrations, isLoading: isLoadingRegistrations } = useQuery({
    queryKey: ["registrations", selectedRally],
    queryFn: async () => {
      const query = supabase
        .from("registrations")
        .select(`
          id,
          status,
          rally_id,
          driver:driver_id(id, first_name, last_name, email, phone, license_number),
          co_driver:co_driver_id(id, first_name, last_name, email, phone, license_number),
          vehicle:vehicle_id(id, make, model, year, registration_number)
        `)
        .order("created_at", { ascending: false });
        
      if (selectedRally) {
        query.eq("rally_id", selectedRally);
      }
        
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: true // Toujours activé pour montrer toutes les inscriptions si aucun rallye n'est sélectionné
  });
  
  // Sélectionner le premier rallye par défaut si aucun n'est sélectionné
  React.useEffect(() => {
    if (rallies && rallies.length > 0 && !selectedRally) {
      setSelectedRally(rallies[0].id);
    }
  }, [rallies, selectedRally]);
  
  if (isLoadingRallies) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rally-red"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-gray-50">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-rally-red" />
              Liste des Équipages
            </CardTitle>
            
            <div className="flex items-center space-x-2">
              {isLoadingRegistrations && (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-rally-red"></div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {rallies && rallies.length > 0 ? (
            <Tabs defaultValue={selectedRally || "all"} className="w-full" onValueChange={(value) => setSelectedRally(value === "all" ? null : value)}>
              <div className="px-4 pt-4">
                <TabsList className="w-full overflow-x-auto flex-nowrap whitespace-nowrap">
                  <TabsTrigger value="all">Tous les rallyes</TabsTrigger>
                  {rallies.map((rally) => (
                    <TabsTrigger key={rally.id} value={rally.id}>
                      {rally.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              <TabsContent value="all" className="px-4 pb-4">
                <CrewTable registrations={registrations || []} isLoading={isLoadingRegistrations} />
              </TabsContent>
              
              {rallies.map((rally) => (
                <TabsContent key={rally.id} value={rally.id} className="px-4 pb-4">
                  <CrewTable 
                    registrations={registrations?.filter(reg => reg.rally_id === rally.id) || []} 
                    isLoading={isLoadingRegistrations}
                    rallyName={rally.name}
                  />
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="p-8 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Aucun rallye disponible</h3>
              <p className="mt-2 text-sm text-gray-500">
                Vous devez d'abord créer un rallye avant de pouvoir voir les équipages.
              </p>
              <Button
                className="mt-4 bg-rally-red hover:bg-red-700"
                onClick={() => window.location.href = "/organizer/rally/new"}
              >
                Créer un rallye
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
