import { useContext, useMemo, useState } from "react";
import { Search, PackageOpen, Download, FileDown } from "lucide-react";
import { CATEGORIES, IMAGES, PRODUCTS, SITE_URL, COMPANY } from "@/data/site";
import { EnquiryContext } from "@/App";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";

const slug = (c) => c.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${COMPANY.name} – Products`,
  itemListElement: PRODUCTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${SITE_URL}/products/${p.id}` })),
};

export default function Products() {
  const { openEnquiry } = useContext(EnquiryContext);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!q ||
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.specs.some(([, v]) => v.toLowerCase().includes(q)))
    );
  }, [category, query]);

  return (
    <div data-testid="products-page">
      <Seo
        title="Products – Instrumentation Valves, Tube & Pipe Fittings"
        description="Manifold, ball, needle, globe, gate & non-return valves, tube & pipe fittings, high pressure fittings, air headers, syphons, thermowells and condensate pots by Win Process Control Engineering."
        path="/products"
        jsonLd={JSON_LD}
      />
      <PageHero
        testid="products-hero"
        eyebrow="Our Products"
        title={<>Instrumentation valves, fittings &amp; <span className="text-blue-200">engineering components</span></>}
        text="Browse the WIN-VAL, WIN-LOK and WIN-FIT ranges by category or search by size, material and end connection. Special components are manufactured to your drawing."
        image={PRODUCTS.find((p) => p.id === "ball-valves").image}
        imageAlt="Stainless steel ball valves"
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" data-testid="category-filter">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                data-testid={`category-${slug(c)}`}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  category === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary/60"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative lg:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              data-testid="product-search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, size, material..."
              className="w-full rounded-full border border-input bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <p className="font-tech mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground" data-testid="product-count">
          Showing {visible.length} of {PRODUCTS.length} products
        </p>

        <Reveal className="mt-8 flex flex-col gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <FileDown className="h-5 w-5" />
            </span>
            <div>
              <p className="font-heading text-base font-semibold text-foreground">Product Brochure (PDF)</p>
              <p className="text-sm text-muted-foreground">Official Win Process Control Engineering catalogue with types, materials, sizes and pressure ratings.</p>
            </div>
          </div>
          <a
            data-testid="download-catalogue-button"
            href={IMAGES.brochure}
            download
            className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-95"
          >
            <Download className="h-4 w-4" /> Download Brochure
          </a>
        </Reveal>

        {visible.length ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-testid="product-grid">
            {visible.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.08} y={20}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div data-testid="products-empty" className="mt-10 rounded-2xl border border-dashed border-border p-14 text-center">
            <PackageOpen className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-4 text-foreground">No standard product matches "{query}".</p>
            <button data-testid="products-empty-enquiry-button" onClick={() => openEnquiry("Custom Component")} className="mt-4 text-sm font-semibold text-primary hover:underline">
              Ask us to make it to your drawing
            </button>
          </div>
        )}
      </section>

      <section className="border-t border-border bg-muted/40">
        <Reveal className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-tech text-xs uppercase tracking-[0.3em] text-primary">Custom Manufacturing</p>
            <h2 className="font-heading mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Need a special size, material or end connection?</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">Share your drawing and we will revert with material options and a quotation.</p>
          </div>
          <button
            data-testid="products-custom-enquiry-button"
            onClick={() => openEnquiry("Custom Component")}
            className="shrink-0 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:brightness-110 active:scale-95"
          >
            Send your drawing
          </button>
        </Reveal>
      </section>
    </div>
  );
}
