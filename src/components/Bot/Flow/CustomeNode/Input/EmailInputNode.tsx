import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Settings2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../../ui/dialog';

interface EmailInputNodeProps {
  onVariableChange?: (variable: string, value: string) => void;
}
const EmailInputNode: React.FC<EmailInputNodeProps> = ({ onVariableChange }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [settings, setSettings] = useState({
    placeholder: 'Type your email...',
    buttonLabel: 'Send',
    retryMessage: "This email doesn't seem to be",
    variable: ''
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsValid(value === '' || validateEmail(value));
    if (settings.variable && validateEmail(value)) {
      onVariableChange?.(settings.variable, value);
    }
  };

  const handleSubmit = () => {
    if (validateEmail(email)) {
      // Handle submission
    }
  };

  return (
    <div className="relative min-w-[250px] shadow-lg rounded-md border-2 border-yellow-300 bg-white">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-yellow-400" />
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-700">Email Input</h3>
          <button onClick={() => setOpen(true)} className="p-1 hover:bg-gray-100 rounded-full">
            <Settings2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <input
          type="email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          placeholder={settings.placeholder}
          className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
            !isValid ? 'border-red-500' : ''
          }`}
        />

        {!isValid && (
          <p className="mt-1 text-sm text-red-500">{settings.retryMessage}</p>
        )}

        {settings.buttonLabel && (
          <button 
            onClick={handleSubmit}
            className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600 disabled:opacity-50"
            disabled={!isValid || !email}
          >
            {settings.buttonLabel}
          </button>
        )}
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-yellow-400" />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Email Input Settings</DialogTitle>
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

export default EmailInputNode;