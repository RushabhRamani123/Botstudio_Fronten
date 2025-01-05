import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const FlowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: '1',
      position: { x: 100, y: 100 },
      data: { label: 'Sample Node' },
      type: 'default',
      style: {
        background: '#ffffff',
        border: '1px solid #2563eb',
        borderRadius: '8px',
        padding: '12px',
      }
    }
  ]);
  
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        defaultViewport={{ zoom: 1.5 }}
        style={{ background: '#ffffff' }}
      >
        <Background
          color="#94a3b8"
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.5}
          style={{
            backgroundColor: '#f1f5f9',
          }}
        />
        <Controls 
          position="top-right"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
          }}
        />

      </ReactFlow>
    </div>
  );
};

export default FlowEditor;