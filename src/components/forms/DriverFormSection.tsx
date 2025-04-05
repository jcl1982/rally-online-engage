
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PersonalInfoFormData } from "@/schemas/personalInfoSchema";

const DriverFormSection = () => {
  const form = useFormContext<PersonalInfoFormData>();

  return (
    <div className="rallyFormSection">
      <h3 className="rallyFormTitle">Informations du pilote</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="driverFirstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input placeholder="Prénom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="driverLastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="driverEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="driverPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input placeholder="Téléphone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="driverLicenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de licence</FormLabel>
              <FormControl>
                <Input placeholder="Numéro de licence" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="driverLicenseCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie de licence</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Internationale" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="driverBloodType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Groupe sanguin (optionnel)</FormLabel>
              <FormControl>
                <Input placeholder="Ex: A+" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default DriverFormSection;
