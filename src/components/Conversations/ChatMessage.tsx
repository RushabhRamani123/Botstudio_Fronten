import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from '../ui/card';
import { Bot, TriangleAlert } from 'lucide-react';
import DateSeparator from './DateSeprator'; 
import { ChatMessageProps } from './ChatDTO';
const ChatMessage: React.FC<ChatMessageProps> = ({
  text,
  GIFlink,
  ImageLink,
  sender,
  timestamp,
  isNote,
  avatarSrc,
  dateSeparator
}) => {
  const isUser = sender === 'user';
  const isEmployee = sender === 'employee';
  const isBot = sender === 'bot';
  // This gives different color for employee | customer 
  const getBackgroundColor = () => {
    if (isEmployee) return isNote ? 'bg-yellow-100' : 'bg-green-100';
    return 'bg-gray-100';
  };
// This function renders different type of messages.
  const renderContent = () => {
  // This is for the GIF Link 
    if (GIFlink) {
      return (
        <div className="relative ">
          <img 
            src={GIFlink}
            alt="GIF message"
            className="w-full h-auto rounded-md max-h-64 object-contain"
            onError={(e) => {
              console.error('Failed to load GIF');
              e.currentTarget.style.display = 'none';
            }}
          />
          {text && (
            <p className={`text-sm mt-2 ${isNote ? 'font-medium' : ''}`}>
              {text}
            </p>
          )}
        </div>
      );
    }
  // This is the Image link 
    if (ImageLink) {
      return (
        <div className="relative">
          <img 
            src={ImageLink} 
            alt="Image"
            className="w-full h-auto rounded-md max-h-64 object-cover"
          />
          {text && (
            <p className={`text-sm mt-2 ${isNote ? 'font-medium' : ''}`}>
              {text}
            </p>
          )}
        </div>
      );
    }
  // This is for the text message 
    if (text) {
      return (
        <p className={`text-sm ${isNote ? 'font-medium' : ''}`}>{text}</p>
      );
    }
    return null;
  };
  return (
    <>
      {/* This UI will come when datesprator  is needed */}
      {dateSeparator && <DateSeparator date={dateSeparator} />}
      {/* The UI for the messsage  */}
      <div className={`flex items-start ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        {/* This is for the Avatar */}
        {!isUser && (
          <Avatar className="h-8 w-8 mr-2">
            {isBot ? (
              <div className="h-full w-full flex items-center justify-center bg-blue-500 text-white rounded-full">
                <Bot size={20} />
              </div>
            ) : (
              <div className={`${isNote ? 'hidden' : ''} h-full w-full flex items-center justify-center bg-gray-200 rounded-full`}>
                {sender[0].toUpperCase()}
              </div>
            )}
          </Avatar>
        )}
        {/* This for the message UI  */}
        <Card className={`max-w-[80%] ${getBackgroundColor()}`}>
          <CardContent className="p-3">
            <div className="flex items-start">
              {isNote && (
                <TriangleAlert 
                  size={16} 
                  className="text-yellow-500 mr-2 mt-1 flex-shrink-0" 
                />
              )}
              {renderContent()}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">{timestamp}</span>
            </div>
          </CardContent>
        </Card>
        {/* This is for the Avatar Fallback */}
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