const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/", (req, res) => {
  const { goal_id, account_id, amount } = req.body;

  if (!goal_id || !account_id || !amount) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const sql = `
    INSERT INTO contributions (goal_id, account_id, amount)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [goal_id, account_id, amount], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json({ message: "Contribution added" });
  });
});

module.exports = router;
