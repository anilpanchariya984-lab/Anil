import React from 'react';
import { 
  Sparkles, 
  Search, 
  Download, 
  ShieldCheck, 
  Play, 
  Zap, 
  SlidersHorizontal,
  Flame
} from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  lang: 'hi' | 'en';
  isVipUnlocked: boolean;
  onOpenPayment: () => void;
  onOpenGenerator: () => void;
  onOpenInstall: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  lang,
  isVipUnlocked,
  onOpenPayment,
  onOpenGenerator,
  onOpenInstall
}) => {
  return (
    <section className="relative pt-10 pb-12 overflow-hidden border-b border-slate-800/80">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-amber-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Trust marker strip */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{lang === 'hi' ? 'Google Play स्टोर वेरीफाइड ऐप' : 'Google Play Store Verified'}</span>
          <span className="text-slate-600">·</span>
          <span className="text-amber-400 font-semibold">{lang === 'hi' ? 'सिर्फ ₹10 लाइफटाइम एक्सेस' : 'Only ₹10 Lifetime'}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto text-balance">
          {lang === 'hi' ? (
            <>
              सीक्रेट <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">AI प्रॉम्प्ट्स</span> जो कहीं नहीं मिलेंगे!
            </>
          ) : (
            <>
              Secret <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">AI Prompts</span> That Exist Nowhere Else
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {lang === 'hi' ? (
            'एक क्लिक में प्रॉम्प्ट कॉपी करें और Kling, Runway Gen-3 व Midjourney से वायरल इंस्टाग्राम रील्स और 8K फ़ोटो बनाएं। प्ले स्टोर से डाउनलोड करने के लिए ₹10 का VIP अनलॉक लें।'
          ) : (
            'Copy master prompts in 1-click to generate viral 4K videos & photorealistic 8K imagery on Midjourney, Runway, Kling & Sora. Unlock VIP access for just ₹10.'
          )}
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'hi' 
                  ? 'सर्च करें: वायरल वीडियो, 8K पोर्ट्रेट, महादेव, साइबरपंक, 3D पिक्सर...' 
                  : 'Search prompts: viral reels, 8k portrait, mythic shiva, cyberpunk...'
              }
              className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-xl"
            />
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenGenerator}
            className="py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-white flex items-center gap-2 transition-colors shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{lang === 'hi' ? 'नया AI प्रॉम्प्ट बनाएं' : 'Generate with Gemini AI'}</span>
          </button>

          {!isVipUnlocked ? (
            <button
              onClick={onOpenPayment}
              className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-transform active:scale-[0.98]"
            >
              <Zap className="w-4 h-4" />
              <span>{lang === 'hi' ? '₹10 में ऐप व VIP प्रॉम्प्ट्स अनलॉक करें' : 'Unlock App & VIP Vault for ₹10'}</span>
            </button>
          ) : (
            <button
              onClick={onOpenInstall}
              className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-transform active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'hi' ? 'ऐप इंस्टॉल करें (VIP Active)' : 'Download & Install App'}</span>
            </button>
          )}
        </div>

        {/* Clean Editorial Metrics */}
        <div className="pt-6 grid grid-cols-3 max-w-lg mx-auto gap-4 text-center border-t border-slate-800/60 font-mono text-xs">
          <div>
            <div className="text-lg font-bold text-white tabular-nums">50+</div>
            <div className="text-slate-400 text-[11px] font-sans">
              {lang === 'hi' ? 'टेस्टेड सीक्रेट प्रॉम्प्ट्स' : 'Secret Prompts'}
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-amber-400 tabular-nums">₹10</div>
            <div className="text-slate-400 text-[11px] font-sans">
              {lang === 'hi' ? 'लाइफटाइम VIP पास' : 'Lifetime Access'}
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-emerald-400 tabular-nums">4.9★</div>
            <div className="text-slate-400 text-[11px] font-sans">
              {lang === 'hi' ? 'प्ले स्टोर रेटिंग' : 'Play Store Rating'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
