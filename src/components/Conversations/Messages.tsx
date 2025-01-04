import {useState} from 'react';
import Inbox from "./Inbox";
import UserProfileChat from "./Chat";
import ChatList from "./chatlist";
const Messages: React.FC = () => {
  const [isChatListVisible, setIsChatListVisible] = useState<boolean>(false);
  return (
    <div className="flex h-screen">
      <div className="w-[272px] flex-shrink-0">
        <Inbox />
      </div>
      {isChatListVisible && (
        <div className="w-[319px] border-r border-gray-200">
          <ChatList 
            onClose={() => setIsChatListVisible(false)} 
          />
        </div>
      )}
      <div className="flex flex-grow">
        <UserProfileChat />
      </div>
    </div>
  );
};

export default Messages;