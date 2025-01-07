import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Settings2, Phone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

const PhoneInputNode = ({ data, onVariableChange }) => {
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [settings, setSettings] = useState({
    placeholder: 'Type your phone number...',
    buttonLabel: 'Send',
    defaultCountry: 'International',
    retryMessage: "This phone number doesn't seem to be valid. Can you type it again?",
    variable: ''
  });

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
    if (settings.variable && value) {
      onVariableChange?.(settings.variable, value);
    }
  };

  return (
    <div className="relative min-w-[250px] shadow-lg rounded-md border-2 border-blue-300 bg-white">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-blue-400" />
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-medium text-gray-700">Phone Input</h3>
          </div>
          <button onClick={() => setOpen(true)} className="p-1 hover:bg-gray-100 rounded-full">
            <Settings2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="space-y-2">
          <input
            type="tel"
            placeholder={settings.placeholder}
            className="w-full px-3 py-2 text-sm border rounded-md"
            value={phoneNumber}
            onChange={(e) => handlePhoneChange(e.target.value)}
          />
          <select 
            className="w-full px-3 py-2 text-sm border rounded-md"
            value={settings.defaultCountry}
            onChange={(e) => setSettings(prev => ({...prev, defaultCountry: e.target.value}))}
          >
            <option value="International">International</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            {/* Add more country options as needed */}
          </select>
        </div>

        {settings.buttonLabel && (
          <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">
            {settings.buttonLabel}
          </button>
        )}
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-blue-400" />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Phone Input Settings</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Placeholder:</label>
              <input
                type="text"
                value={settings.placeholder}
                onChange={(e) => setSettings(prev => ({...prev, placeholder: e.target.value}))}
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Button label:</label>
              <input
                type="text"
                value={settings.buttonLabel}
                onChange={(e) => setSettings(prev => ({...prev, buttonLabel: e.target.value}))}
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Default country:</label>
              <select
                value={settings.defaultCountry}
                onChange={(e) => setSettings(prev => ({...prev, defaultCountry: e.target.value}))}
                className="w-full px-3 py-2 text-sm border rounded-md"
              >
                <option value="International">International</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Retry message:</label>
              <input
                type="text"
                value={settings.retryMessage}
                onChange={(e) => setSettings(prev => ({...prev, retryMessage: e.target.value}))}
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Save answer in variable:</label>
              <input
                type="text"
                value={settings.variable}
                onChange={(e) => setSettings(prev => ({...prev, variable: e.target.value}))}
                className="w-full px-3 py-2 text-sm border rounded-md"
                placeholder="Select a variable"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhoneInputNode;