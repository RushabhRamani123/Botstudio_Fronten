import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  useNodesState,
  useEdgesState,
  Node,
  addEdge,
  Connection,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const nodeTypes = {
  default: ({ data }) => (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-white border border-gray-200">
      <div className="flex items-center gap-2">
        {data.icon}
        <span className="text-sm font-medium">{data.label}</span>
      </div>
    </div>
  ),
};

const FlowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { project } = useReactFlow();

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData('application/reactflow');
      
      if (!nodeType) return;

      const position = project({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${nodeType}-${nodes.length + 1}`,
        type: 'default',
        position,
        data: { 
          label: nodeType.charAt(0).toUpperCase() + nodeType.slice(1),
          icon: null // You can pass icons from Sidebar here
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, project, setNodes]
  );

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        fitView
        // defaultViewport={{ zoom: 1.5 }}
        style={{ background: '#ffffff' }}
      >
        <Background
          color="#94a3b8"
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.5}
          style={{ backgroundColor: '#f1f5f9' }}
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