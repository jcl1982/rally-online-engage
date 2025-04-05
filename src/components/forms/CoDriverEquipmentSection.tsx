
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

const CoDriverEquipmentSection = () => {
  const form = useFormContext<EquipmentFormData>();

  return (
    <div className="rallyFormSection">
      <h3 className="rallyFormTitle">Équipement du co-pilote</h3>
      <div className="grid grid-cols-1 gap-6">
        <div className="border-l-2 border-rally-red pl-4 py-2">
          <h4 className="font-semibold mb-4">Casque</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="coDriverHelmet.brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marque</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Bell" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coDriverHelmet.model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modèle</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: HP77" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coDriverHelmet.homologationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro d'homologation</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: FIA 8860-2018" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coDriverHelmet.expirationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date d'expiration</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 2028" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="border-l-2 border-rally-red pl-4 py-2">
          <h4 className="font-semibold mb-4">Combinaison</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="coDriverSuit.brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marque</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: OMP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coDriverSuit.homologationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro d'homologation</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: FIA 8856-2018" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coDriverSuit.expirationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date d'expiration</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 2028" {...field} />
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

export default CoDriverEquipmentSection;
