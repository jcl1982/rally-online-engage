
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const personalInfoSchema = z.object({
  // Pilote
  driverFirstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  driverLastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  driverEmail: z.string().email("Email invalide"),
  driverPhone: z.string().min(10, "Numéro de téléphone invalide"),
  driverLicenseNumber: z.string().min(1, "Numéro de licence obligatoire"),
  driverLicenseCategory: z.string().min(1, "Catégorie de licence obligatoire"),
  driverBloodType: z.string().optional(),
  
  // Co-pilote
  coDriverFirstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  coDriverLastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  coDriverEmail: z.string().email("Email invalide"),
  coDriverPhone: z.string().min(10, "Numéro de téléphone invalide"),
  coDriverLicenseNumber: z.string().min(1, "Numéro de licence obligatoire"),
  coDriverLicenseCategory: z.string().min(1, "Catégorie de licence obligatoire"),
  coDriverBloodType: z.string().optional(),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

interface PersonalInfoFormProps {
  onSubmitStep: (data: PersonalInfoFormData) => void;
  initialData?: PersonalInfoFormData;
}

const defaultValues: PersonalInfoFormData = {
  driverFirstName: "",
  driverLastName: "",
  driverEmail: "",
  driverPhone: "",
  driverLicenseNumber: "",
  driverLicenseCategory: "",
  driverBloodType: "",
  coDriverFirstName: "",
  coDriverLastName: "",
  coDriverEmail: "",
  coDriverPhone: "",
  coDriverLicenseNumber: "",
  coDriverLicenseCategory: "",
  coDriverBloodType: "",
};

const PersonalInfoForm = ({ onSubmitStep, initialData }: PersonalInfoFormProps) => {
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: initialData || defaultValues,
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    toast.success("Informations personnelles enregistrées");
    onSubmitStep(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="rallyForm"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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

          <div className="flex justify-end mt-6">
            <Button type="submit" className="bg-rally-red hover:bg-red-700">
              Suivant: Véhicule
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default PersonalInfoForm;
