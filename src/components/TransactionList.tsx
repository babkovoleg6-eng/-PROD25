import { ShoppingBag, Coffee, Plane, Fuel, Music, Utensils, Home, ShoppingCart, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export function TransactionList() {
  const transactions = [
    { 
      id: 1, 
      icon: ShoppingBag, 
      name: "OZON", 
      category: "Покупки", 
      date: "Сегодня, 14:23", 
      amount: -12450, 
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    { 
      id: 2, 
      icon: Coffee, 
      name: "Starbucks", 
      category: "Кафе и рестораны", 
      date: "Сегодня, 10:15", 
      amount: -685, 
      color: "text-green-600",
      bg: "bg-green-50"
    },
    { 
      id: 3, 
      icon: Fuel, 
      name: "Газпромнефть", 
      category: "Авто", 
      date: "Вчера, 18:42", 
      amount: -3200, 
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    { 
      id: 4, 
      icon: Music, 
      name: "Яндекс Музыка", 
      category: "Подписки", 
      date: "Вчера, 09:00", 
      amount: -299, 
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    { 
      id: 5, 
      icon: Plane, 
      name: "Аэрофлот", 
      category: "Путешествия", 
      date: "16 окт", 
      amount: -45600, 
      color: "text-cyan-600",
      bg: "bg-cyan-50"
    },
    { 
      id: 6, 
      icon: Utensils, 
      name: "Delivery Club", 
      category: "Доставка еды", 
      date: "16 окт", 
      amount: -1850, 
      color: "text-pink-600",
      bg: "bg-pink-50"
    },
    { 
      id: 7, 
      icon: Home, 
      name: "Коммунальные услуги", 
      category: "ЖКХ", 
      date: "15 окт", 
      amount: -8900, 
      color: "text-red-600",
      bg: "bg-red-50"
    },
    { 
      id: 8, 
      icon: ArrowDownLeft, 
      name: "Зарплата", 
      category: "Доход", 
      date: "15 окт", 
      amount: 425000, 
      color: "text-green-600",
      bg: "bg-green-50"
    },
  ];
  
  return (
    <Card className="border-gray-200 p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[#1A1A1A]">Операции</h3>
        <button className="text-[#6B7280] hover:text-[#1A1A1A] transition-colors text-sm">
          Все операции
        </button>
      </div>
      
      <div className="space-y-2">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${transaction.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <transaction.icon className={`w-5 h-5 ${transaction.color}`} />
              </div>
              <div>
                <p className="text-[#1A1A1A] group-hover:text-[#1A1A1A]">{transaction.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[#6B7280] text-xs">{transaction.category}</span>
                  <span className="text-[#6B7280] text-xs">·</span>
                  <span className="text-[#6B7280] text-xs">{transaction.date}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className={`${transaction.amount < 0 ? 'text-[#1A1A1A]' : 'text-green-600'}`}>
                {transaction.amount < 0 ? '−' : '+'}
                {Math.abs(transaction.amount).toLocaleString('ru-RU')} ₽
              </p>
              {transaction.amount < 0 && transaction.id <= 3 && (
                <p className="text-[#FFDD2D] text-xs mt-0.5">+{Math.floor(Math.abs(transaction.amount) * 0.3)} ₽</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
