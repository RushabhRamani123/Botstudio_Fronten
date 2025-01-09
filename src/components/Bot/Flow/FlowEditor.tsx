/* eslint-disable @typescript-eslint/no-unused-vars */
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
  NodeChange,
  EdgeChange
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo, useState, DragEvent, useEffect } from "react";
import CustomEdge from "./CustomEdge";
import StartNode from "./CustomeNode/StartNode";
import InputTextNode from "./CustomeNode/Bubbles/InputNode";
import ImageInputNode from "./CustomeNode/Bubbles/ImageinputNode";
import VideoInputNode from "./CustomeNode/Bubbles/VideoInputNode";
import EmbedInputNode from "./CustomeNode/Bubbles/EmbedinputNode";
import AudioInputNode from "./CustomeNode/Bubbles/AudioinputNOde";
import InputNode from "./CustomeNode/Input/TextInput";
import NumberInputNode from "./CustomeNode/Input/NumberInputNode";
import EmailInputNode from "./CustomeNode/Input/EmailInputNode";
import DateInputNode from "./CustomeNode/Input/DateInputNode";
import PhoneInputNode from "./CustomeNode/Input/PhoneInputNode";
import PaymentNode from "./CustomeNode/Input/PaymentInputNode";
import FileInputNode from "./CustomeNode/Input/FileInputNode";
import RatingInputNode from "./CustomeNode/Input/RatingNode";
import URLInputNode from "./CustomeNode/Input/WebsiteUrlNode";
import { useBotStore } from "../../../app/botStore"; 


interface FlowEditorProps {
  onSave: boolean;
  onFlowSave?: (flowData: { nodes: Node[]; edges: Edge[] }) => void;
}

let nodeId = 3;

const FlowEditor = ({ onSave, onFlowSave }: FlowEditorProps) => {
  const {selectedFlow} = useBotStore();
  const initialNodes = selectedFlow?.Nodes ? selectedFlow?.Nodes : [
    {
      id: "node-1",
      type: "startnode",
      position: { x: 0, y: 0 },
      data: { value: 123 },
    }
  ];
  const handleTextChange = (nodeId: string, text: string) => {
    setNodes((prevNodes) => 
      prevNodes.map((node) => 
        node.id === nodeId 
          ? { ...node, data: { ...node.data, text } }
          : node
      )
    );
  };
  
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(selectedFlow?.edges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Save effect
  useEffect(() => {
    const saveFlow = async () => {
      if (onSave && onFlowSave) {
        try {
          setIsLoading(true);
          await onFlowSave({
            nodes,
            edges,
          });
          console.log('Flow saved successfully');
        } catch (error) {
          console.error('Error saving flow:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    saveFlow();
  }, [onSave, onFlowSave, nodes, edges]);

  // Memoize nodeTypes
  const nodeTypes = useMemo(
    () => ({
      startnode: StartNode,
      text: InputTextNode,
      image: ImageInputNode,
      video: VideoInputNode,
      embed: EmbedInputNode,
      audio: AudioInputNode,
      textInput: InputNode,
      number: NumberInputNode,
      email: EmailInputNode,
      date: DateInputNode,
      phone: PhoneInputNode,
      payment: PaymentNode,
      file: FileInputNode,
      rating: RatingInputNode,
      website: URLInputNode,
    }),
    []
  );

  // Memoize edgeTypes
  const edgeTypes = useMemo(() => ({ custom: CustomEdge }), []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      const targetHasEdge = edges.some(
        (edge) => edge.target === connection.target
      );
      const sourceHasEdge = edges.some(
        (edge) => edge.source === connection.source
      );
      if (targetHasEdge || sourceHasEdge) {
        return;
      }
      setEdges((eds) => addEdge({ ...connection, type: "custom" }, eds));
    },
    [edges]
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      if (!reactFlowInstance) return;

      const nodeType = event.dataTransfer.getData("application/reactflow");
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      let newNode: Node;

      switch (nodeType) {
        case "startnode":
          newNode = {
            id: `${nodeId++}`,
            type: nodeType,
            position,
            data: { value: 123 },
          };
          break;
        case "text":
          newNode = {
            id: `${nodeId++}`,
            type: nodeType,
            position,
            data: {
              text: "",
              onChange: (text: string) => handleTextChange(`${nodeId - 1}`, text),
            },
          };
          break;
        default:
          newNode = {
            id: `${nodeId++}`,
            type: nodeType,
            position,
            data: { value: "" },
          };
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  // Memoize styles
  const backgroundStyle = useMemo(
    () => ({
      backgroundColor: "#f1f5f9",
    }),
    []
  );

  const controlStyle = useMemo(
    () => ({
      backgroundColor: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
    }),
    []
  );

  const containerStyle = useMemo(
    () => ({
      background: "#ffffff",
    }),
    []
  );

  const defaultEdgeOptions = useMemo(() => ({ type: "custom" }), []);

  // Memoize the ReactFlow component
  const memoizedFlow = useMemo(
    () => (
      <div className="relative w-full h-full">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 z-50 flex items-center justify-center">
            <div className="text-blue-600">Saving flow...</div>
          </div>
        )}
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
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
          style={containerStyle}
        >
          <Background
            color="#94a3b8"
            variant={BackgroundVariant.Dots}
            gap={24}
            size={1.5}
            style={backgroundStyle}
          />
          <Controls position="top-right" style={controlStyle} />
        </ReactFlow>
      </div>
    ),
    [
      nodes,
      edges,
      isLoading,
      onNodesChange,
      onEdgesChange,
      onConnect,
      onDrop,
      onDragOver,
      edgeTypes,
      nodeTypes,
      defaultEdgeOptions,
      containerStyle,
      backgroundStyle,
      controlStyle,
    ]
  );

  return <div className="h-screen w-full">{memoizedFlow}</div>;
};

export default FlowEditor;