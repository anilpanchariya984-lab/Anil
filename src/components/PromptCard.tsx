import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Lock, 
  Sliders, 
  ExternalLink, 
  Sparkles, 
  Video, 
  Image as ImageIcon,
  Bookmark,
  Share2
} from 'lucide-react';
import { PromptItem } from '../data/prompts';

interface PromptCardProps {
  prompt: PromptItem;
  isVipUnlocked: boolean;
  lang: 'hi' | 'en';
  onCustomize: (prompt: PromptItem) => void;
  onOpenPayment: () => void;
  onCopySuccess: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  isVipUnlocked,
  lang,
  onCustomize,
  onOpenPayment,
  onCopySuccess,
  isBookmarked,
  onToggleBookmark
}) => {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isLocked = prompt.isVip && !isVipUnlocked;

  const handleCopy = async () => {
    if (isLocked) {
      onOpenPayment();
      return;
    }
    try {
      await navigator.clipboard.writeText(prompt.defaultPrompt);
      setCopied(true);
      onCopySuccess();
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="group relative bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col">
      {/* Visual Media Header */}
      <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
        {!imageError ? (
          <img
            src={prompt.image}
            alt={prompt.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isLocked ? 'blur-md brightness-50' : ''
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 p-4 text-center">
            <Sparkles className="w-8 h-8 text-amber-400/60 mb-2" />
            <span className="text-xs text-slate-400 font-medium">{prompt.categoryLabel}</span>
          </div>
        )}

        {/* Media Type & Aspect Overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-200 text-[11px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
            {prompt.mediaType === 'video' ? (
              <Video className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
            )}
            <span>{prompt.mediaType === 'video' ? 'AI Video' : '8K Image'}</span>
          </div>

          <span className="bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-300 text-[11px] font-mono px-2 py-1 rounded-lg">
            {prompt.aspectRatio}
          </span>
        </div>

        {/* Bookmark & VIP Marker */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {prompt.isVip && (
            <span className="bg-amber-500/90 backdrop-blur-md text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
              {isVipUnlocked ? 'VIP UNLOCKED' : '₹10 VIP SECRET'}
            </span>
          )}

          <button
            onClick={() => onToggleBookmark(prompt.id)}
            className="p-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
            title="Bookmark"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        </div>

        {/* VIP Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm text-center">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-2">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              {lang === 'hi' ? 'सीक्रेट वीआईपी प्रॉम्प्ट' : 'VIP Secret Prompt'}
            </h4>
            <p className="text-[11px] text-slate-300 mb-3 max-w-[200px]">
              {lang === 'hi' ? '₹10 में ऐप व सभी सीक्रेट प्रॉम्प्ट्स अनलॉक करें' : 'Unlock with ₹10 Play Store Pass'}
            </p>
            <button
              onClick={onOpenPayment}
              className="py-1.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? '₹10 में अनलॉक करें' : 'Unlock for ₹10'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata Discipline: Clean unboxed text with subtle typographic separators */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
            <span>{prompt.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400 font-mono text-[11px]">{prompt.toolTarget}</span>
          </div>

          <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
            {lang === 'hi' ? prompt.titleHi : prompt.title}
          </h3>

          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {lang === 'hi' ? prompt.descriptionHi : prompt.description}
          </p>
        </div>

        {/* Prompt Preview Snippet */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-2.5 font-mono text-[11px] text-slate-300 line-clamp-2 select-all">
          {isLocked ? '••••••••••••••••••••••••••••••••••••••••••••••••••••' : prompt.defaultPrompt}
        </div>

        {/* Action Controls */}
        <div className="pt-1 flex items-center justify-between gap-2 border-t border-slate-800/60">
          <button
            onClick={() => {
              if (isLocked) onOpenPayment();
              else onCustomize(prompt);
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'hi' ? 'कस्टमाइज़ करें' : 'Customize'}</span>
          </button>

          <button
            onClick={handleCopy}
            className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-transform active:scale-[0.98] flex items-center justify-center gap-1.5 ${
              isLocked
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30'
                : copied
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/10'
            }`}
          >
            {isLocked ? (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>₹10 Unlock</span>
              </>
            ) : copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'कॉपी हो गया' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'कॉपी प्रॉम्प्ट' : 'Copy Prompt'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
