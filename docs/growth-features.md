# Growth Features for PGB Electrónica Industrial

## PGB Electrónica Industrial Website — Business Growth Plan

**Purpose:** Document 5 high-impact improvements to help the business win more customers, prioritized by return-on-effort. The owner is not technical, so every feature here is chosen to be **low-maintenance and durable** — set up once, works forever, requires no day-to-day effort.

**Target audience of this site:** Industrial companies in the Coquimbo region (La Serena, Coquimbo) needing repairs, control panels, solar pumping, and electrical maintenance. Buyers are plant managers, maintenance chiefs, and small industrial businesses.

---

## Current State (as of 2026-08)

- Static HTML/CSS/JS site (Bootstrap), 5 pages: `index`, `about`, `service`, `contact`, `404`
- Spanish-language content, contact form working via **EmailJS** (browser-side, no backend)
- WhatsApp link (`wa.me/56932735031`), Facebook, LinkedIn in header and footer
- Hardcoded stats: 30 years experience, 17 services, 396 satisfied clients, 152 completed projects
- Real testimonials from an ex-mayor of La Serena and company contacts
- Empty `<meta name="description">` and `<meta name="keywords">` on all pages
- Broken favicon path (`/PGB//img/favicon.ico` — double slash + wrong prefix)
- Already deployed on Vercel (`pgb-electronics.vercel.app`); deploys equally on Cloudflare Pages

---

## 1. Local SEO + Google Business Profile

**Why it matters (highest ROI):** For an industrial-services business, most new work comes from people searching Google for "reparación tableros eléctricos La Serena" or "variador de velocidad Coquimbo". The site currently gives Google almost nothing to rank on — empty descriptions, no structured data, no map presence. This point alone will out-earn every other item on this list.

### 1a. Meta tags per page

Every page currently has empty `description` and `keywords`. Add unique, geo-targeted tags. Example for `index.html`:

```html
<meta name="description" content="PGB Electrónica Industrial — reparación y mantenimiento de tableros de control, variadores de velocidad, electrónica de potencia, automatización y sistemas de energía solar en La Serena y Coquimbo. Más de 30 años de experiencia. Emergencias 24/7.">
<meta name="keywords" content="reparación tableros eléctricos La Serena, variador de velocidad Coquimbo, electrónica industrial, automatización, energía solar, bombas solares, mantenimiento eléctrico">
```

Also add per-page `<title>` optimizations. Suggested title pattern: `Servicios de Electrónica Industrial en La Serena | PGB Electrónica` — front-load the keywords.

### 1b. LocalBusiness structured data (JSON-LD)

Add to every page's `<head>` (or at least `index.html`). This is what lets Google render a rich result — phone number, address, rating, and "open now" status directly in search results:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Electrician",
  "name": "PGB Electrónica Industrial",
  "description": "Reparación de aparamenta y equipamiento para la industria: control, automatización, electrónica de potencia y energía solar.",
  "url": "https://pgb-electronics.vercel.app/",
  "telephone": "+56 9 3273 5031",
  "email": "pgbpowerelectronics@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "José Antonio Valdés 2482, Cia Baja",
    "addressLocality": "La Serena",
    "addressRegion": "Coquimbo",
    "addressCountry": "CL"
  },
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "08:30",
    "closes": "19:00"
  },
  "sameAs": [
    "https://www.facebook.com/p/PGB-power-control-Electricidad-y-Electr%C3%B3nica-Industrial-100063474105077/",
    "https://www.linkedin.com/in/pedro-luis-guti%C3%A9rrez-bustamante-361aa260/"
  ]
}
</script>
```

> ⚠️ Verify the actual business hours with the owner before publishing — don't guess. Also check whether the schema type should be `Electrician` or `ElectricalContractor`; if he also does solar installs, a parent `@type` list (`["Electrician", "HVACBusiness"]`) can cover both.

### 1c. Google Maps embed on the contact page

`contact.html` already mentions Google Maps integration in the docs. Ensure the map is embedded with a full address card + **"Get Directions"** button linking to `https://maps.google.com/?q=José+Antonio+Valdés+2482,+La+Serena,+Coquimbo`. Mobile users (a large share) will tap straight into navigation.

### 1d. Google Business Profile

Separate from the site, but the single biggest local-SEO lever:

1. Go to https://business.google.com and claim/create the profile for "PGB Electrónica Industrial"
2. Use the exact same NAP (Name, Address, Phone) as the site — consistency is what Google trusts
3. Add categories: "Electrical Equipment Repair Service", "Electrician", "Solar Energy Equipment Supplier"
4. Add photos of real work (control panels, welding machine repairs, solar installs)
5. Ask satisfied customers for reviews — reviews are the #1 local ranking factor
6. Post the Google Maps link and reviews link back on the website (round-trip signals)

---

## 2. WhatsApp Quote Buttons

**Why it matters:** Chile runs on WhatsApp for business inquiries. The site already has a bare `wa.me/56932735031` link in the header, but it opens a blank chat — the visitor has to type everything themselves. A pre-filled message reduces friction to a single tap and doubles as a tracking signal (each service gets its own link, so the owner learns which services generate the most interest).

### How WhatsApp deep links work

```
https://wa.me/56932735031?text=Hola%20Pedro%2C%20quiero%20un%20presupuesto
```

- `56932735031` = country code (56, Chile) + number
- `?text=` = URL-encoded pre-filled message

### Where to add them

**a) On every service card** (in `index.html` services carousel and `service.html`). Example for the VFD (variador) service:

```html
<a class="btn btn-success btn-sm" target="_blank"
   href="https://wa.me/56932735031?text=Hola%20Pedro%2C%20necesito%20un%20presupuesto%20para%20la%20reparaci%C3%B3n%20de%20un%20variador%20de%20velocidad">
   Pedir Cotización por WhatsApp
</a>
```

**b) A floating WhatsApp button** bottom-right on every page — standard practice in Chile. Fixed position, appears on mobile and desktop:

```html
<a href="https://wa.me/56932735031?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios"
   class="whatsapp-float" target="_blank">
  <i class="fab fa-whatsapp"></i>
</a>
```

```css
.whatsapp-float {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  background: #25D366;
  color: #fff;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,.3);
}
```

### Suggested pre-filled messages per service

| Service | Message |
|---|---|
| Variadores de velocidad | `necesito un presupuesto para la reparación de un variador de velocidad` |
| Tableros de control | `necesito un presupuesto para un tablero de control automático` |
| Soldadoras Kemppi | `necesito un servicio técnico para una máquina de soldar` |
| Energía solar / bombeo | `quiero cotizar un sistema de energía solar o bombeo` |
| General | `Hola, quiero más información sobre sus servicios` |

**Bonus:** These per-service links are trackable — he can see which button gets tapped most and double down on that service's marketing.

---

## 3. Online Quote Request per Service

**Why it matters:** The EmailJS contact form already works, but it's a single generic form. A visitor reading "Variador de velocidad para motores DC" should be able to request a quote *about that specific thing* without retyping the service name. Pre-filling a field is trivial and measurably improves conversion.

### Implementation options (cheapest first)

**Option A — Pre-filled contact page (recommended, zero new code):**
Add query-param support to `contact.html`'s form. Link from each service card:

```
contact.html?service=Variador+de+velocidad
```

On load, JS reads the `service` param and auto-fills the "Asunto/Subject" field. ~5 lines of JS in `js/main.js`:

```js
const params = new URLSearchParams(window.location.search);
const svc = params.get('service');
if (svc) $('#subject').val(svc);
```

**Option B — WhatsApp + EmailJS combined:** Each service card gets both a WhatsApp button (point 2) and a "Cotizar por formulario" link using Option A.

**Option C — Standalone quote page:** A dedicated `cotizar.html` with a service dropdown. More work, more maintenance, not needed for a one-person business — the contact form already exists.

### What to capture
Name, company (optional), email/phone, service (pre-filled), message. Keep it short — every extra field costs conversions.

---

## 4. Trust Signals (Proof that Converts B2B)

**Why it matters:** Industrial buyers are cautious; they're spending company money. Testimonials from an ex-mayor and real companies already exist on the site — that's gold. But they're buried and unverifiable. B2B conversion is driven by proof: named customers, photos of real work, and external review links.

### 4a. Photo gallery of real work (highest value)

Add a gallery section (new page `galeria.html` or a section on `about.html`) with photos of:
- Control panels built or repaired (before/after is ideal)
- Variable-frequency drive repairs on the bench
- Solar/bomba installations in the field
- Welding machine repairs

A simple Bootstrap lightbox (or the existing owl-carousel) is enough. **Before/after shots are the single strongest proof** in repair work — they show competence in 2 seconds.

### 4b. Link Google Reviews

If/when he gets a Google Business Profile (point 1d), add a "Ver reseñas en Google" button on the homepage next to the testimonials. External, verified reviews beat on-site quotes every time.

### 4c. Make testimonials more credible

Current testimonials are a generic avatar for everyone. Request permission to use real photos of the people who gave them, or at minimum add company logos (Corpvial, Maestranza rectificadora, etc.). Even without new photos, adding the date and role makes them feel real.

### 4d. Industry recognition / certifications

Add a small "Marcas que atendemos / con las que trabajamos" strip: Kemppi, Powcon, Lincoln, Esab, Miller, Tellwin, M&H (already mentioned in services). Logos build instant trust with industrial buyers.

---

## 5. Fix Broken Bits & Polish

**Why it matters:** These are free fixes. Broken items undermine credibility — and for a site whose whole pitch is "quality work," a broken favicon and blank carousel headings whisper carelessness.

### 5a. Broken favicon path (all pages)

Current: `href="/PGB//img/favicon.ico"` — the `/PGB//` prefix and double slash cause a 404 on Cloudflare Pages (Vercel tolerates it).

Fix in every HTML file:
```html
<link rel="icon" type="image/x-icon" href="img/favicon.ico">
```
(relative path, matching how other assets are referenced)

### 5b. Empty carousel headings (index.html)

Each hero carousel slide has an empty `<h5 class="text-white text-uppercase mb-3 animated slideInDown"></h5>`. Either remove the empty tags or add the actual slide label (e.g., "Control Industrial", "Energía Renovable", "Tableros de Control").

### 5c. Content errors (service.html)

- `Automatización...` card has a stray `</p>` before the description paragraph starts ("`<p></p>Fabricación y diseño...`") — the text sits outside the paragraph tags
- `Electrotécnica y Mecatrónica Industrial` card has the same issue
- Clean these up for valid HTML

### 5d. Duplicated carousel entry (index.html)

"Variador de velocidad para motores dc." appears twice in the top service grid (`sir1.jpg` and `sir3.jpg`). Replace the duplicate with a different service (e.g., "Tableros de transferencia automática" or "Servicio técnico de soldadoras") to cover more ground in the above-the-fold section.

### 5e. Contact form fallback

The form depends entirely on EmailJS running in the browser. Add a **fallback**: if EmailJS fails, show the email address and WhatsApp link prominently in the error message so no lead is ever lost:

```js
.catch(function(error) {
    $('#form-messages').removeClass('d-none').addClass('alert-danger')
        .html('Hubo un error. Escríbenos directo: <a href="mailto:pgbpowerelectronics@gmail.com">pgbpowerelectronics@gmail.com</a> o por <a href="https://wa.me/56932735031" target="_blank">WhatsApp</a>.');
});
```

### 5f. Backups and junk

- `contact.html.backup` is committed to the repo — remove it or add to `.gitignore`
- Check `img/` and `lib/` for unused files to slim the repo

---

## Suggested Execution Order

| Phase | Items | Effort | Dependencies |
|---|---|---|---|
| **1. Quick wins (do first)** | 5a favicon, 5b/5c/5d content fixes, 5e form fallback, 10a/10c polish | ~1 hour | none |
| **2. SEO** | 1a meta tags, 1b JSON-LD schema, 1c map embed, 6 OG tags, 8a service areas | ~2 hours | owner confirms hours/type |
| **3. Conversion** | 2 WhatsApp buttons, 3 pre-filled quote form, 8b sticky call bar, 7 FAQ | ~2 hours | none |
| **4. Trust** | 4a gallery, 4d brand strip | ~1 day | owner provides photos |
| **5. Google Business Profile** | 1d | 1–2 hours with owner | owner needs Google account |
| **6. Analytics + indexing** | Cloudflare Web Analytics + Search Console + sitemap.xml + robots.txt | ~1 hour | none |
| **7. Domain** | Register `pgbelectronica.cl` + point DNS + SSL | ~1 hour | owner buys domain (~$10/yr) |
| **8. Offline bridge** | 9 QR codes (cards, truck, flyers) | ~1 hour + printing | owner |

**Recommended minimum:** Phases 1–3, plus **6 (analytics + Search Console)** — without them we're making changes blind. If the owner wants to look serious to industrial buyers, **7 (real domain)** is the single most visible upgrade. QR codes (8) are the cheapest offline marketing he can do.

---

## Owner-Friendly Checklist (print this for Pedro)

- [ ] Confirm business hours for Google listing
- [ ] Confirm Google Business Profile exists / create it
- [ ] Collect 5–10 photos of real jobs (control panels, repairs, solar)
- [ ] Ask 3–5 recent customers for Google reviews
- [ ] Decide which services deserve the most prominent marketing

---

# Additional Growth Features

## 6. Open Graph Tags

**Why it matters:** Pedro promotes the site on Facebook and LinkedIn. Right now, every link he shares renders as a bare URL with no preview. Open Graph (OG) tags give the share a proper image, title, and description — so his best *free* advertising channel looks professional instead of broken. It also sets the preview for WhatsApp shares, which in Chile is how the link will actually travel.

### What to add

Add these to the `<head>` of **every page** (in `index.html`, `about.html`, `service.html`, `contact.html`, and `404.html`):

```html
<meta property="og:type" content="website">
<meta property="og:site_name" content="PGB Electrónica Industrial">
<meta property="og:title" content="PGB Electrónica Industrial | Reparación y Automatización Industrial en La Serena">
<meta property="og:description" content="Más de 30 años reparando variadores de velocidad, tableros de control, soldadoras y sistemas de energía solar. Emergencias 24/7.">
<meta property="og:image" content="img/og-image.png">
<meta property="og:url" content="https://pgb-electronics.vercel.app/">
<meta property="og:locale" content="es_CL">
```

Per-page tweaks:
- `og:title` — match the page (e.g., on `service.html`: "Servicios de Electrónica Industrial | PGB Electrónica")
- `og:url` — the canonical URL of that page
- `og:image` — **critical**: must be an image ≥ 1200×630 px, or Facebook/WhatsApp will refuse to render it. Create `img/og-image.png` from a strong photo (a control panel he built, or the logo on a clean background). This image is the share's thumbnail, so it should sell the business in one glance.

### Verification
After deploying, test at https://developers.facebook.com/tools/debug/ and https://www.linkedin.com/post-inspector/ — both show exactly what the preview will look like.

---

## 7. FAQ Section

**Why it matters:** Every day Pedro answers the same questions by phone. Putting those answers on the site (a) saves his time, (b) answers objections *before* a cautious buyer even calls, and (c) FAQ content unlocks FAQ rich results in Google — extra search visibility for free.

### Content — the questions he actually gets

Start with these (confirm with Pedro, and add his real answers):

| Question | Suggested answer |
|---|---|
| ¿Visitan a terreno o hay que llevar el equipo? | Ambas opciones. Reparaciones de equipos se pueden hacer en taller, y atendemos visitas a terreno en La Serena, Coquimbo y alrededores. |
| ¿Dan garantía por la reparación? | Sí, las reparaciones tienen garantía. El detalle se entrega al momento de cotizar. |
| ¿Qué marcas de soldadoras reparan? | Kemppi, Powcon, Lincoln, Esab, Miller, Tellwin, M&H, entre otras. |
| ¿Trabajan en otras ciudades? | Sí, realizamos trabajos en toda la región de Coquimbo. Consulte por disponibilidad. |
| ¿Trabajan con empresas o solo particulares? | Ambos. Atendemos industrias, maestranzas, empresas agrícolas y particulares. |
| ¿Hacen instalación de sistemas solares y bombeo? | Sí, asesoría, instalación y ejecución de proyectos fotovoltaicos, eólicos, riego y bombeo solar, on y off grid. |
| ¿Cómo puedo cotizar? | Por formulario de contacto, WhatsApp o llamando al +56932735031. |

### Where to put it

Two options (can do both):
- **Homepage section** (recommended): an accordion using Bootstrap's built-in collapse — 5–6 questions right below the testimonials. No new JS needed.
- **Contact page**: the same accordion above the contact form, so people self-answer before writing in.

### Bonus — FAQ structured data

Google can show FAQ answers directly in search results (extra real estate, higher click-through). Add a `FAQPage` JSON-LD block alongside the LocalBusiness schema from point 1b. Note: Google only shows FAQ rich results for well-established pages, so this compounds with point 1 over time.

---

## 8. Service Areas + Sticky Mobile Call Button

### 8a. Service areas list

**Why it matters:** Many searches are "técnico electrónico en *[ciudad]*" or "reparación de variadores *[ciudad]*". A visible service-area list lets Google match those local queries to Pedro's site — and tells visitors "yes, they come to us."

Add a **"Zonas de Servicio"** block to `contact.html` (and/or a footer strip on every page):

```
Atendemos en: La Serena • Coquimbo • Ovalle • Vicuña • Andacollo • Illapel • La Higuera • Paihuano
```

Confirm the actual coverage area with Pedro — only list places he genuinely serves (Google punishes fake local signals).

Pair it with a **"Cómo llegar"** link to Google Maps (from point 1c).

### 8b. Sticky mobile call button

**Why it matters:** Pedro's headline offer is "EMERGENCIA 24/7". A visitor whose plant is down is on their phone, in a hurry, and the call button is currently buried in the header. On mobile it should be **one thumb-tap, always on screen**.

```css
.mobile-call-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  display: flex;
}
.mobile-call-bar .call-btn,
.mobile-call-bar .wa-btn {
  flex: 1;
  padding: 14px 0;
  color: #fff;
  font-weight: 600;
  text-align: center;
}
.mobile-call-bar .call-btn { background: #0d6efd; }   /* primary */
.mobile-call-bar .wa-btn  { background: #25D366; }   /* whatsapp green */
```

```html
<!-- Show only on mobile -->
<div class="mobile-call-bar d-lg-none">
  <a class="call-btn" href="tel:+56932735031"><i class="fa fa-phone-alt"></i> Llamar 24/7</a>
  <a class="wa-btn" target="_blank" href="https://wa.me/56932735031?text=Hola%2C%20tengo%20una%20emergencia"><i class="fab fa-whatsapp"></i> WhatsApp</a>
</div>
```

Caveat: the floating WhatsApp button from point 2 (bottom-right) and this bottom bar can collide — use **one or the other**. Recommended: use this bottom bar on mobile (it's more prominent and includes the phone number), keep the floating button on desktop only.

---

## 9. Bridge Offline → Online (QR Codes)

**Why it matters:** Pedro is a technician — his best marketing happens in person: at a factory gate, a parking lot, leaving a card with a plant manager. A printed QR code turns every one of those moments into a *trackable WhatsApp conversation*, which is the site's most valuable conversion. This is the cheapest offline-to-online bridge in existence, and it requires zero technical skill from him — he just shows the card.

### What to print

1. **WhatsApp QR** → `https://wa.me/56932735031?text=Hola%20Pedro%2C%20lo%20encontr%C3%A9%20por%20su%20tarjeta` — pre-filled so he immediately knows the contact came from the card
2. **Website QR** → links to the homepage (for people who want to see services first)

### Where to put them

- Business cards (QR + logo + number is a complete modern card)
- His work truck (a vinyl sticker panel)
- Flyers / invoices / delivery notes
- The website itself — a printable "contact card" section on `contact.html` visitors can screenshot

### How to generate

- Free tools: `https://www.qr-code-generator.com/` or Python's `qrcode` library (works offline)
- **Never hand-print from a photo** — always use a generator so the QR is scannable

### Bonus — track the source

Each printed QR can carry a different pre-filled message (tarjeta vs. camioneta vs. factura). Over a few months, Pedro sees *which physical channel* brings the most WhatsApp contacts — his next ad spend goes there.

---

## 10. Small Polish Items

### 10a. 404 page (currently generic template)

`404.html` is stock template text. Make it useful:
- A friendly Spanish message: "La página que buscas no existe"
- Buttons back to **INICIO**, **SERVICIOS**, and **CONTACTO**
- The emergency phone number + WhatsApp, since a lost visitor is still a potential lead

### 10b. Compress images

The hero carousel and service photos (`img/car*.jpg`, `img/sir*.jpg`, `img/about*.jpg`) are likely multi-MB originals. Compress to web-optimized sizes (e.g., 1920px wide for heroes, ~150 KB each):
- Faster load = better mobile conversion **and** a Google ranking factor
- Free tools: Squoosh (https://squoosh.app) or `npx sharp-cli` for batch processing
- Bonus: convert to WebP (with JPG fallback) for ~30% smaller files

### 10c. Response-time expectation on the contact form

Add under the submit button: "**Te respondemos en menos de 24 horas.**" Sets expectations, reduces "did they get my message?" abandonment, and is a quiet trust signal.

### 10d. Language consistency

The site is Spanish with a few English stragglers in the template (e.g., the spinner's `role="alert"` is fine, but check for visible template English like untranslated placeholder text or button labels). A full sweep is cheap and matters for credibility.

### 10e. Mobile menu polish

Verify the hamburger menu opens cleanly on all phones and that the 24/7 number in the header wraps gracefully on narrow screens (currently a long string that can overflow). Minor, but it's the first thing a mobile visitor touches.

---

# Advanced Features

## 11. AI Lead-Capture Chatbot (Top Recommendation)

**Why it matters:** Pedro's entire pitch is "EMERGENCIA 24/7" — but one person cannot answer a chat or WhatsApp message at 3 a.m. A chatbot covers the overnight hours, answers the questions from the FAQ (section 7), qualifies whether the visitor needs a repair, a quote, or an emergency, and — when it's real work — captures the name, phone number, and equipment, then hands the lead to Pedro with a pre-filled WhatsApp message ready to send.

The goal is **not** to replace Pedro. The goal is to make sure no lead is lost when he's asleep, on a job, or at the bench.

### 11a. Two implementation options

**Option A — Rules-based (recommended core):**
- A chat widget on the site matching keywords against the FAQ table
- Deterministic, zero hallucination risk, ~100 lines of JS, free to host
- Flow: visitor asks → match keyword → return canned answer → offer "¿Quieres que te contacte Pedro?" → capture form → generate pre-filled WhatsApp link

**Option B — LLM via Cloudflare Workers AI:**
- Grounded on the site's service data (variadores, tableros, soldadoras, solar, bombeo)
- Uses a small model (e.g., Llama 3.1 8B) with a hard system prompt: *only answer from known facts; if unsure, say so and offer WhatsApp*
- More natural conversations, slightly more risk of a wrong answer — mitigated by the guardrail above

**Recommended:** Rules-based core with an LLM polish layer on top. The rules handle the high-volume repetitive questions; the LLM handles phrasing variance.

### 11b. Core lead-capture flow

1. Visitor opens chat (floating button, mobile-optimized)
2. Bot greets: "Hola, soy el asistente de PGB Electrónica. ¿Necesitas una reparación, una cotización o es una emergencia?"
3. Branch on intent:
   - **Repair** → "¿Qué equipo es? ¿Marca? ¿Qué síntomas presenta?" → offer WhatsApp deep-link with details pre-filled
   - **Quote** → "¿Qué servicio te interesa?" → route to the contact form with the service pre-selected (section 3)
   - **Emergency** → immediately surface the phone number + WhatsApp
4. If the visitor provides contact info, bot confirms: "Te contacto en menos de 24 horas" and sends a **push notification to Pedro** (see section 12 — lead engine) or drops a pre-filled WhatsApp message

### 11c. Guardrails (non-negotiable)

- Never invent prices, warranty terms, or service areas — only answer from the approved FAQ + services data
- Always offer an escape hatch to a human: WhatsApp button, phone number, contact form
- Log every conversation (at minimum the captured lead) so nothing falls through the cracks
- No personal data retention beyond what's needed to follow up

### 11d. Where to build it

- **Widget:** Cloudflare Worker serving the chat UI as a snippet + API endpoint. No third-party SaaS needed, no monthly cost.
- **LLM (if Option B):** Cloudflare Workers AI — free tier is generous, and the model runs on Cloudflare's edge, so no external API keys or per-message fees to manage.
- **Storage:** Cloudflare D1 for lead records (optional in the simplest version).

### 11e. Effort & maintenance

| | Rules-based | + LLM layer |
|---|---|---|
| Build time | ~1 day | +1 day |
| Monthly cost | $0 (static + Worker) | ~$0 (Workers AI free tier) |
| Maintenance | Update FAQ table | Update system prompt when services change |

**The payoff:** every overnight visitor gets an answer, every real lead is captured, and Pedro wakes up to a queue of qualified WhatsApp conversations instead of missed calls.

---

# Deploying PGB Electrónica on Cloudflare (Free)

## 12. Deployment Guide — Cloudflare Pages (Free)

**Why Cloudflare:** The site is fully static (HTML/CSS/JS + EmailJS in the browser), so it's a perfect fit for **Cloudflare Pages** — Cloudflare's free static hosting. You get a global CDN, automatic HTTPS, and a `*.pages.dev` URL with **zero hosting cost**. Vercel (where it's currently live) also works, but Cloudflare has a better free tier: unlimited bandwidth on static assets, no build-time limits, and 500 builds/month free.

### 12a. What "free" includes

| Resource | Free tier | What we use it for |
|---|---|---|
| Cloudflare Pages | Unlimited static bandwidth | Hosting the HTML/CSS/JS site |
| Custom domain + SSL | Free (domain itself costs ~$10/yr) | `pgbelectronica.cl` |
| Cloudflare Web Analytics | Free, unlimited, privacy-friendly | Visitor stats (no cookie banner needed) |
| Workers | 100,000 requests/day free | Chatbot API (section 11), lead engine (future) |
| Workers AI | 10,000 neurons/day free | LLM layer for the chatbot |
| D1 (SQLite) | 5 GB storage, 5M reads/day free | Lead capture, repair-status (future) |

Total monthly cost: **$0** — the only optional spend is the ~$10/year domain name.

### 12b. Prerequisites

1. **A Cloudflare account** — free at https://dash.cloudflare.com/sign-up
2. **The repo on GitHub** — already done (https://github.com/azubair2012/PGB_electronics)
3. **Node.js** (for `wrangler`) — already on this machine
4. No credit card required for any of the above

### 12c. Option A — Deploy via the dashboard (no code, recommended for Pedro)

The simplest path requires no command line at all:

1. Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Authorize Cloudflare to read the `azubair2012/PGB_electronics` GitHub repo
3. Cloudflare auto-detects the project. Set:
   - **Build command:** leave empty (no build step — it's plain HTML)
   - **Build output directory:** `/` (the repo root — index.html lives there)
4. Click **Save and Deploy**
5. Done — the site is live at `https://pgb-electronics.pages.dev` (project name can be customized)

Every future `git push` to `main` **auto-redeploys** the site. Pedro never touches the dashboard again.

### 12d. Option B — Deploy via Wrangler CLI (for us, when iterating)

When we're iterating on the code we can deploy directly from the terminal:

```bash
# 1. Install Wrangler (one-time, in the project folder)
npm install -D wrangler@latest

# 2. Log in to Cloudflare
npx wrangler login

# 3. Create the Pages project (one-time)
npx wrangler pages project create pgb-electronics

# 4. Deploy the static files
npx wrangler pages deploy . --project-name pgb-electronics

# Preview before going live
npx wrangler pages deploy . --project-name pgb-electronics --branch preview
```

> Note: `wrangler pages deploy` uploads the whole folder. To keep it clean, add a `.gitignore` with `node_modules/` and `wrangler.toml`/`.wrangler/` if created.

### 12e. Custom domain (the ~$10/yr upgrade worth doing)

`pgb-electronics.pages.dev` works but looks like a test site to industrial buyers. A `.cl` domain — e.g. `pgbelectronica.cl` — is ~$10/year and signals "real company."

**Register + connect in one place (easiest):**
1. In Cloudflare dashboard: **Workers & Pages** → your project → **Custom domains** → **Add custom domain**
2. Follow the prompt to register `pgbelectronica.cl` (or add an existing domain)
3. Cloudflare sets up DNS + SSL automatically; HTTPS is on by default

**If the domain is registered elsewhere (e.g., GoDaddy, NIC.cl):**
1. Add the domain to Cloudflare: **Add a site** → enter the domain → free plan
2. Cloudflare gives you two nameservers (e.g., `anna.ns.cloudflare.com`)
3. Update the nameservers at the registrar to point to Cloudflare
4. Wait 5 minutes–24 hours for propagation
5. Back in the Pages project: **Custom domains** → **Add** → choose `pgbelectronica.cl`
6. Cloudflare automatically creates a CNAME to `pgb-electronics.pages.dev` and issues an SSL cert

Then update the `og:url`, `canonical`, and schema.org `url` fields (from sections 1b and 6) to the new domain.

### 12f. Connect Google Search Console (so Google actually indexes it)

Without this, none of the SEO work in section 1 pays off:

1. Go to https://search.google.com/search-console → **Add property** → **URL prefix**
2. Enter the site URL (e.g., `https://pgb-electronics.pages.dev` or the custom domain)
3. Verify ownership — easiest on Cloudflare: add a **TXT record** with the verification token in the DNS dashboard. (Cloudflare also offers a one-click Google Search Console verification for some setups.)
4. Submit the sitemap once it exists (below)

**Sitemap + robots.txt** (a tiny addition to the repo root):

```xml
<!-- sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://pgbelectronica.cl/</loc><changefreq>monthly</changefreq></url>
  <url><loc>https://pgbelectronica.cl/about.html</loc></url>
  <url><loc>https://pgbelectronica.cl/service.html</loc></url>
  <url><loc>https://pgbelectronica.cl/contact.html</loc></url>
</urlset>
```

```
# robots.txt
User-agent: *
Allow: /
Sitemap: https://pgbelectronica.cl/sitemap.xml
```

Submit `sitemap.xml` in Search Console → **Sitemaps** → `https://pgbelectronica.cl/sitemap.xml`.

### 12g. Turn on Cloudflare Web Analytics (free, 5 minutes)

- Dashboard → **Analytics & Logs** → **Web Analytics** → **Add a site**
- Copy the beacon snippet and paste it into the `<head>` of every page (or just `index.html` + `contact.html` if we want to be minimal)
- No cookie consent banner needed — it's cookieless and privacy-friendly, which also keeps the site legal-simple for Chile's data rules
- Pedro can see: page views, top pages, where visitors come from, and which devices — the data that tells us whether the SEO work is paying off

### 12h. The advanced features, also free (section 11 fits right in)

The chatbot from section 11 deploys as a **Worker** in the same account:

```bash
# Create the Worker (e.g., chat-api) and bind Workers AI + D1
npx wrangler init chat-api
npx wrangler d1 create pgb-leads
```

Config snippet for `chat-api/wrangler.jsonc`:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "chat-api",
  "main": "src/index.ts",
  "compatibility_date": "2026-01-01",
  "ai": { "binding": "AI" },
  "d1_databases": [
    { "binding": "DB", "database_name": "pgb-leads", "database_id": "<DB_ID>" }
  ]
}
```

Deploy with `npx wrangler deploy`. The chat widget on the site calls this Worker's endpoint (e.g., `https://chat-api.<subdomain>.workers.dev/api/chat`). All within the free tiers listed in 12a.

### 12i. Rollback & safety

- Every Pages deployment is kept as a version — dashboard → **Deployments** → **Rollback to this deployment** restores the last good build in one click
- Workers support `wrangler rollback` if the chatbot misbehaves
- Because deployments are immutable snapshots, a bad push can never permanently break the live site

### 12j. Step-by-step checklist

- [ ] Create free Cloudflare account
- [ ] Deploy site to Pages (Option A dashboard, 5 min)
- [ ] Verify live at `pgb-electronics.pages.dev`
- [ ] Register `pgbelectronica.cl` + connect custom domain (~$10/yr)
- [ ] Update `og:url`/canonical/schema `url` to the new domain
- [ ] Add `sitemap.xml` + `robots.txt` to repo
- [ ] Connect Google Search Console + submit sitemap
- [ ] Add Cloudflare Web Analytics beacon
- [ ] (Later) Deploy chatbot Worker from section 11
- [ ] Set up GitHub auto-deploy (already automatic once connected)

**Bottom line:** The full stack — static site, CDN, HTTPS, custom domain, analytics, chatbot, and database — runs on Cloudflare's free tier for **$0/month** (plus ~$10/year for the domain). It's the cheapest possible way to give Pedro a professional, trackable, 24/7 web presence.
