import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const perguntaSchema = z.object({
  texto: z.string().min(5, "Pergunta deve ter pelo menos 5 caracteres"),
  pilar: z.enum(["Experiência", "Operação", "Vendas"]),
  obrigatoria: z.boolean(),
});

const momentoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  descricao: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  perguntas: z.array(perguntaSchema).min(1, "Cada momento deve ter pelo menos 1 pergunta"),
});

const checklistSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  descricao: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  status: z.enum(["Ativo", "Rascunho"]),
  momentos: z.array(momentoSchema).min(1, "Checklist deve ter pelo menos 1 momento da verdade"),
});

type ChecklistFormData = z.infer<typeof checklistSchema>;

interface CreateChecklistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const CreateChecklistModal = ({ open, onOpenChange, onSuccess }: CreateChecklistModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ChecklistFormData>({
    resolver: zodResolver(checklistSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      status: "Rascunho",
      momentos: [
        {
          nome: "",
          descricao: "",
          perguntas: [
            {
              texto: "",
              pilar: "Experiência",
              obrigatoria: true,
            }
          ]
        }
      ],
    },
  });

  const { fields: momentosFields, append: appendMomento, remove: removeMomento } = useFieldArray({
    control: form.control,
    name: "momentos",
  });

  const onSubmit = async (data: ChecklistFormData) => {
    setIsSubmitting(true);
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Checklist criado:", data);
      toast({
        title: "Checklist criado com sucesso!",
        description: `O checklist "${data.nome}" foi criado.`,
      });
      
      form.reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Erro ao criar checklist",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Checklist</DialogTitle>
          <DialogDescription>
            Crie um novo checklist com momentos da verdade e perguntas específicas.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Checklist</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Atendimento - Loja Centro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Rascunho">Rascunho</SelectItem>
                        <SelectItem value="Ativo">Ativo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva o objetivo deste checklist..."
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Momentos da Verdade */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Momentos da Verdade</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendMomento({
                    nome: "",
                    descricao: "",
                    perguntas: [{ texto: "", pilar: "Experiência", obrigatoria: true }]
                  })}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar Momento
                </Button>
              </div>

              {momentosFields.map((momento, momentoIndex) => (
                <MomentoCard
                  key={momento.id}
                  momentoIndex={momentoIndex}
                  form={form}
                  onRemove={() => removeMomento(momentoIndex)}
                  canRemove={momentosFields.length > 1}
                />
              ))}
            </div>

            <DialogFooter className="gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Criando..." : "Criar Checklist"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

interface MomentoCardProps {
  momentoIndex: number;
  form: any;
  onRemove: () => void;
  canRemove: boolean;
}

const MomentoCard = ({ momentoIndex, form, onRemove, canRemove }: MomentoCardProps) => {
  const { fields: perguntasFields, append: appendPergunta, remove: removePergunta } = useFieldArray({
    control: form.control,
    name: `momentos.${momentoIndex}.perguntas`,
  });

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <GripVertical className="h-4 w-4 text-gray-400" />
            Momento {momentoIndex + 1}
          </CardTitle>
          {canRemove && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={`momentos.${momentoIndex}.nome`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Momento</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Recepção do Cliente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name={`momentos.${momentoIndex}.descricao`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descreva este momento da verdade..."
                  rows={2}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Perguntas */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Perguntas</h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendPergunta({ texto: "", pilar: "Experiência", obrigatoria: true })}
            >
              <Plus className="h-3 w-3 mr-1" />
              Adicionar Pergunta
            </Button>
          </div>

          {perguntasFields.map((pergunta, perguntaIndex) => (
            <div key={pergunta.id} className="border rounded-lg p-3 bg-gray-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Pergunta {perguntaIndex + 1}
                </span>
                {perguntasFields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removePergunta(perguntaIndex)}
                    className="text-red-600 hover:text-red-700 h-6 w-6 p-0"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>

              <FormField
                control={form.control}
                name={`momentos.${momentoIndex}.perguntas.${perguntaIndex}.texto`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea 
                        placeholder="Digite a pergunta..."
                        rows={2}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  name={`momentos.${momentoIndex}.perguntas.${perguntaIndex}.pilar`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-xs">Pilar</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Experiência">Experiência</SelectItem>
                          <SelectItem value="Operação">Operação</SelectItem>
                          <SelectItem value="Vendas">Vendas</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`momentos.${momentoIndex}.perguntas.${perguntaIndex}.obrigatoria`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 space-y-0 pt-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-xs">Obrigatória</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};