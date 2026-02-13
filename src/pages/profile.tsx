import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthProvider";
import { PremiumHeader } from "../components/PremiumHeader";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { 
  User, 
  Mail, 
  Calendar, 
  Trophy, 
  Award, 
  Crown, 
  Gem, 
  ArrowUpCircle, 
  ArrowDownCircle,
  LogOut,
  Edit,
  CreditCard,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Toaster } from "../components/ui/sonner";
import { useNavigation } from "../hooks/use-navigation";

export default function ProfilePage() {
  const { navigate } = useNavigation();
  const { user, isAuthenticated, logout, updateBalance, transactions, addTransaction } = useAuth();
  const [addMoneyOpen, setAddMoneyOpen] = useState(false);
  const [withdrawMoneyOpen, setWithdrawMoneyOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [amount, setAmount] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/");
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const tierInfo = {
    Bronze: { 
      icon: Trophy, 
      color: "#CD7F32", 
      gradient: "from-[#4A3428] via-[#5C4033] to-[#3D2817]",
      min: 0,
      max: 3000000
    },
    Silver: { 
      icon: Award, 
      color: "#C0C0C0", 
      gradient: "from-[#3A3A3A] via-[#4A4A4A] to-[#2A2A2A]",
      min: 3000000,
      max: 5000000
    },
    Gold: { 
      icon: Crown, 
      color: "#FFD700", 
      gradient: "from-[#4A4230] via-[#5C542A] to-[#3A3420]",
      min: 5000000,
      max: 10000000
    },
    Diamond: { 
      icon: Gem, 
      color: "#3B82F6", 
      gradient: "from-[#2A3A4A] via-[#3A4A5A] to-[#1A2A3A]",
      min: 10000000,
      max: Infinity
    }
  };

  const currentTierInfo = tierInfo[user.tier];
  const TierIcon = currentTierInfo.icon;

  const handleAddMoney = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      toast.error("Введите корректную сумму");
      return;
    }

    addTransaction({
      date: new Date().toISOString(),
      description: "Пополнение счета",
      amount: value,
      category: "Пополнение",
      type: "income"
    });

    toast.success(`Счет пополнен на ${value.toLocaleString('ru-RU')} ₽`);
    setAmount("");
    setAddMoneyOpen(false);
  };

  const handleWithdraw = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      toast.error("Введите корректную сумму");
      return;
    }

    if (value > user.balance) {
      toast.error("Недостаточно средств");
      return;
    }

    addTransaction({
      date: new Date().toISOString(),
      description: "Снятие со счета",
      amount: -value,
      category: "Снятие",
      type: "expense"
    });

    toast.success(`Со счета снято ${value.toLocaleString('ru-RU')} ₽`);
    setAmount("");
    setWithdrawMoneyOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast.success("Вы вышли из системы");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <PremiumHeader />

      <main className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-[1400px]">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-white mb-2">Личный кабинет</h1>
            <p className="text-white/60">
              Управляйте своим счетом и профилем
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-white/60 hover:text-white hover:bg-white/10 lg:self-start"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Выйти
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-white/10 p-6 bg-gradient-to-br from-[#1A1A1A] via-[#252525] to-[#1A1A1A]">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FFDD2D] to-[#FCD34D] flex items-center justify-center mb-4">
                  <span className="text-black text-3xl">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-white mb-1">{user.name}</h3>
                <p className="text-white/60 text-sm">{user.email}</p>
              </div>

              {/* Tier Badge */}
              <div 
                className={`bg-gradient-to-br ${currentTierInfo.gradient} rounded-2xl p-4 mb-6 border-2`}
                style={{ borderColor: currentTierInfo.color }}
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  <TierIcon className="w-6 h-6" style={{ color: currentTierInfo.color }} />
                  <span className="text-white">{user.tier}</span>
                </div>
                <p className="text-white/60 text-sm text-center">
                  Ваш текущий уровень
                </p>
              </div>

              {/* Profile Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-white/60">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-white/60">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm">
                    С {new Date(user.registeredAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              </div>

              {/* Edit Profile Button */}
              <Button
                variant="outline"
                className="w-full border-white/10 text-white hover:bg-white/10"
                onClick={() => setEditProfileOpen(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Редактировать профиль
              </Button>
            </Card>
          </div>

          {/* Balance & Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Balance Card */}
            <Card className="border-white/10 p-6 lg:p-8 bg-gradient-to-br from-[#1A1A1A] via-[#252525] to-[#1A1A1A] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFDD2D]/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
                  <div>
                    <p className="text-white/60 mb-2">Общий баланс</p>
                    <h2 className="text-white text-4xl lg:text-5xl">
                      {user.balance.toLocaleString('ru-RU')} ₽
                    </h2>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => setAddMoneyOpen(true)}
                    >
                      <ArrowUpCircle className="w-5 h-5 mr-2" />
                      Пополнить
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/10 text-white hover:bg-white/10"
                      onClick={() => setWithdrawMoneyOpen(true)}
                    >
                      <ArrowDownCircle className="w-5 h-5 mr-2" />
                      Снять
                    </Button>
                  </div>
                </div>

                {/* Progress to Next Tier */}
                {currentTierInfo.max !== Infinity && (
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/60 text-sm">
                        До следующего уровня
                      </span>
                      <span className="text-white text-sm">
                        {((user.balance - currentTierInfo.min) / (currentTierInfo.max - currentTierInfo.min) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                      <div 
                        className="h-full bg-gradient-to-r from-[#FFDD2D] to-[#FCD34D] transition-all"
                        style={{ 
                          width: `${Math.min(((user.balance - currentTierInfo.min) / (currentTierInfo.max - currentTierInfo.min) * 100), 100)}%`
                        }}
                      ></div>
                    </div>
                    <p className="text-white/60 text-sm">
                      Осталось {(currentTierInfo.max - user.balance).toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Card 
                className="border-white/10 p-6 bg-gradient-to-br from-[#1A1A1A] to-[#252525] hover:border-[#FFDD2D]/30 transition-all cursor-pointer"
                onClick={() => navigate('/premium')}
              >
                <div className="w-12 h-12 rounded-xl bg-[#FFDD2D]/20 flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6 text-[#FFDD2D]" />
                </div>
                <h4 className="text-white mb-2">Premium тарифы</h4>
                <p className="text-white/60 text-sm">
                  Узнайте о привилегиях вашего уровня
                </p>
              </Card>

              <Card 
                className="border-white/10 p-6 bg-gradient-to-br from-[#1A1A1A] to-[#252525] hover:border-[#FFDD2D]/30 transition-all cursor-pointer"
                onClick={() => navigate('/investments')}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-white mb-2">Инвестиции</h4>
                <p className="text-white/60 text-sm">
                  Приумножайте свой капитал
                </p>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="border-white/10 p-6 bg-gradient-to-br from-[#1A1A1A] to-[#252525]">
              <h3 className="text-white mb-6">Последние операции</h3>
              
              <div className="space-y-3">
                {transactions.slice(0, 5).map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "income" 
                          ? "bg-green-500/20" 
                          : "bg-red-500/20"
                      }`}>
                        {transaction.type === "income" ? (
                          <ArrowUpCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <ArrowDownCircle className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-white text-sm">{transaction.description}</p>
                        <p className="text-white/60 text-xs">
                          {new Date(transaction.date).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <span className={`${
                      transaction.type === "income" 
                        ? "text-green-400" 
                        : "text-red-400"
                    }`}>
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                ))}
              </div>

              {transactions.length === 0 && (
                <p className="text-white/60 text-center py-8">
                  Нет транзакций
                </p>
              )}
            </Card>
          </div>
        </div>
      </main>

      {/* Add Money Dialog */}
      <Dialog open={addMoneyOpen} onOpenChange={setAddMoneyOpen}>
        <DialogContent className="bg-[#1A1A1A] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <ArrowUpCircle className="w-6 h-6 text-green-400" />
              </div>
              Пополнить счет
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Введите сумму для пополнения
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-white">Сумма</Label>
              <Input
                id="amount"
                type="number"
                placeholder="10000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[1000, 5000, 10000, 50000, 100000, 500000].map((value) => (
                <Button
                  key={value}
                  variant="outline"
                  className="border-white/10 text-white hover:bg-white/10"
                  onClick={() => setAmount(value.toString())}
                >
                  {(value / 1000).toLocaleString('ru-RU')}k
                </Button>
              ))}
            </div>

            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={handleAddMoney}
            >
              Пополнить счет
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Withdraw Money Dialog */}
      <Dialog open={withdrawMoneyOpen} onOpenChange={setWithdrawMoneyOpen}>
        <DialogContent className="bg-[#1A1A1A] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                <ArrowDownCircle className="w-6 h-6 text-red-400" />
              </div>
              Снять со счета
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Доступно: {user.balance.toLocaleString('ru-RU')} ₽
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="withdraw-amount" className="text-white">Сумма</Label>
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="10000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                max={user.balance}
              />
            </div>

            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={handleWithdraw}
            >
              Снять средства
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
        <DialogContent className="bg-[#1A1A1A] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFDD2D]/20 flex items-center justify-center">
                <User className="w-6 h-6 text-[#FFDD2D]" />
              </div>
              Редактировать профиль
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Эта функция находится в разработке
            </DialogDescription>
          </DialogHeader>
          
          <div className="pt-4">
            <p className="text-white/60 text-center py-8">
              Скоро здесь появится возможность редактировать профиль
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="text-center text-white/60 text-sm">
            © 2025 Т‑Банк. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
