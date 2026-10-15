# Uphaaram Website

A premium gifting storefront for **Uphaaram — Curating Emotions**. The site presents handcrafted gifts and personalised hampers for festivals, weddings, corporate occasions, and other meaningful celebrations.

## Highlights

- Responsive premium gifting landing page
- Occasion and signature collection showcases
- Interactive custom hamper builder
- Corporate and wedding gifting sections
- WhatsApp enquiry links and contact form
- Mobile navigation and responsive layouts

## Tech stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4

## Getting started

### Requirements

- Node.js 22 or newer
- pnpm 10 or newer

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Vite will print the local development URL in the terminal.

### Production build

```bash
pnpm build
```

The optimized site will be generated in the `dist` directory.

### Preview the production build

```bash
pnpm preview
```

## Project structure

```text
.
├── src/
│   ├── App.tsx        # Main website UI and interactions
│   ├── content.ts     # Category directory and approved FAQs
│   ├── index.css      # Global styles and responsive layout
│   └── main.tsx       # React entry point
├── index.html         # HTML document and metadata
├── package.json       # Scripts and dependencies
└── vite.config.ts     # Vite and Tailwind configuration
```

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Vite development server |
| `pnpm build` | Create a production build |
| `pnpm preview` | Preview the production build locally |
| `pnpm format` | Format the project with oxfmt |

## Repository

Maintained by [Ravikant-1811](https://github.com/Ravikant-1811).

## Content, categories and enquiries

- About Us and the FAQs use the supplied business copy.
- `src/catalog.ts` contains only the 15 products from Uphaaram Diwali Brocher (1).pdf, with prices, contents and local extracted photos.
- `src/content.ts` derives exactly five categories from the brochure’s collection headings: Mini Gift Collection, Basic Hamper Collection, Classic Hamper Collection, Premium Hamper Collection and Traditional Hamper Collection.
- Home, Shop and editorial collection listings share these five categories. Each category opens its three matching products. No Oye Happy categories are included.
- The original header navigation is preserved.
- Product links use `#product/<id>`; category links use `#category/<slug>`.
- Catalog collection filters, the under-₹1,000 filter and price sorting use the same 15 products.
- Product enquiry links prepare a WhatsApp message for +91 97731 37420, including the selected product and optional message card text. The visitor sends it themselves.
- Contact forms prepare an email to uphaaram.gifting@gmail.com using the visitor’s email app. No backend email service is configured.
- `public/assets/brand/uphaaram-logo.png` is the original logo from the supplied brand guidelines. `public/assets/products/` contains extracted brochure photography.
- Traditional product prices are starting prices. Some brochure descriptions conflict with their size headings; names follow the headings and descriptions avoid repeating conflicting dimensions.
