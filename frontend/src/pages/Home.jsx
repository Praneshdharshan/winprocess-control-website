import { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Download, Phone, Layers, Gauge, PenTool, Ruler } from "lucide-react";
import { COMPANY, IMAGES, PRODUCTS, BRANDS, INDUSTRIES, WHY_US, MATERIALS, SITE_URL } from "@/data/site";
import { EnquiryContext } from "@/App";
import Seo from "@/components/Seo";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import Counter from "@/components/Counter";

const WHY_ICONS = [Layers, Gauge, PenTool, Ruler];
const HERO_PRODUCTS = ["manifold-valves", "needle-valves", "tube-fittings"].map((id) => PRODUCTS.find((p) => p.id === id));

const Hero = () => {
  const { openEnquiry } = useContext(EnquiryContext);
  return (
    <section data-testid="home-hero" className="hero-gradient relative overflow-hidden pt-[72px] text-white md:pt-[104px]">
      <img src={IMAGES.hero} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-soft-light" />
      <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-14 lg:grid-cols-12 lg:pb-28 lg:pt-20">
        <div className="lg:col-span-7">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="font-tech flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-blue-100">
            <span className="h-px w-10 bg-blue-100/70" /> Chennai · Est. {COMPANY.established}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Instrumentation Valves &amp; Fittings <span className="text-blue-200">Engineered for High Pressure</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="mt-6 max-w-xl text-base text-blue-50/90 md:text-lg">
            {COMPANY.name} designs, develops and manufactures manifold, needle, ball, globe and gate valves, tube &amp; pipe fittings and
            engineering components in stainless, carbon, alloy and nickel alloy steels.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="mt-9 flex flex-wrap gap-4">
            <button
              data-testid="hero-enquiry-button"
              onClick={() => openEnquiry()}
              className="flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-xl shadow-blue-900/20 transition-all hover:bg-blue-50 active:scale-95"
            >
              Request a Quote <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              data-testid="hero-products-link"
              to="/products"
              className="flex items-center gap-2 rounded-full border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore Products
            </Link>
            <a
              data-testid="hero-brochure-link"
              href={IMAGES.brochure}
              download
              className="flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-blue-100 transition-colors hover:text-white"
            >
              <Download className="h-4 w-4" /> Brochure
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }} className="mt-12 flex flex-wrap gap-3">
            {BRANDS.map((b) => (
              <span key={b.id} className="font-heading rounded-full border-2 border-white/80 bg-white/10 px-5 py-1.5 text-sm font-bold tracking-wide backdrop-blur">
                {b.name}
              </span>
            ))}
          </motion.div>
        </div>
        <div className="relative hidden h-[440px] lg:col-span-5 lg:block">
          {HERO_PRODUCTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
              className={`hex-clip absolute bg-white shadow-2xl ${
                i === 0 ? "left-0 top-0 h-56 w-56" : i === 1 ? "right-0 top-16 h-64 w-64" : "bottom-0 left-12 h-52 w-52"
              }`}
            >
              <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Brands = () => (
  <section data-testid="home-brands" className="relative z-10 mx-auto -mt-10 max-w-7xl px-6">
    <div className="grid gap-5 md:grid-cols-3">
      {BRANDS.map((b, i) => (
        <Reveal key={b.id} delay={i * 0.1} className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-primary/5">
          <p className="font-heading text-2xl font-bold tracking-wide text-primary">{b.name}</p>
          <p className="font-heading mt-1 text-base font-semibold text-foreground">{b.title}</p>
          <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
        </Reveal>
      ))}
    </div>
  </section>
);

const Stats = () => (
  <section data-testid="home-stats" className="mx-auto max-w-7xl px-6 pt-20">
    <div className="grid grid-cols-2 gap-6 rounded-2xl bg-[hsl(var(--brand-deep))] px-6 py-10 text-white md:grid-cols-4 md:px-10">
      {[
        { value: 15, suffix: "+", label: "Product Lines" },
        { value: 9, suffix: "", label: "Industries Served" },
        { value: 60000, suffix: " PSI", label: "Max. Fitting Rating" },
        { value: 2018, suffix: "", label: "Established", plain: true },
      ].map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08}>
          <p className="font-heading text-3xl font-bold text-blue-200 md:text-4xl">
            {s.plain ? s.value : <Counter value={s.value} suffix={s.suffix} />}
          </p>
          <p className="font-tech mt-1 text-[11px] uppercase tracking-[0.2em] text-blue-100/80">{s.label}</p>
        </Reveal>
      ))}
    </div>
  </section>
);

const FeaturedProducts = () => (
  <section data-testid="home-products" className="mx-auto max-w-7xl px-6 py-24">
    <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-tech text-xs uppercase tracking-[0.3em] text-primary">Our Products</p>
        <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Valves, fittings &amp; components for process control</h2>
      </div>
      <Link data-testid="home-view-all-products" to="/products" className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
        View all {PRODUCTS.length} products <ArrowRight className="h-4 w-4" />
      </Link>
    </Reveal>
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {PRODUCTS.slice(0, 6).map((p, i) => (
        <Reveal key={p.id} delay={(i % 3) * 0.1}>
          <ProductCard product={p} />
        </Reveal>
      ))}
    </div>
  </section>
);

const WhyUs = () => (
  <section data-testid="home-why-us" className="border-y border-border bg-muted/40 py-24">
    <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
      <Reveal>
        <p className="font-tech text-xs uppercase tracking-[0.3em] text-primary">Why Win Process</p>
        <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Quality-driven manufacturing for critical lines</h2>
        <p className="mt-5 text-base text-muted-foreground">
          An accent on quality combined with ongoing research and development has given {COMPANY.shortName} a reputation for excellence across
          process control industries.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {WHY_US.map((w, i) => {
            const Icon = WHY_ICONS[i];
            return (
              <div key={w.title} className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-heading mt-3 text-base font-semibold text-foreground">{w.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{w.text}</p>
              </div>
            );
          })}
        </div>
      </Reveal>
      <Reveal delay={0.15} className="relative">
        <img src={IMAGES.workshop} alt="CNC machining of a stainless steel valve body" className="h-[460px] w-full rounded-3xl object-cover" />
        <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card p-5 shadow-2xl md:block">
          <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Materials of construction</p>
          <p className="mt-2 max-w-xs text-sm font-medium text-foreground">{MATERIALS.join(" · ")}</p>
        </div>
      </Reveal>
    </div>
  </section>
);

const Industries = () => (
  <section data-testid="home-industries" className="mx-auto max-w-7xl px-6 py-24">
    <Reveal className="text-center">
      <p className="font-tech text-xs uppercase tracking-[0.3em] text-primary">Industries We Serve</p>
      <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Trusted across process control industries</h2>
    </Reveal>
    <div className="mt-12 flex flex-wrap justify-center gap-3">
      {INDUSTRIES.map((ind, i) => (
        <Reveal key={ind} delay={i * 0.05} y={12}>
          <span className="hex-clip inline-flex h-24 w-28 items-center justify-center bg-primary/10 px-3 text-center text-sm font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
            {ind}
          </span>
        </Reveal>
      ))}
    </div>
  </section>
);

const CTA = () => {
  const { openEnquiry } = useContext(EnquiryContext);
  return (
    <section data-testid="home-cta" className="mx-auto max-w-7xl px-6 pb-24">
      <Reveal className="hero-gradient relative overflow-hidden rounded-3xl p-10 text-white md:p-16">
        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Have a drawing or a spec sheet?</h2>
            <p className="mt-3 max-w-xl text-base text-blue-50/90">Send it across with size, material and pressure rating — our team will get back to you with a quotation.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button data-testid="cta-enquiry-button" onClick={() => openEnquiry("Custom Component")} className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-blue-50 active:scale-95">
              Get in Touch
            </button>
            <a data-testid="cta-call-link" href={`tel:+${COMPANY.phones[0].raw}`} className="flex items-center gap-2 rounded-full border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              <Phone className="h-4 w-4" /> {COMPANY.phones[0].label}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.name,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/brand/logo.png`,
  description: `${COMPANY.name} manufactures instrumentation valves, tube and pipe fittings and engineering components in Chennai, India.`,
  foundingDate: COMPANY.established,
  founder: { "@type": "Person", name: COMPANY.founder.name },
  telephone: COMPANY.phones[0].label,
  email: COMPANY.emails[0],
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 14/41, Kavarai Street, Athipet, Ambattur",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600058",
    addressCountry: "IN",
  },
};

export default function Home() {
  return (
    <div data-testid="home-page">
      <Seo
        description="Win Process Control Engineering, Chennai – manufacturer of instrumentation manifold, needle, ball, globe & gate valves, tube & pipe fittings, thermowells and air headers."
        path="/"
        jsonLd={JSON_LD}
      />
      <Hero />
      <Brands />
      <Stats />
      <FeaturedProducts />
      <WhyUs />
      <Industries />
      <CTA />
    </div>
  );
}
