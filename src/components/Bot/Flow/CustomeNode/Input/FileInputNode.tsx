import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Settings2, File, Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const FileInputNode = ({ data, onVariableChange }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [settings, setSettings] = useState({
    allowedTypes: '.pdf,.doc,.docx,.txt',
    maxSize: 5, // MB
    buttonLabel: 'Upload',
    placeholder: 'Drop your file here or click to browse',
    variable: '',
    multiple: false
  });

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setFile(files[0]);
      if (settings.variable) {
        onVariableChange?.(settings.variable, files[0]);
      }
    }
  };

  const formatFileSize = (size) => {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="relative min-w-[250px] shadow-lg rounded-md border-2 border-yellow-300 bg-white">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-yellow-400" />
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <File className="w-4 h-4 text-yellow-500" />
            <h3 className="text-sm font-medium text-gray-700">File Input</h3>
          </div>
          <button onClick={() => setOpen(true)} className="p-1 hover:bg-gray-100 rounded-full">
            <Settings2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input
              type="file"
              onChange={handleFileChange}
              accept={settings.allowedTypes}
              className="hidden"
              id="file-upload"
              multiple={settings.multiple}
            />
            <label 
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">{settings.placeholder}</span>
              {file && (
                <div className="mt-2 text-xs text-gray-500">
                  {file.name} ({formatFileSize(file.size)})
                </div>
              )}
            </label>
          </div>
          
          <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600">
            {settings.buttonLabel}
          </button>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-yellow-400" />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>File Input Settings</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Allowed file types:</label>
              <input
                type="text"
                value={settings.allowedTypes}
                onChange={(e) => setSettings(prev => ({...prev, allowedTypes: e.target.value}))}
                className="w-full px-3 py-2 text-sm border rounded-md"
                placeholder=".pdf,.doc,.docx,.txt"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Maximum file size (MB):</label>
              <input
                type="number"
                value={settings.maxSize}
                onChange={(e) => setSettings(prev => ({...prev, maxSize: e.target.value}))}
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
              <label className="text-sm font-medium">Placeholder text:</label>
              <input
                type="text"
                value={settings.placeholder}
                onChange={(e) => setSettings(prev => ({...prev, placeholder: e.target.value}))}
                className="w-full px-3 py-2 text-sm border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Save file in variable:</label>
              <input
                type="text"
                value={settings.variable}
                onChange={(e) => setSettings(prev => ({...prev, variable: e.target.value}))}
                className="w-full px-3 py-2 text-sm border rounded-md"
                placeholder="Select a variable"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Allow multiple files:</label>
              <input
                type="checkbox"
                checked={settings.multiple}
                onChange={(e) => setSettings(prev => ({...prev, multiple: e.target.checked}))}
                className="h-4 w-4"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileInputNode;