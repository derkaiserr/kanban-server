const express = require("express");
const router = express.Router();
const db = require("../models/mood");

router.post("/", (req, res) => {
  const { status, task, tag } = req.body;
  const tagString = JSON.stringify(tag);
  const query = `INSERT INTO tasks(status, task, tags) VALUES(?,?,?)`;

  db.run(query, [status, task, tagString], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }
    res.send({ id: this.lastID, task: task, status: status, tags: tagString });
  });
});

router.get("/", (req, res) => {
  const query = `SELECT * FROM tasks`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }
    res.send(rows);
  });
});

router.put("/:id", (req, res) => {
  const { task, tag, status } = req.body;
  const tagString = JSON.stringify(tag);
  const { id } = req.params;
  const query = `UPDATE tasks SET task = ? WHERE status = ? WHERE tags = ? WHERE id = ?`;

  db.run(query, [task, status, tagString, id], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }
    res.send({ id: id, status: status, tags: tagString, task:task });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM moods WHERE id = ?`;

  db.run(query, [id], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }
    res.send({ changes: this.changes });
  });
});

module.exports = router;