import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Mail, 
  Phone, 
  Award, 
  CheckCircle2, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { getTeamMembers, onStorageUpdate } from '../services/storageService';
import { MCS_INFO, DEFAULT_SITE_CONTENT } from '../data/mockData';
import { TeamMember, SiteContent } from '../types';

interface TeamSectionProps {
  content?: SiteContent['team'];
  onDirectConsult?: (memberName: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ 
  content, 
  onDirectConsult 
}) => {
  const c = content || DEFAULT_SITE_CONTENT.team;
  const [teamList, setTeamList] = useState<TeamMember[]>(getTeamMembers());
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const sync = () => {
      setTeamList(getTeamMembers());
    };
    sync();
    return onStorageUpdate(sync);
  }, []);

  const handleConsult = (member: TeamMember) => {
    if (onDirectConsult) {
      onDirectConsult(member.name);
    }
    const elem = document.getElementById('contact-us');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="team" className="py-20 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#074592]/10 text-[#074592] text-xs font-black uppercase tracking-wider mb-3 border border-[#074592]/20">
            <Users className="w-3.5 h-3.5 text-[#074592]" />
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

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {teamList.map((member) => (
            <div
              key={member.id}
              className="bg-slate-50 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#074592] transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Photo container */}
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Badge with Brand Lime Green #66d925 */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#66d925] text-slate-950 text-[11px] font-black tracking-wide uppercase inline-block shadow-sm">
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="p-5">
                  <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#074592] font-black mt-0.5">
                    {member.qualification}
                  </p>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-4">
                    {member.bio}
                  </p>

                  {/* Areas of Expertise */}
                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1.5">
                      Core Specialization:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.slice(0, 2).map((exp, idx) => (
                        <span 
                          key={idx}
                          className="text-[10px] font-semibold bg-white text-[#074592] px-2 py-0.5 rounded border border-slate-200"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Call-To-Action Footer */}
              <div className="p-5 pt-0">
                <div className="space-y-2 border-t border-slate-200 pt-3 text-xs">
                  <a 
                    href={`mailto:${member.contactEmail}`}
                    className="flex items-center gap-2 text-slate-600 hover:text-[#074592] transition-colors truncate"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#074592] shrink-0" />
                    <span className="truncate">{member.contactEmail}</span>
                  </a>
                  
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#4fa81d]" />
                      {member.phone || MCS_INFO.phonePrimary}
                    </span>

                    <button
                      onClick={() => handleConsult(member)}
                      className="px-2.5 py-1 rounded-lg bg-[#ff4958] hover:bg-[#e63140] text-white text-[11px] font-black transition-colors cursor-pointer shadow-xs"
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Islamabad Head Office Counseling Invitation */}
        <div className="mt-14 p-6 rounded-2xl bg-[#074592]/5 border border-[#074592]/20 flex flex-col md:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#074592] text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-[#66d925]" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-black text-slate-900">
                Direct In-Person Counseling at Islamabad Office
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Visit Ali Anwar, Dr. Sayyed Numan Akbar, Shabana Khan, and Sher Muhammad Khan at Blue Area, Islamabad for personal document verification.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${MCS_INFO.phonePrimary}`}
              className="px-4 py-2.5 rounded-xl bg-[#074592] text-white hover:bg-[#05336e] text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#66d925]" />
              Call: {MCS_INFO.phonePrimary}
            </a>
            <a
              href="#contact-us"
              className="px-4 py-2.5 rounded-xl bg-[#ff4958] text-white hover:bg-[#e63140] text-xs font-black transition-colors shadow-sm"
            >
              Get Directions
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
