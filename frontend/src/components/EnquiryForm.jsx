import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { PRODUCTS } from "@/data/site";
import { useAuth } from "@/context/AuthContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initial = { name: "", phone: "", email: "", product: "", message: "" };

export default function EnquiryForm({ defaultProduct = "", onSuccess, idPrefix = "enquiry" }) {
  const { user } = useAuth();
  const [form, setForm] = useState({ ...initial, product: defaultProduct });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setForm((f) => ({ ...f, product: defaultProduct }));
  }, [defaultProduct]);

  useEffect(() => {
    if (!user) return;
    setForm((f) => ({ ...f, name: f.name || user.name, email: f.email || user.email }));
  }, [user]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/enquiries`, form);
      toast.success("Enquiry sent! Our team will contact you shortly.");
      setForm({ ...initial, product: defaultProduct });
      onSuccess?.();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Could not send enquiry. Please call or WhatsApp us directly.");
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";
  const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

  return (
    <form onSubmit={submit} className="space-y-4" data-testid={`${idPrefix}-form`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Name *</label>
          <input data-testid={`${idPrefix}-name-input`} required minLength={2} value={form.name} onChange={set("name")} placeholder="Your full name" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Phone *</label>
          <input data-testid={`${idPrefix}-phone-input`} required minLength={7} value={form.phone} onChange={set("phone")} placeholder="Your mobile number" className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Email</label>
        <input data-testid={`${idPrefix}-email-input`} type="email" value={form.email} onChange={set("email")} placeholder="you@company.com" className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Product Interest</label>
        <select data-testid={`${idPrefix}-product-select`} value={form.product} onChange={set("product")} className={inputCls}>
          <option value="">General Enquiry</option>
          {PRODUCTS.map((p) => (
            <option key={p.id} value={p.name}>
              {p.name}
            </option>
          ))}
          <option value="Custom Component">Custom Component (as per drawing)</option>
        </select>
      </div>
      <div>
        <label className={labelCls}>Message *</label>
        <textarea
          data-testid={`${idPrefix}-message-input`}
          required
          minLength={5}
          rows={4}
          value={form.message}
          onChange={set("message")}
          placeholder="Tell us your requirement — size, material, end connection, pressure rating, quantity..."
          className={`${inputCls} resize-none`}
        />
      </div>
      <button
        data-testid={`${idPrefix}-submit-button`}
        type="submit"
        disabled={sending}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
      >
        {sending && <Loader2 className="h-4 w-4 animate-spin" />}
        {sending ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
