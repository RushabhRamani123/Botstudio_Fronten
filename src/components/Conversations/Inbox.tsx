import React, { useState } from 'react';
import {
  User,
  AtSign,
  Inbox as InboxIcon,
  Users,
  Star,
  Headphones as HeadphonesIcon,
  Globe,
  MessageCircle,
  Bot,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Archive,
  LucideIcon
} from "lucide-react";
import ChatList from './chatlist';
import { ChatFilter } from '../../app/chatStore';

interface ConversationItem {
  icon: LucideIcon;
  label: string;
  count: number;
  color?: string;
  filter: ChatFilter;
}

interface CategorySection {
  title: string;
  items: ConversationItem[];
}

const Inbox: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<ChatFilter | null>(null);

  const conversationCategories: CategorySection[] = [
    {
      title: "Quick Access",
      items: [
        { 
          icon: User, 
          label: "You", 
          count: 5, 
          color: "text-violet-600",
          filter: { type: 'quick-access', subtype: 'you' }
        },
        { 
          icon: AtSign, 
          label: "Mentions", 
          count: 2, 
          color: "text-blue-600",
          filter: { type: 'quick-access', subtype: 'mentions' }
        },
        { 
          icon: InboxIcon, 
          label: "All", 
          count: 234, 
          color: "text-gray-600",
          filter: { type: 'quick-access', subtype: 'all' }
        },
      ]
    },
    {
      title: "Active Conversations",
      items: [
        { 
          icon: MessageCircle, 
          label: "Active Chats", 
          count: 15, 
          color: "text-green-600",
          filter: { type: 'active', subtype: 'active-chats' }
        },
        { 
          icon: Bot, 
          label: "Bot Handling", 
          count: 45, 
          color: "text-blue-600",
          filter: { type: 'active', subtype: 'bot-handling' }
        },
        { 
          icon: Users, 
          label: "Unassigned", 
          count: 20, 
          color: "text-orange-600",
          filter: { type: 'active', subtype: 'unassigned' }
        },
        { 
          icon: Clock, 
          label: "Waiting Response", 
          count: 12, 
          color: "text-yellow-600",
          filter: { type: 'active', subtype: 'waiting' }
        }
      ]
    },
    {
      title: "Departments",
      items: [
        { 
          icon: Star, 
          label: "Sales", 
          count: 142, 
          color: "text-purple-600",
          filter: { type: 'department', subtype: 'sales' }
        },
        { 
          icon: HeadphonesIcon, 
          label: "Support", 
          count: 4, 
          color: "text-indigo-600",
          filter: { type: 'department', subtype: 'support' }
        },
        { 
          icon: Globe, 
          label: "Global Sales", 
          count: 23, 
          color: "text-emerald-600",
          filter: { type: 'department', subtype: 'global' }
        }
      ]
    },
    {
      title: "Status",
      items: [
        { 
          icon: AlertCircle, 
          label: "Priority", 
          count: 3, 
          color: "text-red-600",
          filter: { type: 'status', subtype: 'priority' }
        },
        { 
          icon: CheckCircle2, 
          label: "Resolved", 
          count: 156, 
          color: "text-green-600",
          filter: { type: 'status', subtype: 'resolved' }
        },
        { 
          icon: XCircle, 
          label: "Unresolved", 
          count: 23, 
          color: "text-red-600",
          filter: { type: 'status', subtype: 'unresolved' }
        },
        { 
          icon: Archive, 
          label: "Archived", 
          count: 89, 
          color: "text-gray-600",
          filter: { type: 'status', subtype: 'archived' }
        }
      ]
    }
  ];

  const handleTabClick = (label: string, filter: ChatFilter) => {
    setSelectedTab(prevTab => prevTab === label ? null : label);
    setSelectedFilter(prevFilter => prevFilter?.subtype === filter.subtype ? null : filter);
  };

  return (
    <div className="relative flex h-screen">
      <div className="w-[272px] bg-gray-50 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-medium text-[#1c1c1c]">Inbox</h1>
        </div>

        {/* Categories */}
        <div className="flex-grow flex flex-col overflow-y-auto px-4 space-y-6">
          {conversationCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-2">
              <h2 className="text-xs font-semibold text-[#969696] mb-2">
                {category.title}
              </h2>
              <ul className="space-y-1">
                {category.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className={`flex items-center justify-between py-1.5 px-2 hover:bg-gray-100 rounded cursor-pointer transition-colors ${
                      selectedTab === item.label ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => handleTabClick(item.label, item.filter)}
                  >
                    <div className="flex items-center">
                      <item.icon className={`w-5 h-5 mr-3 ${
                        selectedTab === item.label ? item.color : 'text-[#585757]'
                      }`} />
                      <span className={`text-sm ${
                        selectedTab === item.label ? 'text-gray-900 font-medium' : 'text-[#585757]'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                    <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                      selectedTab === item.label 
                        ? 'bg-gray-200 text-gray-900' 
                        : 'text-[#585757]'
                    }`}>
                      {item.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Chat List Panel */}
      {selectedTab && selectedFilter && (
        <div className="absolute left-[272px] top-0 bottom-0 z-50">
          <ChatList 
            filter={selectedFilter}
            title={selectedTab}
            onClose={() => {
              setSelectedTab(null);
              setSelectedFilter(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Inbox;