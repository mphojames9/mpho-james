import { Component, useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// react-icons is already installed for Home.jsx
import { FaWifi, FaRedoAlt, FaExclamationTriangle, FaCompass, FaArrowLeft, FaCircleNotch } from "react-icons/fa";
import Home from "./pages/Home";

/* ==========================================================================
   Shared look for the system screens (offline, error, 404).
   Same paper / ink / cobalt palette as Home.jsx. Core Tailwind classes only,
   so nothing here needs Font Awesome, axios or tailwindcss-animate.
   ========================================================================== */
const BODY_FONT = { fontFamily: '"Instrument Sans", ui-sans-serif, system-ui, sans-serif' };
const DISPLAY_FONT = { fontFamily: '"Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif' };

const CSS = `
@keyframes app-pop { from { opacity: 0; transform: translateY(14px) scale(.97); } to { opacity: 1; transform: none; } }
.app-pop { animation: app-pop .5s cubic-bezier(.2,.7,.2,1) both; }
@media (prefers-reduced-motion: reduce) { .app-pop { animation: none; } }
`;

const TONES = {
  rose: { glow: "bg-rose-400", ring: "bg-rose-100", icon: "text-rose-500", border: "border-rose-100", face: "from-white to-rose-50" },
  cobalt: { glow: "bg-[#3A4DBA]", ring: "bg-[#DDE3F3]", icon: "text-[#1A2672]", border: "border-[#C9D0E3]", face: "from-white to-[#EDF0F7]" },
};

const BUTTON =
  "group flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-[#0E1633] text-sm font-medium text-white shadow-[0_14px_40px_-12px_rgba(14,22,51,.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1A2672] disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A2672]";

function Panel({ Icon, tone = "cobalt", ping = false, title, titleId, children, action }) {
  const t = TONES[tone];
  return (
    <div
      className="app-pop relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white bg-white p-8 text-center shadow-[0_40px_120px_-48px_rgba(26,38,114,.45)] sm:p-10"
      style={BODY_FONT}
    >
      <style>{CSS}</style>
      <div aria-hidden="true" className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-20 blur-3xl ${t.glow}`} />
      <div aria-hidden="true" className="relative mx-auto mb-6 h-20 w-20">
        {ping && <div className={`absolute inset-0 animate-ping rounded-full opacity-50 motion-reduce:animate-none ${t.ring}`} />}
        <div className={`relative grid h-full w-full place-items-center rounded-full border bg-gradient-to-br shadow-inner ${t.border} ${t.face}`}>
          <Icon className={`h-8 w-8 ${t.icon}`} />
        </div>
      </div>
      <h2 id={titleId} className="text-2xl font-bold tracking-tight text-[#0E1633] sm:text-3xl" style={DISPLAY_FONT}>
        {title}
      </h2>
      <p className="mb-8 mt-3 px-2 text-sm leading-relaxed text-[#4A5575]">{children}</p>
      {action}
    </div>
  );
}

function ActionButton({ busy, busyLabel, label, Icon, onClick }) {
  return (
    <button type="button" onClick={onClick} disabled={busy} className={BUTTON}>
      {busy ? (
        <>
          <FaCircleNotch aria-hidden="true" className="h-4 w-4 animate-spin" />
          {busyLabel}
        </>
      ) : (
        <>
          <Icon aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-500 ease-in-out group-hover:rotate-180" />
          {label}
        </>
      )}
    </button>
  );
}

/* ==========================================================================
   Network monitor: full-screen notice while the visitor is offline.
   It only checks this site's own origin. The old version pinged the RemoPDF
   backend, so that server being asleep could block the whole portfolio.
   ========================================================================== */
function NetworkMonitor() {
  const [offline, setOffline] = useState(typeof navigator !== "undefined" && !navigator.onLine);
  const [checking, setChecking] = useState(false);

  const check = useCallback(async () => {
    setChecking(true);
    let ok = navigator.onLine;
    if (ok) {
      try {
        await fetch(window.location.origin, { method: "HEAD", cache: "no-store" });
      } catch {
        ok = false;
      }
    }
    setOffline(!ok);
    setTimeout(() => setChecking(false), 600);
  }, []);

  useEffect(() => {
    const goOffline = () => setOffline(true);
    window.addEventListener("online", check);
    window.addEventListener("offline", goOffline);
    const timer = setInterval(check, 60000);
    return () => {
      window.removeEventListener("online", check);
      window.removeEventListener("offline", goOffline); // same function reference, so it is really removed
      clearInterval(timer);
    };
  }, [check]);

  if (!offline) return null;

  return (
    <div role="alertdialog" aria-modal="true" aria-labelledby="net-title" className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0E1633]/60 p-4 backdrop-blur-md">
      <Panel
        Icon={FaWifi}
        tone="rose"
        ping
        title="You're offline"
        titleId="net-title"
        action={<ActionButton busy={checking} busyLabel="Reconnecting..." label="Retry connection" Icon={FaRedoAlt} onClick={check} />}
      >
        This site can't load everything without a connection. Check your network, then retry.
      </Panel>
    </div>
  );
}

/* ==========================================================================
   Global error boundary
   ========================================================================== */
class GlobalErrorBoundary extends Component {
  state = { hasError: false, isReloading: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Portfolio error:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ isReloading: true });
    setTimeout(() => {
      window.location.href = "/";
    }, 800);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#EDF0F7] p-4">
          <Panel
            Icon={FaExclamationTriangle}
            tone="rose"
            ping
            title="This page hit a problem"
            action={<ActionButton busy={this.state.isReloading} busyLabel="Reloading..." label="Reload page" Icon={FaRedoAlt} onClick={this.handleReload} />}
          >
            Something broke while loading this page. Reload it to start again.
          </Panel>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ==========================================================================
   404
   ========================================================================== */
function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EDF0F7] p-4">
      <Panel
        Icon={FaCompass}
        tone="cobalt"
        title="Page not found"
        action={
          <Link to="/" className={BUTTON}>
            <FaArrowLeft aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to home
          </Link>
        }
      >
        That address doesn't lead anywhere on this site.
      </Panel>
    </main>
  );
}

/* ==========================================================================
   App: one page (Home), plus the 404 fallback
   ========================================================================== */
export default function App() {
  return (
    <GlobalErrorBoundary>
      <NetworkMonitor />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </GlobalErrorBoundary>
  );
}
