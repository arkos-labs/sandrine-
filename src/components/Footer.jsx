import { Link } from 'react-router-dom'
import { Globe, MessageCircle, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#1A3326] text-white pt-16 pb-8 px-4 mt-auto">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="font-display text-2xl mb-4 tracking-tight">Avenue Services</h2>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xs">
              L'entraide de confiance près de chez vous. Rejoignez une communauté solidaire, inclusive et sécurisée.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Website">
                <Globe size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Contact">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Location">
                <MapPin size={20} />
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h3 className="font-bold tracking-widest text-[10px] uppercase text-white/50 mb-4">À propos</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-white/80 hover:text-white text-sm transition-colors">Notre concept</Link></li>
              <li><Link to="/" className="text-white/80 hover:text-white text-sm transition-colors">La charte de confiance</Link></li>
              <li><Link to="/" className="text-white/80 hover:text-white text-sm transition-colors">Comment ça marche</Link></li>
              <li><Link to="/" className="text-white/80 hover:text-white text-sm transition-colors">Blog & Actualités</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h3 className="font-bold tracking-widest text-[10px] uppercase text-white/50 mb-4">Services</h3>
            <ul className="space-y-3">
              <li><Link to="/marketplace" className="text-white/80 hover:text-white text-sm transition-colors">Trouver un talent</Link></li>
              <li><Link to="/post-task" className="text-white/80 hover:text-white text-sm transition-colors">Proposer une mission</Link></li>
              <li><Link to="/" className="text-white/80 hover:text-white text-sm transition-colors">Bricolage & Réparation</Link></li>
              <li><Link to="/" className="text-white/80 hover:text-white text-sm transition-colors">Garde d'animaux</Link></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h3 className="font-bold tracking-widest text-[10px] uppercase text-white/50 mb-4">Assistance</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-white/80 hover:text-white text-sm transition-colors">Centre d'aide</Link></li>
              <li><Link to="/" className="text-white/80 hover:text-white text-sm transition-colors">Contactez-nous</Link></li>
              <li><Link to="/" className="text-white/80 hover:text-white text-sm transition-colors">Mentions légales</Link></li>
              <li><Link to="/" className="text-white/80 hover:text-white text-sm transition-colors">Politique de confidentialité</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-xs">
            © {new Date().getFullYear()} Avenue Services. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2 text-white/50 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[--color-tx-danger]"></span>
            Communauté vérifiée
          </div>
        </div>
      </div>
    </footer>
  )
}
