import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Settings2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../../ui/dialog';

const URLInputNode = ({ data, onVariableChange }) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [settings, setSettings] = useState({
    placeholder: 'Type a URL...',
    buttonLabel: 'Send',
    retryMessage: "This URL doesn't seem to be valid",
    variable: ''
  });

  const validateURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleURLChange = (value) => {
    setUrl(value);
    setIsValid(value === '' || validateURL(value));
    if (settings.variable && validateURL(value)) {
      onVariableChange?.(settings.variable, value);
    }
  };

  return (
    <div className="relative min-w-[250px] shadow-lg rounded-md border-2 border-blue-300 bg-white">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-blue-400" />
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-700">URL Input</h3>
          <button onClick={() => setOpen(true)} className="p-1 hover:bg-gray-100 rounded-full">
            <Settings2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <input
          type="url"
          value={url}
          onChange={(e) => handleURLChange(e.target.value)}
          placeholder={settings.placeholder}
          className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 ${
            !isValid ? 'border-red-500' : ''
          }`}
        />

        {!isValid && url && (
          <p className="mt-1 text-sm text-red-500">{settings.retryMessage}</p>
        )}

        {settings.buttonLabel && (
          <button 
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 disabled:opacity-50"
            disabled={!isValid || !url}
          >
            {settings.buttonLabel}
          </button>
        )}
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-blue-400" />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>URL Input Settings</DialogTitle>
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

export default URLInputNode;