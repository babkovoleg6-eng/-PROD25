import { Bell, Settings, User, Menu } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3">
              <img 
                src="figma:asset/259105055a0cdaa9a1d922db6a212c448bfdad56.png" 
                alt="Logo" 
                className="w-8 h-8"
              />
            </div>
            
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-[#1A1A1A] relative after:absolute after:bottom-[-20px] after:left-0 after:right-0 after:h-0.5 after:bg-[#FFDD2D]">Главная</a>
              <a href="#" className="text-[#6B7280] hover:text-[#1A1A1A] transition-colors">Счета</a>
              <a href="#" className="text-[#6B7280] hover:text-[#1A1A1A] transition-colors">Платежи</a>
              <a href="#" className="text-[#6B7280] hover:text-[#1A1A1A] transition-colors">Инвестиции</a>
              <a href="#" className="text-[#6B7280] hover:text-[#1A1A1A] transition-colors">Ещё</a>
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-[#6B7280] hover:text-[#1A1A1A] hover:bg-gray-100 rounded-full">
              <Bell className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="text-[#6B7280] hover:text-[#1A1A1A] hover:bg-gray-100 rounded-full">
              <Settings className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FFDD2D] to-[#FCD34D] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-black" />
              </div>
            </div>
            
            <Button variant="ghost" size="icon" className="lg:hidden text-[#1A1A1A]">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
