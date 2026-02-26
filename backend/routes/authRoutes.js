const router = require("express").Router();
const db = require("../db/initDatabase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, role = "user" } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    db.run(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashed, role],
      function (err) {
        if (err) {
          console.error(err);
          return res.status(400).json({ message: "Email already exists" });
        }

        res.json({ id: this.lastID });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, user) => {
      if (err || !user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ token, user });
    }
  );
});


module.exports = router;
