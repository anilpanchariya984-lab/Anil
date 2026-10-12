import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Smartphone, 
  Laptop, 
  X, 
  CheckCircle, 
  Sparkles, 
  FileText, 
  Share2, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { PROMPTS_DATA } from '../data/prompts';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'hi' | 'en';
  isVip: boolean;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose, lang, isVip }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  if (!isOpen) return null;

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // In browser preview environments, guide user or show instructions
      alert(
        lang === 'hi' 
          ? '📱 अपने मोबाइल में Chrome मेनू (⋮) खोलें और "Add to Home screen" / "Install App" पर टैप करें।' 
          : '📱 Open browser menu (⋮) and tap "Add to Home Screen" or "Install App" to install PromptMaster on your phone.'
      );
    }
  };

  const handleDownloadVault = () => {
    // Generate an offline VIP bundle JSON file
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(PROMPTS_DATA, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "PromptMaster_VIP_Secret_Prompts.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {isVip ? '₹10 Paid · Verified License' : 'Instant App Installation'}
                </span>
              </div>
              <h2 className="text-base font-bold text-white">
                {lang === 'hi' ? 'प्रॉम्प्टमास्टर ऐप इंस्टॉल व डाउनलोड करें' : 'Install PromptMaster AI App'}
              </h2>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Main Install Button */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {lang === 'hi' ? 'फोन की होम स्क्रीन पर सीधे इंस्टॉल करें' : 'Install Directly to Mobile Home Screen'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                {lang === 'hi'
                  ? 'यह ऐप बिना किसी इंटरनेट रुकावट के एकदम फास्ट खुलेगा और सभी सीक्रेट प्रॉम्प्ट्स हमेशा आपके पास रहेंगे।'
                  : 'Fast native-grade experience with offline support and instant 1-click prompt copying.'}
              </p>
            </div>

            <button
              onClick={handleNativeInstall}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'hi' ? 'इंस्टॉल करें (Install App Now)' : 'Install App to Device'}</span>
            </button>
          </div>

          {/* Quick Step-by-Step for Android / iPhone */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">
              {lang === 'hi' ? '📲 प्ले स्टोर / क्रोम में 3 सेकंड में जोड़ने का तरीका:' : '📲 Quick 3-Second Install Steps:'}
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
                <span className="font-semibold text-amber-400 flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5" />
                  Android / Chrome
                </span>
                <p className="text-slate-400 text-[11px]">
                  {lang === 'hi' 
                    ? 'ब्राउज़र के ऊपर (⋮) तीन बिंदुओं पर क्लिक करें -> "Install App" या "Add to Home screen" चुनें।' 
                    : 'Tap Chrome menu (⋮) -> Select "Install App" or "Add to Home screen".'}
                </p>
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
                <span className="font-semibold text-blue-400 flex items-center gap-1">
                  <Share2 className="w-3.5 h-3.5" />
                  iPhone / Safari
                </span>
                <p className="text-slate-400 text-[11px]">
                  {lang === 'hi'
                    ? 'सफारी के नीचे शेयर बटन (Share) दबाएं -> "Add to Home Screen" पर टैप करें।'
                    : 'Tap Safari Share icon -> Tap "Add to Home Screen".'}
                </p>
              </div>
            </div>
          </div>

          {/* Offline Prompts Vault Backup */}
          <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-xs font-semibold text-white block">
                  {lang === 'hi' ? 'ऑफलाइन VIP प्रॉम्प्ट्स बैकअप (JSON)' : 'Offline VIP Prompts Vault (JSON)'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {lang === 'hi' ? 'सभी सीक्रेट प्रॉम्प्ट्स को अपने फोन में सेव करें' : 'Download all secret prompts offline'}
                </span>
              </div>
            </div>

            <button
              onClick={handleDownloadVault}
              className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 flex items-center gap-1 transition-colors"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
