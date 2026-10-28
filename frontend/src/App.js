import { createContext, useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AuthCallback from "@/components/AuthCallback";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Contact from "@/pages/Contact";
import Account from "@/pages/Account";

export const EnquiryContext = createContext({ openEnquiry: () => {} });

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppRouter = () => {
  const location = useLocation();
  // Emergent Auth returns to {redirect}#session_id=... — handle it before any other route renders.
  if (location.hash?.includes("session_id=")) return <AuthCallback />;
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
};

function App() {
  const [enquiry, setEnquiry] = useState({ open: false, product: "" });

  const openEnquiry = (product = "") => setEnquiry({ open: true, product });
  const closeEnquiry = () => setEnquiry((s) => ({ ...s, open: false }));

  return (
    <div className="App">
      <HelmetProvider>
        <ThemeProvider>
          <AuthProvider>
            <EnquiryContext.Provider value={{ openEnquiry }}>
              <BrowserRouter>
                <ScrollToTop />
                <Header />
                <main>
                  <AppRouter />
                </main>
                <Footer />
                <EnquiryModal open={enquiry.open} product={enquiry.product} onClose={closeEnquiry} />
                <WhatsAppFloat />
                <Toaster position="top-center" richColors />
              </BrowserRouter>
            </EnquiryContext.Provider>
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </div>
  );
}

export default App;
