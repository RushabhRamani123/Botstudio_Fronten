import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Settings2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../../ui/dialog';
import { Switch } from '../../../../ui/switch';

const InputNode = ({ data, onVariableChange }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [settings, setSettings] = useState({
    questionText: 'What is your name?',
    placeholder: 'Type your answer...',
    buttonLabel: 'Send',
    longText: false,
    allowAudio: false,
    allowAttachments: false,
    variable: 'Hello'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (settings.variable) {
      onVariableChange?.(settings.variable, value);
    }
  };

  return (
    <div className="relative min-w-[250px] shadow-lg rounded-md border-2 border-yellow-300 bg-white">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-yellow-400"
      />
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-700">{settings.questionText}</h3>
          <button
            onClick={() => setOpen(true)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Settings2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {settings.longText ? (
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            placeholder={settings.placeholder}
            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 min-h-[100px]"
          />
        ) : (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={settings.placeholder}
            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        )}

        {settings.buttonLabel && (
          <button className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600 transition-colors">
            {settings.buttonLabel}
          </button>
        )}
        
        {settings.variable && (
          <div className="mt-2 text-xs text-gray-500">
            Variable: {settings.variable}
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-yellow-400"
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Input Settings</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Long text</label>
              <Switch
                checked={settings.longText}
                onCheckedChange={(checked) => handleSettingChange('longText', checked)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Placeholder:</label>
              <input
                type="text"
                value={settings.placeholder}
                onChange={(e) => handleSettingChange('placeholder', e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-md"
                placeholder="Enter placeholder text"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Button label:</label>
              <input
                type="text"
                value={settings.buttonLabel}
                onChange={(e) => handleSettingChange('buttonLabel', e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-md"
                placeholder="Enter button text"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Allow audio clip</label>
              <Switch
                checked={settings.allowAudio}
                onCheckedChange={(checked) => handleSettingChange('allowAudio', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Allow attachments</label>
              <Switch
                checked={settings.allowAttachments}
                onCheckedChange={(checked) => handleSettingChange('allowAttachments', checked)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Save answer in variable:</label>
              <input
                type="text"
                value={settings.variable}
                onChange={(e) => handleSettingChange('variable', e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-md"
                placeholder="Variable name"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InputNode;