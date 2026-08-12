import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, X, Send, RotateCcw } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ChatMsg {
  role: 'user' | 'bot';
  content: string;
  quickReplies?: string[];
}

const TypingIndicator = () => (
  <div className="flex items-start gap-2">
    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
      <Bot className="w-4 h-4 text-white" />
    </div>
    <div className="bg-[#181818] rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  </div>
);

const AssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMsg[]>([
    {
      role: 'bot',
      content: 'Welcome to AEXOZON! 👋\n\nI\'m your AI assistant. I can help you:\n• Get a free project quote\n• Learn about our services\n• Book a consultation\n\nHow can I help you today?',
      quickReplies: ['Get a Free Quote', 'Our Services', 'Talk to Us'],
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get or create visitor ID
  const [visitorId] = useState(() => {
    let id = localStorage.getItem('aex_visitorId');
    if (!id) {
      id = 'visitor_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
      localStorage.setItem('aex_visitorId', id);
    }
    return id;
  });

  // Load chat history on mount
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 10000);

    fetch(`${API}/chat/history/${visitorId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          // Reconstruct chat with quick replies for the last bot message
          const msgs: ChatMsg[] = data.data.map((m: any) => ({
            role: m.role,
            content: m.content,
          }));
          setChatHistory(msgs);
        }
      })
      .catch((err) => console.error('Error loading chat history:', err));

    return () => clearTimeout(timer);
  }, [visitorId]);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isOpen, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = useCallback(
    async (overrideMessage?: string) => {
      const msgText = (overrideMessage || message).trim();
      if (!msgText || isSending) return;

      setMessage('');
      setIsSending(true);

      // Add user message immediately
      setChatHistory((prev) => [...prev, { role: 'user', content: msgText }]);

      // Show typing indicator after a brief delay
      setTimeout(() => setIsTyping(true), 200);

      try {
        const res = await fetch(`${API}/chat/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitorId, message: msgText }),
        });
        const data = await res.json();

        // Simulate natural typing delay (400-800ms)
        const delay = 400 + Math.random() * 400;
        await new Promise((r) => setTimeout(r, delay));

        setIsTyping(false);

        if (data.success) {
          const botMsg: ChatMsg = {
            role: 'bot',
            content: data.data.botResponse.content,
            quickReplies: data.data.botResponse.quickReplies || [],
          };
          setChatHistory((prev) => [...prev, botMsg]);
        } else {
          setChatHistory((prev) => [
            ...prev,
            {
              role: 'bot',
              content: 'Sorry, something went wrong. Please try again or contact us at +91 89994 27831.',
            },
          ]);
        }
      } catch (err) {
        console.error('Failed to send message:', err);
        setIsTyping(false);
        setChatHistory((prev) => [
          ...prev,
          {
            role: 'bot',
            content:
              'Connection error. Please check your internet and try again, or reach us on WhatsApp at +91 89994 27831.',
          },
        ]);
      } finally {
        setIsSending(false);
        // Refocus input
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    },
    [message, visitorId, isSending]
  );

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  const handleReset = async () => {
    try {
      await fetch(`${API}/chat/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId }),
      });
    } catch (e) {
      // Silently fail — reset locally anyway
    }
    setChatHistory([
      {
        role: 'bot',
        content:
          'Welcome to AEXOZON! 👋\n\nI\'m your AI assistant. I can help you:\n• Get a free project quote\n• Learn about our services\n• Book a consultation\n\nHow can I help you today?',
        quickReplies: ['Get a Free Quote', 'Our Services', 'Talk to Us'],
      },
    ]);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[1000] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[calc(100vw-32px)] sm:w-[380px] bg-[#0A0A0A] border border-white/5 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#111111]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white text-base font-semibold leading-none mb-1.5">AEXOZON AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#25d366]" />
                    <span className="text-[#25d366] text-sm font-medium">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="text-gray-500 hover:text-white transition-colors p-1"
                  title="Reset conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div
              className="p-4 flex-1 overflow-y-auto flex flex-col gap-4 bg-[#0A0A0A]"
              style={{ minHeight: '320px', maxHeight: '420px' }}
              data-lenis-prevent="true"
            >
              {chatHistory.map((msg, index) => (
                <div key={index}>
                  {/* Message bubble */}
                  <div className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {msg.role === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`p-3.5 text-[15px] leading-relaxed max-w-[85%] ${
                        msg.role === 'user'
                          ? 'bg-[#D6A85F] text-black rounded-2xl rounded-tr-sm font-medium'
                          : 'bg-[#181818] text-gray-200 rounded-2xl rounded-tl-sm'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>
                    </div>
                  </div>

                  {/* Quick reply buttons — only show on the LAST bot message */}
                  {msg.role === 'bot' &&
                    msg.quickReplies &&
                    msg.quickReplies.length > 0 &&
                    index === chatHistory.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.25 }}
                        className="flex flex-wrap gap-2 mt-3 ml-10"
                      >
                        {msg.quickReplies.map((qr) => (
                          <button
                            key={qr}
                            onClick={() => handleQuickReply(qr)}
                            disabled={isSending}
                            className="px-3.5 py-2 text-xs font-medium rounded-full border border-[#D6A85F]/40 text-[#D6A85F] bg-[#D6A85F]/5 hover:bg-[#D6A85F]/15 hover:border-[#D6A85F]/60 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            {qr}
                          </button>
                        ))}
                      </motion.div>
                    )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-white/5 bg-[#0A0A0A]">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Type a message..."
                  disabled={isSending}
                  className="w-full bg-transparent border border-[#D6A85F]/40 rounded-full py-3 pl-5 pr-12 text-[15px] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D6A85F] transition-shadow disabled:opacity-50"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isSending || !message.trim()}
                  className="absolute right-3 w-8 h-8 flex items-center justify-center text-[#D6A85F] hover:text-[#E2B871] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bot Button & Tooltip */}
      {!isOpen && (
        <div
          className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-white text-black px-4 py-2.5 rounded-full text-[15px] font-semibold shadow-lg flex items-center gap-2"
              >
                Hi! How can I help you today? 🤖
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
            }}
            className="w-[60px] h-[60px] rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-white shadow-xl hover:scale-105 transition-transform overflow-hidden"
            aria-label="Open AI Assistant"
          >
            <img src="/bot-3d.png" alt="Bot 3D Icon" className="w-full h-full object-cover drop-shadow-xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AssistantWidget;
