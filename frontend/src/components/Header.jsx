import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Phone, Mail, Download } from "lucide-react";
import { COMPANY, IMAGES } from "@/data/site";
import { EnquiryContext } from "@/App";
import Logo from "@/components/Logo";
import UserMenu from "@/components/UserMenu";
import ThemeToggle from "@/components/ThemeToggle";

const NAV = [
  { to: "/", label: "Home", testid: "nav-home-link" },
  { to: "/about", label: "About Us", testid: "nav-about-link" },
  { to: "/products", label: "Products", testid: "nav-products-link" },
  { to: "/contact", label: "Contact", testid: "nav-contact-link" },
];

const navCls = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
    isActive ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-muted hover:text-foreground"
  }`;

export default function Header() {
  const { openEnquiry } = useContext(EnquiryContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="hidden bg-[hsl(var(--brand-deep))] text-blue-50 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs">
          <div className="flex items-center gap-5">
            {COMPANY.phones.map((p) => (
              <a key={p.raw} data-testid={`topbar-phone-${p.raw}`} href={`tel:+${p.raw}`} className="flex items-center gap-1.5 transition-colors hover:text-white">
                <Phone className="h-3 w-3" /> {p.label}
              </a>
            ))}
            <a data-testid="topbar-email" href={`mailto:${COMPANY.emails[0]}`} className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Mail className="h-3 w-3" /> {COMPANY.emails[0]}
            </a>
          </div>
          <a data-testid="topbar-brochure-link" href={IMAGES.brochure} download className="flex items-center gap-1.5 font-semibold transition-colors hover:text-white">
            <Download className="h-3 w-3" /> Download Brochure
          </a>
        </div>
      </div>

      <div className="border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex" data-testid="desktop-nav">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} data-testid={n.testid} className={navCls} end={n.to === "/"}>
                {n.label}
              </NavLink>
            ))}
            <button
              data-testid="header-enquiry-button"
              onClick={() => openEnquiry()}
              className="ml-3 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:brightness-110 active:scale-95"
            >
              Get in Touch
            </button>
            <UserMenu />
            <ThemeToggle className="ml-3" />
          </nav>
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              data-testid="mobile-menu-toggle"
              className="rounded-md p-2 text-foreground hover:bg-muted"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-border bg-background px-4 py-3 lg:hidden" data-testid="mobile-nav">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                data-testid={`mobile-${n.testid}`}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-4 py-3 text-sm font-semibold ${isActive ? "bg-primary/10 text-primary" : "text-foreground/80"}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <button
              data-testid="mobile-header-enquiry-button"
              onClick={() => {
                setMenuOpen(false);
                openEnquiry();
              }}
              className="mt-2 w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Get in Touch
            </button>
            <div className="mt-3">
              <UserMenu compact />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
