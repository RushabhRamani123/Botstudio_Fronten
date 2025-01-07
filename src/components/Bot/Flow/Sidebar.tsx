import React from "react";
import { Card } from "../../ui/card";
import { ScrollArea } from "../../ui/scroll-area";
import { nodeCategories } from "../../../data";

const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Card className="w-64 shadow-lg h-full rounded-none bg-white border-gray-200">
      <ScrollArea className="h-[calc(100vh-60px)]">
        <div className="p-3 space-y-6">
          {nodeCategories.map((category) => (
            <div key={category.title}>
              <h3 className="font-medium text-sm text-gray-700 mb-2 px-1">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 p-2 rounded-lg cursor-move 
                      bg-white border border-gray-200 text-gray-700
                      hover:bg-gray-50 hover:border-gray-300
                      transition-all duration-200"
                    draggable
                    onDragStart={(e) => onDragStart(e, item.id)}
                  >
                    {item.icon}
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default React.memo(Sidebar);