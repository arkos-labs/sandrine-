import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Heart, Briefcase, ShoppingBag, Users, Flag, ArrowLeft } from 'lucide-react';

const CATEGORIES = [
  { 
    id: 'maison', 
    label: 'Maison', 
    icon: Home,
    subCategories: ['Meubles', 'Bricolage', 'Plomberie', 'Élec', 'Serrurerie', 'Peinture', 'Jardinage', 'Ménage', 'Déménagement', 'Nettoyage', 'Informatique']
  },
  { 
    id: 'sante', 
    label: 'Santé', 
    icon: Heart,
    subCategories: ['Généralistes', 'Gynécos', 'Urologues', 'Sages-femmes', 'Psys', 'Dentistes', 'Kinés', 'Ostéopathes', 'Nutrition', 'Dépistage', 'Coachs', 'Massages', 'Esthétique']
  },
  { 
    id: 'pro', 
    label: 'Pro & Admin', 
    icon: Briefcase,
    subCategories: ['Avocats', 'Notaires', 'Comptables', 'Banques', 'Assurances', 'Courtiers', 'Immobilier', 'Architectes', 'Traducteurs', 'Photographes', 'Carrière']
  },
  { 
    id: 'shopping', 
    label: 'Shopping', 
    icon: ShoppingBag,
    subCategories: ['Restaurants', 'Bars', 'Cafés', 'Coiffeurs', 'Tatoueurs', 'Boutiques', 'Hôtels', 'Salle de sport', 'Animaleries', 'Fleuristes', 'Librairies']
  },
  { 
    id: 'entraide', 
    label: 'Entraide', 
    icon: Users,
    subCategories: ['Baby-sitting', 'Pet-sitting', 'Cours', 'Réparations', 'Couture', 'Livraison', 'Transport', 'Administratif', 'Garde', 'Cuisine', 'Aide']
  },
  { 
    id: 'communaute', 
    label: 'Communauté', 
    icon: Flag,
    subCategories: ['Associations', 'Événements', 'Fiertés', 'Groupes', 'Centres', 'Lieux safe', 'Guides']
  },
];

export function RainbowCategories() {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState(null);

  // Render icons along the arc
  const renderIcons = () => {
    // If a domain is selected, we map its subcategories. Otherwise, we map the 6 main domains.
    const items = selectedDomain ? selectedDomain.subCategories : CATEGORIES;
    const totalIcons = items.length;
    
    // Spread evenly across the arc (180 to 0 degrees for perfect half-circle)
    const startAngle = 180;
    const endAngle = 0;
    const angleStep = (startAngle - endAngle) / (totalIcons - 1 || 1);

    return items.map((item, index) => {
      const angleDeg = startAngle - index * angleStep;
      const angleRad = (angleDeg * Math.PI) / 180;
      
      const cx = 500;
      const cy = 480; // The arc center is at y=480
      
      if (!selectedDomain) {
        // Main Domain Button : exactly on the arc (r = 400)
        const r = 400; 
        const x = cx + r * Math.cos(angleRad);
        const y = cy - r * Math.sin(angleRad);
        const posX = (x / 1000) * 100;
        const posY = (y / 500) * 100;

        const cat = item;
        return (
          <button 
            key={cat.id}
            onClick={() => setSelectedDomain(cat)}
            className="absolute group flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 duration-300 z-20 animate-pop-arc"
            style={{ 
              left: `${posX}%`, 
              top: `${posY}%`,
              animationDelay: `${index * 0.05}s` 
            }}
          >
            <div className="w-11 h-11 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-transparent text-[#5B21B6] group-hover:border-[#5B21B6] transition-colors relative z-20">
              <cat.icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
            </div>
            <span className="mt-1.5 text-[10px] md:text-[11px] font-bold text-slate-800 bg-white px-2.5 py-1 rounded-full whitespace-nowrap shadow-md group-hover:bg-[#5B21B6] group-hover:text-white transition-colors relative z-20">
              {cat.label}
            </span>
          </button>
        );
      } else {
        // Subcategory Button (smaller, no icon, perfectly on the arc)
        const r = 400;
        const x = cx + r * Math.cos(angleRad);
        const y = cy - r * Math.sin(angleRad);
        const posX = (x / 1000) * 100;
        const posY = (y / 500) * 100;

        const sub = item;
        return (
          <button 
            key={sub}
            onClick={() => navigate(`/marketplace?category=${encodeURIComponent(sub)}`)}
            className="absolute group flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 duration-300 z-20 animate-pop-arc"
            style={{ 
              left: `${posX}%`, 
              top: `${posY}%`,
              animationDelay: `${index * 0.03}s` 
            }}
          >
            <span className="text-[9px] md:text-[10px] font-bold text-[#5B21B6] bg-white border border-slate-200 px-2.5 py-1.5 rounded-full whitespace-nowrap shadow-lg hover:border-[#5B21B6] hover:bg-purple-50 transition-colors">
              {sub}
            </span>
          </button>
        );
      }
    });
  };

  return (
    <div className="relative w-full max-w-[800px] mx-auto mt-8 px-2 pb-16 overflow-visible">
      {/* Container aspect ratio for the arc matched to SVG viewBox 1000x500 (2:1 -> 50%) */}
      <div className="relative w-full pb-[50%]">
        
        {/* SVG Arc Line */}
        <svg 
          viewBox="0 0 1000 500" 
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          preserveAspectRatio="xMidYMax slice"
        >
          <defs>
            <linearGradient id="rainbowLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="15%" stopColor="#f97316" />
              <stop offset="30%" stopColor="#eab308" />
              <stop offset="45%" stopColor="#22c55e" />
              <stop offset="60%" stopColor="#3b82f6" />
              <stop offset="75%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          
          <path 
            d="M 100 480 A 400 400 0 0 1 900 480" 
            fill="none" 
            stroke="url(#rainbowLine)" 
            strokeWidth="6"
            strokeLinecap="round"
            className="animate-arc"
          />
        </svg>

        {/* Central Circular Image */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[20%] w-[55%] max-w-[280px] aspect-square rounded-full border-8 border-white shadow-2xl overflow-hidden z-0">
          <img 
            src="https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=600&q=80" 
            alt="Communauté" 
            className={`w-full h-full object-cover transition-all duration-500 ${selectedDomain ? 'scale-110 brightness-50' : 'scale-100 brightness-100'}`}
          />
          
          {/* Back button overlay inside the image when a domain is selected */}
          {selectedDomain && (
            <div className="absolute inset-0 flex flex-col items-center justify-center animate-scale-in text-white">
              <selectedDomain.icon size={32} className="mb-2 opacity-80" />
              <span className="font-display font-bold text-lg mb-4 text-center px-4 leading-tight">
                {selectedDomain.label}
              </span>
              <button 
                onClick={() => setSelectedDomain(null)}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/40 text-white font-bold py-2 px-5 rounded-full flex items-center gap-2 transition-all"
              >
                <ArrowLeft size={16} />
                Retour
              </button>
            </div>
          )}
        </div>

        {/* Interactive Category Buttons drawn on the arc */}
        {renderIcons()}

      </div>
    </div>
  );
}
