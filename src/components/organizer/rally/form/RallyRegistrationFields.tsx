
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UseFormReturn } from "react-hook-form";
import { RallyFormValues } from "@/schemas/rallySchema";

interface RallyRegistrationFieldsProps {
  form: UseFormReturn<RallyFormValues>;
}

export const RallyRegistrationFields = ({ form }: RallyRegistrationFieldsProps) => {
  const [showRegistrationDeadline, setShowRegistrationDeadline] = useState(form.getValues("registration_open"));
  
  useEffect(() => {
    // Update the visibility of the deadline field when registration_open value changes
    const subscription = form.watch((value, { name }) => {
      if (name === "registration_open") {
        setShowRegistrationDeadline(value.registration_open);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);
  
  return (
    <>
      <FormField
        control={form.control}
        name="registration_open"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <FormLabel>Inscriptions ouvertes</FormLabel>
              <FormDescription>
                Permettre aux équipages de s'inscrire à ce rallye
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {showRegistrationDeadline && (
        <FormField
          control={form.control}
          name="registration_deadline"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date limite d'inscription</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className="w-full pl-3 text-left font-normal"
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: fr })
                      ) : (
                        <span>Choisir une date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => {
                      const startDate = form.getValues("start_date");
                      return date > startDate;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Date limite avant laquelle les équipages peuvent s'inscrire
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};
