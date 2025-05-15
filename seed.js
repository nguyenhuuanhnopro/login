const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('users.db');
// pha lang pha xom
db.serialize(() => {
  db.run("DROP TABLE IF EXISTS users");
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT, password TEXT)");

  const stmt = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)");

  for (let i = 1; i <= 10; i++) {
    stmt.run(`user${i}@example.com`, `password${i}`);
  }

  stmt.finalize();
  console.log("Đã tạo và thêm dữ liệu người dùng.");
});

db.close();
