import { Crown, Shield, Headphones, Percent, Star, Zap, Plane, Gift } from "lucide-react";
import { Card } from "./ui/card";

export function PremiumBenefits() {
  const benefits = [
    {
      icon: Percent,
      title: "Кешбэк до 30%",
      description: "На избранные категории",
      value: "+5 620 ₽",
      color: "text-[#FFDD2D]",
      bg: "bg-[#FFFBEB]",
      border: "border-[#FEF3C7]"
    },
    {
      icon: Shield,
      title: "Страхование",
      description: "Путешествий и покупок",
      value: "Активно",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100"
    },
    {
      icon: Headphones,
      title: "Консьерж-сервис",
      description: "24/7 поддержка",
      value: "Доступен",
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100"
    },
    {
      icon: Plane,
      title: "Бизнес-залы",
      description: "Бесплатный доступ",
      value: "∞",
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      border: "border-cyan-100"
    },
  ];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-gray-200 p-6 bg-white">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-[#FFDD2D] rounded-lg flex items-center justify-center">
            <Crown className="w-4 h-4 text-black" />
          </div>
          <h3 className="text-[#1A1A1A]">Premium преимущества</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className={`p-4 rounded-2xl ${benefit.bg} border ${benefit.border} hover:shadow-md transition-all cursor-pointer group`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 bg-white rounded-xl flex items-center justify-center`}>
                  <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                </div>
                <span className={`text-sm ${benefit.color}`}>{benefit.value}</span>
              </div>
              <h4 className="text-[#1A1A1A] mb-1">{benefit.title}</h4>
              <p className="text-[#6B7280] text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </Card>
      
      <Card className="border-gray-200 p-6 bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFDD2D]/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-[#FFDD2D]" />
                <h3 className="text-white">Пригласить друга</h3>
              </div>
              <p className="text-white/60 text-sm">Получите до 10 000 ₽</p>
            </div>
            <Gift className="w-8 h-8 text-[#FFDD2D]/40" />
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FFDD2D]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-[#FFDD2D]">1</span>
              </div>
              <p className="text-white/80 text-sm">Отправьте другу реферальную ссылку</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FFDD2D]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-[#FFDD2D]">2</span>
              </div>
              <p className="text-white/80 text-sm">Друг оформляет карту Premium</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FFDD2D]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-[#FFDD2D]">3</span>
              </div>
              <p className="text-white/80 text-sm">Вы оба получаете 5 000 ₽</p>
            </div>
          </div>
          
          <button className="w-full px-6 py-3 bg-[#FFDD2D] hover:bg-[#FEE550] text-black rounded-xl transition-all">
            Получить ссылку
          </button>
        </div>
      </Card>
    </div>
  );
}
