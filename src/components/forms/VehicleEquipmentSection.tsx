
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EquipmentFormData } from "@/schemas/equipmentSchema";

const VehicleEquipmentSection = () => {
  const form = useFormContext<EquipmentFormData>();

  return (
    <div className="rallyFormSection">
      <h3 className="rallyFormTitle">Équipement du véhicule</h3>
      <div className="grid grid-cols-1 gap-6">
        <div className="border-l-2 border-rally-red pl-4 py-2">
          <h4 className="font-semibold mb-4">Sièges</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="seats.brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marque</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Sabelt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seats.homologationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro d'homologation</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: FIA 8855-1999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seats.expirationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date d'expiration</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 2026" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="border-l-2 border-rally-red pl-4 py-2">
          <h4 className="font-semibold mb-4">Harnais</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="belts.brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marque</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Schroth" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="belts.homologationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro d'homologation</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: FIA 8853-2016" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="belts.expirationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date d'expiration</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 2026" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleEquipmentSection;
