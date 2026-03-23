import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GovtSchemes from "./pages/GovtSchemes";
import Chat from "./pages/Chat";
import Analysis from "./pages/Analysis";
import Appointment from "./pages/Appointment";
import HealthHub from "./pages/HealthHub";
import PreventiveCare from "./pages/PreventiveCare";
import VaccinationSchedules from "./pages/VaccinationSchedules";
import HygieneTips from "./pages/HygieneTips";
import Profile from "./pages/Profile";
import LanguageSettings from "./pages/LanguageSettings";
import Notifications from "./pages/Notifications";
import MentalWellness from "./pages/MentalWellness";
import Nutrition from "./pages/Nutrition";
import MaternalCare from "./pages/MaternalCare";
import HealthCalendar from "./pages/HealthCalendar";
import HealthDirectory from "./pages/HealthDirectory";
import Helplines from "./pages/Helplines";
import PdfLibrary from "./pages/PdfLibrary";
import FacilityDetail from "./pages/FacilityDetail";
import SchemeDetail from "./pages/SchemeDetail";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <LanguageProvider>
          <NotificationProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Public Landing Page */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  
                  {/* Protected / App Pages within MainLayout */}
                  <Route path="/chat" element={<ProtectedRoute><MainLayout><Chat /></MainLayout></ProtectedRoute>} />
                  <Route path="/analysis" element={<ProtectedRoute><MainLayout><Analysis /></MainLayout></ProtectedRoute>} />
                  <Route path="/schemes" element={<ProtectedRoute><MainLayout><GovtSchemes /></MainLayout></ProtectedRoute>} />
                  <Route path="/scheme/:schemeName" element={<ProtectedRoute><MainLayout><SchemeDetail /></MainLayout></ProtectedRoute>} />
                  <Route path="/appointment" element={<ProtectedRoute><MainLayout><Appointment /></MainLayout></ProtectedRoute>} />
                  
                  {/* Health Awareness Hub & Content */}
                  <Route path="/health-hub" element={<ProtectedRoute><MainLayout><HealthHub /></MainLayout></ProtectedRoute>} />
                  <Route path="/health-content/preventive-care" element={<ProtectedRoute><MainLayout><PreventiveCare /></MainLayout></ProtectedRoute>} />
                  <Route path="/health-content/vaccination-schedules" element={<ProtectedRoute><MainLayout><VaccinationSchedules /></MainLayout></ProtectedRoute>} />
                  <Route path="/health-content/hygiene-tips" element={<ProtectedRoute><MainLayout><HygieneTips /></MainLayout></ProtectedRoute>} />
                  <Route path="/health-content/mental-wellness" element={<ProtectedRoute><MainLayout><MentalWellness /></MainLayout></ProtectedRoute>} />
                  <Route path="/health-content/nutrition" element={<ProtectedRoute><MainLayout><Nutrition /></MainLayout></ProtectedRoute>} />
                  <Route path="/health-content/maternal-care" element={<ProtectedRoute><MainLayout><MaternalCare /></MainLayout></ProtectedRoute>} />
                  
                  {/* Additional Resources */}
                  <Route path="/health-calendar" element={<ProtectedRoute><MainLayout><HealthCalendar /></MainLayout></ProtectedRoute>} />
                  <Route path="/health-directory" element={<ProtectedRoute><MainLayout><HealthDirectory /></MainLayout></ProtectedRoute>} />
                  <Route path="/helplines" element={<ProtectedRoute><MainLayout><Helplines /></MainLayout></ProtectedRoute>} />
                  <Route path="/pdf-library" element={<ProtectedRoute><MainLayout><PdfLibrary /></MainLayout></ProtectedRoute>} />
                  <Route path="/facility/:id" element={<ProtectedRoute><MainLayout><FacilityDetail /></MainLayout></ProtectedRoute>} />
                  
                  {/* Profile, Settings & Notifications */}
                  <Route path="/profile" element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>} />
                  <Route path="/language" element={<ProtectedRoute><MainLayout><LanguageSettings /></MainLayout></ProtectedRoute>} />
                  <Route path="/notifications" element={<ProtectedRoute><MainLayout><Notifications /></MainLayout></ProtectedRoute>} />
                  
                  {/* Catch-all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </NotificationProvider>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
