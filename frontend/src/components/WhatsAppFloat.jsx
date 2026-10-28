import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { COMPANY } from "@/data/site";

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const text = encodeURIComponent(COMPANY.whatsappText);

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="whatsapp-panel"
            className="w-64 rounded-2xl border border-border bg-card p-4 shadow-2xl"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <p className="font-heading text-base font-semibold text-foreground">Chat on WhatsApp</p>
            <p className="mb-3 text-xs text-muted-foreground">Send us your requirement or drawing directly.</p>
            <div className="space-y-2">
              {COMPANY.phones.map((p, i) => (
                <a
                  key={p.raw}
                  data-testid={`whatsapp-link-${p.raw}`}
                  href={`https://wa.me/${p.raw}?text=${text}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5 transition-colors hover:border-[#25D366]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">{i === 0 ? "Sales & Technical" : "Sales"}</span>
                    <span className="block text-xs text-muted-foreground">{p.label}</span>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        data-testid="whatsapp-chat-button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Chat on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-900/30 transition-transform hover:scale-105 active:scale-95"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
        {open ? <X className="relative h-7 w-7" /> : <MessageCircle className="relative h-7 w-7" />}
      </button>
    </div>
  );
}
