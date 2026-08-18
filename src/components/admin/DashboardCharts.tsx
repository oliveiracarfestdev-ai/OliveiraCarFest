'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface ChartProps {
  exhibitorsByStatus: {
    status: string;
    count: number;
  }[];
  overviewData: {
    name: string;
    value: number;
  }[];
}

const COLORS = {
  aprovado: '#22c55e', // text-green-500
  pendente: '#eab308', // text-yellow-500
  rejeitado: '#ef4444', // text-red-500
};

export function DashboardCharts({ exhibitorsByStatus, overviewData }: ChartProps) {
  
  // Format pie chart data
  const pieData = exhibitorsByStatus.map(item => ({
    name: item.status.charAt(0).toUpperCase() + item.status.slice(1),
    value: item.count,
    color: COLORS[item.status as keyof typeof COLORS] || '#8884d8'
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Overview Bar Chart */}
      <div className="bg-card border border-border/50 p-6 rounded-sm shadow-sm">
        <h3 className="font-heading text-xl uppercase font-bold mb-6">Visão Geral do Sistema</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={overviewData}
              margin={{ top: 5, right: 30, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '4px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="value" fill="#FF6600" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Exhibitors Pie Chart */}
      <div className="bg-card border border-border/50 p-6 rounded-sm shadow-sm">
        <h3 className="font-heading text-xl uppercase font-bold mb-6">Status dos Expositores</h3>
        <div className="h-[300px] w-full">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '4px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground font-sans">
              Sem dados de expositores
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
