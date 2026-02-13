import { Send, Download, Smartphone, CreditCard, Repeat2, Globe2, Plus, QrCode } from "lucide-react";
import { Card } from "./ui/card";

export function QuickActions() {
  const actions = [
    { icon: Send, label: "Перевести", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Smartphone, label: "Пополнить", color: "text-green-600", bg: "bg-green-50" },
    { icon: CreditCard, label: "Платежи", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: Repeat2, label: "Обмен валют", color: "text-orange-600", bg: "bg-orange-50" },
    { icon: Globe2, label: "За границу", color: "text-cyan-600", bg: "bg-cyan-50" },
    { icon: QrCode, label: "По QR-коду", color: "text-pink-600", bg: "bg-pink-50" },
  ];
  
  return (
    <Card className="border-gray-200 p-6 bg-white">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-all group"
          >
            <div className={`w-12 h-12 ${action.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <action.icon className={`w-5 h-5 ${action.color}`} />
            </div>
            <span className="text-[#1A1A1A] text-sm text-center">{action.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}
