import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { CheckCircle } from "lucide-react";
import { Badge } from "../ui/badge";

export function SystemStatus() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>System Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>All Systems Operational</AlertTitle>
          <AlertDescription>
            No incidents reported in the last 24 hours
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">API Response Time</span>
            <Badge variant="success">Normal</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Database Health</span>
            <Badge variant="success">Stable</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Storage Capacity</span>
            <Badge variant="warning">64% Used</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}