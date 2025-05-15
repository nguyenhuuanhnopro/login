const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('users.db');

// API kiểm tra đăng nhập
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, row) => {
    if (err) {
      res.status(500).json({ message: "Lỗi server." });
    } else if (row) {
      res.json({ success: true, message: "Đăng nhập thành công!" });
    } else {
      res.json({ success: false, message: "Sai tài khoản hoặc mật khẩu." });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
