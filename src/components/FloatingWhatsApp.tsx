import React from 'react';
import { createWhatsAppLink, BUSINESS_INFO } from '../constants/business';
import { MessageSquare } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = createWhatsAppLink(
    'Assalam-o-Alaikum, I would like to inquire about your solar energy services in Karachi.'
  );

  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-5 right-5 z-40 whatsapp-floating-btn"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 border border-emerald-400/30 group"
        aria-label={`Chat with ${BUSINESS_INFO.name} on WhatsApp`}
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 fill-white/20" />
        </div>
        <span className="hidden sm:inline-block text-xs font-semibold tracking-wide pr-1">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
};
