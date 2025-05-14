const gameArea = document.getElementById("gameArea");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highscore");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreDisplay = document.getElementById("finalScore");

let score = 0;
let timeLeft = 30;
let gameInterval;
let boxInterval;
let highScore = localStorage.getItem("clickBoxHighScore") || 0;

highScoreDisplay.textContent = highScore;

function startGame() {
  score = 0;
  timeLeft = 30;
  updateUI();
  gameArea.innerHTML = "";
  gameOverScreen.classList.add("hidden");

  gameInterval = setInterval(updateTimer, 1000);
  boxInterval = setInterval(spawnBox, 800);
}

function updateUI() {
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  highScoreDisplay.textContent = highScore;
}

function updateTimer() {
  timeLeft--;
  if (timeLeft < 0) timeLeft = 0;
  timerDisplay.textContent = timeLeft;

  // 💡 Jika waktu tinggal 5 detik, tambahkan class "timer-warning"
  if (timeLeft <= 5) {
    timerDisplay.classList.add("timer-warning");
  } else {
    timerDisplay.classList.remove("timer-warning");
  }

  if (timeLeft <= 0) {
    endGame();
  }
}


function spawnBox() {
  const box = document.createElement("div");
  box.classList.add("box");

  const x = Math.random() * (gameArea.clientWidth - 50);
  const y = Math.random() * (gameArea.clientHeight - 50);
  box.style.left = `${x}px`;
  box.style.top = `${y}px`;

  box.addEventListener("click", (e) => {
    e.stopPropagation(); // Mencegah event dari merambat ke gameArea
    score++;
    updateUI();
    box.remove();
  });

  gameArea.appendChild(box);

  setTimeout(() => {
    if (gameArea.contains(box)) box.remove();
  }, 1500);
}

// ✅ Tambahkan penalti jika klik area kosong
gameArea.addEventListener("click", () => {
  timeLeft -= 3;
  if (timeLeft < 0) timeLeft = 0;
  updateUI();

  if (timeLeft <= 0) {
    endGame();
  }
});

function endGame() {
  clearInterval(gameInterval);
  clearInterval(boxInterval);
  gameArea.innerHTML = "";
  gameOverScreen.classList.remove("hidden");
  finalScoreDisplay.textContent = score;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("clickBoxHighScore", highScore);
  }

  updateUI();
}

// Start game
startGame();
