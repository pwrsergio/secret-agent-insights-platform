import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Pergunta {
  id: string;
  texto: string;
  pilar: "Experiência" | "Operação" | "Vendas";
  obrigatoria: boolean;
}

interface Momento {
  id: string;
  nome: string;
  descricao: string;
  perguntas: Pergunta[];
}

interface CreateChecklistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const CreateChecklistModal = ({ open, onOpenChange, onSuccess }: CreateChecklistModalProps) => {
  const { toast } = useToast();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [momentos, setMomentos] = useState<Momento[]>([
    {
      id: "1",
      nome: "",
      descricao: "",
      perguntas: []
    }
  ]);

  const addMomento = () => {
    const newMomento: Momento = {
      id: Date.now().toString(),
      nome: "",
      descricao: "",
      perguntas: []
    };
    setMomentos([...momentos, newMomento]);
  };

  const removeMomento = (id: string) => {
    setMomentos(momentos.filter(m => m.id !== id));
  };

  const updateMomento = (id: string, field: keyof Momento, value: string) => {
    setMomentos(momentos.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const addPergunta = (momentoId: string) => {
    const newPergunta: Pergunta = {
      id: Date.now().toString(),
      texto: "",
      pilar: "Experiência",
      obrigatoria: true
    };
    
    setMomentos(momentos.map(m => 
      m.id === momentoId 
        ? { ...m, perguntas: [...m.perguntas, newPergunta] }
        : m
    ));
  };

  const removePergunta = (momentoId: string, perguntaId: string) => {
    setMomentos(momentos.map(m => 
      m.id === momentoId 
        ? { ...m, perguntas: m.perguntas.filter(p => p.id !== perguntaId) }
        : m
    ));
  };

  const updatePergunta = (momentoId: string, perguntaId: string, field: keyof Pergunta, value: any) => {
    setMomentos(momentos.map(m => 
      m.id === momentoId 
        ? { 
            ...m, 
            perguntas: m.perguntas.map(p => 
              p.id === perguntaId ? { ...p, [field]: value } : p
            )
          }
        : m
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome.trim()) {
      toast({
        title: "Erro",
        description: "Nome do checklist é obrigatório",
        variant: "destructive"
      });
      return;
    }

    // Simular criação
    console.log("Criando checklist:", { nome, descricao, status, momentos });
    
    toast({
      title: "Sucesso!",
      description: "Checklist criado com sucesso"
    });

    // Reset form
    setNome("");
    setDescricao("");
    setStatus("Ativo");
    setMomentos([{ id: "1", nome: "", descricao: "", perguntas: [] }]);
    
    onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Checklist</DialogTitle>
          <DialogDescription>
            Preencha as informações do checklist, momentos da verdade e perguntas
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informações Básicas</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Checklist *</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Atendimento - Loja Centro"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Rascunho">Rascunho</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição do checklist..."
              />
            </div>
          </div>

          {/* Momentos da Verdade */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Momentos da Verdade</h3>
              <Button type="button" variant="outline" onClick={addMomento}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Momento
              </Button>
            </div>

            {momentos.map((momento, momentoIndex) => (
              <div key={momento.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Momento {momentoIndex + 1}</h4>
                  {momentos.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMomento(momento.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do Momento</Label>
                    <Input
                      value={momento.nome}
                      onChange={(e) => updateMomento(momento.id, "nome", e.target.value)}
                      placeholder="Ex: Recepção do Cliente"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Descrição</Label>
                    <Input
                      value={momento.descricao}
                      onChange={(e) => updateMomento(momento.id, "descricao", e.target.value)}
                      placeholder="Descrição do momento..."
                    />
                  </div>
                </div>

                {/* Perguntas */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">Perguntas</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addPergunta(momento.id)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Pergunta
                    </Button>
                  </div>

                  {momento.perguntas.map((pergunta, perguntaIndex) => (
                    <div key={pergunta.id} className="bg-gray-50 p-3 rounded border space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Pergunta {perguntaIndex + 1}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removePergunta(momento.id, pergunta.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Input
                          value={pergunta.texto}
                          onChange={(e) => updatePergunta(momento.id, pergunta.id, "texto", e.target.value)}
                          placeholder="Digite a pergunta..."
                        />
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Select 
                            value={pergunta.pilar} 
                            onValueChange={(value) => updatePergunta(momento.id, pergunta.id, "pilar", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Experiência">Experiência</SelectItem>
                              <SelectItem value="Operação">Operação</SelectItem>
                              <SelectItem value="Vendas">Vendas</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select 
                            value={pergunta.obrigatoria ? "sim" : "não"} 
                            onValueChange={(value) => updatePergunta(momento.id, pergunta.id, "obrigatoria", value === "sim")}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sim">Obrigatória</SelectItem>
                              <SelectItem value="não">Opcional</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Checklist
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};