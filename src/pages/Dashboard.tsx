import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, Users, TrendingUp, AlertCircle } from "lucide-react";

export const Dashboard = () => {
  const stats = [
    {
      title: "Checklists Ativos",
      value: "12",
      description: "3 novos este mês",
      icon: ClipboardCheck,
      color: "text-blue-600"
    },
    {
      title: "Clientes Ocultos",
      value: "48",
      description: "8 ativos hoje",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Respostas Coletadas",
      value: "1,234",
      description: "+12% vs mês anterior",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Não Conformidades",
      value: "23",
      description: "Requer atenção",
      icon: AlertCircle,
      color: "text-red-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-2">Visão geral da gestão de checklists</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>
              Últimas ações realizadas no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Novo checklist criado</p>
                  <p className="text-xs text-gray-500">Atendimento - Loja Centro</p>
                </div>
                <span className="text-xs text-gray-500">2h atrás</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Resposta submetida</p>
                  <p className="text-xs text-gray-500">Cliente Oculto #15</p>
                </div>
                <span className="text-xs text-gray-500">4h atrás</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Não conformidade detectada</p>
                  <p className="text-xs text-gray-500">Pilar: Experiência</p>
                </div>
                <span className="text-xs text-gray-500">6h atrás</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conformidade por Pilar</CardTitle>
            <CardDescription>
              Percentual de conformidade nos últimos 30 dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Experiência</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Operação</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Vendas</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};