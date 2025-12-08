# Product Card Implementation Plan

## 1. Architecture

For this task I am following the required structure while keeping concerns separated clearly:

* `/sections/template.liquid` for all markup and Liquid logic
* `/styles/main.css` for all styling
* `/scripts/main.js` for any interactivity

This keeps the build readable and maintainable while working within the single-file Liquid constraint.

---

## 2. Mapping the UI (Figma to Shopify Data)

The goal is to reproduce the product card exactly as designed in Figma while using Shopify's native objects where possible.

### **Product wrapper**

Each card is wrapped in an `<article>` element. This is semantically correct because each product is a standalone piece of content and it improves accessibility and structure.

### **Product image**

The design shows a square image with proper alt text and fixed proportions. To match this:

* I will use `product.media[0].preview_image` because it has alt text, width and height.
* If any product is missing media, the fallback will be `product.featured_image`.
* The wrapper will use `aspect-ratio: 1 / 1`, taken directly from the Figma Dev Mode panel.

### **Bestseller badge**

The badge is positioned absolutely in the top-left of the image. I will render it only when the product has the tag "Best Seller".

### **Product title and excerpt**

The card requires a short summary, not the full product description.

* **Primary source**: `product.metafields.custom.product_excerpt`. This is a single line metafield and ideal for card summaries.
* **Fallback**: `product.content`, stripped of HTML. This ensures the card still renders if the metafield is missing.

### **Pricing**

The design shows one or three price states: standard price, "Was" price, and "Save £x.xx". I will calculate these using:

* `product.price`
* `product.compare_at_price`

If `compare_at_price` exists and is higher than the current price, I will calculate the saving and display all three elements.

### **Nutrition**

Three data points appear in the design: protein per serving, low calories, and low sugar. Because the test uses LiquidJS, metafields come in as an array. I will loop through the array and match keys to extract the values.

### **Quantity selector**

The quantity defaults to 1. The UI in Figma shows plus and minus buttons with a pill-shaped container. The selector will not affect Shopify's cart system; it is purely a front-end interaction.

### **Add to Cart**

The button is visual only. Styling comes entirely from Figma values. No functionality is required as stated in the brief.

---

## 3. Styling (CSS and Tailwind)

Tailwind v4 is installed and available. I am using a combined approach:

### **Tailwind utilities for layout**

Used for padding, gap, flex direction, and responsive grid layout. These are quicker to write inline and match the spacing tokens from Figma (8, 16, 24 etc.).

### **Custom CSS classes for reusable components**

Some elements appear across every card and have specific styling from Figma, so they are better extracted into classes:

* the image wrapper
* the badge
* the price pills
* the nutrition row
* the quantity selector
* the Add to Cart button

These need custom border radius values, custom colours, fixed dimensions and typography. Copying the Dev Mode CSS values ensures the card matches the exact design:

* Border radii (e.g. 12px)
* Shadows
* Font sizes (e.g. 16px leading 21px)
* Specific colours extracted as variables
* Fixed heights and widths where required

This approach keeps the markup clean, avoids long Tailwind strings and makes the components reusable.

---

## 4. Interactivity (main.js)

Only the quantity selector requires behaviour. My plan for main.js:

* Select every `.quantity-selector` so that each product card works independently
* Store the quantity in a dataset property on the selector
* Increase or decrease the value when plus or minus is clicked
* Prevent the value from going below 1
* Disable the minus button when the quantity is 1
* Update the number shown in `.qty-value`

This keeps the interaction simple, accessible and completely separate from Liquid. No work will be added to the Add to Cart button as requested.

---

## Implementation Notes

### Metafields Access Pattern

LiquidJS stores metafields as an array, not as a namespaced object like full Shopify Liquid. Therefore, we loop through `product.metafields` and match by the `key` property instead of using dot notation (e.g., `product.metafields.custom.protein_per_serving.value`).

### Carousel Dots

Carousel dots are dynamically generated based on the number of media items in `product.media`, ensuring the dots match the actual number of images available.

### Responsive Design

The layout uses a mobile-first approach:
* **Mobile**: Cards stack vertically (`flex-col`)
* **Desktop** (md breakpoint): Cards display side-by-side (`md:grid md:grid-cols-2`)

### State Management

Quantity state is stored in the DOM using `dataset.qty` rather than JavaScript variables, making it more resilient to DOM updates and easier to debug.

##5 Accessibility

I am ensuring the cards are accessible by using semantic HTML and ARIA attributes. Each product card uses an `<article>` element with `aria-labelledby` linking to the product title's unique ID. Interactive elements like quantity buttons and the Add to Cart button include descriptive `aria-label` attributes. The image link wraps the entire image area and includes an `aria-label` with the product title. All buttons have visible focus states using `:focus-visible` so keyboard users can see which element is active. The tab order flows logically: image link → quantity controls → Add to Cart button.

##6 Edge Cases

I am handling missing or incomplete data gracefully. If a product has no image, a placeholder div is rendered with proper aria-label. Missing metafields result in the nutritional info section being hidden rather than showing empty content. Products without a `compare_at_price` only display the regular price. The Bestseller badge only renders when the product has the "Best Seller" tag. All conditional rendering uses Liquid's `if` statements to check for data existence before displaying elements, preventing broken layouts or empty sections.

