import { Link } from "react-router-dom";
import { IMAGES } from "@/data/site";

export default function Logo({ onDark = false, size = "md" }) {
  const mark = size === "lg" ? "h-14 w-14" : "h-11 w-11";
  return (
    <Link to="/" data-testid="logo-link" className="flex shrink-0 items-center gap-3">
      <img src={IMAGES.logoMark} alt="Win Process Control Engineering logo" className={`${mark} object-contain`} />
      <span className="leading-none">
        <span className={`font-heading block text-[17px] font-bold leading-tight tracking-tight sm:text-lg ${onDark ? "text-white" : "text-foreground"}`}>
          Win Process Control <span className="text-primary">Engineering</span>
        </span>
        <span className={`font-tech mt-1 block text-[9px] uppercase tracking-[0.22em] ${onDark ? "text-blue-100/80" : "text-muted-foreground"}`}>
          Instrumentation Valves · Fittings · Engg. Components
        </span>
      </span>
    </Link>
  );
}
