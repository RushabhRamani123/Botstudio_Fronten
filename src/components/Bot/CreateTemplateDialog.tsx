import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";

interface CreateTemplateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  TemplateName: string;
  onTemplateNameChange: (value: string) => void;
  onCreateTemplate: () => void;
}
export const CreateTemplateDialog = ({
  isOpen,
  onClose,
  TemplateName,
  onTemplateNameChange,
  onCreateTemplate,
}: CreateTemplateDialogProps) => {
  const handleCreate = ()=>{
    onCreateTemplate(); 
    onClose();
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Template</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Enter Template name"
          value={TemplateName}
          onChange={(e) => onTemplateNameChange(e.target.value)}
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
