import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { CreateChecklistModal } from "@/components/checklists/CreateChecklistModal";
import { EditChecklistModal } from "@/components/checklists/EditChecklistModal";
import { DeleteChecklistDialog } from "@/components/checklists/DeleteChecklistDialog";

export const Checklists = () => {
  const navigate = useNavigate();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedChecklistId, setSelectedChecklistId] = useState<number | undefined>();
  const [selectedChecklistName, setSelectedChecklistName] = useState<string>("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const checklists = [
    {
      id: 1,
      nome: "Atendimento - Loja Centro",
      descricao: "Avaliação completa do atendimento ao cliente",
      momentos: 5,
      perguntas: 25,
      status: "Ativo",
      ultimaAtualizacao: "2024-01-15"
    },
    {
      id: 2,
      nome: "Operação - Drive Thru",
      descricao: "Checklist específico para operação drive-thru",
      momentos: 3,
      perguntas: 18,
      status: "Ativo",
      ultimaAtualizacao: "2024-01-10"
    },
    {
      id: 3,
      nome: "Vendas - Produtos Premium",
      descricao: "Avaliação de técnicas de venda de produtos premium",
      momentos: 4,
      perguntas: 20,
      status: "Rascunho",
      ultimaAtualizacao: "2024-01-08"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Checklists</h2>
          <p className="text-gray-600 mt-2">Gerencie seus checklists e momentos da verdade</p>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setCreateModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Novo Checklist
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {checklists.map((checklist) => (
          <Card key={checklist.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{checklist.nome}</CardTitle>
                  <CardDescription className="mt-2">
                    {checklist.descricao}
                  </CardDescription>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  checklist.status === 'Ativo' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {checklist.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Momentos da Verdade:</span>
                  <span className="font-medium">{checklist.momentos}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total de Perguntas:</span>
                  <span className="font-medium">{checklist.perguntas}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Última Atualização:</span>
                  <span className="font-medium">{checklist.ultimaAtualizacao}</span>
                </div>
                
                <div className="flex gap-2 pt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate(`/checklists/${checklist.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedChecklistId(checklist.id);
                      setEditModalOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => {
                      setSelectedChecklistId(checklist.id);
                      setSelectedChecklistName(checklist.nome);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modals e Dialogs */}
      <CreateChecklistModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={() => setRefreshTrigger(prev => prev + 1)}
      />

      <EditChecklistModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        checklistId={selectedChecklistId}
        onSuccess={() => setRefreshTrigger(prev => prev + 1)}
      />

      <DeleteChecklistDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        checklistId={selectedChecklistId}
        checklistName={selectedChecklistName}
        onSuccess={() => setRefreshTrigger(prev => prev + 1)}
      />
    </div>
  );
};