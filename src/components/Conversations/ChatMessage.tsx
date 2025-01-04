import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from '../ui/card';
import { Camera, Paperclip, FileText, Bot, TriangleAlert } from 'lucide-react';

interface ChatMessageProps {
  text: string;
  sender: 'user' | 'bot' | 'employee';
  timestamp: string;
  isNote: boolean|undefined;
  avatarSrc: string;
  attachmentType?: 'image' | 'file' | 'document';
  dateSeparator?: string;
}

const DateSeparator: React.FC<{ date: string }> = ({ date }) => (
  <div className="flex items-center my-4">
    <div className="flex-grow border-t border-gray-300"></div>
    <div className="mx-4 text-xs text-white rounded-md p-2 bg-gray-400 uppercase">{date}</div>
    <div className="flex-grow border-t border-gray-300"></div>
  </div>
);

const ChatMessage: React.FC<ChatMessageProps> = ({
  text,
  sender,
  timestamp,
  isNote,
  avatarSrc,
  attachmentType,
  dateSeparator
}) => {
  const isUser = sender === 'user';
  const isEmployee = sender === 'employee';
  const isBot = sender === 'bot';

  const getBackgroundColor = () => {
    if (isEmployee) return isNote ? 'bg-yellow-100' : 'bg-green-100';
    return 'bg-gray-100';
  };

  const getAttachmentIcon = () => {
    switch (attachmentType) {
      case 'image': return <Camera className="w-4 h-4 text-gray-500" />;
      case 'file': return <Paperclip className="w-4 h-4 text-gray-500" />;
      case 'document': return <FileText className="w-4 h-4 text-gray-500" />;
      default: return null;
    }
  };

  return (
    <>
      {dateSeparator && <DateSeparator date={dateSeparator} />}
      <div className={`flex items-start ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        {!isUser && (
          <Avatar className="h-8 w-8 mr-2">
            {isBot ? (
              <div className="h-full w-full flex items-center justify-center bg-blue-500 text-white rounded-full">
                <Bot size={20} />
              </div>
            ) : (
                <div className={`${isNote?'hidden':''} h-full w-full flex items-center justify-center bg-gray-200  rounded-full`}>
                {sender[0].toUpperCase()}
              </div>
            )}
          </Avatar>
        )}
        <Card className={`max-w-[80%] ${getBackgroundColor()}`}>
          <CardContent className="p-3">
            <div className="flex items-start">
              {isNote && <TriangleAlert size={16} className="text-yellow-500 mr-2 mt-1 flex-shrink-0" />}
              <p className={`text-sm ${isNote ? 'font-medium' : ''}`}>{text}</p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">{timestamp}</span>
              {attachmentType && (
                <div className="flex items-center">
                  {getAttachmentIcon()}
                  <span className="text-xs text-gray-500 ml-1">Attachment</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        {isUser && (
          <Avatar className="h-8 w-8 ml-2">
            <AvatarImage src={avatarSrc} alt="You" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
        )}
      </div>
    </>
  );
};

export default ChatMessage;