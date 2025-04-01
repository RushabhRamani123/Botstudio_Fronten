import { Handle, Position } from '@xyflow/react';
import { Play } from 'lucide-react';

const StartNode = () => {
  return (
    <div className="relative group">
      <div
        className={`
          px-6 py-3
          shadow-lg rounded-full
          border-2 border-green-500
          bg-gradient-to-r from-green-50 to-white
          transition-all duration-200
          group-hover:shadow-xl
          group-hover:scale-105
          group-hover:border-green-400
        `}
      >
        <div className="flex items-center gap-2">
          <Play 
            size={16} 
            className="text-green-600 group-hover:text-green-500"
          />
          <div className="font-medium text-sm text-gray-700 group-hover:text-gray-600">
            Start
          </div>
        </div>

        <Handle
          type="source"
          position={Position.Right}
          className={`
            w-3 h-3 
            bg-green-500 
            border-2 border-white
            transition-all duration-200
            hover:bg-green-400
            hover:w-4 hover:h-4
          `}
          style={{ 
            right: -6,
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
      </div>
    </div>
  );
};

export default StartNode;