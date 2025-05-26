const express = require("express");
const db = require("./db");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(express.json()); // para receber JSON no body

// Rotas
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
