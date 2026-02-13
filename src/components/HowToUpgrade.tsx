import { Wallet, CreditCard, TrendingUp, Award } from "lucide-react";
import { Card } from "./ui/card";

export function HowToUpgrade() {
  const steps = [
    {
      icon: Wallet,
      title: "Пополните счёт",
      description: "Переведите на счёт от 1.5 млн ₽ для Premium или от 5 млн ₽ для Private",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: TrendingUp,
      title: "Поддерживайте остаток",
      description: "Держите необходимую сумму на счёте в течение месяца",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      icon: CreditCard,
      title: "Активируйте статус",
      description: "Статус активируется автоматически при достижении необходимого остатка",
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      icon: Award,
      title: "Пользуйтесь привилегиями",
      description: "Наслаждайтесь всеми преимуществами премиального обслуживания",
      color: "text-orange-600",
      bg: "bg-orange-50"
    }
  ];
  
  return (
    <Card className="border-white/10 p-6 lg:p-8 bg-gradient-to-br from-[#1A1A1A] via-[#252525] to-[#1A1A1A]">
      <div className="mb-8">
        <h3 className="text-white mb-2">Как получить Premium статус</h3>
        <p className="text-white/60">
          Всего 4 простых шага до премиального обслуживания
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent -ml-6"></div>
            )}
            
            <div className="relative">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                <step.icon className={`w-7 h-7 ${step.color}`} />
              </div>
              
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#FFDD2D] rounded-full flex items-center justify-center text-black">
                {index + 1}
              </div>
              
              <h4 className="text-white mb-2">{step.title}</h4>
              <p className="text-white/60 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-[#FFDD2D]/10 rounded-2xl border border-[#FFDD2D]/20 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#FFDD2D] rounded-xl flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-black" />
          </div>
          <div>
            <h4 className="text-white mb-1">Учитывается средний остаток</h4>
            <p className="text-white/60 text-sm">
              Для получения статуса учитывается средний остаток за последние 30 дней. Вы можете пользоваться деньгами, главное — поддерживать необходимый средний баланс.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
