const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const scoreEl = document.getElementById("score");

const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 20;
let board = [];
let currentPiece;
let gameInterval;
let score = 0;

const COLORS = ["#0ff", "#ff4081", "#f0f", "#0f0", "#ff0", "#00f", "#f90"];

const SHAPES = [
  [[1, 1, 1, 1]],
  [[1, 1], [1, 1]],
  [[0, 1, 0], [1, 1, 1]],
  [[1, 1, 0], [0, 1, 1]],
  [[0, 1, 1], [1, 1, 0]],
  [[1, 0, 0], [1, 1, 1]],
  [[0, 0, 1], [1, 1, 1]],
];

function drawBlock(x, y, color) {
  context.fillStyle = color;
  context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  context.strokeStyle = "#000";
  context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

function drawBoard() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (board[y][x]) {
        drawBlock(x, y, board[y][x]);
      }
    }
  }
}

function generatePiece() {
  const type = Math.floor(Math.random() * SHAPES.length);
  const shape = SHAPES[type];
  const color = COLORS[type];
  return {
    x: Math.floor((COLS - shape[0].length) / 2),
    y: 0,
    shape,
    color
  };
}

function merge(piece) {
  piece.shape.forEach((row, dy) => {
    row.forEach((value, dx) => {
      if (value) {
        board[piece.y + dy][piece.x + dx] = piece.color;
      }
    });
  });
}

function collide(piece) {
  return piece.shape.some((row, dy) => {
    return row.some((value, dx) => {
      if (value) {
        const x = piece.x + dx;
        const y = piece.y + dy;
        return x < 0 || x >= COLS || y >= ROWS || (board[y] && board[y][x]);
      }
      return false;
    });
  });
}

function moveDown() {
  currentPiece.y++;
  if (collide(currentPiece)) {
    currentPiece.y--;
    merge(currentPiece);
    clearLines();
    currentPiece = generatePiece();
    if (collide(currentPiece)) {
      alert("Game Over! Skor kamu: " + score);
      clearInterval(gameInterval);
    }
  }
  update();
}

function move(dir) {
  currentPiece.x += dir;
  if (collide(currentPiece)) {
    currentPiece.x -= dir;
  }
  update();
}

function rotate() {
  const prev = currentPiece.shape;
  currentPiece.shape = currentPiece.shape[0].map((_, i) =>
    currentPiece.shape.map(row => row[i]).reverse()
  );
  if (collide(currentPiece)) {
    currentPiece.shape = prev;
  }
  update();
}

function clearLines() {
  let lines = 0;
  for (let y = ROWS - 1; y >= 0; y--) {
    if (board[y].every(cell => cell)) {
      board.splice(y, 1);
      board.unshift(Array(COLS).fill(null));
      lines++;
      y++;
    }
  }
  if (lines > 0) {
    score += lines * 10;
    scoreEl.textContent = "Skor: " + score;
  }
}

function update() {
  drawBoard();
  currentPiece.shape.forEach((row, dy) => {
    row.forEach((value, dx) => {
      if (value) {
        drawBlock(currentPiece.x + dx, currentPiece.y + dy, currentPiece.color);
      }
    });
  });
}

function startGame() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  score = 0;
  scoreEl.textContent = "Skor: 0";
  currentPiece = generatePiece();
  clearInterval(gameInterval);
  gameInterval = setInterval(moveDown, 500);
  update();
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") move(-1);
  else if (e.key === "ArrowRight") move(1);
  else if (e.key === "ArrowDown") moveDown();
  else if (e.key === "ArrowUp") rotate();
});

document.addEventListener("touchstart", e => {
  // Simple tap for rotate, swipe handling optional
  rotate();
});
// ====== TOUCH CONTROL ======
let startX = 0;
let startY = 0;

canvas.addEventListener("touchstart", function (e) {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

canvas.addEventListener("touchend", function (e) {
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;

  const diffX = endX - startX;
  const diffY = endY - startY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // Geser kiri/kanan
    if (diffX > 30) move(1); // Kanan
    else if (diffX < -30) move(-1); // Kiri
  } else {
    // Geser atas/bawah
    if (diffY > 30) moveDown(); // Turun cepat
    else if (diffY < -30) rotate(); // Rotasi
  }
});