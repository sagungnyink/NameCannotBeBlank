const resultDiv = document.getElementById("result");
const computerDiv = document.getElementById("computer");
const resetBtn = document.querySelector(".reset-btn");

function play(playerChoice) {
  const options = ["rock", "paper", "scissors"];
  const computerChoice = options[Math.floor(Math.random() * 3)];

  // Tentukan hasil
  let result = "";
  if (playerChoice === computerChoice) {
    result = "⚖️ Seri!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    result = "🎉 Kamu Menang!";
  } else {
    result = "😵 Kamu Kalah!";
  }

  // Tampilkan hasil
  resultDiv.textContent = result;
  computerDiv.textContent = `Komputer memilih: ${emoji(computerChoice)} ${capitalize(computerChoice)}`;
  resetBtn.classList.remove("hidden");

  // Nonaktifkan tombol
  document.querySelectorAll(".btn").forEach(btn => btn.disabled = true);
}

function resetGame() {
  resultDiv.textContent = "";
  computerDiv.textContent = "";
  resetBtn.classList.add("hidden");
  document.querySelectorAll(".btn").forEach(btn => btn.disabled = false);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function emoji(choice) {
  return {
    rock: "🗿",
    paper: "📄",
    scissors: "✂️"
  }[choice];
}
