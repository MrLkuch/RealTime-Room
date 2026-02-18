const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Route simple
app.get("/", (req, res) => {
  res.send("Serveur Express fonctionne 🚀");
});

// Socket.IO
io.on("connection", (socket) => {
  console.log("Client connecté :", socket.id);

  socket.on("message", (msg) => {
    console.log("Message reçu :", msg);
    io.emit("message", msg); // renvoie à tous les clients
  });

  socket.on("disconnect", () => {
    console.log("Client déconnecté");
  });
});

// Lancement serveur
server.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
