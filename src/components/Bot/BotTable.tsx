import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Info, BarChart2, RotateCw, MoreVertical } from "lucide-react";
import { AnimatedBotIcon } from "./AnimatedBotIcon";

interface Bot {
  id: string;
  name: string;
  lastUpdated: string;
  flows: number;
  sessions: number;
  dropped: number;
}

interface BotTableProps {
  bots: Bot[];
  onBotClick: (botId: string) => void;
}

export const BotTable = ({ bots, onBotClick }: BotTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Name</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Flows</TableHead>
          <TableHead>Sessions</TableHead>
          <TableHead>Dropped</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bots?.map((bot) => (
          <TableRow
            key={bot.id}
            onClick={() => onBotClick(bot.id)}
            className="cursor-pointer"
          >
            <TableCell className="font-medium">
              <div className="flex items-center">
                <AnimatedBotIcon />
                <span className="ml-2">{bot.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center text-sm text-muted-foreground">
                Last Updated {bot.lastUpdated} <Info className="ml-1 h-3 w-3" />
              </div>
            </TableCell>
            <TableCell>{bot.flows}</TableCell>
            <TableCell>
              <div className="flex items-center">
                {bot.sessions} <Info className="ml-1 h-3 w-3" />
              </div>
            </TableCell>
            <TableCell className="text-red-500">{bot.dropped}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon">
                <BarChart2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
