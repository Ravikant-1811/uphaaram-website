import { useEffect, useMemo, useState } from "react";

const photos = {
  hero: "https://images.unsplash.com/photo-1764650909534-ebe7b1206466?auto=format&fit=crop&w=1600&q=88",
  festive: "https://images.unsplash.com/photo-1774978238615-881981af6948?auto=format&fit=crop&w=1200&q=88",
  wedding: "https://images.unsplash.com/photo-1720798198016-d943cb565856?auto=format&fit=crop&w=1400&q=88",
  corporate: "https://images.unsplash.com/photo-1783331256641-c147508169b0?auto=format&fit=crop&w=1200&q=88",
  craft: "https://images.unsplash.com/photo-1738322212738-40d684b36beb?auto=format&fit=crop&w=1200&q=88",
  chocolate: "https://images.unsplash.com/photo-1772985741593-da20690af07c?auto=format&fit=crop&w=1000&q=88",
  chocolateDark: "https://images.unsplash.com/photo-1772986239852-bd95248017e1?auto=format&fit=crop&w=1000&q=88",
  gold: "https://images.unsplash.com/photo-1576579310188-eef1e26e417a?auto=format&fit=crop&w=1200&q=88",
  gift: "https://images.unsplash.com/photo-1643224962962-bc1ca22c753a?auto=format&fit=crop&w=1200&q=88",
  jewel: "https://images.unsplash.com/photo-1731068381691-dd9f121114e9?auto=format&fit=crop&w=1000&q=88",
};

const collections = [
  { name: "The Mini Celebration Box", collection: "MINI COLLECTION", price: "₹799", image: photos.jewel },
  { name: "Sunehri Festive Hamper", collection: "CLASSIC COLLECTION", price: "₹1,249", image: photos.festive },
  { name: "Noor Premium Hamper", collection: "PREMIUM COLLECTION", price: "₹1,619", image: photos.hero },
  { name: "Mehfil Traditional Hamper", collection: "TRADITIONAL COLLECTION", price: "₹2,199", image: photos.gold },
];

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
  return <a href="#home" className={`logo ${light ? "logo-light" : ""}`} aria-label="Uphaaram home">
    <span className="logo-mark"><span>U</span></span>
    <span className="logo-name">UPHAARAM</span>
    <span className="logo-tag">CURATING EMOTIONS</span>
  </a>;
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

function ProductCard({ product, index = 0 }: { product: typeof collections[number]; index?: number }) {
  return <article className="product-card">
    <a href="#product" className="product-image">
      <img src={product.image} alt={product.name} />
      <span className="custom-badge">CUSTOMISABLE</span>
      <button aria-label={`Save ${product.name}`}><Icon name="heart" size={19} /></button>
      <span className="quick-view">QUICK VIEW</span>
    </a>
    <div className="product-info"><p>{product.collection}</p><a href="#product"><h3>{product.name}</h3></a><div><span>From {product.price}</span><a href="#product" aria-label="View gift"><Icon name="arrow" size={18} /></a></div></div>
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
        <div className="hero-image"><img src={photos.hero} alt="Ornate premium gift boxes with gold ribbon" /></div>
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
    <div className="story-images"><div className="story-main"><img src={photos.craft} alt="Artisan carefully preparing a handcrafted gift" /></div><div className="story-detail"><img src={photos.chocolate} alt="Handcrafted chocolate and nuts" /></div><span className="story-seal"><Icon name="lotus" size={28} />THOUGHTFULLY<br />CURATED</span></div>
    <div className="story-copy"><p className="eyebrow">THE UPHAARAM STORY</p><h2>Gifting is more than<br /><em>what's inside the box.</em></h2><p>At Uphaaram, every detail is thoughtfully chosen, beautifully arranged and personalised to turn gifting into an emotion worth remembering.</p><p>Rooted in Indian traditions and shaped by a contemporary eye, each hamper tells a story of care, craft and celebration.</p><ButtonLink href="#about" secondary>Our Story</ButtonLink><div className="signature-mark">Uphaaram <i /></div></div>
  </section>;
}

function Personalisation() {
  const steps = [["01", "Choose your hamper", "Begin with a style that feels just right."], ["02", "Select your favourites", "From artisanal treats to festive accents."], ["03", "Personalise the details", "Names, notes and packaging, made theirs."]];
  return <section className="personalise navy-section">
    <div className="personalise-art"><img src={photos.chocolateDark} alt="Artisan chocolates for a custom hamper" /><div className="orbit orbit-one" /><div className="orbit orbit-two" /></div>
    <div className="personalise-content"><SectionHeading eyebrow="CURATED FOR YOU" title={<>Make it truly <em>theirs.</em></>} text="Every story is different. Your gift should be too." align="left" light />
      <div className="steps">{steps.map(([n, title, text]) => <div className="step" key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
      <div className="personalise-actions"><ButtonLink href="#custom" light>Start Customising</ButtonLink><a href="https://wa.me/919773137420" className="text-link"><Icon name="whatsapp" size={18} /> Enquire on WhatsApp</a></div>
    </div>
  </section>;
}

const hamperOptions = [
  { category: "Makhana", items: ["Salt & Pepper", "Tomato", "Cream & Onion", "Peri-Peri"] },
  { category: "Chocolate", items: ["Raisin Chocolate", "Cashew Crunch", "Almond Crunch", "Chocolate Biscuit"] },
  { category: "Dry Fruits", items: ["Salted Cashews", "Salted Almonds", "Pistachios", "Raisins"] },
  { category: "Candles", items: ["Motichoor Ladoo", "Modak", "Daisy", "Lotus"] },
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
          <div className="hamper-total"><div><p>YOUR CURATED HAMPER</p><strong>From ₹{899 + selected.length * 175}</strong><span>Final price after confirmation</span></div><ButtonLink href="#contact">Continue</ButtonLink></div>
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
    <div className="wedding-image"><img src={photos.wedding} alt="Elegant wedding gifts arranged on a table" /><div className="arch-frame" /></div>
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
  return <><Hero /><Occasions /><SignatureCollections /><Story /><Personalisation /><HamperBuilder /><FestiveSection /><Corporate /><Wedding /><WhyUs /><section className="section bestsellers"><div className="heading-row"><SectionHeading eyebrow="MOST LOVED" title={<>Gifts worth <em>remembering</em></>} align="left" /><ButtonLink href="#shop" secondary>Shop Bestsellers</ButtonLink></div><div className="product-grid">{[...collections].reverse().map(p => <ProductCard product={p} key={p.name} />)}</div></section><Instagram /><WhatsAppCta /></>;
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
    categories: [
      { title: "Diwali Hampers", text: "Abundant, luminous and made for sharing.", image: photos.hero },
      { title: "Shubh Labh", text: "Auspicious accents for beautiful beginnings.", image: photos.festive },
      { title: "Festive Candles", text: "Hand-poured light in celebratory forms.", image: photos.chocolate },
      { title: "Toran & Decor", text: "Tradition, thoughtfully reimagined.", image: photos.gold },
      { title: "Traditional Gifts", text: "Keepsakes with an unmistakably Indian soul.", image: photos.jewel },
      { title: "Festive Favourites", text: "Artisanal treats everyone will love.", image: photos.chocolateDark },
    ],
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
    categories: [
      { title: "Wedding Favours", text: "A beautiful thank-you for every guest.", image: photos.gold },
      { title: "Welcome Hampers", text: "Warm arrivals, thoughtfully arranged.", image: photos.hero },
      { title: "Bridal Hampers", text: "A little indulgence for the bride-to-be.", image: photos.jewel },
      { title: "Family Gifts", text: "Meaningful gestures for your closest circle.", image: photos.gift },
      { title: "Return Gifts", text: "Personal keepsakes made to be remembered.", image: photos.wedding },
      { title: "Special Occasions", text: "Anniversaries, milestones and joyful beginnings.", image: photos.chocolate },
    ],
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
    categories: [
      { title: "Employee Gifting", text: "Celebrate teams and important milestones.", image: photos.hero },
      { title: "Client Gifts", text: "Thoughtful gestures that strengthen relationships.", image: photos.corporate },
      { title: "Partner Gifting", text: "Premium expressions of appreciation.", image: photos.gold },
      { title: "Event Hampers", text: "On-brand gifts for memorable gatherings.", image: photos.gift },
      { title: "Festive Programmes", text: "Seamless gifting across teams and cities.", image: photos.festive },
      { title: "Welcome Kits", text: "Make every new beginning feel special.", image: photos.jewel },
    ],
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
    categories: [
      { title: "Packaging", text: "Boxes, trays, baskets and keepsakes.", image: photos.hero },
      { title: "Artisanal Treats", text: "Makhana, dry fruits and handmade chocolates.", image: photos.chocolateDark },
      { title: "Candles & Decor", text: "Celebratory forms and fragrant details.", image: photos.festive },
      { title: "Personal Notes", text: "Words beautifully printed or handwritten.", image: photos.gift },
      { title: "Occasion Styling", text: "Colours and accents matched to the moment.", image: photos.gold },
      { title: "Names & Monograms", text: "Personal finishes created just for them.", image: photos.jewel },
    ],
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

function Form({ corporate = false }: { corporate?: boolean }) {
  return <form className="enquiry-form" onSubmit={e => e.preventDefault()}>
    <div><label>Name<input placeholder="Your full name" /></label><label>Phone<input placeholder="+91" type="tel" /></label></div>
    <div><label>Email<input placeholder="you@email.com" type="email" /></label><label>{corporate ? "Company" : "Occasion"}<input placeholder={corporate ? "Company name" : "e.g. Wedding, Diwali"} /></label></div>
    <div><label>Budget<select defaultValue=""><option value="" disabled>Select a range</option><option>Under ₹1,000</option><option>₹1,000 – ₹2,500</option><option>₹2,500 – ₹5,000</option><option>Above ₹5,000</option></select></label><label>Quantity<input placeholder="Number of gifts" type="number" /></label></div>
    <div><label>Delivery City<input placeholder="City" /></label><label>Required Date<input type="date" /></label></div>
    <label>Tell us what you have in mind<textarea rows={4} placeholder="Share the occasion, style and any personalisation you would love..." /></label>
    <button className="btn btn-primary" type="submit">{corporate ? "Request a Proposal" : "Request a Custom Hamper"}<Icon name="arrow" /></button>
  </form>;
}

function EditorialPage({ type }: { type: keyof typeof pageData }) {
  const data = pageData[type];
  return <main className="inner-page">
    <section className="inner-hero"><div><p className="eyebrow">{data.eyebrow}</p><h1>{data.title}</h1><p>{data.intro}</p><div className="hero-actions"><ButtonLink href="#enquiry">Begin an Enquiry</ButtonLink><ButtonLink href="#collection" secondary>Explore Gifts</ButtonLink></div></div><div><img src={data.image} alt={data.eyebrow} /></div></section>
    <section className="landing-categories section"><SectionHeading eyebrow={data.sectionEyebrow} title={data.sectionTitle} text={data.sectionCopy} /><div className="landing-grid">{data.categories.map((category, index) => <a href="#collection" className="landing-card" key={category.title}><div><img src={category.image} alt={category.title} /><span>0{index + 1}</span></div><h3>{category.title}</h3><p>{category.text}</p><i><Icon name="arrow" /></i></a>)}</div></section>
    <section className="service-band"><div><p className="eyebrow">{type === "corporate" ? "BUILT FOR BUSINESS" : "MADE AROUND YOU"}</p><h2>{type === "corporate" ? <>From one thoughtful brief<br /><em>to every doorstep.</em></> : <>Personal from the first detail<br /><em>to the final ribbon.</em></>}</h2></div><div className="service-features">{data.features.map((feature, index) => <span key={feature}><b>0{index + 1}</b>{feature}</span>)}</div></section>
    <section className="process section"><SectionHeading eyebrow="HOW IT WORKS" title={type === "corporate" ? <>Seamless, from brief <em>to delivery</em></> : <>Your idea, <em>beautifully brought to life</em></>} /><div className="process-grid">{processSteps.map(([title, copy], i) => <div key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></section>
    {type === "custom" && <HamperBuilder />}
    <section className="editorial-gallery section"><div className="gallery-tall"><img src={data.categories[1].image} alt={`${data.eyebrow} detail`} /></div><div className="gallery-copy"><p className="eyebrow">CRAFTED WITH CARE</p><h2>Quiet details.<br /><em>Lasting impressions.</em></h2><p>Every gift is assembled by hand, layered with thoughtful details and finished only when it feels completely right.</p><img src={data.categories[3].image} alt="A close-up of Uphaaram gift craftsmanship" /></div><div className="gallery-small"><img src={data.categories[4].image} alt={`${data.eyebrow} presentation`} /></div></section>
    <section id="enquiry" className="form-section"><div><p className="eyebrow">LET'S CREATE TOGETHER</p><h2>{type === "corporate" ? <>A proposal, crafted<br /><em>for your brand.</em></> : <>Tell us what you're<br /><em>celebrating.</em></>}</h2><p>Share a few details and our gifting team will get back to you within one business day.</p><a href="https://wa.me/919773137420" className="text-link dark"><Icon name="whatsapp" /> Or chat on WhatsApp</a></div><Form corporate={type === "corporate"} /></section>
    <section className="seo-copy section"><p className="eyebrow">UPHAARAM GIFTING</p><h2>{data.seoTitle}</h2><p>{data.seoCopy}</p></section>
    <WhatsAppCta />
  </main>;
}

function ShopPage() {
  const signatureCollections = [
    ["Mini Gift Collection", "Small gestures, beautifully considered.", "From ₹499", photos.jewel],
    ["Basic Hamper Collection", "Everyday joys, elevated.", "From ₹799", photos.gift],
    ["Classic Hamper Collection", "A timeless expression of care.", "From ₹1,249", photos.hero],
    ["Premium Hamper Collection", "Abundant, refined and unforgettable.", "From ₹1,619", photos.corporate],
    ["Traditional Collection", "Indian heritage in every detail.", "From ₹999", photos.festive],
  ];
  return <main className="inner-page shop-index"><section className="collection-hero"><div><p className="eyebrow">THE COLLECTIONS</p><h1>Find a gift<br /><em>that feels just right.</em></h1><p>Explore signature hampers, meaningful keepsakes and celebration-ready gifts, each made to be personalised.</p><ButtonLink href="#collection">Shop All Gifts</ButtonLink></div><img src={photos.hero} alt="The Uphaaram gift collections" /></section>
    <section className="section collection-index"><SectionHeading eyebrow="SIGNATURE COLLECTIONS" title={<>A collection for <em>every gesture</em></>} text="From a small thank-you to the grandest celebration." /><div className="collection-index-grid">{signatureCollections.map(([name, text, price, image], index) => <a href="#collection" className={`collection-index-card card-${index + 1}`} key={name}><img src={image} alt={name} /><div><span>0{index + 1}</span><p>{price}</p><h3>{name}</h3><small>{text}</small><i><Icon name="arrow" /></i></div></a>)}</div></section>
    <section className="shop-paths"><SectionHeading eyebrow="SHOP YOUR WAY" title={<>Gifting made <em>beautifully simple</em></>} light /><div>{[["By Occasion", "Festive, wedding, milestones & more"], ["By Budget", "Thoughtful gifts at every price"], ["By Recipient", "For family, friends, teams & clients"], ["Personalised", "Made especially for them"]].map(([title, copy]) => <a href="#collection" key={title}><h3>{title}</h3><p>{copy}</p><Icon name="arrow" /></a>)}</div></section>
    <section className="section"><div className="heading-row"><SectionHeading eyebrow="MOST LOVED" title={<>Gifts our community <em>adores</em></>} align="left" /><ButtonLink href="#collection" secondary>View All Gifts</ButtonLink></div><div className="product-grid">{collections.map(product => <ProductCard product={product} key={product.name} />)}</div></section><WhatsAppCta /></main>;
}

function CollectionPage() {
  const [filter, setFilter] = useState("All Gifts");
  const [mobileFilters, setMobileFilters] = useState(false);
  const filters = ["All Gifts", "Under ₹1,000", "Festive", "Wedding", "Corporate", "Personalised"];
  const filterGroups = [["Price", ["Under ₹1,000", "₹1,000 – ₹2,000", "Above ₹2,000"]], ["Occasion", ["Diwali", "Wedding", "Birthday", "Housewarming"]], ["Gift Type", ["Hampers", "Candles", "Decor", "Dry Fruits"]], ["Recipient", ["Family", "Friends", "Employees", "Clients"]]];
  const FilterPanel = () => <div className="filter-panel"><div className="filter-title"><span>FILTER GIFTS</span><button onClick={() => setMobileFilters(false)} aria-label="Close filters"><Icon name="close" /></button></div>{filterGroups.map(([name, values]) => <div className="filter-group" key={name as string}><h3>{name}</h3>{(values as string[]).map(value => <label key={value}><input type="checkbox" /> <span>{value}</span></label>)}</div>)}</div>;
  return <main className="inner-page shop-page"><section className="collection-hero compact"><div><p className="eyebrow">THE GIFT EDIT</p><h1>Gifts, curated<br /><em>with intention.</em></h1><p>Thoughtful hampers for every celebration, relationship and meaningful moment.</p></div><img src={photos.hero} alt="The Uphaaram gift collection" /></section><section className="catalog section"><div className="catalog-top"><p>Showing 16 curated gifts</p><div><button className="mobile-filter-trigger" onClick={() => setMobileFilters(true)}>Filters <span>+</span></button><select aria-label="Sort products"><option>Featured</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Newest</option></select></div></div><div className="filter-chips">{filters.map(x => <button onClick={() => setFilter(x)} className={filter === x ? "active" : ""} key={x}>{x}</button>)}</div><div className="catalog-layout"><aside><FilterPanel /></aside><div className="catalog-products"><div className="product-grid">{[...collections, ...collections, ...collections].map((p, i) => <ProductCard key={`${p.name}-${i}`} product={{...p, name: i > 3 ? `${p.name} · ${["Saffron", "Ivory", "Heritage"][Math.floor(i / 4) - 1]} Edition` : p.name}} />)}</div><button className="load-more">Load more gifts <Icon name="arrow" /></button></div></div></section><div className={`filter-sheet ${mobileFilters ? "open" : ""}`}><FilterPanel /><button className="btn btn-primary" onClick={() => setMobileFilters(false)}>Show 16 Gifts</button></div></main>;
}

function ProductPage() {
  const [choice, setChoice] = useState("Salted Cashews");
  const [activeImage, setActiveImage] = useState(photos.hero);
  const [openDetail, setOpenDetail] = useState("The Details");
  const detailCopy: Record<string, string> = {
    "The Details": "A 10 × 10 inch reusable keepsake box, hand-finished with premium ribbon and festive floral details.",
    "Customisation": "Swap flavours, select your candle, add names or branding, and include a personalised message card.",
    "Delivery & Care": "Please allow 3–5 working days for individual orders. Store edible products in a cool, dry place.",
  };
  const views = [photos.hero, photos.chocolate, photos.gold, photos.gift];
  return <main className="product-page inner-page"><div className="breadcrumbs"><a href="#home">Home</a><span>/</span><a href="#collection">Premium Collection</a><span>/</span><b>Noor Hamper</b></div><section className="product-detail"><div className="gallery"><div className="thumbs">{views.map((image, i) => <button className={activeImage === image ? "active" : ""} onClick={() => setActiveImage(image)} key={image}><img src={image} alt={`Noor hamper view ${i + 1}`} /></button>)}</div><div className="gallery-main"><img src={activeImage} alt="Noor premium handcrafted hamper" /><span>Customisable</span></div></div><div className="product-summary"><p className="eyebrow">PREMIUM COLLECTION</p><h1>Noor Premium<br />10 × 10 Hamper</h1><div className="price">₹1,619 <span>Inclusive of taxes</span></div><p>A luminous celebration of indulgent treats and handcrafted details, arranged in our signature keepsake box.</p><div className="inside"><p>WHAT'S INSIDE</p><div>{["Cashews", "Almonds", "Handmade chocolates", "Flower candle", "Sweet box"].map(x => <span key={x}>{x}</span>)}</div></div><div className="customise"><p>CUSTOMISE YOUR DRY FRUIT</p><div>{["Salted Cashews", "Roasted Almonds", "Pistachios"].map(x => <button className={choice === x ? "active" : ""} onClick={() => setChoice(x)} key={x}>{x}</button>)}</div></div><label className="message-label">PERSONALISED MESSAGE<textarea placeholder="Write your message here..." /></label><ButtonLink href="#contact" className="full-btn">Enquire to Order</ButtonLink><a href="https://wa.me/919773137420" className="whatsapp-order"><Icon name="whatsapp" /> Chat on WhatsApp</a><div className="product-accordions">{Object.keys(detailCopy).map(title => <div className={openDetail === title ? "open" : ""} key={title}><button onClick={() => setOpenDetail(openDetail === title ? "" : title)}>{title}<span>{openDetail === title ? "−" : "+"}</span></button>{openDetail === title && <p>{detailCopy[title]}</p>}</div>)}</div></div></section><section className="product-values"><div><Icon name="hand" /><span>Handcrafted with care</span></div><div><Icon name="gift" /><span>Beautifully gift-ready</span></div><div><Icon name="sparkle" /><span>Personalised for you</span></div><div><Icon name="whatsapp" /><span>Concierge ordering</span></div></section><section className="section related"><SectionHeading eyebrow="CONTINUE EXPLORING" title={<>You may <em>also like</em></>} /><div className="product-grid">{collections.slice(0, 3).map(p => <ProductCard product={p} key={p.name} />)}</div></section></main>;
}

function ContactPage() {
  return <main className="inner-page contact-page"><section className="contact-intro"><div><p className="eyebrow">GET IN TOUCH</p><h1>Let's curate<br /><em>something beautiful.</em></h1><p>Have an occasion in mind? Tell us what you are celebrating and we'll help create the perfect gifting experience.</p><div className="contact-method"><Icon name="whatsapp" /><span>WHATSAPP<a href="tel:+919773137420">+91 97731 37420</a><small>Monday–Saturday · 10am–7pm</small></span></div><div className="contact-method"><span className="at">@</span><span>INSTAGRAM<a href="https://instagram.com/uphaaram.gifting">@uphaaram.gifting</a><small>Follow our latest gifting stories</small></span></div></div><Form /></section><section className="contact-notes"><div><span>01</span><h3>Custom Hampers</h3><p>Share the occasion, recipient and budget. We will curate a thoughtful selection for you.</p></div><div><span>02</span><h3>Bulk Enquiries</h3><p>Planning gifts for a team, event or wedding? Tell us the quantity and delivery locations.</p></div><div><span>03</span><h3>Order Support</h3><p>Already placed an order? Message us on WhatsApp and our team will be happy to help.</p></div></section><WhatsAppCta /></main>;
}

function AboutPage() {
  return <main className="inner-page about-page"><section className="inner-hero"><div><p className="eyebrow">OUR STORY</p><h1>More than gifts.</h1><p>We believe every gift carries a little emotion. Uphaaram brings craft, tradition and personalisation together to help you express it beautifully.</p><ButtonLink href="#collection">Explore Our Gifts</ButtonLink></div><div><img src={photos.craft} alt="The hands and craft behind Uphaaram" /></div></section><section className="editorial-story section"><p className="eyebrow">THE PHILOSOPHY</p><h2>Every gift carries<br /><em>a little emotion.</em></h2><div className="story-columns"><p>Uphaaram began with a simple belief: the most meaningful gifts are not measured by what is inside, but by how they make someone feel. Every product, ribbon and handwritten note is chosen with that emotion in mind.</p><p>Our aesthetic draws from the quiet elegance of Indian craft—its warmth, symbolism and love of celebration—interpreted with a modern, refined sensibility.</p></div><blockquote>“More than gifts, emotions beautifully curated.”</blockquote></section><section className="about-craft"><div><img src={photos.chocolate} alt="Handcrafted artisanal treats" /></div><div><p className="eyebrow">BEHIND THE RIBBON</p><h2>Made slowly.<br /><em>Given wholeheartedly.</em></h2><p>We work with thoughtful makers, celebrate handcrafted details and assemble every hamper by hand. The result is gifting that feels personal—not produced.</p><div className="about-values">{["Craftsmanship", "Personalisation", "Indian heritage", "Joyful celebration"].map((value, i) => <span key={value}><b>0{i + 1}</b>{value}</span>)}</div></div><div><img src={photos.gift} alt="A meaningful gift being exchanged" /></div></section><WhyUs /><Instagram /><WhatsAppCta /></main>;
}

const faqs = [
  ["Can I customise every hamper?", "Most Uphaaram hampers can be personalised. Depending on the collection, you can change products, flavours, candles, packaging, colours and message cards."],
  ["How far in advance should I order?", "For individual hampers, allow 3–5 working days. Wedding, corporate and larger festive orders are best discussed 2–4 weeks in advance."],
  ["Do you offer bulk and corporate gifting?", "Yes. We curate bulk gifts with budget-based options, branded packaging, personalised notes and multi-location delivery."],
  ["Can you deliver to multiple addresses?", "Yes. Multi-address delivery is available for corporate, wedding and festive programmes. Share your address list with our gifting team."],
  ["What can be personalised?", "Names, monograms, sleeves, ribbons, message cards, product selections and occasion styling can all be tailored to your brief."],
  ["Do you ship across India?", "We offer pan-India delivery for most products. Delivery timelines and availability depend on the destination and hamper contents."],
  ["How do I place an order?", "Uphaaram uses a concierge enquiry process. Send your selection through the enquiry form or WhatsApp, and our team will confirm customisation, availability and payment."],
  ["Can I set a specific budget?", "Absolutely. Tell us your per-gift budget, quantity and occasion, and we will recommend the most beautiful options within it."],
];

function FaqPage() {
  const [open, setOpen] = useState(0);
  return <main className="faq-page inner-page"><section className="simple-hero"><p className="eyebrow">HELP & GUIDANCE</p><h1>Frequently asked<br /><em>questions.</em></h1><p>Everything you need to know about customisation, ordering, delivery and care.</p></section><section className="faq-content section"><aside><p>QUICK LINKS</p>{["Customisation", "Ordering", "Bulk Gifting", "Delivery"].map(item => <a href="#faq" key={item}>{item}</a>)}<div><Icon name="whatsapp" /><h3>Still wondering?</h3><p>Our gifting team is only a message away.</p><a href="https://wa.me/919773137420">Chat on WhatsApp</a></div></aside><div className="faq-list">{faqs.map(([question, answer], index) => <div className={open === index ? "open" : ""} key={question}><button onClick={() => setOpen(open === index ? -1 : index)}><span>0{index + 1}</span>{question}<i>{open === index ? "−" : "+"}</i></button>{open === index && <p>{answer}</p>}</div>)}</div></section><WhatsAppCta /></main>;
}

function SearchPage() {
  const [query, setQuery] = useState("");
  const products = [...collections, ...collections.map(p => ({ ...p, name: `${p.name} · Festive Edition` }))];
  const results = query ? products.filter(p => `${p.name} ${p.collection}`.toLowerCase().includes(query.toLowerCase())) : products.slice(0, 4);
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
  return <footer><div className="footer-top"><div className="footer-brand"><Logo light /><p>More than gifts, emotions<br />beautifully curated.</p></div>{columns.map(([title, items]) => <div className="footer-column" key={title as string}><h3>{title}</h3>{(items as string[]).map(item => <a href={footerRoute[item].startsWith("http") ? footerRoute[item] : `#${footerRoute[item]}`} key={item}>{item}</a>)}</div>)}<div className="footer-contact"><h3>CONTACT</h3><a href="tel:+919773137420">+91 97731 37420</a><a href="https://instagram.com/uphaaram.gifting">@uphaaram.gifting</a></div></div><div className="newsletter"><div><p>A little celebration,<br /><em>delivered to your inbox.</em></p></div><form onSubmit={e => e.preventDefault()}><input type="email" placeholder="Your email address" aria-label="Email address" /><button aria-label="Subscribe"><Icon name="arrow" /></button></form></div><div className="footer-bottom"><span>© 2025 UPHAARAM. ALL RIGHTS RESERVED.</span><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a></div><span>HANDCRAFTED WITH CARE IN INDIA</span></div></footer>;
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
    if (route === "collection" || route === "festive-shop") return <CollectionPage />;
    if (route === "product") return <ProductPage />;
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
