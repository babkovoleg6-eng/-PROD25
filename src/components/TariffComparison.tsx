import { useState } from "react";
import { Check, Minus, GitCompare, Trophy, Award, Crown, Gem } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";

export function TariffComparison() {
  const [selectedTariffs, setSelectedTariffs] = useState<string[]>(["Bronze", "Silver"]);
  const [isOpen, setIsOpen] = useState(false);
  
  const allTariffs = [
    { 
      name: "Bronze", 
      icon: Trophy, 
      color: "#CD7F32"
    },
    { 
      name: "Silver", 
      icon: Award, 
      color: "#C0C0C0"
    },
    { 
      name: "Gold", 
      icon: Crown, 
      color: "#FFD700"
    },
    { 
      name: "Diamond", 
      icon: Gem, 
      color: "#3B82F6"
    }
  ];
  
  const features = [
    { 
      category: "Основные условия",
      items: [
        { name: "Минимальный остаток", Bronze: "0 ₽", Silver: "3 млн ₽", Gold: "5 млн ₽", Diamond: "10 млн ₽" },
        { name: "Стоимость обслуживания", Bronze: "0 ₽", Silver: "0 ₽", Gold: "0 ₽", Diamond: "0 ₽" },
        { name: "Выпуск карты", Bronze: "Бесплатно", Silver: "Бесплатно", Gold: "Бесплатно", Diamond: "Бесплатно" },
      ]
    },
    { 
      category: "Кешбэк и бонусы",
      items: [
        { name: "Максимальный кешбэк", Bronze: "5%", Silver: "15%", Gold: "30%", Diamond: "50%" },
        { name: "Кешбэк на все покупки", Bronze: "1%", Silver: "2%", Gold: "3%", Diamond: "5%" },
        { name: "Специальные категории", Bronze: true, Silver: true, Gold: true, Diamond: true },
        { name: "Баллы спасибо", Bronze: true, Silver: true, Gold: true, Diamond: true },
      ]
    },
    { 
      category: "Переводы и снятие",
      items: [
        { name: "Переводы без комиссии", Bronze: true, Silver: true, Gold: true, Diamond: true },
        { name: "Снятие наличных", Bronze: "100 000 ₽", Silver: "300 000 ₽", Gold: "500 000 ₽", Diamond: "Без лимита" },
        { name: "Международные переводы", Bronze: "2%", Silver: "1.5%", Gold: "1%", Diamond: "0%" },
      ]
    },
    { 
      category: "Поддержка и сервисы",
      items: [
        { name: "Техподдержка 24/7", Bronze: true, Silver: true, Gold: true, Diamond: true },
        { name: "Приоритетная линия", Bronze: false, Silver: true, Gold: true, Diamond: true },
        { name: "Персональный менеджер", Bronze: false, Silver: false, Gold: true, Diamond: true },
        { name: "Консьерж-сервис", Bronze: false, Silver: false, Gold: true, Diamond: true },
        { name: "Private Banking", Bronze: false, Silver: false, Gold: false, Diamond: true },
      ]
    },
    { 
      category: "Премиальные услуги",
      items: [
        { name: "Бизнес-залы в аэропортах", Bronze: false, Silver: "4 раза/год", Gold: "Безлимит", Diamond: "Безлимит + VIP" },
        { name: "VIP-трансферы", Bronze: false, Silver: false, Gold: false, Diamond: true },
        { name: "Страхование путешествий", Bronze: false, Silver: "До 100к", Gold: "До 500к", Diamond: "До 5 млн" },
        { name: "Медицинская страховка", Bronze: false, Silver: "Базовая", Gold: "Расширенная", Diamond: "Премиум" },
        { name: "Эксклюзивные мероприятия", Bronze: false, Silver: false, Gold: true, Diamond: true },
      ]
    }
  ];
  
  const handleTariffToggle = (tariffName: string) => {
    if (selectedTariffs.includes(tariffName)) {
      if (selectedTariffs.length > 1) {
        setSelectedTariffs(selectedTariffs.filter(t => t !== tariffName));
      }
    } else {
      if (selectedTariffs.length < 4) {
        setSelectedTariffs([...selectedTariffs, tariffName]);
      }
    }
  };
  
  const filteredTariffs = allTariffs.filter(t => selectedTariffs.includes(t.name));
  
  return (
    <Card className="border-white/10 p-6 lg:p-8 bg-gradient-to-br from-[#1A1A1A] via-[#252525] to-[#1A1A1A]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-white mb-2">Сравнение тарифов</h3>
          <p className="text-white/60">
            Выберите тарифы для сравнения и найдите идеальный вариант
          </p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#FFDD2D] hover:bg-[#FCD34D] text-black">
              <GitCompare className="w-4 h-4 mr-2" />
              Выбрать тарифы ({selectedTariffs.length})
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-gradient-to-br from-[#1A1A1A] via-[#252525] to-[#1A1A1A] border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Выберите тарифы для сравнения</DialogTitle>
              <DialogDescription className="text-white/60">
                Можно выбрать от 1 до 4 тарифов одновременно
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-3 py-4">
              {allTariffs.map((tariff) => {
                const isSelected = selectedTariffs.includes(tariff.name);
                const TariffIcon = tariff.icon;
                
                return (
                  <div
                    key={tariff.name}
                    onClick={() => handleTariffToggle(tariff.name)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-white/10 border-white/30' 
                        : 'border-white/10 hover:bg-white/5'
                    }`}
                  >
                    <Checkbox 
                      checked={isSelected}
                      onCheckedChange={() => handleTariffToggle(tariff.name)}
                    />
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <TariffIcon className="w-5 h-5" style={{ color: tariff.color }} />
                    </div>
                    <span className="text-white">{tariff.name}</span>
                  </div>
                );
              })}
            </div>
            
            <Button 
              onClick={() => setIsOpen(false)}
              className="w-full bg-[#FFDD2D] hover:bg-[#FCD34D] text-black"
            >
              Применить
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <div className={`grid gap-4 pb-4 border-b border-white/10 mb-4`} style={{ gridTemplateColumns: `200px repeat(${filteredTariffs.length}, 1fr)` }}>
            <div className="text-white/60">Услуга</div>
            {filteredTariffs.map((tariff) => {
              const TariffIcon = tariff.icon;
              return (
                <div key={tariff.name} className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm">
                    <TariffIcon className="w-4 h-4" style={{ color: tariff.color }} />
                    <span className="text-white">{tariff.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          {features.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              <h4 className="text-white mb-3 bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm">
                {section.category}
              </h4>
              
              {section.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex} 
                  className={`grid gap-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 rounded-lg px-4`}
                  style={{ gridTemplateColumns: `200px repeat(${filteredTariffs.length}, 1fr)` }}
                >
                  <div className="text-white text-sm">{item.name}</div>
                  
                  {filteredTariffs.map((tariff) => {
                    const value = item[tariff.name as keyof typeof item];
                    return (
                      <div key={tariff.name} className="text-center">
                        {typeof value === 'boolean' ? (
                          value ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <Minus className="w-5 h-5 text-white/20 mx-auto" />
                          )
                        ) : (
                          <span className="text-white text-sm">{value}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
