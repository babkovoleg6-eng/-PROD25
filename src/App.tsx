import { useState } from "react";
import { AuthProvider } from "./components/AuthProvider";
import { PremiumHeader } from "./components/PremiumHeader";
import { MoneyBar } from "./components/MoneyBar";
import { TierBenefits } from "./components/TierBenefits";
import { TariffComparison } from "./components/TariffComparison";
import { HowToUpgrade } from "./components/HowToUpgrade";
import { FAQ } from "./components/FAQ";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [selectedTier, setSelectedTier] = useState("Silver");
  
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0A0A0A]">
        <PremiumHeader />
      
      <main className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-[1400px]">
        <div className="space-y-8 lg:space-y-12">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-white mb-4">Т‑Банк Premium</h1>
            <p className="text-white/60 text-lg">
              Премиальное банковское обслуживание с эксклюзивными привилегиями. 
              Выберите свой уровень и получайте максимум от каждой операции.
            </p>
          </div> 
          
          {/* Money Progress Bar */}
          <MoneyBar selectedTier={selectedTier} onTierSelect={setSelectedTier} />
          
          {/* Tier Benefits */}
          <div id="tier-benefits">
            <TierBenefits selectedTier={selectedTier} />
          </div>
          
          {/* How to Upgrade */}
          <HowToUpgrade />
          
          {/* Tariff Comparison */}
          <TariffComparison />
          
          {/* FAQ */}
          <FAQ />
          
          {/* CTA Section */}
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFDD2D]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFDD2D]/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-white mb-4">Готовы к премиальному обслуживанию?</h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Оформите карту Т‑Банк Premium прямо сейчас и начните пользоваться 
                эксклюзивными привилегиями уже сегодня
              </p>
              <button 
                className="px-8 py-4 bg-[#FFDD2D] hover:bg-[#FCD34D] text-black rounded-xl transition-all text-lg"
                onClick={() => window.location.href = '/premium'}
              >
                Оформить Premium
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-[#1A1A1A] border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white mb-3">О банке</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-white text-sm">О нас</a></li>
                <li><a href="#" className="text-white/60 hover:text-white text-sm">Пресс-центр</a></li>
                <li><a href="#" className="text-white/60 hover:text-white text-sm">Карьера</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-3">Продукты</h4>
              <ul className="space-y-2">
                <li><a href="/cards" className="text-white/60 hover:text-white text-sm">Карты</a></li>
                <li><a href="/deposits" className="text-white/60 hover:text-white text-sm">Вклады</a></li>
                <li><a href="/credits" className="text-white/60 hover:text-white text-sm">Кредиты</a></li>
                <li><a href="/investments" className="text-white/60 hover:text-white text-sm">Инвестиции</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-3">Поддержка</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-white text-sm">Помощь</a></li>
                <li><a href="#" className="text-white/60 hover:text-white text-sm">Контакты</a></li>
                <li><a href="#" className="text-white/60 hover:text-white text-sm">Безопасность</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-3">Документы</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-white text-sm">Тарифы</a></li>
                <li><a href="#" className="text-white/60 hover:text-white text-sm">Раскрытие информации</a></li>
                <li><a href="#" className="text-white/60 hover:text-white text-sm">Лицензии</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">© 2025 Т‑Банк. Все права защищены.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/60 hover:text-white text-sm">Политика конфиденциальности</a>
              <a href="#" className="text-white/60 hover:text-white text-sm">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
      </div>
      <Toaster position="top-right" />
    </AuthProvider>
  );
}
