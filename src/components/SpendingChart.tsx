import { Card } from "./ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

export function SpendingChart() {
  const data = [
    { month: "Апр", spending: 145000, income: 380000 },
    { month: "Май", spending: 168000, income: 390000 },
    { month: "Июн", spending: 142000, income: 405000 },
    { month: "Июл", spending: 187000, income: 415000 },
    { month: "Авг", spending: 152000, income: 400000 },
    { month: "Сен", spending: 178000, income: 420000 },
    { month: "Окт", spending: 187450, income: 425000 },
  ];
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg">
          <p className="text-[#6B7280] text-xs mb-2">{payload[0].payload.month}</p>
          <p className="text-green-600 text-sm mb-1">Доходы: {payload[1]?.value.toLocaleString('ru-RU')} ₽</p>
          <p className="text-[#1A1A1A] text-sm">Расходы: {payload[0]?.value.toLocaleString('ru-RU')} ₽</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="border-gray-200 p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[#1A1A1A] mb-1">Аналитика расходов</h3>
          <p className="text-[#6B7280] text-sm">За последние 7 месяцев</p>
        </div>
        <div className="flex items-center gap-1 px-3 py-1.5 bg-green-50 rounded-lg">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-green-600 text-sm">+12.5%</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1A1A1A" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#1A1A1A" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFDD2D" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#FFDD2D" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          <XAxis 
            dataKey="month" 
            stroke="#E5E7EB" 
            tick={{ fill: '#6B7280', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="#E5E7EB" 
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickFormatter={(value) => `${value / 1000}k`}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="spending" 
            stroke="#6B7280" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorSpending)" 
          />
          <Area 
            type="monotone" 
            dataKey="income" 
            stroke="#FFDD2D" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorIncome)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
