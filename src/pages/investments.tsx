import { PremiumHeader } from "../components/PremiumHeader";
import { TrendingUp, DollarSign, PieChart, BarChart3, Shield, Sparkles } from "lucide-react";

const investmentProducts = [
  {
    icon: BarChart3,
    name: "Акции",
    description: "Российские и иностранные акции",
    return: "До 30% годовых",
    risk: "Высокий",
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    icon: PieChart,
    name: "Облигации",
    description: "ОФЗ и корпоративные облигации",
    return: "До 15% годовых",
    risk: "Средний",
    color: "from-green-500/20 to-green-600/20",
  },
  {
    icon: DollarSign,
    name: "Валюта",
    description: "Торговля валютными парами",
    return: "До 20% годовых",
    risk: "Средний",
    color: "from-purple-500/20 to-purple-600/20",
  },
  {
    icon: TrendingUp,
    name: "Фонды",
    description: "ETF и паевые инвестиционные фонды",
    return: "До 25% годовых",
    risk: "Низкий",
    color: "from-yellow-500/20 to-yellow-600/20",
  },
  {
    icon: Sparkles,
    name: "Структурные продукты",
    description: "Защита капитала с потенциалом роста",
    return: "До 40% годовых",
    risk: "Низкий",
    color: "from-pink-500/20 to-pink-600/20",
  },
  {
    icon: Shield,
    name: "ИИС",
    description: "Индивидуальный инвестиционный счет",
    return: "До 52 000 ₽ от государства",
    risk: "Любой",
    color: "from-orange-500/20 to-orange-600/20",
  },
];

const features = [
  {
    title: "0 ₽",
    subtitle: "Комиссия за покупку акций",
    description: "Торгуйте без дополнительных расходов",
  },
  {
    title: "24/7",
    subtitle: "Доступ к рынкам",
    description: "Торгуйте в любое время суток",
  },
  {
    title: "∞",
    subtitle: "Аналитика и идеи",
    description: "Экспертные рекомендации каждый день",
  },
];

export default function InvestmentsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <PremiumHeader />
      
      <main className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-[1200px]">
        <div className="mb-8">
          <h1 className="text-white mb-2">Инвестиции</h1>
          <p className="text-white/60 text-lg">Инвестируйте в свое будущее с Т‑Банком</p>
        </div>

        <div className="mb-12 bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 border border-white/10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-white mb-4">Начните инвестировать с 1000 ₽</h2>
              <p className="text-white/80 mb-6">
                Откройте брокерский счет онлайн за 5 минут. Без комиссий за обслуживание.
              </p>
              <button className="px-8 py-4 bg-[#FFDD2D] hover:bg-[#FCD34D] text-black rounded-xl transition-all">
                Открыть счет
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl text-[#FFDD2D] mb-1">{feature.title}</div>
                  <div className="text-white text-sm mb-1">{feature.subtitle}</div>
                  <div className="text-white/60 text-xs">{feature.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {investmentProducts.map((product, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${product.color} backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:border-[#FFDD2D]/50 transition-all`}
            >
              <div className="w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center mb-4">
                <product.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-white text-xl mb-2">{product.name}</h3>
              <p className="text-white/60 text-sm mb-4">{product.description}</p>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Доходность</span>
                  <span className="text-white">{product.return}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Риск</span>
                  <span className="text-white">{product.risk}</span>
                </div>
              </div>

              <button className="w-full py-3 bg-[#FFDD2D] hover:bg-[#FCD34D] text-black rounded-xl transition-all">
                Подробнее
              </button>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 border border-white/10">
            <TrendingUp className="w-12 h-12 text-[#FFDD2D] mb-4" />
            <h3 className="text-white text-xl mb-2">Готовые стратегии</h3>
            <p className="text-white/60 mb-6">
              Инвестируйте по готовым портфелям от профессиональных управляющих
            </p>
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/20">
              Смотреть стратегии
            </button>
          </div>

          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 border border-white/10">
            <Shield className="w-12 h-12 text-[#FFDD2D] mb-4" />
            <h3 className="text-white text-xl mb-2">Защита инвестора</h3>
            <p className="text-white/60 mb-6">
              Ваши активы защищены государственной системой страхования
            </p>
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/20">
              Узнать больше
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 text-center">
          <h2 className="text-white mb-4">Инвестиции с Premium</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Клиенты Premium получают расширенную аналитику, приоритетную поддержку и эксклюзивные инвестиционные идеи
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
