const router = require("express").Router();
const db = require("../db/db");

const auth = require("../middleware/auth");
const role = require("../middleware/role");


// CREATE TICKET (user)
router.post("/", auth, (req, res) => {
  const { title, description, priority = "low" } = req.body;

  db.run(
    `INSERT INTO tickets (user_id, title, description, priority)
     VALUES (?, ?, ?, ?)`,
    [req.user.id, title, description, priority],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error creating ticket" });
      }

      res.json({ id: this.lastID });
    }
  );
});



// USER: view own tickets
router.get("/my", auth, (req, res) => {
  db.all(
    "SELECT * FROM tickets WHERE user_id = ?",
    [req.user.id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching tickets" });
      }

      res.json(rows);
    }
  );
});



// SUPPORT: view all
router.get("/", auth, role("support"), (req, res) => {
  db.all("SELECT * FROM tickets", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching tickets" });
    }

    res.json(rows);
  });
});



// SUPPORT: update status
router.patch("/:id/status", auth, role("support"), (req, res) => {
  const { status } = req.body;

  db.run(
    "UPDATE tickets SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [status, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "Error updating ticket" });
      }

      res.json({ message: "Updated" });
    }
  );
});


module.exports = router;
