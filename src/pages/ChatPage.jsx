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
  const [otherUser] = useState({ id: 'other-user-id', name: 'Camille Brunet' })
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
    <div className="min-h-screen flex flex-col bg-[--color-ks-lacquer-black] text-[--color-ks-text-warm] font-sans">
      <TopNav />

      {/* Chat header */}
      <div className="sticky top-0 md:top-[69px] z-40 bg-[--color-ks-lacquer-deep] border-b border-[--color-ks-gold-hairline] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 text-[--color-ks-text-muted] hover:text-[--color-ks-champagne] transition-all rounded-full hover:bg-white/5">
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 rounded-full border border-[--color-ks-gold-hairline] flex items-center justify-center text-[--color-ks-kinpaku] font-display font-light text-xl">
            {otherUser.name[0]}
          </div>
          <div>
            <p className="font-medium text-[--color-ks-champagne] text-base">{otherUser.name}</p>
            <p className="text-[--color-ks-text-muted] text-[0.65rem] font-mono uppercase tracking-widest flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[--color-ks-patina] inline-block animate-pulse" />
              En ligne
            </p>
          </div>
        </div>

        {/* CRITICAL: Report & Block button */}
        <button
          id="report-button"
          onClick={() => setReportOpen(true)}
          className="flex items-center gap-2 text-[--color-ks-vermilion] hover:bg-[--color-ks-vermilion] hover:text-[--color-ks-lacquer-deep] border border-[--color-ks-vermilion] px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all rounded-sm"
        >
          <Flag size={14} />
          <span className="hidden md:inline">Signaler / Bloquer</span>
        </button>
      </div>

      {/* Frozen banner */}
      {isFrozen && (
        <div className="bg-[--color-ks-lacquer-deep] border-b border-[--color-ks-vermilion] px-6 py-4 flex items-center gap-4">
          <Lock size={20} className="text-[--color-ks-vermilion] flex-shrink-0" />
          <div>
            <p className="text-[--color-ks-vermilion] text-sm font-medium uppercase tracking-wide">Conversation gelée</p>
            <p className="text-[--color-ks-text-muted] text-sm mt-1">Notre équipe examine votre signalement. Aucun nouveau message ne peut être envoyé.</p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-8 space-y-6 pb-40 md:pb-32 max-w-4xl mx-auto w-full">
        {/* Date separator */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-[--color-ks-gold-hairline]" />
          <span className="text-[--color-ks-text-muted] text-[0.65rem] font-mono tracking-widest px-4 uppercase">Aujourd'hui</span>
          <div className="flex-1 h-px bg-[--color-ks-gold-hairline]" />
        </div>

        {messages.map((msg) => {
          const isMe = msg.sender_id === 'me'
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              {!isMe && (
                <div className="w-8 h-8 rounded-full border border-[--color-ks-gold-hairline] bg-[--color-ks-lacquer-deep] flex items-center justify-center text-[--color-ks-kinpaku] text-xs font-medium mr-3 flex-shrink-0 mt-auto">
                  {otherUser.name[0]}
                </div>
              )}
              <div className={`max-w-[85%] md:max-w-[75%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1.5`}>
                <div className={`px-5 py-3 text-[0.95rem] leading-relaxed rounded-md ${
                  isMe
                    ? 'bg-[--color-ks-kinpaku] text-[--color-ks-lacquer-deep]'
                    : 'bg-[--color-ks-graphite] text-[--color-ks-champagne] border border-[--color-ks-gold-hairline]'
                } ${msg.pending ? 'opacity-60' : ''}`}>
                  {msg.content}
                </div>
                <span className="text-[--color-ks-text-faint] font-mono uppercase text-[0.65rem] px-1 tracking-widest">
                  {formatTime(msg.created_at)}
                  {msg.pending && ' • Envoi...'}
                </span>
              </div>
            </div>
          )
        })}

        {isFrozen && (
          <div className="flex justify-center my-8">
            <div className="bg-[--color-ks-lacquer-deep] border border-[--color-ks-vermilion] px-6 py-3 flex items-center gap-3 rounded-md">
              <Lock size={16} className="text-[--color-ks-vermilion]" />
              <span className="text-[--color-ks-vermilion] text-xs font-mono uppercase tracking-widest">Conversation gelée suite à un signalement</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="fixed bottom-[60px] md:bottom-0 left-0 right-0 z-30 bg-[--color-ks-lacquer-deep] border-t border-[--color-ks-gold-hairline] px-4 py-4 md:py-6">
        {isFrozen ? (
          <div className="flex items-center justify-center gap-3 py-2 max-w-4xl mx-auto">
            <Lock size={20} className="text-[--color-ks-vermilion]" />
            <span className="text-[--color-ks-vermilion] text-sm font-mono uppercase tracking-widest">Messagerie désactivée</span>
          </div>
        ) : (
          <div className="flex gap-4 items-end max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Écrivez un message..."
                rows={1}
                className="w-full bg-[--color-ks-lacquer-black] border border-[--color-ks-gold-hairline] text-[--color-ks-champagne] rounded-md py-3.5 pl-4 pr-12 text-sm focus:outline-none focus:border-[--color-ks-kinpaku] resize-none max-h-32 overflow-y-auto transition-colors"
                style={{ minHeight: '52px' }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim() || sending}
              className="w-12 h-12 bg-[--color-ks-kinpaku] text-[--color-ks-lacquer-deep] rounded-md disabled:opacity-40 flex items-center justify-center transition-all hover:bg-[--color-ks-kinpaku-pale] flex-shrink-0"
            >
              {sending ? <div className="spinner w-5 h-5 spinner-white" /> : <Send size={20} />}
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
