let secretNumber;
let guesses = [];
let attemptsLeft = 8;  // Setel jumlah tebakan yang tersisa
let winSound = new Audio('sounds/win.mp3');
let errorSound = new Audio('sounds/error.mp3');

function startGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  guesses = [];
  attemptsLeft = 8;  // Reset jumlah tebakan
  document.getElementById("message").textContent = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("history").textContent = "";
  document.getElementById("attempts").textContent = `Tebakan tersisa: ${attemptsLeft}`;
  document.getElementById("restartBtn").classList.add("hidden");
  document.getElementById("guessInput").disabled = false;
}

function checkGuess() {
  const input = document.getElementById("guessInput");
  const guess = Number(input.value);

  if (!guess || guess < 1 || guess > 100) {
    document.getElementById("message").textContent = "⚠️ Masukkan angka antara 1 dan 100!";
    errorSound.play();
    return;
  }

  guesses.push(guess);
  attemptsLeft--;  // Kurangi jumlah tebakan setiap kali pemain menebak

  if (guess === secretNumber) {
    document.getElementById("message").textContent = `🎉 Kamu menang! Angka yang benar adalah: ${secretNumber}`;
    winSound.play();
    confettiEffect();
    document.getElementById("restartBtn").classList.remove("hidden");
    input.disabled = true;
  } else if (guess < secretNumber) {
    document.getElementById("message").textContent = "🔺 Terlalu rendah!";
  } else {
    document.getElementById("message").textContent = "🔻 Terlalu tinggi!";
  }

  document.getElementById("history").textContent = `Tebakanmu: ${guesses.join(', ')}`;
  document.getElementById("attempts").textContent = `Tebakan tersisa: ${attemptsLeft}`;

  if (attemptsLeft <= 0) {
    document.getElementById("message").textContent = `💔 Kamu kehabisan tebakan! Angka yang benar adalah ${secretNumber}.`;
    document.getElementById("restartBtn").classList.remove("hidden");
    input.disabled = true;
  }

  input.value = "";
}

function confettiEffect() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff6347', '#ffcc00', '#00ffee'],
    zIndex: 9999
  });
}

startGame();
