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
  const result = await pool.query(`
  SELECT 
    t.id,
    t.user_id,
    t.title,
    t.description,
    t.priority,
    t.status,
    t.created_at,
    t.updated_at,
    t.assigned_to,
    assigned.name AS assigned_name,
    COALESCE(
      json_agg(
        json_build_object(
          'id', tc.id,
          'user_id', tc.user_id,
          'comment', tc.comment,
          'created_at', tc.created_at
        )
      ) FILTER (WHERE tc.id IS NOT NULL),
      '[]'
    ) AS comments
  FROM tickets t
  LEFT JOIN ticket_comments tc ON tc.ticket_id = t.id
  LEFT JOIN users assigned ON assigned.id = t.assigned_to
  WHERE t.user_id = $1
  GROUP BY t.id, assigned.name
  ORDER BY t.created_at DESC
`, [req.user.id]);

res.json(result.rows);

});


//assign ticket to support (admin)
router.put("/:id/assign", auth, role("support"), async (req, res) => {
  const { assigned_to } = req.body;

  try {
    // Check assigned user exists AND is a support agent
    const assignedUser = await pool.query(
      "SELECT id FROM users WHERE id = $1 AND LOWER(role) = 'support'",
      [assigned_to]
    );

    if (!assignedUser.rows.length) {
      return res.status(400).json({ message: "Invalid support agent" });
    }

    // Update ticket
    await pool.query(
      `UPDATE tickets
       SET assigned_to = $1,
           status = 'in_progress',
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2`,
      [assigned_to, req.params.id]
    );

    return res.json({ message: "Ticket assigned successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
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