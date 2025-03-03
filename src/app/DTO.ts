export interface CustomerMetadata {
  totalTickets: number;
  memberSince: string;
  previousInteractions: number;
}
export interface LastMessage {
  text: string;
  sender: "user" | "employee" | "bot";
  timestamp: string;
  isNote?: boolean;
  ticketId?: string;
  priority?: "high" | "medium" | "low";
}
export interface Chat {
  id: string;
  name: string;
  message: string;
  avatar: string;
  unread?: boolean;
  category?: "vip" | "regular" | "new" | "returning" | "internal";
  status?: "active" | "waiting" | "resolved" | "archived";
  priority?: "high" | "medium" | "low";
  lastInteraction?: string;
  assignedTo?: string;
  customerMetadata?: CustomerMetadata;
  lastMessage?: LastMessage;
}
export interface Message {
  id: string;
  chatId: string;
  text?: string;
  GIFlink?: string;
  ImageLink?: string;
  sender: "user" | "employee" | "bot";
  timestamp: string;
  isNote?: boolean;
  dateSeparator?: string;
  priority?: "high" | "medium" | "low";
  status?: "active" | "waiting" | "resolved" | "archived";
  ticketId?: string;
}
export interface ChatFilter {
  type: "quick-access" | "active" | "status";
  subtype?: string;
}
export interface ChatStore {
  chats: Chat[];
  selectedChatId: string | null;
  selectedMessageId: string | null;
  messages: Message[];
  setSelectedChat: (chatId: string) => void;
  addMessage: (message: Message) => void;
  getFilteredChats: (filter?: ChatFilter) => Chat[];
  getSelectedChatMessages: () => Message[];
  clearSelectedChat: () => void;
  updateMessageStatus: (messageId: string, status: Message["status"]) => void;
  markChatAsRead: (chatId: string) => void;
}
export interface Node {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    text: string;
    // Add other data properties as needed
  };
  measured?: {
    width: number;
    height: number;
  };
  selected?: boolean;
  dragging?: boolean;
}
export interface Edge {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated?: boolean;
}
// Flow Types
export interface Flow {
  id: string;
  name: string;
  triggers: string;
  lastPublishedAt: string;
  sessions: number;
  completed: number;
  dropped: number;
  status: "Draft" | "Published" | "Archived";
  Nodes?: Node[];
  edges?: Edge[];
  createdAt: string;
  updatedAt: string;
}
// Bot Types
export interface Bot {
  id: string;
  name: string;
  description?: string;
  lastUpdated: string;
  flows: number;
  sessions: number;
  dropped: number;
  flowDetails: Flow[];
  createdAt: string;
  status: "Active" | "Inactive" | "Archived";
}
// Store Interface
export interface Template {
  id: string;
  name: string;
  createdAt: Date;
  modifiedAt?: Date;
}
export interface BotTemplateTableProps {
  templates: [];
  onTemplateClick: (id: string) => void;
}
export interface BotStore {
  // State
  botTemplates:[];
  selectedTemplate: Template | null ,
  bots: Bot[];
  selectedBot: Bot | null;
  selectedFlow: Flow | null;
  isModalOpen: boolean;
  isTemplateModalOpen:boolean; 
  newTemplateName:string;
  newBotName: string;
  isLoading: boolean;
  error: string | null;
  // Bot Actions
  setNewTemplateName: (name: string)=>void;
  setNewBotName: (name: string) => void;
  openModal: () => void;
  closeModal: () => void;
  openTemplateModal: () => void;
  closeTemplateModal: () => void;
  addBot: (name: string, description?: string) => void;
  addTemplate: (name: string) => void;
  updateBot: (botId: string, updates: Partial<Bot>) => void;
  deleteBot: (botId: string) => void;
  selectBot: (id: string) => void;

  // Flow Actions
  addFlow: (botId: string, flowName: string) => void;
  updateFlow: (botId: string, flowId: string, updates: Partial<Flow>) => void;
  deleteFlow: (botId: string, flowId: string) => void;
  selectFlow: (botId: string, flowId: string) => void;

  // Flow Node Actions
  updateFlowNodes: (
    botId: string,
    flowId: string,
    nodes: Node[],
    edges?: Edge[]
  ) => void;

  // Error Handling
  setError: (error: string | null) => void;
  clearError: () => void;
}