import { PremiumHeader } from "../components/PremiumHeader";
import { FileText, Headphones, Shield, Award, Users, BookOpen, Settings, HelpCircle } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Страхование",
    description: "КАСКО, ОСАГО, страхование жизни и имущества",
    link: "/cards",
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    icon: Award,
    title: "Программа лояльности",
    description: "Баллы, кешбэк и специальные предложения",
    link: "/premium",
    color: "from-purple-500/20 to-purple-600/20",
  },
  {
    icon: Users,
    title: "Реферальная программа",
    description: "Приводите друзей и получайте бонусы",
    link: "/premium",
    color: "from-green-500/20 to-green-600/20",
  },
  {
    icon: BookOpen,
    title: "Финансовая грамотность",
    description: "Обучающие материалы и вебинары",
    link: "/investments",
    color: "from-yellow-500/20 to-yellow-600/20",
  },
  {
    icon: Shield,
    title: "Безопасность",
    description: "Защита от мошенников и кибератак",
    link: "/notifications",
    color: "from-red-500/20 to-red-600/20",
  },
  {
    icon: Settings,
    title: "Настройки",
    description: "Управление счетами и картами",
    link: "/cards",
    color: "from-orange-500/20 to-orange-600/20",
  },
];

const supportOptions = [
  {
    icon: Headphones,
    title: "Поддержка 24/7",
    description: "Круглосуточная помощь по любым вопросам",
    action: "Написать в чат",
  },
  {
    icon: HelpCircle,
    title: "База знаний",
    description: "Ответы на часто задаваемые вопросы",
    action: "Перейти в FAQ",
  },
];

export default function MorePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <PremiumHeader />
      
      <main className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-[1200px]">
        <div className="mb-8">
          <h1 className="text-white mb-2">Сервисы и услуги</h1>
          <p className="text-white/60 text-lg">Все возможности Т‑Банка в одном месте</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <a key={index} href={service.link}>
              <div
                className={`bg-gradient-to-br ${service.color} backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:border-[#FFDD2D]/50 transition-all cursor-pointer group h-full`}
              >
                <div className="w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white text-xl mb-2 group-hover:text-[#FFDD2D] transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/60 text-sm">{service.description}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-white text-2xl mb-6">Помощь и поддержка</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {supportOptions.map((option, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 border border-white/10 hover:border-[#FFDD2D]/50 transition-all"
              >
                <option.icon className="w-12 h-12 text-[#FFDD2D] mb-4" />
                <h3 className="text-white text-xl mb-2">{option.title}</h3>
                <p className="text-white/60 mb-6">{option.description}</p>
                <button className="px-6 py-3 bg-[#FFDD2D] hover:bg-[#FCD34D] text-black rounded-xl transition-all">
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl p-6 border border-white/10 text-center">
            <div className="text-4xl text-[#FFDD2D] mb-2">15M+</div>
            <h3 className="text-white mb-2">Клиентов</h3>
            <p className="text-white/60 text-sm">Доверяют нам свои финансы</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl p-6 border border-white/10 text-center">
            <div className="text-4xl text-[#FFDD2D] mb-2">4.8</div>
            <h3 className="text-white mb-2">Рейтинг в App Store</h3>
            <p className="text-white/60 text-sm">Более 1 млн отзывов</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl p-6 border border-white/10 text-center">
            <div className="text-4xl text-[#FFDD2D] mb-2">100+</div>
            <h3 className="text-white mb-2">Наград и премий</h3>
            <p className="text-white/60 text-sm">Лучший digital банк России</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 text-center">
          <h2 className="text-white mb-4">Станьте Premium клиентом</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Получите доступ ко всем сервисам и услугам с максимальными привилегиями
          </p>
          <Link href="/premium">
            <button className="px-8 py-4 bg-[#FFDD2D] hover:bg-[#FCD34D] text-black rounded-xl transition-all">
              Узнать о Premium
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
