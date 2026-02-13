import { Bell, ChevronDown, Menu, X, CreditCard, ArrowRightLeft, Wallet, PiggyBank, TrendingUp, MoreHorizontal, Gift, Sparkles, User, LogIn, Eye, EyeOff, UserPlus, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { useAuth } from "./AuthProvider";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./ui/sonner";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useNavigation } from "../hooks/use-navigation";

export function PremiumHeader() {
  const { navigate } = useNavigation();
  const { user, isAuthenticated, login, signup, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Состояния для модальных окон
  const [paymentsOpen, setPaymentsOpen] = useState(false);
  const [transfersOpen, setTransfersOpen] = useState(false);
  const [cardsOpen, setCardsOpen] = useState(false);
  const [depositsOpen, setDepositsOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [investmentsOpen, setInvestmentsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [premiumOpen, setPremiumOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [authChoiceOpen, setAuthChoiceOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  // Состояния для форм авторизации
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  
  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    birthDate: "",
  });
  
  // Обработчик входа
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingLogin(true);
    
    try {
      const success = await login(loginFormData.email, loginFormData.password);
      if (success) {
        toast.success("Добро пожаловать!");
        setLoginOpen(false);
        setLoginFormData({ email: "", password: "" });
      } else {
        toast.error("Неверный email или пароль");
      }
    } catch (error) {
      toast.error("Произошла ошибка. Попробуйте снова.");
    } finally {
      setLoadingLogin(false);
    }
  };
  
  // Обработчик регистрации
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingRegister(true);
    
    try {
      if (!registerFormData.name) {
        toast.error("Пожалуйста, введите ваше имя");
        setLoadingRegister(false);
        return;
      }
      
      if (!registerFormData.phone) {
        toast.error("Пожалуйста, введите номер телефона");
        setLoadingRegister(false);
        return;
      }
      
      if (!registerFormData.birthDate) {
        toast.error("Пожалуйста, укажите дату рождения");
        setLoadingRegister(false);
        return;
      }
      
      if (registerFormData.password !== registerFormData.confirmPassword) {
        toast.error("Пароли не совпадают");
        setLoadingRegister(false);
        return;
      }
      
      if (registerFormData.password.length < 6) {
        toast.error("Пароль должен содержать минимум 6 символов");
        setLoadingRegister(false);
        return;
      }
      
      const success = await signup(registerFormData.email, registerFormData.password, registerFormData.name);
      if (success) {
        toast.success("Регистрация успешна!");
        setRegisterOpen(false);
        setRegisterFormData({ email: "", password: "", confirmPassword: "", name: "", phone: "", birthDate: "" });
      } else {
        toast.error("Пользователь с таким email уже существует");
      }
    } catch (error) {
      toast.error("Произошла ошибка. Попробуйте снова.");
    } finally {
      setLoadingRegister(false);
    }
  };
  
  return (
    <header className="bg-[#1A1A1A] border-b border-white/10 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
<div className="flex items-center gap-2">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L4 6V11C4 16 7.5 20.5 12 22C16.5 20.5 20 16 20 11V6L12 2Z" fill="#FFDD2D" stroke="#FFDD2D" strokeWidth="1"/>
                  <text x="12" y="16" textAnchor="middle" fill="#000" fontSize="12" fontWeight="bold" fontFamily="system-ui">Т</text>
                </svg>
                <span className="text-white" style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  textShadow: '0 1px 0 rgba(255,255,255,0.4), 0 2px 3px rgba(0,0,0,0.3), 0 0 20px rgba(255,221,45,0.3)',
                  letterSpacing: '0.02em'
                }}>Т‑Банк</span>
              </div>
            </button>
            
            <nav className="hidden lg:flex items-center gap-6">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white hover:text-white/60 transition-colors">Главная</button>
              <button onClick={() => setPaymentsOpen(true)} className="flex items-center gap-1 text-white hover:text-white/60 transition-colors">
                Платежи
                <ChevronDown className="w-4 h-4" />
              </button>
              <button onClick={() => setTransfersOpen(true)} className="flex items-center gap-1 text-white hover:text-white/60 transition-colors">
                Переводы
                <ChevronDown className="w-4 h-4" />
              </button>
              <button onClick={() => setCardsOpen(true)} className="text-white hover:text-white/60 transition-colors">Карты</button>
              <button onClick={() => setDepositsOpen(true)} className="text-white hover:text-white/60 transition-colors">Вклады</button>
              <button onClick={() => setCreditsOpen(true)} className="text-white hover:text-white/60 transition-colors">Кредиты</button>
              <button onClick={() => setInvestmentsOpen(true)} className="text-white hover:text-white/60 transition-colors">Инвестиции</button>
              <button onClick={() => setMoreOpen(true)} className="flex items-center gap-1 text-white hover:text-white/60 transition-colors">
                Ещё
                <ChevronDown className="w-4 h-4" />
              </button>
            </nav>
          </div>
          
          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden lg:flex text-white/60 hover:text-white hover:bg-white/10"
              onClick={() => setNotificationsOpen(true)}
            >
              <Bell className="w-5 h-5" />
            </Button>
            
            {isAuthenticated ? (
              <Popover open={userMenuOpen} onOpenChange={setUserMenuOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hidden lg:flex text-white hover:bg-white/10 gap-2"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-[#FFDD2D] text-black">
                        {user?.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span>{user?.name.split(' ')[0]}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-48 bg-[#1A1A1A] border-[#FFDD2D]/30 p-2" 
                  align="end"
                  sideOffset={5}
                >
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                      toast.success("Вы вышли из аккаунта");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Выйти</span>
                  </button>
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <Button 
                  variant="ghost"
                  className="hidden lg:flex text-white hover:bg-white/10"
                  onClick={() => setAuthChoiceOpen(true)}
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Войти
                </Button>
                <Button 
                  className="hidden lg:flex bg-[#FFDD2D] hover:bg-[#FCD34D] text-black"
                  onClick={() => setPremiumOpen(true)}
                >
                  Оформить Premium
                </Button>
              </>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="right" className="bg-[#1A1A1A] border-white/10 w-[80%] sm:w-[350px]">
          <SheetHeader className="border-b border-white/10 pb-4">
            <SheetTitle className="text-white">
              Меню
            </SheetTitle>
            <SheetDescription className="text-white/60">
              Навигация по сервисам
            </SheetDescription>
          </SheetHeader>
          
          <nav className="flex flex-col gap-3 pt-6">
            <button 
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }} 
              className="text-white py-3 px-4 hover:bg-white/10 rounded-lg transition-colors text-left"
            >
              Главная
            </button>
            <button 
              onClick={() => { setPaymentsOpen(true); setMobileMenuOpen(false); }} 
              className="text-white py-3 px-4 hover:bg-white/10 rounded-lg transition-colors text-left"
            >
              Платежи
            </button>
            <button 
              onClick={() => { setTransfersOpen(true); setMobileMenuOpen(false); }} 
              className="text-white py-3 px-4 hover:bg-white/10 rounded-lg transition-colors text-left"
            >
              Переводы
            </button>
            <button 
              onClick={() => { setCardsOpen(true); setMobileMenuOpen(false); }} 
              className="text-white py-3 px-4 hover:bg-white/10 rounded-lg transition-colors text-left"
            >
              Карты
            </button>
            <button 
              onClick={() => { setDepositsOpen(true); setMobileMenuOpen(false); }} 
              className="text-white py-3 px-4 hover:bg-white/10 rounded-lg transition-colors text-left"
            >
              Вклады
            </button>
            <button 
              onClick={() => { setCreditsOpen(true); setMobileMenuOpen(false); }} 
              className="text-white py-3 px-4 hover:bg-white/10 rounded-lg transition-colors text-left"
            >
              Кредиты
            </button>
            <button 
              onClick={() => { setInvestmentsOpen(true); setMobileMenuOpen(false); }} 
              className="text-white py-3 px-4 hover:bg-white/10 rounded-lg transition-colors text-left"
            >
              Инвестиции
            </button>
            <button 
              onClick={() => { setMoreOpen(true); setMobileMenuOpen(false); }} 
              className="text-white py-3 px-4 hover:bg-white/10 rounded-lg transition-colors text-left"
            >
              Ещё
            </button>
            
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              {isAuthenticated ? (
                <Button 
                  className="bg-[#FFDD2D] hover:bg-[#FCD34D] text-black"
                  onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}
                >
                  <User className="w-5 h-5 mr-2" />
                  Профиль
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline"
                    className="border-white/10 text-white hover:bg-white/10"
                    onClick={() => { setAuthChoiceOpen(true); setMobileMenuOpen(false); }}
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Войти
                  </Button>
                  <Button 
                    className="bg-[#FFDD2D] hover:bg-[#FCD34D] text-black"
                    onClick={() => { setPremiumOpen(true); setMobileMenuOpen(false); }}
                  >
                    Оформить Premium
                  </Button>
                </>
              )}
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Модальные окна */}
      
      {/* Платежи */}
      <Dialog open={paymentsOpen} onOpenChange={setPaymentsOpen}>
        <DialogContent className="bg-[#1A1A1A] border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#FFDD2D]/20 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-[#FFDD2D]" />
              </div>
              Платежи
            </DialogTitle>
            <DialogDescription className="text-white/60 text-base pt-4">
              Оплачивайте любые услуги быстро и безопасно
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer">
                <h4 className="text-white mb-2">Мобильная связь</h4>
                <p className="text-white/60 text-sm">Пополните баланс телефона</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer">
                <h4 className="text-white mb-2">Коммунальные услуги</h4>
                <p className="text-white/60 text-sm">ЖКХ, интернет, ТВ</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer">
                <h4 className="text-white mb-2">Штрафы ГИБДД</h4>
                <p className="text-white/60 text-sm">Проверка и оплата штрафов</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer">
                <h4 className="text-white mb-2">Госуслуги</h4>
                <p className="text-white/60 text-sm">Налоги, пошлины</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#FFDD2D]/20 to-transparent rounded-xl p-4 border border-[#FFDD2D]/30">
              <p className="text-white/80 text-sm">
                💡 С Premium вы получаете <span className="text-[#FFDD2D]">кешбэк до 30%</span> от платежей
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Переводы */}
      <Dialog open={transfersOpen} onOpenChange={setTransfersOpen}>
        <DialogContent className="bg-[#1A1A1A] border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#FFDD2D]/20 flex items-center justify-center">
                <ArrowRightLeft className="w-6 h-6 text-[#FFDD2D]" />
              </div>
              Переводы
            </DialogTitle>
            <DialogDescription className="text-white/60 text-base pt-4">
              Мгновенные переводы без комиссии
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer">
                <h4 className="text-white mb-2">По номеру телефона</h4>
                <p className="text-white/60 text-sm">Мгновенный перевод</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer">
                <h4 className="text-white mb-2">По номеру карты</h4>
                <p className="text-white/60 text-sm">В любой банк</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer">
                <h4 className="text-white mb-2">Между своими счетами</h4>
                <p className="text-white/60 text-sm">Без комиссии</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer">
                <h4 className="text-white mb-2">За границу</h4>
                <p className="text-white/60 text-sm">Международные переводы</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#FFDD2D]/20 to-transparent rounded-xl p-4 border border-[#FFDD2D]/30">
              <p className="text-white/80 text-sm">
                💡 Premium клиенты переводят <span className="text-[#FFDD2D]">без ограничений по сумме</span>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Карты */}
      <Dialog open={cardsOpen} onOpenChange={setCardsOpen}>
        <DialogContent className="bg-[#1A1A1A] border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#FFDD2D]/20 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-[#FFDD2D]" />
              </div>
              Банковские карты
            </DialogTitle>
            <DialogDescription className="text-white/60 text-base pt-4">
              Выберите карту под ваши потребности
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-5 border border-yellow-500/30">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white">Tinkoff Black</h4>
                  <span className="text-[#FFDD2D] text-sm">До 30% кешбэк</span>
                </div>
                <p className="text-white/60 text-sm">Дебетовая карта с кешбэком на всё</p>
              </div>
              <div className="bg-gradient-to-r from-gray-500/20 to-gray-700/20 rounded-xl p-5 border border-gray-500/30">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white">Tinkoff Platinum</h4>
                  <span className="text-[#FFDD2D] text-sm">Premium</span>
                </div>
                <p className="text-white/60 text-sm">Премиальная металлическая карта</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-5 border border-purple-500/30">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white">Tinkoff Drive</h4>
                  <span className="text-[#FFDD2D] text-sm">Кешбэк на АЗС</span>
                </div>
                <p className="text-white/60 text-sm">Специально для автомобилистов</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Вклады */}
      <Dialog open={depositsOpen} onOpenChange={setDepositsOpen}>
        <DialogContent className="bg-[#1A1A1A] border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#FFDD2D]/20 flex items-center justify-center">
                <PiggyBank className="w-6 h-6 text-[#FFDD2D]" />
              </div>
              Вклады и накопления
            </DialogTitle>
            <DialogDescription className="text-white/60 text-base pt-4">
              Надёжное сохранение и приумножение капитала
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-3">
              <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white">Накопительный счёт</h4>
                  <span className="text-[#FFDD2D]">До 18% годовых</span>
                </div>
                <p className="text-white/60 text-sm">Пополняйте и снимайте в любой момент</p>
              </div>
              <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white">Срочный вклад</h4>
                  <span className="text-[#FFDD2D]">До 20% годовых</span>
                </div>
                <p className="text-white/60 text-sm">Фиксированная ставка на весь срок</p>
              </div>
              <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white">Копилка</h4>
                  <span className="text-[#FFDD2D]">Автоматически</span>
                </div>
                <p className="text-white/60 text-sm">Откладывайте с каждой покупки</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#FFDD2D]/20 to-transparent rounded-xl p-4 border border-[#FFDD2D]/30">
              <p className="text-white/80 text-sm">
                🛡️ Все вклады застрахованы государством до 1,4 млн ₽
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Кредиты */}
      <Dialog open={creditsOpen} onOpenChange={setCreditsOpen}>
        <DialogContent className="bg-[#1A1A1A] border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#FFDD2D]/20 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-[#FFDD2D]" />
              </div>
              Кредиты и займы
            </DialogTitle>
            <DialogDescription className="text-white/60 text-base pt-4">
              Выгодные условия кредитования
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer">
                <h4 className="text-white mb-2">Кредитная карта</h4>
                <p className="text-white/60 text-sm mb-2">До 55 дней без %</p>
                <span className="text-[#FFDD2D] text-sm">От 9,9%</span>
              </div>
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer">
                <h4 className="text-white mb-2">Потребительский кредит</h4>
                <p className="text-white/60 text-sm mb-2">До 5 млн ₽</p>
                <span className="text-[#FFDD2D] text-sm">От 6,9%</span>
              </div>
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer">
                <h4 className="text-white mb-2">Автокредит</h4>
                <p className="text-white/60 text-sm mb-2">Новые и б/у авто</p>
                <span className="text-[#FFDD2D] text-sm">От 4,9%</span>
              </div>
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer">
                <h4 className="text-white mb-2">Ипотека</h4>
                <p className="text-white/60 text-sm mb-2">Своё жильё</p>
                <span className="text-[#FFDD2D] text-sm">От 5,9%</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#FFDD2D]/20 to-transparent rounded-xl p-4 border border-[#FFDD2D]/30">
              <p className="text-white/80 text-sm">
                💡 Premium клиенты получают <span className="text-[#FFDD2D]">сниженные ставки</span> по кредитам
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Инвестиции */}
      <Dialog open={investmentsOpen} onOpenChange={setInvestmentsOpen}>
        <DialogContent className="bg-[#1A1A1A] border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#FFDD2D]/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#FFDD2D]" />
              </div>
              Инвестиции
            </DialogTitle>
            <DialogDescription className="text-white/60 text-base pt-4">
              Зарабатывайте на инвестициях
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-5 border border-blue-500/30">
                <h4 className="text-white mb-2">Акции</h4>
                <p className="text-white/60 text-sm">Российские и зарубежные компании</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-5 border border-purple-500/30">
                <h4 className="text-white mb-2">Облигации</h4>
                <p className="text-white/60 text-sm">Стабильный доход с низким риском</p>
              </div>
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-5 border border-green-500/30">
                <h4 className="text-white mb-2">Валюта и золото</h4>
                <p className="text-white/60 text-sm">Защита капитала</p>
              </div>
              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-5 border border-orange-500/30">
                <h4 className="text-white mb-2">Готовые стратегии</h4>
                <p className="text-white/60 text-sm">Инвестируйте автоматически</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#FFDD2D]/20 to-transparent rounded-xl p-4 border border-[#FFDD2D]/30">
              <p className="text-white/80 text-sm">
                📈 Premium клиенты получают <span className="text-[#FFDD2D]">эксклюзивную аналитику</span> и идеи для инвестиций
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Ещё */}
      <Dialog open={moreOpen} onOpenChange={setMoreOpen}>
        <DialogContent className="bg-[#1A1A1A] border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#FFDD2D]/20 flex items-center justify-center">
                <MoreHorizontal className="w-6 h-6 text-[#FFDD2D]" />
              </div>
              Дополнительные сервисы
            </DialogTitle>
            <DialogDescription className="text-white/60 text-base pt-4">
              Больше возможностей для вас
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer">
                <h4 className="text-white mb-2">Страхование</h4>
                <p className="text-white/60 text-sm">КАСКО, ОСАГО, жизнь</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer">
                <h4 className="text-white mb-2">Путешествия</h4>
                <p className="text-white/60 text-sm">Авиа, отели, туры</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer">
                <h4 className="text-white mb-2">Развлечения</h4>
                <p className="text-white/60 text-sm">Кино, концерты</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer">
                <h4 className="text-white mb-2">Образование</h4>
                <p className="text-white/60 text-sm">Курсы, вебинары</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer">
                <h4 className="text-white mb-2">Здоровье</h4>
                <p className="text-white/60 text-sm">Телем��дицина, аптеки</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer">
                <h4 className="text-white mb-2">Безопасность</h4>
                <p className="text-white/60 text-sm">Защита данных</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Premium */}
      <Dialog open={premiumOpen} onOpenChange={setPremiumOpen}>
        <DialogContent className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border-[#FFDD2D]/30 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#FFDD2D] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              Т‑Банк Premium
            </DialogTitle>
            <DialogDescription className="text-white/60 text-base pt-4">
              Эксклюзивные привилегии премиум-обслуживания
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-[#FFDD2D]/20 to-[#FFDD2D]/5 rounded-xl p-4 border border-[#FFDD2D]/30">
                <div className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-[#FFDD2D] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white mb-1">Кешбэк до 30%</h4>
                    <p className="text-white/60 text-sm">На категории по выбору</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-[#FFDD2D]/20 to-[#FFDD2D]/5 rounded-xl p-4 border border-[#FFDD2D]/30">
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-[#FFDD2D] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white mb-1">Металлическая карта</h4>
                    <p className="text-white/60 text-sm">Premium дизайн из металла</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-[#FFDD2D]/20 to-[#FFDD2D]/5 rounded-xl p-4 border border-[#FFDD2D]/30">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-[#FFDD2D] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white mb-1">Повышенные ставки</h4>
                    <p className="text-white/60 text-sm">До 18% на остаток и вклады</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-[#FFDD2D]/20 to-[#FFDD2D]/5 rounded-xl p-4 border border-[#FFDD2D]/30">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#FFDD2D] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white mb-1">VIP-обслуживание</h4>
                    <p className="text-white/60 text-sm">Приоритетная поддержка 24/7</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <Button 
                className="w-full bg-[#FFDD2D] hover:bg-[#FCD34D] text-black"
                onClick={() => {
                  if (!isAuthenticated) {
                    setPremiumOpen(false);
                    setAuthChoiceOpen(true);
                  } else {
                    toast.success("Перенаправление на оформление подписки...");
                  }
                }}
              >
                Оформить за 2999 ₽/месяц
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Уведомления */}
      <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <DialogContent className="bg-[#1A1A1A] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#FFDD2D]/20 flex items-center justify-center">
                <Bell className="w-6 h-6 text-[#FFDD2D]" />
              </div>
              Уведомления
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-4">
            <div className="bg-white/5 rounded-xl p-4 border-l-4 border-[#FFDD2D]">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-white text-sm">Пополнение счёта</h4>
                <span className="text-white/40 text-xs">2 мин назад</span>
              </div>
              <p className="text-white/60 text-sm">+50 000 ₽</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-white text-sm">Покупка</h4>
                <span className="text-white/40 text-xs">1 час назад</span>
              </div>
              <p className="text-white/60 text-sm">-1 250 ₽ в магазине Пятёрочка</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-white text-sm">Начислен кешбэк</h4>
                <span className="text-white/40 text-xs">3 часа назад</span>
              </div>
              <p className="text-white/60 text-sm">+375 ₽</p>
            </div>
            <div className="text-center pt-2">
              <button className="text-[#FFDD2D] hover:text-[#FCD34D] text-sm">
                Показать все уведомления
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Выбор: Вход или Регистрация */}
      <Dialog open={authChoiceOpen} onOpenChange={setAuthChoiceOpen}>
        <DialogContent className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border-[#FFDD2D]/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#FFDD2D] flex items-center justify-center">
                <User className="w-6 h-6 text-black" />
              </div>
              Добро пожаловать
            </DialogTitle>
            <DialogDescription className="text-white/60 text-base pt-4">
              Войдите в аккаунт или создайте новый
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-6">
            <div 
              onClick={() => { 
                setAuthChoiceOpen(false); 
                setLoginOpen(true);
              }}
              className="bg-gradient-to-r from-[#FFDD2D]/20 to-[#FFDD2D]/5 rounded-xl p-6 border border-[#FFDD2D]/30 hover:border-[#FFDD2D]/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#FFDD2D]/20 flex items-center justify-center group-hover:bg-[#FFDD2D]/30 transition-all">
                  <LogIn className="w-7 h-7 text-[#FFDD2D]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white mb-1">Вход в аккаунт</h4>
                  <p className="text-white/60 text-sm">Уже есть аккаунт? Войдите</p>
                </div>
              </div>
            </div>
            
            <div 
              onClick={() => { 
                setAuthChoiceOpen(false); 
                setRegisterOpen(true);
              }}
              className="bg-gradient-to-r from-white/5 to-white/0 rounded-xl p-6 border border-white/10 hover:border-[#FFDD2D]/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#FFDD2D]/20 transition-all">
                  <Sparkles className="w-7 h-7 text-white/60 group-hover:text-[#FFDD2D] transition-all" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white mb-1">Регистрация</h4>
                  <p className="text-white/60 text-sm">Создайте новый аккаунт</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FFDD2D]/10 to-transparent rounded-xl p-4 border border-[#FFDD2D]/20">
              <p className="text-white/70 text-sm">
                💡 Получите доступ к Premium привилегиям и эксклюзивным предложениям
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Модальное окно входа */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="bg-gradient-to-br from-[#1A1A1A] via-[#252525] to-[#1A1A1A] border-[#FFDD2D]/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#FFDD2D] flex items-center justify-center">
                <LogIn className="w-6 h-6 text-black" />
              </div>
              Вход в систему
            </DialogTitle>
            <DialogDescription className="text-white/60 pt-2">
              Управляйте своими финансами
            </DialogDescription>
          </DialogHeader>

          {/* Demo credentials info */}
          <div className="mb-4 p-4 bg-[#FFDD2D]/10 border border-[#FFDD2D]/30 rounded-xl">
            <p className="text-white/80 text-sm mb-2">
              🔑 Демо-аккаунт для входа:
            </p>
            <p className="text-white text-sm">
              Email: <span className="text-[#FFDD2D]">demo@tbank.ru</span>
            </p>
            <p className="text-white text-sm">
              Пароль: <span className="text-[#FFDD2D]">demo123</span>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="login-email" className="text-white">
                Email
              </Label>
              <Input
                id="login-email"
                type="email"
                placeholder="example@tbank.ru"
                value={loginFormData.email}
                onChange={(e) =>
                  setLoginFormData({ ...loginFormData, email: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password" className="text-white">
                Пароль
              </Label>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPasswordLogin ? "text" : "password"}
                  placeholder="••••••••"
                  value={loginFormData.password}
                  onChange={(e) =>
                    setLoginFormData({ ...loginFormData, password: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordLogin(!showPasswordLogin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPasswordLogin ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FFDD2D] hover:bg-[#FCD34D] text-black"
              disabled={loadingLogin}
            >
              {loadingLogin ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  Подождите...
                </div>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Войти
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setLoginOpen(false);
                setRegisterOpen(true);
                setLoginFormData({ email: "", password: "" });
              }}
              className="text-white/60 hover:text-white text-sm transition-colors w-full text-center"
            >
              Нет аккаунта?{" "}
              <span className="text-[#FFDD2D]">Зарегистрироваться</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Модальное окно регистрации */}
      <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
        <DialogContent className="bg-gradient-to-br from-[#1A1A1A] via-[#252525] to-[#1A1A1A] border-[#FFDD2D]/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#FFDD2D] flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-black" />
              </div>
              Создать аккаунт
            </DialogTitle>
            <DialogDescription className="text-white/60 pt-2">
              Присоединяйтесь к Т‑Банк Premium
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleRegister} className="space-y-5 pt-4">
            <div className="space-y-2">
              <Label htmlFor="register-name" className="text-white">
                Имя и фамилия
              </Label>
              <Input
                id="register-name"
                type="text"
                placeholder="Александр Петров"
                value={registerFormData.name}
                onChange={(e) =>
                  setRegisterFormData({ ...registerFormData, name: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="register-phone" className="text-white">
                Номер телефона
              </Label>
              <Input
                id="register-phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={registerFormData.phone}
                onChange={(e) =>
                  setRegisterFormData({ ...registerFormData, phone: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="register-birthDate" className="text-white">
                Дата рождения
              </Label>
              <Input
                id="register-birthDate"
                type="date"
                value={registerFormData.birthDate}
                onChange={(e) =>
                  setRegisterFormData({ ...registerFormData, birthDate: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-email" className="text-white">
                Email
              </Label>
              <Input
                id="register-email"
                type="email"
                placeholder="example@tbank.ru"
                value={registerFormData.email}
                onChange={(e) =>
                  setRegisterFormData({ ...registerFormData, email: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-password" className="text-white">
                Пароль
              </Label>
              <div className="relative">
                <Input
                  id="register-password"
                  type={showPasswordRegister ? "text" : "password"}
                  placeholder="Минимум 6 символов"
                  value={registerFormData.password}
                  onChange={(e) =>
                    setRegisterFormData({ ...registerFormData, password: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordRegister(!showPasswordRegister)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPasswordRegister ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="register-confirmPassword" className="text-white">
                Подтвердите пароль
              </Label>
              <div className="relative">
                <Input
                  id="register-confirmPassword"
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="Повторите пароль"
                  value={registerFormData.confirmPassword}
                  onChange={(e) =>
                    setRegisterFormData({ ...registerFormData, confirmPassword: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPasswordConfirm ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FFDD2D] hover:bg-[#FCD34D] text-black"
              disabled={loadingRegister}
            >
              {loadingRegister ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  Подождите...
                </div>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 mr-2" />
                  Создать аккаунт
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setRegisterOpen(false);
                setLoginOpen(true);
                setRegisterFormData({ email: "", password: "", name: "" });
              }}
              className="text-white/60 hover:text-white text-sm transition-colors w-full text-center"
            >
              Уже есть аккаунт?{" "}
              <span className="text-[#FFDD2D]">Войти</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Toaster position="top-right" />
    </header>
  );
}
