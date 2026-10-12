import React from 'react';
import { 
  Copy, 
  ExternalLink, 
  Play, 
  Sparkles, 
  Video, 
  Image as ImageIcon,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { AI_TOOLS_LIST } from '../data/prompts';

interface ToolsGuideProps {
  lang: 'hi' | 'en';
}

export const ToolsGuideSection: React.FC<ToolsGuideProps> = ({ lang }) => {
  const steps = [
    {
      num: '01',
      title: lang === 'hi' ? 'प्रॉम्प्ट कॉपी करें' : 'Copy the Prompt',
      desc: lang === 'hi' 
        ? 'लाइब्रेरी में अपनी पसंद के प्रॉम्प्ट पर "Copy Prompt" दबाएं या "Customize" करके अपने हिसाब से बदलाव करें।' 
        : 'Click "Copy Prompt" on any prompt card or customize characters, lighting, and camera motion in the customizer.'
    },
    {
      num: '02',
      title: lang === 'hi' ? 'AI टूल में जाएं' : 'Open the AI Studio / Tool',
      desc: lang === 'hi' 
        ? 'वीडियो बनाने के लिए Kling AI या Runway Gen-3 खोलें, और 8K फ़ोटो के लिए Midjourney या Flux खोलें।' 
        : 'Open Kling AI or Runway for cinematic video generation, or Midjourney / Flux Pro for hyper-realistic imagery.'
    },
    {
      num: '03',
      title: lang === 'hi' ? 'पेस्ट करें और बनाएं' : 'Paste & Generate in 4K',
      desc: lang === 'hi' 
        ? 'प्रॉम्प्ट बॉक्स में पेस्ट करें और जनरेट दबाएं। 15-30 सेकंड में अल्ट्रा-एचडी वीडियो या मास्टरपीस इमेज तैयार हो जाएगी!' 
        : 'Paste into the prompt bar and press generate. Your ultra-HD cinematic video or image renders in seconds!'
    }
  ];

  return (
    <section id="tools-guide" className="py-14 border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            {lang === 'hi' ? '3 आसान स्टेप्स में सीखें' : 'Master Guide'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {lang === 'hi' ? 'प्रॉम्प्ट से वीडियो और इमेज कैसे बनाएं?' : 'How to Turn Prompts into Videos & Images'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {lang === 'hi' 
              ? 'किसी भी कोडिंग या अनुभव की जरूरत नहीं है - बस कॉपी-पेस्ट करें और जादू देखें।' 
              : 'Zero technical skills required — simply copy, paste into the top AI tools, and generate.'}
          </p>
        </div>

        {/* 3 Steps Workflow */}
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <div 
              key={step.num}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3 relative overflow-hidden"
            >
              <div className="text-3xl font-black text-amber-500/20 font-mono">
                {step.num}
              </div>
              <h3 className="text-base font-bold text-white">
                {step.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Popular AI Tools Directory */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{lang === 'hi' ? 'शीर्ष AI वीडियो व इमेज जनरेटर वेबसाइट्स:' : 'Supported AI Video & Image Engines:'}</span>
            </h3>
            <span className="text-xs text-slate-400">
              {lang === 'hi' ? 'क्लिक करके सीधे जाएं' : 'Click to launch directly'}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {AI_TOOLS_LIST.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 border border-slate-800 hover:border-amber-400/50 rounded-xl p-4 flex flex-col justify-between group transition-all"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                      {tool.name}
                    </span>
                    <span className="text-[11px] font-mono text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded">
                      {tool.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {lang === 'hi' ? tool.descHi : tool.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[10px] truncate max-w-[200px]">
                    {tool.commandHint}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 shrink-0 transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
