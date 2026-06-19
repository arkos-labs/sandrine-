import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, Flag, Lock } from 'lucide-react'
import { ReportModal } from '../components/ReportModal'
import { BottomNav } from '../components/BottomNav'
import { TopNav } from '../components/TopNav'

// Mock messages for demo
const MOCK_MESSAGES = [
  { id: '1', sender_id: 'other', content: 'Bonjour ! Je suis intéressé·e par votre mission. J\'ai 5 ans d\'expérience dans ce domaine.', created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: '2', sender_id: 'me', content: 'Bonjour ! Super, est-ce que vous êtes disponible ce samedi matin ?', created_at: new Date(Date.now() - 3500000).toISOString() },
  { id: '3', sender_id: 'other', content: 'Oui, tout à fait disponible ! Je peux être là dès 9h si cela vous convient.', created_at: new Date(Date.now() - 3400000).toISOString() },
  { id: '4', sender_id: 'me', content: 'Parfait ! J\'ai quelques questions sur votre méthode de travail...', created_at: new Date(Date.now() - 3300000).toISOString() },
]

function formatTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export default function ChatPage() {
  const { chatId } = useParams()
  const navigate = useNavigate()
  const [messages, setMessages] = useState(MOCK_MESSAGES)
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [isFrozen, setIsFrozen] = useState(false)
  const [otherUser] = useState({ id: 'other-user-id', name: 'Camille Bernard' })
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!newMessage.trim() || sending || isFrozen) return
    const text = newMessage.trim()
    setNewMessage('')

    // Optimistic update
    const tempMsg = {
      id: Date.now().toString(),
      sender_id: 'me',
      content: text,
      created_at: new Date().toISOString(),
      pending: true,
    }
    setMessages(prev => [...prev, tempMsg])

    setSending(true)
    try {
      // In real app: insert to Supabase messages table
      setMessages(prev => prev.map(m => m.id === tempMsg.id ? { ...m, pending: false } : m))
    } finally {
      setSending(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleReported = () => {
    setIsFrozen(true)
    setReportOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <TopNav />

      {/* Chat header */}
      <div className="sticky top-0 md:top-[57px] z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
            {otherUser.name[0]}
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-sm">{otherUser.name}</p>
            <p className="text-slate-400 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              En ligne
            </p>
          </div>
        </div>

        {/* CRITICAL: Report & Block button */}
        <button
          id="report-button"
          onClick={() => setReportOpen(true)}
          className="flex items-center gap-1.5 bg-crimson-50 hover:bg-crimson-100 text-crimson-600
            border border-crimson-100 px-3 py-2 rounded-lg text-xs font-semibold transition-colors duration-150"
        >
          <Flag size={12} />
          Signaler / Bloquer
        </button>
      </div>

      {/* Frozen banner */}
      {isFrozen && (
        <div className="bg-crimson-50 border-b border-crimson-100 px-4 py-3 flex items-center gap-3">
          <Lock size={16} className="text-crimson-600 flex-shrink-0" />
          <div>
            <p className="text-crimson-700 text-sm font-semibold">Conversation gelée</p>
            <p className="text-crimson-600/80 text-xs">Notre équipe examine votre signalement. Aucun nouveau message ne peut être envoyé.</p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-36 md:pb-24">
        {/* Date separator */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-slate-400 text-xs px-2">Aujourd'hui</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {messages.map((msg) => {
          const isMe = msg.sender_id === 'me'
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              {!isMe && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-semibold mr-2 flex-shrink-0 mt-0.5">
                  {otherUser.name[0]}
                </div>
              )}
              <div className={`max-w-[75%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  isMe
                    ? 'bg-indigo-600 text-white rounded-br-md'
                    : 'bg-white text-slate-700 border border-slate-200 rounded-bl-md'
                } ${msg.pending ? 'opacity-60' : ''}`}>
                  {msg.content}
                </div>
                <span className="text-slate-400 text-[10px] px-1">
                  {formatTime(msg.created_at)}
                  {msg.pending && ' • Envoi...'}
                </span>
              </div>
            </div>
          )
        })}

        {isFrozen && (
          <div className="flex justify-center my-4">
            <div className="bg-crimson-50 border border-crimson-100 rounded-lg px-4 py-3 flex items-center gap-2">
              <Lock size={14} className="text-crimson-600" />
              <span className="text-crimson-700 text-xs font-medium">Conversation gelée suite à un signalement</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 px-4 py-3 border-t border-slate-200 z-30 bg-white">
        {isFrozen ? (
          <div className="flex items-center justify-center gap-2 py-3">
            <Lock size={16} className="text-crimson-600" />
            <span className="text-crimson-600 text-sm font-medium">Messagerie désactivée</span>
          </div>
        ) : (
          <div className="flex gap-2 items-end max-w-screen-md mx-auto">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Écrivez un message..."
                rows={1}
                className="input-field resize-none py-3 pr-12 text-sm max-h-32 overflow-y-auto"
                style={{ minHeight: '48px' }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim() || sending}
              className="w-12 h-12 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 rounded-lg flex items-center justify-center transition-colors duration-150 flex-shrink-0"
            >
              {sending ? <div className="spinner w-4 h-4" /> : <Send size={18} className="text-white" />}
            </button>
          </div>
        )}
      </div>

      {/* Report modal */}
      <ReportModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        reportedUserId={otherUser.id}
        reportedUserName={otherUser.name}
        contextType="chat"
        onReported={handleReported}
      />

      <BottomNav />
    </div>
  )
}
