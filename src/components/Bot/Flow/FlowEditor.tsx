import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  Connection,
  ReactFlowInstance,
  EdgeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo, useState, DragEvent } from "react";
import CustomEdge from './CustomEdge';
import StartNode from "./CustomeNode/StartNode";

// const initialNodes: Node[] = 
const initialNodes = [
  {
    id: 'node-1',
    type: 'textUpdater',
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
];
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: StartNode };
 
  

const initialEdges: Edge[] = [];

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

let nodeId = 3;

const FlowEditor = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      // Check if the target node already has an incoming edge
      const targetHasEdge = edges.some(
        edge => edge.target === connection.target
      );

      // Check if the source node already has an outgoing edge
      const sourceHasEdge = edges.some(
        edge => edge.source === connection.source
      );

      // If either node already has a connection, prevent the new connection
      if (targetHasEdge || sourceHasEdge) {
        return;
      }

      // If no existing connections, add the new edge
      setEdges((eds) => addEdge({ ...connection, type: 'custom' }, eds));
    },
    [edges]
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const nodeType = event.dataTransfer.getData('application/reactflow');

      const { x, y } = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${nodeId++}`,
        type: nodeType,
        position: { x, y },
        data: { label: `Node ${nodeType}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{ type: 'custom' }}
        fitView
        style={{ background: "#ffffff" }}
      >
        <Background
          color="#94a3b8"
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.5}
          style={{
            backgroundColor: "#f1f5f9",
          }}
        />
        <Controls
          position="top-right"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
          }}
        />
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;