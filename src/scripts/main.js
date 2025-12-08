// Optional JavaScript for interactive features
// This file is included in the development and build output

console.log('Shopify Liquid Test - Ready!');

// Quantity Selector Interactivity
document.addEventListener('DOMContentLoaded', () => {
  const selectors = document.querySelectorAll('.quantity-selector');

  selectors.forEach(selector => {
    const minus = selector.querySelector('.qty-minus');
    const plus = selector.querySelector('.qty-plus');
    const value = selector.querySelector('.qty-value');

    // Initialize quantity from DOM and store in dataset
    let qty = parseInt(value.textContent) || 1;
    selector.dataset.qty = qty;

    // Update display and button states
    const updateDisplay = () => {
      value.textContent = selector.dataset.qty;
      // Disable minus button when quantity is 1
      minus.disabled = parseInt(selector.dataset.qty) <= 1;
    };

    // Minus button: decrease quantity (minimum 1)
    minus.addEventListener('click', () => {
      let q = parseInt(selector.dataset.qty);
      if (q > 1) {
        selector.dataset.qty = q - 1;
        updateDisplay();
      }
    });

    // Plus button: increase quantity
    plus.addEventListener('click', () => {
      let q = parseInt(selector.dataset.qty);
      selector.dataset.qty = q + 1;
      updateDisplay();
    });

    // Initialize display state
    updateDisplay();
  });
});
