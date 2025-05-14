let timeLeft = 10; // waktu dalam detik
let timerId;
let clickableBox;
let gameStarted = false;

const boxes = document.querySelectorAll('.box');
const timerDisplay = document.getElementById('timer');
const resultDisplay = document.getElementById('result');

function startGame() {
  // Pilih kotak acak untuk diklik
  clickableBox = boxes[Math.floor(Math.random() * boxes.length)];
  clickableBox.style.backgroundColor = "#66cc66"; // Tandai kotak yang bisa diklik

  // Set timer
  timerId = setInterval(updateTimer, 1000);

  // Reset semua kotak
  boxes.forEach(box => {
    box.style.backgroundColor = "#f5f5f5";
    box.onclick = null; // Hapus event sebelumnya
  });

  // Tambahkan event listener untuk kotak yang bisa diklik
  clickableBox.onclick = () => {
    clearInterval(timerId);
    resultDisplay.innerHTML = "<p class='win-message'>Selamat! Kamu menang!</p>";
    clickableBox.style.backgroundColor = "#66cc66"; // Ubah warna kotak yang diklik
    setTimeout(restartGame, 2000); // Restart setelah 2 detik
  };

  gameStarted = true;
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
  } else {
    clearInterval(timerId);
    resultDisplay.innerHTML = "<p class='lose-message'>Waktu Habis! Kamu Kalah!</p>";
    setTimeout(restartGame, 2000); // Restart setelah 2 detik
  }
}

function restartGame() {
  if (!gameStarted) {
    return;
  }

  timeLeft = 10;
  timerDisplay.textContent = timeLeft;
  resultDisplay.innerHTML = "<p>Waktu tersisa: <span id='timer'>10</span> detik</p>";
  startGame();
}

// Mulai game saat halaman dibuka
startGame();
