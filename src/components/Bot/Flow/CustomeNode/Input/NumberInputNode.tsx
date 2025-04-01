import { useState, ChangeEvent } from "react";
import { Handle, Position } from "@xyflow/react";
import { Settings2, ChevronUp, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../ui/dialog";

// Define interfaces for props and settings
interface NumberInputNodeProps {
  onVariableChange?: (variable: string, value: number) => void;
}

interface NumberInputSettings {
  placeholder: string;
  buttonLabel: string;
  min: string;
  max: string;
  step: string;
  variable: string;
}

const NumberInputNode: React.FC<NumberInputNodeProps> = ({ onVariableChange }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [settings, setSettings] = useState<NumberInputSettings>({
    placeholder: "Type a number...",
    buttonLabel: "Send",
    min: "",
    max: "",
    step: "",
    variable: "",
  });

  const handleSettingChange = (key: keyof NumberInputSettings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleValueChange = (newValue: string) => {
    const numValue = parseFloat(newValue);
    if (newValue === "" || !isNaN(numValue)) {
      if (settings.min && numValue < parseFloat(settings.min)) return;
      if (settings.max && numValue > parseFloat(settings.max)) return;
      setValue(newValue);
      if (settings.variable) {
        onVariableChange?.(settings.variable, numValue);
      }
    }
  };

  const adjustValue = (direction: number) => {
    const step = parseFloat(settings.step) || 1;
    const currentValue = parseFloat(value) || 0;
    handleValueChange((currentValue + direction * step).toString());
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
          <h3 className="text-sm font-medium text-gray-700">Number Input</h3>
          <button
            onClick={() => setOpen(true)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <Settings2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleValueChange(e.target.value)}
            placeholder={settings.placeholder}
            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <div className="flex flex-col">
            <button
              onClick={() => adjustValue(1)}
              className="p-1 hover:bg-gray-100 rounded-t border"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => adjustValue(-1)}
              className="p-1 hover:bg-gray-100 rounded-b border-x border-b"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
        {settings.buttonLabel && (
          <button className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600">
            {settings.buttonLabel}
          </button>
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
            <DialogTitle>Number Input Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Placeholder:</label>
              <input
                type="text"
                value={settings.placeholder}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSettingChange("placeholder", e.target.value)
                }
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Button label:</label>
              <input
                type="text"
                value={settings.buttonLabel}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSettingChange("buttonLabel", e.target.value)
                }
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Min:</label>
              <input
                type="number"
                value={settings.min}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleSettingChange("min", e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Max:</label>
              <input
                type="number"
                value={settings.max}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleSettingChange("max", e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Step:</label>
              <input
                type="number"
                value={settings.step}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleSettingChange("step", e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Save answer in variable:
              </label>
              <input
                type="text"
                value={settings.variable}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSettingChange("variable", e.target.value)
                }
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

export default NumberInputNode;