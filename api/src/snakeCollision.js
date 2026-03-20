function checkPlayerCollision(players) {
  const deaths = {};

  const allPlayers = Object.values(players);

  allPlayers.forEach(player => {
    if (!player.alive) {
      deaths[player.id] = false;
      return;
    }

    const head = player.snake[0];
    let isDead = false;

    allPlayers.forEach(other => {
      // ❌ ignore les morts
      if (!other.alive) return;

      const body =
        other.id === player.id
          ? other.snake.slice(1)
          : other.snake;

      body.forEach(segment => {
        if (segment.x === head.x && segment.y === head.y) {
          isDead = true;
        }
      });
    });

    // 💥 head-to-head (vivants uniquement)
    allPlayers.forEach(other => {
      if (!other.alive) return;
      if (other.id !== player.id) {
        const otherHead = other.snake[0];
        if (otherHead.x === head.x && otherHead.y === head.y) {
          isDead = true;
        }
      }
    });

    deaths[player.id] = isDead;
  });

  return deaths;
}

module.exports = { checkPlayerCollision };