import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Loader2, ClipboardList, LogOut } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/context/AuthContext";
import { EnquiryContext } from "@/App";
import { IMAGES } from "@/data/site";
import PageHero from "@/components/PageHero";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Account() {
  const location = useLocation();
  const { user, loading, logout } = useAuth();
  const { openEnquiry } = useContext(EnquiryContext);
  const [enquiries, setEnquiries] = useState(null);

  const activeUser = user || location.state?.user;

  useEffect(() => {
    if (!activeUser) return;
    axios
      .get(`${API}/my-enquiries`, { withCredentials: true })
      .then((r) => setEnquiries(r.data))
      .catch(() => setEnquiries([]));
  }, [activeUser]);

  if (loading && !activeUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-24" data-testid="account-loading">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (!activeUser) return <Navigate to="/" replace />;

  return (
    <div data-testid="account-page">
      <Helmet>
        <title>My Enquiries | Win Process Control Engineering</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <PageHero
        testid="account-hero"
        eyebrow="My Account"
        title={<>Welcome, <span className="text-blue-200">{activeUser.name.split(" ")[0]}</span></>}
        text={`Signed in as ${activeUser.email}. Enquiries you submit with this email appear below.`}
        image={IMAGES.workshop}
      />
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-heading flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground">
            <ClipboardList className="h-6 w-6 text-primary" /> My Enquiries
          </h2>
          <div className="flex gap-3">
            <button data-testid="account-new-enquiry-button" onClick={() => openEnquiry()} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110">
              New Enquiry
            </button>
            <button data-testid="account-logout-button" onClick={logout} className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-destructive hover:text-destructive">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>

        {enquiries === null ? (
          <Loader2 className="mt-10 h-6 w-6 animate-spin text-primary" />
        ) : enquiries.length === 0 ? (
          <p data-testid="account-empty" className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            No enquiries yet. Submit one and it will show up here.
          </p>
        ) : (
          <ul className="mt-8 space-y-4" data-testid="account-enquiry-list">
            {enquiries.map((e) => (
              <li key={e.enquiry_id} data-testid={`enquiry-item-${e.enquiry_id}`} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-tech text-xs uppercase tracking-[0.2em] text-primary">{e.product || "General Enquiry"}</span>
                  <span className="text-xs text-muted-foreground">{new Date(e.created_at).toLocaleString()}</span>
                </div>
                <p className="mt-3 text-sm text-foreground/90">{e.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
