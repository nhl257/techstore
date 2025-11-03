const express = require("express");
const path = require("path");

const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "Public")));



// Cho phép đọc file tĩnh (HTML, CSS, JS)
app.use(express.static("Public"));

// Cho phép đọc dữ liệu JSON
app.use(express.json());

// === DỮ LIỆU SẢN PHẨM (GIẢ LẬP) ===
const products = [
  { id: 1, name: "Laptop Asus Zenbook", price: 20000000, image: "https://via.placeholder.com/200" },
  { id: 2, name: "iPhone 15 Pro", price: 30000000, image: "https://via.placeholder.com/200" },
  { id: 3, name: "Tai nghe Sony WH-1000XM5", price: 8000000, image: "https://via.placeholder.com/200" },
  { id: 4, name: "Apple Watch Ultra 2", price: 25000000, image: "https://via.placeholder.com/200" },
];

// === API LẤY DANH SÁCH SẢN PHẨM ===
app.get("/api/products", (req, res) => {
  res.json(products);
});

// === KHỞI ĐỘNG SERVER ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
