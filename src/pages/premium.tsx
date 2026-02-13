import { PremiumHeader } from "../components/PremiumHeader";
import { MoneyBar } from "../components/MoneyBar";
import { TierBenefits } from "../components/TierBenefits";
import { TariffComparison } from "../components/TariffComparison";
import { useState } from "react";
import Link from "next/link";

export default function PremiumPage() {
  const [selectedTier, setSelectedTier] = useState("Silver");
  
  return (
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
          <TierBenefits selectedTier={selectedTier} />
          
          {/* Tariff Comparison */}
          <TariffComparison />
          
          {/* CTA Section */}
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFDD2D]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFDD2D]/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-white mb-4">Готовы стать Premium клиентом?</h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Начните пользоваться всеми преимуществами уже сегодня
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/">
                  <button className="px-8 py-4 bg-[#FFDD2D] hover:bg-[#FCD34D] text-black rounded-xl transition-all text-lg">
                    Оформить Premium
                  </button>
                </Link>
                <Link href="/">
                  <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all text-lg border border-white/20">
                    Узнать больше
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
