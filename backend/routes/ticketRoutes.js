const router = require("express").Router();
const pool = require("../db/db");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // or configure diskStorage

// CREATE TICKET (user)
router.post("/", auth, upload.array("attachments"), async (req, res) => {
  const { title, description, priority } = req.body;
  // Multer adds files to req.files
  const files = req.files || []; // array of uploaded files
  // const filePaths = files?.map(f => f.path) || [];

  try {
    const result = await pool.query(
      `INSERT INTO tickets (title, description, priority, user_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, description, priority, req.user.id]
    );

    const ticket = result.rows[0];

    // Log the response for debugging
    console.log("New ticket created:", ticket);

    for (let file of files) {
      await pool.query(
        `INSERT INTO ticket_attachments (ticket_id, file_path)
         VALUES ($1, $2)`,
        [ticket.id, file.path]
      );
    }

    // Send a structured JSON response
    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create ticket",
      error: error.message,
    });
  }
});



// Add comment to ticket (support)
router.post("/:ticketId/comment", auth, role("support"), async (req, res) => {
  const { comment } = req.body;
  const { ticketId } = req.params;

  if (!comment) {
    return res.status(400).json({
      success: false,
      message: "Comment is required",
    });
  }

  try {
    // Insert into ticket_comments table
    const insertResult = await pool.query(
      `INSERT INTO ticket_comments (ticket_id, user_id, comment)
       VALUES ($1, $2, $3)
       RETURNING id, ticket_id, user_id, comment, created_at`,
      [ticketId, req.user.id, comment]
    );

    const newComment = insertResult.rows[0];

    // Update tickets.updated_at (optional: remove tickets.comment if not needed)
    await pool.query(
      `UPDATE tickets
       SET updated_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [ticketId]
    );

    // Log for debugging
    console.log("New comment added:", newComment);

    // Send structured response
    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add comment",
      error: error.message,
    });
  }
});

// USER: view own tickets
router.get("/my", auth, async (req, res) => {
  try {
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
            jsonb_build_object(
              'id', ta.id,
              'file_path', ta.file_path
            )
          ) FILTER (WHERE ta.id IS NOT NULL),
          '[]'
        ) AS attachments,
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
      LEFT JOIN ticket_attachments ta ON ta.ticket_id = t.id
      LEFT JOIN ticket_comments tc ON tc.ticket_id = t.id
      LEFT JOIN users assigned ON assigned.id = t.assigned_to
      WHERE t.user_id = $1
      GROUP BY t.id, assigned.name
      ORDER BY t.created_at DESC
    `, [req.user.id]);

    const tickets = result.rows;

    // Log for debugging
    console.log("My tickets response:", tickets);

    // Send structured response
    res.status(200).json({
      success: true,
      message: "Tickets fetched successfully",
      tickets,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tickets",
      error: error.message,
    });
  }
});


//assign ticket to support (admin)
router.put("/:id/assign", auth, role("support"), async (req, res) => {
  const { assigned_to } = req.body;

  try {
    // Check assigned user exists AND is a support agent
    const assignedUser = await pool.query(
      "SELECT id, name FROM users WHERE id = $1 AND LOWER(role) = 'support'",
      [assigned_to]
    );

    if (!assignedUser.rows.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid support agent",
      });
    }

    // Update ticket and return updated row
    const updateResult = await pool.query(
      `UPDATE tickets
       SET assigned_to = $1,
           status = 'in_progress',
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING id, title, description, priority, status, user_id, assigned_to, updated_at`,
      [assigned_to, req.params.id]
    );

    const updatedTicket = updateResult.rows[0];

    // Log for debugging
    console.log("Ticket assigned:", updatedTicket);

    return res.status(200).json({
      success: true,
      message: "Ticket assigned successfully",
      ticket: {
        ...updatedTicket,
        assigned_name: assignedUser.rows[0].name,
      },
    });
  } catch (error) {
    console.error("Error assigning ticket:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});



// SUPPORT: view all
router.get("/", auth, role("support"), async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tickets");
    const tickets = result.rows;

    // Log for debugging
    console.log("All tickets response:", tickets);

    // Send structured response
    res.status(200).json({
      success: true,
      message: "Tickets fetched successfully",
      tickets,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tickets",
      error: error.message,
    });
  }
});


// SUPPORT: update status
router.put("/:id/status", auth, role("support"), async (req, res) => {
  const { status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tickets
       SET status = $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING id, title, description, priority, status, user_id, assigned_to, updated_at`,
      [status, req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    const updatedTicket = result.rows[0];

    // Log for debugging
    console.log("Ticket status updated:", updatedTicket);

    res.status(200).json({
      success: true,
      message: "Ticket status updated successfully",
      ticket: updatedTicket,
    });
  } catch (error) {
    console.error("Error updating ticket status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update ticket status",
      error: error.message,
    });
  }
});

module.exports = router;