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
    <div className="min-h-screen flex flex-col bg-[--color-tx-bg-alt] font-sans">
      <TopNav />

      {/* Chat header */}
      <div className="sticky top-0 md:top-[64px] z-40 bg-white border-b border-[--color-tx-border] px-4 md:px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 text-[--color-tx-text-secondary] hover:bg-[--color-tx-bg-alt] transition-all rounded-full">
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 rounded-full bg-[--color-tx-primary-light] text-[--color-tx-primary] flex items-center justify-center font-bold text-lg">
            {otherUser.name[0]}
          </div>
          <div>
            <p className="font-bold text-[--color-tx-navy] text-base">{otherUser.name}</p>
            <p className="text-[--color-tx-text-secondary] text-xs font-medium flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[--color-tx-success] inline-block" />
              En ligne
            </p>
          </div>
        </div>

        {/* CRITICAL: Report & Block button */}
        <button
          id="report-button"
          onClick={() => setReportOpen(true)}
          className="flex items-center gap-2 text-[--color-tx-danger] hover:bg-[--color-tx-danger-light] border border-[--color-tx-danger] px-4 py-2 text-sm font-semibold transition-all rounded-lg"
        >
          <Flag size={16} />
          <span className="hidden md:inline">Signaler / Bloquer</span>
        </button>
      </div>

      {/* Frozen banner */}
      {isFrozen && (
        <div className="bg-[--color-tx-danger-light] border-b border-[--color-tx-danger] px-6 py-4 flex items-center gap-4">
          <Lock size={20} className="text-[--color-tx-danger] flex-shrink-0" />
          <div>
            <p className="text-[--color-tx-danger] text-sm font-bold">Conversation gelée</p>
            <p className="text-[--color-tx-danger] text-sm mt-1 opacity-90">Notre équipe examine votre signalement. Aucun nouveau message ne peut être envoyé.</p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-8 space-y-6 pb-40 md:pb-32 max-w-4xl mx-auto w-full">
        {/* Date separator */}
        <div className="flex items-center justify-center my-6">
          <span className="bg-[--color-tx-border] text-[--color-tx-text-secondary] text-xs font-semibold px-3 py-1 rounded-full">Aujourd'hui</span>
        </div>

        {messages.map((msg) => {
          const isMe = msg.sender_id === 'me'
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              {!isMe && (
                <div className="w-8 h-8 rounded-full bg-[--color-tx-primary-light] text-[--color-tx-primary] flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-auto shadow-sm">
                  {otherUser.name[0]}
                </div>
              )}
              <div className={`max-w-[85%] md:max-w-[75%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                <div className={`px-4 py-3 text-[0.95rem] leading-relaxed rounded-2xl shadow-sm ${
                  isMe
                    ? 'bg-[--color-tx-primary] text-white rounded-br-sm'
                    : 'bg-white text-[--color-tx-text] border border-[--color-tx-border] rounded-bl-sm'
                } ${msg.pending ? 'opacity-60' : ''}`}>
                  {msg.content}
                </div>
                <span className="text-[--color-tx-text-muted] text-xs font-medium px-1 mt-1">
                  {formatTime(msg.created_at)}
                  {msg.pending && ' • Envoi...'}
                </span>
              </div>
            </div>
          )
        })}

        {isFrozen && (
          <div className="flex justify-center my-8">
            <div className="bg-[--color-tx-danger-light] border border-[--color-tx-danger] px-6 py-3 flex items-center gap-3 rounded-xl">
              <Lock size={16} className="text-[--color-tx-danger]" />
              <span className="text-[--color-tx-danger] text-sm font-semibold">Conversation gelée suite à un signalement</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="fixed bottom-[60px] md:bottom-0 left-0 right-0 z-30 bg-white border-t border-[--color-tx-border] px-4 py-4 md:py-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {isFrozen ? (
          <div className="flex items-center justify-center gap-3 py-2 max-w-4xl mx-auto bg-[--color-tx-bg-alt] rounded-lg">
            <Lock size={20} className="text-[--color-tx-text-muted]" />
            <span className="text-[--color-tx-text-secondary] text-sm font-semibold">Messagerie désactivée</span>
          </div>
        ) : (
          <div className="flex gap-4 items-end max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Écrivez votre message..."
                rows={1}
                className="w-full bg-[--color-tx-bg-alt] border border-[--color-tx-border] text-[--color-tx-text] rounded-xl py-3 pl-4 pr-12 text-[15px] focus:outline-none focus:border-[--color-tx-primary] focus:bg-white resize-none max-h-32 overflow-y-auto transition-all"
                style={{ minHeight: '52px' }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim() || sending}
              className="w-12 h-12 bg-[--color-tx-primary] text-white rounded-xl disabled:opacity-40 flex items-center justify-center transition-all hover:bg-[--color-tx-primary-hover] flex-shrink-0 shadow-sm"
            >
              {sending ? <div className="spinner" /> : <Send size={20} />}
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
