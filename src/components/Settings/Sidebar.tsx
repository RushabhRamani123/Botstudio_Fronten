import React from 'react';

interface SidebarProps {
  onSelect: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-lg font-semibold mb-6">Settings</h2>
      <ul>
        <li className="mb-4">
          <button onClick={() => onSelect('canned-messages')} className="hover:text-gray-400">
            Canned Messages
          </button>
        </li>
        <li className="mb-4">
          <button onClick={() => onSelect('notifications')} className="hover:text-gray-400">
            Notification Preferences
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;