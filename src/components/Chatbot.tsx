import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Phone, 
  Bot, 
  User, 
  Sparkles, 
  ChevronRight,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { MCS_INFO } from '../data/mockData';
import { ChatMessage } from '../types';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: `Assalam-o-Alaikum! Welcome to Modernminds Consulting Services (MCS), Islamabad. I am your 24/7 virtual assistant. How can we facilitate your higher education abroad, work permits, or visit visa assistance today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      options: [
        'European Work Permits (Poland, Romania, Lithuania)',
        'Visit & Tourist Visas (UK, USA, Schengen, Canada)',
        'Study MBBS in Belarus / Russia',
        'Italy DSU €7,200 Scholarships',
        'Required Documents for Evaluation',
        'Call Islamabad Office'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const generateBotReply = (userQuery: string): { text: string; options?: string[] } => {
    const q = userQuery.toLowerCase();

    if (q.includes('mbbs') || q.includes('medical') || q.includes('doctor') || q.includes('belarus') || q.includes('russia')) {
      return {
        text: `🏥 MBBS in Belarus and Russia:\n\n• 100% English Medium programs recognized by WHO, ECFMG, and PMDC.\n• Tuition: $2,800 to $4,500/year.\n• No strict IELTS required for admission.\n• Supervised by our Managing Director Dr. Sayyed Numan Akbar (MD).\n\nWould you like to book an in-person assessment at our Islamabad office or review your F.Sc Pre-Medical grades?`,
        options: ['Check Document Checklist', 'Call 051-4862273', 'Fill Contact Form']
      };
    }

    if (q.includes('italy') || q.includes('dsu') || q.includes('scholarship')) {
      return {
        text: `🇮🇹 Italy Public University Admissions & DSU Scholarships:\n\n• World-renowned universities (Politecnico di Milano, Sapienza Roma, Padova).\n• DSU Regional Scholarship provides up to €7,200/year, tuition waiver, and free canteen meals.\n• We assist with Universitaly pre-enrollment, CIMEA, DOV, and family income verification.\n\nMajor intake starts September/October!`,
        options: ['DSU Document Requirements', 'Call 03002346521', 'Back to Main Menu']
      };
    }

    if (q.includes('portugal') || q.includes('work permit') || q.includes('job')) {
      return {
        text: `🇵🇹 Portugal Study & Work Permits:\n\n• Direct access to the 29-nation European Schengen Zone.\n• Post-study job seeker visa permits legal employment.\n• We assist with university admissions, legal employment contracts, SEF/AIMA residency appointments, and consular visa filing in Islamabad.`,
        options: ['Speak with Visa Consultant', 'Call Islamabad Office', 'Book Assessment']
      };
    }

    if (q.includes('document') || q.includes('checklist') || q.includes('attest')) {
      return {
        text: `📋 Initial Document Checklist for Evaluation:\n\n1. Original Passport (minimum 18 months validity)\n2. Matric / O-Levels & F.Sc / A-Levels / Degree Transcripts\n3. IBCC / HEC and MOFA Islamabad Attestation\n4. Police Clearance Certificate (Police Khidmat Markaz)\n5. Medical Fitness Certificate (HIV/Hepatitis)\n\nYou can upload these in our online Student Portal or visit us at Executive Heights, Blue Area, Islamabad.`,
        options: ['Open Student Portal', 'Office Address & Hours', 'Call 051-4862273']
      };
    }

    if (q.includes('team') || q.includes('ali anwar') || q.includes('numan') || q.includes('sher')) {
      return {
        text: `👥 Dedicated Leadership Team at Modernminds (MCS):\n\n• Ali Anwar - Founder & CEO\n• Dr. Sayyed Numan Akbar (MD) - Managing Director\n• Shabana Khan - Marketing Manager\n• Sher Muhammad Khan - Senior Visa Consultant\n\nAll team members are accessible at our Islamabad head office.`,
        options: ['Call 051-4862273', 'Visit Blue Area Office']
      };
    }

    if (q.includes('call') || q.includes('phone') || q.includes('contact') || q.includes('address') || q.includes('office')) {
      return {
        text: `📍 Modernminds Consulting Services Islamabad:\n\n• Office: Office 402, 4th Floor, Executive Heights, Blue Area, Islamabad\n• Landline: 051-4862273\n• Mobile/WhatsApp: 03002346521\n• Hours: Monday to Saturday (9:30 AM – 6:30 PM PKT)\n• 24/7 Student Emergency Support Hotline active for students abroad.`,
        options: ['Study MBBS in Belarus / Russia', 'Italy DSU Scholarships', 'European Work Permits']
      };
    }

    return {
      text: `Thank you for your question! Modernminds Consulting Services specializes in Student Admissions, European Work Permits, Worldwide Visit Visas, and 24/7 Transition Support for Poland, Romania, Lithuania, Portugal, Italy, UK, USA, and more.\n\nYou can call our Islamabad counselors directly at 051-4862273 or 03002346521 for immediate answers!`,
      options: ['Call Islamabad Office', 'Check Work Permits', 'Check Visit Visas', 'Italy DSU Scholarship']
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateBotReply(query);
      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: reply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        options: reply.options
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Floating Launcher Button with Brand Colors (#074592 & #66d925 border) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {!isOpen && (
          <div className="mb-2 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-lg border border-slate-200 text-xs font-bold text-slate-800 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-[#66d925]" />
            <span>Need visa guidance? Chat with MCS</span>
          </div>
        )}

        <button
          id="mcs-chatbot-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-[#074592] hover:bg-[#05336e] text-white flex items-center justify-center shadow-xl shadow-[#074592]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-[#66d925]"
          aria-label="Open 24/7 Student Support Chatbot"
        >
          {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageSquare className="w-6 h-6 text-[#66d925]" />}
        </button>
      </div>

      {/* Chat Window Modal / Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[400px] h-[540px] max-h-[82vh] bg-white rounded-2xl shadow-2xl border border-slate-300 z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 text-left">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#074592] via-[#05336e] to-slate-950 text-white p-4 flex items-center justify-between border-b border-blue-900">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#66d925] text-slate-950 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-black text-white leading-none">
                    MCS Instant Support
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-[#66d925] animate-pulse" />
                </div>
                <p className="text-[10px] text-blue-200 mt-0.5">
                  Modernminds Consulting Services Islamabad
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick hotline bar */}
          <div className="bg-[#074592]/5 border-b border-[#074592]/15 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-[#074592] font-semibold">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#ff4958]" />
              Islamabad Hotlines:
            </span>
            <div className="flex items-center gap-2">
              <a href={`tel:${MCS_INFO.phonePrimary}`} className="font-bold hover:underline">
                {MCS_INFO.phonePrimary}
              </a>
              <span>/</span>
              <a href={`tel:${MCS_INFO.phoneMobile}`} className="font-bold text-[#4fa81d] hover:underline">
                {MCS_INFO.phoneMobile}
              </a>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70 text-xs">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl whitespace-pre-line leading-relaxed ${
                      isBot
                        ? 'bg-white text-slate-800 border border-slate-200/90 shadow-xs rounded-tl-xs'
                        : 'bg-[#074592] text-white rounded-tr-xs shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  <span className="text-[9px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>

                  {/* Options Chips */}
                  {isBot && msg.options && (
                    <div className="flex flex-wrap gap-1.5 mt-2 pt-1 max-w-[95%]">
                      {msg.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleSend(opt)}
                          className="px-2.5 py-1 rounded-full bg-[#074592]/5 hover:bg-[#074592]/10 text-[#074592] border border-[#074592]/20 text-[10px] font-bold transition-colors cursor-pointer text-left"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-xl bg-white border border-slate-200 w-24">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about Belarus, Russia, Italy, visas..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#074592] focus:border-transparent outline-hidden"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-[#ff4958] hover:bg-[#e63140] text-white transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
