import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Checklists } from "./pages/Checklists";
import { ChecklistDetails } from "./pages/ChecklistDetails";
import { Usuarios } from "./pages/Usuarios";
import { Respostas } from "./pages/Respostas";
import { Relatorios } from "./pages/Relatorios";
import { Auditoria } from "./pages/Auditoria";
import { FormularioResposta } from "./pages/FormularioResposta";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/checklists" element={<Checklists />} />
            <Route path="/checklists/:id" element={<ChecklistDetails />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/respostas" element={<Respostas />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/auditoria" element={<Auditoria />} />
            <Route path="/formulario/:checklistId" element={<FormularioResposta />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
