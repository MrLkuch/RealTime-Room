import { useEffect, useState } from "react";
import "./snake.scss";

const SnakeGame = ({ socket }) => {
  const [gameState, setGameState] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const player = gameState?.players[playerId];
  // 🔥 recevoir état du jeu
  useEffect(() => {
    if (!socket) return;

    socket.on("joined", ({ id }) => {
      setPlayerId(id);
    });

    socket.on("game-state", (state) => {
      setGameState({ ...state });
    });

    return () => {
      socket.off("joined");
      socket.off("game-state");
    };
  }, [socket]);

  // 🎮 envoyer direction
  useEffect(() => {
    if (!socket) return;

    const handleKey = (e) => {
      // 🔥 récupérer TON joueur
      const player = gameState?.players?.[playerId];

      // ❌ bloque si pas vivant
      if (!player || !player.alive) return;

      socket.emit("change-direction", e.key);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [socket, gameState, playerId]);

  if (!gameState) return <div>Loading...</div>;

  return (
    <div className="snake-container">

      <div className="snake-board">

        {/* 🍎 FOOD */}
        <div
          className="food"
          style={{
            left: `${gameState.food.x * 20}px`,
            top: `${gameState.food.y * 20}px`,
          }}
        />

        {/* 🐍 PLAYERS */}
        {Object.values(gameState.players).map(player =>
          player.snake.map((segment, i) => (
            <div
              key={player.id + i}
              className="snake"
              style={{
                left: `${segment.x * 20}px`,
                top: `${segment.y * 20}px`,
                background: player.id === playerId ? "lime" : "red",
                opacity: player.alive ? 1 : 0.3
              }}
            />
          ))
        )}

        {player && !player.alive && (
          <div className="overlay">
            {player.snake.length <= 1 ? (
              <>
                <h2>Snake Game 🐍</h2>
                <button onClick={() => socket.emit("start-game")}>
                  Start
                </button>
              </>
            ) : (
              <>
                <h2>Game Over 💀</h2>
                <button onClick={() => socket.emit("start-game")}>
                  Restart
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakeGame;