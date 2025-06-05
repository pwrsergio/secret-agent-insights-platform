import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, UserCheck, UserX, Shield } from "lucide-react";

export const Usuarios = () => {
  const usuarios = [
    {
      id: 1,
      nome: "Ana Silva",
      email: "ana.silva@email.com",
      tipo: "Administrador",
      status: "Ativo",
      ultimoAcesso: "2024-01-15 14:30",
      checklists: 12
    },
    {
      id: 2,
      nome: "Carlos Santos",
      email: "carlos.santos@email.com",
      tipo: "Cliente Oculto",
      status: "Ativo",
      ultimoAcesso: "2024-01-15 09:15",
      checklists: 5
    },
    {
      id: 3,
      nome: "Maria Oliveira",
      email: "maria.oliveira@email.com",
      tipo: "Cliente Oculto",
      status: "Inativo",
      ultimoAcesso: "2024-01-10 16:45",
      checklists: 8
    },
    {
      id: 4,
      nome: "João Costa",
      email: "joao.costa@email.com",
      tipo: "Supervisor",
      status: "Ativo",
      ultimoAcesso: "2024-01-15 11:20",
      checklists: 0
    }
  ];

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'Administrador':
        return <Shield className="h-4 w-4" />;
      case 'Supervisor':
        return <UserCheck className="h-4 w-4" />;
      default:
        return <UserX className="h-4 w-4" />;
    }
  };

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'Administrador':
        return 'destructive';
      case 'Supervisor':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Usuários</h2>
          <p className="text-gray-600 mt-2">Gerencie usuários e permissões do sistema</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {usuarios.map((usuario) => (
              <div key={usuario.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center gap-2">
                    {getTipoIcon(usuario.tipo)}
                    <div>
                      <h3 className="font-medium">{usuario.nome}</h3>
                      <p className="text-sm text-gray-600">{usuario.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <Badge variant={getTipoBadge(usuario.tipo) as any}>
                      {usuario.tipo}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      {usuario.checklists} checklists
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <Badge variant={usuario.status === 'Ativo' ? 'default' : 'secondary'}>
                      {usuario.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      {usuario.ultimoAcesso}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={usuario.status === 'Ativo' ? 'text-red-600' : 'text-green-600'}
                    >
                      {usuario.status === 'Ativo' ? 'Desativar' : 'Ativar'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};