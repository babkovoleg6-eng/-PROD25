import { PremiumHeader } from "../components/PremiumHeader";
import { PiggyBank, TrendingUp, Calendar, Lock } from "lucide-react";

const depositTypes = [
  {
    name: "Накопительный счет",
    rate: "До 15%",
    term: "Бессрочный",
    minAmount: "От 0 ₽",
    features: ["Пополнение в любое время", "Снятие без потери процентов", "Ежемесячная капитализация"],
    gradient: "from-green-500/20 to-green-600/20",
  },
  {
    name: "Срочный вклад",
    rate: "До 18%",
    term: "От 3 месяцев",
    minAmount: "От 50 000 ₽",
    features: ["Фиксированная ставка", "Защита от снижения ставки", "Автопродление"],
    gradient: "from-blue-500/20 to-blue-600/20",
  },
  {
    name: "Премиум вклад",
    rate: "До 20%",
    term: "От 6 месяцев",
    minAmount: "От 1 000 000 ₽",
    features: ["Максимальная ставка", "Персональный менеджер", "Индивидуальные условия"],
    gradient: "from-yellow-500/20 to-yellow-600/20",
  },
];

const advantages = [
  {
    icon: Lock,
    title: "Гарантия АСВ",
    description: "Вклады застрахованы на сумму до 1.4 млн ₽",
  },
  {
    icon: TrendingUp,
    title: "Высокие ставки",
    description: "Одни из самых выгодных условий на рынке",
  },
  {
    icon: Calendar,
    title: "Гибкие сроки",
    description: "Выбирайте удобный срок размещения",
  },
  {
    icon: PiggyBank,
    title: "Без комиссий",
    description: "Открытие и обслуживание вклада бесплатно",
  },
];

export default function DepositsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <PremiumHeader />
      
      <main className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-[1200px]">
        <div className="mb-8">
          <h1 className="text-white mb-2">Вклады</h1>
          <p className="text-white/60 text-lg">Сохраните и приумножьте свои сбережения</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {depositTypes.map((deposit, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${deposit.gradient} backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:border-[#FFDD2D]/50 transition-all`}
            >
              <div className="text-center mb-6">
                <div className="text-4xl text-white mb-2">{deposit.rate}</div>
                <div className="text-white/60">годовых</div>
              </div>

              <h3 className="text-white text-xl mb-4">{deposit.name}</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Срок</span>
                  <span className="text-white">{deposit.term}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Сумма</span>
                  <span className="text-white">{deposit.minAmount}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {deposit.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                    <div className="w-1 h-1 rounded-full bg-[#FFDD2D]"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <button className="w-full py-3 bg-[#FFDD2D] hover:bg-[#FCD34D] text-black rounded-xl transition-all">
                Открыть вклад
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl p-6 border border-white/10"
            >
              <advantage.icon className="w-10 h-10 text-[#FFDD2D] mb-4" />
              <h3 className="text-white mb-2">{advantage.title}</h3>
              <p className="text-white/60 text-sm">{advantage.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-white mb-4">Калькулятор доходности</h2>
              <p className="text-white/80 mb-6">
                Рассчитайте свой доход по вкладу с учетом капитализации
              </p>
              <button className="px-8 py-4 bg-[#FFDD2D] hover:bg-[#FCD34D] text-black rounded-xl transition-all">
                Рассчитать доход
              </button>
            </div>
            <div className="bg-black/20 rounded-2xl p-6">
              <div className="space-y-4">
                <div>
                  <div className="text-white/60 text-sm mb-1">Сумма вклада</div>
                  <div className="text-white text-2xl">1 000 000 ₽</div>
                </div>
                <div>
                  <div className="text-white/60 text-sm mb-1">Срок</div>
                  <div className="text-white text-2xl">12 месяцев</div>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="text-white/60 text-sm mb-1">Доход</div>
                  <div className="text-[#FFDD2D] text-3xl">180 000 ₽</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
