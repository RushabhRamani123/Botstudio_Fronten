import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from '../ui/button';
import { Clock, CheckCircle2, MoreVertical } from 'lucide-react';
import useStore from '../../app/chatStore';

interface ChatHeaderProps {
  userName: string;
  avatarSrc: string;
  openDrawer: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ userName, avatarSrc, openDrawer }) => {
  const { selectedChatId, updateChat } = useStore();

  const handleMarkAsRead = () => {
    if (selectedChatId) {
      updateChat(selectedChatId, { unread: false });
    }
  };

  return (
    <div className="bg-white p-4 flex items-center justify-between border-blue-300 border-b-2">
      <div className="flex items-center">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src={avatarSrc} alt={userName} />
          <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold cursor-pointer" onClick={openDrawer}>{userName}</h2>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" title="Set reminder">
          <Clock className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleMarkAsRead} title="Mark as read">
          <CheckCircle2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="More options">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;