# RIZEN

A luxury boutique storefront for **gold & silver cross hand chains**, built as a
fast, self-contained dropshipping landing site. Cream-and-gold palette, elegant
serif typography, deep black drop shadows, a custom gold crest logo, and a
photo-plus-cross product system (with hand-drawn SVG fallbacks).

## Run it

No build step. Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

```
index.html      Page markup & sections
css/styles.css  All styling (palette, shadows, layout, responsive)
js/main.js      Products, SVG jewellery art, cart drawer, animations
```

## Make it yours

| Want to change… | Where |
| --- | --- |
| **Brand name** | Search `RIZEN` in `index.html` |
| **Logo / crest** | `CREST` in `js/main.js`; standalone `assets/logo.svg` + `assets/favicon.svg` |
| **Colours / shadows** | CSS variables at the top of `css/styles.css` (`:root`) |
| **Products & prices** | The `PRODUCTS` array in `js/main.js` |
| **Product photos** | Drop images into `assets/products/` — see that folder's README |
| **Cross position on a photo** | `cross: { x, y, size }` per product in `js/main.js` |
| **Hero / story copy** | Text in `index.html` |
| **Jewellery look (fallback art)** | `handChainSVG()` in `js/main.js` |

### Product photos + cross overlay

Each product can use a **real photo** (`img:` path) with a **gold/silver cross
drawn on top** — no image editing needed. Put photos in `assets/products/`
using the filenames listed there. White-background photos blend automatically
into the cream palette. Position the cross over the chain with the
`cross: { x, y, size }` percentages in `js/main.js`. Missing photos fall back
to the drawn illustration so nothing breaks.

### Going live with real dropshipping

The cart is a working front-end demo. To take real orders, connect a provider:

- **Easiest:** drop in [Shopify Buy Buttons](https://www.shopify.com/buy-button)
  or [Snipcart](https://snipcart.com/) — add data attributes to the "Add to Bag"
  buttons and they handle cart + checkout + payments.
- **Stripe:** use [Stripe Payment Links](https://stripe.com/payments/payment-links)
  or Checkout, wiring the `checkoutBtn` handler in `js/main.js`.
- **Print/dropship fulfilment:** Printful, Spocket, or your supplier's API.

Swap the SVG illustrations for real supplier product photos when you have them
(replace the `.card__svg` contents in `renderProducts()`).

## Notes

- Fonts loaded from Google Fonts (Cormorant Garamond + Jost).
- Respects `prefers-reduced-motion`.
- Fully responsive with a mobile menu and slide-in cart drawer.
