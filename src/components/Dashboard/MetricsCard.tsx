import { Card, CardHeader, CardContent } from "../ui/card";
import { Users, Zap, Mail, MessageSquare, ArrowUpDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { CardTitle } from "../ui/card";

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="shadow-lg">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12,431</div>
          <Badge variant="success" className="mt-2">
            <ArrowUpDown className="h-3 w-3 mr-1" />
            24% vs last month
          </Badge>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">68%</div>
          <Progress value={68} className="h-2 mt-3" />
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
          <Mail className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">23</div>
          <Badge variant="destructive" className="mt-2">
            <ArrowUpDown className="h-3 w-3 mr-1" />
            12% vs last month
          </Badge>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2.4s</div>
          <Badge variant="success" className="mt-2">
            <ArrowUpDown className="h-3 w-3 mr-1" />
            18% improvement
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}