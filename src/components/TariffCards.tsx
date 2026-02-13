import { Check, Star, Crown, Diamond } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export function TariffCards() {
  const tariffs = [
    {
      name: "Start",
      icon: Star,
      price: "Бесплатно",
      requirement: "от 0 ₽",
      description: "Базовый уровень обслуживания для начала работы с Т‑Банком",
      features: [
        "Бесплатное обслуживание карты",
        "Кешбэк до 5%",
        "Переводы без комиссии",
        "Снятие до 100 000 ₽/мес",
        "Базовая поддержка",
      ],
      color: "gray",
      borderColor: "border-gray-200",
      bgColor: "bg-white",
      buttonVariant: "outline" as const,
      current: true
    },
    {
      name: "Premium",
      icon: Crown,
      price: "0 ₽/мес",
      requirement: "от 1.5 млн ₽",
      description: "Премиальное обслуживание с расширенными возможностями",
      features: [
        "Бесплатное обслуживание карты",
        "Кешбэк до 30%",
        "Переводы без комиссии",
        "Снятие до 500 000 ₽/мес",
        "Приоритетная поддержка 24/7",
        "Консьерж-сервис",
        "Бизнес-залы в аэропортах",
        "Страхование путешествий",
        "Индивидуальный менеджер",
      ],
      color: "yellow",
      borderColor: "border-[#FFDD2D]",
      bgColor: "bg-gradient-to-br from-[#FFFBEB] to-white",
      buttonVariant: "default" as const,
      popular: true,
      current: false
    },
    {
      name: "Private",
      icon: Diamond,
      price: "0 ₽/мес",
      requirement: "от 5 млн ₽",
      description: "Эксклюзивное обслуживание для VIP-клиентов",
      features: [
        "Все преимущества Premium",
        "Кешбэк до 50%",
        "Неограниченное снятие наличных",
        "Private Banking менеджер",
        "Выделенная линия поддержки",
        "VIP-залы и трансферы",
        "Приоритет в сервисах",
        "Индивидуальные условия",
        "Эксклюзивные мероприятия",
        "Консультации финансовых экспертов",
      ],
      color: "dark",
      borderColor: "border-gray-800",
      bgColor: "bg-gradient-to-br from-gray-900 to-black",
      buttonVariant: "secondary" as const,
      exclusive: true,
      current: false
    }
  ];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {tariffs.map((tariff) => (
        <Card 
          key={tariff.name}
          className={`${tariff.borderColor} ${tariff.bgColor} p-6 relative overflow-hidden ${tariff.popular ? 'lg:scale-105 shadow-xl' : ''}`}
        >
          {tariff.popular && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFDD2D] via-[#FCD34D] to-[#FFDD2D]"></div>
          )}
          
          {tariff.current && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-[#FFDD2D] text-black text-xs rounded-full">
                Текущий
              </span>
            </div>
          )}
          
          {tariff.popular && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-[#FFDD2D] text-black text-xs rounded-full">
                Популярный
              </span>
            </div>
          )}
          
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
            tariff.color === 'yellow' ? 'bg-[#FFDD2D]' : 
            tariff.color === 'dark' ? 'bg-white' : 
            'bg-gray-100'
          }`}>
            <tariff.icon className={`w-6 h-6 ${
              tariff.color === 'yellow' ? 'text-black' : 
              tariff.color === 'dark' ? 'text-black' : 
              'text-[#6B7280]'
            }`} />
          </div>
          
          <h3 className={`${tariff.color === 'dark' ? 'text-white' : 'text-[#1A1A1A]'} mb-1`}>
            {tariff.name}
          </h3>
          <p className={`${tariff.color === 'dark' ? 'text-white/60' : 'text-[#6B7280]'} text-sm mb-4`}>
            {tariff.description}
          </p>
          
          <div className="mb-6">
            <p className={`${tariff.color === 'dark' ? 'text-white' : 'text-[#1A1A1A]'} text-3xl mb-1`}>
              {tariff.price}
            </p>
            <p className={`${tariff.color === 'dark' ? 'text-white/60' : 'text-[#6B7280]'} text-sm`}>
              {tariff.requirement}
            </p>
          </div>
          
          <div className="space-y-3 mb-6">
            {tariff.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className={`w-5 h-5 flex-shrink-0 ${
                  tariff.color === 'yellow' ? 'text-[#1A1A1A]' : 
                  tariff.color === 'dark' ? 'text-[#FFDD2D]' : 
                  'text-green-600'
                }`} />
                <span className={`text-sm ${tariff.color === 'dark' ? 'text-white/80' : 'text-[#1A1A1A]'}`}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
          
          <Button 
            variant={tariff.buttonVariant}
            className={`w-full ${
              tariff.buttonVariant === 'default' ? 'bg-[#FFDD2D] hover:bg-[#FCD34D] text-black' : 
              tariff.color === 'dark' ? 'bg-white text-black hover:bg-gray-100' : ''
            }`}
          >
            {tariff.current ? 'Текущий тариф' : 'Подробнее'}
          </Button>
        </Card>
      ))}
    </div>
  );
}
