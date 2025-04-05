
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StageFormValues, stageSchema } from "@/schemas/stageSchema";
import { Button } from "@/components/ui/button";
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
import StageBasicInfoFields from "./form/StageBasicInfoFields";
import StageLocationFields from "./form/StageLocationFields";
import MapContainer from "./form/MapContainer";

interface StageDetailsFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: StageFormValues) => Promise<void>;
  defaultValues?: StageFormValues;
  title: string;
  description: string;
  submitLabel: string;
  timingPoints?: any[]; // Added to fix TypeScript errors
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
  timingPoints = [], // Default value for timingPoints
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

  // Scroll to map function
  const scrollToMap = () => {
    const mapElement = document.getElementById("stage-map-container");
    if (mapElement) mapElement.scrollIntoView({ behavior: 'smooth' });
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
              <StageBasicInfoFields control={form.control} />
              <StageLocationFields control={form.control} onScrollToMap={scrollToMap} />
            </div>

            <MapContainer
              startPosition={watchStart.lat && watchStart.lng ? watchStart : undefined}
              finishPosition={watchFinish.lat && watchFinish.lng ? watchFinish : undefined}
              mapZoomLevel={form.watch("map_zoom_level")}
              timingPoints={timingPoints}
              handleStartPositionSelect={handleStartPositionSelect}
              handleFinishPositionSelect={handleFinishPositionSelect}
            />

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
