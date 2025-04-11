
import { MakeModelSelector } from "./selectors/MakeModelSelector";
import { GroupClassSelector } from "./selectors/GroupClassSelector";
import { VehicleSelectorProps } from "./types/vehicleSelector.types";

export const StageVehicleSelector = ({ form }: VehicleSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Informations véhicule</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MakeModelSelector form={form} />
        <GroupClassSelector form={form} />
      </div>
    </div>
  );
};
