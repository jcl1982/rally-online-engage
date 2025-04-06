
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Organizer from "./pages/Organizer";
import NotFound from "./pages/NotFound";
import Registration from "./pages/Registration";
import OrganizerStages from "./pages/OrganizerStages";
import OrganizerStageManager from "./pages/OrganizerStageManager";
import RallyDetails from "./pages/RallyDetails";
import RallyPlanning from "./pages/RallyPlanning";

import "@/index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth/*" element={<Auth />} />
        
        {/* Protected routes with role requirements */}
        <Route element={<ProtectedRoute requireOrganizer={true} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        
        <Route element={<ProtectedRoute requireOrganizer={true} />}>
          <Route path="/organizer" element={<Organizer />} />
        </Route>
        
        <Route element={<ProtectedRoute requireOrganizer={true} />}>
          <Route path="/organizer/stages" element={<OrganizerStages />} />
        </Route>
        
        <Route element={<ProtectedRoute requireOrganizer={true} />}>
          <Route path="/organizer/rally/new" element={<RallyPlanning />} />
        </Route>
        
        <Route element={<ProtectedRoute requireOrganizer={true} />}>
          <Route path="/organizer/rally/:rallyId/stages" element={<OrganizerStageManager />} />
        </Route>
        
        <Route element={<ProtectedRoute />}>
          <Route path="/registration" element={<Registration />} />
        </Route>
        
        <Route path="/rally/:id" element={<RallyDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </Router>
  );
}

export default App;
