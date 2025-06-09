import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Edit, Eye, CheckCircle, XCircle, AlertCircle, Mail, Send, Copy, RefreshCw, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ChecklistDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Estados para envio de convites
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("Convite para Avaliação - Cliente Oculto");
  const [emailMessage, setEmailMessage] = useState("Você foi convidado para realizar uma avaliação como cliente oculto. Clique no link abaixo para acessar o formulário.");

  // Mock data para acompanhamento
  const [convites] = useState([
    {
      id: 1,
      email: "ana.oliveira@email.com",
      status: "Preenchido",
      dataEnvio: "2024-01-15",
      dataResposta: "2024-01-16",
      link: "https://app.com/formulario/abc123"
    },
    {
      id: 2,
      email: "joao.ferreira@email.com", 
      status: "Pendente",
      dataEnvio: "2024-01-14",
      dataResposta: null,
      link: "https://app.com/formulario/def456"
    },
    {
      id: 3,
      email: "carla.mendes@email.com",
      status: "Expirado",
      dataEnvio: "2024-01-10",
      dataResposta: null,
      link: "https://app.com/formulario/ghi789"
    }
  ]);

  // Mock data para respostas consolidadas
  const [respostasConsolidadas] = useState([
    {
      momento: "Recepção do Cliente",
      totalPerguntas: 2,
      conformes: 8,
      naoConformes: 1,
      naAplica: 1,
      percentualConformidade: 89
    },
    {
      momento: "Apresentação de Produtos",
      totalPerguntas: 2,
      conformes: 7,
      naoConformes: 2,
      naAplica: 1,
      percentualConformidade: 78
    }
  ]);

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

  const addEmail = () => {
    if (currentEmail && !emails.includes(currentEmail)) {
      setEmails([...emails, currentEmail]);
      setCurrentEmail("");
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter(email => email !== emailToRemove));
  };

  const sendInvites = () => {
    if (emails.length === 0) {
      toast({
        title: "Erro",
        description: "Adicione pelo menos um e-mail para enviar convites",
        variant: "destructive"
      });
      return;
    }

    // Simular envio
    console.log("Enviando convites para:", emails);
    toast({
      title: "Convites enviados!",
      description: `${emails.length} convite(s) enviado(s) com sucesso`,
    });
    setEmails([]);
  };

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copiado!",
      description: "O link foi copiado para a área de transferência",
    });
  };

  const resendInvite = (email: string) => {
    // Simular reenvio
    toast({
      title: "Convite reenviado!",
      description: `Convite reenviado para ${email}`,
    });
  };

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

      {/* Tabs com todas as funcionalidades */}
      <Tabs defaultValue="visao-geral" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="formulario">Formulário</TabsTrigger>
          <TabsTrigger value="convites">Envio de Convites</TabsTrigger>
          <TabsTrigger value="acompanhamento">Acompanhamento</TabsTrigger>
          <TabsTrigger value="respostas">Respostas</TabsTrigger>
        </TabsList>

        {/* Aba Visão Geral */}
        <TabsContent value="visao-geral" className="space-y-6">
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
        </TabsContent>

        {/* Aba Formulário */}
        <TabsContent value="formulario" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview do Formulário</CardTitle>
              <CardDescription>
                Visualização de como o formulário aparecerá para os clientes ocultos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold">{checklist.nome}</h3>
                  <p className="text-gray-600">{checklist.descricao}</p>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="text-sm">
                      <span className="font-medium">Momentos:</span> {checklist.momentos.length}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Perguntas:</span> {totalPerguntas}
                    </div>
                  </div>
                  <Button 
                    onClick={() => window.open(`/formulario/${id}`, '_blank')}
                    className="mt-4"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar Formulário Completo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Envio de Convites */}
        <TabsContent value="convites" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enviar Convites para Clientes Ocultos</CardTitle>
              <CardDescription>
                Configure e envie convites por e-mail para os avaliadores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Configuração do e-mail */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto do E-mail</Label>
                  <Input
                    id="subject"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              {/* Adicionar e-mails */}
              <div className="space-y-4">
                <Label>E-mails dos Avaliadores</Label>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="exemplo@email.com"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addEmail()}
                  />
                  <Button type="button" onClick={addEmail}>
                    Adicionar
                  </Button>
                </div>

                {/* Lista de e-mails */}
                {emails.length > 0 && (
                  <div className="space-y-2">
                    <Label>E-mails Adicionados ({emails.length})</Label>
                    <div className="flex flex-wrap gap-2">
                      {emails.map((email, index) => (
                        <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                          {email}
                          <button
                            onClick={() => removeEmail(email)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button onClick={sendInvites} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Convites ({emails.length})
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Acompanhamento */}
        <TabsContent value="acompanhamento" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Acompanhamento de Convites</CardTitle>
              <CardDescription>
                Status dos convites enviados e respostas recebidas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data Envio</TableHead>
                    <TableHead>Data Resposta</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {convites.map((convite) => (
                    <TableRow key={convite.id}>
                      <TableCell>{convite.email}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            convite.status === 'Preenchido' ? 'default' :
                            convite.status === 'Pendente' ? 'secondary' : 
                            'destructive'
                          }
                        >
                          {convite.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{convite.dataEnvio}</TableCell>
                      <TableCell>{convite.dataResposta || '-'}</TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyLink(convite.link)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        {convite.status !== 'Preenchido' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => resendInvite(convite.email)}
                          >
                            <RefreshCw className="h-3 w-3" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Respostas Consolidadas */}
        <TabsContent value="respostas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Análise das Respostas</CardTitle>
              <CardDescription>
                Consolidação e análise dos dados coletados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Resumo geral */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">10</div>
                      <p className="text-xs text-muted-foreground">Total Respostas</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-green-600">83%</div>
                      <p className="text-xs text-muted-foreground">Conformidade Geral</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-blue-600">15</div>
                      <p className="text-xs text-muted-foreground">Conformes</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-red-600">3</div>
                      <p className="text-xs text-muted-foreground">Não Conformes</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Detalhamento por momento */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Análise por Momento da Verdade</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Momento</TableHead>
                        <TableHead>Perguntas</TableHead>
                        <TableHead>Conformes</TableHead>
                        <TableHead>Não Conformes</TableHead>
                        <TableHead>N/A</TableHead>
                        <TableHead>% Conformidade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {respostasConsolidadas.map((resposta, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{resposta.momento}</TableCell>
                          <TableCell>{resposta.totalPerguntas}</TableCell>
                          <TableCell className="text-green-600">{resposta.conformes}</TableCell>
                          <TableCell className="text-red-600">{resposta.naoConformes}</TableCell>
                          <TableCell className="text-gray-500">{resposta.naAplica}</TableCell>
                          <TableCell>
                            <Badge variant={resposta.percentualConformidade >= 80 ? "default" : "destructive"}>
                              {resposta.percentualConformidade}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => navigate('/relatorios')}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Ver Relatórios Completos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};