import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, UserCircle2, ClipboardList } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const GoogleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.94l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
  </svg>
);

export default function UserMenu({ compact = false }) {
  const { user, loading, login, logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) return <span className="ml-2 h-9 w-9 animate-pulse rounded-full bg-muted" />;

  if (!user) {
    return (
      <button
        data-testid="google-signin-button"
        onClick={() => login("/account")}
        className={`ml-2 flex items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/60 ${compact ? "w-full" : ""}`}
      >
        <GoogleIcon /> Sign in
      </button>
    );
  }

  if (compact) {
    return (
      <div className="space-y-1 border-t border-border pt-3" data-testid="mobile-user-menu">
        <p className="px-4 text-xs text-muted-foreground">{user.email}</p>
        <Link data-testid="mobile-account-link" to="/account" className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground">
          <ClipboardList className="h-4 w-4" /> My Enquiries
        </Link>
        <button data-testid="mobile-logout-button" onClick={logout} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-destructive">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="relative ml-2">
      <button
        data-testid="user-menu-button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-border bg-card p-0.5 pr-3 transition-colors hover:border-primary/60"
      >
        {user.picture ? (
          <img src={user.picture} alt={user.name} referrerPolicy="no-referrer" className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <UserCircle2 className="h-8 w-8 text-muted-foreground" />
        )}
        <span className="max-w-[110px] truncate text-sm font-medium text-foreground" data-testid="user-menu-name">{user.name}</span>
      </button>
      {open && (
        <div
          data-testid="user-menu-dropdown"
          className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
          onMouseLeave={() => setOpen(false)}
        >
          <p className="truncate border-b border-border px-4 py-2.5 text-xs text-muted-foreground">{user.email}</p>
          <Link data-testid="account-link" to="/account" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted">
            <ClipboardList className="h-4 w-4" /> My Enquiries
          </Link>
          <button data-testid="logout-button" onClick={() => { setOpen(false); logout(); }} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-muted">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}
