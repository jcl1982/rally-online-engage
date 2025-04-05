
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

const CoDriverFormSection = () => {
  const form = useFormContext<PersonalInfoFormData>();

  return (
    <div className="rallyFormSection">
      <h3 className="rallyFormTitle">Informations du co-pilote</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="coDriverFirstName"
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
          name="coDriverLastName"
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
          name="coDriverEmail"
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
          name="coDriverPhone"
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
          name="coDriverLicenseNumber"
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
          name="coDriverLicenseCategory"
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
          name="coDriverBloodType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Groupe sanguin (optionnel)</FormLabel>
              <FormControl>
                <Input placeholder="Ex: O+" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default CoDriverFormSection;
