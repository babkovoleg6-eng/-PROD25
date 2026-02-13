import { useState, useEffect } from "react";
import { Trophy, Award, Crown, Gem, Lock, Check } from "lucide-react";
import { Card } from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useAuth } from "./AuthProvider";

interface MoneyBarProps {
  selectedTier: string;
  onTierSelect: (tierName: string) => void;
}

export function MoneyBar({ selectedTier, onTierSelect }: MoneyBarProps) {
  const { user, isAuthenticated } = useAuth();
  // Use user's balance if authenticated, otherwise use demo balance
  const currentBalance = isAuthenticated && user ? user.balance : 4000000; // 4 million - Silver tier
  
  // State for countdown timer
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  
  // Calculate time remaining until next balance update (30 days)
  useEffect(() => {
    if (!isAuthenticated || !user) return;
    
    const updateTimer = () => {
      const lastUpdate = new Date(user.lastBalanceUpdate);
      const nextUpdate = new Date(lastUpdate.getTime() + 30 * 24 * 60 * 60 * 1000); // +30 дней
      const now = new Date();
      
      const diff = nextUpdate.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeRemaining("Обновление доступно");
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining(`${days} дн. ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, [user, isAuthenticated]);
  
  const tiers = [
    {
      name: "Bronze",
      icon: Trophy,
      min: 0,
      max: 3000000,
      color: "#CD7F32",
      cardGradient: "from-[#4A3428] via-[#5C4033] to-[#3D2817]",
      objectGradient: "from-[#CD7F32] via-[#E8A87C] to-[#CD7F32]",
      glowColor: "rgba(205, 127, 50, 0.2)"
    },
    {
      name: "Silver",
      icon: Award,
      min: 3000000,
      max: 5000000,
      color: "#C0C0C0",
      cardGradient: "from-[#3A3A3A] via-[#4A4A4A] to-[#2A2A2A]",
      objectGradient: "from-[#C0C0C0] via-[#E8E8E8] to-[#C0C0C0]",
      glowColor: "rgba(192, 192, 192, 0.2)"
    },
    {
      name: "Gold",
      icon: Crown,
      min: 5000000,
      max: 10000000,
      color: "#FFD700",
      cardGradient: "from-[#4A4230] via-[#5C542A] to-[#3A3420]",
      objectGradient: "from-[#FFD700] via-[#FFF4A3] to-[#FFD700]",
      glowColor: "rgba(255, 215, 0, 0.2)"
    },
    {
      name: "Diamond",
      icon: Gem,
      min: 10000000,
      max: Infinity,
      color: "#3B82F6",
      cardGradient: "from-[#2A3A4A] via-[#3A4A5A] to-[#1A2A3A]",
      objectGradient: "from-[#3B82F6] via-[#93C5FD] to-[#60A5FA]",
      glowColor: "rgba(59, 130, 246, 0.2)"
    }
  ];
  
  // Determine current tier based on balance
  const currentTierIndex = tiers.findIndex(
    tier => currentBalance >= tier.min && currentBalance < tier.max
  );
  const currentTier = tiers[currentTierIndex] || tiers[tiers.length - 1];
  const nextTier = tiers[currentTierIndex + 1];
  
  // Calculate progress within current tier
  const tierProgress = nextTier 
    ? ((currentBalance - currentTier.min) / (nextTier.min - currentTier.min)) * 100
    : 100;
  
  const remaining = nextTier ? nextTier.min - currentBalance : 0;
  
  // Calculate how much money needed for a specific tier
  const getMoneyNeeded = (tier: typeof tiers[0]) => {
    if (currentBalance >= tier.min) {
      return 0;
    }
    return tier.min - currentBalance;
  };
  
  return (
    <Card className="border-white/10 p-6 lg:p-10 bg-gradient-to-br from-[#1A1A1A] via-[#252525] to-[#1A1A1A] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFDD2D]/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        {isAuthenticated && (
          <>
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="text-white">Ваш статус</h2>
                  <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border-2 bg-white/5 backdrop-blur-sm" style={{ borderColor: currentTier.color }}>
                    <div className="p-1.5 rounded-full" style={{ backgroundColor: `${currentTier.color}20` }}>
                      <currentTier.icon className="w-5 h-5" style={{ color: currentTier.color, strokeWidth: 2.5 }} />
                    </div>
                    <span className="text-white">{currentTier.name}</span>
                  </div>
                  <span className="text-white/60 text-sm">до 31 декабря 2025</span>
                </div>
                {nextTier ? (
                  <p className="text-white/60">
                    До уровня <span className="text-white">{nextTier.name}</span> осталось{" "}
                    <span className="text-white">{remaining.toLocaleString('ru-RU')} ₽</span>
                  </p>
                ) : (
                  <p className="text-white/60">
                    Вы достигли максимального уровня!
                  </p>
                )}
              </div>
              
              <div className="text-left lg:text-right">
                <p className="text-white/60 text-sm mb-1">Текущий баланс</p>
                <p className="text-white text-3xl lg:text-4xl font-normal">{currentBalance.toLocaleString('ru-RU')} ₽</p>
              </div>
            </div>
            
            {/* Progress Bar with Tiers */}
            <div className="space-y-4 mb-8">
          <div className="grid grid-cols-4 gap-2">
            {tiers.map((tier, index) => {
              const isCompleted = currentBalance >= tier.min && (tier.max === Infinity || currentBalance >= tier.max);
              const isActive = currentBalance >= tier.min && currentBalance < tier.max;
              const isLocked = currentBalance < tier.min;
              
              return (
                <div
                  key={tier.name}
                  className="relative h-3 rounded-full overflow-hidden"
                  style={{
                    background: isLocked 
                      ? `${tier.color}30` // Semi-transparent tier color for locked sections
                      : `linear-gradient(to right, ${tier.color}, ${tier.color}dd)` // Full tier color for unlocked
                  }}
                >
                  {isActive && (
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-white/40 to-transparent"
                      style={{ width: `${100 - tierProgress}%`, right: 0, left: 'auto' }}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>0 ₽</span>
            <span>3 млн ₽</span>
            <span>5 млн ₽</span>
            <span>10 млн ₽</span>
            <span>∞</span>
          </div>
        </div>
          </>
        )}
        
        {/* Login button for non-authenticated users */}
        {!isAuthenticated && (
          <div className="text-center mb-8">
            <button
              onClick={() => window.location.href = '/login'}
              className="text-[#FFDD2D] hover:text-[#FCD34D] transition-colors"
            >
              Войти, чтобы увидеть свой баланс →
            </button>
          </div>
        )}
        
        {/* Tier Cards with 3D Metallic Objects */}
        <TooltipProvider>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((tier, index) => {
              const isCompleted = currentBalance >= tier.min && (tier.max === Infinity || currentBalance >= tier.max);
              const isActive = currentBalance >= tier.min && currentBalance < tier.max;
              const isLocked = currentBalance < tier.min;
              const isSelected = selectedTier === tier.name;
              const moneyNeeded = getMoneyNeeded(tier);
              
              const cardButton = (
                <button
                      onClick={() => {
                        onTierSelect(tier.name);
                        // Scroll to benefits section
                        const benefitsSection = document.getElementById('tier-benefits');
                        if (benefitsSection) {
                          benefitsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`bg-gradient-to-br ${tier.cardGradient} rounded-2xl overflow-hidden transition-all text-left w-full h-full border-2 ${
                        isSelected 
                          ? 'ring-4 shadow-2xl' 
                          : isActive 
                          ? 'border-white/30 shadow-xl'
                          : 'border-white/10 hover:shadow-xl'
                      }`}
                      style={{
                        ringColor: isSelected ? tier.color : undefined,
                        boxShadow: isActive || isSelected ? `0 10px 40px ${tier.glowColor}, 0 0 60px ${tier.glowColor}` : undefined
                      }}
                    >

                      
                      {/* 3D Metallic Object Section */}
                      <div className="relative h-36 bg-gradient-to-br from-black/20 to-black/40 flex items-center justify-center overflow-hidden">
                        {/* Pedestal */}
                        <div 
                          className="absolute bottom-0 w-24 h-6 bg-gradient-to-b from-[#2A2A2A] to-[#1A1A1A] rounded-t-lg" 
                          style={{
                            boxShadow: '0 -4px 20px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)'
                          }}
                        />
                        
                        {/* 3D Metallic Object */}
                        <div 
                          className="w-20 h-20 rounded-2xl relative mb-3 transform -rotate-12"
                          style={{
                            background: `linear-gradient(135deg, ${tier.objectGradient.split(' ').join(', ')})`,
                            boxShadow: `
                              0 15px 45px rgba(0,0,0,0.5),
                              inset -4px -4px 12px rgba(0,0,0,0.3),
                              inset 4px 4px 12px rgba(255,255,255,0.3),
                              0 0 30px ${tier.glowColor}
                            `
                          }}
                        >
                          {/* Shine effect */}
                          <div 
                            className="absolute inset-0 rounded-2xl"
                            style={{
                              background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(255,255,255,0.2) 100%)'
                            }}
                          />
                          
                          {/* Diamond facets for Diamond tier */}
                          {tier.name === "Diamond" && (
                            <>
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-t-[56px] border-t-white/20" />
                              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[56px] border-b-white/10" />
                            </>
                          )}
                        </div>
                        
                        {/* Reflection/glow under object */}
                        <div 
                          className="absolute bottom-6 w-24 h-3 rounded-full blur-lg opacity-50"
                          style={{
                            background: `radial-gradient(circle, ${tier.glowColor} 0%, transparent 70%)`
                          }}
                        />
                        

                      </div>
                      
                      {/* Card Content */}
                      <div className="p-4 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-white">
                            {tier.name}
                          </h4>
                          {/* Status Badges */}
                          {isAuthenticated && isActive && (
                            <span className="text-xs px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[#1A1A1A] border border-white/40">
                              Текущий
                            </span>
                          )}
                          {isSelected && !isActive && (
                            <span className="text-xs px-2 py-1 rounded-full text-white backdrop-blur-sm" style={{ backgroundColor: tier.color }}>
                              Выбран
                            </span>
                          )}
                        </div>
                        
                        <p className="text-white/60 text-sm mb-3">
                          {tier.min === 0 ? 'от 0 ₽' : `При балансе от ${(tier.min / 1000000)} млн ₽`}
                        </p>
                        
                        {/* Progress bar for active tier */}
                        {isAuthenticated && isActive && nextTier && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <div className="flex items-center justify-between text-xs mb-2">
                              <span className="text-white/60">До {nextTier.name}</span>
                              <span className="text-white">{tierProgress.toFixed(0)}%</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full transition-all"
                                style={{ 
                                  width: `${tierProgress}%`,
                                  background: `linear-gradient(to right, ${tier.color}, ${tier.color}dd)`
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        {/* Completed checkmark */}
                        {isAuthenticated && isCompleted && !isActive && (
                          <div className="flex items-center gap-2 mt-2 text-green-400 text-sm">
                            <Check className="w-4 h-4" />
                            <span>Уровень достигнут</span>
                          </div>
                        )}
                        
                        {/* Premium button for non-authenticated users on Bronze tier */}
                        {!isAuthenticated && tier.name === "Bronze" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = '/premium';
                            }}
                            className="w-full mt-3 px-4 py-2 bg-[#FFDD2D] hover:bg-[#FCD34D] text-black rounded-lg transition-colors"
                          >
                            Оформить премиум
                          </button>
                        )}
                      </div>
                    </button>
              );
              
              return isAuthenticated ? (
                <Tooltip key={tier.name}>
                  <TooltipTrigger asChild>
                    <div className="h-full">
                      {cardButton}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent 
                    className="border-2 p-4 bg-[#1A1A1A] text-white"
                    style={{ 
                      borderColor: tier.color
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <tier.icon className="w-5 h-5" style={{ color: tier.color }} />
                      <p className="text-white">
                        {tier.name}
                      </p>
                    </div>
                    {moneyNeeded > 0 ? (
                      <p className="text-sm text-white/60">
                        Пополните счёт на{" "}
                        <span className="text-white">
                          {moneyNeeded.toLocaleString('ru-RU')} ₽
                        </span>
                      </p>
                    ) : (
                      <p className="text-sm text-green-400">
                        ✓ Уровень достигнут
                      </p>
                    )}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div key={tier.name} className="h-full">
                  {cardButton}
                </div>
              );
            })}
          </div>
        </TooltipProvider>
      </div>
    </Card>
  );
}
