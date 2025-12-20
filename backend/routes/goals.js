const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/", (req, res) => {
  console.log(" Request body:", req.body);

  const { user_id, title, target_amount, target_date, category } = req.body;

  if (!user_id || !title || !target_amount || !target_date || !category) {
    console.log("Missing fields");
    return res.status(400).json({ message: "Missing fields" });
  }

  const sql = `
    INSERT INTO goals (user_id, title, target_amount, target_date, category)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [user_id, title, target_amount, target_date, category],
    (err, result) => {
      if (err) {
        console.error(" SQL ERROR:", err);
        return res.status(500).json(err);
      }

      console.log(" Goal inserted, ID:", result.insertId);
      res.json({ message: "Goal added successfully" });
    }
  );
});

router.get("/", (req, res) => {
  const sql = `
    SELECT g.*, IFNULL(SUM(c.amount), 0) AS saved
    FROM goals g
    LEFT JOIN contributions c ON g.id = c.goal_id
    GROUP BY g.id
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

module.exports = router;
