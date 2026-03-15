"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  ShieldCheck,
  CreditCard,
  Smartphone,
  ChevronLeft,
} from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const supabase = createClient();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    accountType: "personal",
    agreeToTerms: false,
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        setError("Please fill in all fields");
        return;
      }
      setStep(2);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          account_type: formData.accountType,
        },
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  const features = [
    { icon: ShieldCheck, title: "FDIC Insured", desc: "Up to $250,000" },
    { icon: CreditCard, title: "No Monthly Fees", desc: "Zero maintenance" },
    { icon: Smartphone, title: "Mobile Banking", desc: "Bank anywhere" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-urbanist">
      {/* Left Panel - Branding (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#5c0f28]/20 via-transparent to-[#3c3b6e]/20" />
        
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
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#3c3b6e]/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-[#b22234]/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '0.7s' }} />

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
              Start Your<br />
              <span className="bg-linear-to-r from-[#5c0f28] via-[#b22234] via-[#3c3b6e] to-[#001a3d] bg-clip-text text-transparent bg-[length:200%_200%] animate-gradientShift">
                Financial Journey
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-md">
              Open your account in minutes and join thousands who trust United Mississippi Bank.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#b22234]/10 flex items-center justify-center">
                    <feature.icon size={20} className="text-[#b22234]" />
                  </div>
                  <div>
                    <span className="text-gray-200 font-bold">{feature.title}</span>
                    <span className="text-gray-500 ml-2">— {feature.desc}</span>
                  </div>
                </div>
              ))}
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

      {/* Right Panel - Signup Form */}
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
          <Link href="/login" className="text-sm text-[#b22234] font-bold">
            Sign In
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-md">
            {/* Progress Steps */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= 1 ? "bg-[#b22234] text-white" : "bg-white/10 text-gray-500"
                }`}>
                  {step > 1 ? <Check size={16} /> : "1"}
                </div>
                <span className={`text-sm ${step >= 1 ? "text-white font-medium" : "text-gray-500"}`}>Info</span>
              </div>
              <div className="flex-1 h-px bg-white/10" />
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= 2 ? "bg-[#b22234] text-white" : "bg-white/10 text-gray-500"
                }`}>
                  2
                </div>
                <span className={`text-sm ${step >= 2 ? "text-white font-medium" : "text-gray-500"}`}>Security</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-syne font-bold tracking-tight mb-2">
                {step === 1 ? "Create your account" : "Secure your account"}
              </h2>
              <p className="text-gray-500 text-sm md:text-base">
                {step === 1 ? "Enter your personal information to get started" : "Create a strong password to protect your account"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              {step === 1 ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">First Name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="John"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#b22234]/50 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#b22234]/50 transition-colors"
                        required
                      />
                    </div>
                  </div>

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
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#b22234]/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">Account Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, accountType: "personal" })}
                        className={`p-4 rounded-xl border transition-all text-left cursor-pointer ${
                          formData.accountType === "personal"
                            ? "bg-[#b22234]/10 border-[#b22234]/50"
                            : "bg-white/5 border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className={`font-bold text-sm ${formData.accountType === "personal" ? "text-[#b22234]" : "text-white"}`}>
                          Personal
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">For individual use</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, accountType: "business" })}
                        className={`p-4 rounded-xl border transition-all text-left cursor-pointer ${
                          formData.accountType === "business"
                            ? "bg-[#b22234]/10 border-[#b22234]/50"
                            : "bg-white/5 border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className={`font-bold text-sm ${formData.accountType === "business" ? "text-[#b22234]" : "text-white"}`}>
                          Business
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">For companies</div>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
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

                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">Confirm Password</label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#b22234]/50 transition-colors"
                      required
                    />
                  </div>

                  {/* Password Requirements */}
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-2">Password Requirements</div>
                    {[
                      { met: formData.password.length >= 8, text: "At least 8 characters" },
                      { met: /[A-Z]/.test(formData.password), text: "One uppercase letter" },
                      { met: /[0-9]/.test(formData.password), text: "One number" },
                    ].map((req, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                          req.met ? "bg-emerald-500" : "bg-white/10"
                        }`}>
                          {req.met && <Check size={10} className="text-white" />}
                        </div>
                        <span className={req.met ? "text-emerald-400" : "text-gray-500"}>{req.text}</span>
                      </div>
                    ))}
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                      className="w-5 h-5 mt-0.5 rounded border-white/20 bg-white/5 text-[#b22234] focus:ring-[#b22234]/50"
                    />
                    <span className="text-sm text-gray-400">
                      I agree to the{" "}
                      <a href="#" className="text-[#b22234] hover:underline">Terms of Service</a>
                      {" "}and{" "}
                      <a href="#" className="text-[#b22234] hover:underline">Privacy Policy</a>
                    </span>
                  </label>
                </>
              )}

              <div className="flex gap-2 pt-2">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-12 h-14 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={20} className="text-gray-400 " />
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 btn-primary-custom-dashboard text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      {step === 1 ? "Continue" : "Create Account"}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform " />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center hidden lg:block">
              <p className="text-gray-500 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-[#b22234] hover:text-[#b22234]/80 font-bold transition-colors">
                  Sign In
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