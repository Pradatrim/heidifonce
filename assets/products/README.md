# Product photos

Drop your product photos here. The site looks for these exact filenames
(see the `PRODUCTS` array in `js/main.js`):

| File | Product | Metal |
| --- | --- | --- |
| `nova.jpg`      | Nova (Newest Addition) | gold |
| `aurelia.jpg`   | Aurélia   | gold |
| `seraphine.jpg` | Séraphine | gold |
| `lumiere.jpg`   | Lumière   | gold |
| `celeste.jpg`   | Céleste   | silver |
| `lune.jpg`      | Lune      | silver |
| `ivoire.jpg`    | Ivoire    | silver |

## Tips for best results

- **Plain white (or very light) background** works best — the site blends
  white into the cream palette automatically (`mix-blend-mode: multiply`).
- Roughly **square or portrait** orientation, centered chain.
- `.jpg` or `.png` both fine — keep the `.jpg` filename or update the
  `img:` path in `js/main.js`.

If a file is missing, that product gracefully falls back to the drawn
hand-chain illustration, so the site never breaks.

## The cross overlay

A gold/silver cross is drawn **on top** of each photo (no image editing
needed). Position it per product with the `cross: { x, y, size }` values in
`js/main.js` — `x`/`y` are percentages across the photo, `size` is the
cross width as a percentage. Nudge these until the cross sits on the chain.
