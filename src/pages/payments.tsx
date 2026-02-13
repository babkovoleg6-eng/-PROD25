import { PremiumHeader } from "../components/PremiumHeader";
import { CreditCard, Smartphone, Home, Zap, Phone, Wifi } from "lucide-react";

const paymentCategories = [
  {
    icon: Smartphone,
    title: "Мобильная связь",
    description: "Пополнение телефона",
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Home,
    title: "ЖКХ",
    description: "Коммунальные услуги",
    color: "from-green-500/20 to-green-600/20",
    iconColor: "text-green-400",
  },
  {
    icon: Zap,
    title: "Электроэнергия",
    description: "Оплата света",
    color: "from-yellow-500/20 to-yellow-600/20",
    iconColor: "text-yellow-400",
  },
  {
    icon: Wifi,
    title: "Интернет и ТВ",
    description: "Домашний интернет",
    color: "from-purple-500/20 to-purple-600/20",
    iconColor: "text-purple-400",
  },
  {
    icon: Phone,
    title: "Телефония",
    description: "Городской телефон",
    color: "from-pink-500/20 to-pink-600/20",
    iconColor: "text-pink-400",
  },
  {
    icon: CreditCard,
    title: "Другие услуги",
    description: "Прочие платежи",
    color: "from-gray-500/20 to-gray-600/20",
    iconColor: "text-gray-400",
  },
];

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <PremiumHeader />
      
      <main className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-[1200px]">
        <div className="mb-8">
          <h1 className="text-white mb-2">Платежи</h1>
          <p className="text-white/60 text-lg">Оплачивайте услуги быстро и без комиссии</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paymentCategories.map((category, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${category.color} backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#FFDD2D]/50 transition-all cursor-pointer group`}
            >
              <div className={`w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center mb-4 ${category.iconColor}`}>
                <category.icon className="w-6 h-6" />
              </div>
              <h3 className="text-white mb-1">{category.title}</h3>
              <p className="text-white/60 text-sm">{category.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 text-center">
          <h2 className="text-white mb-4">Быстрые платежи с Premium</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Подключите Т‑Банк Premium и получите кешбэк до 30% от всех платежей
          </p>
          <button 
            className="px-8 py-4 bg-[#FFDD2D] hover:bg-[#FCD34D] text-black rounded-xl transition-all"
            onClick={() => window.location.href = '/premium'}
          >
            Подробнее о Premium
          </button>
        </div>
      </main>
    </div>
  );
}
