import { useEffect, useRef, useState } from "react";
// Adjust the path to wherever this file lives, e.g. src/pages/Home.jsx -> "../assets/profile.png"
import profile from "../assets/profile.png";
import logo from "../assets/logo.png";
// Project screenshots (desktop + mobile)
import remopdfShot from "../assets/remopdf.png";
import remopdfMobile from "../assets/remopdfMobile.jpg";
import netflixShot from "../assets/netflix.png";
import netflixMobile from "../assets/netflixMobile.jpg";
import chatappShot from "../assets/chatapp.png";
import chatappMobile from "../assets/chatappMobile.jpg";
import shopShot from "../assets/shoppingcart.webp";
import shopMobile from "../assets/shoppingcartMobile.jpg";
import hotelShot from "../assets/hotelbookings.webp";
import hotelMobile from "../assets/hotelbookingsMobile.jpg";
// npm install react-icons
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaPython, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaGithub, FaLinkedinIn, FaWhatsapp, FaRegCopy, FaCheck } from "react-icons/fa";
import { SiMongodb, SiTailwindcss, SiJavascript } from "react-icons/si";

const HEADLINE = "I build full stack products people keep using.";
const NAV = ["About", "Skills", "Work", "Contact"];

const STACK = [
  { name: "React", Icon: FaReact, color: "#61DAFB" },
  { name: "Node.js", Icon: FaNodeJs, color: "#5FA04E" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "HTML", Icon: FaHtml5, color: "#E34F26" },
  { name: "CSS", Icon: FaCss3Alt, color: "#1572B6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#E5C100" },
  { name: "Python", Icon: FaPython, color: "#3776AB" },
];

const LAYERS = [
  { label: "Frontend", detail: "React, Tailwind CSS", w: "92%" },
  { label: "Backend", detail: "Node.js, Python", w: "86%" },
  { label: "Database", detail: "MongoDB", w: "78%" },
];

/* Headline: words slide up on load, letters swell under the cursor */
function Headline({ text }) {
  const letters = useRef([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;

    let raf = 0, x = -9999, y = -9999;
    const paint = () => {
      raf = 0;
      for (const el of letters.current) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2));
        const t = Math.max(0, 1 - d / 230);
        const k = t * t;
        el.style.fontWeight = String(Math.round(300 + 500 * k));
        el.style.color = `color-mix(in srgb, #2A3BB0 ${Math.round(k * 100)}%, #0E1633)`;
      }
    };
    const move = (e) => { x = e.clientX; y = e.clientY; if (!raf) raf = requestAnimationFrame(paint); };
    const leave = () => { x = y = -9999; if (!raf) raf = requestAnimationFrame(paint); };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  let i = 0;
  return (
    <h1 aria-label={text} className="font-display text-[clamp(2.6rem,6.2vw,6rem)] leading-[1] tracking-[-0.035em] text-ink">
      {text.split(" ").map((word, w) => (
        <span key={w} aria-hidden="true" className="mr-[0.22em] -mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
          <span className="word-in inline-block whitespace-nowrap" style={{ animationDelay: `${0.15 + w * 0.09}s` }}>
            {word.split("").map((ch) => {
              const idx = i++;
              return (
                <span key={idx} ref={(el) => (letters.current[idx] = el)}
                  className="inline-block font-light transition-[font-weight,color] duration-200 ease-out">
                  {ch}
                </span>
              );
            })}
          </span>
        </span>
      ))}
    </h1>
  );
}

/* Animated wavy underline */
function Wavy({ children, delay = "1s" }) {
  return <span className="wavy font-medium text-ink" style={{ "--d": delay }}>{children}</span>;
}

/* Button that leans toward the cursor */
function Magnetic({ className, children, ...props }) {
  const ref = useRef(null);
  const move = (e) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current, r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const leave = () => { ref.current.style.transform = ""; };
  return (
    <a ref={ref} onPointerMove={move} onPointerLeave={leave} className={`transition-transform duration-300 ease-out ${className}`} {...props}>
      {children}
    </a>
  );
}

function Logo() {
  return (
    <a href="#" aria-label="Mpho James, home" className="group flex items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--cobalt)]">
      <img src={logo} alt="" draggable="false" className="h-12 w-12 object-contain transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110" />
      <span className="font-display relative text-[1.35rem] leading-none tracking-tight">
        <span className="font-bold text-ink">Mpho</span>{" "}
        <span className="font-light text-cobalt">James</span>
        <span className="absolute -bottom-1.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-cobalt transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden="true" />
      </span>
    </a>
  );
}

/* ---------- About ---------- */
const ABOUT_TEXT =
  "I'm Mpho James, a full stack developer who cares about the whole product: the interface people touch and the systems that keep it running.";

const HOW = [
  {
    title: "Interfaces that feel fast",
    body: "Clean, accessible React front ends styled with Tailwind CSS, built to load quickly and work on any screen.",
    tech: ["React", "Tailwind CSS", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Back ends that stay out of the way",
    body: "Node.js and Python services with clear APIs, sensible structure and code the next developer can read.",
    tech: ["Node.js", "Python"],
  },
  {
    title: "Data modelled with care",
    body: "MongoDB schemas designed around how the product is actually used, so queries stay simple as it grows.",
    tech: ["MongoDB"],
  },
];

const ICONS = Object.fromEntries(STACK.map((t) => [t.name, t]));

/* Words fade from faint to full ink as you scroll past */
function ScrollWords({ text, id }) {
  const refs = useRef([]);
  const box = useRef(null);
  const words = text.split(" ");

  useEffect(() => {
    const n = words.length;
    const set = (p) =>
      refs.current.forEach((el, i) => {
        if (el) el.style.opacity = String(0.16 + 0.84 * Math.min(1, Math.max(0, p * (n + 6) - i)));
      });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return set(1);

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = box.current.getBoundingClientRect();
      const vh = window.innerHeight;
      set(Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.45 + r.height * 0.6))));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [words.length]);

  return (
    <h2 id={id} ref={box} aria-label={text}
      className="font-display max-w-5xl text-[clamp(1.9rem,4.2vw,3.5rem)] font-medium leading-[1.15] tracking-[-0.025em]">
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" ref={(el) => (refs.current[i] = el)} className="mr-[0.25em] inline-block" style={{ opacity: 0.16 }}>
          {w}
        </span>
      ))}
    </h2>
  );
}

function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="font-body relative scroll-mt-4 border-t border-line bg-paper text-ink">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1500px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14 lg:py-36">
        <ScrollWords id="about-title" text={ABOUT_TEXT} />

        <div className="mt-24 grid gap-12 sm:mt-32 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div data-reveal className="lg:sticky lg:top-24 lg:self-start">
            <h3 className="font-display text-3xl font-medium tracking-tight">How I work</h3>
            <p className="mt-4 max-w-xs leading-relaxed text-muted">
              Three layers, one developer who understands how they fit together.
            </p>
          </div>

          <ul className="border-t border-line">
            {HOW.map((h, i) => (
              <li key={h.title} data-reveal style={{ "--rd": `${i * 120}ms` }} className="group relative border-b border-line">
                <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 rounded-full bg-cobalt transition-transform duration-500 ease-out group-hover:scale-y-100" />
                <div className="flex flex-col gap-6 py-9 transition-[padding] duration-500 ease-out group-hover:pl-7 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
                  <div className="max-w-md">
                    <h4 className="font-display text-2xl font-medium tracking-tight">{h.title}</h4>
                    <p className="mt-3 leading-relaxed text-muted">{h.body}</p>
                  </div>
                  <ul className="flex shrink-0 flex-wrap items-center gap-3 sm:pt-1">
                    {h.tech.map((name, j) => {
                      const { Icon, color } = ICONS[name];
                      return (
                        <li key={name} title={name} className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white/80 transition-transform duration-300 group-hover:-translate-y-1" style={{ transitionDelay: `${j * 50}ms` }}>
                          <Icon className="h-5 w-5" style={{ color }} role="img" aria-label={name} />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills & Technologies ---------- */
const SKILLS = [
  { name: "React", cat: "Frontend", note: "Component-driven interfaces, state management and routing.", span: "sm:col-span-2 lg:row-span-2", big: true },
  { name: "JavaScript", cat: "Frontend", note: "Modern ES6+, on the client and the server." },
  { name: "HTML", cat: "Frontend", note: "Semantic, accessible markup." },
  { name: "CSS", cat: "Frontend", note: "Responsive layouts and animation." },
  { name: "Tailwind CSS", cat: "Frontend", note: "Consistent styling, built fast." },
  { name: "Node.js", cat: "Backend", note: "REST APIs, authentication and real-time services.", span: "sm:col-span-2" },
  { name: "Python", cat: "Backend", note: "Automation, scripts and data-driven back ends." },
  { name: "MongoDB", cat: "Database", note: "Flexible schemas, indexing and aggregation." },
];
const CATS = ["All", "Frontend", "Backend", "Database"];

function useInView() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return setSeen(true);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

/* Wavy underline that draws itself when scrolled into view */
function ViewWavy({ children, delay = "0.2s" }) {
  const [ref, seen] = useInView();
  return (
    <span ref={ref} className={`wavy wavy-lg wavy-wait ${seen ? "is-in" : ""}`} style={{ "--d": delay }}>
      {children}
    </span>
  );
}

function Tile({ s, active, i }) {
  const { Icon, color } = ICONS[s.name];
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <li onPointerMove={move} data-reveal style={{ "--rd": `${i * 70}ms` }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-white/70 p-5 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgba(14,22,51,.5)] sm:p-6 ${s.span || ""} ${active ? "" : "scale-[.97] opacity-25 saturate-0"}`}>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(260px circle at var(--x,50%) var(--y,50%), ${color}30, transparent 70%)` }} />
      <div className="relative flex items-start justify-between">
        <Icon aria-hidden="true" style={{ color }}
          className={`${s.big ? "h-20 w-20" : "h-9 w-9"} transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110`} />
        <span className="rounded-full border border-line bg-white/80 px-3 py-1 text-xs text-muted">{s.cat}</span>
      </div>
      <div className="relative">
        <h3 className={`font-display font-medium tracking-tight ${s.big ? "text-4xl" : "text-xl"}`}>{s.name}</h3>
        <p className={`mt-1.5 leading-snug text-muted ${s.big ? "max-w-xs text-base" : "text-sm"}`}>{s.note}</p>
      </div>
    </li>
  );
}

function Skills() {
  const [cat, setCat] = useState("All");
  return (
    <section id="skills" aria-labelledby="skills-title" className="font-body scroll-mt-4 border-t border-line bg-paper text-ink">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1500px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14 lg:py-36">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 id="skills-title" data-reveal className="font-display text-[clamp(2.2rem,5vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              Skills &amp; <ViewWavy>Technologies</ViewWavy>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
              The tools I reach for to take a product from first screen to production.
            </p>
          </div>
          <div role="group" aria-label="Filter by area" data-reveal style={{ "--rd": ".2s" }} className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
                className={`min-h-[44px] rounded-full border px-5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cobalt)] ${
                  cat === c ? "border-[var(--ink)] bg-[var(--ink)] text-white" : "border-line bg-white/70 text-muted hover:border-[var(--ink)] hover:text-ink"
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-12 grid auto-rows-[minmax(10rem,auto)] grid-cols-1 gap-4 sm:mt-16 sm:auto-rows-[12rem] sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s, i) => (
            <Tile key={s.name} s={s} i={i} active={cat === "All" || cat === s.cat} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Projects Showcase ---------- */
// Screenshots live in src/assets: desktop (png) and mobile (jpg) for each project.
const PROJECTS = [
  {
    title: "RemoPDF",
    kind: "Web app",
    body: "PDF tools in the browser: merge, split, compress and convert files without installing anything.",
    tech: ["React", "Node.js", "Tailwind CSS"],
    image: remopdfShot,
    mobile: remopdfMobile,
    href: "https://remopdf.site",
    repo: "https://github.com/mphojames9/remopdf",
  },
  {
    title: "Netflix-inspired app",
    kind: "Streaming interface",
    body: "A streaming-style experience with rows of titles, hover previews and search that responds as you type.",
    tech: ["React", "JavaScript", "Tailwind CSS"],
    image: netflixShot,
    mobile: netflixMobile,
    href: "https://netflixapp-4he1.onrender.com",
    repo: "https://github.com/mphojames9/netflixapp",
  },
  {
    title: "Chat app",
    kind: "Real-time app",
    body: "Instant messaging with live conversations, typing indicators and message history that stays saved.",
    tech: ["React", "Node.js", "MongoDB"],
    image: chatappShot,
    mobile: chatappMobile,
    href: "https://real-time-chat-app-ucv3.onrender.com",
    repo: "https://github.com/mphojames9/real_time-_chat_app",
  },
  {
    title: "Shopping cart",
    kind: "E-commerce app",
    body: "OneStop, an online electronics store with category filters, live search, a wishlist and a shopping cart that updates as you add items.",
    tech: ["React", "Node.js"],
    image: shopShot,
    mobile: shopMobile,
    href: "https://shopping-cart-yvl2.onrender.com",
    repo: "https://github.com/mphojames9/shopping-cart",
  },
  {
    title: "Hotel bookings",
    kind: "Booking website",
    body: "PrimeStay, a hotel booking site where guests compare rooms and nightly prices, see what is left for their dates and review their stay before booking.",
    tech: ["React", "Node.js"],
    image: hotelShot,
    mobile: hotelMobile,
    href: "https://primestay-boqi.onrender.com",
    repo: "https://github.com/mphojames9/hotelBookingsWebsite",
  },
];

/* Phone frame for the mobile screenshots. Callers position it (absolute) and set its height. */
function Phone({ className = "", children }) {
  return (
    <div aria-hidden="true"
      className={`aspect-[9/20] overflow-hidden rounded-[1.25rem] border-[3px] border-[#0E1633] bg-[#0E1633] shadow-[0_22px_44px_-14px_rgba(14,22,51,.8)] ring-1 ring-white/30 ${className}`}>
      {children}
    </div>
  );
}

function Projects() {
  const [active, setActive] = useState(0);
  const frame = useRef(null);

  const tilt = (e) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = frame.current.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    frame.current.style.transform = `perspective(1200px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg)`;
  };
  const reset = () => { frame.current.style.transform = ""; };

  return (
    <section id="work" aria-labelledby="work-title" className="font-body scroll-mt-4 border-t border-line bg-paper text-ink">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1500px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14 lg:py-36">
        <h2 id="work-title" data-reveal className="font-display text-[clamp(2.2rem,5vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.03em]">
          Projects Showcase
        </h2>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
          A few things I&apos;ve built, from everyday tools to full web apps.
        </p>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <ul className="border-t border-line">
            {PROJECTS.map((p, i) => (
              <li key={p.title} data-reveal style={{ "--rd": `${i * 110}ms` }} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className="border-b border-line">
                <a href={p.href} target="_blank" rel="noopener noreferrer" className={`group block pt-8 ${p.repo ? "pb-4" : "pb-8"} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--cobalt)]`}>
                  {/* small screens: desktop shot with the phone shot at the bottom left */}
                  <div className="relative mb-10 lg:hidden">
                    <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-[#1A2672]">
                      <img src={p.image} alt={`${p.title} preview`} loading="lazy" decoding="async" draggable="false" className="h-full w-full object-cover" />
                    </div>
                    <Phone className="absolute -bottom-5 left-4 h-[82%]">
                      <img src={p.mobile} alt="" loading="lazy" decoding="async" draggable="false" className="h-full w-full object-cover object-top" />
                    </Phone>
                  </div>
                  <div className={`flex items-start justify-between gap-6 transition-opacity duration-500 ${active === i ? "" : "lg:opacity-40"}`}>
                    <div>
                      <h3 className="font-display text-[clamp(1.9rem,3.6vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.025em] transition-transform duration-500 ease-out lg:group-hover:translate-x-2">
                        {p.title}
                      </h3>
                      <p className="mt-3 max-w-md leading-relaxed text-muted">{p.body}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {p.tech.map((name) => {
                          const { Icon, color } = ICONS[name];
                          return (
                            <li key={name} className="flex items-center gap-2 rounded-full border border-line bg-white/80 py-1.5 pl-2.5 pr-3.5 text-sm">
                              <Icon aria-hidden="true" className="h-4 w-4" style={{ color }} />
                              {name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <span className="mt-2 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-white/80 transition-all duration-500 ease-out group-hover:rotate-45 group-hover:border-[var(--ink)] group-hover:bg-[var(--ink)] group-hover:text-white">
                      <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M4 12L12 4M6 4h6v6" />
                      </svg>
                      <span className="sr-only">View {p.title} (opens in a new tab)</span>
                    </span>
                  </div>
                </a>
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noopener noreferrer"
                    className="mb-8 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-white/80 px-4 text-sm text-muted transition-colors hover:border-[var(--ink)] hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cobalt)]">
                    <FaGithub aria-hidden="true" className="h-4 w-4" />
                    Source code
                    <span className="sr-only">for {p.title} on GitHub (opens in a new tab)</span>
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* sticky preview (desktop): desktop shot with the phone shot at the bottom left */}
          <div data-reveal style={{ "--rd": ".25s" }} className="hidden lg:sticky lg:top-10 lg:block lg:self-start">
            <div ref={frame} onPointerMove={tilt} onPointerLeave={reset}
              className="relative transition-transform duration-300 ease-out will-change-transform">
              <div className="relative aspect-[3/2] overflow-hidden rounded-[2rem] border border-white/70 bg-[#1A2672] shadow-[0_40px_90px_-40px_rgba(14,22,51,.7)]">
                {PROJECTS.map((p, i) => (
                  <img key={p.title} src={p.image} alt="" aria-hidden="true" loading="lazy" decoding="async" draggable="false"
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} />
                ))}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0A1030]/85 to-transparent" />
                <div className="absolute bottom-5 right-5 rounded-2xl border border-white/20 bg-white/15 px-4 py-2.5 text-white backdrop-blur-xl">
                  <p className="font-display text-lg font-medium leading-tight">{PROJECTS[active].title}</p>
                  <p className="text-xs text-white/75">{PROJECTS[active].kind}</p>
                </div>
              </div>

              <Phone className="absolute -bottom-8 -left-8 h-[74%]">
                {PROJECTS.map((p, i) => (
                  <img key={p.title} src={p.mobile} alt="" loading="lazy" decoding="async" draggable="false"
                    className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-700 ease-out ${active === i ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`} />
                ))}
              </Phone>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
const CONTACT_EMAIL = "mphojames9@gmail.com";
const CONTACT_PHONE = "+27 74 418 7026";
// EmailJS (https://www.emailjs.com). These are the same service, template and public key the RemoPDF Contact page uses.
// All three are designed to be public in the browser. If any is ever emptied, the form falls back to opening the visitor's email app.
const EMAILJS_SERVICE_ID = "service_a7c5ag9";
const EMAILJS_TEMPLATE_ID = "template_5bc1mt5";
const EMAILJS_PUBLIC_KEY = "drD2CBWiRuBzQGBEO";
const EMAILJS_READY = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

const TYPES = ["Web app", "Website", "API & database", "Something else"];
const DETAILS = [
  { Icon: FaEnvelope, label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, copy: true },
  { Icon: FaPhoneAlt, label: "Phone", value: CONTACT_PHONE, href: `tel:${CONTACT_PHONE.replace(/\s/g, "")}` },
  { Icon: FaMapMarkerAlt, label: "Based in", value: "Pretoria, Gauteng" },
];
const SOCIALS = [
  { label: "GitHub", Icon: FaGithub, href: "https://github.com/mphojames9" },
  { label: "LinkedIn", Icon: FaLinkedinIn, href: "https://www.linkedin.com/in/mpho-matli-413661196/" },
  { label: "WhatsApp", Icon: FaWhatsapp, href: "https://wa.me/27744187026" },
];

/* lets a long email wrap after the @ on narrow screens */
const breakable = (s) => s.replace("@", "@\u200b");

const validate = (v) => {
  const e = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "Tell me a little more (at least 10 characters).";
  return e;
};

function Field({ id, label, error, textarea, ...props }) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <div className="min-w-0">
      <div className="relative">
        <Tag id={id} placeholder=" " aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined}
          className={`peer block w-full rounded-2xl border bg-white px-4 pb-2.5 pt-6 text-base text-ink shadow-[0_1px_2px_rgba(14,22,51,.04)] outline-none transition-all focus:border-[var(--cobalt)] focus:ring-4 focus:ring-[#1A2672]/10 ${error ? "border-red-500" : "border-[#DDE3F3]"} ${textarea ? "min-h-[9rem] resize-y" : ""}`}
          {...props} />
        <label htmlFor={id}
          className="pointer-events-none absolute left-4 top-2 text-xs text-muted transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-[var(--cobalt)]">
          {label}
        </label>
      </div>
      {error && <p id={`${id}-error`} role="alert" className="mt-1.5 px-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function Contact() {
  const form = useRef(null);
  const [v, setV] = useState({ name: "", email: "", type: TYPES[0], message: "", company: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);

  const set = (k) => (e) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const submit = async (e) => {
    e.preventDefault();
    if (v.company) return; // honeypot
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => form.current?.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    setStatus("sending");
    try {
      if (EMAILJS_READY) {
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: EMAILJS_PUBLIC_KEY,
            // Variable names match the existing template: from_name, reply_to, subject, message.
            // The visitor's email and project type are repeated inside message in case the template body only prints {{message}}.
            template_params: {
              from_name: v.name.trim(),
              reply_to: v.email.trim(),
              subject: `[Portfolio] ${v.type}: message from ${v.name.trim()}`,
              message: `${v.message.trim()}\n\n---\nFrom: ${v.name.trim()} <${v.email.trim()}>\nProject type: ${v.type}`,
            },
          }),
        });
        if (!res.ok) throw new Error("EmailJS request failed");
      } else {
        const subject = encodeURIComponent(`${v.type}: message from ${v.name}`);
        const body = encodeURIComponent(`${v.message}\n\n${v.name}\n${v.email}`);
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        await new Promise((r) => setTimeout(r, 600));
      }
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setV({ name: "", email: "", type: TYPES[0], message: "", company: "" });
    setErrors({});
    setStatus("idle");
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="font-body scroll-mt-4 overflow-x-clip border-t border-line bg-paper text-ink">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1500px] px-4 py-16 sm:px-10 sm:py-32 lg:px-14">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white bg-white p-4 sm:rounded-[2.5rem] shadow-[0_40px_120px_-48px_rgba(26,38,114,.35)] sm:p-10 lg:p-14">
          {/* soft light, dotted grid */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-[24rem] w-[24rem] rounded-full opacity-[.14] blur-3xl" style={{ background: "radial-gradient(closest-side,#3A4DBA,transparent)" }} />
            <div className="absolute -bottom-32 right-0 h-[26rem] w-[26rem] rounded-full opacity-[.12] blur-3xl" style={{ background: "radial-gradient(closest-side,#26379F,transparent)" }} />
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#C9D0E3 1px, transparent 1px)", backgroundSize: "22px 22px", maskImage: "radial-gradient(ellipse at 15% 15%,#000,transparent 55%)", WebkitMaskImage: "radial-gradient(ellipse at 15% 15%,#000,transparent 55%)" }} />
          </div>

          <div className="relative grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            {/* details */}
            <div className="flex min-w-0 flex-col">
              <h2 id="contact-title" data-reveal className="font-display text-[clamp(2rem,4.6vw,4rem)] font-medium leading-[1.05] tracking-[-0.03em]">
                Let&apos;s work <ViewWavy>together</ViewWavy>.
              </h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-muted sm:mt-8 sm:text-lg">
                Tell me about your idea. I read every message and reply within a day or two.
              </p>

              <ul className="mt-8 space-y-3 sm:mt-10">
                {DETAILS.map((d, i) => {
                  const Tag = d.href ? "a" : "div";
                  return (
                    <li key={d.label} data-reveal style={{ "--rd": `${0.2 + i * 0.12}s` }}>
                      <div className="group flex items-center gap-2 rounded-2xl border border-line bg-white p-3 pr-3 shadow-[0_1px_2px_rgba(14,22,51,.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#B9C3E4] hover:shadow-[0_18px_40px_-24px_rgba(26,38,114,.5)] sm:p-3.5 sm:pr-4">
                        <Tag {...(d.href ? { href: d.href } : {})}
                          className="flex min-w-0 flex-1 items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--cobalt)] sm:gap-4">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EAEEFB] text-[var(--cobalt)] transition-colors duration-300 group-hover:bg-[var(--ink)] group-hover:text-white sm:h-11 sm:w-11">
                            <d.Icon aria-hidden="true" className="h-4 w-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-xs text-muted">{d.label}</span>
                            <span className="block text-[15px] font-medium leading-snug [overflow-wrap:anywhere] sm:text-base">{breakable(d.value)}</span>
                          </span>
                        </Tag>
                        {d.copy && (
                          <button type="button" onClick={copy} aria-label="Copy email address" title={copied ? "Copied" : "Copy email"}
                            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cobalt)] ${
                              copied ? "scale-105 bg-[var(--ink)] text-white" : "bg-[#EAEEFB] text-[var(--cobalt)] hover:bg-[var(--ink)] hover:text-white"
                            }`}>
                            {copied ? <FaCheck aria-hidden="true" className="h-3.5 w-3.5" /> : <FaRegCopy aria-hidden="true" className="h-3.5 w-3.5" />}
                          </button>
                        )}
                      </div>
                      {d.copy && <span role="status" className="sr-only">{copied ? "Email address copied" : ""}</span>}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-10 lg:mt-auto lg:pt-10">
                <p className="mb-4 text-sm text-muted">Find me online</p>
                <ul className="flex gap-3">
                  {SOCIALS.map(({ label, Icon, href }, i) => (
                    <li key={label} data-reveal style={{ "--rd": `${i * 90}ms` }}>
                      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                        className="grid h-12 w-12 place-items-center rounded-full border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cobalt)]">
                        <Icon aria-hidden="true" className="h-4 w-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* form */}
            <div data-reveal style={{ "--rd": ".15s" }} className="min-w-0 rounded-3xl border border-[#E4E9F6] bg-[#F3F5FC] p-3 transition-shadow duration-300 focus-within:shadow-[0_0_0_6px_rgba(26,38,114,.06)] sm:p-8">
              {status === "sent" ? (
                <div role="status" className="flex min-h-[22rem] flex-col items-center sm:min-h-[28rem] justify-center text-center">
                  <span className="pop grid h-20 w-20 place-items-center rounded-full bg-[var(--ink)] text-white shadow-[0_20px_40px_-16px_rgba(14,22,51,.7)]">
                    <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path className="draw" d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  <h3 className="font-display mt-6 text-2xl font-medium tracking-tight sm:text-3xl">{EMAILJS_READY ? "Message sent" : "Message ready"}, {v.name.split(" ")[0]}.</h3>
                  <p className="mt-3 max-w-xs leading-relaxed text-muted">
                    {EMAILJS_READY ? "Thanks for reaching out. I'll reply to " + v.email + " soon." : "Your email app should open with the message filled in. Press send there to finish."}
                  </p>
                  <button type="button" onClick={reset}
                    className="mt-8 rounded-full border border-line bg-white px-6 py-3 text-sm font-medium transition-colors hover:border-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cobalt)]">
                    Send another message
                  </button>
                </div>
              ) : (
                <form ref={form} onSubmit={submit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field id="cf-name" label="Your name" value={v.name} onChange={set("name")} error={errors.name} autoComplete="name" />
                    <Field id="cf-email" type="email" label="Email address" value={v.email} onChange={set("email")} error={errors.email} autoComplete="email" />
                  </div>

                  <fieldset className="min-w-0">
                    <legend className="mb-3 text-sm font-medium text-ink">I need help with</legend>
                    <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                      {TYPES.map((t) => (
                        <label key={t} className="cursor-pointer">
                          <input type="radio" name="type" value={t} checked={v.type === t} onChange={set("type")} className="peer sr-only" />
                          <span className="flex min-h-[44px] items-center justify-center rounded-full border border-[#DDE3F3] bg-white px-3 py-2 text-center text-sm leading-tight sm:justify-start sm:px-4 sm:py-0 sm:text-left shadow-[0_1px_2px_rgba(14,22,51,.04)] transition-all duration-200 hover:border-[var(--ink)] peer-checked:border-[var(--ink)] peer-checked:bg-[var(--ink)] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--cobalt)]">
                            {t}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <Field id="cf-message" textarea label="Tell me about your project" value={v.message} onChange={set("message")} error={errors.message} />

                  {/* honeypot: hidden from people, tempting to bots */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>Company<input tabIndex={-1} autoComplete="off" value={v.company} onChange={set("company")} /></label>
                  </div>

                  {status === "error" && (
                    <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                      Something went wrong sending that. Please try again, or email {CONTACT_EMAIL} directly.
                    </p>
                  )}

                  <button type="submit" disabled={status === "sending"}
                    className="group flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#0E1633] to-[#1A2672] px-8 py-4 text-sm font-medium text-white shadow-[0_18px_40px_-16px_rgba(14,22,51,.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-16px_rgba(26,38,114,.9)] disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--cobalt)]">
                    {status === "sending" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                        Sending
                      </>
                    ) : (
                      <>
                        Send message
                        <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <path d="M4 12L12 4M6 4h6v6" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function FooterLink({ href, children, ...props }) {
  return (
    <a href={href} {...props}
      className="group relative inline-block rounded text-base text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
      {children}
      <span aria-hidden="true" className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </a>
  );
}

function Footer() {
  const toTop = () =>
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });

  const glow = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <footer className="font-body relative overflow-hidden bg-[#050507] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full opacity-25 blur-3xl" style={{ background: "radial-gradient(closest-side,#26379F,transparent)" }} />

      <div className="relative mx-auto max-w-7xl 2xl:max-w-[1500px] px-6 pt-20 sm:px-10 sm:pt-24 lg:px-14">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-14">
          {/* brand */}
          <div data-reveal className="sm:col-span-2 lg:col-span-1">
            <a href="#" aria-label="Mpho James, back to top" className="inline-flex items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white p-1.5">
                <img src={logo} alt="" draggable="false" className="h-full w-full object-contain" />
              </span>
              <span className="font-display text-2xl leading-none tracking-tight">
                <span className="font-bold">Mpho</span> <span className="font-light text-white/60">James</span>
              </span>
            </a>
            <p className="mt-6 max-w-xs text-base leading-relaxed text-white/60">
              Full stack developer building fast, reliable web apps from the interface to the database.
            </p>
          </div>

          {/* navigate */}
          <nav aria-label="Footer" data-reveal style={{ "--rd": ".12s" }}>
            <h2 className="font-display text-lg font-medium">Navigate</h2>
            <ul className="mt-5 space-y-3.5">
              {NAV.map((n) => (
                <li key={n}><FooterLink href={`#${n.toLowerCase()}`}>{n}</FooterLink></li>
              ))}
            </ul>
          </nav>

          {/* connect */}
          <div data-reveal style={{ "--rd": ".24s" }}>
            <h2 className="font-display text-lg font-medium">Connect</h2>
            <ul className="mt-5 space-y-3.5">
              <li><FooterLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</FooterLink></li>
              {SOCIALS.map((so) => (
                <li key={so.label}><FooterLink href={so.href} target="_blank" rel="noopener noreferrer">{so.label}</FooterLink></li>
              ))}
            </ul>
          </div>
        </div>

        {/* wordmark that lights up under the cursor */}
        <div aria-hidden="true" data-reveal onPointerMove={glow}
          className="font-display mt-16 select-none sm:mt-20 whitespace-nowrap text-center text-[clamp(3rem,15vw,15rem)] font-bold leading-[0.85] tracking-[-0.05em]"
          style={{
            backgroundImage: "radial-gradient(320px circle at var(--x,50%) var(--y,40%), rgba(255,255,255,.95), rgba(255,255,255,.14) 70%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            maskImage: "linear-gradient(to bottom,#000 55%,transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom,#000 55%,transparent 100%)",
          }}>
          Mpho James
        </div>

        {/* bottom bar */}
        <div className="relative flex flex-col items-start gap-5 border-t border-white/10 py-8 text-sm text-white/55 lg:flex-row lg:items-center lg:justify-between">
          <p>&copy; {new Date().getFullYear()} Mpho James. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Built with
            <FaReact aria-hidden="true" className="h-4 w-4 text-[#61DAFB]" /> React and
            <SiTailwindcss aria-hidden="true" className="h-4 w-4 text-[#38BDF8]" /> Tailwind CSS
          </p>
          <button type="button" onClick={toTop}
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 py-2 pl-5 pr-2 text-white transition-colors hover:border-white hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Back to top
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-black transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-black group-hover:text-white">
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Header: fixed, glass on scroll, menu on phones ---------- */
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="drop-in fixed inset-x-0 top-0 z-50" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div aria-hidden="true" className={`absolute inset-0 -z-10 border-b border-line bg-white/75 backdrop-blur-xl transition-opacity duration-300 ${scrolled || open ? "opacity-100" : "opacity-0"}`} />
      {open && <div aria-hidden="true" onClick={close} className="fixed inset-0 -z-20 bg-[#0E1633]/30 md:hidden" />}

      <div className={`mx-auto flex max-w-7xl 2xl:max-w-[1500px] items-center justify-between px-6 transition-[padding] duration-300 sm:px-10 lg:px-14 ${scrolled ? "py-3" : "py-5 sm:py-6"}`}>
        <Logo />

        <nav aria-label="Primary" className="hidden rounded-full border border-white/70 bg-white/60 p-1 shadow-[0_10px_40px_-20px_rgba(14,22,51,.4)] backdrop-blur-xl md:block">
          <ul className="flex items-center">
            {NAV.map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="block rounded-full px-4 py-2 text-sm text-muted transition-colors hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cobalt)]">{item}</a>
              </li>
            ))}
          </ul>
        </nav>

        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/80 backdrop-blur md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cobalt)]">
          <span aria-hidden="true" className="relative block h-3.5 w-5">
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-[var(--ink)] transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-[var(--ink)] transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-[var(--ink)] transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      <div id="mobile-menu" className={`absolute inset-x-0 top-full border-b border-line bg-white/95 backdrop-blur-xl transition-all duration-300 md:hidden ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}>
        <nav aria-label="Mobile" className="px-6 pb-8 pt-2 sm:px-10">
          <ul>
            {NAV.map((item) => (
              <li key={item} className="border-b border-line">
                <a href={`#${item.toLowerCase()}`} onClick={close} className="font-display flex min-h-[64px] items-center justify-between text-3xl font-medium tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cobalt)]">
                  {item}
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="h-5 w-5 text-muted" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 12L12 4M6 4h6v6" /></svg>
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={close} className="mt-6 flex min-h-[52px] items-center justify-center rounded-full bg-[var(--ink)] px-8 text-sm font-medium text-white">Get in touch</a>
        </nav>
      </div>
    </header>
  );
}

/* Cycles through what I build, typed out letter by letter */
const ROLES = ["React interfaces", "Node.js APIs", "MongoDB data models", "Python automation"];
function Typewriter() {
  const [text, setText] = useState(ROLES[0]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let w = 0, c = ROLES[0].length, erasing = true, t;
    const tick = () => {
      const word = ROLES[w];
      c += erasing ? -1 : 1;
      setText(word.slice(0, c));
      let wait = erasing ? 35 : 70;
      if (!erasing && c === word.length) { erasing = true; wait = 1800; }
      else if (erasing && c === 0) { erasing = false; w = (w + 1) % ROLES.length; wait = 350; }
      t = setTimeout(tick, wait);
    };
    t = setTimeout(tick, 2200);
    return () => clearTimeout(t);
  }, []);
  return (
    <p className="rise mt-5 text-lg text-muted" style={{ animationDelay: ".9s" }}>
      <span className="sr-only">Currently crafting React interfaces, Node.js APIs, MongoDB data models and Python automation.</span>
      <span aria-hidden="true">Currently crafting <span className="font-medium text-ink">{text}</span><span className="caret" /></span>
    </p>
  );
}

/* Tech icons drifting beside the portrait */
const FLOATERS = [
  { n: "React", pos: { top: "12%", right: "34%" }, d: "-1s", s: "6s" },
  { n: "Node.js", pos: { top: "15%", right: "6%" }, d: "-3s", s: "7.5s" },
  { n: "MongoDB", pos: { bottom: "27%", right: "10%" }, d: "-2s", s: "6.5s" },
  { n: "Tailwind CSS", pos: { bottom: "31%", right: "36%" }, d: "-4s", s: "8s" },
];
function FloatIcons() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[38%] lg:block">
      {FLOATERS.map(({ n, pos, d, s }, i) => {
        const { Icon, color } = ICONS[n];
        return (
          <div key={n} className="pop absolute" style={{ ...pos, animationDelay: `${1.4 + i * 0.15}s` }}>
            <div className="floaty grid h-14 w-14 place-items-center rounded-2xl border border-white/70 bg-white/70 shadow-[0_18px_40px_-18px_rgba(14,22,51,.5)] backdrop-blur-xl" style={{ animationDelay: d, animationDuration: s }}>
              <Icon className="h-7 w-7" style={{ color }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const root = useRef(null);
  const bar = useRef(null);
  const portrait = useRef(null);

  /* scroll reveal: anything marked data-reveal rises in as it enters the screen */
  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) { items.forEach((n) => n.setAttribute("data-in", "")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.setAttribute("data-in", ""); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  /* scroll progress bar + gentle portrait parallax */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const paint = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      if (portrait.current && !reduce) portrait.current.style.transform = `translate3d(0, ${Math.min(y * 0.08, 70)}px, 0)`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(paint); };
    paint();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (e) => { el.style.setProperty("--mx", e.clientX + "px"); el.style.setProperty("--my", e.clientY + "px"); };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Instrument+Sans:wght@400;500;600&display=swap');
        :root { --paper:#EDF0F7; --ink:#0E1633; --muted:#4A5575; --cobalt:#1A2672; --line:#C9D0E3; }
        .font-display { font-family:'Bricolage Grotesque',ui-sans-serif,system-ui,sans-serif; font-variation-settings:'wdth' 90; }
        .font-body { font-family:'Instrument Sans',ui-sans-serif,system-ui,sans-serif; }
        .text-ink{color:var(--ink)} .text-muted{color:var(--muted)} .bg-paper{background:var(--paper)}
        .bg-cobalt{background:var(--cobalt)} .text-cobalt{color:var(--cobalt)} .border-line{border-color:var(--line)}

        html { scroll-padding-top: 5rem; -webkit-text-size-adjust: 100%; }
        @media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
        @keyframes rise { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
        @keyframes word-in { from{transform:translateY(110%)} to{transform:none} }
        @keyframes drift { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-40px,30px) scale(1.1)} }
        @keyframes floaty { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes marquee { to{transform:translateX(-50%)} }
        @keyframes grow { from{transform:scaleX(0)} to{transform:scaleX(1)} }
                @keyframes wave-slide { to{background-position-x:16px} }
        @keyframes wave-in { from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0 0 0)} }

        .rise{animation:rise .9s cubic-bezier(.2,.7,.2,1) both}
        @keyframes reveal { from{opacity:0;transform:translateY(34px) scale(.97)} }
        @keyframes shine { 0%{transform:translateX(-130%) skewX(-20deg)} 55%,100%{transform:translateX(330%) skewX(-20deg)} }
        @keyframes blink { 50%{opacity:0} }
        @keyframes drop-in { from{opacity:0;transform:translateY(-100%)} }
        [data-reveal]:not([data-in]){opacity:0}
        [data-reveal][data-in]{animation:reveal .9s cubic-bezier(.2,.7,.2,1) var(--rd,0s) backwards}
        .drop-in{animation:drop-in .9s cubic-bezier(.2,.7,.2,1) .1s backwards}
        .shine{pointer-events:none;width:40%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);animation:shine 3.8s ease-in-out 2s infinite}
        .caret{display:inline-block;width:2px;height:1.05em;margin-left:3px;vertical-align:-.15em;background:var(--cobalt);animation:blink 1s steps(1) infinite}
        .word-in{animation:word-in 1s cubic-bezier(.2,.8,.2,1) both}
        .drift{animation:drift 16s ease-in-out infinite}
        .floaty{animation:floaty 7s ease-in-out infinite}
        .marquee{animation:marquee 30s linear infinite}
        .marquee-wrap:hover .marquee{animation-play-state:paused}
        .bar{transform-origin:left;animation:grow 1.4s cubic-bezier(.2,.7,.2,1) both;animation-delay:var(--d)}
        
        .wavy{position:relative;display:inline-block}
        .wavy::after{
          content:"";position:absolute;left:0;right:0;bottom:-.3em;height:8px;
          background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='8' viewBox='0 0 16 8'%3E%3Cpath d='M0 4Q4 0 8 4T16 4' fill='none' stroke='%231A2672' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E") repeat-x;
          background-size:16px 8px;
          animation:wave-in .9s cubic-bezier(.2,.7,.2,1) both, wave-slide 1.1s linear infinite;
          animation-delay:var(--d), 0s;
        }
        .wavy-wait:not(.is-in)::after{animation-play-state:paused}
        .wavy-lg::after{height:12px;background-size:24px 12px;bottom:-.2em;animation-name:wave-in,wave-slide-lg}
        @keyframes wave-slide-lg { to{background-position-x:24px} }
        @keyframes draw { to{stroke-dashoffset:0} }
        @keyframes pop { from{opacity:0;transform:scale(.6)} to{opacity:1;transform:none} }
        .draw{stroke-dasharray:60;stroke-dashoffset:60;animation:draw .7s .2s ease-out forwards}
        .pop{animation:pop .6s cubic-bezier(.2,1.4,.4,1) both}
        @media (prefers-reduced-motion: reduce){
          .draw{animation:none!important;stroke-dashoffset:0}
          .pop{animation:none!important}
        }
        @media (prefers-reduced-motion: reduce){
          .rise,.word-in,.drift,.floaty,.marquee,.bar,.wavy::after,.shine,.caret,.drop-in,[data-reveal][data-in]{animation:none!important}
          [data-reveal]:not([data-in]){opacity:1!important}
        }
      `}</style>

      <div ref={bar} aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
        style={{ transform: "scaleX(0)", background: "linear-gradient(90deg,#1A2672,#3A4DBA,#61DAFB)" }} />
      <Header />

      <main ref={root} className="font-body relative min-h-[100svh] overflow-hidden bg-paper text-ink" style={{ "--mx": "70%", "--my": "30%" }}>
        {/* ambient light */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="drift absolute -right-32 top-1/4 h-[36rem] w-[36rem] rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(closest-side,#26379F,transparent)" }} />
          <div className="drift absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(closest-side,#3A4DBA,transparent)", animationDelay: "-8s" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(380px circle at var(--mx) var(--my), rgba(26,38,114,.09), transparent 70%)" }} />
        </div>

        {/* portrait */}
        <div ref={portrait} aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[54%] 2xl:w-[46%]">
          <img
            src={profile}
            alt=""
            draggable="false"
            className="h-full w-full object-cover object-[62%_top] opacity-25 lg:object-top lg:opacity-100"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, #000 45%), linear-gradient(to bottom, transparent 0%, #000 14%, #000 68%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 45%), linear-gradient(to bottom, transparent 0%, #000 14%, #000 68%, transparent 100%)",
              WebkitMaskComposite: "source-in",
            }}
          />
        </div>

        <FloatIcons />
        {/* glass card: the stack in layers */}
        <div className="rise absolute right-10 top-[28%] z-10 hidden w-64 lg:block" style={{ animationDelay: "1s" }}>
          <div className="floaty rounded-2xl border border-white/70 bg-white/55 p-5 shadow-[0_24px_70px_-24px_rgba(14,22,51,.45)] backdrop-blur-xl">
            <p className="font-display text-base font-semibold tracking-tight">Full stack, end to end</p>
            <ul className="mt-4 space-y-3.5">
              {LAYERS.map((l, i) => (
                <li key={l.label}>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-semibold">{l.label}</span>
                    <span className="text-muted">{l.detail}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/80">
                    <div className="bar h-full rounded-full" style={{ width: l.w, "--d": `${1.3 + i * 0.15}s`, background: "linear-gradient(90deg,#1A2672,#3A4DBA)" }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl 2xl:max-w-[1500px] flex-col px-6 sm:px-10 lg:px-14">
          {/* hero */}
          <section className="flex flex-1 flex-col justify-center pb-16 pt-32 sm:pb-20 sm:pt-36">
            <div className="max-w-3xl lg:max-w-[58%]">
              <Headline text={HEADLINE} />
            </div>

            <p className="rise mt-12 max-w-lg text-lg leading-[1.75] text-muted" style={{ animationDelay: ".6s" }}>
              <Wavy delay="1.2s">Full stack developer</Wavy> who designs, builds and ships web apps{" "}
              <Wavy delay="1.6s">end to end</Wavy>, from the interface to the database.
            </p>

            <Typewriter />
            <div className="rise mt-12 flex flex-wrap items-center gap-4" style={{ animationDelay: ".75s" }}>
              <Magnetic href="#work" className="group relative overflow-hidden rounded-full bg-[var(--ink)] px-8 py-4 text-sm font-medium text-white shadow-[0_14px_40px_-12px_rgba(14,22,51,.7)] hover:bg-[#26379F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--cobalt)]">
                <span aria-hidden="true" className="shine absolute inset-y-0 left-0" />
                <span className="relative">View my work</span>
              </Magnetic>
              <Magnetic href={`mailto:${CONTACT_EMAIL}`} className="rounded-full border border-line bg-white/60 px-8 py-4 text-sm font-medium backdrop-blur hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--cobalt)]">
                Get in touch
              </Magnetic>
            </div>
          </section>

          {/* tech stack */}
          <section id="stack" aria-label="Tech stack" className="rise pb-12 pt-4" style={{ animationDelay: ".9s" }}>
            <div className="marquee-wrap overflow-hidden rounded-3xl border border-white/70 bg-white/55 py-5 shadow-[0_20px_60px_-30px_rgba(14,22,51,.35)] backdrop-blur-xl"
              style={{ maskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)" }}>
              <ul className="marquee flex w-max items-center gap-4 px-4">
                {[...STACK, ...STACK].map(({ name, Icon, color }, i) => (
                  <li key={i} aria-hidden={i >= STACK.length} className="group font-display flex items-center gap-3 rounded-full border border-line bg-white/80 py-2.5 pl-3.5 pr-6 text-lg font-medium tracking-tight transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--cobalt)] hover:shadow-[0_10px_30px_-12px_rgba(14,22,51,.5)]">
                    <Icon className="h-7 w-7 shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ color }} aria-hidden="true" />
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>

      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
