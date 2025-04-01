import React from 'react';
import { MessageSquare, Send } from 'lucide-react';

// Define types for the message
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Define props type for the Chatbot component
interface ChatbotProps {
  handleSendMessage: () => void;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  messages: Message[];
  newMessage: string;
  setNewMessage: (message: string) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({
  handleSendMessage,
  chatOpen, 
  setChatOpen,
  messages,
  newMessage, 
  setNewMessage
}) => {
  return (
    <div>
        <div
          className={`absolute bottom-4 right-4 ${
            chatOpen ? "w-80" : "w-auto"
          }`}
        >
          {!chatOpen ? (
            <button
              onClick={() => setChatOpen(true)}
              className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              <MessageSquare className="h-6 w-6" />
            </button>
          ) : (
            <div className="bg-white rounded-lg shadow-xl border">
              <div className="p-3 border-b flex justify-between items-center bg-blue-600 text-white rounded-t-lg">
                <h3 className="font-medium">Template Assistant</h3>
                <button
                  onClick={() => setChatOpen(false)}
                  className="text-white hover:text-gray-200"
                >
                  ×
                </button>
              </div>

              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="flex flex-col gap-2">
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-md"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  );
}

export default Chatbot;