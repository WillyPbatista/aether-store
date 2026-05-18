# ÆTHER Store

A navigable e-commerce mock built with **Vue 3 + Vite + Tailwind CSS**, featuring a Dark Luxury Glassmorphism aesthetic. Designed as an inspiration prototype — fully functional, no backend required.

![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38BDF8?style=flat-square&logo=tailwindcss)
![Pinia](https://img.shields.io/badge/Pinia-2.x-F7D336?style=flat-square&logo=pinia)

---

## Overview

ÆTHER Store is a frontend-only e-commerce prototype showcasing modern UI/UX patterns for a premium product store. It demonstrates component architecture, client-side routing, global state management, and a polished glassmorphism design system — all without a backend.

---

## Features

- **4 fully navigable pages** — Home, Catalog, Product Detail, Cart
- **Global cart state** via Pinia — persists across navigation, updates badge count in real time
- **Catalog filters** — search, category, badge type, and max price range
- **URL-synced filters** — shareable links like `/catalog?category=Gaming`
- **Toast notification system** — triggered from any component via a dedicated Pinia store
- **Lazy-loaded routes** — Catalog, Product, and Cart load on demand
- **Dark Luxury Glassmorphism** design system with ambient gradients, `backdrop-filter` glass layers, and gradient typography

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API + `<script setup>`) |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 4 (Vite plugin) |
| State management | Pinia 2 |
| Routing | Vue Router 4 |
| Fonts | Syne (display) + DM Sans (body) via Google Fonts |

---

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── Navbar.vue          # Sticky glass navbar with live cart count
│   └── ui/
│       ├── ProductCard.vue     # Reusable card with wishlist + add to cart
│       └── Toast.vue           # Global toast notification
├── data/
│   └── products.js             # 12 mock products + category definitions
├── router/
│   └── index.js                # Routes with lazy loading + scroll behavior
├── stores/
│   ├── cart.js                 # Cart state: items, totals, add/remove/update
│   └── toast.js                # Toast state: message, visibility, auto-hide
├── views/
│   ├── HomeView.vue            # Hero, stats, categories, featured products
│   ├── CatalogView.vue         # Filterable, searchable, sortable product grid
│   ├── ProductView.vue         # Detail page: color/size/qty selectors
│   └── CartView.vue            # Cart items, promo code, order summary
├── App.vue                     # Shell: ambient background + global CSS classes
├── main.js                     # App entry: Pinia + Router registration
└── style.css                   # Tailwind import
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/aether-store.git
cd aether-store

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| Background | `#07070f` | Page base |
| Surface | `rgba(255,255,255,0.04)` | Glass cards |
| Border | `rgba(255,255,255,0.10)` | Glass borders |
| Violet | `#7c3aed` | Primary accent |
| Violet light | `#a78bfa` | Text accents, links |
| Cyan | `#06b6d4` | Secondary accent |
| Cyan light | `#67e8f9` | Highlights |
| Text | `#f1f0f7` | Primary text |
| Text muted | `rgba(241,240,247,0.55)` | Secondary text |

### Global CSS Classes

Three utility classes are defined globally in `App.vue` and available across all components:

```css
.glass          /* translucent glass surface */
.glass-hover    /* hover state for glass elements */
.gradient-text  /* violet → cyan gradient text */
```

---

## Pages

### `/` — Home
Hero section with animated badge, CTA buttons, trust tags, stats bar, category grid linking to filtered catalog, and featured products.

### `/catalog` — Catalog
Sidebar with category, price, and badge filters. Top bar with live search and sort. Active filters shown as removable chips. URL query params stay in sync with selected filters. Empty state with clear-filters action.

### `/product/:id` — Product Detail
Full product detail with thumbnail gallery, color picker, size selector (Moda category only), quantity control, and add-to-cart. Handles unknown IDs gracefully.

### `/cart` — Cart
Line items with quantity controls and remove. Order summary with promo code input (code: anything → 10% OFF), shipping threshold ($50 for free shipping), tax calculation, and checkout CTA.

---

## Extending This Project

This mock is structured to connect to a real backend with minimal changes:

- **Products data** lives in `src/data/products.js` — replace with an API call in a composable
- **Cart store** (`src/stores/cart.js`) — add `localStorage` persistence or sync to a backend cart
- **Checkout button** in `CartView.vue` — wire up to Stripe, MercadoPago, or any payment provider
- **Auth** — add a `user.js` Pinia store and guard routes with `router.beforeEach`

---

## License

MIT — free to use as inspiration, reference, or starting point for client projects.
