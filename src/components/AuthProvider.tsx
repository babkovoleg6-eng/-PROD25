import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  balance: number;
  tier: "Bronze" | "Silver" | "Gold" | "Diamond";
  registeredAt: string;
  lastBalanceUpdate: string; // Дата последнего обновления баланса
  avatar?: string;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: "income" | "expense";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateBalance: (amount: number) => void;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const MOCK_USERS = [
  {
    id: "1",
    email: "demo@tbank.ru",
    password: "demo123",
    name: "Александр Петров",
    balance: 4000000,
    tier: "Silver" as const,
    registeredAt: "2024-01-15",
    lastBalanceUpdate: "2025-01-01T00:00:00.000Z",
    avatar: undefined
  }
];

// Mock transactions
const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    date: "2025-01-15T10:30:00",
    description: "Пополнение счета",
    amount: 50000,
    category: "Пополнение",
    type: "income"
  },
  {
    id: "2",
    date: "2025-01-14T15:20:00",
    description: "Покупка в магазине",
    amount: -3500,
    category: "Покупки",
    type: "expense"
  },
  {
    id: "3",
    date: "2025-01-13T09:15:00",
    description: "Перевод от друга",
    amount: 15000,
    category: "Переводы",
    type: "income"
  },
  {
    id: "4",
    date: "2025-01-12T18:45:00",
    description: "Оплата ЖКХ",
    amount: -8500,
    category: "Коммунальные",
    type: "expense"
  },
  {
    id: "5",
    date: "2025-01-11T12:30:00",
    description: "Кешбэк от покупок",
    amount: 2300,
    category: "Кешбэк",
    type: "income"
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("tbank_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedTransactions = localStorage.getItem("tbank_transactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions(INITIAL_TRANSACTIONS);
      localStorage.setItem("tbank_transactions", JSON.stringify(INITIAL_TRANSACTIONS));
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("tbank_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("tbank_user");
    }
  }, [user]);

  // Save transactions to localStorage when they change
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("tbank_transactions", JSON.stringify(transactions));
    }
  }, [transactions]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return true;
    }

    return false;
  };

  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if user already exists
    const existingUser = MOCK_USERS.find((u) => u.email === email);
    if (existingUser) {
      return false;
    }

    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      balance: 100000, // Starting balance
      tier: "Bronze",
      registeredAt: new Date().toISOString().split("T")[0],
      lastBalanceUpdate: new Date().toISOString(),
    };

    // In a real app, this would be saved to a database
    MOCK_USERS.push({ ...newUser, password } as any);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tbank_user");
  };

  const updateBalance = (amount: number) => {
    if (!user) return;

    const newBalance = user.balance + amount;
    
    // Determine tier based on balance
    let newTier: User["tier"] = "Bronze";
    if (newBalance >= 10000000) {
      newTier = "Diamond";
    } else if (newBalance >= 5000000) {
      newTier = "Gold";
    } else if (newBalance >= 3000000) {
      newTier = "Silver";
    }

    const updatedUser = {
      ...user,
      balance: newBalance,
      tier: newTier,
      // НЕ обновляем lastBalanceUpdate - он устанавливается только при регистрации
    };

    setUser(updatedUser);
  };

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    updateBalance(transaction.amount);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateBalance,
        transactions,
        addTransaction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
