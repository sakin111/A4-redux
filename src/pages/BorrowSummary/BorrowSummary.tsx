import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Clock, Target, TrendingUp, Users } from "lucide-react";


const BorrowSummary = () => {

 const summaryStats = [
    { 
      title: "Total Borrows This Month", 
      value: "156", 
      change: "+12%",
      trend: "up",
      icon: BarChart3,
      color: "text-blue-600"
    },
    { 
      title: "Active Borrowers", 
      value: "89", 
      change: "+5%",
      trend: "up",
      icon: Users,
      color: "text-green-600"
    },
    { 
      title: "Overdue Books", 
      value: "7", 
      change: "-3%",
      trend: "down",
      icon: Clock,
      color: "text-red-600"
    },
    { 
      title: "Return Rate", 
      value: "94%", 
      change: "+2%",
      trend: "up",
      icon: Target,
      color: "text-purple-600"
    },
  ];




    return (
       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Borrow Summary</h1>
          <p className="text-gray-600">Track borrowing patterns and library usage analytics</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className={`h-3 w-3 mr-1 ${
                      stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`} />
                    <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                      {stat.change}
                    </span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        </div>
        </div>
    );
};

export default BorrowSummary;