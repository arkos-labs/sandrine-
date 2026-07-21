import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrench, Leaf, Truck, SprayCan, Baby, PawPrint, Laptop, Home, BookOpen } from 'lucide-react';

const CATEGORIES = [
  { id: 'bricolage', label: 'Bricolage', icon: Wrench },
  { id: 'jardinage', label: 'Jardinage', icon: Leaf },
  { id: 'demenagement', label: 'Déménagement', icon: Truck },
  { id: 'menage', label: 'Ménage', icon: SprayCan },
  { id: 'enfants', label: 'Enfants', icon: Baby },
  { id: 'animaux', label: 'Animaux', icon: PawPrint },
  { id: 'informatique', label: 'Informatique', icon: Laptop },
  { id: 'aide', label: 'Aide à domicile', icon: Home },
  { id: 'cours', label: 'Cours particuliers', icon: BookOpen },
];

const RAINBOW_COLORS = [
  '#FF0018', // Red
  '#FFA52C', // Orange
  '#FFFF41', // Yellow
  '#008018', // Green
  '#0000F9', // Blue
  '#86007D'  // Purple
];

export function RainbowCategories() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-[1400px] mx-auto mt-12 px-4 hidden md:block">
      {/* 
        Container aspect ratio. 
        A viewBox of 1000x550 gives enough vertical space for the icons sticking out.
        The rainbow center is at (500, 500)
      */}
      <div className="relative w-full pb-[55%]">
        <svg 
          viewBox="0 0 1000 550" 
          className="absolute inset-0 w-full h-full drop-shadow-2xl animate-[fade-in_1s_ease-out]"
          style={{ filter: 'drop-shadow(0 20px 20px rgba(0,0,0,0.1))' }}
        >
          {RAINBOW_COLORS.map((color, i) => {
            const r = 400 - i * 45; // Radii: 400, 355, 310, 265, 220, 175
            return (
              <path 
                key={color}
                d={`M ${500 - r} 500 A ${r} ${r} 0 0 1 ${500 + r} 500`}
                stroke={color}
                strokeWidth="46"
                fill="none"
                strokeLinecap="butt"
              />
            );
          })}
        </svg>

        {/* Icons */}
        {CATEGORIES.map((cat, i) => {
          const total = CATEGORIES.length;
          // distribute from 176 to 4 degrees to use maximum space without clipping
          const angleDeg = 176 - (172 / (total - 1)) * i;
          const angleRad = (angleDeg * Math.PI) / 180;
          
          // Mettre les icônes plus vers l'extérieur de l'arc pour avoir plus de place (circonférence plus grande)
          const radius = 350; 
          
          // Center is (500, 500) in the 1000x550 viewBox.
          // Convert to percentages for CSS absolute positioning so it scales!
          const cx = 50 + (radius * Math.cos(angleRad)) / 10; // %
          const cy = (500 - radius * Math.sin(angleRad)) / 550 * 100; // %

          return (
            <button
              key={cat.id}
              onClick={() => navigate('/' + cat.id)}
              className="absolute group flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-300 z-10"
              style={{ left: `${cx}%`, top: `${cy}%` }}
            >
              <div className="w-14 h-14 lg:w-[72px] lg:h-[72px] bg-white rounded-full flex items-center justify-center shadow-xl text-slate-700 group-hover:text-[#0078FA] border-2 border-transparent group-hover:border-[#0078FA] transition-colors">
                <cat.icon className="w-6 h-6 lg:w-8 lg:h-8" strokeWidth={1.5} />
              </div>
              <span className="mt-2 text-xs lg:text-sm font-bold text-white bg-black/60 px-3 py-1.5 rounded-full whitespace-nowrap backdrop-blur-sm opacity-90 group-hover:opacity-100 group-hover:bg-[#0078FA] transition-colors shadow-md">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
