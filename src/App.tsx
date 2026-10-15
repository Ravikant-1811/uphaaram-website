import { useEffect, useMemo, useState } from "react";
import { giftCategories, categoryHref, faqs } from "./content";
import { products, productHref, formatPrice, collectionNames, type Product } from "./catalog";

const photos = {
  hero: "/assets/products/premium-10x10.webp",
  festive: "/assets/products/classic-12x12.webp",
  wedding: "/assets/products/mini-3-jar.webp",
  corporate: "/assets/products/premium-12x12.webp",
  craft: "/assets/products/basic-12x12.webp",
  chocolate: "/assets/products/premium-8x8.webp",
  chocolateDark: "/assets/products/classic-10x10.webp",
  gold: "/assets/products/god-figure-toran.webp",
  gift: "/assets/products/mini-2-jar.webp",
  jewel: "/assets/products/mini-4-cavity.webp",
};
const collections = [products[0], products[4], products[7], products[10]];

const occasionCards = [
  { title: "Festive Gifting", text: "Tradition, beautifully reimagined", image: photos.festive, route: "festive" },
  { title: "Wedding & Occasions", text: "Keepsakes for your grandest moments", image: photos.wedding, route: "wedding" },
  { title: "Corporate Gifts", text: "Thoughtful gestures, professionally presented", image: photos.corporate, route: "corporate" },
  { title: "Personalised Hampers", text: "Curated around their story", image: photos.gift, route: "custom" },
];

type IconName = "arrow" | "search" | "heart" | "menu" | "close" | "whatsapp" | "sparkle" | "gift" | "hand" | "lotus";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    whatsapp: <><path d="M20.5 11.8a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.3-4.6A8.5 8.5 0 1 1 20.5 11.8Z" /><path d="M8.4 7.8c.3-.6.6-.6.9-.6h.6l.8 2c.1.3 0 .5-.2.7l-.6.7c-.2.2-.1.4 0 .6.5 1 1.3 1.8 2.3 2.3.2.1.4.2.6 0l.8-1c.2-.2.4-.3.7-.2l1.9.9c.3.1.5.3.5.5 0 .4-.2 1.5-1 2.1-.6.5-1.4.8-2.4.5-1-.3-2.4-.8-4.1-2.3-1.4-1.3-2.4-2.9-2.6-3.9-.3-1.1 0-1.8.3-2.2.5-.5 1-.5 1.5-.1Z" /></>,
    sparkle: <><path d="M12 2c.5 5.2 3 7.5 8 8-5 .5-7.5 2.8-8 8-.5-5.2-3-7.5-8-8 5-.5 7.5-2.8 8-8Z" /><path d="M19 16c.2 2.1 1.2 3.1 3 3.3-1.8.2-2.8 1.2-3 3.2-.2-2-1.2-3-3-3.2 1.8-.2 2.8-1.2 3-3.3Z" /></>,
    gift: <><rect x="3" y="9" width="18" height="12" rx="1" /><path d="M12 9v12M3 13h18M12 9H7.5a2.5 2.5 0 1 1 2.2-3.7L12 9Zm0 0h4.5a2.5 2.5 0 1 0-2.2-3.7L12 9Z" /></>,
    hand: <><path d="M5 12V7a1.5 1.5 0 0 1 3 0v4-6a1.5 1.5 0 0 1 3 0v6-5a1.5 1.5 0 0 1 3 0v5-3a1.5 1.5 0 0 1 3 0v6c0 4-2.5 7-6.5 7S5 18 4 16l-1-2c-.5-1 .4-2 1.4-1.5L7 14" /></>,
    lotus: <><path d="M12 19c-4-2.5-6-6-6-10 3 1 5 3 6 6 1-3 3-5 6-6 0 4-2 7.5-6 10Z" /><path d="M12 15c-2-3-2-7 0-11 2 4 2 8 0 11ZM4 13c-1 0-2 .2-3 .7 2.2 4.5 6 6.5 11 5.3M20 13c1 0 2 .2 3 .7-2.2 4.5-6 6.5-11 5.3" /></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Logo({ light = false }: { light?: boolean }) {
  return <a href="#home" className={`logo ${light ? "logo-light" : ""}`} aria-label="Uphaaram home"><img className="brand-logo" src="/assets/brand/uphaaram-logo.png" alt="Uphaaram — Curating Emotions" /></a>;
}

function ButtonLink({ href, children, secondary = false, light = false, className = "" }: { href: string; children: React.ReactNode; secondary?: boolean; light?: boolean; className?: string }) {
  return <a href={href} className={`btn ${secondary ? "btn-secondary" : "btn-primary"} ${light ? "btn-light" : ""} ${className}`}>{children}<Icon name="arrow" size={17} /></a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), []);
  const nav = [["Shop", "shop"], ["Festive", "festive"], ["Wedding", "wedding"], ["Corporate", "corporate"]];
  return <>
    <div className="announcement"><span>Handcrafted Gifts</span><i /> <span>Customisation Available</span><em>Curated with love for every celebration</em></div>
    <header className="header">
      <nav className="nav-wrap" aria-label="Main navigation">
        <div className="nav-left">{nav.map(([label, route]) => <a key={route} href={`#${route}`}>{label}</a>)}</div>
        <Logo />
        <div className="nav-right"><a href="#custom">Custom Gifting</a><a href="#about">About</a><a className="icon-link" href="#search" aria-label="Search"><Icon name="search" /></a><a className="icon-link" href="#wishlist" aria-label="Saved gifts"><Icon name="heart" /></a><a className="enquire-link" href="https://wa.me/919773137420" target="_blank" rel="noreferrer"><Icon name="whatsapp" size={18} /> Enquire</a></div>
        <div className="mobile-actions"><a href="#search" aria-label="Search"><Icon name="search" /></a><a href="https://wa.me/919773137420" aria-label="WhatsApp"><Icon name="whatsapp" /></a><button onClick={() => setOpen(true)} aria-label="Open menu"><Icon name="menu" size={24} /></button></div>
      </nav>
    </header>
    <div className={`mobile-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
      <button className="drawer-close" onClick={() => setOpen(false)} aria-label="Close menu"><Icon name="close" size={26} /></button>
      <Logo />
      <div className="drawer-links">{[...nav, ["Custom Gifting", "custom"], ["About Uphaaram", "about"], ["Contact", "contact"], ["FAQs", "faq"]].map(([label, route], i) => <a href={`#${route}`} onClick={() => setOpen(false)} key={route}><span>0{i + 1}</span>{label}<Icon name="arrow" /></a>)}</div>
      <p>Need something made especially for you?</p>
      <a className="drawer-whatsapp" href="https://wa.me/919773137420"><Icon name="whatsapp" /> Chat on WhatsApp</a>
    </div>
  </>;
}

function SectionHeading({ eyebrow, title, text, align = "center", light = false }: { eyebrow?: string; title: React.ReactNode; text?: string; align?: "center" | "left"; light?: boolean }) {
  return <div className={`section-heading ${align === "left" ? "align-left" : ""} ${light ? "light" : ""}`}>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2>{text && <p className="section-copy">{text}</p>}
  </div>;
}

function ProductCard({ product }: { product: Product; index?: number }) {
  return <article className="product-card">
    <a href={productHref(product.id)} className="product-image">
      <img src={product.image} alt={product.name} loading="lazy" />
      <span className="custom-badge">CUSTOMISABLE</span><span className="quick-view">VIEW GIFT</span>
    </a>
    <div className="product-info"><p>{product.collection}</p><a href={productHref(product.id)}><h3>{product.name}</h3></a><div><span>{product.starting ? "From " : ""}{formatPrice(product.price)}</span><a href={productHref(product.id)} aria-label={`View ${product.name}`}><Icon name="arrow" size={18} /></a></div></div>
  </article>;
}

function Hero() {
  return <section className="hero">
    <div className="hero-pattern pattern-one" /><div className="hero-pattern pattern-two" />
    <div className="hero-content">
      <div className="hero-copy">
        <p className="eyebrow">UPHAARAM <i /> CURATING EMOTIONS</p>
        <h1>More than gifts,<br /><em>emotions</em> beautifully curated.</h1>
        <p>Thoughtfully handcrafted gifts designed to celebrate relationships, traditions and life's most meaningful moments.</p>
        <div className="hero-actions"><ButtonLink href="#shop">Explore Collections</ButtonLink><ButtonLink href="#custom" secondary>Customise a Gift</ButtonLink></div>
        <div className="hero-note"><Icon name="sparkle" size={17} /><span>Handcrafted in India</span><i /><span>Personalised for you</span></div>
      </div>
      <div className="hero-visual">
        <div className="gold-arch" />
        <div className="hero-image"><img src={photos.hero} alt="Uphaaram Premium 10 × 10 Hamper" /></div>
        <div className="floating-card"><span>THE ART OF GIFTING</span><p>Made with intention.<br />Remembered with love.</p></div>
        <div className="image-count"><span>01</span><i /><span>04</span></div>
      </div>
    </div>
    <a href="#occasions" className="scroll-cue"><span>SCROLL TO DISCOVER</span><i /></a>
  </section>;
}

function Occasions() {
  return <section className="section occasions" id="occasions">
    <SectionHeading eyebrow="CURATED FOR EVERY CELEBRATION" title={<>Gifts for moments <em>that matter</em></>} />
    <div className="occasion-grid">{occasionCards.map((card, i) => <a href={`#${card.route}`} className="occasion-card" key={card.title}>
      <img src={card.image} alt={card.title} /><div className="occasion-overlay"><span>0{i + 1}</span><div><h3>{card.title}</h3><p>{card.text}</p></div><i className="round-arrow"><Icon name="arrow" /></i></div>
    </a>)}</div>
  </section>;
}

function SignatureCollections() {
  return <section className="section signature" id="signature">
    <div className="heading-row"><SectionHeading eyebrow="BEAUTIFULLY PRESENTED" title={<>Our Signature <em>Collections</em></>} text="Thoughtfully assembled for life's beautiful occasions." align="left" /><ButtonLink href="#shop" secondary>View All Gifts</ButtonLink></div>
    <div className="product-grid">{collections.map((product, i) => <ProductCard product={product} index={i} key={product.name} />)}</div>
  </section>;
}

function Story() {
  return <section className="story section">
    <div className="story-images"><div className="story-main"><img src={photos.craft} alt="Uphaaram Basic 12 × 12 Hamper" /></div><div className="story-detail"><img src={photos.chocolate} alt="Premium hamper with dry fruits and handmade chocolates" /></div><span className="story-seal"><Icon name="lotus" size={28} />THOUGHTFULLY<br />CURATED</span></div>
    <div className="story-copy"><p className="eyebrow">THE UPHAARAM STORY</p><h2>Gifting is more than<br /><em>what's inside the box.</em></h2><p>At Uphaaram, every detail is thoughtfully chosen, beautifully arranged and personalised to turn gifting into an emotion worth remembering.</p><p>Rooted in Indian traditions and shaped by a contemporary eye, each hamper tells a story of care, craft and celebration.</p><ButtonLink href="#about" secondary>Our Story</ButtonLink><div className="signature-mark">Uphaaram <i /></div></div>
  </section>;
}

function Personalisation() {
  const steps = [["01", "Choose your hamper", "Begin with a style that feels just right."], ["02", "Select your favourites", "From artisanal treats to festive accents."], ["03", "Personalise the details", "Names, notes and packaging, made theirs."]];
  return <section className="personalise navy-section">
    <div className="personalise-art"><img src={photos.chocolateDark} alt="Classic hamper with makhana, dry fruits and a matka candle" /><div className="orbit orbit-one" /><div className="orbit orbit-two" /></div>
    <div className="personalise-content"><SectionHeading eyebrow="CURATED FOR YOU" title={<>Make it truly <em>theirs.</em></>} text="Every story is different. Your gift should be too." align="left" light />
      <div className="steps">{steps.map(([n, title, text]) => <div className="step" key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
      <div className="personalise-actions"><ButtonLink href="#custom" light>Start Customising</ButtonLink><a href="https://wa.me/919773137420" className="text-link"><Icon name="whatsapp" size={18} /> Enquire on WhatsApp</a></div>
    </div>
  </section>;
}

const hamperOptions = [
  { category: "Makhana", items: ["Salt & Pepper", "Tomato", "Cream & Onion", "Peri-Peri"] },
  { category: "Chocolate", items: ["Raisin Chocolate", "Cashew Crunch", "Almond Crunch", "Chocolate Biscuit"] },
  { category: "Dry Fruits", items: ["Roasted Salted Cashews", "Roasted Salted Almonds"] },
  { category: "Candles", items: ["Motichoor Ladoo", "Modak", "Daisy"] },
];

function HamperBuilder() {
  const [category, setCategory] = useState(0);
  const [selected, setSelected] = useState<string[]>(["Salt & Pepper"]);
  const toggle = (item: string) => setSelected(s => s.includes(item) ? s.filter(x => x !== item) : [...s, item]);
  return <section className="section builder">
    <SectionHeading eyebrow="A GIFT, UNIQUELY YOURS" title={<>Curate your perfect <em>hamper</em></>} text="Choose every detail. We'll bring it together beautifully." />
    <div className="builder-shell">
      <div className="builder-progress">{["Select Occasion", "Choose Hamper", "Pick Products", "Personalise", "Send Enquiry"].map((s, i) => <button key={s} className={i === 2 ? "active" : i < 2 ? "done" : ""}><span>{i < 2 ? "✓" : i + 1}</span>{s}</button>)}</div>
      <div className="builder-body">
        <div className="builder-visual"><img src={photos.hero} alt="Your curated premium hamper" /><div className="selected-count">{selected.length}<span>items<br />selected</span></div></div>
        <div className="builder-options"><p className="eyebrow">STEP 3 · PICK YOUR PRODUCTS</p><h3>What would you like to add?</h3>
          <div className="category-tabs">{hamperOptions.map((o, i) => <button className={category === i ? "active" : ""} onClick={() => setCategory(i)} key={o.category}>{o.category}</button>)}</div>
          <div className="option-list">{hamperOptions[category].items.map(item => <button className={selected.includes(item) ? "selected" : ""} onClick={() => toggle(item)} key={item}><span>{selected.includes(item) ? "✓" : "+"}</span>{item}</button>)}</div>
          <div className="hamper-total"><div><p>YOUR CURATED HAMPER</p><strong>Price on enquiry</strong><span>Final price after confirmation</span></div><ButtonLink href="#contact">Continue</ButtonLink></div>
        </div>
      </div>
    </div>
  </section>;
}

function FestiveSection() {
  return <section className="section festive-section">
    <div className="festive-copy"><p className="eyebrow red">ROOTED IN TRADITION</p><h2>Celebrate traditions,<br /><em>beautifully.</em></h2><p>From the glow of diyas to the joy of sharing, discover gifts inspired by the rituals that bring us together.</p><ButtonLink href="#festive" secondary>Explore Festive Gifts</ButtonLink><div className="festive-list">{["Toran", "Shubh Labh", "Candles", "Traditional Gifts"].map((x, i) => <a href="#festive" key={x}><span>0{i + 1}</span>{x}<Icon name="arrow" /></a>)}</div></div>
    <a href="#festive" className="festive-image"><img src={photos.festive} alt="Traditional festive gift in gold and red" /><span>SHUBH<br />LABH</span></a>
  </section>;
}

function Corporate() {
  return <section className="corporate navy-section">
    <div className="corporate-copy"><p className="eyebrow">CORPORATE GIFTING</p><h2>Thoughtful gifting,<br /><em>beautifully representing</em><br />your brand.</h2><p>Create memorable gifting experiences for clients, teams and business celebrations with customised hampers crafted around your brand and occasion.</p><div className="feature-list">{["Custom branding", "Bulk gifting", "Personalised packaging", "Multi-location delivery"].map(x => <span key={x}><i>✓</i>{x}</span>)}</div><ButtonLink href="#corporate" light>Plan Corporate Gifting</ButtonLink></div>
    <div className="corporate-image"><img src={photos.corporate} alt="Sophisticated corporate hamper" /><div className="brand-card"><Logo /><p>YOUR BRAND,<br />BEAUTIFULLY GIFTED.</p></div></div>
  </section>;
}

function Wedding() {
  return <section className="wedding section">
    <div className="wedding-image"><img src={photos.wedding} alt="Uphaaram three-jar gift hamper" /><div className="arch-frame" /></div>
    <div className="wedding-copy"><p className="eyebrow">WEDDING & OCCASION GIFTING</p><h2>For celebrations<br /><em>that become memories.</em></h2><p>From the first welcome to the final farewell, make every gesture feel as special as the occasion itself.</p><div className="occasion-tags">{["Wedding Favours", "Welcome Hampers", "Bridal Party", "Family Gifts", "Return Gifts"].map(x => <span key={x}>{x}</span>)}</div><ButtonLink href="#wedding" secondary>Explore Wedding Gifting</ButtonLink></div>
  </section>;
}

function WhyUs() {
  const reasons: [IconName, string, string][] = [["sparkle", "Thoughtfully Curated", "Every item selected with care."], ["hand", "Beautifully Handcrafted", "Craftsmanship in every detail."], ["gift", "Personalised for You", "Designed around your occasion."], ["lotus", "Made for Celebrations", "Rooted in Indian traditions."]];
  return <section className="section why"><SectionHeading eyebrow="OUR PROMISE" title={<>The Uphaaram <em>Touch</em></>} /><div className="reason-grid">{reasons.map(([icon, title, text]) => <div className="reason" key={title}><div><Icon name={icon} size={34} /></div><h3>{title}</h3><p>{text}</p></div>)}</div></section>;
}

function Instagram() {
  const images = [photos.chocolate, photos.gold, photos.gift, photos.festive, photos.jewel];
  return <section className="instagram section"><div className="heading-row"><SectionHeading eyebrow="@UPHAARAM.GIFTING" title={<>Follow our <em>gifting stories</em></>} align="left" /><ButtonLink href="https://instagram.com/uphaaram.gifting" secondary>Follow on Instagram</ButtonLink></div><div className="insta-grid">{images.map((image, i) => <a href="https://instagram.com/uphaaram.gifting" key={image}><img src={image} alt={`Uphaaram gifting story ${i + 1}`} /><span>↗</span></a>)}</div></section>;
}

function WhatsAppCta() {
  return <section className="whatsapp-cta"><div className="cta-ornament"><Icon name="lotus" size={34} /></div><p className="eyebrow">PERSONALISED GIFTING</p><h2>Looking for something<br /><em>made especially for you?</em></h2><p>Tell us the occasion, budget and your idea.<br />We'll help curate something beautiful.</p><div><a className="btn btn-gold" href="https://wa.me/919773137420"><Icon name="whatsapp" /> Chat on WhatsApp</a><ButtonLink href="#contact" secondary light>Send an Enquiry</ButtonLink></div></section>;
}

function Home() {
  return <><Hero /><ShopCategories /><SignatureCollections /><Story /><Personalisation /><HamperBuilder /><FestiveSection /><Corporate /><Wedding /><WhyUs /><section className="section bestsellers"><div className="heading-row"><SectionHeading eyebrow="THE UPHAARAM EDIT" title={<>Gifts worth <em>remembering</em></>} align="left" /><ButtonLink href="#shop" secondary>Explore Gifts</ButtonLink></div><div className="product-grid">{[...collections].reverse().map(p => <ProductCard product={p} key={p.name} />)}</div></section><Instagram /><WhatsAppCta /></>;
}

type LandingData = {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  sectionEyebrow: string;
  sectionTitle: string;
  sectionCopy: string;
  categories: { title: string; text: string; image: string }[];
  features: string[];
  seoTitle: string;
  seoCopy: string;
};

const pageData: Record<"festive" | "wedding" | "corporate" | "custom", LandingData> = {
  festive: {
    eyebrow: "FESTIVE GIFTING",
    title: "Traditions, beautifully gifted.",
    intro: "Celebrate Diwali and every auspicious beginning with handcrafted hampers, luminous candles and traditional accents.",
    image: photos.festive,
    sectionEyebrow: "THE FESTIVE EDIT",
    sectionTitle: "A little light, a lot of joy.",
    sectionCopy: "Modern keepsakes rooted in the colours, rituals and warmth of Indian celebrations.",
    categories: giftCategories.map(category => ({ title: category.name, text: category.description, image: category.image })),
    features: ["Festive-ready packaging", "Personalised message cards", "Pan-India delivery", "Bulk celebration orders"],
    seoTitle: "Festive gifting that feels personal",
    seoCopy: "Explore premium Diwali hampers, traditional gifting, candles, torans and personalised festive gifts. Every Uphaaram festive gift is assembled by hand and can be curated around your recipient, budget and celebration.",
  },
  wedding: {
    eyebrow: "WEDDING & OCCASIONS",
    title: "Celebrate love, beautifully wrapped.",
    intro: "Meaningful wedding favours, welcome hampers and keepsakes curated for celebrations that become memories.",
    image: photos.wedding,
    sectionEyebrow: "FOR EVERY CHAPTER",
    sectionTitle: "From the first welcome to the final farewell.",
    sectionCopy: "Thoughtful gifts designed to feel at home in your celebration and cherished long after it.",
    categories: giftCategories.map(category => ({ title: category.name, text: category.description, image: category.image })),
    features: ["Names and monograms", "Theme-matched packaging", "Welcome note personalisation", "Venue and multi-address delivery"],
    seoTitle: "Wedding gifts, made part of your story",
    seoCopy: "Curate wedding favours, bridal hampers, welcome gifts, return gifts and personalised family gifting with Uphaaram. We work around your palette, event style, quantity and budget to create a cohesive gifting experience.",
  },
  corporate: {
    eyebrow: "CORPORATE GIFTING",
    title: "Corporate gifting, with a personal touch.",
    intro: "Elevated, brand-aligned gifting for your employees, clients, partners, events and milestone moments.",
    image: photos.corporate,
    sectionEyebrow: "GIFT WITH INTENTION",
    sectionTitle: "Beautifully representing your brand.",
    sectionCopy: "From intimate leadership gestures to large festive programmes, every detail is managed with care.",
    categories: giftCategories.map(category => ({ title: category.name, text: category.description, image: category.image })),
    features: ["Custom branded packaging", "Bulk ordering support", "Personal notes", "Multi-location delivery"],
    seoTitle: "Corporate gifts that leave a lasting impression",
    seoCopy: "Uphaaram creates premium corporate hampers for employees, clients, partners, events and festivals. Choose budget-based curation, branded sleeves, personalised notes and dependable multi-location fulfilment.",
  },
  custom: {
    eyebrow: "CUSTOM GIFTING",
    title: "Made for them. Curated by you.",
    intro: "From flavour and finish to the smallest personalised detail, create a gift that could only be theirs.",
    image: photos.gift,
    sectionEyebrow: "THE POSSIBILITIES",
    sectionTitle: "Every detail, considered.",
    sectionCopy: "Choose what goes in, how it looks and the feeling it leaves behind.",
    categories: giftCategories.map(category => ({ title: category.name, text: category.description, image: category.image })),
    features: ["Flexible budgets", "Choice of products", "Personalised packaging", "One-to-one curation"],
    seoTitle: "Personalised hampers, curated around you",
    seoCopy: "Build a custom gift hamper with your choice of packaging, dry fruits, chocolates, makhana, candles, decor and message cards. Tell us your occasion and budget, and our team will curate the details beautifully.",
  },
};

const processSteps = [
  ["Tell us the occasion", "Share your date, quantity and budget."],
  ["Choose your style", "Explore a visual direction that feels right."],
  ["Select your favourites", "Pick from our handcrafted selection."],
  ["Personalise the details", "Add names, notes and thoughtful touches."],
  ["We curate it beautifully", "We finish, pack and deliver with care."],
];

function Form({ corporate = false, category = "" }: { corporate?: boolean; category?: string }) {
  const [prepared, setPrepared] = useState(false);
  return <form className="enquiry-form" onSubmit={event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = Array.from(data.entries()).map(([key, value]) => `${key}: ${value}`).join("\n");
    window.location.href = `mailto:uphaaram.gifting@gmail.com?subject=${encodeURIComponent(`Gifting enquiry${category ? ` — ${category}` : ""}`)}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }}>
    <div><label>Name<input name="Name" placeholder="Your full name" required autoComplete="name" /></label><label>Phone<input name="Phone" placeholder="+91" type="tel" autoComplete="tel" /></label></div>
    <div><label>Email<input name="Email" placeholder="you@email.com" type="email" required autoComplete="email" /></label><label>{corporate ? "Company" : "Occasion / category"}<input name={corporate ? "Company" : "Occasion / category"} defaultValue={category} placeholder={corporate ? "Company name" : "e.g. Wedding, Diwali"} /></label></div>
    <div><label>Budget<select name="Budget" defaultValue=""><option value="" disabled>Select a range</option><option>Under ₹1,000</option><option>₹1,000 – ₹2,500</option><option>₹2,500 – ₹5,000</option><option>Above ₹5,000</option></select></label><label>Quantity<input name="Quantity" placeholder="Number of gifts" type="number" min="1" /></label></div>
    <div><label>Delivery City<input name="Delivery City" placeholder="City" /></label><label>Required Date<input name="Required Date" type="date" /></label></div>
    <label>Tell us what you have in mind<textarea name="Message" rows={4} required placeholder="Share the occasion, style and any personalisation you would love..." /></label>
    <p className="form-note">This opens your email app with your enquiry. Send the email there to get in touch.</p>
    <button className="btn btn-primary" type="submit">Prepare Email Enquiry<Icon name="arrow" /></button>
    {prepared && <p role="status" className="form-note">Please send the prepared draft in your email app. If it did not open, email <a href="mailto:uphaaram.gifting@gmail.com">uphaaram.gifting@gmail.com</a> or <a href="https://wa.me/919773137420">message us on WhatsApp</a>.</p>}
  </form>;
}

function ShopCategories() {
  return <section className="section category-directory" id="categories">
    <SectionHeading eyebrow="THE DIWALI COLLECTION" title={<>Shop by <em>Category</em></>} text="Explore our Mini, Basic, Classic, Premium and Traditional collections." />
    <div className="pdf-category-grid">{giftCategories.map((category, index) => <a className="pdf-category-card" href={categoryHref(category.slug)} key={category.slug}><div className="pdf-category-image"><img src={category.image} alt={category.name} loading="lazy" /></div><div className="pdf-category-copy"><span className="eyebrow">{String(index + 1).padStart(2, "0")}</span><h3>{category.name}</h3><p>{category.description}</p><span className="category-explore">Explore collection <Icon name="arrow" size={16} /></span></div></a>)}</div>
  </section>;
}

function CategoryPage({ slug }: { slug: string }) {
  const category = giftCategories.find(item => item.slug === slug);
  if (!category) return <main className="simple-page"><h1>Category not found</h1><ButtonLink href="#shop">Explore Categories</ButtonLink></main>;
  const categoryProducts = products.filter(product => product.collection === category.name);
  return <main className="inner-page category-page"><div className="breadcrumbs"><a href="#home">Home</a><span>/</span><a href="#shop">Shop by Category</a><span>/</span><b>{category.name}</b></div><section className="simple-hero"><p className="eyebrow">{category.group}</p><h1>{category.name}</h1><p>{category.description}</p><p>Tell us your ideas, quantity and budget. We’ll help you explore suitable options and confirm availability, pricing and delivery before you order.</p><ButtonLink href="#enquiry">Enquire About {category.name}</ButtonLink></section>{categoryProducts.length > 0 && <section className="section"><SectionHeading eyebrow="THE DIWALI COLLECTION" title={category.name} /><div className="product-grid">{categoryProducts.map(product => <ProductCard product={product} key={product.id} />)}</div></section>}<section id="enquiry" className="form-section"><div><p className="eyebrow">LET’S MAKE EVERY GIFT SPECIAL</p><h2>A thoughtful gift,<br /><em>with your story.</em></h2><p>Share your requirements with our gifting studio in Vadodara. Pan India shipping available.</p><a href="https://wa.me/919773137420" className="text-link dark"><Icon name="whatsapp" /> Enquire on WhatsApp</a></div><Form category={category.name} /></section><ShopCategories /></main>;
}

function EditorialPage({ type }: { type: keyof typeof pageData }) {
  const data = { ...pageData[type], sectionEyebrow: "THE DIWALI COLLECTION", sectionTitle: "Explore our gift collections", sectionCopy: "Mini, Basic, Classic, Premium and Traditional hampers.", categories: giftCategories.map(category => ({ title: category.name, text: category.description, image: category.image, route: categoryHref(category.slug) })) };
  return <main className="inner-page">
    <section className="inner-hero"><div><p className="eyebrow">{data.eyebrow}</p><h1>{data.title}</h1><p>{data.intro}</p><div className="hero-actions"><ButtonLink href="#enquiry">Begin an Enquiry</ButtonLink><ButtonLink href="#collection" secondary>Explore Gifts</ButtonLink></div></div><div><img src={data.image} alt={data.eyebrow} /></div></section>
    <section className="landing-categories section"><SectionHeading eyebrow={data.sectionEyebrow} title={data.sectionTitle} text={data.sectionCopy} /><div className="landing-grid">{data.categories.map((category, index) => <a href={category.route} className="landing-card" key={category.title}><div><img src={category.image} alt={category.title} /><span>0{index + 1}</span></div><h3>{category.title}</h3><p>{category.text}</p><i><Icon name="arrow" /></i></a>)}</div></section>
    <section className="service-band"><div><p className="eyebrow">{type === "corporate" ? "BUILT FOR BUSINESS" : "MADE AROUND YOU"}</p><h2>{type === "corporate" ? <>From one thoughtful brief<br /><em>to every doorstep.</em></> : <>Personal from the first detail<br /><em>to the final ribbon.</em></>}</h2></div><div className="service-features">{data.features.map((feature, index) => <span key={feature}><b>0{index + 1}</b>{feature}</span>)}</div></section>
    <section className="process section"><SectionHeading eyebrow="HOW IT WORKS" title={type === "corporate" ? <>Seamless, from brief <em>to delivery</em></> : <>Your idea, <em>beautifully brought to life</em></>} /><div className="process-grid">{processSteps.map(([title, copy], i) => <div key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></section>
    {type === "custom" && <HamperBuilder />}
    <section className="editorial-gallery section"><div className="gallery-tall"><img src={data.categories[1].image} alt={`${data.eyebrow} detail`} /></div><div className="gallery-copy"><p className="eyebrow">CRAFTED WITH CARE</p><h2>Quiet details.<br /><em>Lasting impressions.</em></h2><p>Every gift is assembled by hand, layered with thoughtful details and finished only when it feels completely right.</p><img src={data.categories[3].image} alt="Uphaaram collection detail" /></div><div className="gallery-small"><img src={data.categories[4].image} alt={`${data.eyebrow} presentation`} /></div></section>
    <section id="enquiry" className="form-section"><div><p className="eyebrow">LET'S CREATE TOGETHER</p><h2>{type === "corporate" ? <>A proposal, crafted<br /><em>for your brand.</em></> : <>Tell us what you're<br /><em>celebrating.</em></>}</h2><p>Share a few details and our gifting team will get back to you within one business day.</p><a href="https://wa.me/919773137420" className="text-link dark"><Icon name="whatsapp" /> Or chat on WhatsApp</a></div><Form corporate={type === "corporate"} /></section>
    <section className="seo-copy section"><p className="eyebrow">UPHAARAM GIFTING</p><h2>{data.seoTitle}</h2><p>{data.seoCopy}</p></section>
    <WhatsAppCta />
  </main>;
}

function ShopPage() {
  return <main className="inner-page shop-index"><section className="collection-hero"><div><p className="eyebrow">THE COLLECTIONS</p><h1>Find a gift<br /><em>that feels just right.</em></h1><p>Explore signature hampers, meaningful keepsakes and celebration-ready gifts, each made to be personalised.</p><ButtonLink href="#collection">Shop All Gifts</ButtonLink></div><img src={photos.hero} alt="The Uphaaram gift collections" /></section>
    <ShopCategories />

    <section className="section"><div className="heading-row"><SectionHeading eyebrow="THE UPHAARAM EDIT" title={<>Thoughtful gifts, <em>beautifully curated</em></>} align="left" /><ButtonLink href="#collection" secondary>View All Gifts</ButtonLink></div><div className="product-grid">{collections.map(product => <ProductCard product={product} key={product.name} />)}</div></section><WhatsAppCta /></main>;
}

function CollectionPage({ initialCollection = "All Gifts" }: { initialCollection?: string }) {
  const [filter, setFilter] = useState(initialCollection);
  const [sort, setSort] = useState("Featured");
  const [under1000, setUnder1000] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);
  const visible = products.filter(product => (filter === "All Gifts" || product.collection === filter) && (!under1000 || product.price < 1000));
  if (sort === "low") visible.sort((a, b) => a.price - b.price);
  if (sort === "high") visible.sort((a, b) => b.price - a.price);
  const FilterPanel = ({ mobile = false }: { mobile?: boolean }) => <div className="filter-panel"><div className="filter-title"><span>FILTER GIFTS</span><button onClick={() => setMobileFilters(false)} aria-label="Close filters"><Icon name="close" /></button></div><div className="filter-group"><h3>Price</h3><label><input type="checkbox" checked={under1000} onChange={event => setUnder1000(event.target.checked)} /> Under ₹1,000</label></div><div className="filter-group"><h3>Collection</h3>{["All Gifts", ...collectionNames].map(name => <label key={name}><input type="radio" name={mobile ? "mobile-collection" : "desktop-collection"} checked={filter === name} onChange={() => setFilter(name)} /> {name}</label>)}</div></div>;
  return <main className="inner-page shop-page"><section className="collection-hero compact"><div><p className="eyebrow">THE DIWALI COLLECTION</p><h1>Gifts, curated<br /><em>with intention.</em></h1><p>Explore Uphaaram’s Mini, Basic, Classic, Premium and Traditional collections. Customisation available.</p></div><img src={photos.hero} alt="Uphaaram Premium 10 × 10 Hamper" /></section><section className="catalog section"><div className="catalog-top"><p>Showing {visible.length} of {products.length} gifts</p><div><button className="mobile-filter-trigger" onClick={() => setMobileFilters(true)}>Filters <span>+</span></button><select aria-label="Sort products" value={sort} onChange={event => setSort(event.target.value)}><option value="Featured">Featured</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option></select></div></div><div className="filter-chips">{["All Gifts", ...collectionNames].map(name => <button onClick={() => setFilter(name)} className={filter === name ? "active" : ""} key={name}>{name}</button>)}</div><div className="catalog-layout"><aside><FilterPanel /></aside><div className="catalog-products">{visible.length ? <div className="product-grid">{visible.map(product => <ProductCard key={product.id} product={product} />)}</div> : <p>No gifts match these filters. Try another collection or budget.</p>}</div></div><p className="catalog-note">Prices shown are from our Diwali brochure. Final customisation, availability, shipping and order total are confirmed before payment. Product designs and prints may vary.</p></section><div className={`filter-sheet ${mobileFilters ? "open" : ""}`}><FilterPanel mobile /><button className="btn btn-primary" onClick={() => setMobileFilters(false)}>Show {visible.length} Gifts</button></div></main>;
}

function ProductPage({ id = "premium-10x10" }: { id?: string }) {
  const product = products.find(item => item.id === id);
  const [activeImage, setActiveImage] = useState(product?.image || "");
  const [message, setMessage] = useState("");
  const [openDetail, setOpenDetail] = useState("Customisation");
  if (!product) return <main className="simple-page"><h1>Gift not found</h1><ButtonLink href="#collection">Explore Gifts</ButtonLink></main>;
  const detailCopy: Record<string, string> = {
    "Customisation": "Different designs, prints and customisation options are available. Flavour options depend on the products in your hamper; upgrades may carry an additional charge. Contact us to confirm your selection.",
    "Delivery & Ordering": "Pan India shipping available. Share your quantity, destination and required date so we can confirm availability, shipping and the final order total before payment.",
  };
  const views = [product.image, ...(product.gallery || [])];
  const enquiry = `https://wa.me/919773137420?text=${encodeURIComponent(`Hi Uphaaram, I’m interested in the ${product.name} (${product.collection}), listed at ${product.starting ? "from " : ""}${formatPrice(product.price)}.\n${message ? `Message card: ${message}\n` : ""}Please help me with availability and customisation.`)}`;
  return <main className="product-page inner-page"><div className="breadcrumbs"><a href="#home">Home</a><span>/</span><a href="#collection">{product.collection}</a><span>/</span><b>{product.name}</b></div><section className="product-detail"><div className={`gallery ${views.length === 1 ? "single-image" : ""}`}>{views.length > 1 && <div className="thumbs">{views.map((image, index) => <button className={activeImage === image ? "active" : ""} onClick={() => setActiveImage(image)} key={image}><img src={image} alt={`${product.name} view ${index + 1}`} /></button>)}</div>}<div className="gallery-main"><img src={activeImage} alt={product.name} /><span>Customisation available</span></div></div><div className="product-summary"><p className="eyebrow">{product.collection}</p><h1>{product.name}</h1><div className="price">{product.starting ? "From " : ""}{formatPrice(product.price)}<span>Brochure price · final total confirmed on enquiry</span></div><p>{product.description}</p><div className="inside"><p>WHAT’S INCLUDED</p><div>{product.contents.map(item => <span key={item}>{item}</span>)}</div></div><label className="message-label">PERSONALISED MESSAGE<textarea value={message} onChange={event => setMessage(event.target.value)} placeholder="Write your message here..." /></label><a href={enquiry} className="btn btn-primary full-btn"><Icon name="whatsapp" /> Enquire to Order</a><p className="catalog-note">Designs and prints may vary. Ask us about personalisation and your preferred packaging.</p><div className="product-accordions">{Object.keys(detailCopy).map(title => <div className={openDetail === title ? "open" : ""} key={title}><button aria-expanded={openDetail === title} onClick={() => setOpenDetail(openDetail === title ? "" : title)}>{title}<span>{openDetail === title ? "−" : "+"}</span></button>{openDetail === title && <p>{detailCopy[title]}</p>}</div>)}</div></div></section><section className="section related"><SectionHeading eyebrow="CONTINUE EXPLORING" title={<>You may <em>also like</em></>} /><div className="product-grid">{products.filter(item => item.collection === product.collection && item.id !== product.id).slice(0, 3).map(item => <ProductCard product={item} key={item.id} />)}</div></section></main>;
}

function ContactPage() {
  return <main className="inner-page contact-page"><section className="contact-intro"><div><p className="eyebrow">GET IN TOUCH</p><h1>Let's Make Every<br /><em>Gift Special</em></h1><p>Have an occasion to celebrate, a special gift in mind, or a bulk gifting requirement? We’d love to help you create something memorable.</p><p>At Uphaaram | Gifting Studio, we curate thoughtful gifting experiences for every occasion — from festive hampers and wedding favours to corporate gifting and personalized surprises.</p><p>Tell us what you have in mind, and let’s create something beautiful together.</p><h2 className="contact-subheading">Contact Information</h2>
    <div className="contact-method"><span className="at">@</span><span>EMAIL<a href="mailto:uphaaram.gifting@gmail.com">uphaaram.gifting@gmail.com</a></span></div>
    <div className="contact-method"><Icon name="whatsapp" /><span>PHONE / WHATSAPP<a href="tel:+919773137420">+91 97731 37420</a><a href="https://wa.me/919773137420">Chat on WhatsApp</a></span></div>
    <div className="contact-method"><span className="at">@</span><span>INSTAGRAM<a href="https://instagram.com/uphaaram.gifting">@uphaaram.gifting</a></span></div>
    <div className="contact-method"><Icon name="heart" /><span>FACEBOOK<strong>Uphaaram | Gifting Studio</strong></span></div>
    <div className="contact-method"><Icon name="lotus" /><span>LOCATION<strong>Vadodara, Gujarat, India</strong></span></div>
    <div className="contact-method"><Icon name="gift" /><span>SHIPPING<strong>Pan India Shipping Available</strong></span></div>
    </div><div><h2 className="contact-subheading">How Can We Help You?</h2><Form /></div></section><WhatsAppCta /></main>;
}

function AboutPage() {
  return <main className="inner-page about-page"><section className="inner-hero"><div><p className="eyebrow">ABOUT US · UPHAARAM | GIFTING STUDIO</p><h1>Every Gift Tells a Story.<br /><em>We’re Here to Make It Unforgettable.</em></h1><p>At <strong>Uphaaram | Gifting Studio</strong>, we believe gifting is more than exchanging presents — it’s about expressing emotions, celebrating relationships, and creating memories that last.</p><ButtonLink href="#shop">Explore Our Gifts</ButtonLink></div><div><img src={photos.craft} alt="Uphaaram festive hamper with traditional details" /></div></section>
    <section className="editorial-story section"><p className="eyebrow">FROM OUR HOME, WITH LOVE</p><h2>Different journeys,<br /><em>one shared dream.</em></h2><div className="founder-story"><p>Our journey began with a simple idea, a creative mind, and a shared dream of building something of our own — right from home.</p><p>Founded by a <strong>saas-bahu duo, Varsha Gohil and Priya Kandoi Gohil</strong>, Uphaaram brings together creativity, passion, and the joy of making people feel special.</p></div>
    <div className="founder-grid"><article><span>CO-FOUNDER</span><h3>Varsha Gohil</h3><p><strong>Varsha Gohil</strong>, a homemaker, brings warmth, thoughtful details, and a personal touch to every creation.</p></article><article><span>CO-FOUNDER</span><h3>Priya Kandoi Gohil</h3><p><strong>Priya Kandoi Gohil</strong>, a lawyer turned entrepreneur, brings a fresh perspective, creative ideas, and a vision to transform ordinary gifting into meaningful experiences.</p></article></div>
    <div className="founder-story"><p>Different journeys, one shared dream — to make every gift feel personal, thoughtful, and unforgettable.</p><p>From wedding hampers and return gifts to corporate gifting and festive collections, every creation at Uphaaram is thoughtfully curated to reflect the occasion, the relationship, and the emotion behind it.</p><p>We started small, with a simple idea and the courage to begin. Today, we’re building a brand that celebrates the little things that mean so much — a heartfelt thank-you, a new beginning, a special celebration, or simply a reminder that someone cares.</p><p>Because for us, it has never been just about what’s inside the box. It’s about how it makes someone feel.</p></div><blockquote>Uphaaram — We don’t provide gift boxes; we curate experiences.</blockquote><p className="founder-signoff"><em>With love,<br /><strong>Varsha &amp; Priya</strong><br />The Founders of Uphaaram</em></p></section><WhyUs /><Instagram /><WhatsAppCta /></main>;
}

function FaqPage() {
  const [open, setOpen] = useState(0);
  return <main className="faq-page inner-page"><section className="simple-hero"><p className="eyebrow">HELP & GUIDANCE</p><h1>Frequently asked<br /><em>questions.</em></h1><p>Everything you need to know about customisation, ordering, delivery and care.</p></section><section className="faq-content section"><aside><p>QUICK LINKS</p>{[["Customisation", 1], ["Ordering", 6], ["Bulk Gifting", 2], ["Delivery", 5]].map(([item, index]) => <button type="button" onClick={() => { setOpen(Number(index)); document.getElementById(`faq-item-${index}`)?.scrollIntoView({ behavior: "smooth", block: "center" }); }} key={item}>{item}</button>)}<div><Icon name="whatsapp" /><h3>Still wondering?</h3><p>Our gifting team is only a message away.</p><a href="https://wa.me/919773137420">Chat on WhatsApp</a></div></aside><div className="faq-list">{faqs.map(([question, answer], index) => <div id={`faq-item-${index}`} className={open === index ? "open" : ""} key={question}><button aria-expanded={open === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(open === index ? -1 : index)}><span>{String(index + 1).padStart(2, "0")}</span>{question}<i>{open === index ? "−" : "+"}</i></button><p id={`faq-answer-${index}`} hidden={open !== index}>{answer}</p></div>)}</div></section><WhatsAppCta /></main>;
}

function SearchPage() {
  const [query, setQuery] = useState("");
  const results = query ? products.filter(p => `${p.name} ${p.collection} ${p.contents.join(" ")} Diwali festive hamper`.toLowerCase().includes(query.toLowerCase())) : products.slice(0, 4);
  return <main className="search-page inner-page"><section className="simple-hero"><p className="eyebrow">DISCOVER</p><h1>Find the perfect <em>gift.</em></h1><p>Search by occasion, recipient, collection or product.</p><div className="search-box"><input value={query} onChange={e => setQuery(e.target.value)} autoFocus placeholder="Try ‘festive hamper’ or ‘wedding’" /><button aria-label="Search"><Icon name="search" /></button></div><div className="search-suggestions"><span>POPULAR:</span>{["Diwali", "Wedding", "Under ₹1,000", "Corporate"].map(term => <button onClick={() => setQuery(term)} key={term}>{term}</button>)}</div></section><section className="section search-results"><div className="catalog-top"><p>{query ? `${results.length} results for “${query}”` : "Popular gifts right now"}</p></div>{results.length ? <div className="product-grid">{results.map((product, index) => <ProductCard product={product} key={`${product.name}-${index}`} />)}</div> : <div className="no-results"><Icon name="search" size={32} /><h2>No gifts found</h2><p>Try a different occasion, collection or recipient.</p><ButtonLink href="#collection">Explore All Gifts</ButtonLink></div>}</section></main>;
}

function WishlistPage() {
  const [saved, setSaved] = useState(collections.slice(0, 3));
  return <main className="wishlist-page inner-page"><section className="simple-hero"><p className="eyebrow">SAVED FOR LATER</p><h1>Your saved <em>gifts.</em></h1><p>A thoughtful shortlist, ready when you are.</p></section><section className="section saved-section"><div className="catalog-top"><p>{saved.length} saved gifts</p><button onClick={() => setSaved([])}>Clear all</button></div>{saved.length ? <div className="saved-grid">{saved.map(product => <div className="saved-item" key={product.name}><ProductCard product={product} /><button onClick={() => setSaved(saved.filter(item => item.name !== product.name))}>Remove</button></div>)}</div> : <div className="no-results"><Icon name="heart" size={34} /><h2>Your wishlist is waiting</h2><p>Save gifts you love and return to them anytime.</p><ButtonLink href="#collection">Explore Gifts</ButtonLink></div>}</section><WhatsAppCta /></main>;
}

function LegalPage({ type }: { type: "privacy" | "terms" }) {
  return <main className="legal-page inner-page"><section className="simple-hero"><p className="eyebrow">UPHAARAM</p><h1>{type === "privacy" ? "Privacy policy" : "Terms & conditions"}</h1><p>Last updated January 2025</p></section><section className="legal-copy section"><h2>{type === "privacy" ? "Your information, treated with care." : "Gifting with clarity and care."}</h2><p>This page provides general information about how Uphaaram handles enquiries, orders, customisation, delivery and customer details. Final order terms, pricing and delivery timelines are confirmed directly by our gifting team before payment.</p><h3>Enquiries and order details</h3><p>Information shared through our forms or WhatsApp is used only to respond to your enquiry, curate your order and coordinate delivery.</p><h3>Custom products</h3><p>Personalised and made-to-order products cannot be returned once production has begun. Our team will confirm artwork and key details before finalisation.</p><h3>Questions</h3><p>For any questions, contact us at +91 97731 37420 or @uphaaram.gifting.</p></section></main>;
}

function Footer() {
  const columns = [
    ["SHOP", ["Collections", "Festive Gifts", "Wedding Gifts", "Corporate Gifts", "Personalised Hampers"]],
    ["HELP", ["Contact", "Customisation", "FAQs", "Delivery Information"]],
    ["ABOUT", ["Our Story", "Instagram", "Craft & Care"]],
  ];
  const footerRoute: Record<string, string> = { Collections: "shop", "Festive Gifts": "festive", "Wedding Gifts": "wedding", "Corporate Gifts": "corporate", "Personalised Hampers": "custom", Contact: "contact", Customisation: "custom", FAQs: "faq", "Delivery Information": "faq", "Our Story": "about", Instagram: "https://instagram.com/uphaaram.gifting", "Craft & Care": "about" };
  return <footer><div className="footer-top"><div className="footer-brand"><Logo light /><p>More than gifts, emotions<br />beautifully curated.</p></div>{columns.map(([title, items]) => <div className="footer-column" key={title as string}><h3>{title}</h3>{(items as string[]).map(item => <a href={footerRoute[item].startsWith("http") ? footerRoute[item] : `#${footerRoute[item]}`} key={item}>{item}</a>)}</div>)}<div className="footer-contact"><h3>CONTACT</h3><a href="mailto:uphaaram.gifting@gmail.com">uphaaram.gifting@gmail.com</a><a href="tel:+919773137420">+91 97731 37420</a><a href="https://instagram.com/uphaaram.gifting">@uphaaram.gifting</a><p>Vadodara, Gujarat, India<br />Pan India Shipping Available</p></div></div><div className="newsletter"><div><p>A little celebration,<br /><em>delivered to your inbox.</em></p></div><form onSubmit={e => e.preventDefault()}><input type="email" placeholder="Your email address" aria-label="Email address" /><button aria-label="Subscribe"><Icon name="arrow" /></button></form></div><div className="footer-bottom"><span>© {new Date().getFullYear()} UPHAARAM. ALL RIGHTS RESERVED.</span><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a></div><span>HANDCRAFTED WITH CARE IN INDIA</span></div></footer>;
}

function App() {
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || "home");
  useEffect(() => {
    const onHash = () => {
      const next = window.location.hash.slice(1) || "home";
      if (next === "enquiry" || next === "occasions") {
        window.requestAnimationFrame(() => document.getElementById(next)?.scrollIntoView({ behavior: "smooth" }));
        return;
      }
      setRoute(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const page = useMemo(() => {
    if (route === "home") return <Home />;
    if (route === "shop") return <ShopPage />;
    if (route.startsWith("category/")) return <CategoryPage key={route} slug={route.slice(9)} />;
    if (route === "collection" || route === "festive-shop") return <CollectionPage />;
    if (route.startsWith("collection/")) return <CollectionPage key={route} initialCollection={decodeURIComponent(route.slice(11))} />;
    if (route === "product") return <ProductPage />;
    if (route.startsWith("product/")) return <ProductPage key={route} id={route.slice(8)} />;
    if (route in pageData) return <EditorialPage type={route as keyof typeof pageData} />;
    if (route === "about") return <AboutPage />;
    if (route === "contact") return <ContactPage />;
    if (route === "faq") return <FaqPage />;
    if (route === "search") return <SearchPage />;
    if (route === "wishlist") return <WishlistPage />;
    if (route === "privacy" || route === "terms") return <LegalPage type={route} />;
    return <Home />;
  }, [route]);
  return <><Header />{page}<Footer /><a href="https://wa.me/919773137420" className="floating-whatsapp" aria-label="Chat with Uphaaram on WhatsApp"><Icon name="whatsapp" size={24} /><span>Let's curate</span></a></>;
}

export default App;
