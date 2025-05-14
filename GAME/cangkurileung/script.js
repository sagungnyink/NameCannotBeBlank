const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bird = { x: 50, y: 150, width: 30, height: 30, velocity: 0 };
let gravity = 0.6;
let lift = -10;
let pipes = [];
let frame = 0;
let score = 0;
let highScore = localStorage.getItem("flappyHighScore") || 0;
let gameOver = false;

document.getElementById("highscore").textContent = highScore;

document.addEventListener("keydown", flap);
document.addEventListener("touchstart", flap);

function flap() {
  if (!gameOver) {
    bird.velocity = lift;
  }
}

function restartGame() {
  bird.y = 150;
  bird.velocity = 0;
  pipes = [];
  frame = 0;
  score = 0;
  gameOver = false;
  document.getElementById("score").textContent = score;
  document.getElementById("gameOverScreen").classList.add("hidden");
  loop();
}

function drawBird() {
  ctx.fillStyle = "#FFD700";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
  ctx.fillStyle = "#00FF00";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
  });
}

function updatePipes() {
  if (frame % 90 === 0) {
    const pipeHeight = Math.floor(Math.random() * 200) + 100;
    const gap = 150;
    pipes.push({
      x: canvas.width,
      width: 50,
      top: pipeHeight,
      bottom: canvas.height - pipeHeight - gap,
    });
  }

  pipes.forEach(pipe => {
    pipe.x -= 2;

    if (!pipe.passed && pipe.x + pipe.width < bird.x) {
      pipe.passed = true;
      score++;
      document.getElementById("score").textContent = score;
    }
  });

  pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
}

function checkCollision() {
  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    return true;
  }

  for (let pipe of pipes) {
    if (
      bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)
    ) {
      return true;
    }
  }

  return false;
}

function loop() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bird.velocity += gravity;
  bird.y += bird.velocity;

  updatePipes();
  drawPipes();
  drawBird();

  if (checkCollision()) {
    endGame();
    return;
  }

  frame++;
  requestAnimationFrame(loop);
}

function endGame() {
  gameOver = true;
  document.getElementById("gameOverScreen").classList.remove("hidden");

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("flappyHighScore", highScore);
    document.getElementById("highscore").textContent = highScore;
  }
}

// Start game
restartGame();
