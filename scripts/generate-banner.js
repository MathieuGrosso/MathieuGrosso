const fs = require('fs');
const path = require('path');

// Configuration for different times of day
const THEMES = {
  MORNING: {
    name: 'Morning',
    skyGradient: [
      { offset: '0%', color: '#FFC1CC' },   // Soft pink
      { offset: '100%', color: '#B5D0FF' }  // Soft blue
    ],
    forestColor: '#4caf50',
    mountainColor: '#81c784',
    groundColor: '#388e3c',
    starsOpacity: 0,
    firefliesOpacity: 0,
    sun: {
      cx: 100, cy: 150, r: 40, fill: '#FFD700', opacity: 0.8
    },
    cloudsOpacity: 0.8,
    titleColor: '#ffffff',
    subtitleColor: '#e8f4e8'
  },
  AFTERNOON: {
    name: 'Afternoon',
    skyGradient: [
      { offset: '0%', color: '#4FACFE' },   // Bright blue
      { offset: '100%', color: '#00F2FE' }  // Cyan
    ],
    forestColor: '#2e7d32',
    mountainColor: '#388e3c',
    groundColor: '#1b5e20',
    starsOpacity: 0,
    firefliesOpacity: 0,
    sun: {
      cx: 400, cy: 60, r: 50, fill: '#FDB813', opacity: 1
    },
    cloudsOpacity: 0.9,
    titleColor: '#ffffff',
    subtitleColor: '#f0f4c3'
  },
  SUNSET: {
    name: 'Sunset',
    skyGradient: [
      { offset: '0%', color: '#3F2B96' },   // Deep Purple
      { offset: '50%', color: '#FF512F' },  // Orange
      { offset: '100%', color: '#F09819' }  // Gold
    ],
    forestColor: '#1a237e',
    mountainColor: '#283593',
    groundColor: '#121858',
    starsOpacity: 0.3,
    firefliesOpacity: 0.5,
    sun: {
      cx: 600, cy: 180, r: 60, fill: '#FF4500', opacity: 0.9
    },
    cloudsOpacity: 0.4,
    titleColor: '#ffe0b2',
    subtitleColor: '#ffcc80'
  },
  NIGHT: {
    name: 'Night',
    skyGradient: [
      { offset: '0%', color: '#1a1a2e' },
      { offset: '50%', color: '#16213e' },
      { offset: '100%', color: '#0f3460' }
    ],
    forestColor: '#2d5a27',
    mountainColor: '#1e3d19',
    groundColor: '#1e3d19',
    starsOpacity: 1,
    firefliesOpacity: 1,
    sun: null,
    cloudsOpacity: 0.1,
    titleColor: '#e8f4e8',
    subtitleColor: '#a8e6cf'
  }
};

function getTheme(hour) {
  if (hour >= 7 && hour < 12) return THEMES.MORNING;
  if (hour >= 12 && hour < 17) return THEMES.AFTERNOON;
  if (hour >= 17 && hour < 22) return THEMES.SUNSET;
  return THEMES.NIGHT;
}

function generateSVG(theme) {
  const stops = theme.skyGradient.map(s =>
    `<stop offset="${s.offset}" style="stop-color:${s.color}"/>`
  ).join('\n      ');

  // Elements visibility
  const starStyle = `opacity: ${theme.starsOpacity}`;
  const fireflyStyle = `opacity: ${theme.firefliesOpacity}`;

  // Sun Element
  let sunElement = '';
  if (theme.sun) {
    sunElement = `
    <!-- Soleil -->
    <circle cx="${theme.sun.cx}" cy="${theme.sun.cy}" r="${theme.sun.r}" fill="${theme.sun.fill}" opacity="${theme.sun.opacity}" filter="url(#glow)">
      <animate attributeName="cy" values="${theme.sun.cy};${theme.sun.cy - 5};${theme.sun.cy}" dur="4s" repeatCount="indefinite" />
    </circle>`;
  }

  // Clouds Element (Simple paths)
  let cloudsElement = '';
  if (theme.cloudsOpacity > 0) {
    cloudsElement = `
    <!-- Nuages -->
    <g opacity="${theme.cloudsOpacity}" filter="url(#softGlow)" fill="#fff">
      <path d="M100 80 Q120 60 140 80 T180 80 T220 80" stroke="none" fill="white" opacity="0.6">
        <animateTransform attributeName="transform" type="translate" from="-50 0" to="800 0" dur="60s" repeatCount="indefinite"/>
      </path>
      <circle cx="600" cy="60" r="20" opacity="0.5">
         <animateTransform attributeName="transform" type="translate" from="0 0" to="-100 0" dur="40s" repeatCount="indefinite"/>
      </circle>
       <circle cx="630" cy="65" r="15" opacity="0.5">
         <animateTransform attributeName="transform" type="translate" from="0 0" to="-100 0" dur="40s" repeatCount="indefinite"/>
      </circle>
    </g>`;
  }

  // Base SVG template (using the original structure)
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 250">
  <defs>
    <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
      ${stops}
    </linearGradient>

    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <filter id="softGlow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <style>
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
    .star { animation: twinkle 3s ease-in-out infinite; }
    .firefly { animation: firefly 2s ease-in-out infinite; }
    .title { animation: float 6s ease-in-out infinite; }
    .logo { animation: logoGlow 4s ease-in-out infinite; }
  </style>

  <!-- Fond ciel -->
  <rect width="800" height="250" fill="url(#sky)"/>

  ${sunElement}
  ${cloudsElement}

  <!-- Étoiles -->
  <g class="stars" style="${starStyle}">
    <circle class="star" cx="50" cy="30" r="1.5" fill="#fff" opacity="0.8"/>
    <circle class="star" cx="150" cy="50" r="1" fill="#fff" opacity="0.6" style="animation-delay: 0.5s"/>
    <circle class="star" cx="250" cy="25" r="1.5" fill="#fff" opacity="0.7" style="animation-delay: 1s"/>
    <circle class="star" cx="350" cy="45" r="1" fill="#fff" opacity="0.5" style="animation-delay: 1.5s"/>
    <circle class="star" cx="450" cy="20" r="1.5" fill="#fff" opacity="0.8" style="animation-delay: 0.3s"/>
    <circle class="star" cx="550" cy="55" r="1" fill="#fff" opacity="0.6" style="animation-delay: 0.8s"/>
    <circle class="star" cx="750" cy="40" r="1" fill="#fff" opacity="0.5" style="animation-delay: 1.2s"/>
    <circle class="star" cx="100" cy="60" r="0.8" fill="#fff" opacity="0.4" style="animation-delay: 2s"/>
  </g>

  <!-- Ida Logo -->
  <g class="logo" transform="translate(630, 15) scale(0.7)" filter="url(#softGlow)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M70.1857 21.6719H45.3622C45.3484 21.6719 45.3449 21.6909 45.357 21.696C50.7719 23.9869 54.6067 29.6744 54.6067 36.3297C54.6067 42.9849 50.9703 48.374 45.7796 50.7753C45.7676 50.7805 45.771 50.7994 45.7848 50.7994H70.3668C78.447 50.7994 84.9901 44.2184 84.9315 36.1244C84.8711 28.0943 78.2158 21.6702 70.184 21.6702L70.1857 21.6719Z" fill="#D72D5D"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M38.3846 21.6719H30.5218V21.6753C30.4821 21.6753 30.4424 21.6719 30.4045 21.6719C22.3606 21.6719 15.8398 28.1926 15.8398 36.2365C15.8398 44.2804 22.3606 50.8012 30.4045 50.8012C30.4442 50.8012 30.4838 50.7977 30.5218 50.7977V50.8012H38.3846C46.4285 50.8012 52.9492 44.2804 52.9492 36.2365C52.9492 28.1926 46.4285 21.6719 38.3846 21.6719Z" fill="#D72D5D"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M46.6221 97.0928C46.6221 90.4048 50.4949 84.6931 55.9529 82.4247C55.9668 82.4195 55.9616 82.4005 55.9478 82.4005H30.348V82.404C30.3083 82.404 30.2686 82.4005 30.2307 82.4005C22.1867 82.4005 15.666 88.9212 15.666 96.9652C15.666 105.009 22.1867 111.53 30.2307 111.53C30.2703 111.53 30.31 111.526 30.348 111.526V111.53H55.4285C50.2482 109.12 46.6221 103.563 46.6221 97.0928Z" fill="#D72D5D"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M70.5415 82.4005H62.9064C54.8625 82.4005 48.3418 88.9212 48.3418 96.9652C48.3418 105.009 54.8625 111.53 62.9064 111.53H70.5415C78.5855 111.53 85.1062 105.009 85.1062 96.9652C85.1062 88.9212 78.5855 82.4005 70.5415 82.4005Z" fill="#D72D5D"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M30.4045 66.7114C30.4045 60.1786 34.1013 54.5756 39.361 52.2071V52.1467H14.7479C6.71778 52.1467 0.0607914 58.5708 0.000414512 66.601C-0.0599624 74.6949 6.48317 81.276 14.5651 81.276H39.4352C39.449 81.276 39.4524 81.257 39.4403 81.2519C34.1375 78.9023 30.4045 73.2787 30.4045 66.7114Z" fill="#D72D5D"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M86.1169 52.1467H61.4072V52.1761C66.7049 54.5273 70.4344 60.1493 70.4344 66.7114C70.4344 73.2735 66.7049 78.8954 61.4072 81.2467V81.276H86.2998C94.3799 81.276 100.923 74.6949 100.864 66.601C100.804 58.5708 94.1488 52.1467 86.1169 52.1467Z" fill="#D72D5D"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M54.2105 52.1467H46.6271C38.5832 52.1467 32.0625 58.6674 32.0625 66.7114C32.0625 74.7553 38.5832 81.276 46.6271 81.276H54.2105C62.2544 81.276 68.7751 74.7553 68.7751 66.7114C68.7751 58.6674 62.2544 52.1467 54.2105 52.1467Z" fill="#D72D5D"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M69.8068 0.0311313C69.9707 11.194 64.5488 17.3386 55.8752 19.7278C53.2204 20.4592 48.3919 21.113 45.2472 20.2315C45.0471 4.82851 54.7971 -0.474311 69.8068 0.0328554V0.0311313Z" fill="#149D44"/>
  </g>

  <!-- Montagnes lointaines -->
  <path d="M0 180 Q100 120 200 160 Q300 100 400 150 Q500 90 600 140 Q700 100 800 160 L800 250 L0 250 Z" fill="${theme.mountainColor}" opacity="0.5"/>

  <!-- Forêt arrière-plan -->
  <path d="M0 200 Q50 160 100 190 Q150 150 200 185 Q250 140 300 180 Q350 130 400 175 Q450 145 500 185 Q550 135 600 175 Q650 150 700 190 Q750 155 800 195 L800 250 L0 250 Z" fill="${theme.forestColor}" opacity="0.7"/>

  <!-- Sol de la forêt -->
  <path d="M0 220 Q200 210 400 225 Q600 215 800 220 L800 250 L0 250 Z" fill="${theme.groundColor}"/>

  <!-- Dancing veggies GIF -->
  <image x="210" y="180" width="380" height="65" href="data:image/gif;base64,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"/>

  <!-- Lucioles -->
  <g style="${fireflyStyle}">
    <circle class="firefly" cx="150" cy="180" r="2" fill="#a8e6cf" filter="url(#glow)"/>
    <circle class="firefly" cx="300" cy="160" r="1.5" fill="#a8e6cf" filter="url(#glow)" style="animation-delay: 0.7s"/>
    <circle class="firefly" cx="500" cy="175" r="2" fill="#a8e6cf" filter="url(#glow)" style="animation-delay: 1.4s"/>
    <circle class="firefly" cx="400" cy="145" r="1.8" fill="#a8e6cf" filter="url(#glow)" style="animation-delay: 0.3s"/>
  </g>

  <!-- Texte principal -->
  <g class="title">
    <text x="400" y="115" text-anchor="middle" font-family="Georgia, serif" font-size="42" font-weight="bold" fill="${theme.titleColor}" filter="url(#softGlow)">
      Mathieu Grosso
    </text>
    <text x="400" y="155" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="${theme.subtitleColor}" opacity="0.9">
      Building AI for sustainable supply chain 🌿
    </text>
  </g>
</svg>`;
}

// Main execution
const hour = new Date().getHours();
const theme = getTheme(hour);
const svgContent = generateSVG(theme);

// Determine output path (default to current directory)
const outputPath = path.join(process.cwd(), 'github-banner.svg');

fs.writeFileSync(outputPath, svgContent);
console.log(`Generated banner for ${theme.name} (Hour: ${hour})`);

