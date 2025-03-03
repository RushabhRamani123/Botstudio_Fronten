import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const lineChartData = [
  { name: 'Jan', value: 50 },
  { name: 'Feb', value: 60 },
  { name: 'Mar', value: 45 },
  { name: 'Apr', value: 55 },
  { name: 'May', value: 65 },
  { name: 'Jun', value: 50 },
];

const barChartData = [
  { name: 'Mon', conversations: 120 },
  { name: 'Tue', conversations: 150 },
  { name: 'Wed', conversations: 200 },
  { name: 'Thu', conversations: 180 },
  { name: 'Fri', conversations: 250 },
  { name: 'Sat', conversations: 300 },
  { name: 'Sun', conversations: 280 },
];

const pieChartData = [
  { name: 'Inquiries', value: 400 },
  { name: 'Complaints', value: 300 },
  { name: 'Feedback', value: 300 },
];

const areaChartData = [
  { name: 'Jan', resolved: 40, unresolved: 10 },
  { name: 'Feb', resolved: 50, unresolved: 15 },
  { name: 'Mar', resolved: 35, unresolved: 20 },
  { name: 'Apr', resolved: 45, unresolved: 10 },
  { name: 'May', resolved: 55, unresolved: 5 },
  { name: 'Jun', resolved: 50, unresolved: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']; // Colors for the pie chart

export function ChatbotConversationAnalysis() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Conversation Analytics</CardTitle>
        <CardDescription>Last 30 days performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Grid Layout for Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Line Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Conversation Trends</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Conversations Per Day</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="conversations" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Conversation Types</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Area Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Resolved vs Unresolved Conversations</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="resolved" 
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="unresolved" 
                    stroke="#FF8042"
                    fill="#FF8042"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}