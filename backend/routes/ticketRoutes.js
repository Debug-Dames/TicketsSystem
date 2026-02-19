const router = require("express").Router();
const pool = require("../db/db");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// CREATE TICKET (user)
router.post("/", auth, async (req, res) => {
  const { title, description, priority } = req.body;

  const result = await pool.query(
    `INSERT INTO tickets (title, description, priority, user_id)
     VALUES ($1, $2, $3, $4)
     RETURNING id`,
    [title, description, priority, req.user.id]
  );

  res.json({ id: result.rows[0].id });
  console.log('Tickets: ', res.status)
});


// Add comment to ticket (support)
router.post("/:ticketId/comment", auth, role("support"), async (req, res) => {
  const { comment } = req.body;
  const { ticketId } = req.params;

  if (!comment) {
    return res.status(400).json({ message: "Comment is required" });
  }

  // Insert into ticket_comments table
  await pool.query(
    `INSERT INTO ticket_comments (ticket_id, user_id, comment)
     VALUES ($1, $2, $3)`,
    [ticketId, req.user.id, comment]
  );

  // Update tickets.comment with latest comment
  await pool.query(
    `UPDATE tickets
     SET comment = $1,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $2`,
    [comment, ticketId]
  );

  res.json({ message: "Comment added successfully" });
});


// USER: view own tickets
router.get("/my", auth, async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM tickets WHERE user_id = $1",
    [req.user.id]
  );

  res.json(result.rows);
});


// SUPPORT: view all
router.get("/", auth, role("support"), async (req, res) => {
  const result = await pool.query("SELECT * FROM tickets");
  res.json(result.rows);
});


// SUPPORT: update status
router.put("/:id/status", auth, role("support"), async (req, res) => {
  await pool.query(
    "UPDATE tickets SET status = $1 WHERE id = $2",
    [req.body.status, req.params.id]
  );

  res.json({ message: "Updated" });
});

module.exports = router;