import React, { useState, useEffect } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Video, 
  Image as ImageIcon, 
  Sliders, 
  Sparkles, 
  Compass, 
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { PromptItem, AI_TOOLS_LIST } from '../data/prompts';

interface PromptCustomizerModalProps {
  promptItem: PromptItem | null;
  isOpen: boolean;
  onClose: () => void;
  lang: 'hi' | 'en';
  onCopySuccess: () => void;
}

export const PromptCustomizerModal: React.FC<PromptCustomizerModalProps> = ({
  promptItem,
  isOpen,
  onClose,
  lang,
  onCopySuccess
}) => {
  const [selectedVariables, setSelectedVariables] = useState<Record<string, string>>({});
  const [copiedMain, setCopiedMain] = useState(false);
  const [copiedNegative, setCopiedNegative] = useState(false);
  const [activeTab, setActiveTab] = useState<'prompt' | 'negative' | 'tools'>('prompt');

  useEffect(() => {
    if (promptItem) {
      const initial: Record<string, string> = {};
      promptItem.variables.forEach(v => {
        initial[v.key] = v.defaultValue;
      });
      setSelectedVariables(initial);
      setCopiedMain(false);
      setCopiedNegative(false);
    }
  }, [promptItem]);

  if (!isOpen || !promptItem) return null;

  // Compute live customized prompt
  let livePrompt = promptItem.promptTemplate;
  Object.keys(selectedVariables).forEach(key => {
    livePrompt = livePrompt.replace(`{${key}}`, selectedVariables[key] || '');
  });

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(livePrompt);
      setCopiedMain(true);
      onCopySuccess();
      setTimeout(() => setCopiedMain(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyNegative = async () => {
    try {
      await navigator.clipboard.writeText(promptItem.negativePrompt);
      setCopiedNegative(true);
      setTimeout(() => setCopiedNegative(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{promptItem.categoryLabel}</span>
                <span>·</span>
                <span className="text-amber-400 font-medium">{promptItem.toolTarget}</span>
              </div>
              <h2 className="text-base font-bold text-white">
                {lang === 'hi' ? promptItem.titleHi : promptItem.title}
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

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Variable Customizer Options */}
          {promptItem.variables.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  {lang === 'hi' ? 'प्रॉम्प्ट कस्टमाइज़र (बदलाव करें):' : 'Customize Prompt Variables:'}
                </span>
                <span className="text-xs text-slate-400">
                  {lang === 'hi' ? 'विकल्प चुनकर नया रूप दें' : 'Click to customize elements'}
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {promptItem.variables.map((variable) => (
                  <div key={variable.key} className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 space-y-1.5">
                    <label className="text-xs font-medium text-slate-300 block">
                      {lang === 'hi' ? variable.labelHi : variable.label}:
                    </label>
                    <select
                      value={selectedVariables[variable.key] || variable.defaultValue}
                      onChange={(e) => setSelectedVariables(prev => ({ ...prev, [variable.key]: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      {variable.options.map((opt) => (
                        <option key={opt} value={opt} className="bg-slate-900 text-slate-100">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-Tabs: Live Prompt, Negative Prompt, AI Tools Launcher */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('prompt')}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'prompt' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'hi' ? 'तैयार AI प्रॉम्प्ट (Ready Prompt)' : 'Ready Master Prompt'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('negative')}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'negative' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'hi' ? 'नेगेटिव प्रॉम्प्ट (Negative Prompt)' : 'Negative Prompt'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('tools')}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'tools' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'hi' ? 'सीधे वीडियो/इमेज बनाएं (Launch AI)' : 'Create Video / Image'}
              </button>
            </div>

            {/* Tab 1: Live Prompt */}
            {activeTab === 'prompt' && (
              <div className="space-y-3">
                <div className="relative bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-200 leading-relaxed group">
                  <p className="select-all pr-12">{livePrompt}</p>

                  <button
                    onClick={handleCopyPrompt}
                    className="absolute top-3 right-3 p-2 rounded-lg bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors shadow-sm"
                    title="Copy Prompt"
                  >
                    {copiedMain ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Additional parameters advice */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                  <div className="p-2.5 bg-slate-950/40 border border-slate-800 rounded-lg">
                    <span className="font-semibold text-slate-300 block mb-0.5">
                      {lang === 'hi' ? 'अनुशंसित सेटिंग्स:' : 'Recommended Settings:'}
                    </span>
                    <span className="font-mono text-amber-400">{promptItem.recommendedSettings}</span>
                  </div>

                  {promptItem.cameraMotion && (
                    <div className="p-2.5 bg-slate-950/40 border border-slate-800 rounded-lg">
                      <span className="font-semibold text-slate-300 block mb-0.5">
                        {lang === 'hi' ? 'कैमरा मोशन (Video):' : 'Camera Motion:'}
                      </span>
                      <span className="text-slate-300">{promptItem.cameraMotion}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Negative Prompt */}
            {activeTab === 'negative' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  {lang === 'hi' 
                    ? 'खराब उंगलियां, प्लास्टिक चेहरा या लो-क्वालिटी रोकने के लिए इस नेगेटिव प्रॉम्प्ट को टूल में पेस्ट करें:' 
                    : 'Paste this negative prompt into the tool to prevent distorted hands, blurriness, or low quality:'}
                </p>
                <div className="relative bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-red-300/90 leading-relaxed">
                  <p className="select-all pr-12">{promptItem.negativePrompt}</p>
                  <button
                    onClick={handleCopyNegative}
                    className="absolute top-3 right-3 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    {copiedNegative ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: Launch Tools */}
            {activeTab === 'tools' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  {lang === 'hi' 
                    ? 'प्रॉम्प्ट कॉपी हो गया है! अब नीचे दिए गए किसी भी AI टूल पर क्लिक करें और वहां पेस्ट करके 4K वीडियो या फ़ोटो बनाएं:' 
                    : 'Prompt is ready! Click any AI tool below and paste the prompt to generate your image or video:'}
                </p>

                <div className="grid gap-2 sm:grid-cols-2">
                  {AI_TOOLS_LIST.map((tool) => (
                    <a
                      key={tool.name}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-950/80 border border-slate-800 hover:border-amber-400/60 rounded-xl flex items-center justify-between group transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                            {tool.name}
                          </span>
                          <span className="text-[10px] text-slate-400">· {tool.type}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 block line-clamp-1">
                          {lang === 'hi' ? tool.descHi : tool.desc}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 shrink-0 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            {lang === 'hi' ? 'कॉपी करके कहीं भी इस्तेमाल करें' : 'One-click copy to clipboard'}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPrompt}
              className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md flex items-center gap-2 transition-transform active:scale-[0.98]"
            >
              {copiedMain ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedMain ? (lang === 'hi' ? 'कॉपी हो गया!' : 'Copied!') : (lang === 'hi' ? 'प्रॉम्प्ट कॉपी करें (Copy)' : 'Copy Master Prompt')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
