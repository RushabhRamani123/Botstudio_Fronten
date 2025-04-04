import React, { useEffect, useState } from 'react';
import { Send,  ImageIcon } from 'lucide-react';
import { useGifStore } from '../../app/gifStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import useStore from '../../app/chatStore';
import { genUid } from '../../utils/genUid';
const GifModal: React.FC = () => {
  const { isModalOpen, selectedGifUrl , toggleGifModal } = useGifStore();
  const {addMessage,selectedChatId} = useStore(); 
  const [message, setMessage] = useState("");
useEffect(()=>{
  console.log(isModalOpen);
},[isModalOpen])
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggleGifModal(false, null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [toggleGifModal]);

  const handleSendMessage = () => {
    addMessage({
    id: genUid(),
    chatId: selectedChatId,
    GIFlink:selectedGifUrl,
    text:message,
    sender:"employee",
    timestamp:"14:25",
    isNote:false
    })
    toggleGifModal(false, null);
  };

  const handleClose = () => {
    toggleGifModal(false, null);
    setMessage("");
  };

  return (
    <Dialog 
      open={isModalOpen} 
      onOpenChange={(open) => !open && handleClose()}
    >
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Send GIF</DialogTitle>
          
          </div>
        </DialogHeader>
        
        <div className="p-6">
          <Card className="overflow-hidden bg-muted/50">
            {selectedGifUrl ? (
              <div className="relative aspect-video w-full">
                <img
                  src={selectedGifUrl}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <CardContent className="flex items-center justify-center aspect-video">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </CardContent>
            )}
          </Card>

          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Add a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              size="icon"
              className="shrink-0"
              disabled={!selectedGifUrl}
            >
              <Send className="h-5 w-5" onClick={handleSendMessage} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GifModal;