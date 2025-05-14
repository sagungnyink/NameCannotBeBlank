const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gridSize = 20;
let tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 };
let apple = getRandomPosition();
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

document.getElementById("highscore").textContent = highScore;

let gameOver = false;

document.addEventListener("keydown", changeDirection);

function changeDirection(e) {
  if (e.key === "ArrowUp" && direction.y !== 1) direction = { x: 0, y: -1 };
  if (e.key === "ArrowDown" && direction.y !== -1) direction = { x: 0, y: 1 };
  if (e.key === "ArrowLeft" && direction.x !== 1) direction = { x: -1, y: 0 };
  if (e.key === "ArrowRight" && direction.x !== -1) direction = { x: 1, y: 0 };
}

function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
}

function gameLoop() {
  if (gameOver) return;

  moveSnake();
  checkCollision();
  drawGame();

  setTimeout(gameLoop, 100);
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  if (head.x === apple.x && head.y === apple.y) {
    score++;
    apple = getRandomPosition();
    document.getElementById("score").textContent = score;
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];

  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount ||
    snake.slice(1).some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    endGame();
  }
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "#00e676";
  snake.forEach(seg => {
    ctx.fillRect(seg.x * gridSize, seg.y * gridSize, gridSize - 2, gridSize - 2);
  });

  // Draw apple
  ctx.fillStyle = "#ff1744";
  ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize - 2, gridSize - 2);
}

function endGame() {
  gameOver = true;
  document.getElementById("gameOverScreen").classList.remove("hidden");

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    document.getElementById("highscore").textContent = highScore;
  }
}

function restartGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 1, y: 0 };
  apple = getRandomPosition();
  score = 0;
  document.getElementById("score").textContent = score;
  gameOver = false;
  document.getElementById("gameOverScreen").classList.add("hidden");
  gameLoop();
}

// Start game
restartGame();
