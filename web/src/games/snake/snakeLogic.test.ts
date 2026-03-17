import { describe, it, expect } from "vitest";
import { moveSnake } from "./snakeLogic";

describe("wrap", () => {
  it("sort à gauche et revient à droite", () => {
    const snake = [{ x: 0, y: 5 }];

    const result = moveSnake(snake, "ArrowLeft");

    expect(result[0]).toEqual({ x: 19, y: 5 });
  });

  it("sort en haut et revient en bas", () => {
    const snake = [{ x: 5, y: 0 }];

    const result = moveSnake(snake, "ArrowUp");

    expect(result[0]).toEqual({ x: 5, y: 19 });
  });
});