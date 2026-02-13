import { PremiumHeader } from "../components/PremiumHeader";
import { Bell, Check, X, CreditCard, TrendingUp, Gift, AlertCircle } from "lucide-react";

const notifications = [
  {
    icon: CreditCard,
    title: "Пополнение карты",
    description: "Зачислено 50 000 ₽ на карту *4821",
    time: "2 минуты назад",
    unread: true,
    type: "success",
  },
  {
    icon: TrendingUp,
    title: "Изменение курса",
    description: "Курс USD вырос на 2.5%. Выгодное время для покупки",
    time: "1 час назад",
    unread: true,
    type: "info",
  },
  {
    icon: Gift,
    title: "Новое предложение",
    description: "Кешбэк 10% в категории Рестораны до конца месяца",
    time: "3 часа назад",
    unread: false,
    type: "promo",
  },
  {
    icon: AlertCircle,
    title: "Требуется подтверждение",
    description: "Подтвердите операцию на сумму 12 500 ₽",
    time: "5 часов назад",
    unread: false,
    type: "warning",
  },
  {
    icon: Check,
    title: "Платеж выполнен",
    description: "Оплата ЖКХ на сумму 3 450 ₽ прошла успешно",
    time: "Вчера",
    unread: false,
    type: "success",
  },
];

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <PremiumHeader />
      
      <main className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-[800px]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-white mb-2">Уведомления</h1>
            <p className="text-white/60">Важные события и новости</p>
          </div>
          <button className="text-white/60 hover:text-white text-sm transition-colors">
            Отметить все как прочитанные
          </button>
        </div>

        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl p-6 border transition-all hover:border-[#FFDD2D]/50 ${
                notification.unread ? 'border-[#FFDD2D]/30' : 'border-white/10'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  notification.type === 'success' ? 'bg-green-500/20' :
                  notification.type === 'info' ? 'bg-blue-500/20' :
                  notification.type === 'promo' ? 'bg-purple-500/20' :
                  'bg-yellow-500/20'
                }`}>
                  <notification.icon className={`w-6 h-6 ${
                    notification.type === 'success' ? 'text-green-400' :
                    notification.type === 'info' ? 'text-blue-400' :
                    notification.type === 'promo' ? 'text-purple-400' :
                    'text-yellow-400'
                  }`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className="text-white">{notification.title}</h3>
                    {notification.unread && (
                      <div className="w-2 h-2 rounded-full bg-[#FFDD2D] flex-shrink-0 mt-1.5"></div>
                    )}
                  </div>
                  <p className="text-white/60 text-sm mb-2">{notification.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/40 text-xs">{notification.time}</span>
                    <div className="flex gap-2">
                      <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                        <Check className="w-4 h-4 text-white/60" />
                      </button>
                      <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                        <X className="w-4 h-4 text-white/60" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-16">
            <Bell className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-white mb-2">Нет новых уведомлений</h3>
            <p className="text-white/60">Здесь будут отображаться важные события</p>
          </div>
        )}

        <div className="mt-12 bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-6 border border-white/10">
          <h3 className="text-white mb-4">Настройки уведомлений</h3>
          <div className="space-y-3">
            {[
              { label: "Операции по картам", enabled: true },
              { label: "Акции и предложения", enabled: true },
              { label: "Изменения курсов", enabled: false },
              { label: "Новости и обновления", enabled: true },
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white/80">{setting.label}</span>
                <button className={`w-12 h-6 rounded-full transition-colors ${
                  setting.enabled ? 'bg-[#FFDD2D]' : 'bg-white/20'
                } relative`}>
                  <div className={`w-5 h-5 rounded-full bg-black absolute top-0.5 transition-transform ${
                    setting.enabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`}></div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
