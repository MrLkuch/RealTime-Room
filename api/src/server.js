const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// Socket.IO avec CORS propre
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Route simple
app.get("/", (req, res) => {
  res.send("Serveur Express fonctionne 🚀");
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

// Socket.IO
io.on("connection", (socket) => {
  console.log("Client connecté :", socket.id);

  socket.on("message", (msg) => {
    console.log("Message reçu :", msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Client déconnecté");
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
