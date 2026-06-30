require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const inventoryRoutes = require("./routes/inventoryRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const forecastRoutes = require("./routes/forecastRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/items", inventoryRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/forecast", forecastRoutes);
app.use("/api/auth", authRoutes);

app.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT NOW() AS server_time");

    res.json({
      success: true,
      message: "CareStock Backend Running 🚀",
      database: "Connected",
      serverTime: rows[0].server_time
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Database connection failed"
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});