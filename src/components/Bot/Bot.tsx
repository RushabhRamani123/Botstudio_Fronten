import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PlusCircle, Search, Info, BarChart2, RotateCw, MoreVertical } from 'lucide-react';
import { useBotStore } from '../../app/botStore'; // Adjust the import path as needed
import { useNavigate } from "react-router-dom";
const AnimatedBotIcon = () => {
  return (
    <div className="w-[50px] h-[50px]">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="botGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="1" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="1" />
          </linearGradient>
          <style>
            {`
              @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
              }
              @keyframes blink {
                0%, 100% { transform: scaleY(1); }
                50% { transform: scaleY(0.1); }
              }
              @keyframes antenna {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(5deg); }
              }
              @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
              }
              .bot-body {
                animation: float 3s ease-in-out infinite;
              }
              .eye {
                animation: blink 2.5s infinite;
                transform-origin: center;
              }
              .antenna {
                animation: antenna 2s ease-in-out infinite;
                transform-origin: bottom;
              }
              .highlight {
                animation: pulse 2s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
        <g className="bot-body">
          <rect x="40" y="60" width="120" height="100" rx="20" fill="url(#botGradient)" />
          <g className="antenna">
            <circle cx="100" cy="45" r="8" fill="#2563EB" />
            <rect x="98" y="45" width="4" height="15" fill="#2563EB" />
          </g>
          <circle className="eye" cx="70" cy="95" r="10" fill="white" />
          <circle className="eye" cx="130" cy="95" r="10" fill="white" />
          <path
            d="M75 125 Q100 145 125 125"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle
            className="highlight"
            cx="65"
            cy="85"
            r="3"
            fill="white"
            fillOpacity="0.8"
          />
        </g>
        <g>
          <circle cx="45" cy="50" r="8" fill="#93C5FD" opacity="0.8">
            <animate
              attributeName="opacity"
              values="0.8;0.3;0.8"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="25" cy="65" r="5" fill="#93C5FD" opacity="0.6">
            <animate
              attributeName="opacity"
              values="0.6;0.2;0.6"
              dur="2s"
              begin="0.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="35" cy="35" r="6" fill="#93C5FD" opacity="0.7">
            <animate
              attributeName="opacity"
              values="0.7;0.25;0.7"
              dur="2s"
              begin="1s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
};
const Bot = () => {
  const { bots, isModalOpen, newBotName, setNewBotName, openModal, closeModal, addBot, selectBot } = useBotStore();
  const navigate = useNavigate();

  const handleCreateBot = () => {
    if (newBotName.trim()) {
      addBot(newBotName.trim());
    }
  };

  const handleRowClick = (botId: string) => {
    selectBot(botId);
    navigate(`/bot/${botId}`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="bots">
          <TabsList>
            <TabsTrigger value="bots">Bots</TabsTrigger>
            <TabsTrigger value="templates">Bot Templates</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button onClick={openModal}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Bot
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
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
                <TableRow key={bot.id} onClick={() => handleRowClick(bot.id)} className="cursor-pointer">
                  <TableCell className="font-medium">
                    <div className="flex  items-center">
                      <div><AnimatedBotIcon /></div>
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
        </CardContent>
      </Card>
      <div className="text-center py-4 text-sm text-muted-foreground">No more to load</div>

      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Bot</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter bot name"
            value={newBotName}
            onChange={(e) => setNewBotName(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>Cancel</Button>
            <Button onClick={handleCreateBot}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
const keyframes = `
  @keyframes eyeBlink {
    0%, 90%, 100% { transform: scaleY(1); }
    95% { transform: scaleY(0.1); }
  }
  @keyframes antennaGlow {
    0%, 100% { r: 4; fill: #3b82f6; }
    50% { r: 5; fill: #60a5fa; }
  }
  @keyframes mouthMove {
    0%, 100% { transform: scaleX(1); }
    50% { transform: scaleX(0.8); }
  }
`;
const BotWithStyles = () => (
  <>
    <style>{keyframes}</style>
    <Bot />
  </>
);
export default BotWithStyles;