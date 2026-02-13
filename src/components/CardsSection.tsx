import { CreditCard, MoreVertical, Plus, Lock } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export function CardsSection() {
  return (
    <Card className="border-gray-200 p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[#1A1A1A]">Мои карты</h3>
        <Button variant="ghost" size="sm" className="text-[#1A1A1A] hover:bg-gray-100 gap-1">
          <Plus className="w-4 h-4" />
          Новая карта
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Tinkoff Black Card */}
        <div className="relative h-56 rounded-3xl bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A] p-6 overflow-hidden group cursor-pointer">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFDD2D]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-32 bg-[#FFDD2D]/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect width="20" height="20" rx="4" fill="#FFDD2D"/>
                    <path d="M6 6H14V7.5H11.5V14H10V7.5H8.5V14H7V7.5H6V6Z" fill="#000000"/>
                  </svg>
                  <span className="text-white/60 text-xs">Tinkoff Black</span>
                </div>
                <p className="text-white text-sm">Premium</p>
              </div>
              <Button variant="ghost" size="icon" className="text-white/40 hover:text-white hover:bg-white/10 h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            
            <div>
              <div className="mb-6">
                <p className="text-white/40 text-xs mb-2">Номер карты</p>
                <p className="text-white tracking-[0.15em]">•••• •••• •••• 9012</p>
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/40 text-xs mb-1">Баланс</p>
                  <p className="text-white text-lg">1 245 320 ₽</p>
                </div>
                <div className="flex items-center gap-0.5">
                  <div className="w-7 h-7 bg-[#FFDD2D]/80 rounded-full"></div>
                  <div className="w-7 h-7 bg-[#FF6B2C]/80 rounded-full -ml-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tinkoff Premium Card */}
        <div className="relative h-56 rounded-3xl bg-gradient-to-br from-[#FFDD2D] via-[#FEE550] to-[#FFDD2D] p-6 overflow-hidden group cursor-pointer">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-32 bg-black/5 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect width="20" height="20" rx="4" fill="#000000"/>
                    <path d="M6 6H14V7.5H11.5V14H10V7.5H8.5V14H7V7.5H6V6Z" fill="#FFDD2D"/>
                  </svg>
                  <span className="text-black/60 text-xs">Tinkoff Premium</span>
                </div>
                <p className="text-black text-sm">Credit</p>
              </div>
              <Button variant="ghost" size="icon" className="text-black/40 hover:text-black hover:bg-black/10 h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            
            <div>
              <div className="mb-6">
                <p className="text-black/40 text-xs mb-2">Номер карты</p>
                <p className="text-black tracking-[0.15em]">•••• •••• •••• 4521</p>
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-black/60 text-xs mb-1">Доступно</p>
                  <p className="text-black text-lg">850 000 ₽</p>
                </div>
                <div className="px-3 py-1 bg-black/10 rounded-full">
                  <span className="text-black text-xs">Кредитная</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Add Card */}
        <div className="h-56 rounded-3xl border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center hover:border-[#FFDD2D] hover:bg-[#FFFBEB] transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-[#FFDD2D] transition-all">
            <Plus className="w-6 h-6 text-[#6B7280] group-hover:text-black" />
          </div>
          <p className="text-[#1A1A1A] mb-1">Выпустить карту</p>
          <p className="text-[#6B7280] text-sm text-center">Дебетовая или кредитная</p>
        </div>
      </div>
    </Card>
  );
}
