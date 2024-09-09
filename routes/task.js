const express = require("express");
const router = express.Router();
const db = require("../models/task");

// Create a new task
router.post("/", (req, res) => {
  const { status, task, tag } = req.body;
 // const tagString = JSON.stringify(tag);  // Convert array to JSON string
  const query = `INSERT INTO tasks(status, task, tags) VALUES(?,?,?)`;

  db.run(query, [status, task, tag], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }
    res.send({ id: this.lastID, task: task, status: status, tags: tag });
  });
});

// Get all tasks
router.get("/", (req, res) => {
  const query = `SELECT * FROM tasks`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }
    rows.forEach(row => {
      try {
        row.tags = JSON.parse(row.tags); // Parse JSON string back to array
      } catch (e) {
        console.error('Error parsing tags:', e);
        row.tags = []; // Fallback to empty array
      }
    });
    res.send(rows);
  });
});

// Update a task by ID
router.put("/:id", (req, res) => {
    const { status } = req.body; // Only extract status
    const { id } = req.params;
    
    if (typeof status !== 'string') {
      return res.status(400).json({ message: 'Invalid status format' });
    }
  
    const query = `UPDATE tasks SET status = ? WHERE id = ?`;
  
    db.run(query, [status, id], function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: err.message });
      }
      res.send({ id: id, status: status });
    });
  });
  

// Delete a task by ID
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM tasks WHERE id = ?`;
  
    db.run(query, [id], function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: err.message });
      }
      res.send({ changes: this.changes });
    });
  });
  

module.exports = router;
