import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Copy, 
  Check, 
  Video, 
  Image as ImageIcon, 
  ArrowRight,
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import { enhancePromptWithAI } from '../services/gemini';

interface PromptGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'hi' | 'en';
}

export const PromptGeneratorModal: React.FC<PromptGeneratorModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const [userIdea, setUserIdea] = useState('');
  const [targetType, setTargetType] = useState<'image' | 'video'>('video');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{
    prompt: string;
    negativePrompt: string;
    cameraMotion?: string;
    recommendedSettings: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sampleIdeas = [
    { hi: 'हवा में उड़ती हुई स्पोर्ट्स कार जो बादलों के बीच जा रही है', en: 'Flying futuristic supercar racing between sunset clouds' },
    { hi: 'भगवान शिव का 8K सिनेमाई ध्यान शॉट हिमालय पर', en: 'Lord Shiva in deep cosmic meditation atop snowy Himalayas' },
    { hi: 'एक प्यारा बेबी रोबोट जो बारिश में चाय पी रहा है', en: 'Cute baby robot sipping warm Indian chai in rainy street' },
    { hi: 'प्राचीन महल के ऊपर FPV ड्रोन का 60fps स्लो मोशन शॉट', en: 'FPV drone 60fps cinematic dive over ancient royal palace' }
  ];

  const handleGenerate = async (ideaToUse?: string) => {
    const text = ideaToUse || userIdea;
    if (!text.trim()) return;

    setIsGenerating(true);
    setResult(null);

    try {
      const generated = await enhancePromptWithAI(text, targetType);
      setResult(generated);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-amber-400 font-semibold">Gemini AI Prompt Engine</span>
                <span>·</span>
                <span>{lang === 'hi' ? 'तुरंत नया प्रॉम्प्ट बनाएं' : 'Instant AI Prompt Generator'}</span>
              </div>
              <h2 className="text-base font-bold text-white">
                {lang === 'hi' ? 'अपना आइडिया लिखें और मास्टर प्रॉम्प्ट पाएं' : 'Turn Your Raw Idea Into a Master Prompt'}
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

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Media Type Selector */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTargetType('video')}
              className={`py-2 px-4 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                targetType === 'video' 
                  ? 'bg-amber-500 text-slate-950 shadow-md' 
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>{lang === 'hi' ? 'वायरल वीडियो प्रॉम्प्ट (Kling/Runway)' : 'AI Video Prompt'}</span>
            </button>

            <button
              type="button"
              onClick={() => setTargetType('image')}
              className={`py-2 px-4 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                targetType === 'image' 
                  ? 'bg-amber-500 text-slate-950 shadow-md' 
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>{lang === 'hi' ? '8K फ़ोटो प्रॉम्प्ट (Midjourney/Flux)' : '8K Photo Prompt'}</span>
            </button>
          </div>

          {/* Input Area */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300 block">
              {lang === 'hi' 
                ? 'आप क्या बनाना चाहते हैं? (हिंदी या इंग्लिश में सामान्य शब्दों में लिखें):' 
                : 'Describe what you want to create (Hindi or English):'}
            </label>
            <textarea
              rows={3}
              value={userIdea}
              onChange={(e) => setUserIdea(e.target.value)}
              placeholder={lang === 'hi' ? 'उदा: एक उड़ती हुई सुनहरी बिल्ली जो नीले बादलों में खेल रही है...' : 'e.g. A flying golden cat playing amidst surreal blue clouds...'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Quick Idea Inspiration Chips */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              {lang === 'hi' ? 'या इन लोकप्रिय आइडिया पर क्लिक करें:' : 'Or tap a popular idea:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sampleIdeas.map((idea, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    const text = lang === 'hi' ? idea.hi : idea.en;
                    setUserIdea(text);
                    handleGenerate(text);
                  }}
                  className="py-1 px-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-[11px] text-slate-300 border border-slate-800 hover:border-amber-400/50 transition-colors text-left"
                >
                  {lang === 'hi' ? idea.hi : idea.en}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={() => handleGenerate()}
            disabled={isGenerating || !userIdea.trim()}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>{lang === 'hi' ? 'मास्टर प्रॉम्प्ट तैयार हो रहा है...' : 'Crafting Master Prompt...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>{lang === 'hi' ? 'AI प्रॉम्प्ट तैयार करें' : 'Generate Master Prompt'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Result Area */}
          {result && (
            <div className="space-y-3 pt-3 border-t border-slate-800 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400">
                  {lang === 'hi' ? '✨ आपका तैयार AI प्रॉम्प्ट:' : '✨ Ready Master Prompt:'}
                </span>
                <button
                  onClick={handleCopy}
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-200 select-all leading-relaxed">
                {result.prompt}
              </div>

              {result.cameraMotion && (
                <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-lg text-xs space-y-0.5">
                  <span className="font-semibold text-amber-400 block">
                    {lang === 'hi' ? 'कैमरा मोशन (Video Settings):' : 'Camera Motion:'}
                  </span>
                  <p className="text-slate-300">{result.cameraMotion}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
