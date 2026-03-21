import React from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

// FIXED: Correct imports for all components  
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import ContactForm from './components/ContactForm.jsx'
import About from './components/About.jsx'
import WhatIDoBest from './components/WhatIDoBest.jsx'
import TwoRowShowcase from './components/TwoRowShowcase.jsx'
import WhyWorkWithMe from './components/WhyWorkWithMe.jsx'
import FAQSectio from './components/FAQSectio.jsx'

export default function App() {
  return (
    <div className="wrap" data-theme="dark">
      <Header />

      <main>
        <Hero />
        <section id="services" className="reveal">
          <h2>Services</h2>
          <div className="services">
            <div className="service slide-left">
              <h3>Full-Stack Web Development</h3>
              <p className="muted">From idea to live product—frontend, backend, and deployment.</p>
            </div>

            <div className="service slide-left">
              <h3>Browser-Based Tools</h3>
              <p className="muted">Specialized in tools that run entirely in the browser with minimal friction.</p>
            </div>

            <div className="service slide-right">
              <h3>MVP & Startup Builds</h3>
              <p className="muted">Rapid, practical builds to validate ideas and ship fast.</p>
            </div>

            <div className="service slide-right">
              <h3>Maintenance & Optimization</h3>
              <p className="muted">Improve performance, fix issues, and scale existing systems</p>
            </div>
          </div>
        </section>

        <About />
        <Projects />
        <WhatIDoBest />
        <TwoRowShowcase />
        <WhyWorkWithMe />

        <section id="testimonials" className="testimonials-section reveal" style={{ display: "none" }}>
          <h2 className="section-title">Testimonials</h2>

          <div className="testimonials-grid">

            {/* TESTIMONIAL 1 */}
            <div className="testimonial-card slide-left">
              <p className="testimonial-text">
                “Reliable, skilled, and easy to work with.”
              </p>

              <div className="testimonial-footer">
                <img
                  src="/assets/avatar1.jpg"
                  alt="Sarah M."
                  className="testimonial-avatar"
                />
                <div>
                  <strong>Sarah M.</strong>
                  <span>Cape Town, South Africa</span>
                </div>
              </div>
            </div>

            {/* TESTIMONIAL 2 */}
            <div className="testimonial-card slide-right">
              <p className="testimonial-text">
                “Understands the problem deeply before writing a single line of code.”
              </p>

              <div className="testimonial-footer">
                <img
                  src="/assets/avatar2.jpg"
                  alt="James K."
                  className="testimonial-avatar"
                />
                <div>
                  <strong>James K.</strong>
                  <span>London, UK</span>
                </div>
              </div>
            </div>

            {/* TESTIMONIAL 3 */}
            <div className="testimonial-card slide-left">
              <p className="testimonial-text">
                “Great communication and thoughtful design.”
              </p>

              <div className="testimonial-footer">
                <img
                  src="/assets/avatar3.jpg"
                  alt="Nadia R."
                  className="testimonial-avatar"
                />
                <div>
                  <strong>Nadia R.</strong>
                  <span>Berlin, Germany</span>
                </div>
              </div>
            </div>

          </div>

          <style>{`
    /* -------- Layout -------- */
    .testimonials-section {
      padding: 90px 20px;
      max-width: 1100px;
      margin: 0 auto;
    }

    .section-title {
      font-size: 36px;
      margin-bottom: 50px;
      text-align: center;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
    }

    /* -------- Card -------- */
    .testimonial-card {
      background: var(--card-2);
      border-radius: 20px;
      padding: 10px;
      box-shadow: 0 14px 40px rgba(0,0,0,0.08);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .testimonial-text {
      font-size: 17px;
      line-height: 1.7;
      color: #5c5757;
      margin-bottom: 26px;
    }

    /* -------- Footer -------- */
    .testimonial-footer {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .testimonial-avatar {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #1f7cff;
    }

    .testimonial-footer strong {
      display: block;
      font-size: 15px;
    }

    .testimonial-footer span {
      font-size: 14px;
      color: #666;
    }

    /* -------- Animation Hooks -------- */
    .slide-left,
    .slide-right {
      opacity: 0;
      will-change: transform, opacity;
    }

    .slide-left {
      transform: translateX(-60px);
    }

    .slide-right {
      transform: translateX(60px);
    }

    .in {
      opacity: 1;
      transform: translateX(0);
      transition:
        transform 0.8s cubic-bezier(.2,.9,.2,1),
        opacity 0.8s ease;
    }

    /* -------- Responsive -------- */
    @media (max-width: 900px) {
      .testimonials-grid {
        grid-template-columns: 1fr;
      }
    }
  `}</style>
        </section>


        <section id="pricing" className="reveal">
          <h2>Pricing</h2>
          <div className="pricing">
            <div className="plan slide-left">
              <h3>Starter</h3>
              <div style={{ fontWeight: 800, fontSize: 22 }}>$499</div>
              <div className="muted">Small web tool, landing page, or feature build</div>
            </div>

            <div className="plan slide-right">
              <h3>Pro</h3>
              <div style={{ fontWeight: 800, fontSize: 22 }}>$1,499</div>
              <div className="muted">Full application module or MVP</div>
            </div>

            <div className="plan slide-left">
              <h3>Custom</h3>
              <div style={{ fontWeight: 800, fontSize: 22 }}>Let’s talk</div>
              <div className="muted"><strong></strong><br />Long-term contracts, startups, or complex systems</div>
            </div>
          </div>
        </section>

        <section id="blog" className="reveal">
          <h2>Latest Articles</h2>
          <div className="blog-grid">
            <article className="blog slide-left">
              <h3>Design Systems in 2025</h3>
              <p className="muted">How to build a system that lasts.</p>
            </article>

            <article className="blog slide-right">
              <h3>Accessibility Wins</h3>
              <p className="muted">Small changes with big impact.</p>
            </article>
          </div>
        </section>

        <FAQSectio />

        <section id="contact" className="reveal">
          <h2>Contact</h2>

          <div className="contact">
            <ContactForm />

            <aside className="contact-aside card">
              <h3>Contact Me</h3>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:hello@youremail.com">mphojames9@gmail.com</a>
                </div>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <div>
                  <strong>Phone:</strong> +2774 418 7026
                </div>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <strong>Location:</strong> Pretoria, South Africa
                </div>
              </div>
              <div className="contact-item">
                <FaGlobe className="contact-icon" />
                <div>
                  <strong>Availability:</strong> Worldwide (Remote)
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-inner">

          {/* Brand */}
          <div className="footer-brand">
            <h3>James Matli</h3>
            <p className="muted">
              Software Engineer · Full-Stack · Product Builder
            </p>
          </div>

          {/* Navigation */}
          <nav className="footer-nav">
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </nav>

          {/* Social */}
          <div className="footer-social">
            <a
  href="https://www.linkedin.com/in/mpho-james-413661196"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="LinkedIn"
  className="social-icon"
>
  <svg viewBox="0 0 24 24">
    <path d="M4.98 3.5c0 1.38-1.12 2.5-2.5 2.5S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5zM.5 23.5h4V7.5h-4v16zM8.5 7.5v16h4v-8.6c0-2.1.7-3.5 2.7-3.5 1.9 0 2.3 1.4 2.3 3.5v8.6h4v-9.7c0-4.3-2.1-6.3-5.1-6.3-2.3 0-3.3 1.3-3.9 2.3h-.1V7.5h-4z" />
  </svg>
</a>

<a
  href="https://github.com/mphojames9"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="GitHub"
  className="social-icon"
>
  <svg viewBox="0 0 24 24">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.5-.7 1.7-1 .1-.7.4-1.1.7-1.4-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.4 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.4-1.6 3.4-1.2 3.4-1.2.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.3 0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.65 18.35.5 12 .5z" />
  </svg>
</a>

            <a
              href="https://www.instagram.com/matli.mpho"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-icon"
            >
              <svg viewBox="0 0 24 24">
                <path d="M7.75 2h8.5C19.99 2 22 4.01 22 7.75v8.5C22 19.99 19.99 22 16.25 22h-8.5C4.01 22 2 19.99 2 16.25v-8.5C2 4.01 4.01 2 7.75 2zm0 2C5.68 4 4 5.68 4 7.75v8.5C4 18.32 5.68 20 7.75 20h8.5c2.07 0 3.75-1.68 3.75-3.75v-8.5C20 5.68 18.32 4 16.25 4h-8.5zm4.25 3.5A5.5 5.5 0 1 1 6.5 13 5.51 5.51 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zm5.25-.88a1.12 1.12 0 1 1-1.12-1.12 1.12 1.12 0 0 1 1.12 1.12z" />
              </svg>
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} James Matli</span>
          <span className="muted"></span>
        </div>
      </footer>
    </div>

  );
}
