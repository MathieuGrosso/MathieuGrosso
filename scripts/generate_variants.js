const fs = require('fs');
const path = require('path');

const originalBannerPath = path.join(__dirname, '..', 'github-banner.svg');
const bannerDir = path.join(__dirname, '..', 'banner');

// Logo paths
const sunsetLogoPath = path.join(__dirname, '..', 'assets', 'sunset-logo.svg');
const moonLogoPath = path.join(__dirname, '..', 'assets', 'moon-logo.png');
const sunLogoPath = path.join(__dirname, '..', 'assets', 'sun-logo.png');

if (!fs.existsSync(bannerDir)) {
    fs.mkdirSync(bannerDir);
}

const originalSvg = fs.readFileSync(originalBannerPath, 'utf8');

// Extract the GIF data
const gifMatch = originalSvg.match(/href="(data:image\/gif;base64,[^"]+)"/);
if (!gifMatch) {
    console.error("Could not find dancing veggies GIF in the original SVG!");
    process.exit(1);
}
const gifData = gifMatch[1];

// Helper to get base64 data URI
const getBase64Image = (filePath, mimeType) => {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        // Return a placeholder or empty string to avoid crashing, but log error
        return '';
    }
    const fileData = fs.readFileSync(filePath);
    return `data:${mimeType};base64,${fileData.toString('base64')}`;
};

// Load Logos
const sunsetLogoData = getBase64Image(sunsetLogoPath, 'image/svg+xml');
const moonLogoData = getBase64Image(moonLogoPath, 'image/png');
const sunLogoData = getBase64Image(sunLogoPath, 'image/png');


// Common styles
const styles = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }
    @keyframes firefly {
      0%, 100% { opacity: 0; }
      50% { opacity: 1; }
    }
    @keyframes logoGlow {
      0%, 100% { opacity: 0.85; }
      50% { opacity: 1; }
    }
    @keyframes cloudFloat {
        0% { transform: translateX(0); }
        50% { transform: translateX(10px); }
        100% { transform: translateX(0); }
    }
    @keyframes sunGlow {
        0%, 100% { filter: drop-shadow(0 0 5px rgba(255, 255, 0, 0.5)); }
        50% { filter: drop-shadow(0 0 20px rgba(255, 255, 0, 0.8)); }
    }
    @keyframes flyAcross {
        0% { transform: translateX(900px) translateY(-100px) rotate(5deg); }
        25% { transform: translateX(650px) translateY(-80px) rotate(0deg); }
        50% { transform: translateX(400px) translateY(-100px) rotate(-5deg); }
        75% { transform: translateX(150px) translateY(-80px) rotate(0deg); }
        100% { transform: translateX(-150px) translateY(-100px) rotate(5deg); }
    }
    @keyframes balletBob {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(5deg); }
    }
    .star { animation: twinkle 3s ease-in-out infinite; }
    .firefly { animation: firefly 2s ease-in-out infinite; }
    .title { animation: float 6s ease-in-out infinite; }
    .logo { animation: logoGlow 4s ease-in-out infinite; }
    .cloud { animation: cloudFloat 10s ease-in-out infinite; }
    .sun { animation: sunGlow 4s ease-in-out infinite; }
    .flying-witch { animation: flyAcross 20s linear infinite; }
    .witch-body { animation: balletBob 2s ease-in-out infinite; }
`;

// Common Elements (Logo, Text, GIF, Forest Paths)
const getForest = (color1, color2, color3) => `
  <!-- Montagnes lointaines -->
  <path d="M0 180 Q100 120 200 160 Q300 100 400 150 Q500 90 600 140 Q700 100 800 160 L800 250 L0 250 Z" fill="${color1}" opacity="0.5"/>

  <!-- Forêt arrière-plan -->
  <path d="M0 200 Q50 160 100 190 Q150 150 200 185 Q250 140 300 180 Q350 130 400 175 Q450 145 500 185 Q550 135 600 175 Q650 150 700 190 Q750 155 800 195 L800 250 L0 250 Z" fill="${color2}" opacity="0.7"/>

  <!-- Sol de la forêt -->
  <path d="M0 220 Q200 210 400 225 Q600 215 800 220 L800 250 L0 250 Z" fill="${color3}"/>
`;

// Helper to generate the logo image tag
// Can override position if provided
const getLogoImage = (base64Data, x = 630, y = 15, width = 80, height = 80) => `
  <g class="logo" filter="url(#softGlow)">
    <image x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet" href="${base64Data}"/>
  </g>
`;


const getText = (textColor, subColor) => `
  <!-- Texte principal -->
  <g class="title">
    <text x="400" y="115" text-anchor="middle" font-family="Georgia, serif" font-size="42" font-weight="bold" fill="${textColor}" filter="url(#softGlow)">
      Mathieu Grosso
    </text>
    <text x="400" y="155" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="${subColor}" opacity="0.9">
      Building AI for sustainable supply chain 🌿
    </text>
  </g>
`;

const veggieGif = `
  <!-- Dancing veggies GIF -->
  <image x="210" y="180" width="380" height="65" href="${gifData}"/>
`;

// Define variations

// Morning: Pink/Blue Sky, Logo at Sun Position, Light Green Forest
// Logo: sunset-logo.svg at x=60, y=140 (replacing sun at cx=100, cy=180, r=40)
const createMorning = () => {
    const defs = `
    <defs>
      <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#FFC0CB"/>
        <stop offset="100%" style="stop-color:#87CEEB"/>
      </linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="softGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    `;

    const sky = `<rect width="800" height="250" fill="url(#sky)"/>`;
    // Sun removed, replaced by logo
    const clouds = `
        <g class="cloud" opacity="0.8">
            <path d="M100,80 Q120,60 140,80 T180,80" stroke="white" stroke-width="20" stroke-linecap="round" fill="none" opacity="0.6"/>
            <path d="M600,50 Q630,30 660,50 T720,50" stroke="white" stroke-width="25" stroke-linecap="round" fill="none" opacity="0.7"/>
        </g>
    `;
    const forest = getForest("#4CAF50", "#388E3C", "#2E7D32");
    // Logo moved to Sun position (approx)
    const logo = getLogoImage(sunsetLogoData, 60, 140, 80, 80);

    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 250">
        ${defs}
        <style>${styles}</style>
        ${sky}
        ${clouds}
        ${logo}
        ${forest}
        ${veggieGif}
        ${getText("#FFFFFF", "#1a472a")}
    </svg>`;
};

// Afternoon: Kiki's Delivery Service Style - Pale Blue Sky, Soft Greens
// Logo: sun-logo.png at default position
const createAfternoon = () => {
    const defs = `
    <defs>
      <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#89CFF0"/>
        <stop offset="100%" style="stop-color:#E0F7FA"/>
      </linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="softGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    `;

    const sky = `<rect width="800" height="250" fill="url(#sky)"/>`;
    // Sun removed
    const clouds = `
        <g class="cloud" fill="#FFFFFF" opacity="0.95">
           <circle cx="150" cy="80" r="20"/>
           <circle cx="170" cy="80" r="25"/>
           <circle cx="190" cy="80" r="20"/>

           <circle cx="550" cy="60" r="25"/>
           <circle cx="580" cy="50" r="30"/>
           <circle cx="610" cy="60" r="25"/>
        </g>
    `;
    // Softer, painterly greens for Ghibli feel
    const forest = getForest("#7AA8A0", "#8FBC8F", "#7DC27D");
    const logo = getLogoImage(sunLogoData); // Default pos

    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 250">
        ${defs}
        <style>${styles}</style>
        ${sky}
        ${clouds}
        ${logo}
        ${forest}
        ${veggieGif}
        ${getText("#FFFFFF", "#F0FFFF")}
    </svg>`;
};

// Sunset: Miyazaki Orange/Violet, Logo at Sun Position, Darker Forest
// Logo: sunset-logo.svg at x=320, y=140 (replacing sun at cx=400, cy=220, r=80)
// Logo made slightly larger (160x160) to match sun size
const createSunset = () => {
    const defs = `
    <defs>
      <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#4B0082"/>
        <stop offset="50%" style="stop-color:#FF4500"/>
        <stop offset="100%" style="stop-color:#FFD700"/>
      </linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="softGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    `;

    const sky = `<rect width="800" height="250" fill="url(#sky)"/>`;
    // Sun removed
    const stars = `
      <g class="stars">
        <circle class="star" cx="50" cy="30" r="1.5" fill="#fff" opacity="0.6"/>
        <circle class="star" cx="750" cy="40" r="1" fill="#fff" opacity="0.5" style="animation-delay: 1.2s"/>
      </g>
    `;
    const forest = getForest("#2F4F4F", "#1a3a3a", "#0f2020");
    // Replaced sun with logo, positioned centrally low
    const logo = getLogoImage(sunsetLogoData, 320, 140, 160, 160);

    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 250">
        ${defs}
        <style>${styles}</style>
        ${sky}
        ${stars}
        ${logo}
        ${forest}
        ${veggieGif}
        ${getText("#FFFFFF", "#FFE4B5")}
    </svg>`;
};

// Night: Dark Blue, Logo at top right, Stars, Fireflies
// Logo: moon-logo.png at default position
const createNight = () => {
    // Based largely on original
    const defs = `
    <defs>
      <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#1a1a2e"/>
        <stop offset="50%" style="stop-color:#16213e"/>
        <stop offset="100%" style="stop-color:#0f3460"/>
      </linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="softGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    `;

    const sky = `<rect width="800" height="250" fill="url(#sky)"/>`;
    const stars = `
      <g class="stars">
        <circle class="star" cx="50" cy="30" r="1.5" fill="#fff" opacity="0.8"/>
        <circle class="star" cx="150" cy="50" r="1" fill="#fff" opacity="0.6" style="animation-delay: 0.5s"/>
        <circle class="star" cx="250" cy="25" r="1.5" fill="#fff" opacity="0.7" style="animation-delay: 1s"/>
        <circle class="star" cx="350" cy="45" r="1" fill="#fff" opacity="0.5" style="animation-delay: 1.5s"/>
        <circle class="star" cx="450" cy="20" r="1.5" fill="#fff" opacity="0.8" style="animation-delay: 0.3s"/>
        <circle class="star" cx="550" cy="55" r="1" fill="#fff" opacity="0.6" style="animation-delay: 0.8s"/>
        <circle class="star" cx="750" cy="40" r="1" fill="#fff" opacity="0.5" style="animation-delay: 1.2s"/>
        <circle class="star" cx="100" cy="60" r="0.8" fill="#fff" opacity="0.4" style="animation-delay: 2s"/>
      </g>
    `;
    // Moon removed
    const fireflies = `
      <circle class="firefly" cx="150" cy="180" r="2" fill="#a8e6cf" filter="url(#glow)"/>
      <circle class="firefly" cx="300" cy="160" r="1.5" fill="#a8e6cf" filter="url(#glow)" style="animation-delay: 0.7s"/>
      <circle class="firefly" cx="500" cy="175" r="2" fill="#a8e6cf" filter="url(#glow)" style="animation-delay: 1.4s"/>
      <circle class="firefly" cx="400" cy="145" r="1.8" fill="#a8e6cf" filter="url(#glow)" style="animation-delay: 0.3s"/>
    `;

    // Flying Mushroom Witch
    // Positioned initially off-screen via animation
    // Using user-provided pixel art SVG for the mushroom character
    const mushroomWitch = `
      <g class="flying-witch" transform="translate(-100, 30)">
         <g class="witch-body" transform="scale(2.5)">
            <!-- Broomstick handle -->
            <rect x="4" y="14" width="24" height="2" fill="#5c3d2e"/>
            <rect x="4" y="14" width="24" height="1" fill="#7a5240"/>

            <!-- Broom bristles -->
            <rect x="26" y="12" width="1" height="1" fill="#c4a35a"/>
            <rect x="27" y="12" width="1" height="2" fill="#b8963f"/>
            <rect x="28" y="13" width="1" height="2" fill="#c4a35a"/>
            <rect x="29" y="13" width="1" height="3" fill="#b8963f"/>
            <rect x="30" y="14" width="1" height="2" fill="#c4a35a"/>
            <rect x="28" y="16" width="1" height="1" fill="#b8963f"/>
            <rect x="27" y="16" width="1" height="1" fill="#c4a35a"/>
            <rect x="26" y="17" width="1" height="1" fill="#b8963f"/>

            <!-- Broom binding -->
            <rect x="25" y="13" width="2" height="4" fill="#3a2a1f"/>

            <!-- Mushroom cap (brown) -->
            <rect x="11" y="6" width="6" height="1" fill="#AD7136"/>
            <rect x="10" y="7" width="8" height="1" fill="#AD7136"/>
            <rect x="9" y="8" width="10" height="2" fill="#AD7136"/>
            <!-- Cap spots -->
            <rect x="11" y="7" width="2" height="1" fill="#8C531F"/>
            <rect x="15" y="8" width="2" height="1" fill="#8C531F"/>

            <!-- Mushroom gills (light underside) -->
            <rect x="10" y="10" width="8" height="1" fill="#E6E6E6"/>

            <!-- Mushroom stem (white/gray) -->
            <rect x="11" y="11" width="6" height="3" fill="#E6E6E6"/>
            <rect x="12" y="11" width="1" height="3" fill="#f5f5f5"/>

            <!-- Face - eyes -->
            <rect x="12" y="11" width="1" height="1" fill="#333"/>
            <rect x="15" y="11" width="1" height="1" fill="#333"/>

            <!-- Face - smile -->
            <rect x="13" y="12" width="2" height="1" fill="#333"/>

            <!-- Cheeks -->
            <rect x="11" y="12" width="1" height="1" fill="#e89090"/>
            <rect x="16" y="12" width="1" height="1" fill="#e89090"/>

            <!-- Witch hat -->
            <rect x="13" y="3" width="2" height="1" fill="#2a1a3a"/>
            <rect x="12" y="4" width="4" height="1" fill="#2a1a3a"/>
            <rect x="11" y="5" width="6" height="1" fill="#2a1a3a"/>
            <rect x="10" y="6" width="8" height="1" fill="#3a2a4a"/>
            <!-- Hat buckle -->
            <rect x="13" y="5" width="2" height="1" fill="#d4af37"/>

            <!-- Arms -->
            <rect x="9" y="13" width="2" height="1" fill="#E6E6E6"/>
            <rect x="17" y="13" width="2" height="1" fill="#E6E6E6"/>

            <!-- Sparkle trail -->
            <rect x="5" y="12" width="1" height="1" fill="#ffd700"/>
            <rect x="2" y="14" width="1" height="1" fill="#ffd700" opacity="0.7"/>
            <rect x="7" y="16" width="1" height="1" fill="#ffd700" opacity="0.5"/>
         </g>
      </g>
    `;

    const forest = getForest("#1e3d19", "#2d5a27", "#1e3d19");
    const logo = getLogoImage(moonLogoData); // Default pos

    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 250">
        ${defs}
        <style>${styles}</style>
        ${sky}
        ${stars}
        ${mushroomWitch}
        ${logo}
        ${forest}
        ${veggieGif}
        ${fireflies}
        ${getText("#e8f4e8", "#a8e6cf")}
    </svg>`;
};

// Write files
fs.writeFileSync(path.join(bannerDir, 'morning.svg'), createMorning());
fs.writeFileSync(path.join(bannerDir, 'afternoon.svg'), createAfternoon());
fs.writeFileSync(path.join(bannerDir, 'sunset.svg'), createSunset());
fs.writeFileSync(path.join(bannerDir, 'night.svg'), createNight());

console.log("Banners generated successfully with updated logos!");
