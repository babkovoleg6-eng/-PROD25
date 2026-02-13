import { Check, X } from "lucide-react";
import { Card } from "./ui/card";
import { useEffect, useRef, useState } from "react";

export function ComparisonTable() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setScrollPosition(scrollLeft);
        setMaxScroll(scrollWidth - clientWidth);
      }
    };
    
    const handleResize = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        setMaxScroll(scrollWidth - clientWidth);
      }
    };
    
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
      handleResize(); // Initial calculation
    }
    
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Calculate progress (0 to 100)
  const scrollProgress = maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0;
  
  const features = [
    { 
      category: "Основные условия",
      items: [
        { name: "Минимальный остаток", start: "0 ₽", premium: "1.5 млн ₽", private: "5 млн ₽" },
        { name: "Стоимость обслуживания", start: "0 ₽", premium: "0 ₽", private: "0 ₽" },
        { name: "Выпуск карты", start: "Бесплатно", premium: "Бесплатно", private: "Бесплатно" },
      ]
    },
    { 
      category: "Кешбэк и бонусы",
      items: [
        { name: "Максимальный кешбэк", start: "5%", premium: "30%", private: "50%" },
        { name: "Кешбэк на все покупки", start: "1%", premium: "2%", private: "3%" },
        { name: "Специальные категории", start: true, premium: true, private: true },
        { name: "Баллы спасибо", start: true, premium: true, private: true },
      ]
    },
    { 
      category: "Переводы и снятие",
      items: [
        { name: "Переводы без комиссии", start: true, premium: true, private: true },
        { name: "Снятие наличных", start: "100 000 ₽", premium: "500 000 ₽", private: "Без лимита" },
        { name: "Международные переводы", start: "2%", premium: "1%", private: "0%" },
      ]
    },
    { 
      category: "Поддержка и сервисы",
      items: [
        { name: "Техподдержка 24/7", start: true, premium: true, private: true },
        { name: "Приоритетная линия", start: false, premium: true, private: true },
        { name: "Персональный менеджер", start: false, premium: true, private: true },
        { name: "Консьерж-сервис", start: false, premium: true, private: true },
        { name: "Private Banking", start: false, premium: false, private: true },
      ]
    },
    { 
      category: "Премиальные услуги",
      items: [
        { name: "Бизнес-залы в аэропортах", start: false, premium: true, private: true },
        { name: "VIP-трансферы", start: false, premium: false, private: true },
        { name: "Страхование путешествий", start: false, premium: true, private: true },
        { name: "Медицинская страховка", start: false, premium: "Базовая", private: "Расширенная" },
        { name: "Эксклюзивные мероприятия", start: false, premium: false, private: true },
      ]
    }
  ];
  
  return (
    <Card className="border-gray-200 p-6 bg-white overflow-hidden">
      {/* Mobile scroll indicator - visible but inactive */}
      <div className="md:hidden mb-6 flex flex-col items-center gap-2">
        {/* Progress bar */}
        <div className="w-full max-w-xs h-0.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#FFDD2D] transition-all duration-300 rounded-full"
            style={{ width: `${Math.min(100, scrollProgress + 20)}%` }}
          />
        </div>
        
        {/* Instruction text */}
        <p className="text-xs text-gray-500 text-center">
          Проведите пальцем для просмотра всех тарифов
        </p>
      </div>
      
      <h3 className="text-[#1A1A1A] mb-6">Сравнение тарифов</h3>
      
      {/* Scrollable table container */}
      <div 
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden -mx-6 px-6 scroll-smooth"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x proximity',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="min-w-[700px]">
          <div className="grid grid-cols-4 gap-4 pb-4 border-b border-gray-200 mb-4">
            <div className="text-[#6B7280]">Услуга</div>
            <div className="text-center">
              <span className="text-[#1A1A1A]">Start</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-[#1A1A1A]">Premium</span>
                <span className="px-2 py-0.5 bg-[#FFDD2D] text-black text-xs rounded-full">Популярный</span>
              </div>
            </div>
            <div className="text-center">
              <span className="text-[#1A1A1A]">Private</span>
            </div>
          </div>
          
          {features.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              <h4 className="text-[#1A1A1A] mb-3 bg-gray-50 px-4 py-2 rounded-lg">
                {section.category}
              </h4>
              
              {section.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex} 
                  className="grid grid-cols-4 gap-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg px-4"
                >
                  <div className="text-[#1A1A1A] text-sm">{item.name}</div>
                  
                  <div className="text-center">
                    {typeof item.start === 'boolean' ? (
                      item.start ? (
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                      )
                    ) : (
                      <span className="text-[#1A1A1A] text-sm">{item.start}</span>
                    )}
                  </div>
                  
                  <div className="text-center">
                    {typeof item.premium === 'boolean' ? (
                      item.premium ? (
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                      )
                    ) : (
                      <span className="text-[#1A1A1A] text-sm">{item.premium}</span>
                    )}
                  </div>
                  
                  <div className="text-center">
                    {typeof item.private === 'boolean' ? (
                      item.private ? (
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                      )
                    ) : (
                      <span className="text-[#1A1A1A] text-sm">{item.private}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
