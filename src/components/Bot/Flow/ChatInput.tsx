import { Send } from 'lucide-react';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const ChatInput = ({ 
  inputMessage, 
  setInputMessage, 
  handleSubmit, 
  isLoading 
}: ChatInputProps) => (
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
);

// FlowControls.tsx
