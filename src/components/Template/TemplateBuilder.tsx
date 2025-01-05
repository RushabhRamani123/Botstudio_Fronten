import React, { useState } from 'react';
import { MessageSquare, Send, PlusCircle } from 'lucide-react';

function TemplateBuilder() {
  const [template, setTemplate] = useState({
    title: '',
    content: ''
  });

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hi! I can help you create your template. What would you like to do?' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTemplate(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving template:', template);
    // Add your save logic here
  };

  const handleInsertContent = (content) => {
    setTemplate(prev => ({
      ...prev,
      content: prev.content + (prev.content ? '\n' : '') + content
    }));
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: newMessage }]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = "I'll help you with that! Let me know what specific assistance you need with your template.";
      setMessages(prev => [...prev, {
        role: 'bot',
        content: botResponse
      }]);
    }, 1000);

    setNewMessage('');
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="border-b-2 border-blue-300 bg-white">
        <div className="flex h-16 items-center px-4 justify-between">
          <h2 className="text-lg font-semibold">Template Builder</h2>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
            onClick={handleSave}
          >
            Save Template
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex relative">
        {/* Form Section */}
        <div className="w-1/2 border-r p-4 bg-white">
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Template Title"
              value={template.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-lg"
            />
            
            <textarea
              name="content"
              placeholder="Write your template content..."
              value={template.content}
              onChange={handleChange}
              className="w-full p-2 border rounded-md min-h-[300px] resize-none"
            />
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-1/2 p-4 bg-gray-50">
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-medium mb-4">
              {template.title || 'Untitled Template'}
            </h3>
            <div className="whitespace-pre-wrap">
              {template.content || 'Preview will appear here...'}
            </div>
          </div>
        </div>

        {/* Chat Bot */}
        <div className={`absolute bottom-4 right-4 ${chatOpen ? 'w-80' : 'w-auto'}`}>
          {!chatOpen ? (
            <button
              onClick={() => setChatOpen(true)}
              className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              <MessageSquare className="h-6 w-6" />
            </button>
          ) : (
            <div className="bg-white rounded-lg shadow-xl border">
              {/* Chat Header */}
              <div className="p-3 border-b flex justify-between items-center bg-blue-600 text-white rounded-t-lg">
                <h3 className="font-medium">Template Assistant</h3>
                <button
                  onClick={() => setChatOpen(false)}
                  className="text-white hover:text-gray-200"
                >
                  ×
                </button>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex flex-col gap-2">
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.content}
                      </div>
                      {message.role === 'bot' && (
                        <button
                          onClick={() => handleInsertContent(message.content)}
                          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                        >
                          <PlusCircle className="h-4 w-4" />
                          Insert into template
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
    </div>
  );
}

export default TemplateBuilder;