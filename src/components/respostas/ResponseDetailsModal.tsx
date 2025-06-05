import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Minus } from "lucide-react";

interface ResponseDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  response: {
    id: string;
    checklist: string;
    clienteOculto: string;
    data: string;
    conformidade: number;
    momentos: Array<{
      nome: string;
      perguntas: Array<{
        pergunta: string;
        pilar: "Experiência" | "Operação" | "Vendas";
        avaliacao: "CF" | "NC" | "NA";
        observacao: string;
      }>;
    }>;
  } | null;
}

export const ResponseDetailsModal = ({ open, onOpenChange, response }: ResponseDetailsModalProps) => {
  if (!response) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CF":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "NC":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "NA":
        return <Minus className="h-4 w-4 text-gray-600" />;
      default:
        return null;
    }
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes da Resposta - {response.checklist}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Cliente Oculto: <span className="font-medium">{response.clienteOculto}</span></p>
              <p className="text-sm text-gray-600">Data: <span className="font-medium">{response.data}</span></p>
            </div>
            <Badge variant="outline" className="text-lg">
              {response.conformidade}% Conformidade
            </Badge>
          </div>

          <div className="space-y-6">
            {response.momentos.map((momento, momentoIndex) => (
              <Card key={momentoIndex}>
                <CardHeader>
                  <CardTitle className="text-lg">{momento.nome}</CardTitle>
                  <CardDescription>Momento da Verdade</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {momento.perguntas.map((pergunta, perguntaIndex) => (
                      <div key={perguntaIndex} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <p className="font-medium text-gray-900">{pergunta.pergunta}</p>
                          <div className="flex items-center gap-2">
                            <Badge className={getPilarColor(pergunta.pilar)}>
                              {pergunta.pilar}
                            </Badge>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(pergunta.avaliacao)}
                              <span className="text-sm font-medium">{pergunta.avaliacao}</span>
                            </div>
                          </div>
                        </div>
                        {pergunta.observacao && (
                          <div className="bg-gray-50 rounded p-3">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Observação:</span> {pergunta.observacao}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};