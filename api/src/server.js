const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// Socket.IO avec CORS
const io = new Server(server, {
  cors: {
    origin: "*", // ⚠️ En prod, remplacer par l'URL de ton front
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

  // 🔹 Log tous les events pour debug
  socket.onAny((event, ...args) => {
    console.log("Event reçu :", event, args);
  });

// Join room
socket.on("join", (username) => {
  socket.data.username = username;
  socket.join("global-room");
  console.log(`[SERVER] ${username} a rejoint la room avec socket.id=`, socket.id);
  console.log(`[SERVER] Sockets dans global-room :`, Array.from(io.sockets.adapter.rooms.get("global-room") || []));
  io.to("global-room").emit("system-message", {
    message: `${username} a rejoint la room`
  });
  // Confirmer au client que le join est pris en compte
  socket.emit("joined", { username });
});

// Chat
socket.on("send-message", (message) => {
  const username = socket.data.username || "Unknown";
  console.log(`[SERVER] Message reçu de ${username} (socket.id=${socket.id}):`, message);
  console.log(`[SERVER] Sockets dans global-room au moment d'émettre :`, Array.from(io.sockets.adapter.rooms.get("global-room") || []));
  io.to("global-room").emit("chat-message", {
    username,
    message
  });
});

  // 🔹 Déconnexion
  socket.on("disconnect", () => {
    if (socket.data.username) {
      console.log(`${socket.data.username} a quitté la room`);
      io.to("global-room").emit("system-message", {
        message: `${socket.data.username} a quitté la room`
      });
    }
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});