import { Droppable } from "@hello-pangea/dnd";
import {AgentCard} from './AgentCard';
import { Badge } from "../ui/badge";

export function AgentColumn({ title, agents, droppableId }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-2">
        <h3 className="font-medium">{title}</h3>
        <Badge variant="outline">{agents?.length}</Badge>
      </div>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="bg-muted/50 p-2 rounded-lg min-h-[200px]"
          >
            {agents?.map((agent, index) => (
              <AgentCard key={agent.id} agent={agent} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}