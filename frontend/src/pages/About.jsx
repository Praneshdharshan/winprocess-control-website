import { useContext } from "react";
import { Target, Eye, Factory, Ruler, ClipboardCheck, Truck, Download } from "lucide-react";
import { COMPANY, IMAGES, MATERIALS, WHY_US, INDUSTRIES, BRANDS, SITE_URL } from "@/data/site";
import { EnquiryContext } from "@/App";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

const PROCESS = [
  { icon: Ruler, title: "Design & Development", text: "We study your application or drawing and select the right material – stainless, carbon, alloy or nickel alloy steel." },
  { icon: Factory, title: "Production", text: "Bar stock, forged and cast components are machined at our works in Athipet, Ambattur, Chennai." },
  { icon: ClipboardCheck, title: "Quality", text: "An accent on quality and ongoing R&D for high pressure, temperature and vacuum applications." },
  { icon: Truck, title: "Delivery & Support", text: "Supplied to process control industries across India with responsive technical support." },
];

export default function About() {
  const { openEnquiry } = useContext(EnquiryContext);
  return (
    <div data-testid="about-page">
      <Seo
        title="About Us"
        description="Established in 2018 by Mr. G. Manikandan, Win Process Control Engineering designs and manufactures high quality instrumentation valves and fittings in Chennai, India."
        path="/about"
        jsonLd={{ "@context": "https://schema.org", "@type": "AboutPage", name: `About ${COMPANY.name}`, url: `${SITE_URL}/about` }}
      />
      <PageHero
        testid="about-hero"
        eyebrow="Company Profile"
        title={<>Engineering quality since <span className="text-blue-200">{COMPANY.established}</span></>}
        text={`${COMPANY.name} specialises in the design, development, production and marketing of high quality instrumentation valves and fittings for high pressure, temperature and vacuum applications.`}
        image={IMAGES.hero}
        imageAlt="Petrochemical plant pipework"
      />

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <img src={IMAGES.workshop} alt="Precision machining at Win Process Control Engineering" className="h-[440px] w-full rounded-3xl object-cover" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-tech text-xs uppercase tracking-[0.3em] text-primary">Our Story</p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Built by engineers, for process industries</h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground" data-testid="about-profile-text">{COMPANY.profile}</p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            WIN PROCESS products are used by a wide range of process control industries including {INDUSTRIES.slice(0, -1).join(", ").toLowerCase()} and{" "}
            {INDUSTRIES.at(-1).toLowerCase()}.
          </p>
          <div className="mt-6 rounded-2xl border border-border bg-card p-5">
            <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Founder</p>
            <p className="font-heading mt-1 text-lg font-semibold text-foreground">{COMPANY.founder.name}</p>
            <p className="text-sm text-muted-foreground">{COMPANY.founder.role}</p>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border bg-muted/40 py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-border bg-card p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Target className="h-5 w-5" /></span>
            <h3 className="font-heading mt-4 text-xl font-semibold text-foreground">Our Mission</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              To deliver high quality instrumentation valves, fittings and engineering components in the right material for every high pressure, temperature and vacuum application.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-2xl border border-border bg-card p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Eye className="h-5 w-5" /></span>
            <h3 className="font-heading mt-4 text-xl font-semibold text-foreground">Our Vision</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              To be the fastest growing and most trusted Indian manufacturer of process control instrumentation hardware, through continuous research and development.
            </p>
          </Reveal>
        </div>
      </section>

      <section data-testid="about-process" className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <p className="font-tech text-xs uppercase tracking-[0.3em] text-primary">How We Work</p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">From design to delivery</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1} className="relative rounded-2xl border border-border bg-card p-6">
              <span className="font-tech absolute right-5 top-5 text-xs text-muted-foreground">0{i + 1}</span>
              <s.icon className="h-7 w-7 text-primary" />
              <h3 className="font-heading mt-4 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2">
          <Reveal>
            <p className="font-tech text-xs uppercase tracking-[0.3em] text-primary">Our Brands</p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Three ranges, one standard</h2>
            <ul className="mt-8 space-y-4">
              {BRANDS.map((b) => (
                <li key={b.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
                  <span className="font-heading shrink-0 rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground">{b.name}</span>
                  <div>
                    <p className="font-semibold text-foreground">{b.title}</p>
                    <p className="text-sm text-muted-foreground">{b.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            {WHY_US.length > 0 && (
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {WHY_US.map((w) => (
                  <li key={w.title} className="text-sm">
                    <p className="font-semibold text-foreground">{w.title}</p>
                    <p className="text-muted-foreground">{w.text}</p>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-tech text-xs uppercase tracking-[0.3em] text-primary">Materials</p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Materials of construction</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {MATERIALS.map((m) => (
                <span key={m} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground">
                  {m}
                </span>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <button data-testid="about-enquiry-button" onClick={() => openEnquiry()} className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:brightness-110 active:scale-95">
                Discuss your requirement
              </button>
              <a data-testid="about-brochure-link" href={IMAGES.brochure} download className="flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
                <Download className="h-4 w-4" /> Download Brochure
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
