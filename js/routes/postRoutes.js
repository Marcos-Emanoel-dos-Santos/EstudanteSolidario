const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/", (req, res) => {
  const { user_id, title, content } = req.body;

  if (!user_id || !content) {
    return res
      .status(400)
      .json({ error: "user_id e content são obrigatórios." });
  }

  const createdAt = new Date().toISOString();

  const query = `
    INSERT INTO posts (user_id, title, content, created_at)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [user_id, title, content, createdAt], function (err) {
    if (err) {
      return res.status(500).json({ error: "Erro ao criar post." });
    }

    res.status(201).json({
      message: "Post criado com sucesso!",
      post_id: this.lastID,
    });
  });
});

module.exports = router;
