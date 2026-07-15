// State to hold items added to the cart
let cart = [];

// Toggle Sidebar Open/Close
function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar');
  sidebar.classList.toggle('open');
}

// Add Item to Cart
function addToCart(productName) {
  // Check if item is already in the cart
  const existingItem = cart.find(item => item.name === productName);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: productName, quantity: 1 });
  }
  
  updateCartUI();
  
  // Open the sidebar automatically so the user knows it was added
  const sidebar = document.getElementById('cart-sidebar');
  if (!sidebar.classList.contains('open')) {
    sidebar.classList.add('open');
  }
}

// Remove Item from Cart
function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  updateCartUI();
}

// Update Cart Badge and List Sidebar
function updateCartUI() {
  const cartCountBadge = document.getElementById('cart-count');
  const cartItemsContainer = document.getElementById('cart-items');
  
  // Update badge count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountBadge.textContent = totalItems;
  
  // Clear previous items
  cartItemsContainer.innerHTML = '';
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
    return;
  }
  
  // Populate cart items
  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <div class="item-details">
        <h4 style="font-size: 0.9rem; font-weight: 600;">${item.name}</h4>
        <small style="color: #666;">Quantity: ${item.quantity}</small>
      </div>
      <button class="remove-item-btn" onclick="removeFromCart('${item.name}')">Remove</button>
    `;
    cartItemsContainer.appendChild(itemElement);
  });
}

// Konga-style Search Bar Filter
function filterProducts() {
  const searchInput = document.getElementById('product-search').value.toLowerCase();
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    const productName = card.getAttribute('data-name').toLowerCase();
    if (productName.includes(searchInput)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Konga-style Category Sidebar Filter
function filterCategory(category) {
  const productCards = document.querySelectorAll('.product-card');
  const catalogTitle = document.getElementById('catalog-title');
  
  // Update Catalog Heading Text based on selection
  if (category === 'all') {
    catalogTitle.textContent = "All Products";
  } else {
    // Capitalize first letter for heading
    catalogTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ') + " Catalog";
  }

  productCards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Open WhatsApp with dynamically structured order message
function sendWhatsAppInquiry() {
  if (cart.length === 0) {
    alert("Please add at least one item to your cart before checking out.");
    return;
  }
  
  // Faith Audrey's WhatsApp Number
  const phoneNumber = "2348024755204"; 
  
  // Build professional, clear message
  let message = "Hello Faith Audrey Designs!\n\n";
  message += "I just visited your website store and would like to ask for a price quote for these items:\n\n";
  
  cart.forEach(item => {
    message += `🔹 *${item.quantity}x* ${item.name}\n`;
  });
  
  message += "\nPlease send over the pricing details and let me know how we can proceed with the design process. Thank you!";
  
  // Encode message to be URL safe
  const encodedText = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedText}`;
  
  // Open WhatsApp chat in a new tab
  window.open(whatsappURL, '_blank');
}
