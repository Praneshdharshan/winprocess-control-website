import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const params = new URLSearchParams(location.hash.replace(/^#/, ""));
    const sessionId = params.get("session_id");
    const target = location.pathname || "/account";

    (async () => {
      try {
        const { data } = await axios.post(`${API}/auth/session`, { session_id: sessionId }, { withCredentials: true });
        setUser(data);
        window.history.replaceState(null, "", target);
        navigate(target, { replace: true, state: { user: data } });
      } catch {
        toast.error("Google sign-in failed. Please try again.");
        window.history.replaceState(null, "", "/");
        navigate("/", { replace: true });
      }
    })();
  }, [location, navigate, setUser]);

  return null;
}
