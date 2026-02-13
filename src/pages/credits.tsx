import { PremiumHeader } from "../components/PremiumHeader";
import { Wallet, Home, Car, GraduationCap, ShoppingBag, CreditCard } from "lucide-react";

const creditProducts = [
  {
    icon: CreditCard,
    name: "Кредитная карта",
    rate: "От 9.9%",
    term: "До 55 дней без %",
    amount: "До 1 000 000 ₽",
    features: ["Льготный период", "Кешбэк до 6%", "Снятие наличных"],
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    icon: Wallet,
    name: "Потребительский кредит",
    rate: "От 5.9%",
    term: "До 5 лет",
    amount: "До 5 000 000 ₽",
    features: ["Без обеспечения", "Решение за 2 минуты", "Деньги сразу"],
    color: "from-green-500/20 to-green-600/20",
  },
  {
    icon: Home,
    name: "Ипотека",
    rate: "От 4.9%",
    term: "До 30 лет",
    amount: "До 30 000 000 ₽",
    features: ["Первичка и вторичка", "Онлайн-одобрение", "Господдержка"],
    color: "from-purple-500/20 to-purple-600/20",
  },
  {
    icon: Car,
    name: "Автокредит",
    rate: "От 3.9%",
    term: "До 7 лет",
    amount: "До 10 000 000 ₽",
    features: ["Новые и б/у авто", "Без первого взноса", "Trade-in"],
    color: "from-red-500/20 to-red-600/20",
  },
  {
    icon: GraduationCap,
    name: "Образовательный кредит",
    rate: "От 3%",
    term: "До 10 лет",
    amount: "До 2 000 000 ₽",
    features: ["Отсрочка платежа", "Льготные условия", "Для студентов"],
    color: "from-yellow-500/20 to-yellow-600/20",
  },
  {
    icon: ShoppingBag,
    name: "Рассрочка",
    rate: "0%",
    term: "До 24 месяцев",
    amount: "До 500 000 ₽",
    features: ["Без переплаты", "У партнеров", "Быстрое оформление"],
    color: "from-pink-500/20 to-pink-600/20",
  },
];

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <PremiumHeader />
      
      <main className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-[1200px]">
        <div className="mb-8">
          <h1 className="text-white mb-2">Кредиты</h1>
          <p className="text-white/60 text-lg">Выгодные условия кредитования для любых целей</p>
        </div>

        <div className="mb-12 bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 border border-white/10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-white mb-4">Узнайте свой лимит за 2 минуты</h2>
              <p className="text-white/80 mb-6">
                Проверка не влияет на кредитную историю. Никаких справок и документов.
              </p>
              <button className="px-8 py-4 bg-[#FFDD2D] hover:bg-[#FCD34D] text-black rounded-xl transition-all">
                Узнать лимит
              </button>
            </div>
            <div className="bg-black/20 rounded-2xl p-6">
              <div className="text-white/60 text-sm mb-2">Ваш предодобренный лимит</div>
              <div className="text-[#FFDD2D] text-4xl mb-6">до 3 000 000 ₽</div>
              <div className="text-white/60 text-sm">
                * Рассчитано на основе вашей кредитной истории
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {creditProducts.map((product, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${product.color} backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:border-[#FFDD2D]/50 transition-all`}
            >
              <div className="w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center mb-4">
                <product.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-white text-xl mb-4">{product.name}</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Ставка</span>
                  <span className="text-white">{product.rate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Срок</span>
                  <span className="text-white">{product.term}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Сумма</span>
                  <span className="text-white">{product.amount}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                    <div className="w-1 h-1 rounded-full bg-[#FFDD2D]"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <button className="w-full py-3 bg-[#FFDD2D] hover:bg-[#FCD34D] text-black rounded-xl transition-all">
                Оформить
              </button>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl p-6 border border-white/10">
            <div className="text-4xl text-[#FFDD2D] mb-2">2 мин</div>
            <h3 className="text-white mb-2">Быстрое решение</h3>
            <p className="text-white/60 text-sm">Одобрение кредита онлайн без посещения офиса</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl p-6 border border-white/10">
            <div className="text-4xl text-[#FFDD2D] mb-2">0%</div>
            <h3 className="text-white mb-2">Без комиссий</h3>
            <p className="text-white/60 text-sm">Никаких скрытых платежей и дополнительных сборов</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl p-6 border border-white/10">
            <div className="text-4xl text-[#FFDD2D] mb-2">24/7</div>
            <h3 className="text-white mb-2">Онлайн-поддержка</h3>
            <p className="text-white/60 text-sm">Помощь в любое время дня и ночи</p>
          </div>
        </div>
      </main>
    </div>
  );
}
