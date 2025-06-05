import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload, Plus, X, Send } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Mock data do checklist - normalmente viria da API
const mockChecklist = {
  id: "1",
  nome: "Atendimento - Loja Centro",
  descricao: "Avaliação do atendimento ao cliente na loja centro",
  momentos: [
    {
      nome: "Recepção ao Cliente",
      perguntas: [
        {
          id: "1",
          pergunta: "O atendente cumprimentou adequadamente?",
          pilar: "Experiência" as const,
          obrigatoria: true
        },
        {
          id: "2", 
          pergunta: "O tempo de espera foi adequado?",
          pilar: "Operação" as const,
          obrigatoria: true
        }
      ]
    },
    {
      nome: "Atendimento Técnico",
      perguntas: [
        {
          id: "3",
          pergunta: "O atendente demonstrou conhecimento do produto?",
          pilar: "Vendas" as const,
          obrigatoria: true
        },
        {
          id: "4",
          pergunta: "As informações foram claras e precisas?",
          pilar: "Experiência" as const,
          obrigatoria: false
        }
      ]
    }
  ]
};

interface FormData {
  dataVisita: Date | undefined;
  horaVisita: string;
  clienteOculto: string;
  atendentes: string[];
  respostas: Record<string, {
    avaliacao: "CF" | "NC" | "NA" | "";
    observacao: string;
  }>;
  arquivos: File[];
}

export const FormularioResposta = () => {
  const { checklistId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    dataVisita: undefined,
    horaVisita: "",
    clienteOculto: "",
    atendentes: [""],
    respostas: {},
    arquivos: []
  });

  const [novoAtendente, setNovoAtendente] = useState("");

  const handleAddAtendente = () => {
    if (novoAtendente.trim()) {
      setFormData(prev => ({
        ...prev,
        atendentes: [...prev.atendentes.filter(a => a), novoAtendente.trim(), ""]
      }));
      setNovoAtendente("");
    }
  };

  const handleRemoveAtendente = (index: number) => {
    setFormData(prev => ({
      ...prev,
      atendentes: prev.atendentes.filter((_, i) => i !== index)
    }));
  };

  const handleAtendenteChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      atendentes: prev.atendentes.map((a, i) => i === index ? value : a)
    }));
  };

  const handleRespostaChange = (perguntaId: string, field: "avaliacao" | "observacao", value: string) => {
    setFormData(prev => ({
      ...prev,
      respostas: {
        ...prev.respostas,
        [perguntaId]: {
          ...prev.respostas[perguntaId],
          [field]: value
        }
      }
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      arquivos: [...prev.arquivos, ...files]
    }));
  };

  const handleRemoveFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      arquivos: prev.arquivos.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    if (!formData.dataVisita) {
      toast({
        title: "Erro de Validação",
        description: "Data da visita é obrigatória",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.horaVisita) {
      toast({
        title: "Erro de Validação", 
        description: "Hora da visita é obrigatória",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.clienteOculto.trim()) {
      toast({
        title: "Erro de Validação",
        description: "Nome do cliente oculto é obrigatório",
        variant: "destructive"
      });
      return false;
    }

    // Validar respostas obrigatórias
    for (const momento of mockChecklist.momentos) {
      for (const pergunta of momento.perguntas) {
        if (pergunta.obrigatoria) {
          const resposta = formData.respostas[pergunta.id];
          if (!resposta?.avaliacao) {
            toast({
              title: "Erro de Validação",
              description: `Resposta obrigatória não preenchida: ${pergunta.pergunta}`,
              variant: "destructive"
            });
            return false;
          }
        }
      }
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Simular envio
    console.log("Dados do formulário:", formData);
    
    toast({
      title: "Sucesso!",
      description: "Checklist enviado com sucesso. Obrigado pela sua avaliação!",
    });

    // Redirecionar após envio
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const getPilarColor = (pilar: string) => {
    switch (pilar) {
      case "Experiência": return "bg-blue-100 text-blue-800";
      case "Operação": return "bg-green-100 text-green-800";
      case "Vendas": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{mockChecklist.nome}</CardTitle>
          <CardDescription>{mockChecklist.descricao}</CardDescription>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle>Informações da Visita</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dataVisita">Data da Visita *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.dataVisita && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dataVisita ? format(formData.dataVisita, "dd/MM/yyyy") : "Selecione a data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dataVisita}
                      onSelect={(date) => setFormData(prev => ({ ...prev, dataVisita: date }))}
                      className="pointer-events-auto"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="horaVisita">Hora da Visita *</Label>
                <Input
                  id="horaVisita"
                  type="time"
                  value={formData.horaVisita}
                  onChange={(e) => setFormData(prev => ({ ...prev, horaVisita: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clienteOculto">Nome do Cliente Oculto *</Label>
              <Input
                id="clienteOculto"
                value={formData.clienteOculto}
                onChange={(e) => setFormData(prev => ({ ...prev, clienteOculto: e.target.value }))}
                placeholder="Digite seu nome completo"
                required
              />
            </div>

            {/* Atendentes */}
            <div className="space-y-2">
              <Label>Atendentes Avaliados</Label>
              {formData.atendentes.map((atendente, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={atendente}
                    onChange={(e) => handleAtendenteChange(index, e.target.value)}
                    placeholder="Nome do atendente"
                  />
                  {formData.atendentes.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveAtendente(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  value={novoAtendente}
                  onChange={(e) => setNovoAtendente(e.target.value)}
                  placeholder="Adicionar outro atendente"
                />
                <Button type="button" variant="outline" onClick={handleAddAtendente}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Upload de Arquivos */}
            <div className="space-y-2">
              <Label>Anexos (Fotos, Notas, Comprovantes)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="fileUpload"
                />
                <label htmlFor="fileUpload" className="cursor-pointer">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2 text-sm text-gray-600">
                      Clique para selecionar arquivos ou arraste aqui
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      PNG, JPG, PDF, DOC, TXT até 10MB cada
                    </div>
                  </div>
                </label>
              </div>
              
              {formData.arquivos.length > 0 && (
                <div className="space-y-2">
                  {formData.arquivos.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Questões do Checklist */}
        {mockChecklist.momentos.map((momento, momentoIndex) => (
          <Card key={momentoIndex}>
            <CardHeader>
              <CardTitle className="text-lg">{momento.nome}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {momento.perguntas.map((pergunta, perguntaIndex) => (
                <div key={pergunta.id} className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Label className="text-base font-medium">
                          {pergunta.pergunta}
                          {pergunta.obrigatoria && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <Badge className={getPilarColor(pergunta.pilar)}>
                          {pergunta.pilar}
                        </Badge>
                      </div>
                      
                      <RadioGroup
                        value={formData.respostas[pergunta.id]?.avaliacao || ""}
                        onValueChange={(value) => handleRespostaChange(pergunta.id, "avaliacao", value)}
                        className="flex gap-6 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="CF" id={`${pergunta.id}-cf`} />
                          <Label htmlFor={`${pergunta.id}-cf`} className="text-green-700 font-medium">
                            Conforme
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="NC" id={`${pergunta.id}-nc`} />
                          <Label htmlFor={`${pergunta.id}-nc`} className="text-red-700 font-medium">
                            Não Conforme
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="NA" id={`${pergunta.id}-na`} />
                          <Label htmlFor={`${pergunta.id}-na`} className="text-gray-700 font-medium">
                            Não se Aplica
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`obs-${pergunta.id}`}>Observações</Label>
                    <Textarea
                      id={`obs-${pergunta.id}`}
                      value={formData.respostas[pergunta.id]?.observacao || ""}
                      onChange={(e) => handleRespostaChange(pergunta.id, "observacao", e.target.value)}
                      placeholder="Adicione comentários ou observações sobre esta avaliação..."
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  {perguntaIndex < momento.perguntas.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Botão de Envio */}
        <Card>
          <CardContent className="pt-6">
            <Button type="submit" className="w-full" size="lg">
              <Send className="mr-2 h-4 w-4" />
              Enviar Checklist
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};