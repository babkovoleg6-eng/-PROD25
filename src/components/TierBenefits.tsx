import { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Eye, EyeOff, LogIn, UserPlus, Wallet, User, Sparkles, Clock } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./ui/sonner";

interface TierBenefitsProps {
  selectedTier: string;
}

// Icon components as inline SVGs
const Trophy = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
);

const Award = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
);

const Crown = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>
);

const Gem = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>
);

const CreditCard = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
);

const Percent = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
);

const Coins = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>
);

const Briefcase = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);

const Headphones = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>
);

const Gift = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>
);

const Shield = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
);

const Plane = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
);

const Sparkles = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
);

const Users = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

export function TierBenefits({ selectedTier }: TierBenefitsProps) {
  const { user, isAuthenticated, login, signup, updateBalance } = useAuth();
  
  // Состояния для модальных окон
  const [authChoiceOpen, setAuthChoiceOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [addMoneyOpen, setAddMoneyOpen] = useState(false);
  const [benefitDetailOpen, setBenefitDetailOpen] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<any>(null);
  
  // Состояния для форм
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [amount, setAmount] = useState("");
  
  // Состояние для таймера
  const [timeUntilReset, setTimeUntilReset] = useState("");
  
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
  
  // Обработчик пополнения счета
  const handleAddMoney = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error("Введите корректную сумму");
      return;
    }
    
    updateBalance(amountNum);
    toast.success(`Счёт пополнен на ${amountNum.toLocaleString('ru-RU')} ₽`);
    setAddMoneyOpen(false);
    setAmount("");
  };
  
  // Обработчик нажатия на кнопку
  const handleButtonClick = () => {
    if (!isAuthenticated) {
      setAuthChoiceOpen(true);
    } else {
      setAddMoneyOpen(true);
    }
  };
  
  // Функция для вычисления времени до следующего месяца
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const diff = nextMonth.getTime() - now.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeUntilReset(`${days}д ${hours}ч ${minutes}м ${seconds}с`);
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const tierData = {
    Bronze: {
      name: "Bronze",
      icon: Trophy,
      color: "#CD7F32",
      cardGradient: "from-[#4A3428] via-[#5C4033] to-[#3D2817]",
      objectGradient: "from-[#CD7F32] via-[#E8A87C] to-[#CD7F32]",
      glowColor: "rgba(205, 127, 50, 0.2)",
      slogan: "Начало премиального пути",
      benefits: [
        {
          icon: Plane,
          title: "Бизнес-залы в аэропортах",
          description: "2 прохода в бизнес-залы или компенсация трат в ресторанах аэропорта вылета — максимум 1 000 ₽ за один посадочный талон",
          detailedDescription: "Наслаждайтесь комфортом перед полётом в специальных бизнес-залах более чем в 1000 аэропортах по всему миру. Вы получаете 2 прохода в месяц с доступом к напиткам, закускам, Wi-Fi и зонам отдыха. В качестве альтернативы можно получить компенсацию расходов в ресторанах аэропорта до 1 000 ₽. Услуга доступна при предъявлении посадочного талона и карты Bronze уровня.",
          limit: 2,
          used: 0
        },
        {
          icon: Briefcase,
          title: "Каршеринг",
          description: "1 поездка на каршеринге с компенсацией до 500 ₽",
          detailedDescription: "Получите компенсацию за 1 поездку на каршеринге в месяц до 500 рублей. Услуга доступна для всех популярных каршеринг-сервисов: Яндекс.Драйв, Делимобиль, BelkaCar и других. Просто совершите поездку, оплатите её картой Т‑Банка Bronze, и компенсация автоматически вернётся на ваш счёт в течение 3 рабочих дней.",
          limit: 1,
          used: 0
        },
        {
          icon: Headphones,
          title: "Специальные условия на связь",
          description: "От Т-Мобайла: бесплатные звонки на все российские номера, 1 ГБ интернета в роуминге, скидка 50 % на любой пакет интернета в России",
          detailedDescription: "Эксклюзивные условия от партнёра Т‑Мобайл специально для держателей Bronze карты. Безлимитные звонки на все номера России, 1 ГБ высокоскоростного интернета при нахождении в роуминге (��������олее 100 стран), а также постоянная скидка 50% на любой пакет мобильного интернета в России. Для активации позвоните на горячую линию партнёра и укажите номер вашей премиальной карты.",
          unlimited: true
        },
        {
          icon: Percent,
          title: "Налоговые консультации",
          description: "Скидка 15 % на налоговые консультации в «НДФЛ Гуру»",
          detailedDescription: "Получите профессиональную помощь в налоговых вопросах со скидкой 15% от сервиса «НДФЛ Гуру». Консультанты помогут с оптимизацией налогов, заполнением деклараций, расчётом вычетов и ответят на любые вопросы по налогообложению. Скидка предоставляется при указании промокода BRONZE в момент оформления консультации.",
          unlimited: true
        }
      ]
    },
    Silver: {
      name: "Silver",
      icon: Award,
      color: "#C0C0C0",
      cardGradient: "from-[#3A3A3A] via-[#4A4A4A] to-[#2A2A2A]",
      objectGradient: "from-[#C0C0C0] via-[#E8E8E8] to-[#C0C0C0]",
      glowColor: "rgba(192, 192, 192, 0.2)",
      slogan: "Изысканность и привилегии",
      benefits: [
        {
          icon: Plane,
          title: "Бизнес-залы в аэропортах",
          description: "4 прохода в бизнес-залы или компенсация трат в ресторанах аэропорта вылета — максимум 1 000 ₽ за один посадочный талон",
          detailedDescription: "Расширенный доступ к премиальным бизнес-залам для держателей Silver карты. Вы получаете 4 прохода в месяц с доступом к улучшенным зонам отдыха, напиткам премиум-класса, горячим блюдам и высокоскоростному Wi-Fi. Услуга действует в более чем 1200 аэропортах по всему миру. Также доступна опция компенсации расходов в ресторанах аэропорта до 1 000 ₽ за посадочный талон.",
          limit: 4,
          used: 1
        },
        {
          icon: Briefcase,
          title: "Каршеринг",
          description: "1 поездка на каршеринге с компенсацией до 500 ₽",
          detailedDescription: "Пользуйтесь каршерингом с выгодой — компенсация до 500 рублей за поездку каждый месяц. Поддерживаются все популярные сервисы: Яндекс.Драйв, Делимобиль, BelkaCar, Ситидрайв и другие. Просто совершите поездку и оплатите её картой Silver уровня, средства автоматически вернутся на счёт в течение 3 рабочих дней.",
          limit: 1,
          used: 0
        },
        {
          icon: Headphones,
          title: "Специальные условия на связь",
          description: "От Т-Мобайла: бесплатные звонки на все российские номера, 1 ГБ интернета в роуминге, скидка 50 % на любой пакет интернета в России",
          detailedDescription: "Премиальные условия связи от Т‑Мобайл для Silver клиентов. Безлимитные звонки внутри России, 1 ГБ скоростного интернета в международном роуминге (более 120 стран), постоянная скидка 50% на пакеты мобильного интернета. Активация услуги происходит автоматически при первом использовании карты для оплаты услуг связи.",
          unlimited: true
        },
        {
          icon: Sparkles,
          title: "Инвестиционная аналитика",
          description: "Индивидуальные запросы к инвестиционным аналитикам — 1 раз в 30 дней",
          detailedDescription: "Получите персональную инвестиционную консультацию от профессиональных аналитиков Т‑Банка 1 раз в месяц. Задавайте вопросы о рыночной ситуации, стратегиях инвестирования, анализе конкретных активов. Аналитики подготовят индивидуальный ответ в течение 2 рабочих дней. Запросы принимаются через мобильное приложение в разделе Инвестиции.",
          limit: 1,
          used: 0
        },
        {
          icon: Percent,
          title: "Налоговые консультации",
          description: "Скидка 15 % на налоговые консультации в «НДФЛ Гуру» и кэшбэк 1 000 ₽ за период действия сервиса",
          detailedDescription: "Расширенная программа налоговых консультаций для Silver клиентов. Скидка 15% на все услуги «НДФЛ Гуру» плюс единовременный кэшбэк 1 000 рублей при первом обращении за период действия карты. Консультанты помогут с декларациями, вычетами, оптимизацией налогов. Промокод для активации: SILVER.",
          unlimited: true
        }
      ]
    },
    Gold: {
      name: "Gold",
      icon: Crown,
      color: "#FFD700",
      cardGradient: "from-[#4A4230] via-[#5C542A] to-[#3A3420]",
      objectGradient: "from-[#FFD700] via-[#FFF4A3] to-[#FFD700]",
      glowColor: "rgba(255, 215, 0, 0.2)",
      slogan: "Роскошь без границ",
      benefits: [
        {
          icon: Plane,
          title: "Бизнес-залы в аэропортах",
          description: "6 проходов в бизнес-залы или компенсация трат в ресторанах аэропорта вылета — максимум 2 000 ₽ за один посадочный талон",
          detailedDescription: "VIP-доступ к премиальным бизнес-залам мирового класса. 6 проходов в месяц в более чем 1400 аэропортах, включая эксклюзивные залы первого класса. Наслаждайтесь изысканными блюдами, премиальными напитками, приватными переговорными комнатами, душевыми кабинами и спа-процедурами. Компенсация за обеды в ресторанах аэропорта увеличена до 2 000 ₽ за посадочный талон.",
          limit: 6,
          used: 3
        },
        {
          icon: Users,
          title: "Персональный менеджер",
          description: "Выделенный менеджер для решения любых вопросов",
          detailedDescription: "Ваш персональный менеджер доступен 24/7 для решения любых финансовых вопросов. Помощь с операциями, консультации по продуктам банка, содействие в экстренных ситуациях во время путешествий, приоритетное обслуживание по всем запросам. Свяжитесь с менеджером через мобильное приложение, телефон или email — ответ гарантирован в течение 15 минут.",
          unlimited: true
        },
        {
          icon: Headphones,
          title: "Специальные условия на свя��ь",
          description: "От Т-Мобайла: бесплатные звонки на все российские номера, 1 ГБ интернета в роуминге, 15 ГБ интернета в России + скидка 50 % на пакет интернета",
          detailedDescription: "Премиальный пакет связи от Т‑Мобайл для Gold клиентов. Безлимитные звонки по России, 1 ГБ интернета в международном роуминге, щедрые 15 ГБ высокоскоростного интернета в России ежемесячно, плюс постоянная скидка 50% на дополнительные пакеты. Приоритетная техподдержка и специальные тарифы для деловых поездок. Активация автоматическая.",
          unlimited: true
        },
        {
          icon: Shield,
          title: "Страхование квартиры",
          description: "На сумму до 750 000 ₽ — полис действует, пока вы пользуетесь привилегиями Gold или Diamond",
          detailedDescription: "Комплексное страхование недвижимости на сумму до 750 000 рублей. Покрытие включает: пожар, затопление, кражу, стихийные бедствия, повреждение инженерных систем. Франшиза 0₽, выплаты производятся в течение 10 рабочих дней. Страховка действует на протяжении всего периода использования Gold или Diamond карты. Оформление онлайн за 5 минут в мобильном приложении.",
          unlimited: true
        },
        {
          icon: Briefcase,
          title: "Такси Ultima",
          description: "1 поездка в такси Ultima Яндекс Go стоимостью до 2 500 ₽",
          detailedDescription: "Путешествуйте с комфортом в премиальном классе Ultima от Яндекс Go. Ежемесячно 1 поездка с компенсацией до 2 500 рублей. Ultima — это автомобили премиум-класса (Mercedes, BMW, Audi), профессиональные водители с рейтингом выше 4.9, бутилированная вода, зарядные устройства, возможность выбора музыки и температуры. Бронируйте через приложение Яндекс Go и оплачивайте картой Gold.",
          limit: 1,
          used: 1
        },
        {
          icon: Sparkles,
          title: "Инвестиционная аналитика",
          description: "Индивидуальные запросы к инвестиционным аналитикам — 5 запросов за 30 дней, но не более 2 в день",
          detailedDescription: "Углублённая инвестиционная поддержка от команды профессиональных аналитиков Т‑Банка. До 5 индивидуальных запросов в месяц (максимум 2 в день) на темы рыночного анализа, оценки активов, построения портфеля, управления рисками. Детальные письменные ответы с графиками и рекомендациями предоставляются в течение 1 рабочего дня. Доступ к закрытым аналитическим материалам.",
          limit: 5,
          used: 2
        },
        {
          icon: Percent,
          title: "Налоговые консультации",
          description: "Скидка 15 % на налоговые консультации в «НДФЛ Гуру» и кэшбэк 2 000 ₽ за период действия сервиса",
          detailedDescription: "Премиальная программа налогового консультирования. Скидка 15% на все услуги партнёра «НДФЛ Гуру» плюс кэшбэк 2 000 рублей при первом обращении. Помощь с декларациями 3-НДФЛ, расчёт всех возможных вычетов, оптимизация налогообложения для ИП и самозанятых, консультации по международному налогообложению. Активируйте с промокодом GOLD.",
          unlimited: true
        }
      ]
    },
    Diamond: {
      name: "Diamond",
      icon: Gem,
      color: "#3B82F6",
      cardGradient: "from-[#2A3A4A] via-[#3A4A5A] to-[#1A2A3A]",
      objectGradient: "from-[#3B82F6] via-[#93C5FD] to-[#60A5FA]",
      glowColor: "rgba(59, 130, 246, 0.2)",
      slogan: "Вершина эксклюзивности",
      benefits: [
        {
          icon: Plane,
          title: "Безлимитные бизнес-залы",
          description: "Безлимитное посещение бизнес-залов или компенсация трат в ресторанах аэропорта вылета — максимум 2 000 ₽ за один посадочный талон",
          detailedDescription: "Неограниченный доступ к самым роскошным бизнес-залам и VIP-лаунжам по всему миру. Более 1500 залов, включая эксклюзивные Diamond-только зоны с приватными каютами, спа-салонами, винными погребами и мишленовскими ресторанами. Безлимитные посещения для вас и одного гостя. Компенсация ресторанов аэропорта до 2 000 ₽ за посадочный талон.",
          unlimited: true
        },
        {
          icon: Users,
          title: "Персональный менеджер",
          description: "Выделенный менеджер для решения любых во��росов",
          detailedDescription: "Премиум-уровень персонального обслуживания 24/7/365. Ваш выделенный менеджер — эксперт в wealth management с опытом работы от 10 лет. Помощь с любыми финансовыми операциями, приоритетное решение вопросов, организация экстренной помощи за рубежом, консьерж-услуги. Прямая линия связи, ответ гарантирован в течение 5 минут в любое время суток.",
          unlimited: true
        },
        {
          icon: Headphones,
          title: "Специальные условия на связь",
          description: "От Т-М����айла: бесплатные звонки на все российские номера, 1 ГБ интернета в роуминге, 25 ГБ интернета в России + скидка 50 % на пакет интернета",
          detailedDescription: "Максимальный пакет связи от Т‑Мобайл для Diamond VIP-клиентов. Безлимитные звонки по всей России, 1 ГБ премиум интернета в международном роуминге (более 150 стран), щедрые 25 ГБ сверхскоростного интернета 5G в России, плюс скидка 50% на любые дополнительные пакеты. Приоритетная поддержка, выделенная линия для Diamond клиентов.",
          unlimited: true
        },
        {
          icon: Shield,
          title: "Страхование квартиры",
          description: "На сумму до 1 500 000 ₽ — пока действует уровень Diamond",
          detailedDescription: "Расширенное страхование недвижимости премиум-класса на сумму до 1 500 000 рублей. Полное покрытие: пожар, затопление, кража, стихийные бедствия, повреждения инженерных систем, гражданская ответственность перед соседями. Нулевая франшиза, экспресс-выплаты в течение 5 р��бочих дней. Действует весь период Diamond статуса. Дополнительно: бесплатная оценка имущества и консультации по безопасности."
        },
        {
          icon: Briefcase,
          title: "Такси Ultima",
          description: "2 поездки в такси Ultima Яндекс Go по 2 500 ₽ каждая",
          detailedDescription: "Удвоенная роскошь передвижения в классе Ultima от Яндекс Go. 2 поездки ежемесячно с компенсацией по 2 500 рублей каждая — всего 5 000 ₽. Эксклюзивные автомобили представительского класса (Mercedes S-Class, BMW 7-Series, Audi A8), водители-профессионалы высшей категории, индивидуальные предпочтения (температура, музыка, маршрут), приоритетная подача. Бронирование через приложение.",
          limit: 2,
          used: 0
        },
        {
          icon: Sparkles,
          title: "Инвестиционная аналитика",
          description: "Индивидуальные запросы к инвестиционным аналитикам — 15 запросов за 30 дней, но не более 3 в день",
          detailedDescription: "Максимальный уровень инвестиционной поддержки. До 15 индивидуальных запросов в месяц (до 3 в день) к ведущим аналитикам и стратегам Т‑Банка. Глубокий анализ рынков, оценка сложных инструментов, стратегии хеджирования, макроэкономические прогнозы. Детальные отчёты с рекомендациями в течение 12 часов. Эксклюзивный доступ к закрытым исследованиям и вебинарам для Diamond клиентов.",
          limit: 15,
          used: 8
        },
        {
          icon: CreditCard,
          title: "Анализ портфеля",
          description: "1 запрос на анализ инвестиционного портфеля",
          detailedDescription: "Профессиональный комплексный анализ вашего инвестиционного портфеля от сертифицированных финансовых аналитиков (CFA). Ежемесячно доступен 1 детальный запрос, включающий: оценку рисков, диверсификацию активов, соответствие инвестиционному профилю, рекомендации по ребалансировке, tax optimization. Полный отчёт на 20+ страниц с визуализацией и практическими шагами в течение 3 рабочих дней.",
          limit: 1,
          used: 1
        },
        {
          icon: Gift,
          title: "Налоговые консультации",
          description: "Бесплатные налоговые консультации в сервисе от Т-Банка",
          detailedDescription: "Безлимитные бесплатные налоговые консультации в премиальном сервисе от Т‑Банка. Помощь с любыми налоговыми вопросами: декларации, вычеты, оптимизация для бизнеса, международное налогообложение, налоговое планирование. Консультации от сертифицированных налоговых специалистов с опытом от 7 лет. Ответы в течение 24 часов. Приоритетная поддержка для Diamond клиентов.",
          unlimited: true
        },
        {
          icon: Percent,
          title: "Налоговая декларация",
          description: "Заполнение одной налоговой декларации со скидкой 20 000 ₽",
          detailedDescription: "Профессиональное заполнение налоговой декларации любой сложности с эксклюзивной скидкой 20 000 рублей для Diamond клиентов. Услуга включает: сбор документов, расчёт всех вычетов и льгот, заполнение форм 3-НДФЛ, проверку на ошибки, подачу в налоговую, сопровождение до получения вычета. Гарантия правильности расчётов. Доступно 1 раз за период действия Diamond карты.",
          limit: 1,
          used: 0
        }
      ]
    }
  };
  
  const currentTier = tierData[selectedTier as keyof typeof tierData] || tierData.Bronze;
  
  // Проверка на исчерпанные привилегии
  const hasExhaustedBenefits = currentTier.benefits.some((benefit: any) => 
    benefit.limit && benefit.used >= benefit.limit
  );
  
  // Определяем порядок уровней
  const tierOrder = { Bronze: 0, Silver: 1, Gold: 2, Diamond: 3 };
  
  // Проверяем, имеет ли пользователь доступ к привилегиям выбранного уровня
  // (пользователь имеет доступ к своему уровню и всем уровням ниже)
  const userHasAccessToTier = isAuthenticated && user && user.tier && 
    tierOrder[user.tier as keyof typeof tierOrder] >= tierOrder[selectedTier as keyof typeof tierOrder];
  
  // Показываем счётчики и таймер только если пользователь имеет доступ к этому уровню
  const showUsageInfo = userHasAccessToTier;
  
  return (
    <>
      <div 
        className={`bg-gradient-to-br ${currentTier.cardGradient} rounded-2xl overflow-hidden border-2 border-white/10 relative`}
        style={{
          boxShadow: `0 10px 40px ${currentTier.glowColor}, 0 0 60px ${currentTier.glowColor}`
        }}
      >
        {/* 3D Metallic Object Header Section */}
        <div className="relative bg-gradient-to-br from-black/20 to-black/40 p-8 lg:p-10 border-b border-white/10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* 3D Metallic Object */}
            <div className="relative flex items-center justify-center">
              {/* Pedestal */}
              <div 
                className="absolute bottom-0 w-32 h-8 bg-gradient-to-b from-[#2A2A2A] to-[#1A1A1A] rounded-t-lg" 
                style={{
                  boxShadow: '0 -4px 20px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)'
                }}
              />
              
              {/* 3D Metallic Object */}
              <div 
                className="w-28 h-28 rounded-3xl relative mb-4 transform -rotate-12"
                style={{
                  background: `linear-gradient(135deg, ${currentTier.objectGradient.split(' ').join(', ')})`,
                  boxShadow: `
                    0 20px 60px rgba(0,0,0,0.6),
                    inset -6px -6px 16px rgba(0,0,0,0.3),
                    inset 6px 6px 16px rgba(255,255,255,0.3),
                    0 0 40px ${currentTier.glowColor}
                  `
                }}
              >
                {/* Shine effect */}
                <div 
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(255,255,255,0.2) 100%)'
                  }}
                />
                
                {/* Diamond facets for Diamond tier */}
                {currentTier.name === "Diamond" && (
                  <>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[56px] border-l-transparent border-r-[56px] border-r-transparent border-t-[72px] border-t-white/20" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[56px] border-l-transparent border-r-[56px] border-r-transparent border-b-[72px] border-b-white/10" />
                  </>
                )}
              </div>
              
              {/* Reflection/glow under object */}
              <div 
                className="absolute bottom-8 w-32 h-4 rounded-full blur-xl opacity-60"
                style={{
                  background: `radial-gradient(circle, ${currentTier.glowColor} 0%, transparent 70%)`
                }}
              />
            </div>
            
            {/* Title and Description */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-white mb-3">
                {currentTier.name} - {currentTier.slogan}
              </h3>
              <p className="text-white/60 mb-4">
                {currentTier.benefits.length} эксклюзивных привилегий для вашего комфорта
              </p>
              <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm" style={{ backgroundColor: `${currentTier.color}20`, border: `1px solid ${currentTier.color}40` }}>
                  <currentTier.icon className="w-5 h-5" style={{ color: currentTier.color }} />
                  <span className="text-white">{currentTier.name} статус</span>
                </div>
                {showUsageInfo && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm bg-white/5 border border-white/10">
                    <Clock className="w-4 h-4 text-[#FFDD2D]" />
                    <span className="text-white/80 text-sm">Обновление через:</span>
                    <span className="text-[#FFDD2D] font-mono text-sm">{timeUntilReset}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 lg:p-8">
          
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentTier.benefits.map((benefit, index) => (
              <div 
                key={index}
                onClick={() => {
                  setSelectedBenefit({ ...benefit, tierColor: currentTier.color, tierName: currentTier.name });
                  setBenefitDetailOpen(true);
                }}
                className="p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group backdrop-blur-sm cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ 
                      background: `linear-gradient(135deg, ${currentTier.color}20, ${currentTier.color}40)`
                    }}
                  >
                    <benefit.icon className="w-5 h-5" style={{ color: currentTier.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-white text-sm flex-1">
                        {benefit.title}
                      </h4>
                      {showUsageInfo && benefit.limit && (
                        <div className="flex items-center gap-1 text-xs whitespace-nowrap">
                          <span className="text-[#FFDD2D] font-mono">{benefit.limit - benefit.used}</span>
                          <span className="text-white/40">/</span>
                          <span className="text-white/60">{benefit.limit}</span>
                        </div>
                      )}
                      {showUsageInfo && benefit.unlimited && (
                        <span className="text-[#FFDD2D] text-xs whitespace-nowrap">∞</span>
                      )}
                    </div>
                    <p className="text-white/60 text-xs">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA */}
          <div className="mt-8 p-6 bg-white/5 rounded-2xl border-2 border-white/10 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-white mb-1">
                  Получите все преимущества {currentTier.name}
                </h4>
                <p className="text-white/60 text-sm">
                  {currentTier.name === "Bronze" 
                    ? "Оформите подписку и начните пользоваться всеми привилегиями уже сегодня за 2990 рублей в месяц"
                    : "Пополните счёт для разблокировки эксклюзивных привилегий этого уровня"
                  }
                </p>
              </div>
              <button 
                className="px-6 py-3 rounded-xl text-black transition-all hover:scale-105 hover:bg-[#FCD34D] whitespace-nowrap"
                style={{ backgroundColor: '#FFDD2D' }}
                onClick={handleButtonClick}
              >
                {currentTier.name === "Bronze" 
                  ? `Оформить ${currentTier.name}`
                  : "Внесите средства для открытия уровня"
                }
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Модальное окно выбора способа входа */}
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
          </div>
        </DialogContent>
      </Dialog>

      {/* Модальное окно входа */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="bg-[#1A1A1A] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Вход в систему</DialogTitle>
            <DialogDescription className="text-white/60">
              Введите свои данные для входа
            </DialogDescription>
          </DialogHeader>
          
          {/* Demo credentials info */}
          <div className="p-4 bg-[#FFDD2D]/10 border border-[#FFDD2D]/30 rounded-xl">
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
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-login" className="text-white">Email</Label>
              <Input
                id="email-login"
                type="email"
                placeholder="example@tbank.ru"
                value={loginFormData.email}
                onChange={(e) => setLoginFormData({ ...loginFormData, email: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password-login" className="text-white">Пароль</Label>
              <div className="relative">
                <Input
                  id="password-login"
                  type={showPasswordLogin ? "text" : "password"}
                  placeholder="••••••••"
                  value={loginFormData.password}
                  onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordLogin(!showPasswordLogin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPasswordLogin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
          
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setLoginOpen(false);
                setRegisterOpen(true);
              }}
              className="text-white/60 hover:text-white text-sm transition-colors w-full text-center"
            >
              Нет аккаунта? <span className="text-[#FFDD2D]">Зарегистрироваться</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Модальное окно регистрации */}
      <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
        <DialogContent className="bg-[#1A1A1A] border-white/10 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Создать аккаунт</DialogTitle>
            <DialogDescription className="text-white/60">
              Присоединяйтесь к Т‑Банк Premium
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name-register" className="text-white">Имя и фамилия</Label>
              <Input
                id="name-register"
                type="text"
                placeholder="Александр Петров"
                value={registerFormData.name}
                onChange={(e) => setRegisterFormData({ ...registerFormData, name: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone-register" className="text-white">Номер телефона</Label>
              <Input
                id="phone-register"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={registerFormData.phone}
                onChange={(e) => setRegisterFormData({ ...registerFormData, phone: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="birthDate-register" className="text-white">Дата рождения</Label>
              <Input
                id="birthDate-register"
                type="date"
                value={registerFormData.birthDate}
                onChange={(e) => setRegisterFormData({ ...registerFormData, birthDate: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email-register" className="text-white">Email</Label>
              <Input
                id="email-register"
                type="email"
                placeholder="example@tbank.ru"
                value={registerFormData.email}
                onChange={(e) => setRegisterFormData({ ...registerFormData, email: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password-register" className="text-white">Пароль</Label>
              <div className="relative">
                <Input
                  id="password-register"
                  type={showPasswordRegister ? "text" : "password"}
                  placeholder="Минимум 6 символов"
                  value={registerFormData.password}
                  onChange={(e) => setRegisterFormData({ ...registerFormData, password: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordRegister(!showPasswordRegister)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPasswordRegister ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword-register" className="text-white">Подтвердите пароль</Label>
              <div className="relative">
                <Input
                  id="confirmPassword-register"
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="Повторите пароль"
                  value={registerFormData.confirmPassword}
                  onChange={(e) => setRegisterFormData({ ...registerFormData, confirmPassword: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPasswordConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
          
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setRegisterOpen(false);
                setLoginOpen(true);
              }}
              className="text-white/60 hover:text-white text-sm transition-colors w-full text-center"
            >
              Уже есть аккаунт? <span className="text-[#FFDD2D]">Войти</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Модальное окно пополнения счета */}
      <Dialog open={addMoneyOpen} onOpenChange={setAddMoneyOpen}>
        <DialogContent className="bg-[#1A1A1A] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Пополнить счёт</DialogTitle>
            <DialogDescription className="text-white/60">
              Введите сумму для пополнения вашего счёта
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-white">Сумма пополнения</Label>
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
              {[10000, 50000, 100000].map((val) => (
                <Button
                  key={val}
                  type="button"
                  variant="outline"
                  onClick={() => setAmount(val.toString())}
                  className="bg-[#808080]/5 border-[#808080]/30 text-[#FFDD2D] hover:bg-[#FFDD2D]/10 hover:border-[#808080]/50 transition-all"
                >
                  {val.toLocaleString('ru-RU')} ₽
                </Button>
              ))}
            </div>
            
            <Button
              onClick={handleAddMoney}
              className="w-full bg-[#FFDD2D] hover:bg-[#FCD34D] text-black"
            >
              <Wallet className="w-5 h-5 mr-2" />
              Пополнить счёт
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Модальное окно детальной информации о привилегии */}
      <Dialog open={benefitDetailOpen} onOpenChange={setBenefitDetailOpen}>
        <DialogContent className="bg-gradient-to-br from-[#1A1A1A] via-[#252525] to-[#1A1A1A] border-white/10 max-w-2xl">
          {selectedBenefit && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ 
                      background: `linear-gradient(135deg, ${selectedBenefit.tierColor}20, ${selectedBenefit.tierColor}40)`,
                      boxShadow: `0 0 20px ${selectedBenefit.tierColor}30`
                    }}
                  >
                    <selectedBenefit.icon className="w-8 h-8" style={{ color: selectedBenefit.tierColor }} />
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-white text-2xl mb-1">
                      {selectedBenefit.title}
                    </DialogTitle>
                    <div 
                      className="inline-block px-3 py-1 rounded-full text-xs"
                      style={{ 
                        backgroundColor: `${selectedBenefit.tierColor}20`,
                        color: selectedBenefit.tierColor,
                        border: `1px solid ${selectedBenefit.tierColor}40`
                      }}
                    >
                      {selectedBenefit.tierName} привилегия
                    </div>
                  </div>
                </div>
                <DialogDescription className="sr-only">
                  Детали привилегии {selectedBenefit.title}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 pt-4">
                <div>
                  <h4 className="text-white/80 mb-2">Краткое описание</h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {selectedBenefit.description}
                  </p>
                </div>
                
                <div className="h-px bg-white/10" />
                
                <div>
                  <h4 className="text-white/80 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" style={{ color: selectedBenefit.tierColor }} />
                    Подробная информация
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {selectedBenefit.detailedDescription}
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button
                    onClick={() => setBenefitDetailOpen(false)}
                    className="w-full bg-[#FFDD2D] hover:bg-[#FCD34D] text-black"
                  >
                    Понятно
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Toaster position="top-right" />
    </>
  );
}
