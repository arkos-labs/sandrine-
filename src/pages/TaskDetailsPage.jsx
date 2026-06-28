import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopNav } from '../components/TopNav'
import { BottomNav } from '../components/BottomNav'
import { MapPin, Calendar, Clock, MessageSquare, ArrowRight, Star, Shield, HelpCircle, ChevronRight, Phone, Wrench, X, CreditCard, Lock, CheckCircle } from 'lucide-react'

export default function TaskDetailsPage() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [modalStep, setModalStep] = useState(1)

  return (
    <div className="min-h-screen bg-[#F3F4F6] pb-20">
      <TopNav />
      
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 pt-6">
        {/* Breadcrumb */}
        <div className="text-sm font-medium mb-6">
          <span className="text-[#0078FA] cursor-pointer" onClick={() => navigate('/')}>Mes demandes</span>
          <span className="text-slate-400 mx-2">›</span>
          <span className="text-slate-700">Montage de meubles IKEA</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Task Card */}
            <div className="bg-white rounded-[20px] overflow-hidden border border-slate-200">
              <div className="h-40 bg-[#90E0EF] relative overflow-hidden flex items-end justify-center">
                {/* Abstract illustration block */}
                <div className="w-full h-full bg-[#E5B581] opacity-90 absolute right-0 translate-x-1/4"></div>
                <div className="absolute w-32 h-20 bg-[#0078FA] rounded-xl flex items-center justify-center top-10 right-20">
                  <div className="w-16 h-8 bg-[#FFD166] rounded-full"></div>
                </div>
              </div>
              
              <div className="p-6">
                <h1 className="text-2xl font-bold text-[#0F172A] mb-1">Montage de meubles IKEA</h1>
                <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-6 font-medium">
                  <MapPin size={14} /> 75012 Paris
                </div>

                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0078FA]">
                      <Calendar size={16} />
                    </div>
                    <span className="text-[#0F172A] font-bold text-[15px]">Lundi 29 juin à 16:30</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0078FA]">
                      <Clock size={16} />
                    </div>
                    <span className="text-[#0F172A] font-bold text-[15px]">4h de service</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 py-3 bg-white border border-slate-200 rounded-xl text-[#0078FA] font-bold hover:bg-slate-50 transition-colors">
                    Voir plus
                  </button>
                  <button className="flex-1 py-3 bg-blue-50 border border-blue-100 rounded-xl text-[#0078FA] font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                    <Shield size={18} /> Modifier
                  </button>
                </div>
              </div>
            </div>

            {/* Offers Section */}
            <div className="flex items-center justify-between mt-2">
              <h2 className="text-[22px] font-bold text-[#0F172A]">Offres (10)</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-700 font-bold text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M7 12h10"></path><path d="M10 18h4"></path></svg>
                Trier
              </button>
            </div>

            {/* Offer Card */}
            <div className="bg-white rounded-[20px] p-6 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="Ryad" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#6366F1] rounded-full border-2 border-white flex items-center justify-center text-white">
                      <Star size={10} className="fill-current" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-[19px] text-[#0F172A] leading-tight">Ryad</h3>
                    <div className="flex items-center gap-1 mt-0.5 mb-1.5 text-[13px]">
                      <Star size={12} className="text-[#F59E0B] fill-current" />
                      <span className="font-bold text-[#0F172A]">5,0</span>
                      <span className="text-slate-500">(38 avis)</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="inline-flex items-center gap-1 bg-[#6366F1] text-white text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full w-max">
                        <Shield size={10} className="fill-current" /> Top prestataire
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#059669] text-[11px] font-bold w-max bg-emerald-50 px-2 py-0.5 rounded-full">
                        <MapPin size={10} /> Éco-distance
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#D97706] text-[11px] font-bold w-max bg-amber-50 px-2 py-0.5 rounded-full">
                        <Star size={10} className="fill-current" /> Excellente offre
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-2xl text-[#0F172A]">80 €</div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3 text-sm text-slate-700">
                  <div className="font-bold w-6 text-center">40</div>
                  <div className="font-medium">Prestations de bricolage réalisées</div>
                </div>
                <div className="flex items-center gap-3 mb-3 text-sm text-slate-700">
                  <div className="w-6 flex justify-center text-slate-400"><Clock size={16} /></div>
                  <div className="font-medium">2 à 4 ans d'expérience</div>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-700">
                  <div className="w-6 flex justify-center text-slate-400 mt-0.5"><Wrench size={16} /></div>
                  <div className="font-medium leading-relaxed">
                    <span className="text-slate-500 mr-1">Possède</span>
                    Clé à molette, Marteau, Visseuse, Set de tournevis, Rabot, Perceuse perforatrice... <span className="font-bold cursor-pointer">Voir plus</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg">Respect des lieux</span>
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg">Travail soigné</span>
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg">Dynamique et souriant</span>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 mb-6 relative">
                <div className="text-sm font-medium text-slate-800 italic mb-2">"Merci !"</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <div className="flex text-[#F59E0B]">
                    {[1,2,3,4,5].map(i => <Star key={i} size={10} className="fill-current" />)}
                  </div>
                  <span className="font-semibold text-slate-700">Caroline</span>
                  <span>• Il y a 8 heures</span>
                </div>
              </div>

              <button 
                onClick={() => setShowModal(true)} 
                className="w-full bg-[#0078FA] text-white font-bold text-lg rounded-xl py-4 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 mb-3"
              >
                Continuer avec Ryad <ArrowRight size={20} />
              </button>
              
              <button className="w-full bg-blue-50 text-[#0078FA] font-bold text-[15px] rounded-xl py-3 hover:bg-blue-100 transition-colors">
                Voir le profil
              </button>
              
              <div className="text-center mt-3 text-xs font-medium text-slate-500">
                Tarif horaire : <span className="font-bold text-slate-700">20,00 €/h</span>
              </div>
            </div>
            
          </div>

          {/* Right Column */}
          <div className="lg:w-[340px] flex-shrink-0 flex flex-col gap-6">
            
            {/* Discussion Publique */}
            <div className="bg-white rounded-[20px] border border-slate-200 overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="font-bold text-[17px] text-[#0F172A]">Discussion publique (0)</h2>
              </div>
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 mb-4 relative">
                  <div className="absolute inset-0 bg-blue-100 rounded-full scale-110 opacity-50"></div>
                  <div className="absolute inset-0 bg-[#0078FA] rounded-2xl rotate-12 opacity-10"></div>
                  <MessageSquare size={48} className="absolute inset-0 m-auto text-[#0078FA]" />
                </div>
                <h3 className="font-bold text-[17px] text-[#0F172A] mb-2">Aucun message</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Vous trouverez ici tous les messages des prestataires intéressés par votre demande.
                </p>
              </div>
              <div className="p-4 border-t border-slate-100 bg-slate-50">
                <div className="flex gap-2 relative">
                  <div className="w-10 h-10 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    N
                  </div>
                  <div className="flex-1 bg-slate-200 rounded-full h-10 px-4 flex items-center text-sm text-slate-500">
                    Ajouter un commentaire...
                  </div>
                  <button className="w-10 h-10 bg-[#74AAFF] rounded-full flex items-center justify-center text-white">
                    <ArrowRight size={18} />
                  </button>
                </div>
                <div className="text-center mt-2 text-[10px] text-slate-400 font-medium">
                  Ne divulguez pas d'informations personnelles
                </div>
              </div>
            </div>

            {/* Besoin d'aide */}
            <div className="bg-white rounded-[20px] border border-slate-200 p-6">
              <h2 className="font-bold text-[17px] text-[#0F172A] mb-4">Besoin d'aide ?</h2>
              
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Questions fréquentes</span>
                  <span className="text-sm font-bold text-[#0078FA] cursor-pointer">Voir plus</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 cursor-pointer group">
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Comment discuter avec un prestataire ?</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 cursor-pointer group">
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Comment réserver un prestataire ?</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>
              </div>

              <div className="text-[13px] font-medium text-slate-400 mb-3">Nous contacter</div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#0078FA] shadow-sm">
                    <MessageSquare size={14} className="fill-current" />
                  </div>
                  <span className="text-sm font-semibold text-[#0078FA]">Nouvelle demande d'assistance</span>
                </div>
                <div className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                    <Phone size={14} className="fill-current" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-700">Contacter le service client</span>
                    <span className="text-[11px] font-medium text-slate-500">
                      <span className="text-[#EF4444]">Fermé</span> · Ouvre lundi à 09:00 <HelpCircle size={10} className="inline ml-0.5" />
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Onboarding Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-[24px] w-full max-w-[420px] shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200">
            <button onClick={() => { setShowModal(false); setModalStep(1); }} className="absolute top-5 right-5 text-slate-800 hover:text-black z-10">
              <X size={20} strokeWidth={3} />
            </button>
            
            <div className="h-[240px] bg-[#F0F7FF] flex items-center justify-center relative overflow-hidden">
              {modalStep === 1 && (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-[#0078FA] mb-4 relative z-10">
                    <MessageSquare size={48} className="fill-current" />
                  </div>
                  <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
                </div>
              )}
              {modalStep === 2 && (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center text-[#059669] mb-4 relative z-10">
                    <Shield size={48} className="fill-current" />
                  </div>
                  <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
                </div>
              )}
              {modalStep === 3 && (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center text-[#4F46E5] mb-4 relative z-10">
                    <CreditCard size={48} className="fill-current" />
                  </div>
                  <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
                </div>
              )}
            </div>
            
            <div className="p-8">
              <div className="h-28">
                {modalStep === 1 && (
                  <>
                    <h2 className="text-[22px] font-bold text-[#0F172A] mb-3">Réservez votre prestataire</h2>
                    <p className="text-slate-500 text-[15px] leading-relaxed">
                      Vous obtiendrez son numéro de téléphone et aurez accès à une messagerie privée.
                    </p>
                  </>
                )}
                {modalStep === 2 && (
                  <>
                    <h2 className="text-[22px] font-bold text-[#0F172A] mb-3">Profitez de nos garanties</h2>
                    <p className="text-slate-500 text-[15px] leading-relaxed">
                      De la réservation à la réalisation, bénéficiez de nos nombreux avantages, incluant un accompagnement téléphonique personnalisé.
                    </p>
                  </>
                )}
                {modalStep === 3 && (
                  <>
                    <h2 className="text-[22px] font-bold text-[#0F172A] mb-3">Envoyez le paiement</h2>
                    <p className="text-slate-500 text-[15px] leading-relaxed">
                      Une fois la prestation réalisée, payez en ligne le nombre d'heures effectuées par votre prestataire et évaluez ses compétences.
                    </p>
                  </>
                )}
              </div>

              {/* Progress bar */}
              <div className="flex gap-2 mb-6">
                <div className={`h-1 flex-1 rounded-full ${modalStep >= 1 ? 'bg-[#0078FA]' : 'bg-slate-200'}`}></div>
                <div className={`h-1 flex-1 rounded-full ${modalStep >= 2 ? 'bg-[#0078FA]' : 'bg-slate-200'}`}></div>
                <div className={`h-1 flex-1 rounded-full ${modalStep >= 3 ? 'bg-[#0078FA]' : 'bg-slate-200'}`}></div>
              </div>

              <div className="flex items-center justify-between mt-2">
                {modalStep > 1 ? (
                  <button onClick={() => setModalStep(s => s - 1)} className="text-[#0F172A] font-bold text-[15px]">
                    Précédent
                  </button>
                ) : <div></div>}
                
                <button 
                  onClick={() => {
                    if (modalStep < 3) setModalStep(s => s + 1)
                    else {
                      setShowModal(false)
                      navigate('/booking/ryad')
                    }
                  }}
                  className="bg-[#0078FA] text-white font-bold text-[15px] rounded-xl py-3 px-6 hover:bg-blue-600 transition-colors"
                >
                  {modalStep === 3 ? "D'accord" : "Continuer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
