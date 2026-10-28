import { useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Download, MessageCircle, CheckCircle2 } from "lucide-react";
import { COMPANY, IMAGES, PRODUCTS, SITE_URL } from "@/data/site";
import { EnquiryContext } from "@/App";
import Seo from "@/components/Seo";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const { openEnquiry } = useContext(EnquiryContext);
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return <Navigate to="/products" replace />;

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  const wa = encodeURIComponent(`Hello Win Process Control Engineering, I'd like a quote for ${product.name}.`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.overview,
    image: `${SITE_URL}${product.image}`,
    brand: { "@type": "Brand", name: product.brand },
    manufacturer: { "@type": "Organization", name: COMPANY.name },
    category: product.category,
    url: `${SITE_URL}/products/${product.id}`,
  };

  return (
    <div data-testid="product-detail-page">
      <Seo title={`${product.name} Manufacturer`} description={product.description} path={`/products/${product.id}`} image={product.image} type="product" jsonLd={jsonLd} />

      <section className="hero-gradient relative overflow-hidden pt-[72px] text-white md:pt-[104px]">
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Link data-testid="back-to-products-link" to="/products" className="font-tech inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-blue-100 transition-colors hover:text-white">
              <ArrowLeft className="h-3.5 w-3.5" /> All products
            </Link>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex flex-wrap items-center gap-3">
              <span className="font-heading rounded-full border-2 border-white/80 px-4 py-1 text-xs font-bold tracking-wide">{product.brand}</span>
              <span className="font-tech text-xs uppercase tracking-[0.25em] text-blue-100">{product.category}</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              data-testid="product-detail-title"
              className="font-heading mt-3 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              {product.name}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="mt-5 max-w-2xl text-base text-blue-50/90 md:text-lg">
              {product.overview}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 flex flex-wrap gap-3">
              <button
                data-testid="product-detail-enquire-button"
                onClick={() => openEnquiry(product.name)}
                className="flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-xl shadow-blue-900/20 transition-all hover:bg-blue-50 active:scale-95"
              >
                Enquire Now <ArrowRight className="h-4 w-4" />
              </button>
              <a
                data-testid="product-detail-whatsapp-link"
                href={`https://wa.me/${COMPANY.phones[0].raw}?text=${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/50 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a data-testid="product-detail-catalogue-button" href={IMAGES.brochure} download className="flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-blue-100 transition-colors hover:text-white">
                <Download className="h-4 w-4" /> Brochure PDF
              </a>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="lg:col-span-5">
            <div className="product-tile overflow-hidden rounded-3xl shadow-2xl">
              <img src={product.image} alt={`${product.name} – ${COMPANY.name}`} className="aspect-square w-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <p className="font-tech text-xs uppercase tracking-[0.3em] text-primary">Technical Specification</p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground">{product.name} specifications</h2>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border" data-testid="spec-table">
              <table className="w-full text-sm">
                <tbody>
                  {product.specs.map(([k, v], i) => (
                    <tr key={k} data-testid={`spec-row-${i}`} className={i % 2 === 0 ? "bg-card" : "bg-muted/40"}>
                      <th scope="row" className="w-44 px-5 py-4 text-left align-top font-semibold text-foreground">{k}</th>
                      <td className="px-5 py-4 text-muted-foreground">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-2">
            <p className="font-tech text-xs uppercase tracking-[0.3em] text-primary">Typical Applications</p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground">Where it's used</h2>
            <ul className="mt-8 space-y-3" data-testid="product-applications">
              {product.applications.map((a) => (
                <li key={a} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" /> {a}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl bg-[hsl(var(--brand-deep))] p-6 text-white">
              <p className="font-heading text-lg font-semibold">Need {product.name.toLowerCase()} in a different spec?</p>
              <p className="mt-1 text-sm text-blue-100/80">Tell us the size, material, end connection and quantity.</p>
              <button
                data-testid="product-detail-bottom-enquire-button"
                onClick={() => openEnquiry(product.name)}
                className="mt-4 w-full rounded-full bg-white py-3 text-sm font-semibold text-primary transition-all hover:bg-blue-50 active:scale-[0.98]"
              >
                Request a Quote
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-muted/40 py-20" data-testid="related-products">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <p className="font-tech text-xs uppercase tracking-[0.3em] text-primary">Related</p>
              <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground">More in {product.category}</h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.1}><ProductCard product={p} /></Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
