import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';
import { Image, Upload } from 'lucide-react';

const ImageInputNode = ({ data }) => {
  const [imageUrl, setImageUrl] = useState(data?.imageUrl || '');
  const [isHovered, setIsHovered] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      if (data?.onChange) {
        data.onChange(url);
      }
    }
  };

  return (
    <div className="min-w-[250px] shadow-lg rounded-md border-2 border-blue-300 bg-white">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-purple-400"
      />
      
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Image size={16} />
            Image Upload
          </div>
        </div>

        <div 
          className="relative h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {imageUrl ? (
            <>
              <img 
                src={imageUrl} 
                alt="Uploaded preview"
                className="w-full h-full object-contain rounded-lg"
              />
              {isHovered && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                  <label className="cursor-pointer p-2 bg-white rounded-md shadow-sm hover:bg-gray-50 transition-colors">
                    <span className="text-xs font-medium text-gray-700">Change Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </>
          ) : (
            <label className="flex flex-col items-center justify-center h-full cursor-pointer">
              <Upload className="w-6 h-6 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-purple-400"
      />
    </div>
  );
};

export default ImageInputNode;