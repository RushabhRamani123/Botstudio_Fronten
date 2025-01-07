import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';

const VideoInputNode = ({ data }) => {
  const [videoUrl, setVideoUrl] = useState(data?.videoUrl || '');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      
      if (data?.onChange) {
        data.onChange(url);
      }
    }
  };

  return (
    <div className="min-w-[300px] shadow-lg rounded-md border-2 border-blue-300 bg-white">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-blue-400"
      />
      
      <div className="p-2">
        <div className="text-sm font-medium mb-1 text-gray-700">
          Video Input
        </div>
        
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        
        {videoUrl && (
          <div className="mt-2">
            <video 
              src={videoUrl}
              controls
              className="w-full rounded"
              style={{ maxHeight: '200px' }}
            >
              Your browser does not support the video tag.
            </video>
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

export default VideoInputNode;