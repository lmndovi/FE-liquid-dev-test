# Shopify Developer Test (Liquid + JSON Rendering)

## Overview
This test evaluates your ability to work with Shopify Liquid templates without requiring Shopify access. You'll build a multiple product cards using Liquid templating and JSON data.

## Prerequisites
- Node.js 16+ installed
- Basic understanding of HTML/CSS
- Familiarity with templating languages (helpful but not required)

## Project Structure
```
/
├── src/
│   ├── sections/
│   │   └── template.liquid    # Your Liquid section (edit this!)
│   ├── styles/
│   │   └── main.css           # Custom styles with pre-built classes
│   └── scripts/
│       └── main.js            # Optional JavaScript
├── index.html                 # HTML entry point for Vite
├── collection.json            # Product data (DO NOT EDIT)
├── dist/                      # Build output
└── vite.config.js             # Vite configuration
```

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```

## Development

### Option 1: Live Development (Recommended)
Run the Vite dev server for instant live reload:
```bash
npm run dev
```
This will:
- Start a local server at http://localhost:5173
- Open your browser automatically
- Auto-reload when you edit any file in `src/`
- Process Tailwind CSS automatically

**This mirrors the Shopify CLI development experience!**

Changes to these files trigger instant reload:
- `src/sections/template.liquid` - Your Liquid section
- `src/styles/main.css` - Tailwind CSS and custom styles
- `src/scripts/main.js` - JavaScript
- `collection.json` - Product data

### Option 2: Static Build
Generate a static HTML file:
```bash
npm run build
```
This creates `dist/index.html` with Tailwind CSS processed and inlined.

## Styling

The project includes Tailwind v4. You can use Tailwind's inline utility classes directly in your templates, create custom utility classes, or write custom CSS in [main.css](src/styles/main.css).

## LiquidJS vs Shopify Liquid

This project uses [LiquidJS](https://liquidjs.com/), an open-source implementation of the Liquid template language. While LiquidJS supports most standard Liquid features, it does not include Shopify-specific filters out of the box.

### Included Shopify Filters

The following Shopify filters have been implemented for this test environment:

- **`money`** - Formats cents to currency (e.g., `{{ 2999 | money }}` → "£29.99")
- **`image_tag`** - Generates `<img>` tags (e.g., `{{ url | image_tag: alt: 'Photo', class: 'product-img' }}`)
- **`img_url`** - Returns image URLs (simplified - size parameters are ignored in this environment)

### Shopify Filters NOT Available

The following Shopify-specific filters are **not available** in this test environment:

**Money filters:**
- `money_with_currency` - Adds currency code (e.g., "£29.99 GBP")
- `money_without_currency` - Formats without symbol (e.g., "29.99")
- `money_without_trailing_zeros` - Removes .00 for whole amounts

**URL/Asset filters:**
- `asset_url`, `asset_img_url` - Theme asset CDN URLs
- `file_url`, `global_asset_url`, `shopify_asset_url` - Various asset URLs
- `product_img_url` - Product image URLs with transformations

**Media/HTML filters:**
- `image_url` - Modern image URL filter with size transformations
- `media_tag` - For videos/3D models
- `link_to`, `script_tag`, `stylesheet_tag` - HTML tag generators
- `placeholder_svg_tag` - SVG placeholders

**Other Shopify-specific:**
- `color_to_rgb`, `color_to_hex`, `color_brightness`, `color_darken`, `color_lighten` - Color utilities
- `font_url`, `font_face` - Font handling
- `weight_with_unit` - Product weight formatting
- `format_address` - Address formatting
- `default_pagination` - Pagination HTML

For a complete list of Shopify Liquid filters, see the [Shopify Liquid documentation](https://shopify.dev/docs/api/liquid/filters).

## Your Task
Edit `src/sections/template.liquid` to build the product card as per the supplied designs. Focus on clean, semantic code that aligns with Shopify best practices and makes smart use of native features.

You may also customize:
- `src/styles/main.css` - Add or modify CSS styles
- `src/scripts/main.js` - Add interactivity

## Resources
- [Shopify Liquid Documentation](https://shopify.dev/docs/api/liquid)
- [LiquidJS Documentation](https://liquidjs.com/)
- [Shopify Cheat Sheet](https://www.shopify.com/uk/partners/shopify-cheat-sheet)
- [Tailwind Documentation](https://tailwindcss.com/)

## Submission

Choose one of the following submission methods:

### Option 1: ZIP File
1. Clean your project directory:
   ```bash
   npm run clean
   # or manually delete node_modules and dist folders
   ```

2. Create a ZIP archive of the entire project:
   - Right-click the project folder → "Compress" (Mac) or "Send to" → "Compressed (zipped) folder" (Windows)

3. Email the ZIP file to the provided contact

### Option 2: GitHub Repository (Public)
1. Create a new public repository on GitHub

2. Initialize git (if not already done) and push your code:
   ```bash
   git init
   git add .
   git commit -m "Complete Shopify developer test"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. Share the repository URL with us

### Option 3: GitHub Repository (Private)
1. Create a new private repository on GitHub

2. Push your code (same steps as Option 2)

3. Add the TwoTwentySeven organization as a collaborator:
   - Go to Settings → Collaborators and teams → Add people
   - Add: `twotwentyseven`

4. Share the repository URL with us

### What to Include
Ensure your submission includes:
- All source files in `src/` (especially `template.liquid`)
- Modified `main.css` and `main.js` (if applicable)
- `package.json` and `package-lock.json`
- This `README.md`
- **Do NOT include:** `node_modules/`, `dist/`, or `.env` files

### Before Submitting
Run a final check:
```bash
npm run build
```
Verify the output in `dist/index.html` renders correctly.

