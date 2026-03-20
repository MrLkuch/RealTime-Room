const { checkPlayerCollision } = require("./snakeCollision");const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// Socket.IO avec CORS
const io = new Server(server, {
  cors: {
    origin: "*", // ⚠️ Remplacer par l'URL front en prod
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

// 🔥 GAME STATE
const GRID_SIZE = 20;
const games = {
  "global-room": {
    players: {},
    food: { x: 5, y: 5 }
  }
};

// 🔥 Utils jeu
function moveSnake(snake, direction) {
  const head = snake[0];
  let newHead = { ...head };

  switch (direction) {
    case "ArrowUp": newHead.y--; break;
    case "ArrowDown": newHead.y++; break;
    case "ArrowLeft": newHead.x--; break;
    case "ArrowRight": newHead.x++; break;
  }

  newHead.x = (newHead.x + GRID_SIZE) % GRID_SIZE;
  newHead.y = (newHead.y + GRID_SIZE) % GRID_SIZE;

  return [newHead, ...snake.slice(0, -1)];
}

function generateFood(players) {
  let food;
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (
    Object.values(players).some(player =>
      player.snake.some(seg => seg.x === food.x && seg.y === food.y)
    )
  );
  return food;
}

function isSelfCollision(snake) {
  const [head, ...body] = snake;
  return body.some(seg => seg.x === head.x && seg.y === head.y);
}

// 🔥 SOCKET.IO
io.on("connection", (socket) => {
  console.log("Client connecté :", socket.id);

  // 🔹 Log events pour debug
  socket.onAny((event, ...args) => {
    console.log("Event reçu :", event, args);
  });

  // 🔹 Join room
  socket.on("join", (username) => {
    socket.data.username = username;
    socket.join("global-room");

    const game = games["global-room"];

    game.players[socket.id] = {
      id: socket.id,
      username,
      snake: [{ x: 10, y: 10 }],
      direction: "ArrowRight",
      alive: false // ⛔ Start game doit être appuyé
    };

    socket.emit("joined", { id: socket.id });

    io.to("global-room").emit("system-message", {
      message: `${username} a rejoint la room`
    });

    io.to("global-room").emit("game-state", game);
  });

  // 🔹 Chat
  socket.on("send-message", (message) => {
    const username = socket.data.username || "Unknown";
    io.to("global-room").emit("chat-message", {
      username,
      message
    });
  });

  // 🔹 Direction joueur
  socket.on("change-direction", (dir) => {
    const player = games["global-room"].players[socket.id];
    if (!player || !player.alive) return;

    const opposite = {
      ArrowUp: "ArrowDown",
      ArrowDown: "ArrowUp",
      ArrowLeft: "ArrowRight",
      ArrowRight: "ArrowLeft",
    };

    // ❌ empêche demi-tour
    if (opposite[player.direction] === dir) return;

    player.direction = dir;
  });

  // 🔹 Start / Restart game
  socket.on("start-game", () => {
    const player = games["global-room"].players[socket.id];
    if (!player) return;

    player.snake = [{ x: 10, y: 10 }];
    player.direction = "ArrowRight";
    player.alive = true;
  });

  // 🔹 Déconnexion
  socket.on("disconnect", () => {
    const game = games["global-room"];
    if (game) {
      const username = socket.data.username || "Unknown";
      delete game.players[socket.id];

      io.to("global-room").emit("system-message", {
        message: `${username} a quitté la room`
      });

      io.to("global-room").emit("game-state", game);
    }
  });
});

// 🔥 GAME LOOP
setInterval(() => {
  const game = games["global-room"];
  if (!game) return;

  Object.values(game.players).forEach(player => {
    if (!player.alive) return;

    const newSnake = moveSnake(player.snake, player.direction);
    const head = newSnake[0];

    // 💀 collision self
    if (isSelfCollision(newSnake)) {
      player.alive = false;
      return;
    }

    // 🍎 manger nourriture
    if (head.x === game.food.x && head.y === game.food.y) {
      player.snake = [head, ...player.snake];
      game.food = generateFood(game.players);
    } else {
      player.snake = newSnake;
    }

    const deaths = checkPlayerCollision(game.players);

    Object.values(game.players).forEach(player => {
      if (deaths[player.id]) {
        player.alive = false;
      }
    });
  });

  io.to("global-room").emit("game-state", game);
}, 200);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});