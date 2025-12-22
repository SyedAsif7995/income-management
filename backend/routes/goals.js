const express = require("express");
const db = require("../db");
const auth = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/", auth, (req, res) => {
  console.log("Authenticated user:", req.user);

  const { title, target_amount, target_date, category } = req.body;
  const user_id = req.user.id; 

  if (!title || !target_amount || !target_date || !category) {
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
        console.error("SQL ERROR:", err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Goal added successfully",
        goalId: result.insertId
      });
    }
  );
});


router.get("/", auth, (req, res) => {
  const user_id = req.user.id;

  const sql = `
    SELECT g.*, IFNULL(SUM(c.amount), 0) AS saved
    FROM goals g
    LEFT JOIN contributions c ON g.id = c.goal_id
    WHERE g.user_id = ?
    GROUP BY g.id
  `;

  db.query(sql, [user_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

router.put("/:id", auth, (req, res) => {
  const goalId = req.params.id;
  const userId = req.user.id;

  const { title, target_amount, target_date, category } = req.body;

  if (!title || !target_amount || !target_date || !category) {
    return res.status(400).json({ message: "All fields required" });
  }

  const sql = `
    UPDATE goals
    SET title = ?, target_amount = ?, target_date = ?, category = ?
    WHERE id = ? AND user_id = ?
  `;

  db.query(
    sql,
    [title, target_amount, target_date, category, goalId, userId],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(403).json({ message: "Unauthorized or goal not found" });
      }

      res.json({ message: "Goal updated successfully " });
    }
  );
});

router.get("/:id", auth, (req, res) => {
  const goalId = req.params.id;
  const userId = req.user.id;

  const sql = `
    SELECT * FROM goals
    WHERE id = ? AND user_id = ?
  `;

  db.query(sql, [goalId, userId], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.json(result[0]);
  });
});

router.delete("/:id", auth, (req, res) => {
  const goalId = req.params.id;
  const userId = req.user.id;

  const deleteContributions = `
    DELETE FROM contributions
    WHERE goal_id = ?
  `;

  db.query(deleteContributions, [goalId], (err) => {
    if (err) return res.status(500).json(err);

  
    const deleteGoal = `
      DELETE FROM goals
      WHERE id = ? AND user_id = ?
    `;

    db.query(deleteGoal, [goalId, userId], (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(403).json({ message: "Goal not found or unauthorized" });
      }

      res.json({ message: "Goal deleted successfully ✅" });
    });
  });
});


module.exports = router;
