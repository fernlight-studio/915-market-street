/* =========================================================
   EDIT YOUR LISTING DETAILS HERE
   Anything left as an empty string "" is hidden on the page.
   ========================================================= */
const LISTING = {
  beds: "5",
  baths: "5.5",
  sqft: "4,378",
  lot: "4,983 sq ft",
  yearBuilt: "2024",
  garage: "3-car",

  phone: "",
  email: "915marketstreetkirkland@gmail.com",  // the showing form sends to this address

  openHouse: "",                    // e.g. "Open house: Sat Dec 6 & Sun Dec 7, 1–4 pm"

  goatcounter: "915market",                // GoatCounter site code, e.g. "915market" → visitor stats at https://915market.goatcounter.com
};

/* ---------- Visitor stats (GoatCounter: no cookies, no personal data) ---------- */
if (LISTING.goatcounter) {
  const gc = document.createElement("script");
  gc.async = true;
  gc.src = "https://gc.zgo.at/count.js";
  gc.dataset.goatcounter = `https://${LISTING.goatcounter}.goatcounter.com/count`;
  document.head.append(gc);
}
/* Count an action (brochure download, tour request…) as an event in GoatCounter */
function track(name, title) {
  const send = () => window.goatcounter?.count?.({ path: name, title: title || name, event: true });
  if (!LISTING.goatcounter) return;
  if (window.goatcounter?.count) send(); else window.addEventListener("load", () => setTimeout(send, 500), { once: true });
}
document.addEventListener("click", (e) => {
  const a = e.target.closest("a, button");
  if (!a) return;
  if (a.matches('a[href*="Brochure.pdf"]')) track("brochure-download", "Downloaded the brochure");
  else if (a.matches('a[href="#contact"]')) track("tour-button", `Clicked: ${a.textContent.trim()}`);
  else if (a.matches("[data-cat]")) track(`gallery-${a.dataset.cat}`, `Opened gallery tab: ${a.textContent.trim()}`);
  else if (a.matches('a[href^="mailto:"]')) track("email-link", "Clicked the email address");
  else if (a.matches('a[href*="youtu"]')) track("youtube-link", "Opened the full walk-through on YouTube");
});
document.querySelector(".video-frame video")?.addEventListener("play", () => track("film-play", "Played the 45-second film"), { once: true });

document.documentElement.classList.add("js");

/* Photos: [file, category, caption]. A number means images/photo-NN.webp. */
const PHOTOS = [
  [24, "exterior", "Twilight exterior, with Lake Washington beyond"],
  [1, "exterior", "Front entry with wood siding and landscaped approach"],
  [15, "exterior", "Rear elevation with stacked decks and glass garage door"],
  [13, "exterior", "Decks linked by an exterior spiral stair"],
  [6, "exterior", "Upper and lower decks with heaters, at dusk"],
  [8, "living", "Extra-large room with walls of glass, ideal as an office"],
  [3, "living", "Great room flowing into the kitchen"],
  [7, "living", "Great room with fireplace"],
  [4, "living", "Living area with floor-to-ceiling windows"],
  [23, "living", "Family room"],
  [37, "living", "Open plan living and dining"],
  [38, "living", "Seating area off the great room"],
  [17, "living", "Dining area opening to the living room"],
  [5, "views", "The covered upper deck, with heaters, where the sunset photos were taken"],
  [28, "views", "Covered deck with heaters, usable year-round"],
  ["view-01.jpg", "views", "From the upper deck: sunset over Lake Washington and the Seattle skyline"],
  ["view-02.jpg", "views", "From the upper deck: evening light over the lake"],
  ["view-03.jpg", "views", "From the upper deck: the Olympics on the horizon"],
  ["view-04.jpg", "views", "From the upper deck: evening sky over the lake"],
  [33, "kitchen", "Kitchen island with pendant lighting"],
  [30, "kitchen", "Kitchen and dining under one open ceiling"],
  [27, "kitchen", "Dining area beside the kitchen"],
  [9, "kitchen", "Kitchen cabinetry and storage"],
  [12, "bedrooms", "Main-level bedroom"],
  [14, "bedrooms", "Bedroom with large windows"],
  [16, "bedrooms", "Bedroom"],
  [21, "bedrooms", "Bedroom"],
  [32, "bedrooms", "Bedroom"],
  [26, "bedrooms", "Primary bedroom closet"],
  [20, "baths", "Primary bathroom"],
  [25, "baths", "Bathroom with freestanding soaking tub"],
  [31, "baths", "Bath with walk-in shower"],
  [18, "baths", "Floating vanity"],
  [19, "baths", "Bathroom"],
  [11, "baths", "Frameless glass shower"],
  [35, "baths", "Bathroom"],
  [36, "baths", "Powder room"],
  [10, "more", "Open-tread staircase with skylight"],
  [22, "more", "Staircase connecting all three levels"],
  [29, "more", "Entry with view to the stairs"],
  [2, "more", "Entry storage"],
  [34, "more", "Gym"],
];

/* Floor plans, shown in their own gallery tab */
const PLANS = [
  ["floorplan-main.jpg", "plans", "Main level: entry, great room, dining, kitchen with walk-in pantry, office, guest suite with bath, powder room, outdoor living deck"],
  ["floorplan-upper.jpg", "plans", "Upper level: primary bedroom with deck, primary bath, walk-in closet, two bedrooms, two baths, laundry"],
  ["floorplan-lower.jpg", "plans", "Lower level: media room, wine room, gym/bonus room, bath, mudroom, 3-car garage"],
];

/* The six photos the gallery opens on, in this order */
const FEATURED = [24, 7, 5, "view-01.jpg", 33, 20];

const CATEGORIES = {
  featured: "Highlights", all: "All photos", exterior: "Exterior", living: "Living", views: "Deck & Views", kitchen: "Kitchen & Dining", bedrooms: "Bedrooms", baths: "Bathrooms", more: "More", plans: "Floor Plans",
};

const src = (f) => typeof f === "number" ? `images/photo-${String(f).padStart(2, "0")}.webp` : `images/${f}`;

/* ---------- Fill in listing details ---------- */
const facts = [
  [LISTING.beds, "Bedrooms"], [LISTING.baths, "Bathrooms"], [LISTING.sqft, "Sq Ft"],
  [LISTING.lot, "Lot"], [LISTING.yearBuilt, "Built"], [LISTING.garage, "Garage · EV"],
].filter(([v]) => v);
document.getElementById("facts").innerHTML = facts
  .map(([v, l]) => `<li><strong>${v}</strong><span>${l}</span></li>`).join("");

if (LISTING.openHouse) {
  document.getElementById("open-house").innerHTML = `<p class="open-house">${LISTING.openHouse}</p>`;
}
document.getElementById("contact-list").innerHTML = [
  LISTING.phone && `<li><a href="tel:${LISTING.phone.replace(/[^\d+]/g, "")}">${LISTING.phone}</a></li>`,
  LISTING.email && `<li><a href="mailto:${LISTING.email}">${LISTING.email}</a></li>`,
].filter(Boolean).join("");

/* ---------- Gallery ---------- */
const grid = document.getElementById("gallery-grid");
const filterBar = document.getElementById("filters");
let visible = PHOTOS;

const viewAll = document.getElementById("view-all");
const plansNote = document.getElementById("plans-note");
const lb = document.getElementById("lightbox");

function renderGallery(cat) {
  if (cat === "featured") visible = FEATURED.map((f) => PHOTOS.find((p) => p[0] === f));
  else if (cat === "plans") visible = PLANS;
  else visible = cat === "all" ? PHOTOS : PHOTOS.filter((p) => p[1] === cat);
  grid.classList.toggle("featured", cat === "featured");
  grid.classList.toggle("plans", cat === "plans");
  plansNote.hidden = cat !== "plans";
  lb.classList.toggle("plans", cat === "plans");
  grid.innerHTML = visible.map(([f, , caption], i) =>
    `<button class="tile" data-i="${i}"><img src="${src(f)}" alt="${caption}" loading="lazy">` +
    `<span class="tile-caption">${cat === "plans" ? caption.split(":")[0] : caption}</span></button>`).join("");
  filterBar.querySelectorAll("button").forEach((b) =>
    b.setAttribute("aria-selected", b.dataset.cat === cat));
  viewAll.hidden = cat !== "featured";
}

filterBar.innerHTML = Object.entries(CATEGORIES)
  .map(([k, v]) => `<button role="tab" data-cat="${k}">${v}</button>`).join("");
filterBar.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (b) renderGallery(b.dataset.cat);
});
viewAll.textContent = `View all ${PHOTOS.length} photographs`;
viewAll.addEventListener("click", () => renderGallery("all"));
renderGallery("featured");

/* ---------- Lightbox ---------- */
const lbImg = lb.querySelector("img");
const lbCount = lb.querySelector(".lb-count");
let idx = 0;

function show(i) {
  idx = (i + visible.length) % visible.length;
  const [n, , alt] = visible[idx];
  lbImg.src = src(n);
  lbImg.alt = alt;
  lbCount.textContent = `${idx + 1} / ${visible.length} · ${alt}`;
}
grid.addEventListener("click", (e) => {
  const t = e.target.closest(".tile");
  if (!t) return;
  show(+t.dataset.i);
  lb.hidden = false;
  document.body.style.overflow = "hidden";
});
function closeLb() { lb.hidden = true; document.body.style.overflow = ""; }
lb.querySelector(".lb-close").onclick = closeLb;
lb.querySelector(".lb-prev").onclick = () => show(idx - 1);
lb.querySelector(".lb-next").onclick = () => show(idx + 1);
lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
document.addEventListener("keydown", (e) => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowLeft") show(idx - 1);
  if (e.key === "ArrowRight") show(idx + 1);
});
let touchX = null;
lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; });
lb.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
  touchX = null;
});

/* ---------- Showing request form ----------
   Sends straight to LISTING.email through FormSubmit (formsubmit.co), a free
   form-to-email service. The very first request sends an activation email to
   that address; click the link in it once and later requests arrive normally. */
// FormSubmit alias for LISTING.email, so the address is not exposed to scrapers in the form endpoint
const FORM_ID = "94a3718c438949bb9585c9b9c9ac7267";
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const sendBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = new FormData(form);
  if (f.get("_honey")) return; // spam bot filled the hidden field

  sendBtn.disabled = true;
  sendBtn.textContent = "Sending…";
  formStatus.className = "form-status";
  formStatus.textContent = "";

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${FORM_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `${f.get("intent")}: ${f.get("name")} — 915 Market St`,
        _replyto: f.get("email"),
        _template: "table",
        Request: f.get("intent"),
        Name: f.get("name"),
        Email: f.get("email"),
        Phone: f.get("phone") || "—",
        "Preferred time": f.get("when") || "—",
        Message: f.get("message") || "—",
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === "false" || data.success === false) throw new Error(data.message);

    form.reset();
    formStatus.classList.add("ok");
    formStatus.textContent = "Thank you! Your message was sent. We'll be in touch soon.";
    track(`form-sent`, `Form sent: ${f.get("intent")}`);
    sendBtn.textContent = "Sent";
  } catch {
    formStatus.classList.add("err");
    formStatus.innerHTML = `Your request didn't go through. Please try again, or email us at
      <a href="mailto:${LISTING.email}">${LISTING.email}</a>.`;
    sendBtn.disabled = false;
    sendBtn.textContent = "Send";
  }
});

/* Buttons with data-intent preselect the matching request type in the form */
document.querySelectorAll("[data-intent]").forEach((a) => a.addEventListener("click", () => {
  form.elements.intent.value = a.dataset.intent;
}));

/* ---------- Section navigation: top tabs + floating menu ---------- */
const SECTIONS = [
  ["gallery", "Photos"], ["home", "Home & Video"], ["views", "Views"],
  ["highlights", "Highlights"], ["details", "Details"], ["location", "Location"], ["schools", "Schools"],
  ["neighborhood", "Neighborhood"], ["owners", "Owners' Note"], ["pricing", "Pricing"],
  ["process", "How It Works"], ["contact", "Contact"],
].filter(([id]) => document.getElementById(id));

const nav = document.getElementById("nav");
const tabs = document.getElementById("tabs");
const fab = document.getElementById("section-fab");
const menu = document.getElementById("section-menu");
const menuList = document.getElementById("section-menu-list");

tabs.innerHTML = SECTIONS.map(([id, label]) => `<a href="#${id}" data-id="${id}">${label}</a>`).join("");
menuList.innerHTML = SECTIONS.map(([id, label]) => `<li><a href="#${id}" data-id="${id}">${label}</a></li>`).join("");

function setMenu(open) {
  menu.hidden = !open;
  fab.setAttribute("aria-expanded", open);
  fab.classList.toggle("open", open);
}
fab.addEventListener("click", (e) => { e.stopPropagation(); setMenu(menu.hidden); });
menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("click", (e) => { if (!menu.hidden && !menu.contains(e.target)) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { setMenu(false); fab.focus(); } });

/* Highlight the section currently in view */
let activeId = null;
function setActive(id) {
  if (id === activeId) return;
  activeId = id;
  document.querySelectorAll("#tabs a, #section-menu-list a").forEach((a) => {
    const on = a.dataset.id === id;
    a.classList.toggle("active", on);
    if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
  });
  const tab = tabs.querySelector(`a[data-id="${id}"]`);
  if (tab) {
    // keep the active tab visible in the scrolling tab strip without moving the page
    const left = tab.offsetLeft - (tabs.clientWidth - tab.offsetWidth) / 2;
    tabs.scrollTo({ left, behavior: "smooth" });
  }
}

function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle("solid", y > 60);
  fab.hidden = y < window.innerHeight * 0.6;
  if (fab.hidden) setMenu(false);

  // the active section is the last one whose top has passed a line 35% down the screen
  const line = y + window.innerHeight * 0.35;
  let current = null;
  for (const [id] of SECTIONS) {
    const el = document.getElementById(id);
    if (el.getBoundingClientRect().top + y <= line) current = id;
  }
  if (window.innerHeight + y >= document.documentElement.scrollHeight - 4) current = SECTIONS.at(-1)[0];
  setActive(current);
}
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
onScroll();


/* ---------- Gentle reveal as sections scroll into view ---------- */
const revealIO = "IntersectionObserver" in window && new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); revealIO.unobserve(en.target); } });
}, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
document.querySelectorAll(".reveal").forEach((el) => revealIO ? revealIO.observe(el) : el.classList.add("in"));
