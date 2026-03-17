export const GRID_SIZE = 20;

export function moveSnake(snake, direction) {
  const head = snake[0];

  let newHead;

  switch (direction) {
    case "ArrowUp":
      newHead = { x: head.x, y: head.y - 1 };
      break;
    case "ArrowDown":
      newHead = { x: head.x, y: head.y + 1 };
      break;
    case "ArrowLeft":
      newHead = { x: head.x - 1, y: head.y };
      break;
    case "ArrowRight":
      newHead = { x: head.x + 1, y: head.y };
      break;
    default:
      newHead = head;
  }

  // 🔥 WRAP (passer de l'autre côté)
  newHead.x = (newHead.x + GRID_SIZE) % GRID_SIZE;
  newHead.y = (newHead.y + GRID_SIZE) % GRID_SIZE;

  return [newHead, ...snake.slice(0, -1)];
}