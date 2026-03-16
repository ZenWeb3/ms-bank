"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Profile, Account, Transaction } from "@/types/database";
import {
  Home,
  CreditCard,
  ArrowLeftRight,
  FileText,
  Settings,
  LogOut,
  ArrowDownLeft,
  ArrowUpRight,
  MoreHorizontal,
  Send,
  Wallet,
  Building2,
  X,
  Eye,
  EyeOff,
  Sparkles,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface UserData {
  profile: Profile;
  accounts: Account[];
  transactions: Transaction[];
}

interface TransferResult {
  success: boolean;
  error?: string;
  transaction_id?: string;
  new_balance?: number;
}

export default function Dashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showBalances, setShowBalances] = useState(true);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<
    "zelle" | "cashapp" | "wire" | null
  >(null);
  const [transferForm, setTransferForm] = useState({
    recipient: "",
    amount: "",
    memo: "",
    routingNumber: "",
    accountId: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [transferError, setTransferError] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchUserData = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    // Fetch profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    // Fetch accounts
    const { data: accounts } = await supabase
      .from("accounts")
      .select("*")
      .eq("user_id", user.id);

    // Fetch transactions
    const accountIds = (accounts as Account[] | undefined)?.map((a) => a.id) || [];
    const { data: transactions } = await supabase
      .from("transactions")
      .select("*")
      .in("account_id", accountIds.length > 0 ? accountIds : [""])
      .order("created_at", { ascending: false })
      .limit(10);

    if (profile && accounts) {
      setUserData({
        profile,
        accounts,
        transactions: transactions || [],
      });

      // Set default account for transfer
      if (accounts.length > 0) {
        setTransferForm((prev) => ({ ...prev, accountId: (accounts as Account[])[0].id }));
      }
    }

    setIsLoading(false);
  }, [supabase, router]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "GOOD MORNING";
    if (hour < 18) return "GOOD AFTERNOON";
    return "GOOD EVENING";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleTransfer = async () => {
    if (!userData || !selectedMethod) return;
    setTransferError("");

    const amount = parseFloat(transferForm.amount);
    if (isNaN(amount) || amount <= 0) {
      setTransferError("Please enter a valid amount");
      return;
    }

    const selectedAccount = userData.accounts.find(
      (a) => a.id === transferForm.accountId
    );
    if (!selectedAccount) {
      setTransferError("Please select an account");
      return;
    }

    if (amount > selectedAccount.balance) {
      setTransferError("Insufficient funds");
      return;
    }

    setIsProcessing(true);

    // Call the process_transfer function
    // Using type assertion because Supabase's RPC typing requires exact schema match
    const { data, error } = await (supabase.rpc as Function)("process_transfer", {
      p_account_id: transferForm.accountId,
      p_amount: amount,
      p_title: `${selectedMethod === "zelle" ? "Zelle" : selectedMethod === "cashapp" ? "Cash App" : "Wire"} to ${transferForm.recipient}`,
      p_method: selectedMethod,
      p_recipient: transferForm.recipient,
      p_memo: transferForm.memo || null,
    });

    if (error) {
      setTransferError((error as { message: string }).message);
      setIsProcessing(false);
      return;
    }

    // Type assertion for the RPC result
    const result = data as TransferResult | null;
    if (result && !result.success) {
      setTransferError(result.error || "Transfer failed");
      setIsProcessing(false);
      return;
    }

    // Refresh data
    await fetchUserData();

    setIsProcessing(false);
    setShowTransferModal(false);
    setSelectedMethod(null);
    setTransferForm({
      recipient: "",
      amount: "",
      memo: "",
      routingNumber: "",
      accountId: userData.accounts[0]?.id || "",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  const savingsAccount = userData.accounts.find(
    (a) => a.account_type === "savings"
  );
  const checkingAccount = userData.accounts.find(
    (a) => a.account_type === "checking"
  );
  const netWorth = userData.accounts.reduce(
    (sum, acc) => sum + Number(acc.balance),
    0
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-urbanist">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0a0a0a]/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Logo - Only icon on mobile */}
          <Link href="/" className="flex items-center gap-3 z-[60]">
            <div className="w-10 h-10 bg-linear-to-r from-[#5c0f28] via-[#b22234] via-[#3c3b6e] to-[#001a3d]   rounded-xl bg-[length:200%_200%] flex items-center justify-center text-white font-bold font-syne text-xl shadow-lg shadow-black/10">
              U
            </div>
            <span className="hidden md:block font-syne font-extrabold text-xl tracking-tighter text-white uppercase">
              United Mississippi Bank
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center bg-white/[0.03] rounded-full p-1 border border-white/5">
            {[
              { id: "overview", label: "Overview", icon: Home },
              { id: "transactions", label: "Transactions", icon: FileText },
              { id: "transfers", label: "Transfers", icon: ArrowLeftRight },
              { id: "cards", label: "Cards", icon: CreditCard },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#5c0f28] to-[#b22234] text-white"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                <tab.icon size={15} />
                <span className="hidden xl:inline">{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Right side - User info (desktop) + Logout + Hamburger (mobile) */}
          <div className="flex items-center gap-3 z-[60]">
            {/* Desktop: User info */}
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <div className="font-semibold text-sm text-white">{userData.profile.full_name}</div>
                <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  {userData.profile.tier}
                </div>
              </div>
              <div className="w-10 h-10 rounded-full  flex items-center justify-center border-2 border-white/10">
                <span className="text-sm font-bold font-syne text-white">
                  {userData.profile.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
            </div>

            {/* Logout button - always visible */}
            <button
              onClick={handleLogout}
              className="p-2.5 hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut size={18} className="text-gray-500" />
            </button>

            {/* Hamburger Menu - mobile/tablet only */}
            <button
              className="xl:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <div className={`fixed inset-0 bg-[#0a0a0a]/98 backdrop-blur-xl z-40 xl:hidden transition-all duration-300 ${
        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        <div className="flex flex-col pt-24 px-6 pb-8">
          {/* User info in mobile menu */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
            <div className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-white/10">
              <span className="text-lg font-bold font-syne text-white">
                {userData.profile.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <div className="font-semibold text-lg text-white">{userData.profile.full_name}</div>
              <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                {userData.profile.tier}
              </div>
            </div>
          </div>

          {/* Nav items */}
          <nav className="flex flex-col gap-2">
            {[
              { id: "overview", label: "Overview", icon: Home },
              { id: "transactions", label: "Transactions", icon: FileText },
              { id: "transfers", label: "Transfers", icon: ArrowLeftRight },
              { id: "cards", label: "Cards", icon: CreditCard },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-4 px-4 py-4 rounded-xl text-lg font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#5c0f28] to-[#b22234] text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <tab.icon size={22} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* Greeting */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-3 text-[#b22234] text-[11px] font-bold tracking-[0.25em] uppercase mb-2 md:mb-3">
              <span className="w-5 h-[2px] bg-[#b22234]" />
              {getGreeting()}
            </div>
            <h1 className="text-3xl md:text-5xl font-syne font-bold tracking-tight text-white mb-2 md:mb-3">
              Hello, {userData.profile.full_name.split(" ")[0]}
            </h1>
            <p className="text-gray-500 text-base md:text-lg">
              Here&apos;s what&apos;s happening with your accounts today.
            </p>
          </div>

          {/* Net Worth */}
          <div className="bg-white/[0.02] rounded-2xl px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-5 border border-white/5 self-start">
            <span className="text-gray-500 text-xs font-bold tracking-wider uppercase">Net Worth</span>
            <button
              onClick={() => setShowBalances(!showBalances)}
              className="p-1.5 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              {showBalances ? (
                <EyeOff size={16} className="text-gray-500" />
              ) : (
                <Eye size={16} className="text-gray-500" />
              )}
            </button>
            <span className="text-xl md:text-3xl font-bold font-syne tracking-tight text-white">
              {showBalances ? formatCurrency(netWorth) : "••••••••"}
            </span>
          </div>
        </div>

        {/* Account Cards & Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
          {/* Savings Card */}
          <div className="bg-white/[0.02] rounded-2xl p-5 md:p-6 border border-white/5 hover:border-[#b22234]/20 transition-all group">
            <div className="flex items-start justify-between mb-6 md:mb-8">
              <div className="w-11 md:w-12 h-11 md:h-12 rounded-xl bg-[#b22234]/10 flex items-center justify-center">
                <BookOpen size={20} className="text-[#b22234]" />
              </div>
              <span className="px-3 py-1.5 bg-white/[0.03] rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-white/5">
                Savings
              </span>
            </div>
            <div className="mb-6 md:mb-8">
              <div className="text-sm text-gray-500 mb-1 md:mb-2">
                Current Balance
              </div>
              <div className="text-3xl md:text-4xl font-bold font-syne tracking-tight text-white">
                {showBalances ? formatCurrency(Number(savingsAccount?.balance || 0)) : "••••••••"}
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 md:pt-5 border-t border-white/5">
              <div>
                <div className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-1">
                  Account
                </div>
                <div className="text-sm font-mono text-gray-400">
                  {savingsAccount?.account_number || "—"}
                </div>
              </div>
              <CreditCard size={24} className="text-white/5" />
            </div>
          </div>

          {/* Checking Card */}
          <div className="bg-white/[0.02] rounded-2xl p-5 md:p-6 border border-white/5 hover:border-[#3c3b6e]/20 transition-all group">
            <div className="flex items-start justify-between mb-6 md:mb-8">
              <div className="w-11 md:w-12 h-11 md:h-12 rounded-xl bg-[#3c3b6e]/10 flex items-center justify-center">
                <CreditCard size={20} className="text-[#3c3b6e]" />
              </div>
              <span className="px-3 py-1.5 bg-white/[0.03] rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-white/5">
                Checking
              </span>
            </div>
            <div className="mb-6 md:mb-8">
              <div className="text-sm text-gray-500 mb-1 md:mb-2">
                Current Balance
              </div>
              <div className="text-3xl md:text-4xl font-bold font-syne tracking-tight text-white">
                {showBalances ? formatCurrency(Number(checkingAccount?.balance || 0)) : "••••••••"}
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 md:pt-5 border-t border-white/5">
              <div>
                <div className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-1">
                  Account
                </div>
                <div className="text-sm font-mono text-gray-400">
                  {checkingAccount?.account_number || "—"}
                </div>
              </div>
              <CreditCard size={24} className="text-white/5" />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/[0.02] rounded-2xl p-5 md:p-6 border border-white/5 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#b22234]/10 to-[#3c3b6e]/10 flex items-center justify-center">
                <Sparkles size={18} className="text-[#b22234]" />
              </div>
              <span className="font-syne font-bold text-white">Quick Actions</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowTransferModal(true)}
                className="flex flex-col items-center gap-3 p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-[#b22234]/30 transition-all group cursor-pointer"
              >
                <ArrowLeftRight
                  size={22}
                  className="text-[#b22234] group-hover:scale-110 transition-transform"
                />
                <span className="text-sm text-gray-500 group-hover:text-white transition-colors font-medium">
                  Transfer
                </span>
              </button>
              <button className="flex flex-col items-center gap-3 p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-[#3c3b6e]/30 transition-all group cursor-pointer">
                <FileText
                  size={22}
                  className="text-[#3c3b6e] group-hover:scale-110 transition-transform"
                />
                <span className="text-sm text-gray-500 group-hover:text-white transition-colors font-medium">
                  Pay Bills
                </span>
              </button>
              <button className="flex flex-col items-center gap-3 p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-amber-500/30 transition-all group cursor-pointer">
                <CreditCard
                  size={22}
                  className="text-amber-500 group-hover:scale-110 transition-transform"
                />
                <span className="text-sm text-gray-500 group-hover:text-white transition-colors font-medium">
                  Cards
                </span>
              </button>
              <button
                onClick={() => setShowTransferModal(true)}
                className="flex flex-col items-center gap-3 p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-purple-500/30 transition-all group cursor-pointer"
              >
                <MoreHorizontal
                  size={22}
                  className="text-purple-500 group-hover:scale-110 transition-transform"
                />
                <span className="text-sm text-gray-500 group-hover:text-white transition-colors font-medium">
                  More
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/[0.02] rounded-2xl border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <h2 className="text-xl font-syne font-bold text-white">Recent Activity</h2>
            <button className="flex items-center gap-2 text-[#b22234] text-sm font-bold hover:text-[#b22234]/80 transition-colors cursor-pointer group">
              View All History
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {userData.transactions.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <FileText size={48} className="mx-auto mb-4 opacity-30" />
              <p className="font-medium">No transactions yet</p>
              <p className="text-sm text-gray-600">Your transactions will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {userData.transactions.map((tx) => (
                <button
                  key={tx.id}
                  onClick={() => setSelectedTransaction(tx)}
                  className="w-full flex items-center justify-between gap-3 px-4 md:px-6 py-4 md:py-5 hover:bg-white/[0.02] transition-colors cursor-pointer text-left"
                >
                  {/* Left side - Icon + Title/Date */}
                  <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                    <div
                      className={`w-10 md:w-11 h-10 md:h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        tx.transaction_type === "incoming"
                          ? "bg-emerald-500/10"
                          : "bg-red-500/10"
                      }`}
                    >
                      {tx.transaction_type === "incoming" ? (
                        <ArrowDownLeft size={18} className="text-emerald-400" />
                      ) : (
                        <ArrowUpRight size={18} className="text-red-400" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      {/* Title row with badges on desktop */}
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white truncate text-sm md:text-base">
                          {tx.title}
                        </span>
                        {/* Badges - desktop only */}
                        <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wide ${
                            tx.status === "completed" 
                              ? "bg-emerald-500/20 text-emerald-400" 
                              : "bg-amber-500/20 text-amber-400"
                          }`}>
                            {tx.status}
                          </span>
                          <span className="px-2 py-0.5 bg-white/10 text-gray-300 text-[9px] font-bold rounded-full uppercase tracking-wide">
                            {tx.method || "transfer"}
                          </span>
                        </div>
                      </div>
                      {/* Date row */}
                      <div className="flex items-center gap-2 mt-0.5">
                        {/* Badges - mobile only */}
                        <div className="flex md:hidden items-center gap-1.5">
                          <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded-full uppercase ${
                            tx.status === "completed" 
                              ? "bg-emerald-500/20 text-emerald-400" 
                              : "bg-amber-500/20 text-amber-400"
                          }`}>
                            {tx.status}
                          </span>
                          <span className="px-1.5 py-0.5 bg-white/10 text-gray-300 text-[8px] font-bold rounded-full uppercase">
                            {tx.method || "transfer"}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatDate(tx.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Amount */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div
                      className={`font-mono font-bold text-sm md:text-lg whitespace-nowrap ${
                        tx.transaction_type === "incoming"
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {tx.transaction_type === "incoming" ? "+" : "-"}
                      {formatCurrency(Number(tx.amount))}
                    </div>
                    <ChevronRight size={16} className="text-gray-600 hidden md:block" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a0a0a] rounded-3xl border border-white/10 w-full max-w-md overflow-hidden">
            {!selectedMethod ? (
              <>
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                  <h3 className="text-xl font-syne font-bold">Send Money</h3>
                  <button
                    onClick={() => setShowTransferModal(false)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  >
                    <X size={20} className="text-gray-400" />
                  </button>
                </div>
                <div className="p-6 space-y-3">
                  <p className="text-gray-400 text-sm mb-4">
                    Choose your preferred transfer method
                  </p>
                  <button
                    onClick={() => setSelectedMethod("zelle")}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#7a1fd6]/30 transition-all group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#7a1fd6] flex items-center justify-center text-white font-bold italic text-xl">
                      Z
                    </div>
                    <div className="text-left">
                      <div className="font-bold group-hover:text-[#7a1fd6] transition-colors">
                        Zelle
                      </div>
                      <div className="text-sm text-gray-500">
                        Send instantly to any bank
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedMethod("cashapp")}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#00b09b]/30 transition-all group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#00b09b] flex items-center justify-center">
                      <Wallet size={24} className="text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold group-hover:text-[#00b09b] transition-colors">
                        Cash App
                      </div>
                      <div className="text-sm text-gray-500">
                        Send to $cashtag or phone
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedMethod("wire")}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-brand-navy/30 transition-all group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-navy flex items-center justify-center">
                      <Building2 size={24} className="text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold group-hover:text-brand-navy transition-colors">
                        Wire Transfer
                      </div>
                      <div className="text-sm text-gray-500">
                        Domestic & international wires
                      </div>
                    </div>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedMethod(null)}
                      className="p-2 hover:bg-white/5 rounded-lg transition-colors -ml-2 cursor-pointer"
                    >
                      <ChevronLeft size={16} className="text-gray-400" />
                    </button>
                    <h3 className="text-xl font-syne font-bold capitalize">
                      {selectedMethod === "cashapp"
                        ? "Cash App"
                        : selectedMethod === "wire"
                          ? "Wire Transfer"
                          : "Zelle"}{" "}
                      Transfer
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setShowTransferModal(false);
                      setSelectedMethod(null);
                      setTransferError("");
                    }}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  >
                    <X size={20} className="text-gray-400" />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  {transferError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                      {transferError}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">
                      {selectedMethod === "zelle"
                        ? "Email or Phone Number"
                        : selectedMethod === "cashapp"
                          ? "$Cashtag or Phone Number"
                          : "Account Number"}
                    </label>
                    <input
                      type="text"
                      value={transferForm.recipient}
                      onChange={(e) =>
                        setTransferForm({
                          ...transferForm,
                          recipient: e.target.value,
                        })
                      }
                      placeholder={
                        selectedMethod === "zelle"
                          ? "email@example.com"
                          : selectedMethod === "cashapp"
                            ? "$username"
                            : "Enter account number"
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-red/50 transition-colors"
                    />
                  </div>

                  {selectedMethod === "wire" && (
                    <div>
                      <label className="block text-sm text-gray-400 mb-2 font-medium">
                        Routing Number
                      </label>
                      <input
                        type="text"
                        value={transferForm.routingNumber}
                        onChange={(e) =>
                          setTransferForm({
                            ...transferForm,
                            routingNumber: e.target.value,
                          })
                        }
                        placeholder="Enter routing number"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-red/50 transition-colors"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">
                      Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        value={transferForm.amount}
                        onChange={(e) =>
                          setTransferForm({
                            ...transferForm,
                            amount: e.target.value,
                          })
                        }
                        placeholder="0.00"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-red/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">
                      From Account
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {userData.accounts.map((account) => (
                        <button
                          key={account.id}
                          onClick={() =>
                            setTransferForm({
                              ...transferForm,
                              accountId: account.id,
                            })
                          }
                          className={`p-3 rounded-xl border transition-all cursor-pointer ${
                            transferForm.accountId === account.id
                              ? "bg-brand-red/10 border-brand-red/50 text-brand-red"
                              : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                          }`}
                        >
                          <div className="text-xs uppercase tracking-wider mb-1 font-bold">
                            {account.account_type}
                          </div>
                          <div className="font-mono text-sm">
                            {formatCurrency(Number(account.balance))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">
                      Memo (Optional)
                    </label>
                    <input
                      type="text"
                      value={transferForm.memo}
                      onChange={(e) =>
                        setTransferForm({
                          ...transferForm,
                          memo: e.target.value,
                        })
                      }
                      placeholder="What's this for?"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-red/50 transition-colors"
                    />
                  </div>

                  <button
                    onClick={handleTransfer}
                    disabled={
                      isProcessing ||
                      !transferForm.recipient ||
                      !transferForm.amount
                    }
                    className="w-full btn-primary-custom py-4 flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Money
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedTransaction(null)}
        >
          <div 
            className="bg-[#0a0a0a] rounded-3xl border border-white/10 w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-xl font-syne font-bold">Transaction Details</h3>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Amount & Type */}
              <div className="text-center mb-8">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                    selectedTransaction.transaction_type === "incoming"
                      ? "bg-emerald-500/10"
                      : "bg-red-500/10"
                  }`}
                >
                  {selectedTransaction.transaction_type === "incoming" ? (
                    <ArrowDownLeft size={32} className="text-emerald-400" />
                  ) : (
                    <ArrowUpRight size={32} className="text-red-400" />
                  )}
                </div>
                <div
                  className={`text-4xl font-bold font-syne mb-2 ${
                    selectedTransaction.transaction_type === "incoming"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {selectedTransaction.transaction_type === "incoming" ? "+" : "-"}
                  {formatCurrency(Number(selectedTransaction.amount))}
                </div>
                <div className="text-gray-500 font-medium">{selectedTransaction.title}</div>
              </div>

              {/* Details Grid */}
              <div className="space-y-4">
                {/* Status */}
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-gray-500 text-sm">Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                    selectedTransaction.status === "completed"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}>
                    {selectedTransaction.status}
                  </span>
                </div>

                {/* Method */}
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-gray-500 text-sm">Method</span>
                  <span className="text-white font-medium capitalize">
                    {selectedTransaction.method === "cashapp" ? "Cash App" : selectedTransaction.method || "Transfer"}
                  </span>
                </div>

                {/* Date & Time */}
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-gray-500 text-sm">Date & Time</span>
                  <span className="text-white font-medium">
                    {new Date(selectedTransaction.created_at).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>

                {/* Type */}
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-gray-500 text-sm">Type</span>
                  <span className="text-white font-medium capitalize">
                    {selectedTransaction.transaction_type === "incoming" ? "Money Received" : "Money Sent"}
                  </span>
                </div>

                {/* Recipient (if outgoing) */}
                {selectedTransaction.recipient && (
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="text-gray-500 text-sm">Recipient</span>
                    <span className="text-white font-medium">{selectedTransaction.recipient}</span>
                  </div>
                )}

                {/* Memo (if exists) */}
                {selectedTransaction.memo && (
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="text-gray-500 text-sm">Memo</span>
                    <span className="text-white font-medium">{selectedTransaction.memo}</span>
                  </div>
                )}

                {/* Transaction ID */}
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-500 text-sm">Transaction ID</span>
                  <span className="text-gray-400 font-mono text-xs">
                    {selectedTransaction.id.slice(0, 8)}...{selectedTransaction.id.slice(-4)}
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedTransaction(null)}
                className="w-full mt-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}