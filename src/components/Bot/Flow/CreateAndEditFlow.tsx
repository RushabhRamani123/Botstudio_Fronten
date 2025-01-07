import React, { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, FileDown, Save } from 'lucide-react';
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";
const Sidebar = lazy(() => import('./Sidebar'));
const FlowEditor = lazy(() => import('./FlowEditor'));
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
const CreateAndEditFlow: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Card className="shadow-sm rounded-none border-b border-gray-200">
        <CardContent className="py-2 px-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900 flex items-center gap-1.5">
                Edit Flow
                <span className="text-sm font-normal text-gray-500">Make changes to your flow and save when ready</span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1.5"
              >
                <FileDown className="h-4 w-4" />
                Export
              </Button>
              <Button 
                variant="default"
                size="sm" 
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4" />
                Save
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate(-1)}
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
            <FlowEditor />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default CreateAndEditFlow;