import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, ArrowRight, ShieldAlert, KeyRound, AlertCircle, Sparkles } from 'lucide-react';
import { useBrand } from '../context/BrandContext';
import { AdminDashboard } from './AdminDashboard';

interface AdminPortalProps {
  onBackToStore: () => void;
}

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 30;

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToStore }) => {
  const { config, isAdminAuthenticated, login, logout, adminUsername } = useBrand();

  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  // Handle countdown timer if locked out
  useEffect(() => {
    if (lockoutTimer <= 0) return;
    const interval = setInterval(() => {
      setLockoutTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setFailedAttempts(0);
          setErrorMessage(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTimer > 0) return;

    setErrorMessage(null);
    setIsVerifying(true);

    // Minor delay to feel like genuine secure verification & prevent rapid automated brute-force
    setTimeout(() => {
      const isSuccess = login(passwordInput.trim());

      if (isSuccess) {
        setIsVerifying(false);
        setPasswordInput('');
        setFailedAttempts(0);
        setErrorMessage(null);
      } else {
        setIsVerifying(false);
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);

        if (newAttempts >= MAX_FAILED_ATTEMPTS) {
          setLockoutTimer(LOCKOUT_SECONDS);
          setErrorMessage(`تم تجاوز الحد الأقصى للمحاولات. يرجى الانتظار ${LOCKOUT_SECONDS} ثانية قبل المحاولة مجدداً.`);
        } else {
          setErrorMessage(
            `كلمة المرور غير صحيحة. تم رفض الوصول. (محاولة ${newAttempts} من ${MAX_FAILED_ATTEMPTS})`
          );
        }
      }
    }, 350);
  };

  // If authenticated, grant access to the full Admin Dashboard
  if (isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#22120C] text-[#F8F3EC]">
        {/* Dedicated Admin Top Navigation Strip */}
        <div className="bg-[#3B1E14] border-b border-[#C49A6C]/30 px-4 sm:px-6 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-[#C49A6C] text-[#22120C] font-serif font-bold flex items-center justify-center shrink-0">
              NW
            </div>
            <div>
              <span className="font-serif text-[#F8F3EC] text-sm font-medium">
                NOOM WEAR Atelier Control Room
              </span>
              <span className="text-[#DFC4A5]/70 block text-[10px]">
                الجلسة مفعلة كمسؤول · <strong className="text-[#F8F3EC]">{adminUsername}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onBackToStore}
              className="text-[#DFC4A5] hover:text-[#F8F3EC] transition-colors flex items-center gap-1.5 text-xs py-1"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">مشاهدة المتجر كعميل</span>
              <span className="sm:hidden">المتجر</span>
            </button>
            <button
              onClick={logout}
              className="px-3 py-1.5 bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-500/30 text-xs transition-colors"
            >
              تسجيل الخروج (Lock)
            </button>
          </div>
        </div>

        {/* Standalone Dashboard View */}
        <AdminDashboard isStandalone onExitAdmin={onBackToStore} />
      </div>
    );
  }

  // Unauthorized Access Challenge (Strict Password Gate)
  return (
    <div className="min-h-screen bg-[#1E0F09] text-[#F8F3EC] flex flex-col justify-between p-4 sm:p-8 relative selection:bg-[#C49A6C]/30 selection:text-[#F8F3EC]">
      {/* Ambient Luxury Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C49A6C]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Storefront Back Link */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {config.assets.logo ? (
            <img
              src={config.assets.logo}
              alt="NOOM WEAR"
              className="h-9 w-auto brightness-110 mix-blend-screen"
            />
          ) : null}
        </div>
        <button
          onClick={onBackToStore}
          className="text-xs uppercase tracking-widest text-[#DFC4A5] hover:text-[#F8F3EC] transition-colors flex items-center gap-2 border-b border-[#C49A6C]/40 pb-0.5"
        >
          <span>العودة للمتجر</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Password Authentication Card */}
      <div className="max-w-md w-full mx-auto my-12 bg-[#F8F3EC] text-[#3B1E14] border border-[#C49A6C]/40 shadow-2xl p-7 sm:p-10 relative z-10">
        <div className="text-center mb-7">
          <div className="w-14 h-14 bg-[#3B1E14] text-[#C49A6C] mx-auto flex items-center justify-center mb-4 shadow-md">
            <Lock className="w-7 h-7" />
          </div>
          <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-[#C49A6C] font-semibold mb-1">
            Private Atelier Gateway
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#3B1E14] font-medium tracking-tight">
            بوابة الإدارة المحمية
          </h1>
          <p className="text-xs text-[#603A2A] mt-2 leading-relaxed">
            الوصول مقيد لإدارة NOOM WEAR فقط. يرجى إدخال كلمة المرور السرية لفتح لوحة التحكم.
          </p>
        </div>

        {/* Error / Lockout Alert */}
        {errorMessage && (
          <div className="mb-6 p-3.5 bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-start gap-2.5 leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{errorMessage}</p>
              {lockoutTimer > 0 && (
                <p className="mt-1 text-[11px] font-mono text-rose-700">
                  إعادة المحاولة متاحة بعد: {lockoutTimer} ثانية
                </p>
              )}
            </div>
          </div>
        )}

        {/* Password Form */}
        <form onSubmit={handlePasswordSubmit} className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-semibold">
                كلمة المرور (Admin Password)
              </label>
              <span className="text-[11px] text-[#603A2A]/70">مشفر ومحمي</span>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                disabled={lockoutTimer > 0 || isVerifying}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="أدخل كلمة المرور..."
                className="w-full px-4 py-3 pl-10 pr-10 border border-[#C49A6C]/40 bg-white text-sm focus:outline-none focus:border-[#3B1E14] text-[#3B1E14] disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
              />
              <KeyRound className="w-4 h-4 text-[#603A2A]/50 absolute left-3 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-[#603A2A]/60 hover:text-[#3B1E14] transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={lockoutTimer > 0 || isVerifying || !passwordInput.trim()}
            className="w-full py-3.5 bg-[#3B1E14] text-[#F8F3EC] hover:bg-[#603A2A] disabled:bg-[#3B1E14]/40 disabled:cursor-not-allowed transition-colors text-xs uppercase tracking-[0.2em] font-semibold shadow-md flex items-center justify-center gap-2 mt-6"
          >
            {isVerifying ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-[#F8F3EC]/30 border-t-[#F8F3EC] rounded-full animate-spin" />
                <span>جاري التحقق...</span>
              </span>
            ) : (
              <>
                <Lock className="w-4 h-4 text-[#C49A6C]" />
                <span>تأكيد والدخول للوحة التحكم</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-5 border-t border-[#C49A6C]/25 text-center">
          <p className="text-[11px] text-[#603A2A]/80">
            تضمن هذه البوابة عدم قدرة أي زائر غير مصرح له على تعديل المنتجات أو الأسعار حتى لو عرف الرابط.
          </p>
        </div>
      </div>

      {/* Footer Notice */}
      <div className="text-center text-xs text-[#DFC4A5]/60 font-light pb-2">
        © {new Date().getFullYear()} {config.name} Atelier Control · Private Admin Access
      </div>
    </div>
  );
};
