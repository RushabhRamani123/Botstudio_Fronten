import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';

const InputTextNode = ({ data }) => {
  const [text, setText] = useState(data?.text || '');

  const handleChange = (e) => {
    setText(e.target.value);
    // If you have a callback for updating node data
    if (data?.onChange) {
      data.onChange(e.target.value);
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
          Input Text
        </div>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Enter your text..."
          className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-blue-400"
      />
    </div>
  );
};

export default InputTextNode;