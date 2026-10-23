# Mpho James · Portfolio

A fast, accessible, single-page developer portfolio for a full stack developer. It introduces who I am, what I work with, and the products I've shipped, and it has a working contact form that delivers messages straight to my inbox.

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-20232A?logo=javascript&logoColor=F7DF1E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-20232A?logo=tailwindcss&logoColor=38BDF8)
![Vite](https://img.shields.io/badge/Vite-20232A?logo=vite&logoColor=FFD62E)
![EmailJS](https://img.shields.io/badge/EmailJS-contact_form-1A2672)

**Live site:** https://your-portfolio-url

<!-- Add a screenshot of the finished page and uncomment the line below:
![Portfolio preview](docs/preview.png)
-->

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Customising the content](#customising-the-content)
- [Project screenshots](#project-screenshots)
- [Contact form setup](#contact-form-setup)
- [Theming](#theming)
- [Accessibility](#accessibility)
- [Performance and motion](#performance-and-motion)
- [Browser support](#browser-support)
- [Deployment](#deployment)
- [Author](#author)
- [License](#license)

---

## Overview

The site is one scrolling page with five parts: a hero, an About section, a filterable Skills grid, a Projects Showcase and a Contact section, plus a header, footer and scroll-progress bar. The page is built around two ideas:

1. **Show the work.** Every project card links to the live app and its source code, and the Projects section shows real desktop and mobile screenshots side by side.
2. **Stay out of the way.** The motion is there to add polish, not to block anything. It switches off for visitors who ask for reduced motion, and the cursor effects only run on devices with a precise pointer.

## Features

### Hero
- Headline whose letters swell in weight and shift colour as the cursor moves near them.
- Animated wavy underlines on key phrases.
- Typewriter line that cycles through what I build (React interfaces, Node.js APIs, MongoDB data models, Python automation).
- Magnetic call-to-action buttons that lean toward the cursor.
- Portrait with a soft mask and floating tech icons, plus a "Full stack, end to end" glass card with animated skill bars on large screens.
- Infinite marquee of the tech stack that pauses on hover.

### About
- Statement that fades from faint to full ink word by word as you scroll.
- "How I work" list covering the frontend, backend and database layers, each with its technology icons.

### Skills
- Bento-style grid of eight technologies, each with a short note on how I use it.
- Filter chips (All, Frontend, Backend, Database).
- Tiles with a cursor-following glow.

### Projects Showcase
- Four projects: **RemoPDF**, a **Netflix-inspired app**, a real-time **Chat app** and **Premium Word Search**.
- Desktop: a sticky preview panel that cross-fades between projects as you hover the list. It shows the desktop screenshot with the phone screenshot in a device frame at the bottom left, and the whole panel tilts gently with the mouse.
- Mobile and tablet: each card shows the same desktop-plus-phone composition inline.
- Every card has a live link, a "Source code" link (GitHub) and tech chips.

### Contact
- Form with name, email, project type (Web app, Website, API & database, Something else) and message.
- Inline validation with focus moved to the first invalid field.
- Messages are sent through [EmailJS](https://www.emailjs.com) with no backend to run. If EmailJS is not configured, the form falls back to opening the visitor's email app with the message pre-filled.
- Hidden honeypot field (a "Company" input humans never see) to filter out simple bots.
- One-click "copy email" button, plus phone, email and social links.

### Site-wide
- Responsive navigation with an animated mobile menu.
- Scroll-progress bar and scroll-triggered reveal animations.
- Dark footer with navigation, social links and a back-to-top button.

## Tech stack

| Area | Tools |
| --- | --- |
| UI | React (functional components and hooks) |
| Styling | Tailwind CSS utilities, plus a small inline `<style>` block for design tokens and keyframes |
| Icons | [`react-icons`](https://react-icons.github.io/react-icons/) (Font Awesome and Simple Icons sets) |
| Fonts | Bricolage Grotesque (headings) and Instrument Sans (body), loaded from Google Fonts |
| Forms | EmailJS REST API, called with `fetch` (no SDK needed) |
| Tooling | Vite and npm |

## Project structure

The whole page lives in one component file. Images are imported from `src/assets`.

```text
src/
├── assets/
│   ├── logo.png
│   ├── profile.png
│   ├── remopdf.png               # desktop screenshot
│   ├── remopdfMobile.jpg         # mobile screenshot
│   ├── netflix.png
│   ├── netflixMobile.jpg
│   ├── chatapp.png
│   ├── chatappMobile.jpg
│   ├── wordfunadverture.png
│   └── wordfunadventureMobile.jpg
└── pages/
    └── Home.jsx                  # the entire page
```

`Home.jsx` imports its images with `../assets/...`. If your folders are laid out differently, adjust those import paths.

### Inside `Home.jsx`

| Piece | Responsibility |
| --- | --- |
| `Home` (default export) | Hero, tech marquee, scroll progress, global styles, and the page composition |
| `Header`, `Logo` | Primary and mobile navigation, brand mark |
| `Headline`, `Wavy`, `Magnetic`, `Typewriter`, `FloatIcons` | Hero interactions |
| `About`, `ScrollWords` | Scroll-reveal statement and "How I work" |
| `Skills`, `Tile`, `useInView` | Filterable skills grid |
| `Projects`, `Phone` | Projects list, sticky preview, device frame |
| `Contact`, `Field` | Validated form, EmailJS delivery, copy-to-clipboard |
| `Footer`, `FooterLink` | Footer navigation and socials |

When the file grows, each of these can move into its own file under `src/components/` without any change in behaviour.

## Getting started

### Prerequisites

- A current LTS release of Node.js
- npm (or an equivalent package manager)

### Install and run

```bash
# 1. Clone the repository
git clone https://github.com/mphojames9/your-repo.git
cd your-repo

# 2. Install dependencies (includes react-icons)
npm install

# 3. Start the dev server
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Other scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create an optimised production build in `dist/` |
| `npm run preview` | Serve the production build locally to check it before deploying |

If `react-icons` is missing, install it with `npm install react-icons`.

## Customising the content

All copy and data sit in constants near the top of each section in `Home.jsx`, so most edits don't touch the markup.

| Constant | Controls |
| --- | --- |
| `HEADLINE` | Hero headline |
| `NAV` | Header and mobile menu links (each item maps to a section id: `about`, `skills`, `work`, `contact`) |
| `STACK` | Technologies in the marquee, plus the icon and colour used everywhere else |
| `LAYERS` | The animated bars in the hero glass card |
| `ROLES` | Phrases the typewriter cycles through |
| `ABOUT_TEXT`, `HOW` | About statement and the "How I work" items |
| `SKILLS`, `CATS` | Skills grid tiles and filter chips |
| `PROJECTS` | Projects Showcase entries |
| `TYPES` | Project-type options in the contact form |
| `CONTACT_EMAIL`, `DETAILS`, `SOCIALS` | Contact details and social links (also reused in the footer) |

### Add a project

1. Add a desktop and a mobile screenshot to `src/assets` (see [Project screenshots](#project-screenshots)).
2. Import both at the top of `Home.jsx`:

   ```jsx
   import myAppShot from "../assets/myapp.png";
   import myAppMobile from "../assets/myappMobile.jpg";
   ```

3. Add an entry to `PROJECTS`:

   ```jsx
   {
     title: "My App",
     kind: "Web app",                      // short label shown on the preview chip
     body: "One or two sentences about what it does.",
     tech: ["React", "Node.js"],           // names must exist in STACK
     image: myAppShot,
     mobile: myAppMobile,
     href: "https://my-app.example.com",   // live site
     repo: "https://github.com/you/my-app" // optional: shows a "Source code" button
   },
   ```

> **Important:** every name in a `tech` array must match a `name` in `STACK`, because icons and colours are looked up by name. An unknown name will break the section.

### Add a technology

1. Import its icon from `react-icons` (for example `import { SiTypescript } from "react-icons/si";`).
2. Add `{ name: "TypeScript", Icon: SiTypescript, color: "#3178C6" }` to `STACK`.
3. Reference it in `SKILLS`, `HOW` or `PROJECTS` by the same name.

## Project screenshots

Each project uses two images: a desktop screenshot and a mobile screenshot.

| | Desktop | Mobile |
| --- | --- | --- |
| Suggested size | 1366 × 768 (16:9) | 720 × 1600 (9:20) |
| Format | PNG or WebP | JPG or WebP |
| Shown as | Cropped to 3:2 in the sticky preview and 16:10 on small screens | Inside a phone frame, aligned to the top |
| Position | Fills the preview card | Overlaps the bottom-left corner of the card |

Tips for clean results:

- **Keep important content away from the edges** of the desktop shot. It is cropped slightly, and the title chip covers the bottom-right corner of the desktop preview.
- **Capture without OS clutter.** Hide system watermarks, notification badges and, if you can, the phone status bar before you take the screenshot.
- **Export real image files.** A file that is renamed to `.png` but is really a BMP can be 3 MB or more and can fail in some tools. Export from your screenshot tool or an image editor, or compress with [Squoosh](https://squoosh.app).
- **Keep files small.** Aim for well under 1 MB per screenshot. Images are lazy-loaded, but smaller files still help the first visit.

## Contact form setup

The form sends mail through EmailJS, directly from the browser.

1. Create an [EmailJS](https://www.emailjs.com) account and connect an email service.
2. Create an email template that uses these variables:

   | Variable | Content |
   | --- | --- |
   | `{{from_name}}` | Visitor's name |
   | `{{reply_to}}` | Visitor's email address |
   | `{{subject}}` | `[Portfolio] <project type>: message from <name>` |
   | `{{message}}` | The message, followed by the visitor's name, email and project type |

3. Put your **service ID**, **template ID** and **public key** into the three constants in the Contact section of `Home.jsx`:

   ```jsx
   const EMAILJS_SERVICE_ID = "service_xxxxxxx";
   const EMAILJS_TEMPLATE_ID = "template_xxxxxxx";
   const EMAILJS_PUBLIC_KEY = "xxxxxxxxxxxxxxxxx";
   ```

4. Run the site, send yourself a test message and check your inbox.

**How it behaves**

- If all three values are set, the form posts to the EmailJS API and shows a "Message sent" confirmation.
- If any value is empty, the form opens the visitor's email app with the message pre-filled, and shows "Message ready" instead.
- If sending fails, the visitor sees an error and a direct email address to use instead.
- Validation requires a name, a well-formed email address and a message of at least 10 characters.

**A note on keys.** The EmailJS service ID, template ID and public key are designed to be used in the browser, so they are not secrets. Because anyone can read them, review the security and rate-limit options in your EmailJS dashboard if you start to receive spam.

## Theming

Colours and fonts are defined once, in the `<style>` block inside `Home`:

```css
:root {
  --paper:  #EDF0F7;  /* page background */
  --ink:    #0E1633;  /* primary text and dark surfaces */
  --muted:  #4A5575;  /* secondary text */
  --cobalt: #1A2672;  /* accent, focus rings, underlines */
  --line:   #C9D0E3;  /* borders and dividers */
}
```

- Change these five values to re-colour the whole site. A few gradients and glows use the same hex values directly, so search for `#1A2672` and `#26379F` if you want a complete re-skin.
- Headings use the `font-display` class (Bricolage Grotesque) and body text uses `font-body` (Instrument Sans). Swap the Google Fonts `@import` and these two classes to change typography.
- Tailwind needs to scan `Home.jsx` for its utility classes. That works out of the box if `src/**/*.{js,jsx}` is in your Tailwind content configuration.

## Accessibility

- Sections are labelled with `aria-labelledby`, and the navigation regions have distinct labels (Primary, Mobile, Footer).
- Interactive elements have visible `focus-visible` outlines, and buttons and chips keep a minimum tap target of 44 px.
- Decorative visuals (floating icons, glows, device frames, the repeated marquee items) are hidden from assistive technology. Icon-only links and buttons have text alternatives.
- The animated headline and typewriter line expose their full text to screen readers.
- Form fields have visible labels and error messages, and focus moves to the first invalid field on submit.
- All animation and smooth scrolling are disabled when the visitor prefers reduced motion.

## Performance and motion

- Project images use `loading="lazy"` and `decoding="async"`.
- Pointer-driven effects (headline weight, magnetic buttons, preview tilt) only run for a mouse or other fine pointer, and the work is batched with `requestAnimationFrame`.
- Scroll reveals use `IntersectionObserver`, and content is shown immediately where it isn't available.
- There is no runtime dependency for the contact form beyond the browser's `fetch`.

## Browser support

The latest two versions of Chrome, Edge, Firefox and Safari. The page relies on `color-mix()`, `svh` viewport units, `backdrop-filter` and CSS masks, which are available in browsers released from 2023 onwards.

## Deployment

The production build is a static site (`npm run build` produces `dist/`), so it can be hosted anywhere.

- **Vercel or Netlify:** import the repository, set the build command to `npm run build` and the output directory to `dist`.
- **GitHub Pages:** set `base: "/your-repo/"` in `vite.config.js`, build, and publish the `dist` folder.

Remember to update the **Live site** link at the top of this README once it is deployed.

## Author

**Mpho James**, full stack developer (React, Node.js, MongoDB, Python).

- GitHub: [@mphojames9](https://github.com/mphojames9)
- LinkedIn: [Mpho Matli](https://www.linkedin.com/in/mpho-matli-413661196/)
- Email: [mphojames9@gmail.com](mailto:mphojames9@gmail.com)

The fastest way to reach me is the contact form on the site.

## License

© 2026 Mpho James. All rights reserved.

The source code is published so you can see how the site is built. Please don't republish the content, photographs, logo or branding as your own.
