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

interface DeleteChecklistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checklistId?: number;
  checklistName: string;
  onSuccess: () => void;
}

export const DeleteChecklistDialog = ({ 
  open, 
  onOpenChange, 
  checklistId, 
  checklistName, 
  onSuccess 
}: DeleteChecklistDialogProps) => {
  const { toast } = useToast();

  const handleDelete = () => {
    // Simular exclusão
    console.log("Deletando checklist:", checklistId);
    
    toast({
      title: "Checklist excluído",
      description: `O checklist "${checklistName}" foi excluído com sucesso.`,
    });
    
    onSuccess();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o checklist "{checklistName}"?
            <br />
            <br />
            <strong>Esta ação não pode ser desfeita.</strong> Todos os dados relacionados 
            a este checklist, incluindo respostas e relatórios, serão permanentemente removidos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Excluir Checklist
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};