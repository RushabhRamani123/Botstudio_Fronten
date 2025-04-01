import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Settings2, Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../ui/select";
import { Switch } from '../../../../ui/switch';

interface RatingInputNodeProps {
  onVariableChange?: (variable: string, value: number) => void;
}

interface RatingSettings {
  maximum: number;
  type: string;
  startsAt: number;
  label0: string;
  label10: string;
  buttonLabel: string;
  variable: string;
  oneClickSubmit: boolean;
}

const RatingInputNode: React.FC<RatingInputNodeProps> = ({ onVariableChange }) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [settings, setSettings] = useState<RatingSettings>({
    maximum: 10,
    type: 'Numbers',
    startsAt: 0,
    label0: 'Not likely at all',
    label10: 'Extremely likely',
    buttonLabel: 'Send',
    variable: '',
    oneClickSubmit: false
  });

  const handleRatingChange = (value: number) => {
    setRating(value);
    if (settings.oneClickSubmit && settings.variable) {
      onVariableChange?.(settings.variable, value);
    }
  };

  return (
    <div className="relative min-w-[250px] shadow-lg rounded-md border-2 border-yellow-300 bg-white">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-yellow-400" />
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <h3 className="text-sm font-medium text-gray-700">Rating</h3>
          </div>
          <button onClick={() => setOpen(true)} className="p-1 hover:bg-gray-100 rounded-full">
            <Settings2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>{settings.label0}</span>
              <span>{settings.label10}</span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: settings.maximum + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleRatingChange(i)}
                  className={`flex-1 h-8 text-sm rounded ${
                    rating === i ? 'bg-yellow-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          {!settings.oneClickSubmit && (
            <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600">
              {settings.buttonLabel}
            </button>
          )}
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-yellow-400" />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rating Settings</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Maximum:</label>
              <Select
                value={String(settings.maximum)}
                onValueChange={(value: string) => setSettings(prev => ({...prev, maximum: parseInt(value)}))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type:</label>
              <Select
                value={settings.type}
                onValueChange={(value: string) => setSettings(prev => ({...prev, type: value}))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Numbers">Numbers</SelectItem>
                  <SelectItem value="Stars">Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Starts at:</label>
              <input
                type="number"
                value={settings.startsAt}
                onChange={(e) => setSettings(prev => ({...prev, startsAt: parseInt(e.target.value)}))}
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">0 label:</label>
              <input
                type="text"
                value={settings.label0}
                onChange={(e) => setSettings(prev => ({...prev, label0: e.target.value}))}
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">10 label:</label>
              <input
                type="text"
                value={settings.label10}
                onChange={(e) => setSettings(prev => ({...prev, label10: e.target.value}))}
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
              <label className="text-sm font-medium">Save answer in variable:</label>
              <input
                type="text"
                value={settings.variable}
                onChange={(e) => setSettings(prev => ({...prev, variable: e.target.value}))}
                className="w-full px-3 py-2 text-sm border rounded-md"
                placeholder="Select a variable"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">One click submit:</label>
              <Switch
                checked={settings.oneClickSubmit}
                onCheckedChange={(checked: boolean) => setSettings(prev => ({...prev, oneClickSubmit: checked}))}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RatingInputNode;