// Pilihan player dan komputer
const choices = ['batu', 'gunting', 'kertas'];

document.getElementById('batu').onclick = function() { playGame('batu'); };
document.getElementById('gunting').onclick = function() { playGame('gunting'); };
document.getElementById('kertas').onclick = function() { playGame('kertas'); };

function playGame(playerChoice) {
  // Pilihan komputer secara acak
  let computerChoice = choices[Math.floor(Math.random() * 3)];

  // Menampilkan hasil pilihan komputer
  const result = document.getElementById('result');
  result.innerHTML = `
    <p>Kamu memilih: <strong>${playerChoice}</strong></p>
    <p>Komputer memilih: <strong>${computerChoice}</strong></p>
  `;

  // Menentukan pemenang
  if (playerChoice === computerChoice) {
    result.innerHTML += '<p>Hasilnya Seri!</p>';
  } else if (
    (playerChoice === 'batu' && computerChoice === 'gunting') ||
    (playerChoice === 'gunting' && computerChoice === 'kertas') ||
    (playerChoice === 'kertas' && computerChoice === 'batu')
  ) {
    result.innerHTML += '<p>Kamu Menang!</p>';
  } else {
    result.innerHTML += '<p>Komputer Menang!</p>';
  }
}

function restartGame() {
  document.getElementById('result').innerHTML = '<p>Silakan pilih salah satu di atas!</p>';
}
