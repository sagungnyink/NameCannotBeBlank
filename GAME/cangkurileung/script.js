const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bird = { x: 50, y: 150, width: 30, height: 30, velocity: 0 };
let gravity = 0.6;
let lift = -10;
let pipes = [];
let score = 0;
let gameOver = false;

document.addEventListener("keydown", () => {
  if (!gameOver) bird.velocity = lift;
});

function drawBird() {
  ctx.fillStyle = "#ffeb3b";
  ctx.beginPath();
  ctx.arc(bird.x + bird.width / 2, bird.y + bird.height / 2, bird.width / 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawPipes() {
  ctx.fillStyle = "#4caf50";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
  });
}

function updatePipes() {
  pipes.forEach(pipe => {
    pipe.x -= 2;
    // Tabbrak
    if (
      bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)
    ) {
      gameOver = true;
    }

    // Lewat
    if (!pipe.passed && pipe.x + pipe.width < bird.x) {
      score++;
      pipe.passed = true;
      document.getElementById("score").textContent = score;
    }
  });

  if (pipes.length === 0 || pipes[pipes.length - 1].x < 250) {
    const top = Math.random() * (canvas.height / 2);
    const gap = 150;
    pipes.push({
      x: canvas.width,
      width: 40,
      top: top,
      bottom: canvas.height - top - gap,
      passed: false
    });
  }

  if (pipes[0].x + pipes[0].width < 0) {
    pipes.shift();
  }
}

function update() {
  if (gameOver) {
    ctx.fillStyle = "#e91e63";
    ctx.font = "32px Arial";
    ctx.fillText("Game Over!", 120, 250);
    return;
  }

  bird.velocity += gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    gameOver = true;
  }

  updatePipes();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBird();
  drawPipes();
}

function loop() {
  update();
  draw();
  if (!gameOver) requestAnimationFrame(loop);
}

function restartGame() {
  bird = { x: 50, y: 150, width: 30, height: 30, velocity: 0 };
  pipes = [];
  score = 0;
  gameOver = false;
  document.getElementById("score").textContent = score;
  loop();
}

restartGame(); // Start saat halaman dibuka
