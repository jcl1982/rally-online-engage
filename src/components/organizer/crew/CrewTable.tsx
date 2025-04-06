
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { Registration } from '@/types/registration.types';

interface CrewTableProps {
  registrations: Registration[];
  isLoading: boolean;
  rallyName?: string;
}

export const CrewTable: React.FC<CrewTableProps> = ({ registrations, isLoading, rallyName }) => {
  const getStatusBadge = (status: "pending" | "approved" | "rejected") => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approuvé</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejeté</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rally-red"></div>
      </div>
    );
  }
  
  if (registrations.length === 0) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="mx-auto h-10 w-10 text-gray-400 mb-2" />
        <h3 className="text-lg font-medium text-gray-900">Aucun équipage inscrit</h3>
        <p className="mt-1 text-sm text-gray-500">
          {rallyName 
            ? `Aucun équipage n'est encore inscrit pour ${rallyName}.` 
            : "Aucun équipage n'est encore inscrit."}
        </p>
      </div>
    );
  }
  
  return (
    <div className="rounded-md border mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Équipage</TableHead>
            <TableHead>Pilote</TableHead>
            <TableHead>Co-pilote</TableHead>
            <TableHead>Véhicule</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrations.map((registration) => (
            <TableRow key={registration.id} className="hover:bg-gray-50 cursor-pointer">
              <TableCell className="font-medium">
                {registration.driver?.last_name?.toUpperCase()} / {registration.co_driver?.last_name?.toUpperCase() || "—"}
              </TableCell>
              <TableCell>
                <div>{registration.driver?.first_name} {registration.driver?.last_name}</div>
                <div className="text-xs text-gray-500">{registration.driver?.email}</div>
                {registration.driver?.license_number && (
                  <div className="text-xs text-gray-500">Licence: {registration.driver?.license_number}</div>
                )}
              </TableCell>
              <TableCell>
                {registration.co_driver ? (
                  <>
                    <div>{registration.co_driver?.first_name} {registration.co_driver?.last_name}</div>
                    <div className="text-xs text-gray-500">{registration.co_driver?.email}</div>
                    {registration.co_driver?.license_number && (
                      <div className="text-xs text-gray-500">Licence: {registration.co_driver?.license_number}</div>
                    )}
                  </>
                ) : (
                  <span className="text-gray-400">Non spécifié</span>
                )}
              </TableCell>
              <TableCell>
                {registration.vehicle ? (
                  <>
                    <div>{registration.vehicle?.make} {registration.vehicle?.model} ({registration.vehicle?.year})</div>
                    <div className="text-xs text-gray-500">{registration.vehicle?.registration_number}</div>
                  </>
                ) : (
                  <span className="text-gray-400">Non spécifié</span>
                )}
              </TableCell>
              <TableCell>
                {getStatusBadge(registration.status)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
