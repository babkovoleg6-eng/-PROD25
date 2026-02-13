import { TrendingUp, Eye, EyeOff, ArrowUpRight } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";

export function AccountOverview() {
  const [showBalance, setShowBalance] = useState(true);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Main Balance Card */}
      <Card className="lg:col-span-8 border-gray-200 p-8 bg-white">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <p className="text-[#6B7280]">Все счета</p>
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
              >
                {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {showBalance ? (
              <h2 className="text-5xl text-[#1A1A1A] mb-4">2 847 650 ₽</h2>
            ) : (
              <h2 className="text-5xl text-[#1A1A1A] mb-4">• • • • • •</h2>
            )}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>+12.5%</span>
              </div>
              <span className="text-[#6B7280]">за месяц</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-[#F9FAFB] rounded-2xl border border-gray-100 hover:border-[#FFDD2D] transition-all cursor-pointer group">
            <p className="text-[#6B7280] text-sm mb-2">Дебетовая карта</p>
            <p className="text-[#1A1A1A] text-xl mb-1">1 245 320 ₽</p>
            <p className="text-xs text-[#6B7280]">•• 9012</p>
          </div>
          <div className="p-5 bg-[#F9FAFB] rounded-2xl border border-gray-100 hover:border-[#FFDD2D] transition-all cursor-pointer group">
            <p className="text-[#6B7280] text-sm mb-2">Накопительный</p>
            <p className="text-[#1A1A1A] text-xl mb-1">1 502 330 ₽</p>
            <p className="text-xs text-green-600">+6% годовых</p>
          </div>
          <div className="p-5 bg-[#F9FAFB] rounded-2xl border border-gray-100 hover:border-[#FFDD2D] transition-all cursor-pointer group">
            <p className="text-[#6B7280] text-sm mb-2">Инвестиции</p>
            <p className="text-[#1A1A1A] text-xl mb-1">100 000 ₽</p>
            <p className="text-xs text-green-600">+18.2%</p>
          </div>
        </div>
      </Card>
      
      {/* Quick Stats */}
      <Card className="lg:col-span-4 border-gray-200 p-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[#1A1A1A]">Октябрь 2025</h3>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#6B7280] text-sm">Доходы</span>
              <ArrowUpRight className="w-4 h-4 text-green-600 rotate-180" />
            </div>
            <p className="text-green-600 text-xl">+425 000 ₽</p>
          </div>
          
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#6B7280] text-sm">Расходы</span>
              <ArrowUpRight className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-red-600 text-xl">−187 450 ₽</p>
          </div>
          
          <div className="p-4 bg-[#FFFBEB] rounded-xl border border-[#FEF3C7]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#6B7280] text-sm">Кешбэк</span>
              <span className="text-xs px-2 py-0.5 bg-[#FFDD2D] text-black rounded-full">30%</span>
            </div>
            <p className="text-[#1A1A1A] text-xl">+5 620 ₽</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
