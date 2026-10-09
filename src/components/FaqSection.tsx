import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Phone, MessageSquare } from 'lucide-react';
import { FAQS_LIST, MCS_INFO, DEFAULT_SITE_CONTENT } from '../data/mockData';
import { SiteContent } from '../types';

interface FaqSectionProps {
  content?: SiteContent['faqs'];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ content }) => {
  const c = content || DEFAULT_SITE_CONTENT.faqs;
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS_LIST[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'admissions', label: 'Student Admissions' },
    { id: 'countries', label: 'Belarus, Russia & Europe' },
    { id: 'visas', label: 'Visa & Interview' },
    { id: 'finance', label: 'Scholarships & DSU' },
    { id: 'general', label: 'MCS Islamabad Office' },
  ];

  const filteredFaqs = selectedCategory === 'all' 
    ? FAQS_LIST 
    : FAQS_LIST.filter(f => f.category === selectedCategory);

  return (
    <section id="faqs" className="py-20 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#074592]/10 text-[#074592] text-xs font-black uppercase tracking-wider mb-3 border border-[#074592]/20">
            <HelpCircle className="w-3.5 h-3.5 text-[#074592]" />
            {c.badgeText}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {c.headline}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            {c.subtitle}
          </p>
          <div className="w-20 h-1 bg-[#ff4958] mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#074592] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen 
                    ? 'border-[#074592]/50 bg-[#074592]/5 shadow-xs' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className={`text-sm sm:text-base font-extrabold ${isOpen ? 'text-[#074592]' : 'text-slate-900'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-[#074592] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-[#074592]/10 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions helper box */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#66d925]/20 text-[#4fa81d] flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-[#4fa81d]" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">Have a specific question not listed here?</h4>
              <p className="text-xs text-slate-500">Our Islamabad advisors are on call to assist with your specific credentials.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${MCS_INFO.phonePrimary}`}
              className="px-4 py-2 rounded-lg bg-[#074592] hover:bg-[#05336e] text-white text-xs font-black flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#66d925]" />
              {MCS_INFO.phonePrimary}
            </a>
            <a
              href={`tel:${MCS_INFO.phoneMobile}`}
              className="px-4 py-2 rounded-lg bg-[#ff4958] hover:bg-[#e63140] text-white text-xs font-black transition-colors shadow-xs"
            >
              {MCS_INFO.phoneMobile}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
