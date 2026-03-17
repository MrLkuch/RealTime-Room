import { describe, it, expect } from "vitest";
import { moveSnake } from "./snakeLogic";

describe("moveSnake", () => {
  it("move vers la droite", () => {
    const snake = [{ x: 5, y: 5 }];

    const result = moveSnake(snake, "ArrowRight");

    expect(result[0]).toEqual({ x: 6, y: 5 });
  });

  it("move vers le haut", () => {
    const snake = [{ x: 5, y: 5 }];

    const result = moveSnake(snake, "ArrowUp");

    expect(result[0]).toEqual({ x: 5, y: 4 });
  });
});