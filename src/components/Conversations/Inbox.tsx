import React, { useState } from "react";
import ChatList from "./chatlist";
import { ChatFilter } from "../../app/chatStore";
import { conversationCategories } from "../../data";
const Inbox: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<ChatFilter | null>(null);
  const handleTabClick = (label: string, filter: ChatFilter) => {
    setSelectedTab((prevTab) => (prevTab === label ? null : label));
    setSelectedFilter((prevFilter) =>
      prevFilter?.subtype === filter.subtype ? null : filter
    );
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
                      selectedTab === item.label ? "bg-gray-100" : ""
                    }`}
                    onClick={() => handleTabClick(item.label, item.filter)}
                  >
                    <div className="flex items-center">
                      <item.icon
                        className={`w-5 h-5 mr-3 ${
                          selectedTab === item.label
                            ? item.color
                            : "text-[#585757]"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          selectedTab === item.label
                            ? "text-gray-900 font-medium"
                            : "text-[#585757]"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                        selectedTab === item.label
                          ? "bg-gray-200 text-gray-900"
                          : "text-[#585757]"
                      }`}
                    >
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