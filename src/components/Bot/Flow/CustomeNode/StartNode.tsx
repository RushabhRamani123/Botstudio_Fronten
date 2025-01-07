import { Handle, Position } from '@xyflow/react';

interface StartNodeProps {
  data: {
    label: string;
  };
  selected?: boolean;
}

const StartNode = ({selected }: StartNodeProps) => {
  return (
    <div
      className={`px-4 py-2 shadow-lg rounded-full border-2 ${
        selected ? 'border-blue-500' : 'border-slate-400'
      } bg-white`}
    >
      <div className="flex items-center">
        <div className="font-bold text-sm">Start</div>
      </div>
      
      {/* Only add source handle since this is a start node */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
        style={{ bottom: -6 }}
      />
    </div>
  );
};

export default StartNode;