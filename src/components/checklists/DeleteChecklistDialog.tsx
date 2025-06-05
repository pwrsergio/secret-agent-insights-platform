import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";

interface DeleteChecklistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checklistId?: number;
  checklistName?: string;
  onSuccess?: () => void;
}

export const DeleteChecklistDialog = ({ 
  open, 
  onOpenChange, 
  checklistId, 
  checklistName = "este checklist",
  onSuccess 
}: DeleteChecklistDialogProps) => {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!checklistId) return;

    setIsDeleting(true);
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Checklist deletado:", checklistId);
      toast({
        title: "Checklist excluído",
        description: `O checklist "${checklistName}" foi excluído com sucesso.`,
      });
      
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Erro ao excluir checklist",
        description: "Não foi possível excluir o checklist. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-left">
                Excluir Checklist
              </AlertDialogTitle>
            </div>
          </div>
          <AlertDialogDescription className="text-left">
            Tem certeza que deseja excluir o checklist{" "}
            <span className="font-semibold">"{checklistName}"</span>?
            <br />
            <br />
            Esta ação não pode ser desfeita. Todos os dados associados a este 
            checklist, incluindo momentos da verdade, perguntas e possíveis 
            respostas de clientes ocultos serão permanentemente removidos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isDeleting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Excluindo...
              </div>
            ) : (
              "Excluir Checklist"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};