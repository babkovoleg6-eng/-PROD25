import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthProvider";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Toaster } from "../components/ui/sonner";
import { useNavigation } from "../hooks/use-navigation";

export default function LoginPage() {
  const { navigate } = useNavigation();
  const { login, signup, isAuthenticated } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    birthDate: "",
  });

  // Redirect if already authenticated to home page
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let success = false;
      if (isSignup) {
        if (!formData.name) {
          toast.error("Пожалуйста, введите ваше имя");
          setLoading(false);
          return;
        }
        
        if (!formData.phone) {
          toast.error("Пожалуйста, введите номер телефона");
          setLoading(false);
          return;
        }
        
        if (!formData.birthDate) {
          toast.error("Пожалуйста, укажите дату рождения");
          setLoading(false);
          return;
        }
        
        if (formData.password !== formData.confirmPassword) {
          toast.error("Пароли не совпадают");
          setLoading(false);
          return;
        }
        
        if (formData.password.length < 6) {
          toast.error("Пароль должен содержать минимум 6 символов");
          setLoading(false);
          return;
        }
        
        success = await signup(
          formData.email,
          formData.password,
          formData.name,
        );
        if (success) {
          toast.success("Регистрация успешна!");
          setTimeout(() => {
            navigate("/");
          }, 500);
        } else {
          toast.error(
            "Пользователь с таким email уже существует",
          );
        }
      } else {
        success = await login(
          formData.email,
          formData.password,
        );
        if (success) {
          toast.success("Добро пожаловать!");
          setTimeout(() => {
            navigate("/");
          }, 500);
        } else {
          toast.error("Неверный email или пароль");
        }
      }
    } catch (error) {
      toast.error("Произошла ошибка. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFDD2D]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFDD2D]/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 mb-4"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 28 28"
              fill="none"
            >
              <rect
                width="28"
                height="28"
                rx="7"
                fill="#FFDD2D"
              />
              <path
                d="M8 8H20V10H17V20H15V10H13V20H11V10H8V8Z"
                fill="#000000"
              />
            </svg>
            <span className="text-white text-2xl">Т‑Банк</span>
          </button>
          <h1 className="text-white mb-2">
            {isSignup ? "Создать аккаунт" : "Вход в систему"}
          </h1>
          <p className="text-white/60">
            {isSignup
              ? "Присоединяйтесь к Т‑Банк Premium"
              : "Управляйте своими финансами"}
          </p>
        </div>

        <Card className="border-white/10 p-8 bg-gradient-to-br from-[#1A1A1A] via-[#252525] to-[#1A1A1A]">
          {/* Demo credentials info */}
          {!isSignup && (
            <div className="mb-6 p-4 bg-[#FFDD2D]/10 border border-[#FFDD2D]/30 rounded-xl">
              <p className="text-white/80 text-sm mb-2">
                🔑 Демо-аккаунт для входа:
              </p>
              <p className="text-white text-sm">
                Email:{" "}
                <span className="text-[#FFDD2D]">
                  demo@tbank.ru
                </span>
              </p>
              <p className="text-white text-sm">
                Пароль:{" "}
                <span className="text-[#FFDD2D]">demo123</span>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignup && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Имя и фамилия
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Александр Петров"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Номер телефона
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="text-white">
                    Дата рождения
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        birthDate: e.target.value,
                      })
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    required
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@tbank.ru"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Пароль
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={isSignup ? "Минимум 6 символов" : "••••••••"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 pr-10"
                  required
                  minLength={isSignup ? 6 : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            
            {isSignup && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Подтвердите пароль
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPasswordConfirm ? "text" : "password"}
                    placeholder="Повторите пароль"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
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
            )}

            <Button
              type="submit"
              className="w-full bg-[#FFDD2D] hover:bg-[#FCD34D] text-black"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  Подождите...
                </div>
              ) : isSignup ? (
                <>
                  <UserPlus className="w-5 h-5 mr-2" />
                  Создать аккаунт
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Войти
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setFormData({
                  email: "",
                  password: "",
                  confirmPassword: "",
                  name: "",
                  phone: "",
                  birthDate: "",
                });
              }}
              className="text-white/60 hover:text-white text-sm transition-colors w-full text-center"
            >
              {isSignup ? (
                <>
                  Уже есть аккаунт?{" "}
                  <span className="text-[#FFDD2D]">Войти</span>
                </>
              ) : (
                <>
                  Нет аккаунта?{" "}
                  <span className="text-[#FFDD2D]">
                    Зарегистрироваться
                  </span>
                </>
              )}
            </button>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-white/60 hover:text-white text-sm transition-colors"
          >
            ← Вернуться на главную
          </button>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}