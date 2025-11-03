const express = require("express");
const path = require("path");
const app = express();

// ✅ Cho phép Express phục vụ file tĩnh trong thư mục "Public"
app.use(express.static(path.join(__dirname, "Public")));

// ✅ Trả về file index.html khi truy cập "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Public", "index.html"));
});

// ✅ Render sẽ tự cấp cổng PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
