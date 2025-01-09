import React, { Suspense, lazy, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, FileDown, Save } from 'lucide-react';
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";
import type { Node, Edge } from '@xyflow/react';
import { toast } from '../../../hooks/use-toast';

// Lazy loaded components
const Sidebar = lazy(() => import('./Sidebar'));
const FlowEditor = lazy(() => import('./FlowEditor'));

// Skeleton components for loading states
const SidebarSkeleton = () => (
  <div className="w-64 border-r border-gray-200 h-full bg-white">
    <div className="p-4 space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ))}
    </div>
  </div>
);

const FlowEditorSkeleton = () => (
  <div className="flex-1 bg-gray-50 p-4">
    <div className="h-full border-2 border-dashed border-gray-300 rounded-lg bg-white/50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <Skeleton className="h-32 w-32 rounded-full mx-auto" />
        <Skeleton className="h-4 w-48 mx-auto" />
        <Skeleton className="h-4 w-36 mx-auto" />
      </div>
    </div>
  </div>
);

interface FlowData {
  nodes: Node[];
  edges: Edge[];
}

const CreateAndEditFlow: React.FC = () => {
  const navigate = useNavigate();
  const [save, setSave] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSave(prev => !prev);
      // Add a small delay to ensure the save state is properly toggled
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error('Error triggering save:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      // Add export logic here
      console.log('Exporting flow...');
    } catch (error) {
      console.error('Error exporting flow:', error);
    } finally {
      setIsExporting(false);
    }
  };
  const handleFlowSave = async (flowData: FlowData) => {
    if (!botId || !flowId) {
      toast({
        title: "Error",
        description: "Missing bot or flow ID",
        variant: "destructive",
      });
      return;
    }

    try {
      // Convert the received flow data node to the expected format
      const node = {
        id: flowData.id || "3",
        type: flowData.type || "text",
        position: {
          x: flowData.position?.x || -338.44928778714893,
          y: flowData.position?.y || -410.51922253671137
        },
        data: {
          text: flowData.data?.text || ""
        },
        measured: {
          width: flowData.measured?.width || 217,
          height: flowData.measured?.height || 74
        },
        selected: flowData.selected || false,
        dragging: flowData.dragging || false
      };

      // Use updateFlowNodes from botStore to save the node
      useBotStore.getState().updateFlowNodes(
        botId,
        flowId,
        [node] // Pass as array since updateFlowNodes expects an array of nodes
      );

      console.log('Flow data saved successfully:', node);
      toast({
        title: "Success",
        description: "Flow saved successfully"
      });
      
    } catch (error) {
      console.error('Error saving flow:', error);
      toast({
        title: "Error",
        description: "Failed to save flow data"
      });
    }
  };

  const handleNavigateBack = () => {
    // Add any cleanup or state reset logic here
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Card className="shadow-sm rounded-none border-b border-gray-200">
        <CardContent className="py-2 px-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900 flex items-center gap-1.5">
                Edit Flow
                <span className="text-sm font-normal text-gray-500">
                  Make changes to your flow and save when ready
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1.5"
                onClick={handleExport}
                disabled={isExporting}
              >
                <FileDown className="h-4 w-4" />
                {isExporting ? 'Exporting...' : 'Export'}
              </Button>
              <Button 
                variant="default"
                size="sm" 
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save className="h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleNavigateBack}
                className="hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-1 overflow-hidden">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <div className="flex-1 relative">
          <Suspense fallback={<FlowEditorSkeleton />}>
            <FlowEditor 
              onSave={save} 
              onFlowSave={handleFlowSave}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default CreateAndEditFlow;