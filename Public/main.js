// ============================
// 🛍️ DANH SÁCH SẢN PHẨM
// ============================
const defaultProducts = [
  // 🍎 APPLE
  { id: 1, name: "MacBook Pro M3 2025", price: 42990000, brand: "apple", img: "https://cdn.mos.cms.futurecdn.net/gbho6bhS4xVL3gU2MVYx7U.jpg" },
  { id: 2, name: "MacBook Air M2 2024", price: 32990000, brand: "apple", img: "https://149426355.v2.pressablecdn.com/wp-content/uploads/2022/06/m2air-hero-6c.png" },
  { id: 3, name: "iPhone 17 Pro Max", price: 32990000, brand: "apple", img: "https://mtscdn.ru/upload/iblock/a1a/iphone_17_pro_finish_select_202509_6_3inch_cosmicorange_AV1-kopiya.png" },
  { id: 4, name: "iPad Pro M4 13 inch", price: 28990000, brand: "apple", img: "https://cdn.media.amplience.net/i/xcite/657248-02?img404=default&w=2048&qlt=75&fmt=auto" },
  { id: 5, name: "Apple Watch Ultra 2", price: 19990000, brand: "apple", img: "https://olhardigital.com.br/wp-content/uploads/2023/09/apple-watch-2.webp" },

  // 📱 SAMSUNG
  { id: 6, name: "Samsung Galaxy S24 Ultra", price: 28990000, brand: "samsung", img: "https://image-us.samsung.com/us/smartphones/galaxy-s24/all-gallery/01_E3_TitaniumBlack_Lockup_1600x1200.jpg?$product-details-jpg$?$product-details-thumbnail-jpg$" },
  { id: 7, name: "Samsung Galaxy Z Fold5", price: 35990000, brand: "samsung", img: "https://static1.anpoimages.com/wordpress/wp-content/uploads/2023/07/galaxy-z-fold-5-icy-blue-render-square.jpg" },
  { id: 8, name: "Samsung Galaxy Watch 6", price: 8990000, brand: "samsung", img: "https://helios-i.mashable.com/imagery/reviews/00fwi01IuVAgd17IcipNO6T/images-1.fill.size_2000x1125.v1694005122.jpg" },
  { id: 9, name: "Samsung Smart TV 65 inch 4K", price: 22990000, brand: "samsung", img: "https://images.samsung.com/is/image/samsung/p6pim/my/qa65q70cakxxm/gallery/my-qled-q70c-qa65q70cakxxm-535465735?$650_519_PNG$" },
  { id: 10, name: "Samsung Galaxy Buds3 Pro", price: 4990000, brand: "samsung", img: "https://images.samsung.com/ie/galaxy-buds3-pro/feature/galaxy-buds3-pro-welcome-light-pc.jpg" },

  // 💻 ASUS
  { id: 11, name: "ASUS ROG Zephyrus G15", price: 25990000, brand: "asus", img: "https://laptopmedia.com/wp-content/uploads/2021/01/G15-white-05-copy-scaled-e1610551879364.jpg" },
  { id: 12, name: "ASUS TUF Gaming F15", price: 18990000, brand: "asus", img: "https://laptopmedia.com/wp-content/uploads/2023/04/1-34-scaled.jpg" },
  { id: 13, name: "ASUS Vivobook 15 OLED", price: 15990000, brand: "asus", img: "https://laptopmedia.com/wp-content/uploads/2023/03/15-1-e1679912127532.jpg" },
  { id: 14, name: "ASUS Zenbook 14 OLED", price: 19990000, brand: "asus", img: "https://laptopmedia.com/wp-content/uploads/2024/01/8-4-e1704539640224.jpg" },
  { id: 15, name: "ASUS ProArt Studiobook 16", price: 32990000, brand: "asus", img: "https://laptopmedia.com/wp-content/uploads/2023/01/3-11-e1672903814934.jpg" },

  // 🎧 SONY
  { id: 16, name: "Sony Xperia 10 V", price: 11250000, brand: "sony", img: "https://sony.scene7.com/is/image/sonyglobalsolutions/752_ProductPrimary_image_Black?$categorypdpnav$&fmt=png-alpha" },
  { id: 17, name: "Sony Bravia XR 65 inch 4K", price: 25990000, brand: "sony", img: "https://m.media-amazon.com/images/I/91FLVbv6qhL.jpg" },
  { id: 18, name: "Sony PlayStation 5 Slim", price: 15990000, brand: "sony", img: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/f3d55853-e894-41b3-8dc2-bc34c6038cf2.jpg" },
  { id: 19, name: "Sony Xperia 1 VI", price: 29990000, brand: "sony", img: "https://store.sony.com.tw/resource/file/product_files/XQ-EC72-R2/10.jpg" },
  { id: 20, name: "Sony Soundbar HT-A7000", price: 17990000, brand: "sony", img: "https://m.media-amazon.com/images/I/619PwwYcuVL._SX679_.jpg" },
];

// ============================
// 🛒 CART
// ============================
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
const formatVND = (n) => n.toLocaleString("vi-VN") + "đ";
const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

// ============================
// 🛍️ HIỂN THỊ SẢN PHẨM
// ============================
function renderProductsByBrand(selectedBrand = "all") {
  const container = document.getElementById("brand-container");
  container.innerHTML = "";

  const filtered =
    selectedBrand === "all"
      ? defaultProducts
      : defaultProducts.filter((p) => p.brand === selectedBrand);

  const grid = document.createElement("div");
  grid.id = "brand-container";


  filtered.forEach((p) => {
    grid.innerHTML += `
      <div class="product-item fade-in">
        <img src="${p.img}" alt="${p.name}">
        <h4>${escapeHtml(p.name)}</h4>
        <p class="price">${formatVND(p.price)}</p>
        <button class="add-btn" data-id="${p.id}">Thêm vào giỏ</button>
      </div>
    `;
  });

  container.appendChild(grid);
  attachAddButtons();
}

// ============================
// 🧺 GIỎ HÀNG
// ============================
function addToCart(id) {
  const prod = defaultProducts.find((p) => p.id === id);
  if (!prod) return;

  const ex = cart.find((i) => i.id === id);
  if (ex) ex.qty++;
  else cart.push({ id: prod.id, name: prod.name, price: prod.price, qty: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showToast(`✅ Đã thêm "${prod.name}" vào giỏ hàng!`);
}

function updateCartCount() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;
  badge.textContent = cart.reduce((s, i) => s + i.qty, 0);
}

function attachAddButtons() {
  document.querySelectorAll(".add-btn").forEach((btn) => {
    btn.onclick = () => addToCart(Number(btn.dataset.id));
  });
}

// ============================
// ⚡ FLASH SALE
// ============================
function renderFlashSale() {
  const fs = document.getElementById("flash-products");
  if (!fs) return;
  const cheap = [...defaultProducts].sort((a, b) => a.price - b.price).slice(0, 5);

  fs.innerHTML = cheap
    .map(
      (p) => `
      <div class="flash-item fade-in">
        <img src="${p.img}" alt="${p.name}">
        <h4>${p.name}</h4>
        <p>${formatVND(p.price)}</p>
        <button class="add-btn" data-id="${p.id}">Mua ngay</button>
      </div>`
    )
    .join("");
  attachAddButtons();
}

// ============================
// 💬 TOAST THÔNG BÁO
// ============================
function showToast(msg) {
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.className = "toast";
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 1500);
}

// ============================
// 🎯 LỌC THEO THƯƠNG HIỆU
// ============================
function setupBrandFilter() {
  document.querySelectorAll(".brand-item").forEach((item) => {
    item.addEventListener("click", () => {
      const brand = item.dataset.brand;
      document.querySelectorAll(".brand-item").forEach((b) => b.classList.remove("active"));
      item.classList.add("active");
      renderProductsByBrand(brand);
    });
  });
}

// ============================
// 🚀 KHỞI CHẠY
// ============================
document.addEventListener("DOMContentLoaded", () => {
  renderProductsByBrand("all");
  renderFlashSale();
  updateCartCount();
  setupBrandFilter();
});
// ============================
// 💬 HIỆU ỨNG "ĐÃ THÊM VÀO GIỎ HÀNG"
// ============================
function showToast(msg) {
  // Xóa thông báo cũ nếu có
  const oldToast = document.querySelector(".cart-toast");
  if (oldToast) oldToast.remove();

  // Tạo khung thông báo
  const toast = document.createElement("div");
  toast.className = "cart-toast";
  toast.innerHTML = msg;

  document.body.appendChild(toast);

  // Hiệu ứng hiện
  setTimeout(() => toast.classList.add("show"), 100);

  // Tự động ẩn sau 2 giây
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 2000);
}
