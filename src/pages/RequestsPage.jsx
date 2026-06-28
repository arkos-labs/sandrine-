import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopNav } from '../components/TopNav'
import { BottomNav } from '../components/BottomNav'
import { MapPin, Clock, ArrowRight, Wrench, XCircle, CheckCircle2 } from 'lucide-react'

const MOCK_REQUESTS = {
  active: [
    {
      id: '1',
      title: 'Montage de meubles IKEA',
      date: 'Lundi 29 juin à 16:30',
      address: '75012 Paris',
      status: 'En attente de prestataires',
      offersCount: 10,
      icon: Wrench,
      color: 'bg-blue-100 text-[#0078FA]',
    }
  ],
  past: [
    {
      id: '2',
      title: 'Tonte de pelouse',
      date: 'Mardi 12 mai à 10:00',
      address: '94300 Vincennes',
      status: 'Terminée',
      provider: 'Ryad',
      price: '45 €',
      icon: CheckCircle2,
      color: 'bg-emerald-100 text-emerald-600',
    }
  ],
  cancelled: [
    {
      id: '3',
      title: 'Réparation fuite évier',
      date: 'Jeudi 2 avril à 14:00',
      address: '75012 Paris',
      status: 'Annulée',
      icon: XCircle,
      color: 'bg-red-100 text-red-600',
    }
  ]
}

export default function RequestsPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('active')

  const tabs = [
    { id: 'active', label: 'En cours', count: MOCK_REQUESTS.active.length },
    { id: 'past', label: 'Passées', count: MOCK_REQUESTS.past.length },
    { id: 'cancelled', label: 'Annulées', count: MOCK_REQUESTS.cancelled.length }
  ]

  const currentRequests = MOCK_REQUESTS[activeTab]

  return (
    <div className="min-h-screen bg-[#F3F4F6] pb-20">
      <TopNav />
      
      <div className="max-w-[800px] mx-auto px-4 md:px-6 pt-10">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-8">Mes demandes</h1>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-slate-200 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-[15px] font-bold relative transition-colors ${
                activeTab === tab.id 
                  ? 'text-[#0078FA]' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label} ({tab.count})
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0078FA] rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* List of requests */}
        <div className="flex flex-col gap-4">
          {currentRequests.length === 0 ? (
            <div className="bg-white rounded-[20px] p-10 text-center border border-slate-200">
              <p className="text-slate-500 text-lg">Aucune demande dans cette catégorie.</p>
            </div>
          ) : (
            currentRequests.map(req => (
              <div 
                key={req.id} 
                onClick={() => req.id === '1' && navigate('/task-details')}
                className="bg-white rounded-[20px] p-6 border border-slate-200 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${req.color} flex-shrink-0`}>
                      <req.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#0F172A] mb-2 group-hover:text-[#0078FA] transition-colors">{req.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5"><Clock size={14} /> {req.date}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={14} /> {req.address}</span>
                      </div>
                      
                      <div className="mt-4 flex items-center gap-3">
                        <span className="text-xs font-bold uppercase tracking-wide px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                          {req.status}
                        </span>
                        {req.offersCount && (
                          <span className="text-xs font-bold uppercase tracking-wide px-3 py-1 bg-[#0078FA] text-white rounded-full">
                            {req.offersCount} offres
                          </span>
                        )}
                        {req.provider && (
                          <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                            Réalisé par {req.provider} • {req.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-[#0078FA] transition-colors">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}
