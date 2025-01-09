import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Settings2, Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

const DateInputNode = ({ data, onVariableChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [settings, setSettings] = useState({
    isRange: false,
    withTime: false,
    buttonLabel: 'Send',
    min: '',
    max: '',
    format: 'dd/MM/yyyy',
    variable: ''
  });

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const format = settings.format.replace('dd', String(d.getDate()).padStart(2, '0'))
      .replace('MM', String(d.getMonth() + 1).padStart(2, '0'))
      .replace('yyyy', d.getFullYear());
    return format;
  };

  const handleDateChange = (value) => {
    setSelectedDate(value);
    if (settings.variable && value) {
      onVariableChange?.(settings.variable, formatDate(value));
    }
  };

  const getInputType = () => {
    if (settings.withTime) return 'datetime-local';
    return 'date';
  };

  return (
    <div className="relative min-w-[250px] shadow-lg rounded-md border-2 border-yellow-300 bg-white">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-blue-400" />
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-yellow-500" />
            <h3 className="text-sm font-medium text-gray-700">Date Input</h3>
          </div>
          <button onClick={() => setOpen(true)} className="p-1 hover:bg-gray-100 rounded-full">
            <Settings2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="space-y-2">
          {settings.isRange ? (
            <div className="flex gap-2">
              <input
                type={getInputType()}
                className="w-full px-3 py-2 text-sm border rounded-md"
                min={settings.min}
                max={settings.max}
                onChange={(e) => handleDateChange([selectedDate[0], e.target.value])}
              />
              <input
                type={getInputType()}
                className="w-full px-3 py-2 text-sm border rounded-md"
                min={settings.min}
                max={settings.max}
                onChange={(e) => handleDateChange([selectedDate[0], e.target.value])}
              />
            </div>
          ) : (
            <input
              type={getInputType()}
              className="w-full px-3 py-2 text-sm border rounded-md"
              min={settings.min}
              max={settings.max}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          )}
        </div>

        {settings.buttonLabel && (
          <button className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600">
            {settings.buttonLabel}
          </button>
        )}
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-blue-400" />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Date Input Settings</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Is range?</label>
              <Switch
                checked={settings.isRange}
                onCheckedChange={(checked) => setSettings(prev => ({...prev, isRange: checked}))}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">With time?</label>
              <Switch
                checked={settings.withTime}
                onCheckedChange={(checked) => setSettings(prev => ({...prev, withTime: checked}))}
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
              <label className="text-sm font-medium">Min:</label>
              <input
                type="text"
                value={settings.min}
                placeholder="YYYY-MM-DD"
                onChange={(e) => setSettings(prev => ({...prev, min: e.target.value}))}
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Max:</label>
              <input
                type="text"
                value={settings.max}
                placeholder="YYYY-MM-DD"
                onChange={(e) => setSettings(prev => ({...prev, max: e.target.value}))}
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Format:</label>
              <input
                type="text"
                value={settings.format}
                onChange={(e) => setSettings(prev => ({...prev, format: e.target.value}))}
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

export default DateInputNode;