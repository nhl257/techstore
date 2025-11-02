// Lấy danh sách sản phẩm
let products = [];

// 1️⃣ Lấy sản phẩm admin đã thêm (localStorage)
const localProducts = JSON.parse(localStorage.getItem("products")) || [];

// 2️⃣ Lấy sản phẩm mặc định từ server (cho chắc)
fetch("/api/products")
  .then((res) => res.json())
  .then((data) => {
    // Gộp sản phẩm mặc định + sản phẩm admin thêm
    products = [...data, ...localProducts];
    renderProducts();
  })
  .catch((err) => {
    console.error("Lỗi tải sản phẩm từ server:", err);
    // Nếu server lỗi, vẫn hiển thị local products
    products = localProducts;
    renderProducts();
  });

// 3️⃣ Hàm render danh sách sản phẩm
function renderProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML = `<p>Chưa có sản phẩm nào!</p>`;
    return;
  }

  products.forEach((p) => {
    const div = document.createElement("div");
    div.className =
      "border rounded-lg p-4 shadow-md hover:shadow-lg transition";
    div.innerHTML = `
  <h3 class="text-lg font-semibold mb-1">
    <a href="product.html?id=${p.id || Date.now()}" class="hover:underline">${p.name}</a>
  </h3>
  <p class="text-gray-600 mb-2">Giá: ${p.price.toLocaleString()}đ</p>
  <button class="add-btn bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          data-id="${p.id || Date.now()}"
          data-name="${p.name}"
          data-price="${p.price}">
    Thêm vào giỏ
  </button>
`;

    productList.appendChild(div);
  });

  // Gắn sự kiện thêm giỏ
  document.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const product = {
        id: e.target.dataset.id,
        name: e.target.dataset.name,
        price: Number(e.target.dataset.price),
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`✅ Đã thêm "${product.name}" vào giỏ hàng!`);
    });
  });
}
