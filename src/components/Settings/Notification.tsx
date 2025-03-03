import React, { useState } from 'react';

interface NotificationPreferencesProps {
}

const NotificationPreferences: React.FC<NotificationPreferencesProps> = () => {
  const [soundNotificationEnabled, setSoundNotificationEnabled] = useState(true);
  const [pushNotificationEnabled, setPushNotificationEnabled] = useState(false);
  const [devices, setDevices] = useState<string[]>([]);

  const toggleSoundNotification = () => {
    setSoundNotificationEnabled(!soundNotificationEnabled);
  };

  const togglePushNotification = () => {
    setPushNotificationEnabled(!pushNotificationEnabled);
  };

  const addDevice = () => {
    const newDevice = `Device ${devices.length + 1}`;
    setDevices([...devices, newDevice]);
  };

  return (
    <div>
      <h2>Notification Preferences</h2>
      <div>
        <h3>Sound Notification</h3>
        <label>
          <input
            type="checkbox"
            checked={soundNotificationEnabled}
            onChange={toggleSoundNotification}
          />
          {soundNotificationEnabled ? 'Disable' : 'Enable'} sound notification
        </label>
      </div>
      <div>
        <h3>Push Notification</h3>
        <label>
          <input
            type="checkbox"
            checked={pushNotificationEnabled}
            onChange={togglePushNotification}
          />
          {pushNotificationEnabled ? 'Disable' : 'Enable'} push notification
        </label>
        {pushNotificationEnabled && (
          <div>
            <p>Enable and manage push notifications for up to 5 devices.</p>
            <button onClick={addDevice} disabled={devices.length >= 5}>
              Add Device
            </button>
            <ul>
              {devices.map((device, index) => (
                <li key={index}>{device}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPreferences;