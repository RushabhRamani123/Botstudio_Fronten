import { useCallback } from 'react';
import { EdgeLabelRenderer, EdgeProps, getBezierPath, useReactFlow } from '@xyflow/react';
import { X } from 'lucide-react';

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps) => {
  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = useCallback((evt: React.MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();    
      setEdges((edges) => edges.filter((edge) => edge.id !== id));
  }, [id, setEdges]);

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={{
          strokeDasharray: '5,5',
          stroke: '#64748b',
          strokeWidth: 1.5,
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            zIndex: 1000,
            pointerEvents: 'all',
          }}
        >
          <button
            className="nodrag nopan w-6 h-6 rounded-full bg-white border border-gray-300 
                       flex items-center justify-center cursor-pointer
                       hover:bg-gray-50 hover:border-gray-400
                       transition-all duration-200
                       shadow-sm"
            onClick={onEdgeClick}
            type="button"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;