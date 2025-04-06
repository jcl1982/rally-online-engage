
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Organizer from "./pages/Organizer";
import RallyDetails from "./pages/RallyDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/rally/:id" element={<RallyDetails />} />
            
            {/* Routes protégées qui nécessitent l'authentification */}
            <Route element={<ProtectedRoute />}>
              <Route path="/registration" element={<div className="p-10 min-h-screen flex items-center justify-center flex-col">
                <h1 className="text-3xl font-bold mb-4">Page d'engagement</h1>
                <p className="text-gray-600 mb-6">Cette page est en cours de développement</p>
                <Button onClick={() => window.history.back()} className="bg-rally-red hover:bg-red-700">
                  Retourner à l'accueil
                </Button>
              </div>} />
            </Route>
            
            <Route element={<ProtectedRoute requireOrganizer={true} />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/organizer" element={<Organizer />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
