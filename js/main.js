/* =========================================================
   MAISON CROIX — storefront interactions
   ========================================================= */

/* ---------- Hand-chain SVG art ----------
   A stylised "hand chain": a ring (top) linked by draped chains
   to a bracelet (bottom), with a hand-set cross at the centre.
   `variant` = "gold" | "silver". `id` keeps gradients unique. */
function handChainSVG(variant, id) {
  const gold = {
    a: "#F3E2A8", b: "#D9B65C", c: "#A9812F", line: "#C7A24B", glow: "#8A6A24"
  };
  const silver = {
    a: "#FFFFFF", b: "#C9CDD2", c: "#8A9099", line: "#AEB3B9", glow: "#6E747C"
  };
  const m = variant === "silver" ? silver : gold;
  const g = `mc-${variant}-${id}`;

  return `
  <svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${variant} cross hand chain">
    <defs>
      <linearGradient id="${g}-metal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${m.a}"/>
        <stop offset="0.5" stop-color="${m.b}"/>
        <stop offset="1" stop-color="${m.c}"/>
      </linearGradient>
      <radialGradient id="${g}-bead" cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stop-color="${m.a}"/>
        <stop offset="1" stop-color="${m.c}"/>
      </radialGradient>
    </defs>

    <!-- bracelet (bottom, around wrist) -->
    <ellipse cx="100" cy="206" rx="58" ry="20" fill="none"
      stroke="url(#${g}-metal)" stroke-width="6"/>
    <ellipse cx="100" cy="206" rx="58" ry="20" fill="none"
      stroke="${m.glow}" stroke-width="1" opacity="0.4"/>

    <!-- ring (top, on finger) -->
    <ellipse cx="100" cy="34" rx="20" ry="9" fill="none"
      stroke="url(#${g}-metal)" stroke-width="5"/>

    <!-- draped chains from ring to bracelet -->
    <path d="M86 36 C 60 90, 58 150, 70 192" fill="none"
      stroke="url(#${g}-metal)" stroke-width="2.4" stroke-dasharray="1.5 4"
      stroke-linecap="round"/>
    <path d="M114 36 C 140 90, 142 150, 130 192" fill="none"
      stroke="url(#${g}-metal)" stroke-width="2.4" stroke-dasharray="1.5 4"
      stroke-linecap="round"/>
    <path d="M100 43 C 100 95, 100 130, 100 150" fill="none"
      stroke="url(#${g}-metal)" stroke-width="2.4" stroke-dasharray="1.5 4"
      stroke-linecap="round"/>

    <!-- centre bead where the cross hangs -->
    <circle cx="100" cy="150" r="6" fill="url(#${g}-bead)"/>

    <!-- the cross -->
    <g transform="translate(100 178)">
      <rect x="-6" y="-26" width="12" height="52" rx="3" fill="url(#${g}-metal)"/>
      <rect x="-20" y="-10" width="40" height="12" rx="3" fill="url(#${g}-metal)"/>
      <rect x="-6" y="-26" width="4" height="52" rx="2" fill="${m.a}" opacity="0.5"/>
    </g>

    <!-- sparkle -->
    <g fill="#fff" opacity="0.9">
      <path d="M150 70 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z"/>
      <circle cx="56" cy="120" r="1.6"/>
    </g>
  </svg>`;
}

/* ---------- Product catalogue ----------
   `newest: true` is showcased in the featured slot at the top. */
const PRODUCTS = [
  { id: "nova",     name: "Nova",     metal: "gold",   price: 365, tag: "Newest", newest: true,
    desc: "Our latest piece — a luminous 18k drape finished with a faceted cross that catches every light." },
  { id: "aurelia",  name: "Aurélia",  metal: "gold",   price: 285, tag: "Bestseller",
    desc: "Featherweight 18k chains draped to a single hand-set cross." },
  { id: "seraphine", name: "Séraphine", metal: "gold",  price: 340, tag: "New",
    desc: "A double-strand drape for a richer fall of gold across the hand." },
  { id: "lumiere",  name: "Lumière",  metal: "gold",   price: 395, tag: "Atelier",
    desc: "Our signature piece — heavier links, a bolder cross." },
  { id: "celeste",  name: "Céleste",  metal: "silver", price: 245, tag: "Bestseller",
    desc: "Cool sterling silver with a delicate fine-link drape." },
  { id: "lune",     name: "Lune",     metal: "silver", price: 290, tag: "New",
    desc: "Moon-bright 925 silver, finished with a slim Latin cross." },
  { id: "ivoire",   name: "Ivoire",   metal: "silver", price: 320, tag: "Atelier",
    desc: "Hand-polished sterling, the quietest piece in the house." },
];

const money = (n) => "$" + n.toLocaleString("en-US");

/* Roman numerals — used for every number on the site except prices. */
function toRoman(num) {
  const map = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],
    [50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
  let out = "";
  for (const [v, s] of map) { while (num >= v) { out += s; num -= v; } }
  return out;
}

const FOUNDED = 2026; // MMXXVI

/* ---------- Render featured (newest) showcase ---------- */
const featuredEl = document.getElementById("featured");

function renderFeatured() {
  const p = PRODUCTS.find((x) => x.newest) || PRODUCTS[0];
  featuredEl.innerHTML = `
    <div class="featured__media">
      <span class="card__metal metal-${p.metal}" title="${p.metal}"></span>
      <div class="featured__svg">${handChainSVG(p.metal, "featured-" + p.id)}</div>
    </div>
    <div class="featured__body">
      <p class="eyebrow">Newest Addition</p>
      <h3 class="featured__name">${p.name}</h3>
      <p class="featured__desc">${p.desc}</p>
      <div class="featured__row">
        <span class="featured__price">${money(p.price)}</span>
        <button class="btn btn--gold card__add" data-id="${p.id}">Add to Bag</button>
      </div>
    </div>`;
}

/* ---------- Render products (stacked, one on top of the other) ---------- */
const grid = document.getElementById("productGrid");

function renderProducts(filter = "all") {
  grid.innerHTML = "";
  PRODUCTS
    .filter((p) => filter === "all" || p.metal === filter)
    .forEach((p) => {
      const card = document.createElement("article");
      card.className = "card reveal";
      card.innerHTML = `
        <div class="card__media">
          <span class="card__tag">${p.tag}</span>
          <span class="card__metal metal-${p.metal}" title="${p.metal}"></span>
          <div class="card__svg">${handChainSVG(p.metal, p.id)}</div>
        </div>
        <div class="card__body">
          <h3 class="card__name">${p.name}</h3>
          <p class="card__desc">${p.desc}</p>
          <div class="card__row">
            <span class="card__price">${money(p.price)}</span>
            <button class="card__add" data-id="${p.id}">Add to Bag</button>
          </div>
        </div>`;
      grid.appendChild(card);
    });
  observeReveals();
}

/* ---------- Filters ---------- */
document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  document.querySelectorAll(".filter").forEach((f) => f.classList.remove("is-active"));
  btn.classList.add("is-active");
  renderProducts(btn.dataset.filter);
});

/* ---------- Cart ---------- */
const cart = [];
const cartEl = document.getElementById("cart");
const overlay = document.getElementById("drawerOverlay");
const cartItemsEl = document.getElementById("cartItems");
const cartCountEl = document.getElementById("cartCount");
const cartTotalEl = document.getElementById("cartTotal");

function openCart()  { cartEl.classList.add("is-open"); overlay.classList.add("is-open"); }
function closeCart() { cartEl.classList.remove("is-open"); overlay.classList.remove("is-open"); }

function addToCart(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  const line = cart.find((l) => l.id === id);
  if (line) line.qty += 1;
  else cart.push({ ...product, qty: 1 });
  renderCart();
  showToast(`${product.name} added to your bag`);
}

function changeQty(id, delta) {
  const line = cart.find((l) => l.id === id);
  if (!line) return;
  line.qty += delta;
  if (line.qty <= 0) cart.splice(cart.indexOf(line), 1);
  renderCart();
}

function removeLine(id) {
  const i = cart.findIndex((l) => l.id === id);
  if (i > -1) cart.splice(i, 1);
  renderCart();
}

function renderCart() {
  const count = cart.reduce((n, l) => n + l.qty, 0);
  const total = cart.reduce((n, l) => n + l.qty * l.price, 0);
  cartCountEl.textContent = count;
  cartTotalEl.textContent = money(total);

  if (!cart.length) {
    cartItemsEl.innerHTML = `<p class="cart__empty">Your bag is waiting to be adorned.</p>`;
    return;
  }
  cartItemsEl.innerHTML = cart.map((l) => `
    <div class="cart-item">
      <div class="cart-item__thumb">${handChainSVG(l.metal, "cart-" + l.id)}</div>
      <div>
        <div class="cart-item__name">${l.name}</div>
        <div class="cart-item__meta">${l.metal === "gold" ? "18k Gold" : "925 Silver"}</div>
        <div class="cart-item__qty">
          <button data-act="dec" data-id="${l.id}" aria-label="Decrease">−</button>
          <span>${l.qty}</span>
          <button data-act="inc" data-id="${l.id}" aria-label="Increase">+</button>
        </div>
      </div>
      <div>
        <div class="cart-item__price">${money(l.price * l.qty)}</div>
        <button class="cart-item__remove" data-act="rm" data-id="${l.id}">Remove</button>
      </div>
    </div>`).join("");
}

function onAddClick(e) {
  const add = e.target.closest(".card__add");
  if (add) addToCart(add.dataset.id);
}
grid.addEventListener("click", onAddClick);
featuredEl.addEventListener("click", onAddClick);

cartItemsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-act]");
  if (!btn) return;
  const { act, id } = btn.dataset;
  if (act === "inc") changeQty(id, 1);
  if (act === "dec") changeQty(id, -1);
  if (act === "rm") removeLine(id);
});

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (!cart.length) { showToast("Your bag is empty"); return; }
  showToast("Checkout is a demo — connect your payment provider to go live.");
});

/* ---------- Toast ---------- */
const toastEl = document.getElementById("toast");
let toastTimer;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("is-show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("is-show"), 2600);
}

/* ---------- Newsletter ---------- */
document.getElementById("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("newsletterNote").textContent =
    "Welcome to the inner circle ✛ Check your inbox for a little gold.";
  e.target.reset();
});

/* ---------- Sticky nav shadow ---------- */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("is-stuck", window.scrollY > 10);
}, { passive: true });

/* ---------- Mobile menu ---------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => navLinks.classList.toggle("is-open"));
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") navLinks.classList.remove("is-open");
});

/* ---------- Reveal on scroll ---------- */
let revealObserver;
function observeReveals() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  }
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => revealObserver.observe(el));
}

/* ---------- Init ---------- */
document.getElementById("heroPiece").innerHTML = handChainSVG("gold", "hero");
document.getElementById("craftPiece").innerHTML = handChainSVG("silver", "craft");
document.getElementById("founded").textContent = toRoman(FOUNDED);
renderFeatured();
renderProducts();
renderCart();
observeReveals();
