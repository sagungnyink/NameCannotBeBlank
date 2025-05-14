const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize; // harus menghasilkan bilangan bulat!


let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let apple = getRandomPosition();
let score = 0;

document.addEventListener("keydown", changeDirection);

function gameLoop() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Game over conditions
  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    alert("Game Over! Skor: " + score);
    return;
  }

  snake.unshift(head);

  // Apple eaten
  if (head.x === apple.x && head.y === apple.y) {
    score++;
    document.getElementById("score").textContent = score;
    apple = getRandomPosition();
  } else {
    snake.pop();
  }

  drawGame();
  setTimeout(gameLoop, 100);
}

function drawGame() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw apple
  ctx.fillStyle = "#f00";
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#f00";
  ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);

  // Draw snake
  ctx.fillStyle = "#0f0";
  ctx.shadowColor = "#0f0";
  snake.forEach((segment, index) => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });

  ctx.shadowBlur = 0; // Reset shadow
}

function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
}

function changeDirection(e) {
  const key = e.key;
  if (key === "ArrowUp" && direction.y !== 1) direction = { x: 0, y: -1 };
  else if (key === "ArrowDown" && direction.y !== -1) direction = { x: 0, y: 1 };
  else if (key === "ArrowLeft" && direction.x !== 1) direction = { x: -1, y: 0 };
  else if (key === "ArrowRight" && direction.x !== -1) direction = { x: 1, y: 0 };
}

function restartGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 1, y: 0 }; // gerak ke kanan saat mulai

  apple = getRandomPosition();
  score = 0;
  document.getElementById("score").textContent = score;
  gameLoop();
}

gameLoop();
