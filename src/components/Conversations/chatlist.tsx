import React, { useState } from 'react';
import { ChevronDown, X, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import useStore from '../../app/chatStore';
interface Chat{
onClose?:()=>void; 
}
const ChatList: React.FC<Chat>= () => {
  const { chats, setSelectedChatId, selectedChatId } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [off, setOff] = useState(false);

  const handleCross = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('handleCross called, current off state:', off);
    setOff(!off);
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: off ? 'none' : 'flex' }} className="h-screen w-[320px] border-r border-gray-200 bg-white text-sm flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">All Chats</h2>
        <X onClick={handleCross} className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
      </div>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center">
          <span className="font-medium text-gray-700">Open</span>
          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {chats.length}
          </span>
          <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span>Newest</span>
          <ChevronDown className="w-4 h-4 ml-1" />
        </div>
      </div>
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <Input
            className="pl-10 bg-gray-100 border-0"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div onClick={handleCross} className="overflow-y-auto flex-grow">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={`px-4 py-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out ${selectedChatId === chat.id ? 'bg-gray-100' : ''}`}
            onClick={() => setSelectedChatId(chat.id)}
          >
            <div className="flex items-start mb-1">
              <Avatar className="w-10 h-10 mr-3">
                <AvatarImage src={`/api/placeholder/40/40`} alt={chat.name} />
                <AvatarFallback>{chat.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className={`font-semibold truncate 
                    ${chat.unread ? 'text-gray-900' : 'text-gray-700'}
                    `
                    }>
                    {chat.name}
                  </h3>
                  <span className={`text-xs ${chat.unread ? 'text-blue-600 font-semibold' : 'text-gray-500'} ml-2 flex-shrink-0`}>
                    {""}
                  </span>
                </div>
                {""}
              </div>
            </div>
            <p className={`text-sm truncate ${chat.unread ? 'text-gray-900' : 'text-gray-600'}`}>
              {chat.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;