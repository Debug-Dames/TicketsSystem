const router = require("express").Router();
const db = require("../db/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, role = "user" } = req.body;
 
  const hashed = await bcrypt.hash(password, 10);

  try {
    const stmt = db.prepare(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)"
    );

    const result = stmt.run(name, email, hashed, role);

    res.json({ id: result.lastInsertRowid });
  } catch {
    res.status(400).json({ message: "Email already exists" });
  }
});



