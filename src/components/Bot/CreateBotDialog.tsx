import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";

interface CreateBotDialogProps {
  isOpen: boolean;
  onClose: () => void;
  botName: string;
  onBotNameChange: (value: string) => void;
  onCreateBot: () => void;
}
export const CreateBotDialog = ({
  isOpen,
  onClose,
  botName,
  onBotNameChange,
  onCreateBot,
}: CreateBotDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Bot</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Enter bot name"
          value={botName}
          onChange={(e) => onBotNameChange(e.target.value)}
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onCreateBot}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
