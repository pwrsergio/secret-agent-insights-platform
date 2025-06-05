import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  ClipboardCheck, 
  Users, 
  BarChart3, 
  FileText,
  ShieldCheck 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isCollapsed: boolean;
}

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: ClipboardCheck, label: "Checklists", path: "/checklists" },
  { icon: Users, label: "Usuários", path: "/usuarios" },
  { icon: FileText, label: "Respostas", path: "/respostas" },
  { icon: BarChart3, label: "Relatórios", path: "/relatorios" },
  { icon: ShieldCheck, label: "Auditoria", path: "/auditoria" },
];

export const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const location = useLocation();

  return (
    <aside className={cn(
      "bg-gray-900 text-white transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4">
        <div className={cn(
          "flex items-center gap-3",
          isCollapsed && "justify-center"
        )}>
          <ShieldCheck className="h-8 w-8 text-blue-400" />
          {!isCollapsed && (
            <span className="font-bold text-lg">Cliente Oculto</span>
          )}
        </div>
      </div>

      <nav className="flex-1 px-3 pb-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link to={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start text-white hover:text-white hover:bg-gray-800",
                      isCollapsed && "justify-center px-2",
                      isActive && "bg-blue-600 hover:bg-blue-700"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {!isCollapsed && (
                      <span className="ml-3">{item.label}</span>
                    )}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};