
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TimingPointFormValues, timingPointSchema, timingPointTypeOptions } from "@/schemas/stageSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import StageMap from "./StageMap";

interface TimingPointFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: TimingPointFormValues) => Promise<void>;
  defaultValues?: TimingPointFormValues;
  title: string;
  description: string;
  submitLabel: string;
  timingPoints?: any[];
}

const TimingPointForm = ({
  isOpen,
  onOpenChange,
  onSubmit,
  defaultValues = {
    name: "",
    description: "",
    latitude: 0,
    longitude: 0,
    point_type: "split",
    order_index: 0,
  },
  title,
  description,
  submitLabel,
  timingPoints = [],
}: TimingPointFormProps) => {
  const form = useForm<TimingPointFormValues>({
    resolver: zodResolver(timingPointSchema),
    defaultValues,
  });

  // Gérer la sélection de position sur la carte
  const handlePositionSelect = (position: { latitude: number; longitude: number }) => {
    form.setValue("latitude", position.latitude);
    form.setValue("longitude", position.longitude);
  };

  // Réinitialiser le formulaire lorsque la boîte de dialogue s'ouvre/ferme ou que les valeurs par défaut changent
  useEffect(() => {
    if (isOpen) {
      form.reset(defaultValues);
    }
  }, [form, isOpen, defaultValues]);
  
  const watchLatitude = form.watch("latitude");
  const watchLongitude = form.watch("longitude");
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du point</FormLabel>
                      <FormControl>
                        <Input placeholder="CP1 - Virage en épingle" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Point intermédiaire situé après le virage en épingle..."
                          className="resize-none"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input type="number" step="any" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input type="number" step="any" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="point_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de point</FormLabel>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        {timingPointTypeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="order_index"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ordre</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div>
                <FormLabel>Position sur la carte</FormLabel>
                <p className="text-sm text-gray-500 mb-2">
                  Cliquez sur la carte pour définir la position du point
                </p>
                <StageMap
                  timingPoints={timingPoints}
                  onPositionSelect={handlePositionSelect}
                  center={
                    watchLatitude && watchLongitude 
                      ? { lat: watchLatitude, lng: watchLongitude }
                      : undefined
                  }
                  zoom={13}
                />
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Annuler
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-rally-red hover:bg-red-700">
                {submitLabel}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TimingPointForm;
