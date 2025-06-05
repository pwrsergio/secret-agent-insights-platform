import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Dashboard", path: "/" },
  { label: "Checklists", path: "/checklists" },
  { label: "Usuários", path: "/usuarios" },
  { label: "Respostas", path: "/respostas" },
  { label: "Relatórios", path: "/relatorios" },
  { label: "Auditoria", path: "/auditoria" },
];

export const Navbar = () => {
  const location = useLocation();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">Cliente Oculto</span>
          </div>
          
          <nav className="flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "text-gray-700 hover:text-gray-900",
                      isActive && "bg-blue-600 text-white hover:bg-blue-700"
                    )}
                  >
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="Usuario" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};