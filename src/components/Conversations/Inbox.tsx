import React, { useState } from 'react';
import {
  User,
  AtSign,
  Inbox as InboxIcon,
  Users,
  Star,
  Headphones as HeadphonesIcon,
  Globe,
  Settings,
  ChevronDown,
  LucideIcon
} from "lucide-react";
import ChatList from './chatlist';
interface ConversationItem {
  icon: LucideIcon;
  label: string;
  count: number;
}

const Inbox: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  const conversations: ConversationItem[] = [
    { icon: User, label: "You", count: 5 },
    { icon: AtSign, label: "Mentions", count: 2 },
    { icon: InboxIcon, label: "All", count: 234 },
    { icon: Users, label: "Unassigned", count: 20 },
    { icon: Star, label: "Sales", count: 142 },
    { icon: HeadphonesIcon, label: "Support", count: 4 },
    { icon: Globe, label: "Global Sales", count: 23 },
  ];

  const handleTabClick = (label: string) => {
    setSelectedTab(prevTab => prevTab === label ? null : label);
  };

  return (
    <div className="relative flex h-screen ">
      <div className="w-[272px] bg-gray-50 border-r border-gray-200 flex flex-col">
        {/* header */}
        <div className="flex items-center justify-between px-4 py-4 mb-4">
          <h1 className="text-xl font-medium text-[#1c1c1c]">Inbox</h1>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
        {/* conversations */}
        <div className="flex-grow flex flex-col overflow-y-auto px-4 gap-[15px]">
          <h2 className="text-xs font-semibold text-[#969696] mb-3">
            CONVERSATIONS
          </h2>
          <ul className="space-y-2 mb-4">
            {conversations.map((item, index) => (
              <li
                key={index}
                className={`flex items-center justify-between py-1.5 px-2 hover:bg-gray-100 rounded cursor-pointer ${
                  selectedTab === item.label ? 'text-blue-600' : ''
                }`}
                onClick={() => handleTabClick(item.label)}
              >
                <div className="flex items-center">
                  <item.icon className={`w-5 h-5 mr-3 ${
                    selectedTab === item.label ? 'text-blue-600' : 'text-[#585757]'
                  }`} />
                  <span className={`text-sm ${
                    selectedTab === item.label ? 'text-blue-600' : 'text-[#585757]'
                  }`}>{item.label}</span>
                </div>
                <span className={`text-sm font-medium ${
                  selectedTab === item.label ? 'text-blue-600' : 'text-[#585757]'
                }`}>
                  {item.count}
                </span>
              </li>
            ))}
          </ul>
          {/* Show hidden */}
          <div className="flex items-center justify-between py-2 text-[#969696] text-sm mb-4">
            <span>Show 20 hidden</span>
            <Settings className="w-4 h-4" />
          </div>
          {/* Additional sections */}
          <div className="space-y-3 flex flex-col gap-[15px] text-sm text-gray-500">
            <p>ASSIGNMENT RULES</p>
            <p>REPORTS</p>
            <p>START GUIDE</p>
          </div>
        </div>
      </div>
      {selectedTab && (
        <div className="absolute left-[272px] top-0 bottom-0 z-50">
          <ChatList />
        </div>
      )}
    </div>
  );
};

export default Inbox;