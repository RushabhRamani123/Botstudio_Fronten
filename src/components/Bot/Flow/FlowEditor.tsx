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
import { useCallback, useMemo, useState, DragEvent, useRef, useEffect } from "react";
import { MessageCircle, Send, Minimize2, Maximize2 } from 'lucide-react';

// Import custom components
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

// Define interfaces
interface FlowEditorProps {
  onSave: boolean;
  onFlowSave?: (flowData: { nodes: Node[]; edges: Edge[] }) => void;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface BotFlowCommand {
  type: string;
  position: { x: number; y: number };
  data: Record<string, any>;
  connections: string[];
}

// ChatInterface Component
const ChatInterface = ({ messages, onSendMessage, isLoading }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 z-50">
      <div className={`
        transform transition-all duration-300 ease-in-out
        ${isMinimized ? 'translate-y-[calc(100%-3.5rem)]' : ''}
        bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden
      `}>
        <div className="bg-blue-600 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <MessageCircle size={20} />
            <h3 className="font-semibold">Flow Assistant</h3>
          </div>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-blue-700 rounded transition-colors"
            title={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
        </div>

        <div className="h-[32rem] overflow-y-auto bg-gradient-to-b from-slate-50 to-white p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`
                flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}
                animate-fade-in
              `}
            >
              <div
                className={`
                  p-3 rounded-2xl max-w-[85%] shadow-sm
                  ${message.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white border border-slate-200 rounded-bl-none'
                  }
                `}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 rounded-2xl p-3 animate-pulse">
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form 
          onSubmit={handleSubmit}
          className="border-t border-slate-200 p-4 bg-white"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-slate-200 rounded-full
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className={`
                p-2 rounded-full transition-all duration-200
                ${inputMessage.trim() && !isLoading
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }
              `}
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Initialize node counter
let nodeId = 3;

const FlowEditor = ({ onSave, onFlowSave }: FlowEditorProps) => {
  const { selectedFlow } = useBotStore();
  const initialNodes = selectedFlow?.Nodes;

  // State management
  const [nodes, setNodes] = useState<Node[]|undefined>(initialNodes);
  const [edges, setEdges] = useState<Edge[]|undefined>(selectedFlow?.edges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Process user messages and generate flow commands
  const processUserMessage = async (message: string) => {
    setIsLoading(true);
    try {
      const botResponse = await simulateBotResponse(message);
      
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: botResponse.message
      }]);

      if (botResponse.flowCommands) {
        executeBotCommands(botResponse.flowCommands);
      }
    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate bot response (replace with actual API call in production)
  const simulateBotResponse = async (message: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (message.toLowerCase().includes('greeting')) {
      return {
        message: "I'll create a greeting flow for you.",
        flowCommands: [
          {
            type: 'startnode',
            position: { x: 100, y: 100 },
            data: { value: 'Start' },
            connections: ['2']
          },
          {
            type: 'text',
            position: { x: 100, y: 250 },
            data: { text: 'Hello! How can I help you?' },
            connections: ['3']
          },
          {
            type: 'textInput',
            position: { x: 100, y: 400 },
            data: { value: 'User Response' },
            connections: []
          }
        ]
      };
    }

    return {
      message: "I understand you want to create a flow. Could you please specify what kind of flow you'd like?",
      flowCommands: null
    };
  };

  // Node and edge creation utilities
  const createNodeFromCommand = (command: BotFlowCommand): Node => {
    return {
      id: `${nodeId++}`,
      type: command.type,
      position: command.position,
      data: command.data
    };
  };

  const createEdgesFromCommand = (nodeId: string, connections: string[]): Edge[] => {
    return connections.map((targetId) => ({
      id: `e${nodeId}-${targetId}`,
      source: nodeId,
      target: targetId,
      type: 'custom'
    }));
  };

  // Execute bot commands to create nodes and edges
  const executeBotCommands = (commands: BotFlowCommand[]) => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    commands.forEach((command) => {
      const node = createNodeFromCommand(command);
      newNodes.push(node);
      
      if (command.connections.length > 0) {
        const edges = createEdgesFromCommand(node.id, command.connections);
        newEdges.push(...edges);
      }
    });

    setNodes((prevNodes) => [...(prevNodes || []), ...newNodes]);
    setEdges((prevEdges) => [...(prevEdges || []), ...newEdges]);
  };

  // Register node types
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

  // Register edge types and other callbacks
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
      const targetHasEdge = edges?.some(
        (edge) => edge.target === connection.target
      );
      const sourceHasEdge = edges?.some(
        (edge) => edge.source === connection.source
      );
      if (targetHasEdge || sourceHasEdge) {
        return;
      }
      setEdges((eds) => addEdge({ ...connection, type: "custom" }, eds));
    },
    [edges]
  );

  // Drag and drop handlers
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
              onChange: (text: string) => {
                console.log(text);
              },
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

      setNodes((nds) => nds?.concat(newNode));
    },
    [reactFlowInstance]
  );

  // Styles
  const containerStyle = useMemo(() => ({ background: "#ffffff" }), []);
  const backgroundStyle = useMemo(() => ({ backgroundColor: "#f1f5f9" }), []);
  const controlStyle = useMemo(
    () => ({
      backgroundColor: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
    }),
    []
  );

  // Default edge options
  const defaultEdgeOptions = useMemo(() => ({ type: "custom" }), []);

  return (
    <div className="relative w-full h-screen">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 z-50 flex items-center justify-center">
          <div className="text-blue-600">Processing...</div>
        </div>
      )}

      {/* Main Flow Editor */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        style={containerStyle}
        fitView
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

      {/* Enhanced Chat Interface */}
      <ChatInterface 
        messages={chatMessages}
        onSendMessage={processUserMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default FlowEditor;