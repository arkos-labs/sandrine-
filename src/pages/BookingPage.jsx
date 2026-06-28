import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopNav } from '../components/TopNav'
import { BottomNav } from '../components/BottomNav'
import { MapPin, Calendar, Clock, MessageSquare, ArrowRight, Star, Shield, HelpCircle, ChevronRight, Phone, Wrench, X, CreditCard, Lock, CheckCircle, ChevronDown, Plus } from 'lucide-react'

export default function BookingPage() {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('card')

  return (
    <div className="min-h-screen bg-[#F3F4F6] pb-20">
      <TopNav />
      
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 pt-6">
        <h1 className="text-[28px] font-bold text-[#0F172A] mb-6">Réservation de Ryad</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Payment Methods */}
            <div className="bg-white rounded-[20px] p-6 border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-[17px] font-bold text-[#0F172A]">Moyen de paiement</h2>
                <div className="flex items-center flex-wrap gap-1.5">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Carte_Bleue_logo.svg" className="h-4 object-contain" alt="CB" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" className="h-4 object-contain mx-1" alt="Visa" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" className="h-4 object-contain mx-1" alt="Mastercard" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" className="h-4 object-contain mx-1" alt="Amex" />
                  <span className="text-slate-200">|</span>
                  <div className="bg-black text-white px-1 py-0.5 rounded text-[8px] font-bold mx-1">Pay</div>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="h-3 object-contain" alt="Apple" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4 object-contain mx-1" alt="PayPal" />
                </div>
              </div>

              <div className="flex flex-col gap-0 border-y border-slate-100">
                <label className="flex items-center justify-between py-4 cursor-pointer border-b border-slate-100 last:border-0 group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 border border-slate-200 rounded flex items-center justify-center bg-slate-50">
                      <CreditCard size={16} className="text-slate-400" />
                    </div>
                    <span className="text-[#0F172A] font-medium text-[15px]">Carte de paiement</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'card' ? 'border-[#0078FA]' : 'border-slate-300 group-hover:border-[#0078FA]'}`}>
                    {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-[#0078FA] rounded-full"></div>}
                  </div>
                  <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="sr-only" />
                </label>

                <label className="flex items-center justify-between py-4 cursor-pointer border-b border-slate-100 last:border-0 group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 border border-slate-200 rounded flex items-center justify-center bg-white">
                      <div className="flex items-center gap-0.5 text-black font-bold text-[10px]">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="h-3" alt="Apple" />
                        Pay
                      </div>
                    </div>
                    <span className="text-[#0F172A] font-medium text-[15px]">Apple Pay</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'apple' ? 'border-[#0078FA]' : 'border-slate-300 group-hover:border-[#0078FA]'}`}>
                    {paymentMethod === 'apple' && <div className="w-2.5 h-2.5 bg-[#0078FA] rounded-full"></div>}
                  </div>
                  <input type="radio" name="payment" value="apple" checked={paymentMethod === 'apple'} onChange={() => setPaymentMethod('apple')} className="sr-only" />
                </label>

                <label className="flex items-center justify-between py-4 cursor-pointer border-b border-slate-100 last:border-0 group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 border border-slate-200 rounded flex items-center justify-center bg-white">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="h-3" alt="Google" />
                      <span className="text-slate-600 font-medium text-[10px] ml-0.5">Pay</span>
                    </div>
                    <span className="text-[#0F172A] font-medium text-[15px]">Google Pay</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'google' ? 'border-[#0078FA]' : 'border-slate-300 group-hover:border-[#0078FA]'}`}>
                    {paymentMethod === 'google' && <div className="w-2.5 h-2.5 bg-[#0078FA] rounded-full"></div>}
                  </div>
                  <input type="radio" name="payment" value="google" checked={paymentMethod === 'google'} onChange={() => setPaymentMethod('google')} className="sr-only" />
                </label>

                <label className="flex items-center justify-between py-4 cursor-pointer group">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-10 h-6 border border-slate-200 rounded flex items-center justify-center bg-white">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-3" alt="PayPal" />
                      </div>
                      <span className="text-[#0F172A] font-medium text-[15px]">PayPal</span>
                    </div>
                    <span className="text-slate-500 text-xs ml-[52px]">Payez en 1x ou 4x sans frais</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'paypal' ? 'border-[#0078FA]' : 'border-slate-300 group-hover:border-[#0078FA]'}`}>
                    {paymentMethod === 'paypal' && <div className="w-2.5 h-2.5 bg-[#0078FA] rounded-full"></div>}
                  </div>
                  <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="sr-only" />
                </label>
              </div>

              <div className="mt-6 mb-4">
                <p className="text-slate-600 text-sm font-medium text-center md:text-left">Ceci est un prépaiement, le montant est remboursé en cas d'annulation.</p>
              </div>

              <button 
                onClick={() => {
                  alert("Paiement simulé ! Redirection...")
                  navigate('/')
                }}
                className="w-full bg-[#0078FA] text-white font-bold text-lg rounded-xl py-4 hover:bg-blue-600 transition-colors"
              >
                Réserver
              </button>
            </div>

            {/* FAQ Accordions */}
            <div className="bg-white rounded-[20px] p-6 border border-slate-200">
              <div className="flex flex-col divide-y divide-slate-100">
                <div className="py-4 flex items-center justify-between cursor-pointer group">
                  <span className="text-[#0F172A] font-bold text-[14px]">Que faire si la prestation dure plus longtemps que prévu ?</span>
                  <ChevronDown size={18} className="text-slate-400 group-hover:text-slate-800 transition-colors" />
                </div>
                <div className="py-4 flex items-center justify-between cursor-pointer group">
                  <span className="text-[#0F172A] font-bold text-[14px]">Que faire en cas d'imprévu ?</span>
                  <ChevronDown size={18} className="text-slate-400 group-hover:text-slate-800 transition-colors" />
                </div>
                <div className="py-4 flex items-center justify-between cursor-pointer group">
                  <span className="text-[#0F172A] font-bold text-[14px]">Pourquoi dois-je payer maintenant ?</span>
                  <ChevronDown size={18} className="text-slate-400 group-hover:text-slate-800 transition-colors" />
                </div>
                <div className="py-4 flex items-center justify-between cursor-pointer group">
                  <span className="text-[#0F172A] font-bold text-[14px]">Quelles sont les conditions d'annulation ?</span>
                  <ChevronDown size={18} className="text-slate-400 group-hover:text-slate-800 transition-colors" />
                </div>
              </div>
            </div>
            
          </div>

          {/* Right Column */}
          <div className="lg:w-[340px] flex-shrink-0 flex flex-col gap-6">
            
            {/* Summary Card */}
            <div className="bg-white rounded-[20px] border border-slate-200 overflow-hidden">
              <div className="h-32 bg-[#90E0EF] relative overflow-hidden flex items-end justify-center">
                <div className="w-full h-full bg-[#E5B581] opacity-90 absolute right-0 translate-x-1/4"></div>
                <div className="absolute w-32 h-20 bg-[#0078FA] rounded-xl flex items-center justify-center top-6 right-20">
                  <div className="w-16 h-8 bg-[#FFD166] rounded-full"></div>
                </div>
              </div>
              
              <div className="p-5 border-b border-slate-100">
                <h3 className="font-bold text-[15px] text-[#0F172A] mb-1">Montage de meubles IKEA</h3>
                <p className="text-slate-500 text-[13px] font-medium">Lundi 29 juin 2026 de 16:30 à 20:30 (4h)</p>
              </div>

              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="Ryad" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#6366F1] rounded-full border-2 border-white flex items-center justify-center text-white">
                      <Star size={6} className="fill-current" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F172A] leading-tight">Ryad</h4>
                    <div className="flex items-center gap-1 text-[11px] mt-0.5">
                      <Star size={10} className="text-[#F59E0B] fill-current" />
                      <span className="font-bold text-[#0F172A]">5,00</span>
                      <span className="text-slate-500">(38 avis)</span>
                    </div>
                    <span className="inline-flex items-center gap-1 bg-[#6366F1] text-white text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full mt-1">
                      <Shield size={8} className="fill-current" /> Top prestataire
                    </span>
                  </div>
                </div>
                <div className="font-bold text-[15px] text-[#0F172A]">80 €</div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-3 text-[13px]">
                  <span className="text-slate-600 font-medium">Rémunération prestataire</span>
                  <span className="text-[#0F172A] font-bold">80,00 €</span>
                </div>
                <div className="flex items-center justify-between mb-6 text-[13px]">
                  <span className="text-slate-600 font-medium flex items-center gap-1">Frais de service <HelpCircle size={12} className="text-slate-400" /></span>
                  <span className="text-[#0F172A] font-bold">16,00 €</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-[17px] text-[#0F172A]">Total</span>
                  <span className="font-bold text-[17px] text-[#0F172A]">96,00 €</span>
                </div>

                <div className="flex items-center gap-2 text-slate-500 font-semibold text-[13px] cursor-pointer hover:text-slate-800 transition-colors">
                  <Plus size={14} /> Ajouter un code promotionnel
                </div>
              </div>
            </div>

            {/* Besoin d'aide */}
            <div className="bg-white rounded-[20px] border border-slate-200 p-6">
              <h2 className="font-bold text-[15px] text-[#0F172A] mb-4">Besoin d'aide ?</h2>
              
              <div className="flex items-center justify-center gap-2 px-4 py-2 border border-blue-100 rounded-full cursor-pointer hover:bg-blue-50 transition-colors mb-4 w-max">
                <Phone size={14} className="text-[#0078FA]" />
                <span className="text-[13px] font-semibold text-[#0078FA]">Contacter le service client</span>
              </div>
              
              <div className="text-[11px] font-medium text-slate-500 text-center mb-6">
                <span className="text-[#EF4444]">Fermé</span> · Ouvre lundi à 09:00 <HelpCircle size={10} className="inline ml-0.5" />
              </div>

              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-[#0F172A]">
                Excellent <span className="font-normal mx-1">4.6 sur 5</span> 
                <Star size={12} className="text-[#00B67A] fill-current" /> Trustpilot
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
