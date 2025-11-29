import React from 'react';
import { Phone, Mail, Globe, UserPlus, Share2, ChevronRight, MapPin } from 'lucide-react';

function App() {

  const contactInfo = {
    name: "Grayson Patterson",
    company: "Auto-Owners Insurance",
    title: "Field Claims Representative",
    phone: "7704246582,54391",
    email: "patterson.grayson@aoins.com",
    website: "https://auto-owners.com",
    location: "Atlanta, GA",
    pfp: "/pfp.jpg",
    logo: "/logo.jpg"
  };

  const generateVCard = async () => {
    // Fetch and convert profile picture to base64
    let photoBase64 = '';
    try {
      const response = await fetch(contactInfo.pfp);
      const blob = await response.blob();
      photoBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        };
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      console.error('Could not load profile picture for vCard', e);
    }

    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
N:${contactInfo.name.split(' ')[1]};${contactInfo.name.split(' ')[0]};;;
ORG:${contactInfo.company}
TITLE:${contactInfo.title}
TEL;TYPE=WORK:${contactInfo.phone}
EMAIL:${contactInfo.email}
URL:${contactInfo.website}${photoBase64 ? `
PHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}` : ''}
END:VCARD`;
    const vcardBlob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(vcardBlob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'GraysonPatterson.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mobile-container bg-[#0a192f] text-white flex items-center justify-center p-3 sm:p-4 relative overflow-hidden font-sans selection:bg-blue-500 selection:text-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#1e3a8a] rounded-full blur-[150px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#0f172a] rounded-full blur-[150px] opacity-60"></div>
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">

        {/* Glass Card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden ring-1 ring-white/20">

          {/* Header Image Area */}
          <div className="h-28 sm:h-40 bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/logo.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] to-transparent opacity-60"></div>

            {/* Logo Top Right */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/10 backdrop-blur-md p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border border-white/20 shadow-lg">
              <img
                src={contactInfo.logo}
                alt="Logo"
                className="h-6 sm:h-8 w-auto object-contain"
              />
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-5 sm:px-8 pb-6 sm:pb-10 -mt-14 sm:-mt-20 relative">
            {/* Profile Picture */}
            <div className="relative inline-block group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-500"></div>
              <div className="relative w-24 h-24 sm:w-36 sm:h-36 rounded-full p-1 bg-[#0a192f]">
                <img
                  src={contactInfo.pfp}
                  alt={contactInfo.name}
                  className="w-full h-full rounded-full object-cover border-2 sm:border-4 border-[#0a192f] shadow-2xl"
                />
              </div>
              <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-green-500 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 sm:border-4 border-[#0a192f] shadow-lg" title="Available"></div>
            </div>

            {/* Name & Title */}
            <div className="mt-3 sm:mt-6 text-center">
              <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                {contactInfo.name}
              </h1>
              <p className="text-blue-200 font-medium text-sm sm:text-lg mt-1 sm:mt-2 flex items-center justify-center gap-2">
                {contactInfo.title}
              </p>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5 sm:mt-1 flex items-center justify-center gap-1">
                <MapPin size={12} className="sm:hidden" />
                <MapPin size={14} className="hidden sm:block" />
                {contactInfo.location}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3 mt-4 sm:mt-8">
              <button
                onClick={generateVCard}
                className="col-span-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-bold shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 sm:gap-3 group"
              >
                <UserPlus size={18} className="sm:hidden group-hover:rotate-12 transition-transform" />
                <UserPlus size={22} className="hidden sm:block group-hover:rotate-12 transition-transform" />
                <span className="tracking-wide text-sm sm:text-base">Save Contact</span>
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: contactInfo.name,
                      text: 'Check out my digital business card!',
                      url: window.location.href,
                    });
                  }
                }}
                className="col-span-1 bg-white/5 hover:bg-white/10 text-white rounded-xl sm:rounded-2xl border border-white/10 flex items-center justify-center transition-all active:scale-[0.98]"
              >
                <Share2 size={18} className="sm:hidden" />
                <Share2 size={22} className="hidden sm:block" />
              </button>
            </div>

            {/* Contact Links */}
            <div className="mt-5 sm:mt-10 space-y-2 sm:space-y-4">
              <ContactItem
                icon={<Phone size={18} className="sm:hidden" />}
                iconLg={<Phone size={20} className="hidden sm:block" />}
                label="Work"
                value="(770) 424-6582 ext. 54391"
                href={`tel:${contactInfo.phone}`}
                delay="100"
              />
              <ContactItem
                icon={<Mail size={18} className="sm:hidden" />}
                iconLg={<Mail size={20} className="hidden sm:block" />}
                label="Email"
                value={contactInfo.email}
                href={`mailto:${contactInfo.email}`}
                delay="200"
              />
              <ContactItem
                icon={<Globe size={18} className="sm:hidden" />}
                iconLg={<Globe size={20} className="hidden sm:block" />}
                label="Website"
                value="auto-owners.com"
                href={contactInfo.website}
                delay="300"
                isExternal
              />
            </div>
          </div>

          {/* Footer */}
          <div className="py-4 sm:py-6 text-center bg-[#050c18]/50 border-t border-white/5 backdrop-blur-md">
            <p className="text-slate-500 text-[10px] sm:text-xs font-medium tracking-widest uppercase">
              Auto-Owners Insurance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon, iconLg, label, value, href, delay, isExternal }) {
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 active:scale-[0.99]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
        {icon}
        {iconLg}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-xs sm:text-sm font-semibold text-slate-100 group-hover:text-white transition-colors break-all">
          {value}
        </p>
      </div>
      <ChevronRight size={16} className="sm:hidden text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
      <ChevronRight size={18} className="hidden sm:block text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
    </a>
  );
}

export default App;
