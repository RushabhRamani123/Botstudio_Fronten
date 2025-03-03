import { Card, CardHeader, CardContent } from "../ui/card";
import {AgentColumn} from './AgentColumn';
import { CardDescription, CardTitle } from "../ui/card";

export function AgentManagement({ agents }) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Agent Management</CardTitle>
        <CardDescription>Drag agents between columns to update their status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <AgentColumn title="New" agents={agents.new} droppableId="new" />
          <AgentColumn title="In Progress" agents={agents.inProgress} droppableId="inProgress" />
          <AgentColumn title="Awaiting" agents={agents.awaiting} droppableId="awaiting" />
          <AgentColumn title="Done" agents={agents.done} droppableId="done" />
          <AgentColumn title="Closed" agents={agents.closed} droppableId="closed" />
        </div>
      </CardContent>
    </Card>
  );
}