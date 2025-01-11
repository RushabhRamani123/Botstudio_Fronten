import React from 'react';
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { PlusCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBotStore } from "../../app/botStore";
import { CreateBotDialog } from "./CreateBotDialog";
import { BotTable } from "./BotTable";
import { BotTemplateTable } from "./BotTemplateTable"; // We'll create this component
import { CreateTemplateDialog } from './CreateTemplateDialog';

export const Bot = () => {
  const {
    bots,
    botTemplates, // Add this to your store
    isModalOpen,
    newBotName,
    setNewBotName,
    newTemplateName,
    setNewTemplateName,
    openModal,
    closeModal,
    openTemplateModal,
    isTemplateModalOpen,
    closeTemplateModal,
    addBot,
    selectBot,
    addTemplate
  } = useBotStore();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("bots");

  const handleCreateBot = () => {
    if (newBotName.trim()) {
      addBot(newBotName.trim());
    }
  };

  const handleRowClick = (botId: string) => {
    selectBot(botId);
    navigate(`/bot/${botId}`);
  };

  const handleTabChange = (value:string) => {
    setActiveTab(value);
  };

  const handleCreateTemplate = () => {
    // Navigate to template creation page or open template creation modal
    if (newTemplateName.trim()) {
      addTemplate(newTemplateName.trim());
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="bots" onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="bots">Bots</TabsTrigger>
            <TabsTrigger value="templates">Bot Templates</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button onClick={activeTab === "bots" ? openModal : openTemplateModal}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {activeTab === "bots" ? "Create New Bot" : "Create New Template"}
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {activeTab === "bots" ? (
            <BotTable bots={bots} onBotClick={handleRowClick} />
          ) : (
            <BotTemplateTable 
              templates={botTemplates} 
              onTemplateClick={(templateId:string) => {
                navigate(`/bot/template/${templateId}`);
              }}
            />
          )}
        </CardContent>
      </Card>

      <div className="text-center py-4 text-sm text-muted-foreground">
        No more to load
      </div>
          
      {activeTab === "bots" && (
        <CreateBotDialog
          isOpen={isModalOpen}
          onClose={closeModal}
          botName={newBotName}
          onBotNameChange={setNewBotName}
          onCreateBot={handleCreateBot}
        />
      )}
       {activeTab === "templates" && (
        <CreateTemplateDialog
          isOpen={isTemplateModalOpen}
          onClose={closeTemplateModal}
          TemplateName={newTemplateName}
          onTemplateNameChange={setNewTemplateName}
          onCreateTemplate={handleCreateTemplate}
        />
      )}
    </div>
  );
};

export default Bot;

/*
  isOpen,
  onClose,
  TemplateName,
  onTemplateNameChange,
  onCreateTemplate,
*/