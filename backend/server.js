require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const initDb = require("./db/initDatabase");
const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/tickets", ticketRoutes);


const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await initDb; // ensure tables exist before routes
    console.log("Database initialized");

    app.use("/api/auth", authRoutes);
    app.use("/api/tickets", ticketRoutes);
    app.use("/uploads", express.static("uploads"));

    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1); // stop if DB setup fails
  }
})();

// app.listen(PORT, () =>
//     console.log(`Server running on http://localhost:${PORT}`)
// );


