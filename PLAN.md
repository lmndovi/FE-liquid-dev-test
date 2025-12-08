# Product Card Implementation Plan

## 1. Architecture

For this task I am following the required structure while keeping concerns clearly separated:

* `/sections/template.liquid` for all markup and Liquid logic  
* `/styles/main.css` for all styling  
* `/scripts/main.js` for any interactivity  

This keeps the codebase readable and maintainable while working within the single-file Liquid constraint.

---

## 2. Mapping the UI (Figma to Shopify Data)

The goal is to reproduce the product card as designed in Figma while using Shopify-style objects where possible.

### Product wrapper

Each card is wrapped in an `<article>` element. This is semantically appropriate because each product is a standalone piece of content and it improves accessibility and document structure.

### Product image

The design shows a square image with meaningful alt text and fixed proportions. To match this:

* I use `product.media[0].preview_image` because it includes alt text, width and height.  
* If a product is missing media, the fallback is `product.featured_image`.  
* The wrapper uses `aspect-ratio: 1 / 1`, taken directly from the Figma Dev Mode panel, to maintain a consistent square layout.

### Bestseller badge

The badge is positioned absolutely in the top-left of the image. It is only rendered when the product has the tag `"Best Seller"`.

### Product title and excerpt

The card needs a short summary rather than the full product description.

* **Primary source**: `product.metafields.custom.product_excerpt`. This is a single-line metafield and is ideal for card summaries.  
* **Fallback**: `product.content`, stripped of HTML. This ensures the card still renders with a reasonable summary if the metafield is missing.

### Pricing

The design shows one or three price states: standard price, "Was" price, and "Save £x.xx". I calculate these using:

* `product.price`  
* `product.compare_at_price`  

If `compare_at_price` exists and is higher than the current price, I calculate the saving and display all three elements. Otherwise only the standard price is shown.

### Nutrition

Three data points appear in the design: protein per serving, low calories, and low sugar. Because the test uses LiquidJS, metafields are provided as an array. I loop through the array and match on the `key` property to extract the values I need.

### Quantity selector

The quantity defaults to 1. The UI in Figma shows plus and minus buttons inside a pill-shaped container. The selector is a purely front-end interaction and does not integrate with Shopify's cart system in this test environment.

### Add to Cart

The Add to Cart button is visual only. Styling comes directly from the Figma values. No functional cart behaviour is implemented, as stated in the brief.

---

## 3. Styling (CSS and Tailwind)

Tailwind v4 is installed and available. I use a combined approach.

### Tailwind utilities for layout

Tailwind utilities are used for layout and spacing, for example padding, gaps, flex direction and the responsive grid. These are quicker to apply inline and match the spacing tokens from Figma (8, 16, 24 etc.).

### Custom CSS classes for reusable components

Some elements appear on every card and have specific styling from Figma, so they are better extracted into reusable classes:

* the image wrapper  
* the badge  
* the price pills  
* the nutrition row  
* the quantity selector  
* the Add to Cart button  

These parts need custom border radii, colours, fixed dimensions and typography. Copying the Dev Mode CSS values ensures the card closely matches the supplied design:

* Border radii (e.g. 12px)  
* Shadows  
* Font sizes (e.g. 16px with a 21px line height)  
* Specific colours extracted as CSS variables  
* Fixed heights and widths where required  

This approach keeps the markup clean, avoids very long Tailwind class strings and makes the components easy to reuse.

---

## 4. Interactivity (main.js)

Only the quantity selector requires behaviour. The plan for `main.js` is:

* Select every `.quantity-selector` so that each product card works independently.  
* Read the initial quantity from the DOM and store it in a `data-qty` attribute on the selector.  
* Increase or decrease the value when plus or minus is clicked.  
* Prevent the value from going below 1.  
* Disable the minus button when the quantity is 1 so the user cannot decrement past the minimum.  
* Update the number shown in `.qty-value` whenever the quantity changes.  

This keeps the interaction simple, accessible and completely separate from Liquid. No logic is added to the Add to Cart button, as requested.

---

## 5. Implementation Notes

### Metafields access pattern

LiquidJS exposes metafields as an array, not as a nested, namespaced object like full Shopify Liquid. Because of this, the implementation loops through `product.metafields` and matches on the `key` property instead of using dot notation (for example, `product.metafields.custom.protein_per_serving.value`).

### Carousel dots

Carousel dots are generated dynamically based on the number of media items in `product.media`, so the dots always match the number of images available for each product.

### Responsive design

The layout uses a mobile-first approach:

* **Mobile**: cards stack vertically using a column layout (`flex-col`).  
* **Desktop** (`md` breakpoint): cards display side-by-side in two columns (`md:grid md:grid-cols-2`).

### State management

The current quantity is stored on the DOM element via `data-qty` (using `dataset.qty`) rather than in a single JavaScript global variable. This keeps each card's state local to that card, avoids different products sharing the same counter, and makes the behaviour easier to reason about and debug.

---

## 6. Accessibility

The cards aim to be accessible by using semantic HTML and appropriate ARIA attributes. Each product card uses an `<article>` element with `aria-labelledby` pointing to the product title's unique ID. Interactive elements such as the quantity buttons and the Add to Cart button include descriptive `aria-label` attributes. The image link wraps the entire image area and includes an `aria-label` with the product title. Focus states are defined using `:focus-visible` so keyboard users can see which element is active, and the tab order flows logically from the image link to the quantity controls and then to the Add to Cart button.

---

## 7. Edge cases

Missing or incomplete data is handled:

* If a product has no image, a placeholder element is rendered with a meaningful `aria-label`.  
* Missing nutrition metafields mean the corresponding parts of the nutritional info are simply not shown, instead of rendering empty content.  
* Products without a `compare_at_price` only display the regular price.  
* The Bestseller badge only renders when the product has the `"Best Seller"` tag.  

All conditional rendering uses Liquid `if` statements to check for data before outputting elements, which prevents broken layouts or visibly empty sections.
