const express = require("express");
const cors = require("cors");
require("dotenv").config();

const goalsRoutes = require("./routes/goals");
const contributionsRoutes = require("./routes/contributions");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend working ");
});

app.use("/goals", goalsRoutes);
app.use("/contributions", contributionsRoutes); 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
