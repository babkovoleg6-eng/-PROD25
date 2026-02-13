import { PremiumHeader } from "../components/PremiumHeader";
import { CreditCard, Shield, Zap, Percent, Star, Gift } from "lucide-react";

const cardTypes = [
  {
    name: "Tinkoff Black",
    type: "Дебетовая карта",
    cashback: "До 15%",
    service: "0 ₽",
    features: ["Бесплатное обслуживание", "Кешбэк до 15%", "Снятие без комиссии"],
    gradient: "from-gray-700 to-gray-900",
    popular: false,
  },
  {
    name: "Tinkoff Premium",
    type: "Премиальная карта",
    cashback: "До 30%",
    service: "0 ₽",
    features: ["Металлическая карта", "Кешбэк до 30%", "VIP-обслуживание"],
    gradient: "from-yellow-600 to-yellow-800",
    popular: true,
  },
  {
    name: "Tinkoff Platinum",
    type: "Кредитная карта",
    cashback: "До 6%",
    service: "0 ₽",
    features: ["До 300 дней без %", "Кешбэк до 6%", "Лимит до 1 млн ₽"],
    gradient: "from-blue-600 to-blue-800",
    popular: false,
  },
];

const benefits = [
  {
    icon: Percent,
    title: "Кешбэк до 30%",
    description: "Возвращаем деньги с каждой покупки",
  },
  {
    icon: Shield,
    title: "Безопасность 24/7",
    description: "Защита от мошенничества и страхование",
  },
  {
    icon: Zap,
    title: "Мгновенный выпуск",
    description: "Виртуальная карта готова сразу",
  },
  {
    icon: Gift,
    title: "Программа лояльности",
    description: "Баллы и специальные предложения",
  },
];

export default function CardsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <PremiumHeader />
      
      <main className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-[1200px]">
        <div className="mb-8">
          <h1 className="text-white mb-2">Карты</h1>
          <p className="text-white/60 text-lg">Выберите карту под свои потребности</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cardTypes.map((card, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-6 border border-white/10 hover:border-[#FFDD2D]/50 transition-all relative overflow-hidden group"
            >
              {card.popular && (
                <div className="absolute top-4 right-4">
                  <div className="bg-[#FFDD2D] text-black text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Популярное
                  </div>
                </div>
              )}
              
              <div className={`w-full h-40 bg-gradient-to-br ${card.gradient} rounded-2xl mb-6 p-6 flex flex-col justify-between`}>
                <div>
                  <CreditCard className="w-8 h-8 text-white/80" />
                </div>
                <div>
                  <div className="text-white/60 text-sm mb-1">{card.type}</div>
                  <div className="text-white">{card.name}</div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Кешбэк</span>
                  <span className="text-white">{card.cashback}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Обслуживание</span>
                  <span className="text-white">{card.service}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {card.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                    <div className="w-1 h-1 rounded-full bg-[#FFDD2D]"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <button className="w-full py-3 bg-[#FFDD2D] hover:bg-[#FCD34D] text-black rounded-xl transition-all">
                Оформить карту
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl p-6 border border-white/10"
            >
              <benefit.icon className="w-10 h-10 text-[#FFDD2D] mb-4" />
              <h3 className="text-white mb-2">{benefit.title}</h3>
              <p className="text-white/60 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 text-center">
          <h2 className="text-white mb-4">Сравните все карты</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Подробное сравнение всех условий и преимуществ карт Т‑Банка
          </p>
          <button 
            className="px-8 py-4 bg-[#FFDD2D] hover:bg-[#FCD34D] text-black rounded-xl transition-all"
            onClick={() => window.location.href = '/'}
          >
            Сравнить карты
          </button>
        </div>
      </main>
    </div>
  );
}
