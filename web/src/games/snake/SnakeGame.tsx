import { useEffect, useState } from "react";
import { moveSnake } from "./snakeLogic";
import "./snake.scss";

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState("ArrowRight");

  useEffect(() => {
    const handleKey = (e) => {
      setDirection(e.key);
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnake((prev) => moveSnake(prev, direction));
    }, 200);

    return () => clearInterval(interval);
  }, [direction]);

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
    </div>
  );
};

export default SnakeGame;