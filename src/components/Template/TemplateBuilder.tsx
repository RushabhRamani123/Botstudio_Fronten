import { useState, ChangeEvent } from "react";
import { RenderEmailFields } from "./EmailTemplate";
import { RenderMarketingFields } from "./MarketingTemplate";
import Header from "./Header";
import Chatbot from "./Chatbot";
export type TemplateType = "email" | "marketing";
export interface Template {
  title: string;
  type: TemplateType;
  subject: string;
  content: string;
  targetAudience: string;
  callToAction: string;
  campaignGoals: string;
  keyMessages: string;
}
export interface Message {
  role: "user" | "bot";
  content: string;
}
function MultiTemplateBuilder() {
  const [templateType, setTemplateType] = useState<TemplateType>("email");
  const [template, setTemplate] = useState<Template>({
    title: "",
    type: "email",
    subject: "",
    content: "",
    targetAudience: "",
    callToAction: "",
    campaignGoals: "",
    keyMessages: "",
  });
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hello! I can help you create your template. What type of template would you like to work on?",
    },
  ]);
  const [newMessage, setNewMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTemplate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleTemplateTypeChange = (type: TemplateType) => {
    setTemplateType(type);
    setTemplate((prev) => ({
      ...prev,
      type,
      content: "",
    }));
  };
  const handleSave = () => {
    console.log("Saving template:", template);
  };
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: newMessage }]);
    setTimeout(() => {
      const botResponse = `I'll help you with your ${templateType} template. What specific assistance do you need?`;
      setMessages((prev) => [...prev, { role: "bot", content: botResponse }]);
    }, 1000);
    
    setNewMessage("");
  };
  return (
    <div className="h-screen flex flex-col">
      <Header
        handleSave={handleSave}
        templateType={templateType}
        handleTemplateTypeChange={handleTemplateTypeChange}
      />
      <div className="flex-1 flex relative">
        <div className="w-1/2 border-r p-4 bg-white">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Name
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter template name..."
                value={template.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            {templateType === "email" ? (
              <RenderEmailFields
                handleChange={handleChange}
                template={template}
              />
            ) : (
              <RenderMarketingFields
                handleChange={handleChange}
                template={template}
              />
            )}
          </div>
        </div>
        <div className="w-1/2 p-4 bg-gray-50">
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-medium mb-2">
              {template.title || "Untitled Template"}
            </h3>
            {templateType === "email" ? (
              <>
                <div className="border-b pb-2 mb-4">
                  <span className="text-gray-600">Subject: </span>
                  <span className="font-medium">
                    {template.subject || "No subject"}
                  </span>
                </div>
                <div className="whitespace-pre-wrap">
                  {template.content || "Email content will appear here..."}
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h4 className="font-medium text-gray-700">Target Audience</h4>
                  <p>{template.targetAudience || "Not specified"}</p>
                </div>
                <div className="border-b pb-2">
                  <h4 className="font-medium text-gray-700">Campaign Goals</h4>
                  <p>{template.campaignGoals || "Not specified"}</p>
                </div>
                <div className="border-b pb-2">
                  <h4 className="font-medium text-gray-700">Key Messages</h4>
                  <p className="whitespace-pre-wrap">
                    {template.keyMessages || "Not specified"}
                  </p>
                </div>
                <div className="border-b pb-2">
                  <h4 className="font-medium text-gray-700">Call to Action</h4>
                  <p>{template.callToAction || "Not specified"}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Content</h4>
                  <p className="whitespace-pre-wrap">
                    {template.content || "Content will appear here..."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <Chatbot
          handleSendMessage={handleSendMessage}
          chatOpen={chatOpen}
          setChatOpen={setChatOpen}
          messages={messages}
          setMessages={setMessages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
        />
      </div>
    </div>
  );
}
export default MultiTemplateBuilder;