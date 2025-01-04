import React from 'react';
import { Card } from "../../ui/card";
import { ScrollArea } from "../../ui/scroll-area";
import { 
  MessageSquare, Image, Video, Blocks,
  Headphones, Type, Hash, Mail, Globe,
  Calendar, Phone, MousePointer, CreditCard,
  FileIcon,  Variable, FilterX, 
  RotateCw, Bot, ArrowRight, GitFork,
  BarChart3, Globe2, Mail as EmailIcon,
  Zap, Workflow, Box, MessageCircle, Boxes,
  Calculator, QrCode, Cloud, Building2,
  GitMerge, Database, MessageCircleMore,
  Clock,
  Sheet
} from 'lucide-react';

interface NodeCategory {
  title: string;
  items: {
    id: string;
    label: string;
    icon: React.ReactNode;
  }[];
}

const nodeCategories: NodeCategory[] = [
  {
    title: "Bubbles",
    items: [
      { id: "text", label: "Text", icon: <MessageSquare size={16} /> },
      { id: "image", label: "Image", icon: <Image size={16} /> },
      { id: "video", label: "Video", icon: <Video size={16} /> },
      { id: "embed", label: "Embed", icon: <Blocks size={16} /> },
      { id: "audio", label: "Audio", icon: <Headphones size={16} /> }
    ]
  },
  {
    title: "Inputs",
    items: [
      { id: "text-input", label: "Text", icon: <Type size={16} /> },
      { id: "number", label: "Number", icon: <Hash size={16} /> },
      { id: "email", label: "Email", icon: <Mail size={16} /> },
      { id: "website", label: "Website", icon: <Globe size={16} /> },
      { id: "date", label: "Date", icon: <Calendar size={16} /> },
      { id: "phone", label: "Phone", icon: <Phone size={16} /> },
      { id: "buttons", label: "Buttons", icon: <MousePointer size={16} /> },
      { id: "pic-choice", label: "Pic choice", icon: <Image size={16} /> },
      { id: "payment", label: "Payment", icon: <CreditCard size={16} /> },
      { id: "file", label: "File", icon: <FileIcon size={16} /> },
      { id: "rating", label: "Rating", icon: <MousePointer size={16} /> }
    ]
  },
  {
    title: "Logic",
    items: [
      { id: "set-variable", label: "Set variable", icon: <Variable size={16} /> },
      { id: "condition", label: "Condition", icon: <FilterX size={16} /> },
      { id: "redirect", label: "Redirect", icon: <RotateCw size={16} /> },
      { id: "script", label: "Script", icon: <Variable size={16} /> },
      { id: "typebot", label: "Typebot", icon: <Bot size={16} /> },
      { id: "wait", label: "Wait", icon: <Clock size={16} /> },
      { id: "jump", label: "Jump", icon: <ArrowRight size={16} /> },
      { id: "ab-test", label: "AB Test", icon: <GitFork size={16} /> }
    ]
  },
  {
    title: "Integrations",
    items: [
      { id: "sheets", label: "Sheets", icon: <Sheet size={16} /> },
      { id: "analytics", label: "Analytics", icon: <BarChart3 size={16} /> },
      { id: "http", label: "HTTP request", icon: <Globe2 size={16} /> },
      { id: "email", label: "Email", icon: <EmailIcon size={16} /> },
      { id: "zapier", label: "Zapier", icon: <Zap size={16} /> },
      { id: "make", label: "Make.com", icon: <Workflow size={16} /> },
      { id: "pabbly", label: "Pabbly", icon: <Box size={16} /> },
      { id: "chatwoot", label: "Chatwoot", icon: <MessageCircle size={16} /> },
      { id: "pixel", label: "Pixel", icon: <Boxes size={16} /> },
      { id: "cal", label: "Cal.com", icon: <Calculator size={16} /> },
      { id: "qr", label: "QR code", icon: <QrCode size={16} /> },
      { id: "openai", label: "OpenAI", icon: <Cloud size={16} /> },
      { id: "chatnode", label: "ChatNode", icon: <MessageCircle size={16} /> },
      { id: "mistral", label: "Mistral", icon: <Cloud size={16} /> },
      { id: "anthropic", label: "Anthropic", icon: <Building2 size={16} /> },
      { id: "dify", label: "Dify.AI", icon: <Cloud size={16} /> },
      { id: "eleven", label: "ElevenLabs", icon: <Headphones size={16} /> },
      { id: "together", label: "Together", icon: <GitMerge size={16} /> },
      { id: "openrouter", label: "OpenRouter", icon: <GitMerge size={16} /> },
      { id: "nocodb", label: "NocoDB", icon: <Database size={16} /> },
      { id: "segment", label: "Segment", icon: <Boxes size={16} /> },
      { id: "groq", label: "Groq", icon: <Cloud size={16} /> },
      { id: "zendesk", label: "Zendesk", icon: <MessageCircleMore size={16} /> }
    ]
  }
];

const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Card className="w-64 shadow-lg h-full rounded-none bg-white border-gray-200">
      <ScrollArea className="h-[calc(100vh-60px)]">
        <div className="p-3 space-y-6">
          {nodeCategories.map((category) => (
            <div key={category.title}>
              <h3 className="font-medium text-sm text-gray-700 mb-2 px-1">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 p-2 rounded-lg cursor-move 
                      bg-white border border-gray-200 text-gray-700
                      hover:bg-gray-50 hover:border-gray-300
                      transition-all duration-200"
                    draggable
                    onDragStart={(e) => onDragStart(e, item.id)}
                  >
                    {item.icon}
                    <span className="text-xs font-medium">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default React.memo(Sidebar);