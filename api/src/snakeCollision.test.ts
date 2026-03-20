import { describe, it, expect } from "vitest";
import { checkPlayerCollision } from "./snakeCollision";

describe("Snake collisions between players", () => {

  it("dies when hitting another player's body", () => {
    const players = {
      A: {
        id: "A",
        snake: [{ x: 5, y: 5 }]
      },
      B: {
        id: "B",
        snake: [
          { x: 10, y: 10 },
          { x: 5, y: 5 } // collision ici
        ]
      }
    };

    const result = checkPlayerCollision(players);

    expect(result.A).toBe(true); // A meurt
    expect(result.B).toBe(false);
  });

  it("dies on head-to-head collision", () => {
    const players = {
      A: { id: "A", snake: [{ x: 5, y: 5 }] },
      B: { id: "B", snake: [{ x: 5, y: 5 }] }
    };

    const result = checkPlayerCollision(players);

    expect(result.A).toBe(true);
    expect(result.B).toBe(true);
  });

  it("no collision = no death", () => {
    const players = {
      A: { id: "A", snake: [{ x: 1, y: 1 }] },
      B: { id: "B", snake: [{ x: 10, y: 10 }] }
    };

    const result = checkPlayerCollision(players);

    expect(result.A).toBe(false);
    expect(result.B).toBe(false);
  });

});