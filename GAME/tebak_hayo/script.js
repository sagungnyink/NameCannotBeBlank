let angkaBenar = Math.floor(Math.random() * 100) + 1;

document.getElementById("tebak-btn").onclick = function() {
  let tebakan = parseInt(document.getElementById('tebakan').value);
  let hasil = document.getElementById('hasil');

  if (tebakan === angkaBenar) {
    hasil.textContent = "Selamat! Tebakan kamu benar!";
    hasil.style.color = "green";
  } else if (tebakan > angkaBenar) {
    hasil.textContent = "Salah! Angka lebih kecil!";
    hasil.style.color = "red";
  } else {
    hasil.textContent = "Salah! Angka lebih besar!";
    hasil.style.color = "red";
  }
};

function restartGame() {
  angkaBenar = Math.floor(Math.random() * 100) + 1;
  document.getElementById('tebakan').value = '';
  document.getElementById('hasil').textContent = '';
}
