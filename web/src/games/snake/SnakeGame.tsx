import { useEffect, useState } from "react";
import { moveSnake, generateFood, eatFood, isSelfCollision } from "./snakeLogic";
import "./snake.scss";

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState("ArrowRight");
  const [nextDirection, setNextDirection] = useState("ArrowRight");
  const [food, setFood] = useState(() => generateFood([{ x: 10, y: 10 }]));
  const [gameOver, setGameOver] = useState(false);
  const [gameState, setGameState] = useState("start"); 

  const startGame = () => {
    const initialSnake = [{ x: 10, y: 10 }];

    setSnake(initialSnake);
    setDirection("ArrowRight");
    setFood(generateFood(initialSnake));
    setGameState("playing");
  };

  const restartGame = () => {
    const initialSnake = [{ x: 10, y: 10 }];

    setSnake(initialSnake);
    setDirection("ArrowRight");
    setFood(generateFood(initialSnake));
    setGameState("playing");
  };

  useEffect(() => {
    const handleKey = (e) => {
      const opposite = {
        ArrowUp: "ArrowDown",
        ArrowDown: "ArrowUp",
        ArrowLeft: "ArrowRight",
        ArrowRight: "ArrowLeft",
      };

      setNextDirection((prev) => {
        // ❌ bloque demi-tour basé sur la direction ACTUELLE
        if (opposite[direction] === e.key) return prev;

        return e.key;
      });
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  useEffect(() => {
    if (gameState !== "playing") return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        // 🔥 appliquer la direction buffered
        setDirection(nextDirection);

        const result = eatFood(prev, food, nextDirection);
        const newSnake = result.snake;

        if (isSelfCollision(newSnake)) {
          setGameState("gameover");
          return prev;
        }

        if (result.ate) {
          setFood(generateFood(newSnake));
        }

        return newSnake;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [nextDirection, food, gameState]);


  return (
    <div className="snake-container">

      {/* 🟢 START SCREEN */}
      {gameState === "start" && (
        <div className="overlay">
          <h2>Snake Game 🐍</h2>
          <button onClick={startGame}>Start</button>
        </div>
      )}

      {/* 💀 GAME OVER */}
      {gameState === "gameover" && (
        <div className="overlay">
          <h2>Game Over 💀</h2>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}

      {/* 🎮 GAME */}
      <div className="snake-board">

        {/* 🍎 FOOD */}
        <div
          className="food"
          style={{
            left: `${food.x * 20}px`,
            top: `${food.y * 20}px`,
          }}
        />

        {/* 🐍 SNAKE */}
        {snake.map((segment, i) => (
          <div
            key={i}
            className="snake"
            style={{
              left: `${segment.x * 20}px`,
              top: `${segment.y * 20}px`,
            }}
          />
        ))}

      </div>
    </div>
  );
};

export default SnakeGame;