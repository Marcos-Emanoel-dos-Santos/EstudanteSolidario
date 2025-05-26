const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Erro no servidor" });
    }

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    delete user.password;
    res.json({ message: "Login bem-sucedido!", user });
  });
});

router.post("/register", async (req, res) => {
  const { name, birthday, course, university, email, password } = req.body;

  if (!name || !birthday || !course || !university || !email || !password) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users (name, birthday, course, university, email, password) VALUES (?, ?, ?, ?, ?, ?)",
    [name, birthday, course, university, email, hashedPassword],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err });
      }

      res.status(201).json({ id: this.lastID });
    },
  );
});

module.exports = router;
