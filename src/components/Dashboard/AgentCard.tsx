import { Draggable } from "@hello-pangea/dnd";
import { Avatar } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export function AgentCard({ agent, index }) {
  return (
    <Draggable key={agent.id} draggableId={agent.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 rounded-lg border flex items-center gap-4 hover:bg-muted/50 transition-colors shadow-sm mb-2"
        >
          <Avatar className="h-9 w-9" />
          <div className="flex-1">
            <p className="font-medium">{agent.name}</p>
            <p className="text-sm text-muted-foreground">{agent.device}</p>
            <p className="text-sm text-muted-foreground">Last active: {agent.lastActive}</p>
            <p className="text-sm font-medium text-primary">{agent.amount}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Transfer Agent</DropdownMenuItem>
              <DropdownMenuItem>Performance History</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </Draggable>
  );
}