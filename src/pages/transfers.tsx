import { PremiumHeader } from "../components/PremiumHeader";
import { ArrowRightLeft, User, Users, Building, Globe, Wallet } from "lucide-react";

const transferTypes = [
  {
    icon: User,
    title: "По номеру телефона",
    description: "Мгновенный перевод любому абоненту",
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-400",
  },
  {
    icon: CreditCard,
    title: "По номеру карты",
    description: "Перевод на карту любого банка",
    color: "from-green-500/20 to-green-600/20",
    iconColor: "text-green-400",
  },
  {
    icon: Building,
    title: "По реквизитам",
    description: "Перевод на расчетный счет",
    color: "from-purple-500/20 to-purple-600/20",
    iconColor: "text-purple-400",
  },
  {
    icon: Users,
    title: "Между своими счетами",
    description: "Переводы между вашими картами",
    color: "from-yellow-500/20 to-yellow-600/20",
    iconColor: "text-yellow-400",
  },
  {
    icon: Globe,
    title: "Международные",
    description: "Переводы за границу",
    color: "from-pink-500/20 to-pink-600/20",
    iconColor: "text-pink-400",
  },
  {
    icon: Wallet,
    title: "В электронные кошельки",
    description: "ЮMoney, QIWI и другие",
    color: "from-orange-500/20 to-orange-600/20",
    iconColor: "text-orange-400",
  },
];

function CreditCard({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

export default function TransfersPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <PremiumHeader />
      
      <main className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-[1200px]">
        <div className="mb-8">
          <h1 className="text-white mb-2">Переводы</h1>
          <p className="text-white/60 text-lg">Переводите деньги быстро и без комиссии</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {transferTypes.map((transfer, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${transfer.color} backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#FFDD2D]/50 transition-all cursor-pointer group`}
            >
              <div className={`w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center mb-4 ${transfer.iconColor}`}>
                <transfer.icon className="w-6 h-6" />
              </div>
              <h3 className="text-white mb-1">{transfer.title}</h3>
              <p className="text-white/60 text-sm">{transfer.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-6 border border-white/10">
            <ArrowRightLeft className="w-10 h-10 text-[#FFDD2D] mb-4" />
            <h3 className="text-white text-xl mb-2">Без комиссии</h3>
            <p className="text-white/60">
              Переводы по номеру телефона и между своими счетами всегда бесплатны
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-6 border border-white/10">
            <Wallet className="w-10 h-10 text-[#FFDD2D] mb-4" />
            <h3 className="text-white text-xl mb-2">Мгновенно</h3>
            <p className="text-white/60">
              Деньги поступают на счет получателя в течение нескольких секунд
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 text-center">
          <h2 className="text-white mb-4">Увеличьте лимиты с Premium</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            С подпиской Premium переводите без ограничений по сумме
          </p>
          <button 
            className="px-8 py-4 bg-[#FFDD2D] hover:bg-[#FCD34D] text-black rounded-xl transition-all"
            onClick={() => window.location.href = '/premium'}
          >
            Узнать больше
          </button>
        </div>
      </main>
    </div>
  );
}
