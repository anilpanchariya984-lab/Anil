import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Download, 
  Copy, 
  Sliders, 
  Search, 
  Bookmark, 
  Check, 
  Zap, 
  SlidersHorizontal,
  ArrowRight,
  Flame,
  HelpCircle,
  Smartphone
} from 'lucide-react';
import { PROMPTS_DATA, PROMPT_CATEGORIES, PromptItem } from './data/prompts';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PromptCard } from './components/PromptCard';
import { PaymentModal } from './components/PaymentModal';
import { InstallModal } from './components/InstallModal';
import { PromptCustomizerModal } from './components/PromptCustomizerModal';
import { PromptGeneratorModal } from './components/PromptGeneratorModal';
import { ToolsGuideSection } from './components/ToolsGuideSection';

export default function App() {
  const [lang, setLang] = useState<'hi' | 'en'>('hi');
  const [isVipUnlocked, setIsVipUnlocked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVipOnly, setFilterVipOnly] = useState(false);
  const [filterBookmarksOnly, setFilterBookmarksOnly] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  
  // Modals state
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [customizingPrompt, setCustomizingPrompt] = useState<PromptItem | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedCount, setCopiedCount] = useState<number>(0);

  // Load persistence
  useEffect(() => {
    try {
      const savedVip = localStorage.getItem('promptmaster_vip_unlocked') === 'true';
      setIsVipUnlocked(savedVip);

      const savedBookmarks = localStorage.getItem('promptmaster_bookmarks');
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }

      const savedCopies = localStorage.getItem('promptmaster_copy_count');
      if (savedCopies) {
        setCopiedCount(parseInt(savedCopies, 10));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCopySuccess = () => {
    const newCount = copiedCount + 1;
    setCopiedCount(newCount);
    try {
      localStorage.setItem('promptmaster_copy_count', newCount.toString());
    } catch (e) {
      console.error(e);
    }
    triggerToast(
      lang === 'hi' 
        ? '✅ प्रॉम्प्ट कॉपी हो गया! अब Kling, Runway या Midjourney में पेस्ट करें।' 
        : '✅ Prompt copied! Ready to paste in Kling, Runway, or Midjourney.'
    );
  };

  const handleToggleBookmark = (id: string) => {
    const updated = bookmarks.includes(id) 
      ? bookmarks.filter(b => b !== id) 
      : [...bookmarks, id];
    setBookmarks(updated);
    try {
      localStorage.setItem('promptmaster_bookmarks', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handlePaymentSuccess = () => {
    setIsVipUnlocked(true);
    setIsPaymentOpen(false);
    triggerToast(
      lang === 'hi'
        ? '🎉 ₹10 VIP एक्सेस सक्रिय! सभी सीक्रेट प्रॉम्प्ट्स अनलॉक हो गए।'
        : '🎉 VIP Pass Active! All secret prompts unlocked.'
    );
    // After payment, open the installation modal for Play Store / PWA install
    setTimeout(() => {
      setIsInstallOpen(true);
    }, 400);
  };

  // Filtered prompt list
  const filteredPrompts = PROMPTS_DATA.filter((prompt) => {
    if (selectedCategory !== 'all' && prompt.category !== selectedCategory) {
      return false;
    }
    if (filterVipOnly && !prompt.isVip) {
      return false;
    }
    if (filterBookmarksOnly && !bookmarks.includes(prompt.id)) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = prompt.title.toLowerCase().includes(q) || prompt.titleHi.toLowerCase().includes(q);
      const matchDesc = prompt.description.toLowerCase().includes(q) || prompt.descriptionHi.toLowerCase().includes(q);
      const matchPrompt = prompt.defaultPrompt.toLowerCase().includes(q);
      const matchTags = prompt.tags.some(t => t.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchPrompt || matchTags;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Navbar */}
      <Navbar
        isVipUnlocked={isVipUnlocked}
        lang={lang}
        onToggleLang={() => setLang(prev => prev === 'hi' ? 'en' : 'hi')}
        onOpenPayment={() => setIsPaymentOpen(true)}
        onOpenInstall={() => setIsInstallOpen(true)}
        onOpenGenerator={() => setIsGeneratorOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        lang={lang}
        isVipUnlocked={isVipUnlocked}
        onOpenPayment={() => setIsPaymentOpen(true)}
        onOpenGenerator={() => setIsGeneratorOpen(true)}
        onOpenInstall={() => setIsInstallOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8" id="prompts-grid">
        {/* Category Filter Bar & Badges */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                <span>{lang === 'hi' ? 'सीक्रेट AI प्रॉम्प्ट्स लाइब्रेरी' : 'Curated Prompts Library'}</span>
                <span className="text-xs font-mono text-slate-400 font-normal">
                  ({filteredPrompts.length} {lang === 'hi' ? 'प्रॉम्प्ट्स' : 'prompts'})
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'hi'
                  ? 'अद्वितीय प्रॉम्प्ट्स जो केवल प्रोफेशनल्स और टॉप क्रिएटर्स इस्तेमाल करते हैं'
                  : 'Exclusive prompts engineered for high visual impact and photorealism'}
              </p>
            </div>

            {/* Quick toggles */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => setFilterVipOnly(!filterVipOnly)}
                className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                  filterVipOnly
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'hi' ? 'सिर्फ VIP प्रॉम्प्ट्स' : 'VIP Only'}</span>
              </button>

              <button
                onClick={() => setFilterBookmarksOnly(!filterBookmarksOnly)}
                className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                  filterBookmarksOnly
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'hi' ? 'सेव किए गए' : 'Saved'}</span>
              </button>
            </div>
          </div>

          {/* Category Tabs (Segmented Controls) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
            {PROMPT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`py-2 px-3.5 rounded-xl whitespace-nowrap font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-white text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                {lang === 'hi' ? cat.labelHi : cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Prompts Grid */}
        {filteredPrompts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPrompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                isVipUnlocked={isVipUnlocked}
                lang={lang}
                onCustomize={(p) => setCustomizingPrompt(p)}
                onOpenPayment={() => setIsPaymentOpen(true)}
                onCopySuccess={handleCopySuccess}
                isBookmarked={bookmarks.includes(prompt.id)}
                onToggleBookmark={handleToggleBookmark}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-slate-900/40 border border-slate-800 rounded-2xl p-8 space-y-3">
            <Search className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">
              {lang === 'hi' ? 'कोई प्रॉम्प्ट नहीं मिला' : 'No Prompts Found'}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {lang === 'hi'
                ? 'कृपया अलग शब्द सर्च करें या फ़िल्टर हटाकर सभी प्रॉम्प्ट्स देखें।'
                : 'Try searching with different keywords or reset your filters.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setFilterVipOnly(false);
                setFilterBookmarksOnly(false);
              }}
              className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
            >
              {lang === 'hi' ? 'फ़िल्टर रीसेट करें' : 'Reset Filters'}
            </button>
          </div>
        )}

        {/* VIP Pass Promo Banner if not unlocked */}
        {!isVipUnlocked && (
          <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-amber-500/10 border border-amber-500/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  Google Play Store VIP License
                </span>
                <span className="text-xs text-slate-400">· Lifetime Access</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {lang === 'hi' ? 'सिर्फ ₹10 में प्ले स्टोर ऐप डाउनलोड और सभी VIP सीक्रेट प्रॉम्प्ट्स पाएं' : 'Get Full VIP Vault & Play Store App Download for Just ₹10'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                {lang === 'hi'
                  ? 'सुरक्षित UPI, Google Pay, PhonePe या QR कोड से एक बार ₹10 का भुगतान करें और ऐप को अपने मोबाइल पर सीधे इंस्टॉल करें।'
                  : 'Pay once via secure UPI or GPay to unlock all hidden video prompts, 8K photo formulas, and native app download.'}
              </p>
            </div>

            <button
              onClick={() => setIsPaymentOpen(true)}
              className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-transform active:scale-[0.98] shrink-0"
            >
              <Zap className="w-4 h-4 text-slate-950" />
              <span>{lang === 'hi' ? '₹10 का VIP अनलॉक लें' : 'Unlock for ₹10 Now'}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        )}

        {/* Tools Guide & Step-by-Step Tutorial */}
        <ToolsGuideSection lang={lang} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 sm:px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-white">PromptMaster AI</span>
            <span>·</span>
            <span>{lang === 'hi' ? 'सीक्रेट AI वीडियो व इमेज प्रॉम्प्ट्स' : 'Secret AI Prompts Hub'}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Play Store Verified</span>
            <span>·</span>
            <span>UPI & NPCI Secure</span>
            <span>·</span>
            <button 
              onClick={() => setIsInstallOpen(true)}
              className="hover:text-amber-400 transition-colors"
            >
              {lang === 'hi' ? 'ऐप इंस्टॉल गाइड' : 'Install Guide'}
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onSuccess={handlePaymentSuccess}
        lang={lang}
      />

      <InstallModal
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
        lang={lang}
        isVip={isVipUnlocked}
      />

      <PromptCustomizerModal
        promptItem={customizingPrompt}
        isOpen={!!customizingPrompt}
        onClose={() => setCustomizingPrompt(null)}
        lang={lang}
        onCopySuccess={handleCopySuccess}
      />

      <PromptGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        lang={lang}
      />

      {/* Floating Copy Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-amber-500/40 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
