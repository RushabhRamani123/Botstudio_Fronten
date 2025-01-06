import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { ReplyModalProps } from "./ChatDTO";
import { templates } from "../../data";
const ReplyModal: React.FC<ReplyModalProps> = ({ isOpen, onClose, onSend }) => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const handleSend = () => {
    if (selectedTemplate) {
      onSend(selectedTemplate);
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a Reply Template</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {templates.map((template, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                id={`template-${index}`}
                name="template"
                value={template}
                checked={selectedTemplate === template}
                onChange={() => setSelectedTemplate(template)}
              />
              <label htmlFor={`template-${index}`}>{template}</label>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={!selectedTemplate}>
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ReplyModal;