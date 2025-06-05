import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Eye, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export const ChecklistDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - será substituído pela API
  const checklist = {
    id: Number(id),
    nome: "Atendimento - Loja Centro",
    descricao: "Avaliação completa do atendimento ao cliente",
    status: "Ativo",
    ultimaAtualizacao: "2024-01-15",
    momentos: [
      {
        id: 1,
        nome: "Recepção do Cliente",
        descricao: "Avaliação do primeiro contato com o cliente",
        perguntas: [
          {
            id: 1,
            texto: "O atendente cumprimentou o cliente de forma cordial?",
            pilar: "Experiência",
            obrigatoria: true
          },
          {
            id: 2,
            texto: "O tempo de espera foi adequado?",
            pilar: "Operação",
            obrigatoria: true
          }
        ]
      },
      {
        id: 2,
        nome: "Apresentação de Produtos",
        descricao: "Como os produtos são apresentados ao cliente",
        perguntas: [
          {
            id: 3,
            texto: "O atendente demonstrou conhecimento dos produtos?",
            pilar: "Vendas",
            obrigatoria: true
          },
          {
            id: 4,
            texto: "Foram oferecidas opções adequadas ao perfil do cliente?",
            pilar: "Vendas",
            obrigatoria: false
          }
        ]
      }
    ]
  };

  const getPilarColor = (pilar: string) => {
    switch (pilar) {
      case "Experiência":
        return "bg-blue-100 text-blue-800";
      case "Operação":
        return "bg-green-100 text-green-800";
      case "Vendas":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalPerguntas = checklist.momentos.reduce((total, momento) => total + momento.perguntas.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/checklists')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">{checklist.nome}</h1>
            <Badge variant={checklist.status === 'Ativo' ? 'default' : 'secondary'}>
              {checklist.status}
            </Badge>
          </div>
          <p className="text-gray-600 mt-2">{checklist.descricao}</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Edit className="h-4 w-4" />
          Editar Checklist
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Momentos da Verdade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{checklist.momentos.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total de Perguntas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalPerguntas}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Última Atualização</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">{checklist.ultimaAtualizacao}</div>
          </CardContent>
        </Card>
      </div>

      {/* Momentos da Verdade */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Momentos da Verdade</h2>
        {checklist.momentos.map((momento, index) => (
          <Card key={momento.id} className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <CardTitle className="text-xl">{momento.nome}</CardTitle>
                  <CardDescription className="mt-1">{momento.descricao}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Perguntas ({momento.perguntas.length})
                </h4>
                {momento.perguntas.map((pergunta, qIndex) => (
                  <div key={pergunta.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="bg-gray-200 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                        {qIndex + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{pergunta.texto}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge className={getPilarColor(pergunta.pilar)}>
                            {pergunta.pilar}
                          </Badge>
                          {pergunta.obrigatoria ? (
                            <div className="flex items-center gap-1 text-red-600 text-sm">
                              <AlertCircle className="h-3 w-3" />
                              Obrigatória
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                              <CheckCircle className="h-3 w-3" />
                              Opcional
                            </div>
                          )}
                        </div>
                        <div className="mt-3 text-sm text-gray-600">
                          <strong>Opções de resposta:</strong> Conforme, Não Conforme, Não se aplica
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};