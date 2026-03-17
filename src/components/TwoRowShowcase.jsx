// src/FeaturedProject.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  FaCheckCircle,
  FaExternalLinkAlt,
  FaCode
} from "react-icons/fa";
import remopdf1 from "../asserts/example1.png";
import remopdf2 from "../asserts/example2.png";
import remopdf3 from "../asserts/example3.jpeg";
import landingPage1 from "../asserts/example4.jfif";
import landingPage2 from "../asserts/example6.png";
import landingPage3 from "../asserts/example7.png";
import landingPage4 from "../asserts/example8.png";
import landingPage5 from "../asserts/example9.png";
import landingPage6 from "../asserts/example10.png";
import landingPage7 from "../asserts/example11.png";
import resume1 from "../asserts/resume1.png";
import resume2 from "../asserts/resume2.png";
import resume3 from "../asserts/resume3.png";
import chat1 from "../asserts/chat1.png";
import chat2 from "../asserts/chat2.png";

export default function FeaturedProject() {
  const sectionRef = useRef(null);

  /* ---------------- Slideshow state ---------------- */
const imagesRow1 = [
  remopdf1,
  remopdf2,
  remopdf3,
];

const imagesRow2 = [
  landingPage1,
  landingPage2,
  landingPage3,
  landingPage4
];

const imagesRow3 = [
  landingPage5,
  landingPage6,
  landingPage7
];

const imagesRow4 = [
  resume1,
  resume2,
  resume3
];

const imagesRow5 = [
  chat1,
  chat2
];


  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [index4, setIndex4] = useState(0);
  const [index5, setIndex5] = useState(0);


  useEffect(() => {
    const interval1 = setInterval(
      () => setIndex1((i) => (i + 1) % imagesRow1.length),
      10000
    );

    const interval2 = setInterval(
      () => setIndex2((i) => (i + 1) % imagesRow2.length),
      10000
    );

    const interval4 = setInterval(
  () => setIndex4((i) => (i + 1) % imagesRow4.length),
  10000
);

const interval5 = setInterval(
  () => setIndex5((i) => (i + 1) % imagesRow5.length),
  10000
);

    return () => {
  clearInterval(interval1);
  clearInterval(interval2);
  clearInterval(interval4);
  clearInterval(interval5);
};
  }, []);

  /* ---------------- Intersection Observer ---------------- */
  useEffect(() => {
    const observerOpts = {
      root: null,
      rootMargin: "0px",
      threshold: [0, 0.1, 0.5],
    };

    const slideObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target;

        if (entry.isIntersecting && entry.intersectionRatio > 0.08) {
          el.classList.add("visible");
          el.classList.remove("out");

          if (el.classList.contains("slide-left") || el.classList.contains("slide-right")) {
            el.classList.add("in");
          }
        } else {
          el.classList.remove("in");
          el.classList.add("out");
          el.classList.remove("visible");
        }
      });
    }, observerOpts);

    const targets = sectionRef.current.querySelectorAll(
      ".reveal, .slide-left, .slide-right"
    );

    targets.forEach((el) => slideObserver.observe(el));
    return () => slideObserver.disconnect();
  }, []);

  const remoItems = [
    "Merge PDF files",
    "Remove or reorder pages",
    "Convert documents",
    "No installation required",
  ];

  const techHighlights = [
    "Modern JavaScript frontend",
    "No server-side processing",
    "Cloud deployment",
    "Optimized for performance",
  ];

  const primeStayFeatures = [
  "Conversion-focused hero with real-world booking flow",
  "Advanced search with destination, dates, and guest logic",
  "Curated carousels driven by lifestyle-based categories",
  "Progressive content disclosure to reduce cognitive load",
  "Accessible, semantic HTML structure with ARIA support"
];

const primeStayTech = [
  "Modern, component-driven frontend architecture",
  "Vanilla JS + framework-agnostic patterns for scalability",
  "Performance-optimized media handling and animations",
  "Mobile-first, responsive layout with advanced UI states",
  "Clean separation of UI, behavior."
];

const netflixFeatures = [
  "Secure authentication with JWT",
  "Protected routes & role-based access",
  "Dynamic movie categories with backend API",
  "Continue Watching with local persistence",
  "Responsive Netflix-style UI"
];

const netflixTech = [
  "Vanilla Javascript",
  "Node.js + Express REST API",
  "MongoDB database integration",
  "JWT authentication & middleware security",
  "Deployed on Render with CI workflow"
];

const resumeBuilderFeatures = [
  "Dynamic resume preview while editing",
  "Multiple professional templates",
  "Live editing of experience and skills",
  "Profile photo upload",
  "Download-ready resume layout"
];

const resumeBuilderTech = [
  "Vanilla JavaScript UI architecture",
  "LocalStorage data persistence",
  "Dynamic template rendering",
  "Responsive layout engine",
  "Client-side resume preview system"
];

const chatFeatures = [
  "Real-time messaging using WebSockets",
  "User authentication and chat rooms",
  "Instant message delivery",
  "Responsive chat UI",
  "Live user interaction"
];

const chatTech = [
  "React frontend",
  "Node.js + Express backend",
  "Socket.io real-time communication",
  "MongoDB message storage",
  "REST API architecture"
];


  return (
    <section className="featured-project reveal" id="projects" ref={sectionRef}>
      <div className="fp-wrap">

        {/* HEADER */}
        <div className="fp-header slide-left out">
          <span className="eyebrow">FEATURED PROJECT</span>
          <h2>Building software that solves real problems</h2>
        </div>

        {/* ROW 1 */}
        <div className="fp-row slide-left out">
          <div className="fp-image slideshow">
            {imagesRow1.map((src, i) => (
              <img
                key={src}
                src={src}
                className={i === index1 ? "active" : ""}
                alt=""
              />
            ))}
          </div>

          <div className="fp-text">
            <h3>RemoPDF</h3>
            <h4>Founder & Lead Developer</h4>
            <p>
              A lightweight, browser-based PDF utility designed to handle common
              document tasks without premium software.
            </p>

            <h4>Key Features</h4>
            <ul className="focus-list">
              {remoItems.map((item, i) => (
                <li key={i}>
                  <FaCheckCircle size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h4>Tech highlights</h4>
            <ul className="focus-list">
              {techHighlights.map((item, i) => (
                <li key={i}>
                  <FaCheckCircle size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="fp-actions">
  <a
    href="https://remopdf.onrender.com"
    target="_blank"
    rel="noopener noreferrer"
    className="fp-btn primary"
  >
    <FaExternalLinkAlt />
    Live Preview
  </a>

  <a
    href="https://github.com/mphojames9/remopdf"
    target="_blank"
    rel="noopener noreferrer"
    className="fp-btn secondary"
  >
    <FaCode />
    View Code
  </a>
</div>

          </div>
        </div>

        {/* ROW 2 */}
        <div className="fp-row reverse slide-right out">
            <div className="fp-text">
    <h3>PrimeStay - Landing Page </h3>
    <h4>Personal Project (demonstration)</h4>

    <p>
      PrimeStay is a modern accommodation discovery platform designed to reduce
      decision fatigue and surface stays that genuinely match how people travel
      and live. This landing page showcases strong UX judgment, scalable frontend
      architecture, and a product-first engineering mindset.
    </p>

    <h4>Key Features</h4>
    <ul className="focus-list">
      {primeStayFeatures.map((item, i) => (
        <li key={i}>
          <FaCheckCircle size={16} />
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <h4>Tech Highlights</h4>
    <ul className="focus-list">
      {primeStayTech.map((item, i) => (
        <li key={i}>
          <FaCheckCircle size={16} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
            <div className="fp-actions">
  <a
    href="https://mphojames9.github.io/hotelBookingsWebsite/"
    target="_blank"
    rel="noopener noreferrer"
    className="fp-btn primary"
  >
    <FaExternalLinkAlt />
    Live Preview
  </a>

  <a
    href="https://github.com/mphojames9/hotelBookingsWebsite"
    target="_blank"
    rel="noopener noreferrer"
    className="fp-btn secondary"
  >
    <FaCode />
    View Code
  </a>
</div>

          </div>

          <div className="fp-image slideshow">
            {imagesRow2.map((src, i) => (
              <img
                key={src}
                src={src}
                className={i === index2 ? "active" : ""}
                alt=""
              />
            ))}
          </div>
        </div>

        {/* ROW 3 - NetflixApp */}
<div className="fp-row slide-left out">

 <div className="fp-image slideshow">
            {imagesRow3.map((src, i) => (
              <img
                key={src}
                src={src}
                className={i === index1 ? "active" : ""}
                alt=""
              />
            ))}
  </div>

  <div className="fp-text">
    <h3>StreamVault – Secure Streaming Platform</h3>
    <h4>Full Stack Project</h4>

    <p>
      A production-ready streaming platform inspired by Netflix, built with a
      secure authentication system, protected APIs, and dynamic content rendering.
      Designed to demonstrate real-world backend architecture and scalable UI systems.
    </p>

    <h4>Key Features</h4>
    <ul className="focus-list">
      {netflixFeatures.map((item, i) => (
        <li key={i}>
          <FaCheckCircle size={16} />
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <h4>Tech Highlights</h4>
    <ul className="focus-list">
      {netflixTech.map((item, i) => (
        <li key={i}>
          <FaCheckCircle size={16} />
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <div className="fp-actions">
      <a
        href="https://netflixapp-4he1.onrender.com"
        target="_blank"
        rel="noopener noreferrer"
        className="fp-btn primary"
      >
        <FaExternalLinkAlt />
        Live Demo
      </a>

      <a
        href="https://github.com/mphojames9/netflixapp"
        target="_blank"
        rel="noopener noreferrer"
        className="fp-btn secondary"
      >
        <FaCode />
        View Code
      </a>
    </div>
  </div>
</div>

{/* ROW 4 - Resume Builder */}
<div className="fp-row reverse slide-right out">

  <div className="fp-text">
    <h3>ResumePro – Resume Builder (RemoPDF)</h3>
    <h4>Founder & Lead Developer</h4>

    <p>
      A browser-based resume builder that allows users to create professional
      resumes with real-time editing and preview. The project demonstrates
      dynamic UI rendering, structured data handling, and modern frontend
      architecture.
    </p>

    <h4>Key Features</h4>
    <ul className="focus-list">
      {resumeBuilderFeatures.map((item, i) => (
        <li key={i}>
          <FaCheckCircle size={16} />
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <h4>Tech Highlights</h4>
    <ul className="focus-list">
      {resumeBuilderTech.map((item, i) => (
        <li key={i}>
          <FaCheckCircle size={16} />
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <div className="fp-actions">
      <a
        href="https://remopdf.onrender.com/resumePro/index.html"
        target="_blank"
        rel="noopener noreferrer"
        className="fp-btn primary"
      >
        <FaExternalLinkAlt />
        Live Demo
      </a>

      <a
        href="https://github.com/mphojames9/remopdf"
        target="_blank"
        rel="noopener noreferrer"
        className="fp-btn secondary"
      >
        <FaCode />
        View Code
      </a>
    </div>
  </div>

  <div className="fp-image slideshow">
    {imagesRow4.map((src, i) => (
      <img
        key={src}
        src={src}
        className={i === index4 ? "active" : ""}
        alt=""
      />
    ))}
  </div>

</div>

{/* ROW 5 - Real Time Chat App */}
<div className="fp-row slide-right out">

  {/* IMAGE LEFT */}
  <div className="fp-image slideshow">
    {imagesRow5.map((src, i) => (
      <img
        key={src}
        src={src}
        className={i === index5 ? "active" : ""}
        alt="PulseChat chat interface preview"
      />
    ))}
  </div>

  {/* TEXT RIGHT */}
  <div className="fp-text">
    <h3>PulseChat – Real-Time Messaging Platform</h3>
    <h4>Full Stack Project</h4>

    <p>
      A real-time chat application enabling users to send and receive
      messages instantly through WebSocket communication. The platform
      demonstrates real-time event handling, scalable backend architecture,
      and a responsive messaging interface.
    </p>

    <h4>Key Features</h4>
    <ul className="focus-list">
      {chatFeatures.map((item, i) => (
        <li key={i}>
          <FaCheckCircle size={16} />
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <h4>Tech Highlights</h4>
    <ul className="focus-list">
      {chatTech.map((item, i) => (
        <li key={i}>
          <FaCheckCircle size={16} />
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <div className="fp-actions">
      <a
        href="https://github.com/mphojames9/real_time-_chat_app"
        target="_blank"
        rel="noopener noreferrer"
        className="fp-btn primary"
      >
        <FaExternalLinkAlt />
        View Project
      </a>

      <a
        href="https://github.com/mphojames9/real_time-_chat_app"
        target="_blank"
        rel="noopener noreferrer"
        className="fp-btn secondary"
      >
        <FaCode />
        View Code
      </a>
    </div>
  </div>

</div>
      </div>

      <style>{`
        /* ---------------- Layout ---------------- */
        .featured-project {
          padding: 80px 20px;
          overflow: hidden;
        }

        .fp-wrap {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 80px;
        }

        .fp-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        /* ---------------- Slideshow ---------------- */
        .slideshow {
          position: relative;
          height: 100%;
        }

        .slideshow img {
          position: absolute;
          width: 100%;
          opacity: 0;
          transition: opacity 1.2s ease;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.08);
        }

        .slideshow img.active {
          opacity: 1;
          position: relative;
        }

        /* ---------------- Animation Core ---------------- */
        .reveal,
        .slide-left,
        .slide-right {
          opacity: 0;
        }

        .slide-left {
          transform: translateX(-80px);
        }

        .slide-right {
          transform: translateX(80px);
        }

        .in {
          opacity: 1;
          transform: translateX(0);
          transition: transform 0.9s cubic-bezier(.2,.9,.2,1),
                      opacity 0.9s ease;
        }

        /* ---------------- Action Buttons ---------------- */
.fp-actions {
  display: flex;
  gap: 16px;
  margin-top: 28px;
  flex-wrap: wrap;
}

.fp-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.fp-btn svg {
  font-size: 14px;
}

/* Primary */
.fp-btn.primary {
  background: #111;
  color: #fff;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.fp-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.25);
}

/* Secondary */
.fp-btn.secondary {
  background: #f4f4f4;
  color: #111;
}

.fp-btn.secondary:hover {
  background: #eaeaea;
  transform: translateY(-2px);
}

  .fp-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

        /* ---------------- Mobile ---------------- */
        @media (max-width: 700px) {
          .fp-row {
            grid-template-columns: 1fr;
          }

          .reverse {
    display: flex;
    flex-direction: column-reverse;
  }
      }


      `}</style>
    </section>
  );
}
