import { Phone, Mail, MapPin, MessageCircle, User } from "lucide-react";
import { COMPANY, IMAGES, SITE_URL, FAQS } from "@/data/site";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import MapEmbed from "@/components/MapEmbed";

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: COMPANY.name,
      url: `${SITE_URL}/contact`,
      image: `${SITE_URL}/og-image.jpg`,
      telephone: COMPANY.phones.map((p) => p.label),
      email: COMPANY.emails[0],
      address: {
        "@type": "PostalAddress",
        streetAddress: "No. 14/41, Kavarai Street, Athipet, Ambattur",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "600058",
        addressCountry: "IN",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

const Card = ({ title, children, testid }) => (
  <div data-testid={testid} className="rounded-2xl border border-border bg-card p-6">
    <h3 className="font-heading text-lg font-semibold text-foreground">{title}</h3>
    <div className="mt-3 space-y-2.5">{children}</div>
  </div>
);

export default function Contact() {
  const wa = encodeURIComponent(COMPANY.whatsappText);
  const { registered, works } = COMPANY.addresses;
  return (
    <div data-testid="contact-page">
      <Seo
        title="Contact Us – Chennai"
        description="Contact Win Process Control Engineering, Athipet, Ambattur, Chennai. Call +91 90032 20422, WhatsApp or email info@winprocess.in for instrumentation valves and fittings enquiries."
        path="/contact"
        jsonLd={JSON_LD}
      />
      <PageHero
        testid="contact-hero"
        eyebrow="Contact"
        title={<>Let's talk <span className="text-blue-200">specifications</span></>}
        text="Call, WhatsApp or send an enquiry — our team will respond with material options and a quotation."
        image={IMAGES.workshop}
        imageAlt="Machining workshop"
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-5">
        <Reveal className="space-y-5 lg:col-span-2">
          <Card title="Call Us" testid="contact-call-card">
            {COMPANY.phones.map((p) => (
              <a key={p.raw} data-testid={`contact-phone-${p.raw}`} href={`tel:+${p.raw}`} className="flex items-center gap-3 text-foreground/90 transition-colors hover:text-primary">
                <Phone className="h-4 w-4 text-primary" /> {p.label}
              </a>
            ))}
            <p className="flex items-center gap-3 pt-1 text-sm text-muted-foreground">
              <User className="h-4 w-4 text-primary" /> {COMPANY.founder.name} · {COMPANY.founder.role}
            </p>
          </Card>
          <Card title="WhatsApp" testid="contact-whatsapp-card">
            {COMPANY.phones.map((p) => (
              <a
                key={p.raw}
                data-testid={`contact-whatsapp-${p.raw}`}
                href={`https://wa.me/${p.raw}?text=${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground/90 transition-colors hover:text-[#25D366]"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" /> {p.label}
              </a>
            ))}
          </Card>
          <Card title="Email" testid="contact-email-card">
            {COMPANY.emails.map((e) => (
              <a key={e} data-testid={`contact-email-${e.split("@")[0]}`} href={`mailto:${e}`} className="flex items-center gap-3 text-foreground/90 transition-colors hover:text-primary">
                <Mail className="h-4 w-4 text-primary" /> {e}
              </a>
            ))}
          </Card>
          <Card title="Addresses" testid="contact-address-card">
            {[works, registered].map((a) => (
              <div key={a.title} className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">{a.title}</p>
                  {a.lines.map((l) => (
                    <p key={l} className="text-muted-foreground">{l}</p>
                  ))}
                </div>
              </div>
            ))}
          </Card>
        </Reveal>

        <Reveal delay={0.1} className="rounded-3xl border border-border bg-card p-6 md:p-8 lg:col-span-3">
          <p className="font-tech text-xs uppercase tracking-[0.3em] text-primary">Send an Enquiry</p>
          <h2 className="font-heading mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Tell us what you need</h2>
          <p className="mt-2 text-sm text-muted-foreground">Your enquiry is emailed directly to our team.</p>
          <div className="mt-6">
            <EnquiryForm idPrefix="contact" />
          </div>
        </Reveal>
      </section>

      <section data-testid="contact-maps" className="border-t border-border bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="font-tech text-xs uppercase tracking-[0.3em] text-primary">Find Us</p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground">Our locations in Chennai</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal><MapEmbed title={works.title} query={works.mapQuery} testid="map-works" /></Reveal>
            <Reveal delay={0.1}><MapEmbed title={registered.title} query={registered.mapQuery} testid="map-registered" /></Reveal>
          </div>
        </div>
      </section>

      <section data-testid="contact-faq" className="mx-auto max-w-4xl px-6 py-20">
        <Reveal>
          <p className="font-tech text-xs uppercase tracking-[0.3em] text-primary">FAQ</p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground">Frequently asked questions</h2>
        </Reveal>
        <div className="mt-8 space-y-4">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-heading text-base font-semibold text-foreground">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
