// Shopping Hub - product catalog, cart, and page behavior
// All product data, filtering, cart, and shared UI logic lives in this one file.

// ---------- Product data ----------

const PRODUCTS = [
  // Men
  { id: 1, name: "Nike Air Runner", category: "Men", tag: "Shoes", price: 129, oldPrice: null, badge: "New", img: "images/nike-shoes.jpg" },
  { id: 2, name: "Adidas Street Sprint", category: "Men", tag: "Shoes", price: 109, oldPrice: 129, badge: "Sale", img: "images/adidas-shoes.jpg" },
  { id: 3, name: "Essential Black Tee", category: "Men", tag: "Apparel", price: 24, oldPrice: null, badge: null, img: "images/black-tshirt.jpg" },
  { id: 4, name: "Urban Black Hoodie", category: "Men", tag: "Apparel", price: 54, oldPrice: null, badge: null, img: "images/black-hoodie.jpg" },
  { id: 5, name: "Classic Blue Denim", category: "Men", tag: "Apparel", price: 46, oldPrice: null, badge: null, img: "images/blue-jeans.jpg" },
  { id: 6, name: "Chrono Steel Watch", category: "Men", tag: "Watches", price: 149, oldPrice: 179, badge: "Sale", img: "images/men-watch.jpg" },
  { id: 7, name: "Aviator Shade", category: "Men", tag: "Accessory", price: 39, oldPrice: null, badge: null, img: "images/men-sunglasses.jpg" },
  { id: 8, name: "Trailblazer Backpack", category: "Men", tag: "Bags", price: 68, oldPrice: null, badge: null, img: "images/men-backpack.jpg" },

  // Women
  { id: 9, name: "Summer Wrap Dress", category: "Women", tag: "Apparel", price: 58, oldPrice: null, badge: "New", img: "images/dress.jpg" },
  { id: 10, name: "Silk Blend Top", category: "Women", tag: "Apparel", price: 34, oldPrice: null, badge: null, img: "images/top.jpg" },
  { id: 11, name: "Cloud Comfort Hoodie", category: "Women", tag: "Apparel", price: 52, oldPrice: null, badge: null, img: "images/hoodie.jpg" },
  { id: 12, name: "High-Rise Denim", category: "Women", tag: "Apparel", price: 49, oldPrice: null, badge: null, img: "images/women-jeans.jpg" },
  { id: 13, name: "Stiletto Evening Heels", category: "Women", tag: "Shoes", price: 89, oldPrice: 109, badge: "Sale", img: "images/heels.jpg" },
  { id: 14, name: "Amelia Tote Bag", category: "Women", tag: "Bags", price: 74, oldPrice: null, badge: null, img: "images/handbag.jpg" },
  { id: 15, name: "Rose Gold Minimal Watch", category: "Women", tag: "Watches", price: 139, oldPrice: null, badge: "New", img: "images/women-watch.jpg" },
  { id: 16, name: "Layered Chain Necklace", category: "Women", tag: "Jewelry", price: 42, oldPrice: null, badge: null, img: "images/jewelry.jpg" },

  // Electronics
  { id: 17, name: "iPhone 15 Pro", category: "Electronics", tag: "Phones", price: 999, oldPrice: null, badge: "New", img: "images/iphone.jpg" },
  { id: 18, name: "Samsung Galaxy S24", category: "Electronics", tag: "Phones", price: 899, oldPrice: null, badge: null, img: "images/samsung.jpg" },
  { id: 19, name: "MacBook Air M3", category: "Electronics", tag: "Laptops", price: 1199, oldPrice: null, badge: "New", img: "images/macbook.jpg" },
  { id: 20, name: "Titan Gaming Laptop", category: "Electronics", tag: "Laptops", price: 1399, oldPrice: 1499, badge: "Sale", img: "images/gaming-laptop.jpg" },
  { id: 21, name: "NoiseCancel Pro Headphones", category: "Electronics", tag: "Audio", price: 179, oldPrice: null, badge: null, img: "images/headphones.jpg" },
  { id: 22, name: "FitTrack Smartwatch", category: "Electronics", tag: "Watches", price: 159, oldPrice: null, badge: null, img: "images/smartwatch.jpg" },
  { id: 23, name: "UltraView Tablet", category: "Electronics", tag: "Tablets", price: 429, oldPrice: 479, badge: "Sale", img: "images/tablet.jpg" },
  { id: 24, name: "Mirrorless Vision Camera", category: "Electronics", tag: "Cameras", price: 749, oldPrice: null, badge: null, img: "images/camera.jpg" },

  // Accessories
  { id: 25, name: "Noir Eau de Parfum", category: "Accessories", tag: "Fragrance", price: 65, oldPrice: null, badge: null, img: "images/perfume.jpg" },
  { id: 26, name: "Leather Fold Wallet", category: "Accessories", tag: "Accessory", price: 32, oldPrice: null, badge: null, img: "images/wallet.jpg" },
  { id: 27, name: "Signature Snapback Cap", category: "Accessories", tag: "Accessory", price: 22, oldPrice: null, badge: null, img: "images/cap.jpg" },
  { id: 28, name: "Reversible Leather Belt", category: "Accessories", tag: "Accessory", price: 28, oldPrice: null, badge: null, img: "images/belt.jpg" },
  { id: 29, name: "Pulse True Wireless Earbuds", category: "Accessories", tag: "Audio", price: 89, oldPrice: 109, badge: "Sale", img: "images/earbuds.jpg" },
  { id: 30, name: "Voyager Duffel Bag", category: "Accessories", tag: "Bags", price: 78, oldPrice: null, badge: null, img: "images/travel-bag.jpg" },
  { id: 31, name: "Retro Round Sunglasses", category: "Accessories", tag: "Accessory", price: 36, oldPrice: null, badge: "New", img: "images/sunglasses.jpg" },
  { id: 32, name: "Commuter Daypack", category: "Accessories", tag: "Bags", price: 58, oldPrice: null, badge: null, img: "images/backpack.jpg" }
];

const CATEGORIES = ["All", "Men", "Women", "Electronics", "Accessories", "Shoes"];

// ---------- Rendering helpers ----------

function formatPrice(n) {
  return "$" + n.toFixed(2);
}

function productCardHTML(p) {
  const oldPriceHTML = p.oldPrice ? `<span class="old">${formatPrice(p.oldPrice)}</span>` : "";
  const badgeHTML = p.badge ? `<span class="product-badge">${p.badge}</span>` : "";

  return `
    <article class="product-card" data-id="${p.id}">
      <div class="product-thumb">
        ${badgeHTML}
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-cat">${p.category} · ${p.tag}</span>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-price">${formatPrice(p.price)} ${oldPriceHTML}</div>
        <button class="add-cart-btn js-add-cart" data-id="${p.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          Add to cart
        </button>
      </div>
    </article>
  `;
}

function renderProducts(list, mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  if (!list.length) {
    mount.innerHTML = `
      <div class="no-results">
        <strong>No products found</strong>
        <p>Try a different category or search term.</p>
      </div>`;
    return;
  }

  mount.innerHTML = list.map(productCardHTML).join("");
}

function matchesCategory(p, cat) {
  if (cat === "All") return true;
  if (cat === "Shoes") return p.tag === "Shoes";
  return p.category === cat;
}

function searchFilter(list, term) {
  const t = term.trim().toLowerCase();
  if (!t) return list;

  return list.filter(p =>
    p.name.toLowerCase().includes(t) ||
    p.tag.toLowerCase().includes(t) ||
    p.category.toLowerCase() === t
  );
}

function sortProducts(list, mode) {
  const arr = [...list];
  if (mode === "price-asc") arr.sort((a, b) => a.price - b.price);
  if (mode === "price-desc") arr.sort((a, b) => b.price - a.price);
  if (mode === "name-asc") arr.sort((a, b) => a.name.localeCompare(b.name));
  return arr;
}

// ---------- Home page: featured products ----------

function initHomeFeatured() {
  const mount = document.getElementById("featured-grid");
  if (!mount) return;

  const featured = PRODUCTS.filter(p => p.badge).slice(0, 8);
  renderProducts(featured, "featured-grid");
}

// ---------- Products page: filter, search, sort ----------

function initProductsPage() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  const pillsWrap = document.getElementById("category-pills");
  const searchInput = document.getElementById("product-search");
  const sortSelect = document.getElementById("sort-select");
  const countLabel = document.getElementById("results-count");

  // If the homepage linked here with ?cat=Men, start on that category
  const params = new URLSearchParams(window.location.search);
  let activeCat = params.get("cat") || "All";
  if (!CATEGORIES.includes(activeCat)) activeCat = "All";

  const presetSearch = params.get("q") || "";
  if (searchInput) searchInput.value = presetSearch;

  function buildPills() {
    pillsWrap.innerHTML = CATEGORIES.map(c =>
      `<button class="pill ${c === activeCat ? "active" : ""}" data-cat="${c}">${c}</button>`
    ).join("");
  }

  function update() {
    let list = PRODUCTS.filter(p => matchesCategory(p, activeCat));
    list = searchFilter(list, searchInput ? searchInput.value : "");
    list = sortProducts(list, sortSelect ? sortSelect.value : "default");

    renderProducts(list, "products-grid");

    if (countLabel) {
      countLabel.innerHTML = `<strong>${list.length}</strong> product${list.length === 1 ? "" : "s"} found`;
    }
  }

  buildPills();
  update();

  pillsWrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".pill");
    if (!btn) return;

    activeCat = btn.dataset.cat;
    [...pillsWrap.children].forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    update();
  });

  if (searchInput) searchInput.addEventListener("input", update);
  if (sortSelect) sortSelect.addEventListener("change", update);
}

// ---------- Cart ----------

const CART_KEY = "shoppingHubCart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(product, qty = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      category: product.category,
      qty: qty
    });
  }

  saveCart(cart);
}

function removeFromCart(id) {
  const cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
  if (typeof renderCartPage === "function") renderCartPage();
}

function updateQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }

  saveCart(cart);
  if (typeof renderCartPage === "function") renderCartPage();
}

function cartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function cartSubtotal() {
  return getCart().reduce((sum, item) => sum + item.qty * item.price, 0);
}

function updateCartBadge() {
  document.querySelectorAll(".js-cart-count").forEach(el => {
    const count = cartCount();
    el.textContent = count;
    el.classList.add("bump");
    setTimeout(() => el.classList.remove("bump"), 400);
  });
}

function cartRowHTML(item) {
  const total = (item.qty * item.price).toFixed(2);

  return `
    <div class="cart-row" data-id="${item.id}">
      <img src="${item.img}" alt="${item.name}">
      <div class="item-details">
        <div class="item-name">${item.name}</div>
        <div class="item-cat">${item.category}</div>
      </div>
      <div class="qty-control">
        <button class="js-qty-minus" data-id="${item.id}" aria-label="Decrease quantity">−</button>
        <span>${item.qty}</span>
        <button class="js-qty-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
      </div>
      <div class="item-total">$${total}</div>
      <button class="remove-btn js-remove" data-id="${item.id}">Remove</button>
    </div>
  `;
}

function renderCartPage() {
  const mount = document.getElementById("cart-items-mount");
  const emptyState = document.getElementById("cart-empty");
  const summaryWrap = document.getElementById("cart-summary-wrap");
  if (!mount) return;

  const cart = getCart();

  if (!cart.length) {
    mount.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
    if (summaryWrap) summaryWrap.style.display = "none";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (summaryWrap) summaryWrap.style.display = "block";

  mount.innerHTML = cart.map(cartRowHTML).join("");

  const subtotal = cartSubtotal();
  const shipping = subtotal > 0 ? 6.99 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  document.getElementById("summary-subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("summary-shipping").textContent = `$${shipping.toFixed(2)}`;
  document.getElementById("summary-tax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("summary-total").textContent = `$${total.toFixed(2)}`;
}

// ---------- Shared page behavior: nav, toast, search, contact form ----------

function showToast(message) {
  let toast = document.getElementById("app-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.className = "toast";
    toast.innerHTML = `<span class="dot"></span><span class="toast-msg"></span>`;
    document.body.appendChild(toast);
  }

  toast.querySelector(".toast-msg").textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function initMobileNav() {
  const toggle = document.querySelector(".js-nav-toggle");
  const links = document.querySelector(".js-nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
    const isOpen = links.classList.contains("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "✕" : "☰";
  });
}

function initHeaderSearch() {
  const headerSearch = document.getElementById("header-search");
  const searchBtn = document.getElementById("header-search-btn");
  if (!headerSearch) return;

  function goToSearch() {
    const q = encodeURIComponent(headerSearch.value.trim());
    window.location.href = `products.html?q=${q}`;
  }

  headerSearch.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      goToSearch();
    }
  });

  if (searchBtn) {
    searchBtn.addEventListener("click", goToSearch);
  }
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const successBox = document.getElementById("form-success");

  function setError(field, message) {
    const wrap = field.closest(".field");
    wrap.classList.add("error");
    wrap.querySelector(".error-msg").textContent = message;
  }

  function clearError(field) {
    const wrap = field.closest(".field");
    wrap.classList.remove("error");
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const name = form.querySelector("#cf-name");
    const email = form.querySelector("#cf-email");
    const subject = form.querySelector("#cf-subject");
    const message = form.querySelector("#cf-message");

    [name, email, subject, message].forEach(clearError);

    if (!name.value.trim()) {
      setError(name, "Please tell us your name.");
      valid = false;
    }

    if (!email.value.trim()) {
      setError(email, "Please enter your email.");
      valid = false;
    } else if (!isValidEmail(email.value.trim())) {
      setError(email, "That email address doesn't look right.");
      valid = false;
    }

    if (!subject.value.trim()) {
      setError(subject, "Add a short subject.");
      valid = false;
    }

    if (!message.value.trim() || message.value.trim().length < 10) {
      setError(message, "Message should be at least 10 characters.");
      valid = false;
    }

    if (!valid) {
      successBox.classList.remove("show");
      return;
    }

    // No backend here, so we just confirm receipt in the UI.
    successBox.classList.add("show");
    successBox.scrollIntoView({ behavior: "smooth", block: "center" });
    form.reset();
    showToast("Message sent — we'll reply soon!");
  });
}

function initCartPageEvents() {
  document.body.addEventListener("click", (e) => {
    const minus = e.target.closest(".js-qty-minus");
    const plus = e.target.closest(".js-qty-plus");
    const remove = e.target.closest(".js-remove");
    const checkout = e.target.closest("#checkout-btn");

    if (minus) updateQty(Number(minus.dataset.id), -1);
    if (plus) updateQty(Number(plus.dataset.id), 1);
    if (remove) removeFromCart(Number(remove.dataset.id));

    if (checkout) {
      if (!cartCount()) {
        showToast("Your cart is empty.");
        return;
      }
      saveCart([]);
      renderCartPage();
      showToast("Order placed — thank you for shopping with us!");
    }
  });
}

function initAddToCartButtons() {
  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest(".js-add-cart");
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    addToCart(product);

    btn.classList.add("added");
    const original = btn.innerHTML;
    btn.innerHTML = "Added ✓";
    setTimeout(() => {
      btn.classList.remove("added");
      btn.innerHTML = original;
    }, 1200);

    showToast(`${product.name} added to cart`);
  });
}

// ---------- Run everything once the page has loaded ----------

document.addEventListener("DOMContentLoaded", () => {
  initHomeFeatured();
  initProductsPage();
  updateCartBadge();
  renderCartPage();
  initMobileNav();
  initHeaderSearch();
  initContactForm();
  initCartPageEvents();
  initAddToCartButtons();
});