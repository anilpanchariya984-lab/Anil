export interface PromptVariable {
  key: string;
  label: string;
  labelHi: string;
  defaultValue: string;
  options: string[];
}

export interface PromptItem {
  id: string;
  title: string;
  titleHi: string;
  category: 'video' | 'portrait' | 'mythology' | 'scifi' | 'animation' | 'commercial';
  categoryLabel: string;
  categoryLabelHi: string;
  mediaType: 'image' | 'video';
  toolTarget: string;
  aspectRatio: string;
  isVip: boolean;
  image: string;
  promptTemplate: string;
  defaultPrompt: string;
  negativePrompt: string;
  cameraMotion?: string;
  recommendedSettings: string;
  description: string;
  descriptionHi: string;
  variables: PromptVariable[];
  tags: string[];
}

export const PROMPT_CATEGORIES = [
  { id: 'all', label: 'All Prompts', labelHi: 'सभी प्रॉम्प्ट्स' },
  { id: 'video', label: 'Viral Video (Kling/Runway/Sora)', labelHi: 'वायरल वीडियो (Reels/Shorts)' },
  { id: 'portrait', label: '8K Hyper-Realistic Photos', labelHi: '8K फ़ोटो-रियलिस्टिक' },
  { id: 'mythology', label: 'Indian & Mythological', labelHi: 'भारतीय व पौराणिक' },
  { id: 'scifi', label: 'Sci-Fi & Cyberpunk', labelHi: 'साइंस-फ़ाई व नियॉन' },
  { id: 'animation', label: '3D Disney / Pixar', labelHi: '3D डिज्नी/पिक्सर' },
  { id: 'commercial', label: 'Luxury Commercial Ads', labelHi: 'कमर्शियल व प्रोडक्ट विज्ञापन' },
] as const;

export const PROMPTS_DATA: PromptItem[] = [
  {
    id: 'raj-artisan-portrait',
    title: 'Heritage Rajasthani Artisan 8K Masterwork',
    titleHi: 'शाही राजस्थानी कारीगर - 8K सिनेमाई पोर्ट्रेट',
    category: 'portrait',
    categoryLabel: '8K Photorealism',
    categoryLabelHi: '8K फ़ोटो-रियलिज्म',
    mediaType: 'image',
    toolTarget: 'Midjourney v6.1 / Flux Pro',
    aspectRatio: '4:3',
    isVip: false,
    image: '/src/assets/images/prompt_cinematic_portrait_1791817067963.jpg',
    promptTemplate: 'Ultra-realistic cinematic portrait of an {subject} in an antique workshop, weathered skin with realistic micro-pores, piercing warm eyes, illuminated by {lighting}, wearing an intricate hand-block-printed turban, shot on 85mm f/1.4 lens bokeh, editorial National Geographic masterwork photography, Kodak Portra 400 film tones, highly detailed fabric weave --ar 4:3 --style raw --v 6.1',
    defaultPrompt: 'Ultra-realistic cinematic portrait of an elderly Rajasthani artisan with deep weathered skin in an antique workshop, weathered skin with realistic micro-pores, piercing warm eyes, illuminated by warm golden hour side lighting, wearing an intricate hand-block-printed turban, shot on 85mm f/1.4 lens bokeh, editorial National Geographic masterwork photography, Kodak Portra 400 film tones, highly detailed fabric weave --ar 4:3 --style raw --v 6.1',
    negativePrompt: 'cartoon, CGI, 3D render, plastic skin, oversaturated, deformed hands, extra fingers, blurry, low resolution, watermark',
    recommendedSettings: '--ar 4:3 --v 6.1 --style raw --stylize 250',
    description: 'Ultra detailed portrait showing genuine human emotion, fabric textures, and studio golden hour light.',
    descriptionHi: 'असली चेहरे की बनावट, कपड़े की बुनाई और गोल्डन ऑवर लाइट के साथ नेशनल जियोग्राफिक स्टाइल फ़ोटो।',
    variables: [
      {
        key: 'subject',
        label: 'Subject Character',
        labelHi: 'मुख्य पात्र',
        defaultValue: 'elderly Rajasthani artisan with deep weathered skin',
        options: [
          'elderly Rajasthani artisan with deep weathered skin',
          'young royal Rajput warrior with sharp mustache',
          'Kashmiri weaver crafting pashmina shawl',
          'Varanasi temple priest with saffron robes'
        ]
      },
      {
        key: 'lighting',
        label: 'Lighting Style',
        labelHi: 'रोशनी का प्रकार',
        defaultValue: 'warm golden hour side lighting',
        options: [
          'warm golden hour side lighting',
          'dramatic chiaroscuro window shadows',
          'diffused morning mist daylight',
          'warm lantern glow with candle rim highlights'
        ]
      }
    ],
    tags: ['Portrait', 'Indian', 'National Geographic', '8K', 'Photorealistic']
  },
  {
    id: 'cyberpunk-neon-delhi',
    title: 'Cyberpunk Night Market Anamorphic Flare',
    titleHi: 'फ्यूचरिस्टिक साइबरपंक नाइट मार्केट - 4K सिनेमाई शॉट',
    category: 'scifi',
    categoryLabel: 'Sci-Fi & Cyberpunk',
    categoryLabelHi: 'साइंस-फ़ाई व नियॉन',
    mediaType: 'image',
    toolTarget: 'Midjourney v6.1 / Flux / Leonardo',
    aspectRatio: '16:9',
    isVip: false,
    image: '/src/assets/images/prompt_cyberpunk_street_1791817087063.jpg',
    promptTemplate: 'Hyper-detailed futuristic cyberpunk street market at night in {location}, reflective rain-slicked wet asphalt, vivid {neonColor} holographic signs, dense steam rising from food stalls, cinematic anamorphic blue lens flare, people with techwear and clear umbrella coats, shot on ARRI Alexa 65, Blade Runner 2049 aesthetic, volumetric atmospheric haze --ar 16:9 --style raw',
    defaultPrompt: 'Hyper-detailed futuristic cyberpunk street market at night in Neo-Tokyo alley, reflective rain-slicked wet asphalt, vivid magenta and cyan holographic signs, dense steam rising from food stalls, cinematic anamorphic blue lens flare, people with techwear and clear umbrella coats, shot on ARRI Alexa 65, Blade Runner 2049 aesthetic, volumetric atmospheric haze --ar 16:9 --style raw',
    negativePrompt: 'flat lighting, cartoonish, low poly, noisy, jpeg artifacts, blurry, amateur, washed out colors',
    recommendedSettings: '--ar 16:9 --v 6.1 --stylize 300 --chaos 10',
    description: 'Atmospheric sci-fi street scene with rain reflections, neon lights, and Hollywood film grading.',
    descriptionHi: 'बारिश से भीगी सड़कें, नियॉन होलोग्राफिक बोर्ड्स और हॉलीवुड ब्लेड रनर स्टाइल सिनेमाई सीन।',
    variables: [
      {
        key: 'location',
        label: 'City / Alley Setting',
        labelHi: 'स्थान / शहर',
        defaultValue: 'Neo-Tokyo alley',
        options: [
          'Neo-Tokyo alley',
          'Futuristic Old Delhi Chandni Chowk 2099',
          'Neo-Mumbai skyway underpass',
          'Cyber-Shanghai Kowloon walled city'
        ]
      },
      {
        key: 'neonColor',
        label: 'Neon Color Palette',
        labelHi: 'नियॉन रंग',
        defaultValue: 'magenta and cyan',
        options: [
          'magenta and cyan',
          'amber gold and ultraviolet',
          'electric emerald green and crimson',
          'deep cobalt blue and gold'
        ]
      }
    ],
    tags: ['Cyberpunk', 'Blade Runner', 'Neon', '16:9', 'Sci-Fi']
  },
  {
    id: 'mythic-celestial-statue',
    title: 'Divine Celestial Goddess Marble & Gold Sculpture',
    titleHi: 'दिव्य संगमरमर व सोने की अलौकिक मूर्ति - 8K रेंडर',
    category: 'mythology',
    categoryLabel: 'Indian & Mythological',
    categoryLabelHi: 'भारतीय व पौराणिक',
    mediaType: 'image',
    toolTarget: 'Midjourney v6.1 / Flux Pro',
    aspectRatio: '4:3',
    isVip: true,
    image: '/src/assets/images/prompt_mythic_gold_statue_1791817100247.jpg',
    promptTemplate: 'Magnificent divine sculpture of {deity} carved from luminescent translucent white Makrana marble and {metalAccent} filigree, surrounded by {etherealEffect}, situated inside a grand celestial sanctum with holy water pool, volumetric divine god rays streaming from dome ceiling, Octane Render 8K, architectural masterpiece, cinematic lighting, ultra-high realism --ar 4:3',
    defaultPrompt: 'Magnificent divine sculpture of a celestial goddess carved from luminescent translucent white Makrana marble and 24k polished gold filigree, surrounded by floating ethereal pink lotus petals and subtle sacred mist, situated inside a grand celestial sanctum with holy water pool, volumetric divine god rays streaming from dome ceiling, Octane Render 8K, architectural masterpiece, cinematic lighting, ultra-high realism --ar 4:3',
    negativePrompt: 'cracked, imperfect, disfigured, distorted, plastic, low quality, dark dull lighting, ugly architecture',
    recommendedSettings: '--ar 4:3 --v 6.1 --stylize 450',
    description: 'VIP Secret Prompt: Heavenly architectural masterpiece with translucent marble and sacred light rays.',
    descriptionHi: 'VIP सीक्रेट प्रॉम्प्ट: शुद्ध सफेद मकराना मार्बल, 24K सोने की नक्काशी और स्वर्ग जैसी दिव्य किरणों का दृश्य।',
    variables: [
      {
        key: 'deity',
        label: 'Deity Figure',
        labelHi: 'दिव्य स्वरूप',
        defaultValue: 'a celestial goddess of wisdom and grace',
        options: [
          'a celestial goddess of wisdom and grace',
          'Lord Shiva in deep meditative cosmic trance',
          'Lord Krishna holding a golden flute',
          'Lord Hanuman with radiant golden aura and mace'
        ]
      },
      {
        key: 'metalAccent',
        label: 'Ornamental Metal',
        labelHi: 'धातु नक्काशी',
        defaultValue: '24k polished gold',
        options: [
          '24k polished gold',
          'rose gold and antique brass',
          'celestial iridescent silver',
          'pure copper and platinum'
        ]
      },
      {
        key: 'etherealEffect',
        label: 'Surrounding Atmosphere',
        labelHi: 'वातावरण का प्रभाव',
        defaultValue: 'floating ethereal pink lotus petals and subtle sacred mist',
        options: [
          'floating ethereal pink lotus petals and subtle sacred mist',
          'swirling golden cosmic dust particles',
          'sacred diya flames illuminating holy water reflections',
          'falling celestial blossoms and gentle incense smoke'
        ]
      }
    ],
    tags: ['VIP Exclusive', 'Mythology', 'Divine', 'Marble & Gold', 'Sanctum']
  },
  {
    id: 'himalayan-drone-video',
    title: 'Himalayan Sunrise FPV Drone Hyperlapse (Video Prompt)',
    titleHi: 'हिमालय सनराइज FPV ड्रोन वीडियो प्रॉम्प्ट (Kling / Runway)',
    category: 'video',
    categoryLabel: 'Viral Video',
    categoryLabelHi: 'वायरल वीडियो',
    mediaType: 'video',
    toolTarget: 'Runway Gen-3 Alpha / Kling AI / Luma',
    aspectRatio: '16:9',
    isVip: false,
    image: '/src/assets/images/prompt_drone_himalayas_1791817115136.jpg',
    promptTemplate: 'Cinematic sweeping aerial FPV drone shot flying over {mountainSubject} at sunrise. The camera {cameraMotionPattern}, revealing {landscapeDetail}. First rays of golden sunlight hit the ice crystals creating shimmering flares, sea of clouds rolling slowly beneath the summits. Shot on Red Monstro 8K, 60fps slowed to 24fps cinematic film look, photorealistic physics, hyper-detailed snow textures.',
    defaultPrompt: 'Cinematic sweeping aerial FPV drone shot flying over jagged snow-covered Himalayan mountain ridge at sunrise. The camera glides smoothly forward and slowly banks 45 degrees downward, revealing a majestic razor-sharp peak piercing through morning fog. First rays of golden sunlight hit the ice crystals creating shimmering flares, sea of clouds rolling slowly beneath the summits. Shot on Red Monstro 8K, 60fps slowed to 24fps cinematic film look, photorealistic physics, hyper-detailed snow textures.',
    negativePrompt: 'jittery motion, video artifacts, plastic snow, morphing geometry, cartoonish, frame drops, low resolution',
    cameraMotion: 'Smooth forward glide, slow yaw rotation 30 degrees, altitude drop 50m with seamless gimbal tilt',
    recommendedSettings: 'Runway: Motion 5, Camera Pan Left, High Quality. Kling: Professional Mode 1080p, Creativity 0.4',
    description: 'High-converting viral nature video prompt tested on Runway Gen-3 and Kling for ultra-smooth 60fps camera motion.',
    descriptionHi: 'Runway Gen-3 और Kling AI पर टेस्टेड वायरल वीडियो प्रॉम्प्ट, मक्खन जैसी स्मूद FPV ड्रोन मोशन।',
    variables: [
      {
        key: 'mountainSubject',
        label: 'Mountain Scenery',
        labelHi: 'पर्वत दृश्य',
        defaultValue: 'jagged snow-covered Himalayan mountain ridge',
        options: [
          'jagged snow-covered Himalayan mountain ridge',
          'dramatic spire peaks of Mount Everest at dawn',
          'emerald green misty valley surrounded by waterfalls',
          'Swiss Alps snow blizzard with mountain lodge'
        ]
      },
      {
        key: 'cameraMotionPattern',
        label: 'Camera Movement',
        labelHi: 'कैमरा मूवमेंट',
        defaultValue: 'glides smoothly forward and slowly banks 45 degrees downward',
        options: [
          'glides smoothly forward and slowly banks 45 degrees downward',
          'orbits 360 degrees around the sharp summit peak in continuous motion',
          'dives straight down through cloud layer into pristine glacier lake',
          'rises vertically from cloud bank into blinding golden sun flare'
        ]
      }
    ],
    tags: ['Video Prompt', 'Runway Gen-3', 'Kling AI', 'Drone', '4K Reel']
  },
  {
    id: 'viral-reel-time-portal',
    title: 'Ancient Indian Temple into Cyberpunk Time-Lapse (Reel Video)',
    titleHi: 'प्राचीन मंदिर से फ्यूचर सिटी ट्रांजिशन (इंस्टाग्राम रील वीडियो)',
    category: 'video',
    categoryLabel: 'Viral Video',
    categoryLabelHi: 'वायरल वीडियो',
    mediaType: 'video',
    toolTarget: 'Kling AI / Runway Gen-3 / Sora',
    aspectRatio: '9:16',
    isVip: true,
    image: '/src/assets/images/prompt_cyberpunk_street_1791817087063.jpg',
    promptTemplate: 'Seamless morphological continuous transformation video in vertical 9:16 aspect ratio: {openingScene} smoothly morphs into {futureScene}. The camera stays locked on the central axis as millenia of time accelerate in seconds. Volumetric sacred dust particles transform into glowing neon fiber-optics, stone carving lines ignite with holographic blue light. High fps, hyper-smooth seamless transformation, photorealistic photorealism.',
    defaultPrompt: 'Seamless morphological continuous transformation video in vertical 9:16 aspect ratio: an ancient carved granite temple pillar covered in moss and diya oil lamps smoothly morphs into a futuristic 2150 cyber-metropolis holographic skyscraper with flying vehicles. The camera stays locked on the central axis as millenia of time accelerate in seconds. Volumetric sacred dust particles transform into glowing neon fiber-optics, stone carving lines ignite with holographic blue light. High fps, hyper-smooth seamless transformation, photorealistic photorealism.',
    negativePrompt: 'choppy cuts, blurred face, unnatural morphing, glitching artifacts, low bitrate, distorted perspective',
    cameraMotion: 'Static dolly in push, locked center axis, motion blur on transitioning elements',
    recommendedSettings: 'Aspect Ratio: 9:16 (Vertical Reels/Shorts), Duration: 10s, Prompt Weight: 0.85',
    description: 'VIP Secret Video Prompt: The viral time-morph effect that gained 10M+ views on Instagram Reels and YouTube Shorts.',
    descriptionHi: 'VIP सीक्रेट वीडियो प्रॉम्प्ट: इंस्टाग्राम रील्स और यूट्यूब शॉर्ट्स पर करोड़ों व्यूज लाने वाला टाइम-ट्रैवल ट्रांजिशन।',
    variables: [
      {
        key: 'openingScene',
        label: 'Opening Historical Era',
        labelHi: 'शुरुआती प्राचीन दृश्य',
        defaultValue: 'an ancient carved granite temple pillar covered in moss and diya oil lamps',
        options: [
          'an ancient carved granite temple pillar covered in moss and diya oil lamps',
          'a Vedic sage chanting by holy sacred fire in dense jungle',
          'a 16th century Mughal palace courtyard with fountain',
          'a royal Rajasthani fort courtyard bathed in moonlight'
        ]
      },
      {
        key: 'futureScene',
        label: 'Future Transformed Era',
        labelHi: 'भविष्य का रूपांतरण',
        defaultValue: 'a futuristic 2150 cyber-metropolis holographic skyscraper with flying vehicles',
        options: [
          'a futuristic 2150 cyber-metropolis holographic skyscraper with flying vehicles',
          'a high-tech quantum computing server room with floating data rings',
          'a futuristic cyberpunk market with neon android citizens',
          'a solar-powered mega-structure floating in Earth orbit'
        ]
      }
    ],
    tags: ['VIP Exclusive', 'Reels Viral', '9:16 Video', 'Morphing', 'Kling AI']
  },
  {
    id: 'pixar-cute-baby-tiger',
    title: 'Pixar/Disney 3D Animated Royal Baby Animal',
    titleHi: 'पिक्सर स्टाइल 3D रॉयल बेबी कैरेक्टर - एनीमेशन प्रॉम्प्ट',
    category: 'animation',
    categoryLabel: '3D Disney / Pixar',
    categoryLabelHi: '3D डिज्नी/पिक्सर',
    mediaType: 'image',
    toolTarget: 'Midjourney v6.1 / DALL-E 3',
    aspectRatio: '1:1',
    isVip: false,
    image: '/src/assets/images/prompt_cinematic_portrait_1791817067963.jpg',
    promptTemplate: 'Adorable Disney Pixar 3D animation style {character}, big expressive sparkling glossy eyes, ultra-soft fluffy fur shader, wearing {accessory}, sitting on {setting}, warm ambient studio lighting with rim light highlighting fur edges, subsurface scattering on skin and ears, highly detailed 8k render, octane render style, heartwarming expression, vibrant colors --ar 1:1 --stylize 200',
    defaultPrompt: 'Adorable Disney Pixar 3D animation style baby Royal Bengal tiger cub, big expressive sparkling glossy amber eyes, ultra-soft fluffy fur shader, wearing a miniature jeweled maharaja crown with a little peacock feather, sitting on an ornate silk royal cushion, warm ambient studio lighting with rim light highlighting fur edges, subsurface scattering on skin and ears, highly detailed 8k render, octane render style, heartwarming expression, vibrant colors --ar 1:1 --stylize 200',
    negativePrompt: 'ugly, scary, realistic tiger, human eyes, flat 2d, sketch, watermark, distorted limbs, dull colors',
    recommendedSettings: '--ar 1:1 --v 6.1 --stylize 250 --chaos 0',
    description: 'Heartwarming 3D character with subsurface scattering fur physics, perfect for stickers, avatars, and animation.',
    descriptionHi: 'पिक्सर और डिज्नी मूवी की तरह सुपर क्यूट 3D एनीमेशन, चमकदार बड़ी आंखें और सॉफ्ट फर डिटेलिंग।',
    variables: [
      {
        key: 'character',
        label: 'Animated Character',
        labelHi: 'कैरेक्टर',
        defaultValue: 'baby Royal Bengal tiger cub',
        options: [
          'baby Royal Bengal tiger cub',
          'little mischievous baby elephant with gold anklet',
          'cute cybernetic red panda holding a glowing battery',
          'baby dragon wrapped in a cozy wool scarf'
        ]
      },
      {
        key: 'accessory',
        label: 'Costume & Ornament',
        labelHi: 'पोशाक व आभूषण',
        defaultValue: 'a miniature jeweled maharaja crown with a little peacock feather',
        options: [
          'a miniature jeweled maharaja crown with a little peacock feather',
          'tiny astronaut helmet with reflections',
          'little round spectacles and wizard robe',
          'steampunk aviator goggles and leather flight jacket'
        ]
      }
    ],
    tags: ['Pixar', 'Disney', '3D Cute', '1:1 Avatar', 'Octane Render']
  },
  {
    id: 'luxury-perfume-commercial',
    title: 'Luxury Fragrance Bottle Water Splash Commercial Ad',
    titleHi: 'लक्ज़री परफ्यूम वॉटर-स्प्लैश कमर्शियल ऐड - 8K ऐड प्रॉम्प्ट',
    category: 'commercial',
    categoryLabel: 'Commercial Ads',
    categoryLabelHi: 'कमर्शियल ऐड',
    mediaType: 'image',
    toolTarget: 'Midjourney v6.1 / Flux Pro',
    aspectRatio: '4:3',
    isVip: true,
    image: '/src/assets/images/prompt_mythic_gold_statue_1791817100247.jpg',
    promptTemplate: 'High-end commercial product photography of a {productDescription}, resting on {surfaceBase}, surrounded by {liquidDynamics}, studio lighting with dual strip softboxes creating sleek vertical reflections on glass, floating {botanicalAccent}, dark {backgroundMood} background, crisp caustics and refraction, Hasselblad H6D-100c medium format, commercial advertising campaign quality --ar 4:3',
    defaultPrompt: 'High-end commercial product photography of a heavy crystal geometric perfume bottle with heavy gold engraved cap named "OUD NOIR", resting on wet obsidian stone, surrounded by high-speed frozen micro water droplets splashing gracefully, studio lighting with dual strip softboxes creating sleek vertical reflections on glass, floating crushed saffron and damask rose petals, dark moody gradient background, crisp caustics and refraction, Hasselblad H6D-100c medium format, commercial advertising campaign quality --ar 4:3',
    negativePrompt: 'cheap looking, plastic bottle, dirty water, blurry splashes, oversaturated colors, harsh direct flash, amateur photography',
    recommendedSettings: '--ar 4:3 --v 6.1 --style raw --stylize 180',
    description: 'VIP Secret Ad Prompt: Used by top advertising agencies for international luxury perfume and cosmetic launches.',
    descriptionHi: 'VIP सीक्रेट ऐड प्रॉम्प्ट: इंटरनेशनल लग्जरी ब्रांड्स जैसा हाई-स्पीड स्प्लैश और क्रिस्टल रिफ्लेक्शन शॉट।',
    variables: [
      {
        key: 'productDescription',
        label: 'Luxury Product',
        labelHi: 'प्रोडक्ट का प्रकार',
        defaultValue: 'heavy crystal geometric perfume bottle with heavy gold engraved cap named "OUD NOIR"',
        options: [
          'heavy crystal geometric perfume bottle with heavy gold engraved cap named "OUD NOIR"',
          'matte black ergonomic titanium smartwatch with sapphire crystal dial',
          'frosted glass luxury organic face serum dropper bottle with gold pipette',
          'premium carbon-fiber sports car key fob on brushed steel'
        ]
      },
      {
        key: 'liquidDynamics',
        label: 'Fluid & Splash Dynamic',
        labelHi: 'पानी व लिक्विड इफेक्ट',
        defaultValue: 'high-speed frozen micro water droplets splashing gracefully',
        options: [
          'high-speed frozen micro water droplets splashing gracefully',
          'swirling ripples in liquid gold and black silk fluid',
          'effervescent champagne bubbles with crisp refractive light',
          'fine crystalline ocean mist frozen in 1/8000s shutter speed'
        ]
      }
    ],
    tags: ['VIP Exclusive', 'Commercial Ad', 'Product Photography', 'Luxury', 'Hasselblad']
  },
  {
    id: 'mythic-lord-shiva-cinematic',
    title: 'Mahadev Lord Shiva in Deep Cosmic Meditation 8K',
    titleHi: 'भगवान शिव - ब्रह्मांडीय ध्यान व त्रिशूल 8K सिनेमाई दृश्य',
    category: 'mythology',
    categoryLabel: 'Indian & Mythological',
    categoryLabelHi: 'भारतीय व पौराणिक',
    mediaType: 'image',
    toolTarget: 'Midjourney v6.1 / Flux Pro',
    aspectRatio: '16:9',
    isVip: true,
    image: '/src/assets/images/prompt_drone_himalayas_1791817115136.jpg',
    promptTemplate: 'Cinematic hyper-realistic wide portrait of {divineSubject} meditating atop a snowy Himalayan summit under a breathtaking {skyPhenomenon}. Ash-smeared blue-toned skin, third eye closed in serene supreme peace, sacred serpent Vasuki around neck, crescent moon glowing in dreadlocks, trident Trishul planted nearby with damru, holy Ganga river stream glowing like liquid diamond, ethereal cosmic aura, IMAX 70mm cinematography --ar 16:9 --style raw',
    defaultPrompt: 'Cinematic hyper-realistic wide portrait of Lord Shiva meditating atop a snowy Himalayan summit under a breathtaking swirling galaxy nebula night sky. Ash-smeared blue-toned skin, third eye closed in serene supreme peace, sacred serpent Vasuki around neck, crescent moon glowing in dreadlocks, trident Trishul planted nearby with damru, holy Ganga river stream glowing like liquid diamond, ethereal cosmic aura, IMAX 70mm cinematography --ar 16:9 --style raw',
    negativePrompt: 'cartoonish, distorted face, wrong anatomy, neon cartoon glow, low quality, flat render, western mythology mix',
    recommendedSettings: '--ar 16:9 --v 6.1 --stylize 350',
    description: 'VIP Secret Prompt: Majestic, deeply respectful, spiritually radiant visual with cosmos and snow detail.',
    descriptionHi: 'VIP सीक्रेट प्रॉम्प्ट: कैलाश पर्वत पर भगवान शिव का महा-सिनेमैटिक दृश्य, ब्रह्मांडीय नीहारिका और गंगा की अलौकिक धारा।',
    variables: [
      {
        key: 'divineSubject',
        label: 'Form of Lord Shiva',
        labelHi: 'महादेव का रूप',
        defaultValue: 'Lord Shiva in deep meditative Samadhi',
        options: [
          'Lord Shiva in deep meditative Samadhi',
          'Rudra avatar with fierce fiery third eye opening',
          'Nataraja cosmic dance of creation and eternity',
          'Ardhanarishwara uniting Shiva and Shakti cosmic energy'
        ]
      },
      {
        key: 'skyPhenomenon',
        label: 'Celestial Backdrop',
        labelHi: 'आकाश का दृश्य',
        defaultValue: 'breathtaking swirling galaxy nebula night sky',
        options: [
          'breathtaking swirling galaxy nebula night sky',
          'golden sunrise piercing through holy Kailash mountain clouds',
          'aurora borealis intertwined with sacred cosmic om vibrations',
          'night of Mahashivratri with millions of twinkling stars and comet'
        ]
      }
    ],
    tags: ['VIP Exclusive', 'Mahadev', 'Lord Shiva', 'Cosmic', 'IMAX 70mm']
  }
];

export const AI_TOOLS_LIST = [
  {
    name: 'Midjourney',
    url: 'https://www.midjourney.com',
    type: 'Image Generator',
    desc: 'Best for 8K hyper-realistic photos, portraits, and artistic styles',
    descHi: '8K फ़ोटो-रियलिज्म और पोर्ट्रेट्स के लिए दुनिया का नंबर 1 टूल',
    commandHint: '/imagine prompt: [PASTE_HERE]'
  },
  {
    name: 'Runway Gen-3 Alpha',
    url: 'https://runwayml.com',
    type: 'Video Generator',
    desc: 'Hollywood-grade cinematic camera motion and physics',
    descHi: 'सिनेमाई कैमरा मोशन और रियलिस्टिक मोशन वीडियो के लिए बेस्ट',
    commandHint: 'Paste in "Text to Video" prompt box'
  },
  {
    name: 'Kling AI',
    url: 'https://klingai.com',
    type: 'Video Generator',
    desc: 'Viral Reels & Shorts high-resolution motion generation',
    descHi: 'इंस्टाग्राम रील्स और यूट्यूब शॉर्ट्स के वायरल वीडियो बनाने के लिए',
    commandHint: 'Professional mode -> Paste Prompt'
  },
  {
    name: 'Flux.1 Pro',
    url: 'https://blackforestlabs.ai',
    type: 'Image Generator',
    desc: 'Unmatched photorealism, skin micro-textures, and prompt adherence',
    descHi: 'चेहरे की बनावट, स्किन पोर्स और असली फ़ोटोग्राफी जैसा रिज़ल्ट',
    commandHint: 'Paste in prompt field'
  },
  {
    name: 'Luma Dream Machine',
    url: 'https://lumalabs.ai/dream-machine',
    type: 'Video Generator',
    desc: 'Smooth 3D camera pan and fast 5-second video synthesis',
    descHi: '3D कैमरा पैन और स्मूद स्लो-मोशन वीडियो बनाने का टूल',
    commandHint: 'Text-to-Video input'
  },
  {
    name: 'ChatGPT / DALL-E 3',
    url: 'https://chatgpt.com',
    type: 'Image & Creative',
    desc: 'Easy to use with conversational refinements',
    descHi: 'शुरुआती क्रिएटर्स के लिए सबसे आसान और तुरंत रिज़ल्ट देने वाला',
    commandHint: 'Paste directly in chat: "Generate image: [PROMPT]"'
  }
];
