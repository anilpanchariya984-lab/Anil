import React from 'react';
import { Sparkles, Download, ShieldCheck, Languages } from 'lucide-react';

interface NavbarProps {
  isVipUnlocked: boolean;
  lang: 'hi' | 'en';
  onToggleLang: () => void;
  onOpenPayment: () => void;
  onOpenInstall: () => void;
  onOpenGenerator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isVipUnlocked,
  lang,
  onToggleLang,
  onOpenPayment,
  onOpenInstall,
  onOpenGenerator
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark */}
        <a 
          href="/" 
          className="text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-md">
            <Sparkles className="w-4 h-4 text-slate-950" />
          </span>
          <span className="group-hover:text-amber-400 transition-colors">
            PromptMaster<span className="text-amber-500">.ai</span>
          </span>
        </a>

        {/* Zone 2: 4–5 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          <a href="#prompts-grid" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            {lang === 'hi' ? 'सीक्रेट प्रॉम्प्ट्स' : 'Prompts Vault'}
          </a>
          <button 
            type="button" 
            onClick={onOpenGenerator}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 text-left"
          >
            {lang === 'hi' ? 'AI प्रॉम्प्ट जनरेटर' : 'AI Generator'}
          </button>
          <a href="#tools-guide" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            {lang === 'hi' ? 'वीडियो/इमेज गाइड' : 'Tools Guide'}
          </a>
          <button 
            type="button" 
            onClick={onOpenInstall}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 text-left"
          >
            {lang === 'hi' ? 'ऐप डाउनलोड' : 'App Download'}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Subtle Hindi / English switch */}
          <button
            onClick={onToggleLang}
            className="py-1.5 px-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 font-medium flex items-center gap-1.5 transition-colors"
            title="Switch Language"
          >
            <Languages className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'hi' ? 'EN' : 'हिंदी'}</span>
          </button>

          {isVipUnlocked ? (
            <button
              onClick={onOpenInstall}
              className="py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-transform active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'ऐप इंस्टॉल करें (VIP)' : 'Install App'}</span>
            </button>
          ) : (
            <button
              onClick={onOpenPayment}
              className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/15 flex items-center gap-1.5 transition-transform active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
              <span>{lang === 'hi' ? '₹10 VIP अनलॉक' : 'Unlock VIP (₹10)'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
