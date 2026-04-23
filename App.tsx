import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import HomePage from "./pages/HomePage";
import CheckInPage from "./pages/CheckInPage";
import ExercisesPage from "./pages/ExercisesPage";
import JournalPage from "./pages/JournalPage";
import ProgressPage from "./pages/ProgressPage";
import SOSPage from "./pages/SOSPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/checkin" element={<CheckInPage />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/sos" element={<SOSPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
