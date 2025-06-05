import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Eye } from "lucide-react";
import { ResponseDetailsModal } from "@/components/respostas/ResponseDetailsModal";

// Mock data para demonstração
const mockRespostas = [
  {
    id: "1",
    checklist: "Atendimento - Loja Centro",
    clienteOculto: "Ana Oliveira",
    data: "2024-04-11",
    conformidade: 92,
    momentos: [
      {
        nome: "Recepção ao Cliente",
        perguntas: [
          {
            pergunta: "O atendente cumprimentou adequadamente?",
            pilar: "Experiência" as const,
            avaliacao: "CF" as const,
            observacao: "Cumprimento caloroso e sorridente"
          },
          {
            pergunta: "O tempo de espera foi adequado?",
            pilar: "Operação" as const,
            avaliacao: "NC" as const,
            observacao: "Esperei mais de 5 minutos na fila"
          }
        ]
      }
    ]
  },
  {
    id: "2",
    checklist: "Vendas - Produtos Premium",
    clienteOculto: "João Ferreira",
    data: "2024-04-09",
    conformidade: 78,
    momentos: [
      {
        nome: "Apresentação do Produto",
        perguntas: [
          {
            pergunta: "O vendedor demonstrou conhecimento do produto?",
            pilar: "Vendas" as const,
            avaliacao: "CF" as const,
            observacao: "Conhecimento técnico excelente"
          }
        ]
      }
    ]
  },
  {
    id: "3",
    checklist: "Operação - Drive Thru",
    clienteOculto: "Carla Mendes",
    data: "2024-04-08",
    conformidade: 85,
    momentos: [
      {
        nome: "Velocidade do Atendimento",
        perguntas: [
          {
            pergunta: "O pedido foi entregue dentro do prazo?",
            pilar: "Operação" as const,
            avaliacao: "CF" as const,
            observacao: "Entrega rápida e eficiente"
          }
        ]
      }
    ]
  }
];

export const Respostas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterChecklist, setFilterChecklist] = useState("");
  const [filterPilar, setFilterPilar] = useState("");
  const [selectedResponse, setSelectedResponse] = useState<typeof mockRespostas[0] | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const filteredRespostas = mockRespostas.filter(resposta => {
    const matchesSearch = resposta.checklist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resposta.clienteOculto.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChecklist = !filterChecklist || resposta.checklist.includes(filterChecklist);
    return matchesSearch && matchesChecklist;
  });

  const handleViewDetails = (resposta: typeof mockRespostas[0]) => {
    setSelectedResponse(resposta);
    setDetailsModalOpen(true);
  };

  const getConformidadeColor = (conformidade: number) => {
    if (conformidade >= 90) return "bg-green-100 text-green-800";
    if (conformidade >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Respostas</h2>
        <p className="text-gray-600 mt-2">Visualize e analise respostas dos checklists</p>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
          <CardDescription>Filtre as respostas por critérios específicos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por checklist ou cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterChecklist} onValueChange={setFilterChecklist}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrar por checklist" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os checklists</SelectItem>
                <SelectItem value="Atendimento">Atendimento</SelectItem>
                <SelectItem value="Vendas">Vendas</SelectItem>
                <SelectItem value="Operação">Operação</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPilar} onValueChange={setFilterPilar}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrar por pilar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os pilares</SelectItem>
                <SelectItem value="Experiência">Experiência</SelectItem>
                <SelectItem value="Operação">Operação</SelectItem>
                <SelectItem value="Vendas">Vendas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Respostas */}
      <Card>
        <CardHeader>
          <CardTitle>Respostas Submetidas</CardTitle>
          <CardDescription>Lista de todas as respostas coletadas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Checklist</TableHead>
                <TableHead>Cliente Oculto</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Conformidade</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRespostas.map((resposta) => (
                <TableRow key={resposta.id}>
                  <TableCell className="font-medium">{resposta.checklist}</TableCell>
                  <TableCell>{resposta.clienteOculto}</TableCell>
                  <TableCell>{resposta.data}</TableCell>
                  <TableCell>
                    <Badge className={getConformidadeColor(resposta.conformidade)}>
                      {resposta.conformidade}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(resposta)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Ver Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ResponseDetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        response={selectedResponse}
      />
    </div>
  );
};