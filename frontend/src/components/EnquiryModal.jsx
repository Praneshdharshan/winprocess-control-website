import { AnimatePresence, motion } from "framer-motion";
import { X, Phone } from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";
import { COMPANY } from "@/data/site";

export default function EnquiryModal({ open, product, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-testid="enquiry-modal-overlay"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[hsl(var(--brand-deep))]/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            data-testid="enquiry-modal"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-2xl md:p-8"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="font-tech text-xs uppercase tracking-[0.2em] text-primary">Quick Enquiry</p>
                <h3 className="font-heading mt-1 text-2xl font-bold sm:text-3xl">Get in Touch</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fill this in and we will get back to you. Prefer talking?{" "}
                  <a data-testid="enquiry-modal-call-link" href={`tel:+${COMPANY.phones[0].raw}`} className="font-semibold text-primary hover:underline">
                    <Phone className="mr-1 inline h-3.5 w-3.5" />
                    {COMPANY.phones[0].label}
                  </a>
                </p>
              </div>
              <button
                data-testid="enquiry-modal-close-button"
                onClick={onClose}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <EnquiryForm defaultProduct={product} onSuccess={onClose} idPrefix="enquiry-modal" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
