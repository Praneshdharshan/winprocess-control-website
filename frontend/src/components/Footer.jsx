import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Download } from "lucide-react";
import { COMPANY, PRODUCTS, IMAGES } from "@/data/site";

export default function Footer() {
  const { registered, works } = COMPANY.addresses;
  return (
    <footer className="bg-[hsl(var(--brand-deep))] text-blue-100" data-testid="site-footer">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="inline-block rounded-xl bg-white p-3">
            <img src={IMAGES.logo} alt="Win Process Control Engineering logo" className="h-24 w-auto" />
          </div>
          <p className="font-heading mt-5 text-lg font-semibold text-white">{COMPANY.name}</p>
          <p className="mt-1 text-sm text-blue-200/80">{COMPANY.tagline}</p>
          <a
            data-testid="footer-brochure-link"
            href={IMAGES.brochure}
            download
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-300/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Download className="h-4 w-4" /> Product Brochure (PDF)
          </a>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-heading text-base font-semibold uppercase tracking-wider text-white">Company</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link data-testid="footer-home-link" to="/" className="transition-colors hover:text-white">Home</Link></li>
            <li><Link data-testid="footer-about-link" to="/about" className="transition-colors hover:text-white">About Us</Link></li>
            <li><Link data-testid="footer-products-link" to="/products" className="transition-colors hover:text-white">Products</Link></li>
            <li><Link data-testid="footer-contact-link" to="/contact" className="transition-colors hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="font-heading text-base font-semibold uppercase tracking-wider text-white">Products</h4>
          <ul className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2.5 text-sm">
            {PRODUCTS.slice(0, 8).map((p) => (
              <li key={p.id}>
                <Link data-testid={`footer-product-${p.id}`} to={`/products/${p.id}`} className="transition-colors hover:text-white">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="font-heading text-base font-semibold uppercase tracking-wider text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            {COMPANY.phones.map((p) => (
              <li key={p.raw}>
                <a data-testid={`footer-phone-${p.raw}`} href={`tel:+${p.raw}`} className="flex items-center gap-2 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 text-blue-300" /> {p.label}
                </a>
              </li>
            ))}
            {COMPANY.emails.map((e) => (
              <li key={e}>
                <a data-testid={`footer-email-${e.split("@")[0]}`} href={`mailto:${e}`} className="flex items-center gap-2 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 text-blue-300" /> {e}
                </a>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />
              <span><span className="font-semibold text-white">{works.title}:</span> {works.lines.join(", ")}</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />
              <span><span className="font-semibold text-white">{registered.title}:</span> {registered.lines.join(", ")}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-blue-200/70">
        © {new Date().getFullYear()} {COMPANY.name}. All rights reserved. · {COMPANY.website}
      </div>
    </footer>
  );
}
