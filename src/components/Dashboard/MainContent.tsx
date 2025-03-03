import {MetricsCards} from './MetricsCard';
import {ChatbotConversationAnalysis} from './ChatbotConversationAnalysis';
import {AgentManagement} from './AgentManagement';

export function MainContent({ agents }) {
  return (
    <div className="grid gap-4">
      <MetricsCards />
      <ChatbotConversationAnalysis />
      <AgentManagement agents={agents} />
    </div>
  );
}