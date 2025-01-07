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
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo, useState, DragEvent } from "react";
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
const initialNodes = [
  {
    id: "node-1",
    type: "startnode",
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
];
const initialEdges: Edge[] = [];
let nodeId = 3;
const FlowEditor = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  // Memoize nodeTypes
  const nodeTypes = useMemo(
    () => ({
      startnode: StartNode,
      text: InputTextNode,
      image: ImageInputNode,
      video: VideoInputNode,
      embed: EmbedInputNode,
      audio: AudioInputNode,
      textInput:InputNode,
      number:NumberInputNode,
      email:EmailInputNode,
      date:DateInputNode,
      phone:PhoneInputNode,
      payment:PaymentNode,
      file:FileInputNode,
      rating:RatingInputNode
    }),
    []
  );
  // Memoize edgeTypes
  const edgeTypes = useMemo(() => ({ custom: CustomEdge }), []);
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
      console.log(event);
      event.preventDefault();
      if (!reactFlowInstance) return;

      const nodeType = event.dataTransfer.getData("application/reactflow");
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      console.log("Check the position: ", position);
      console.log("Check the nodetype: ", nodeType);

      const newNode: Node = {
        id: `${nodeId++}`,
        type: nodeType,
        position,
        data: {
          // Add specific data for input text node
          text: "",
          onChange: (e: string) => {
            // Handle text changes
           console.log(e);   
            // You can update node data here if needed
          },
        },
      };
      console.log(newNode);
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  // Memoize default edge options
  const defaultEdgeOptions = useMemo(() => ({ type: "custom" }), []);
  // Memoize background styles
  const backgroundStyle = useMemo(
    () => ({
      backgroundColor: "#f1f5f9",
    }),
    []
  );
  // Memoize control styles
  const controlStyle = useMemo(
    () => ({
      backgroundColor: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
    }),
    []
  );
  // Memoize container style
  const containerStyle = useMemo(
    () => ({
      background: "#ffffff",
    }),
    []
  );
  // Memoize the ReactFlow component
  const memoizedFlow = useMemo(
    () => (
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
    ),
    [
      nodes,
      edges,
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
