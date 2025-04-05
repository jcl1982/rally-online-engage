import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StageFormValues, stageSchema, statusOptions } from "@/schemas/stageSchema";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import StageMap from "./StageMap";

interface StageDetailsFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: StageFormValues) => Promise<void>;
  defaultValues?: StageFormValues;
  title: string;
  description: string;
  submitLabel: string;
}

const StageDetailsForm = ({
  isOpen,
  onOpenChange,
  onSubmit,
  defaultValues = {
    name: "",
    location: "",
    description: "",
    distance: 0,
    start_time: "",
    status: "planned",
    start_latitude: undefined,
    start_longitude: undefined,
    finish_latitude: undefined,
    finish_longitude: undefined,
    map_zoom_level: 13,
  },
  title,
  description,
  submitLabel,
}: StageDetailsFormProps) => {
  const form = useForm<StageFormValues>({
    resolver: zodResolver(stageSchema),
    defaultValues,
  });

  // Gérer la sélection du point de départ
  const handleStartPositionSelect = (position: { latitude: number; longitude: number }) => {
    form.setValue("start_latitude", position.latitude);
    form.setValue("start_longitude", position.longitude);
  };

  // Gérer la sélection du point d'arrivée
  const handleFinishPositionSelect = (position: { latitude: number; longitude: number }) => {
    form.setValue("finish_latitude", position.latitude);
    form.setValue("finish_longitude", position.longitude);
  };

  // Réinitialiser le formulaire lorsque la feuille s'ouvre/ferme ou que les valeurs par défaut changent
  useEffect(() => {
    if (isOpen) {
      form.reset(defaultValues);
    }
  }, [form, isOpen, defaultValues]);

  const watchStart = {
    lat: form.watch("start_latitude"),
    lng: form.watch("start_longitude")
  };

  const watchFinish = {
    lat: form.watch("finish_latitude"),
    lng: form.watch("finish_longitude")
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-3xl p-0 overflow-y-auto">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {description}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de l'épreuve</FormLabel>
                      <FormControl>
                        <Input placeholder="ES1 - Col de Turini" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localisation</FormLabel>
                      <FormControl>
                        <Input placeholder="Col de Turini, France" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="distance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distance (km)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="15.5"
                          {...field}
                        />
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
                          placeholder="Description de l'épreuve..."
                          className="resize-none"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="start_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date et heure de début</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut</FormLabel>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="font-medium text-sm">Point de départ</div>
                  <div className="grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="start_latitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Latitude</FormLabel>
                          <FormControl>
                            <Input type="number" step="any" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="start_longitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Longitude</FormLabel>
                          <FormControl>
                            <Input type="number" step="any" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      form.setValue("start_latitude", undefined);
                      form.setValue("start_longitude", undefined);
                    }}
                    className="w-full"
                  >
                    Effacer le point de départ
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="font-medium text-sm">Point d'arrivée</div>
                  <div className="grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="finish_latitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Latitude</FormLabel>
                          <FormControl>
                            <Input type="number" step="any" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="finish_longitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Longitude</FormLabel>
                          <FormControl>
                            <Input type="number" step="any" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      form.setValue("finish_latitude", undefined);
                      form.setValue("finish_longitude", undefined);
                    }}
                    className="w-full"
                  >
                    Effacer le point d'arrivée
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name="map_zoom_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Niveau de zoom</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="20"
                          step="1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2 pt-2">
                  <div className="font-medium text-sm">Sélection sur la carte</div>
                  <div className="flex space-x-2">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const mapElement = document.getElementById("stage-map-container");
                        if (mapElement) mapElement.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex-1"
                    >
                      Départ
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const mapElement = document.getElementById("stage-map-container");
                        if (mapElement) mapElement.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex-1"
                    >
                      Arrivée
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Carte</div>
              <div id="stage-map-container" className="border rounded-md overflow-hidden">
                <div className="flex border-b">
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex-1 rounded-none border-r"
                    onClick={() => {
                      const position = watchStart.lat && watchStart.lng
                        ? { lat: watchStart.lat, lng: watchStart.lng }
                        : { lat: 46.227638, lng: 2.213749 }; // Centre de la France
                      
                      const mapElement = document.getElementById("stage-map");
                      if (mapElement) {
                        // Réinitialiser la carte et centrer sur la position actuelle
                      }
                    }}
                  >
                    Définir point de départ
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex-1 rounded-none"
                    onClick={() => {
                      // Similaire à ci-dessus, mais pour le point d'arrivée
                    }}
                  >
                    Définir point d'arrivée
                  </Button>
                </div>
                <div className="h-[300px]">
                  <StageMap
                    center={
                      watchStart.lat && watchStart.lng
                        ? { lat: watchStart.lat, lng: watchStart.lng }
                        : undefined
                    }
                    zoom={form.watch("map_zoom_level")}
                    onPositionSelect={handleStartPositionSelect}
                    startPosition={watchStart.lat && watchStart.lng ? watchStart : undefined}
                    finishPosition={watchFinish.lat && watchFinish.lng ? watchFinish : undefined}
                    timingPoints={[]} // Ajout de la prop timingPoints manquante
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <SheetClose asChild>
                <Button variant="outline">Annuler</Button>
              </SheetClose>
              <Button type="submit" className="bg-rally-red hover:bg-red-700">
                {submitLabel}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default StageDetailsForm;
