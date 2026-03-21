import React, { useEffect } from "react";
import spa from "../asserts/spa.jpg";
import spa1 from "../asserts/spa1.jpg";
import spa2 from "../asserts/spa2.jpg";
import spa3 from "../asserts/spa3.jpg";
import spa4 from "../asserts/spa4.jpg";
import spa5 from "../asserts/spa5.jpg";

import hotel1 from "../asserts/hotel1.jpg";
import hotel2 from "../asserts/hotel2.jpg";
import hotel3 from "../asserts/hotel3.jpg";
import hotel4 from "../asserts/hotel4.jpg";

import untitled1 from "../asserts/Untitled1.png";
import untitled2 from "../asserts/Untitled2.png";
import untitled3 from "../asserts/Untitled3.png";
import untitled4 from "../asserts/Untitled4.png";

export default function Projects() {

  useEffect(() => {
    // progress/interaction code for rings
    const rings = document.querySelectorAll(".ring");
    const ringObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const svg = e.target.querySelector("svg");
          if (!svg) return;

          const circle = svg.querySelectorAll("circle")[1];
          const r = circle.r.baseVal.value;
          const c = Math.PI * (r * 2);

          circle.style.strokeDasharray = c;

          if (e.isIntersecting) {
            const pct = parseInt(e.target.getAttribute("data-percent") || 80);
            const offset = c - (pct / 100) * c;

            circle.style.transition = "stroke-dashoffset 1s ease";
            circle.style.strokeDashoffset = offset;
          } else {
            circle.style.strokeDashoffset = c;
          }
        });
      },
      { threshold: 0.2 }
    );

    rings.forEach((r) => ringObserver.observe(r));

    // modal logic
    const modalBackdrop = document.getElementById("modalBackdrop");
    const modalContent = document.getElementById("modalContent");

    document.querySelectorAll(".project").forEach((proj) => {
      proj.addEventListener("click", () => {
        const title = proj.getAttribute("data-title");
        const desc = proj.getAttribute("data-desc");
        const imgs = (proj.getAttribute("data-images") || "").split(",");

        let html = `
          <h2>${title}</h2>
          <p class="muted">${desc}</p>
          <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
        `;

        imgs.forEach((src) => {
          if (src) {
            html += `<img src="${src}" alt="${title}" style="width:180px;height:110px;object-fit:cover;border-radius:8px;border:1px solid rgba(255,255,255,0.04)">`;
          }
        });

        html += `
          </div>
          <div style="margin-top:14px;display:flex;gap:10px">
            <a class="btn" href="#contact">Work with me</a>
            <button class="ghost" onclick="document.getElementById('modalBackdrop').style.display='none'">Close</button>
          </div>
        `;

        if (modalContent) modalContent.innerHTML = html;
        if (modalBackdrop) modalBackdrop.style.display = "flex";
      });
    });

    const modalClose = document.getElementById("modalClose");
    if (modalClose)
      modalClose.addEventListener("click", () => {
        if (modalBackdrop) modalBackdrop.style.display = "none";
      });

    if (modalBackdrop)
      modalBackdrop.addEventListener("click", (e) => {
        if (e.target === modalBackdrop) modalBackdrop.style.display = "none";
      });

  }, []);

  return (
    <section id="projects" className="reveal">
  
  {/* SECTION HEADER */}
  <div className="section-header">
    <h2 className="luxury-title">Crafted Digital Experiences</h2>
    <p className="luxury-subtitle">
      High-converting landing pages and bespoke websites designed with precision, elegance, and performance in mind.
    </p>
  </div>

  <div className="projects-grid">

    {/* SPA PROJECT */}
    <div
      className="project"
      style={{ backgroundImage: `url(${spa})` }}
      data-title="Luxury Spa Experience"
      data-desc="A refined wellness platform crafted to evoke calm, trust, and indulgence — blending immersive visuals with conversion-focused design."
      data-images={`${spa},${spa1},${spa2},${spa3},${spa4},${spa5}`}
    >
      <div
        className="img-inner parallax"
        style={{ backgroundImage: `url(${spa})` }}
      ></div>

      <div className="overlay">
        <div className="project-category">Spa & Wellness</div>
        <div className="project-title">Luxury Relaxation Redefined</div>
        <div className="project-desc">
          Designed to elevate brand perception and increase bookings.
        </div>
      </div>
    </div>

    {/* HOTEL PROJECT */}
    <div
      className="project"
      style={{ backgroundImage: `url(${hotel1})` }}
      data-title="Luxury Hotel Experience"
      data-desc="An elegant booking experience tailored for premium hospitality brands — combining seamless UX with high-end visual storytelling."
      data-images={`${hotel1},${hotel2},${hotel3},${hotel4}`}
    >
      <div
        className="img-inner parallax"
        style={{ backgroundImage: `url(${hotel1})` }}
      ></div>

      <div className="overlay">
        <div className="project-category">Hotel & Booking</div>
        <div className="project-title">Where Luxury Meets Conversion</div>
        <div className="project-desc">
          Built to inspire trust and drive direct reservations.
        </div>
      </div>
    </div>

    {/* RESTAURANT PROJECT */}
    <div
      className="project"
      style={{ backgroundImage: `url(${untitled1})` }}
      data-title="Fine Dining Experience"
      data-desc="A sophisticated restaurant landing page showcasing ambiance, menu storytelling, and seamless reservation flow."
      data-images={`${untitled1},${untitled2},${untitled3},${untitled4}`}
    >
      <div
        className="img-inner parallax"
        style={{ backgroundImage: `url(${untitled1})` }}
      ></div>

      <div className="overlay">
        <div className="project-category">Restaurant</div>
        <div className="project-title">A Taste of Digital Luxury</div>
        <div className="project-desc">
          Crafted to attract, engage, and convert high-end clientele.
        </div>
      </div>
    </div>

  </div>

  {/* CTA */}
  <div className="cta-banner caseStudy">
    <div>
      <strong className="cta-title">
        Let’s Create Something Exceptional
      </strong>
      <div className="muted">
        I collaborate with brands that value premium design, strategy, and measurable results.
      </div>
    </div>
    <div>
      <a className="btn luxury-btn" href="#contact">
        Start Your Project →
      </a>
    </div>
  </div>

  {/* MODAL */}
  <div
    id="modalBackdrop"
    className="modal-backdrop"
    style={{ display: "none" }}
  >
    <div className="modal" role="dialog" aria-modal="true">
      <button className="modal-close" id="modalClose">
        Close ✕
      </button>
      <div id="modalContent"></div>
    </div>
  </div>

</section>
  );
}
