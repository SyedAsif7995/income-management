const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const goalsRoutes = require("./routes/goals");
const contributionsRoutes = require("./routes/contributions");

const app = express();

// 🔥 CONNECT TO MONGODB
connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/goals", goalsRoutes);
app.use("/contributions", contributionsRoutes);

app.get("/", (req, res) => {
  res.send("Backend working ✅");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
