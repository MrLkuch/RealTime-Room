import { useEffect, useState } from "react";
import { moveSnake, generateFood, eatFood, isSelfCollision } from "./snakeLogic";
import "./snake.scss";

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState("ArrowRight");
  const [food, setFood] = useState(() => generateFood([{ x: 10, y: 10 }]));
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      setDirection(e.key);
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const result = eatFood(prev, food, direction);
        const newSnake = result.snake;

        // 💀 collision avec soi-même
        if (isSelfCollision(newSnake)) {
          setGameOver(true);
          return prev;
        }

        // 🍎 manger
        if (result.ate) {
          setFood(generateFood(newSnake));
        }

        return newSnake;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [direction, food, gameOver]);


  return (
    <div className="snake-board">
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
      <div
        className="food"
        style={{
          left: `${food.x * 20}px`,
          top: `${food.y * 20}px`,
        }}
      />
    </div>
  );
};

export default SnakeGame;