import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';

const AudioInputNode = ({ data }) => {
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      
      if (data?.onChange) {
        data.onChange(file);
      }
    }
  };

  return (
    <div className="min-w-[200px] shadow-lg rounded-md border-2 border-blue-300 bg-white">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-blue-400"
      />
      
      <div className="p-2">
        <div className="text-sm font-medium mb-1 text-gray-700">
          Audio Input
        </div>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {audioUrl && (
          <div className="mt-2">
            <audio 
              src={audioUrl} 
              controls 
              className="w-full"
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-blue-400"
      />
    </div>
  );
};

export default AudioInputNode;