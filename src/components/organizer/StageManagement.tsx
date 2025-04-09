
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StageForm } from "./stage/StageForm";
import { StageList } from "./stage/StageList";
import { useState } from "react";
import { StageManager } from "./stage/StageManager";

export const StageManagement = () => {
  // Comme nous utilisons maintenant directement StageManager, nous pouvons simplifier ce composant
  return (
    <div>
      <StageManager />
    </div>
  );
};
