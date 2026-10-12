import { GoogleGenAI } from '@google/genai';

export async function enhancePromptWithAI(rawIdea: string, targetType: 'image' | 'video' = 'image'): Promise<{
  prompt: string;
  negativePrompt: string;
  cameraMotion?: string;
  recommendedSettings: string;
}> {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '');
    
    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });
      const promptInstruction = `You are a world-leading Master AI Prompt Engineer for Midjourney v6.1, Flux.1 Pro, Runway Gen-3 Alpha, and Kling AI.
Transform this raw user concept into an ultra-detailed, cinematic masterpiece prompt:
Concept: "${rawIdea}"
Target Media: ${targetType === 'video' ? 'Cinematic 4K Video (Runway/Kling)' : 'Photorealistic 8K Image (Midjourney/Flux)'}

Respond in strict valid JSON format with keys:
- prompt: the detailed English prompt with lighting, camera angle, textures, render engine, and aspect ratio tags.
- negativePrompt: tested negative prompt to eliminate bad anatomy or artifacts.
- cameraMotion: (if video) exact camera movement direction and speed.
- recommendedSettings: parameter tags like --ar 16:9 --v 6.1 etc.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptInstruction,
        config: {
          responseMimeType: 'application/json',
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        return {
          prompt: parsed.prompt || '',
          negativePrompt: parsed.negativePrompt || 'blurry, low quality, artifacts, distorted',
          cameraMotion: parsed.cameraMotion,
          recommendedSettings: parsed.recommendedSettings || '--ar 16:9 --v 6.1 --style raw',
        };
      }
    }
  } catch (error) {
    console.warn('Gemini API call skipped or fallback triggered:', error);
  }

  // Robust, reliable rule-based prompt generator fallback
  const cleaned = rawIdea.trim();
  if (targetType === 'video') {
    return {
      prompt: `Cinematic high-production film shot of ${cleaned}. Camera glides in smooth cinematic 60fps tracking motion, natural volumetric lighting, golden hour atmospheric mist, photorealistic physics, shot on 35mm anamorphic lens, IMAX quality, hyper-detailed textures, ultra-smooth slow motion 0.5x --ar 16:9`,
      negativePrompt: 'choppy framerate, jittery camera, distorted hands, morphing faces, video compression artifacts, low resolution',
      cameraMotion: 'Slow cinematic dolly push-in with 25-degree smooth clockwise rotation and locked focus',
      recommendedSettings: 'Runway Gen-3 / Kling: Motion 5, Camera Pan Left, High Quality 1080p, 10 seconds'
    };
  }

  return {
    prompt: `Ultra-realistic editorial 8k masterwork photography of ${cleaned}. Illuminated by dramatic cinematic chiaroscuro golden hour lighting, intricate hyper-detailed surface micro-textures, shot on 85mm f/1.4 lens with creamy circular bokeh, Kodak Portra 400 film stock, Octane render 8K fidelity, Hasselblad medium format color depth --ar 16:9 --style raw --v 6.1`,
    negativePrompt: 'cartoon, 3D render, CGI, plastic skin, distorted anatomy, extra limbs, blurry, out of focus, watermark, oversaturated',
    recommendedSettings: '--ar 16:9 --v 6.1 --style raw --stylize 250'
  };
}
