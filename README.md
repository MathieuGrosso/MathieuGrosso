<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 250">
  <defs>
    <!-- Gradient pour le ciel style Ghibli -->
    <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e"/>
      <stop offset="50%" style="stop-color:#16213e"/>
      <stop offset="100%" style="stop-color:#0f3460"/>
    </linearGradient>
    
    <!-- Gradient forêt -->
    <linearGradient id="forest" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#2d5a27"/>
      <stop offset="100%" style="stop-color:#1e3d19"/>
    </linearGradient>
    
    <!-- Lueur des kodamas -->
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
    @keyframes sway {
      0%, 100% { transform: rotate(-2deg); }
      50% { transform: rotate(2deg); }
    }
    @keyframes kodama {
      0%, 100% { opacity: 0.6; transform: translateY(0); }
      50% { opacity: 1; transform: translateY(-5px); }
    }
    @keyframes firefly {
      0%, 100% { opacity: 0; }
      50% { opacity: 1; }
    }
    .star { animation: twinkle 3s ease-in-out infinite; }
    .star:nth-child(2) { animation-delay: 0.5s; }
    .star:nth-child(3) { animation-delay: 1s; }
    .star:nth-child(4) { animation-delay: 1.5s; }
    .kodama { animation: kodama 4s ease-in-out infinite; }
    .kodama:nth-child(2) { animation-delay: 1s; }
    .kodama:nth-child(3) { animation-delay: 2s; }
    .firefly { animation: firefly 2s ease-in-out infinite; }
    .title { animation: float 6s ease-in-out infinite; }
    .tree { transform-origin: bottom center; animation: sway 8s ease-in-out infinite; }
    .tree:nth-child(2) { animation-delay: 1s; }
    .tree:nth-child(3) { animation-delay: 2s; }
  </style>
  
  <!-- Fond ciel -->
  <rect width="800" height="250" fill="url(#sky)"/>
  
  <!-- Étoiles -->
  <g class="stars">
    <circle class="star" cx="50" cy="30" r="1.5" fill="#fff" opacity="0.8"/>
    <circle class="star" cx="150" cy="50" r="1" fill="#fff" opacity="0.6"/>
    <circle class="star" cx="250" cy="25" r="1.5" fill="#fff" opacity="0.7"/>
    <circle class="star" cx="350" cy="45" r="1" fill="#fff" opacity="0.5"/>
    <circle class="star" cx="450" cy="20" r="1.5" fill="#fff" opacity="0.8"/>
    <circle class="star" cx="550" cy="55" r="1" fill="#fff" opacity="0.6"/>
    <circle class="star" cx="650" cy="35" r="1.5" fill="#fff" opacity="0.7"/>
    <circle class="star" cx="750" cy="40" r="1" fill="#fff" opacity="0.5"/>
    <circle class="star" cx="100" cy="60" r="0.8" fill="#fff" opacity="0.4"/>
    <circle class="star" cx="700" cy="25" r="0.8" fill="#fff" opacity="0.4"/>
  </g>
  
  <!-- Lune -->
  <circle cx="680" cy="60" r="25" fill="#f4e4ba" opacity="0.9" filter="url(#softGlow)"/>
  <circle cx="690" cy="55" r="25" fill="url(#sky)"/>
  
  <!-- Montagnes lointaines -->
  <path d="M0 180 Q100 120 200 160 Q300 100 400 150 Q500 90 600 140 Q700 100 800 160 L800 250 L0 250 Z" fill="#1e3d19" opacity="0.5"/>
  
  <!-- Forêt arrière-plan -->
  <path d="M0 200 Q50 160 100 190 Q150 150 200 185 Q250 140 300 180 Q350 130 400 175 Q450 145 500 185 Q550 135 600 175 Q650 150 700 190 Q750 155 800 195 L800 250 L0 250 Z" fill="#2d5a27" opacity="0.7"/>
  
  <!-- Arbres stylisés -->
  <g class="tree">
    <path d="M80 250 L80 200 M80 210 Q60 190 80 180 M80 195 Q100 175 80 165" stroke="#1a4d1a" stroke-width="3" fill="none"/>
  </g>
  <g class="tree" style="animation-delay: 0.5s">
    <path d="M720 250 L720 190 M720 200 Q695 175 720 160 M720 180 Q745 155 720 140" stroke="#1a4d1a" stroke-width="3" fill="none"/>
  </g>
  
  <!-- Sol de la forêt -->
  <path d="M0 220 Q200 210 400 225 Q600 215 800 220 L800 250 L0 250 Z" fill="#1e3d19"/>
  
  <!-- Kodamas (esprits de la forêt) -->
  <g class="kodama" filter="url(#glow)">
    <ellipse cx="120" cy="215" rx="6" ry="8" fill="#e8f4e8" opacity="0.8"/>
    <circle cx="118" cy="212" r="1.5" fill="#2d5a27"/>
    <circle cx="122" cy="212" r="1.5" fill="#2d5a27"/>
  </g>
  <g class="kodama" filter="url(#glow)" style="animation-delay: 1.5s">
    <ellipse cx="680" cy="210" rx="5" ry="7" fill="#e8f4e8" opacity="0.7"/>
    <circle cx="678" cy="207" r="1.2" fill="#2d5a27"/>
    <circle cx="682" cy="207" r="1.2" fill="#2d5a27"/>
  </g>
  <g class="kodama" filter="url(#glow)" style="animation-delay: 3s">
    <ellipse cx="200" cy="222" rx="4" ry="6" fill="#e8f4e8" opacity="0.6"/>
    <circle cx="198" cy="220" r="1" fill="#2d5a27"/>
    <circle cx="202" cy="220" r="1" fill="#2d5a27"/>
  </g>
  
  <!-- Lucioles -->
  <circle class="firefly" cx="150" cy="180" r="2" fill="#a8e6cf" filter="url(#glow)" style="animation-delay: 0s"/>
  <circle class="firefly" cx="300" cy="160" r="1.5" fill="#a8e6cf" filter="url(#glow)" style="animation-delay: 0.7s"/>
  <circle class="firefly" cx="500" cy="175" r="2" fill="#a8e6cf" filter="url(#glow)" style="animation-delay: 1.4s"/>
  <circle class="firefly" cx="650" cy="155" r="1.5" fill="#a8e6cf" filter="url(#glow)" style="animation-delay: 2.1s"/>
  <circle class="firefly" cx="400" cy="145" r="1.8" fill="#a8e6cf" filter="url(#glow)" style="animation-delay: 0.3s"/>
  
  <!-- Texte principal -->
  <g class="title">
    <text x="400" y="100" text-anchor="middle" font-family="Georgia, serif" font-size="42" font-weight="bold" fill="#e8f4e8" filter="url(#softGlow)">
      Mathieu Grosso
    </text>
    <text x="400" y="135" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="#a8e6cf" opacity="0.9">
      Co-founder &amp; CTO @ Ida
    </text>
    <text x="400" y="160" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="#7fbc8c" opacity="0.8">
      Building AI for sustainable supply chains 🌿
    </text>
  </g>
</svg>
