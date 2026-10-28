import { useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { EnquiryContext } from "@/App";

export default function ProductCard({ product }) {
  const { openEnquiry } = useContext(EnquiryContext);
  const href = `/products/${product.id}`;

  return (
    <article
      data-testid={`product-card-${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
    >
      <Link to={href} data-testid={`product-image-link-${product.id}`} className="product-tile relative block aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={`${product.name} manufactured by Win Process Control Engineering`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="font-tech absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary-foreground">
          {product.brand}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{product.category}</p>
        <Link to={href} data-testid={`product-title-link-${product.id}`} className="font-heading mt-1.5 text-xl font-semibold text-foreground transition-colors hover:text-primary">
          {product.name}
        </Link>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        <dl className="mt-4 space-y-1.5">
          {product.specs.slice(2, 5).map(([k, v]) => (
            <div key={k} className="flex gap-2 text-xs">
              <dt className="w-28 shrink-0 font-semibold text-foreground/70">{k}</dt>
              <dd className="truncate text-muted-foreground">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link
            data-testid={`view-${product.id}-link`}
            to={href}
            className="flex items-center justify-center rounded-full border border-border py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            View Details
          </Link>
          <button
            data-testid={`enquire-${product.id}-button`}
            onClick={() => openEnquiry(product.name)}
            className="flex items-center justify-center gap-1.5 rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Enquire <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
