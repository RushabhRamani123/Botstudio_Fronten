import { Handle, Position } from '@xyflow/react';
const StartNode = () => {
  return (
    <div
      className={`px-4 py-2 shadow-lg rounded-full border-2 
        border-green-500  bg-white`}
    >
      <div className="flex items-center">
        <div className=" text-sm">Start</div>
      </div>
      
      {/* Only add source handle since this is a start node */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-6 h-6"
        style={{ bottom: -6 }}
      />
    </div>
  );
};

export default StartNode;