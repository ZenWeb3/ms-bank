"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
} from "lucide-react";

export default function Login() {
  const router = useRouter();
  const supabase = createClient();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-urbanist">
      {/* Left Panel - Branding (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#b22234]/20 via-transparent to-[#3c3b6e]/20" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#b22234]/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3c3b6e]/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-r from-[#5c0f28] via-[#b22234] via-[#3c3b6e] to-[#001a3d]   rounded-xl bg-[length:200%_200%] flex items-center justify-center text-white font-bold font-syne text-xl shadow-lg shadow-black/10">
              U
            </div>
            <div>
              <div className="font-syne font-bold text-lg tracking-tight">United Mississippi Bank</div>
              <div className="text-[10px] text-[#b22234] font-bold tracking-[0.2em] uppercase">Premium Banking</div>
            </div>
          </Link>

          {/* Main Message */}
          <div className="space-y-8">
            <h1 className="text-5xl font-syne font-bold leading-tight tracking-tight">
              Banking<br />
              <span className="bg-linear-to-r from-[#5c0f28] via-[#b22234] via-[#3c3b6e] to-[#001a3d] bg-clip-text text-transparent bg-[length:200%_200%] animate-gradientShift">
                Reimagined
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-md">
              Experience the future of financial services with sophisticated solutions designed for modern life.
            </p>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#b22234]/10 flex items-center justify-center">
                  <ShieldCheck size={20} className="text-[#b22234]" />
                </div>
                <span className="text-gray-300">Bank-grade security & encryption</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#3c3b6e]/10 flex items-center justify-center">
                  <Zap size={20} className="text-[#3c3b6e]" />
                </div>
                <span className="text-gray-300">Instant transfers worldwide</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <Lock size={20} className="text-cyan-400" />
                </div>
                <span className="text-gray-300">24/7 fraud protection</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-6 text-sm text-gray-500 font-bold">
            <span>Member FDIC</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>Equal Housing Lender</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 flex items-center justify-between border-b border-white/5">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-r from-[#5c0f28] via-[#b22234] via-[#3c3b6e] to-[#001a3d]   rounded-xl bg-[length:200%_200%] flex items-center justify-center text-white font-bold font-syne text-xl shadow-lg shadow-black/10">
              U
            </div>
            <div>
              <div className="font-syne font-bold tracking-tight text-sm">United Mississippi Bank</div>
              <div className="text-[9px] text-[#b22234] font-bold tracking-[0.15em] uppercase">Banking</div>
            </div>
          </Link>
          <Link href="/signup" className="text-sm text-[#b22234] font-bold">
            Sign Up
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-syne font-bold tracking-tight mb-2">Welcome back</h2>
              <p className="text-gray-500">Sign in to access your accounts</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#b22234]/50 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#b22234]/50 transition-colors pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#b22234] focus:ring-[#b22234]/50"
                  />
                  <span className="text-sm text-gray-500">Remember me</span>
                </label>
                <a href="#" className="text-sm text-[#b22234] hover:text-[#b22234]/80 transition-colors font-medium">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary-custom-dashboard text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center hidden lg:block">
              <p className="text-gray-500 text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-[#b22234] hover:text-[#b22234]/80 font-bold transition-colors">
                  Open Account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden p-4 border-t border-white/5 text-center">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
            <span>Member FDIC</span>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span>Equal Housing Lender</span>
          </div>
        </div>
      </div>
    </div>
  );
}