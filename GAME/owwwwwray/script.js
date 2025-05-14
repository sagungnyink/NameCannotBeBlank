const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = "right";
let food = generateFood();
let score = 0;

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#0ff" : "#00f2ff";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = "#ff4081";
  ctx.fillRect(food.x, food.y, box, box);

  // Move snake
  let head = { ...snake[0] };

  if (direction === "right") head.x += box;
  if (direction === "left") head.x -= box;
  if (direction === "up") head.y -= box;
  if (direction === "down") head.y += box;

  // Game over conditions
  if (
  head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize ||
  snake.some((segment, i) => i !== 0 && segment.x === head.x && segment.y === head.y)
) {
  clearInterval(game);
  alert("💀 Game Over! Skor kamu: " + score);
  isRunning = false;
  return;
}


  snake.unshift(head);

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    document.getElementById("score").textContent = "Skor: " + score;
    food = generateFood();
  } else {
    snake.pop();
  }
}

function generateFood() {
  return {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box
  };
}

// Keyboard control
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && direction !== "down") direction = "up";
  if (e.key === "ArrowDown" && direction !== "up") direction = "down";
  if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
  if (e.key === "ArrowRight" && direction !== "left") direction = "right";
});

// Touch button control
function setDirection(dir) {
  if (dir === "up" && direction !== "down") direction = "up";
  if (dir === "down" && direction !== "up") direction = "down";
  if (dir === "left" && direction !== "right") direction = "left";
  if (dir === "right" && direction !== "left") direction = "right";
}

// Start the game
let game;
let isRunning = false;

function startGame() {
  clearInterval(game);
  // Reset nilai
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = "right";
  food = generateFood();
  score = 0;
  isRunning = true;
  document.getElementById("score").textContent = "Skor: 0";
  game = setInterval(draw, 150);
}

// Tombol mulai
document.getElementById("startBtn").addEventListener("click", () => {
  startGame();
});

