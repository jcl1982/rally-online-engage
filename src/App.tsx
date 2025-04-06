
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
import RallyDetails from "./pages/RallyDetails";
import RallyPlanning from "./pages/RallyPlanning"; // Importation de la nouvelle page

import "@/index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer"
          element={
            <ProtectedRoute allowedRoles={["organizer", "admin"]}>
              <Organizer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer/stages"
          element={
            <ProtectedRoute allowedRoles={["organizer", "admin"]}>
              <OrganizerStages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer/rally/new"
          element={
            <ProtectedRoute allowedRoles={["organizer", "admin"]}>
              <RallyPlanning />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registration"
          element={
            <ProtectedRoute>
              <Registration />
            </ProtectedRoute>
          }
        />
        <Route path="/rally/:id" element={<RallyDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </Router>
  );
}

export default App;
