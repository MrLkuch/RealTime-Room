export const GRID_SIZE = 20;

export function moveSnake(snake, direction) {
  const head = snake[0];

  const moves = {
    ArrowUp: { x: head.x, y: head.y - 1 },
    ArrowDown: { x: head.x, y: head.y + 1 },
    ArrowLeft: { x: head.x - 1, y: head.y },
    ArrowRight: { x: head.x + 1, y: head.y },
  };

  const newHead = moves[direction];

  const newSnake = [newHead, ...snake.slice(0, -1)];

  return newSnake;
}

export function isCollision(head) {
  return (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= GRID_SIZE ||
    head.y >= GRID_SIZE
  );
}