import  { useState } from 'react';
import Sidebar from './Sidebar';
import CannedMessages from './CannedMessages';
import NotificationPreferences from './Notification';

const Settings = () => {
  const [selectedSection, setSelectedSection] = useState('canned-messages');

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
  };

  return (
    <div className="flex">
      <Sidebar onSelect={handleSectionSelect} />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        {selectedSection === 'canned-messages' && <CannedMessages />}
        {selectedSection === 'notifications' && <NotificationPreferences />}
      </div>
    </div>
  );
};

export default Settings;