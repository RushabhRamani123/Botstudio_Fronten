import { useState } from "react";
import {
  //  useParams
  // ,
  Link,
  useNavigate,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Info, PlusCircle, MoreVertical } from "lucide-react";
import { useBotStore } from "../../app/botStore";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const BotDetailView = () => {
  // const { id } = useParams();
  const { selectedBot,selectFlow, addFlow } = useBotStore();
  const navigate = useNavigate();
  const [isAddFlowModalOpen, setIsAddFlowModalOpen] = useState(false);
  const [newFlowName, setNewFlowName] = useState("");
  if (!selectedBot) {
    return <div>Bot not found</div>;
  }
  const handleRowClick = (id:string) => {
    navigate(`/bot/flow`);
    selectFlow(selectedBot.id,id); 
    
  };
  const handleAddFlow = () => {
    if (newFlowName.trim() !== "") {
      console.log(selectedBot);
      console.log(newFlowName);
      addFlow(selectedBot.id, newFlowName);
      setIsAddFlowModalOpen(false);
      setNewFlowName("");
    }
  };
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">{selectedBot.name}</h1>
        <Button variant="ghost" size="sm" className="ml-2">
          <Info className="h-4 w-4" />
          Learn More
        </Button>
      </div>
      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="flows">
          <TabsList>
            <TabsTrigger value="flows">Flows</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Test Bot</Button>
          <Button onClick={() => setIsAddFlowModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Flow
          </Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Flow Name</TableHead>
                <TableHead>Triggers</TableHead>
                <TableHead>Last Published At</TableHead>
                <TableHead>Session</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead>Dropped</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedBot.flowDetails.map((flow) => (
                <TableRow
                  onClick={() => handleRowClick(flow.id)}
                  key={flow.id}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">
                    {flow.name}
                    {flow.name.toLowerCase().includes("edited") && (
                      <span className="ml-2 text-xs text-red-500">Edited</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">
                      {flow.triggers}
                    </span>
                  </TableCell>
                  <TableCell>{flow.lastPublishedAt}</TableCell>
                  <TableCell>{flow.sessions}</TableCell>
                  <TableCell>{flow.completed}</TableCell>
                  <TableCell>{flow.dropped}</TableCell>
                  <TableCell>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {flow.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="text-center py-4 text-sm text-muted-foreground">
        No more to load
      </div>
      <Dialog open={isAddFlowModalOpen} onOpenChange={setIsAddFlowModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Flow</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter flow name"
            value={newFlowName}
            onChange={(e) => setNewFlowName(e.target.value)}
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddFlowModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddFlow}>Add Flow</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default BotDetailView;
