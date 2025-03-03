import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { CheckCircle, BookOpen } from "lucide-react";

export function TutorialSection() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Getting Started
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
          <CheckCircle className="h-5 w-5 text-primary" />
          <div>
            <h4 className="font-medium">Setup Your Bot</h4>
            <p className="text-sm text-muted-foreground">Configure basic bot settings</p>
          </div>
          <Button size="sm" className="ml-auto">Start</Button>
        </div>

        <div className="flex items-center gap-4 p-3 rounded-lg">
          <CheckCircle className="h-5 w-5 text-muted-foreground" />
          <div>
            <h4 className="font-medium">Create First Campaign</h4>
            <p className="text-sm text-muted-foreground">Set up email marketing workflow</p>
          </div>
          <Button size="sm" variant="outline" className="ml-auto">Start</Button>
        </div>

        <div className="flex items-center gap-4 p-3 rounded-lg">
          <CheckCircle className="h-5 w-5 text-muted-foreground" />
          <div>
            <h4 className="font-medium">Add Team Members</h4>
            <p className="text-sm text-muted-foreground">Invite collaborators to your workspace</p>
          </div>
          <Button size="sm" variant="outline" className="ml-auto">Start</Button>
        </div>
      </CardContent>
    </Card>
  );
}