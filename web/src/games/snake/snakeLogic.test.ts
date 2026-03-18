import { describe, it, expect } from "vitest";
import { moveSnake, GRID_SIZE, generateFood, eatFood  } from "./snakeLogic";

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


describe("generateFood", () => {
  it("génère une pomme dans la grille", () => {
    const food = generateFood([]);

    expect(food.x).toBeGreaterThanOrEqual(0);
    expect(food.y).toBeGreaterThanOrEqual(0);
    expect(food.x).toBeLessThan(GRID_SIZE);
    expect(food.y).toBeLessThan(GRID_SIZE);
  });

});

it("ne génère pas une pomme sur le snake", () => {
  const snake = [{ x: 5, y: 5 }];

  for (let i = 0; i < 20; i++) {
    const food = generateFood(snake);

    expect(food).not.toEqual({ x: 5, y: 5 });
  }
});


it("le snake grandit quand il mange", () => {
  const snake = [{ x: 5, y: 5 }];
  const food = { x: 6, y: 5 };

  const result = eatFood(snake, food, "ArrowRight");

  expect(result.snake.length).toBe(2);
});