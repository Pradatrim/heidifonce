# Maison Croix

A luxury boutique storefront for **gold & silver cross hand chains** — built as a
fast, self-contained dropshipping landing site. Cream-and-gold palette, elegant
serif typography, layered soft drop shadows, and hand-drawn SVG jewellery (no
stock photos required).

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
| **Brand name** | Search `MAISON CROIX` / `Maison Croix` in `index.html` |
| **Colours / shadows** | CSS variables at the top of `css/styles.css` (`:root`) |
| **Products & prices** | The `PRODUCTS` array in `js/main.js` |
| **Hero / story copy** | Text in `index.html` |
| **Jewellery look** | `handChainSVG()` in `js/main.js` (or swap in real product photos) |

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
