// TIC TAC TOE GAME!!!!!
const tttBoard = document.querySelector("#tttBoard");

for (let i = 0; i < 9; i++) {
  const btn = document.createElement("button");
  btn.className = "tttCell";
  btn.type = "button";
  btn.dataset.index = String(i);
  tttBoard.appendChild(btn);
}

const tttState = Array(9).fill("");
let tttCurrentPlayer = "X";

tttBoard.addEventListener("click", (e) => {
  const cell = e.target;
  const index = cell.dataset.index;

  if (!index || tttState[index]) return;

  tttState[index] = tttCurrentPlayer;
  cell.textContent = tttCurrentPlayer;

  tttCurrentPlayer = tttCurrentPlayer === "X" ? "O" : "X";
});

document.querySelector("#tttReset").addEventListener("click", () => {
  tttState.fill("");
  tttCurrentPlayer = "X";
  document
    .querySelectorAll(".tttCell")
    .forEach((cell) => (cell.textContent = ""));
});
// END OF TIC TAC TOE GAME!!!!

// PING PONG GAME!!!

const canvas = document.getElementById("pongGame");
const context = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

let scoreOne = 0;
let scoreTwo = 0;
let paused = true;

// player movements
const keysPressed = new Set();

// start game on spacebar press
window.addEventListener("keydown", (e) => {
  keysPressed.add(e.key);
  if (e.key === " ") paused = false;
});

// stop player movement when keys are released
window.addEventListener("keyup", (e) => {
  keysPressed.delete(e.key);
});

// function to move the paddles based on key presses
function movePaddles() {
  if (keysPressed.has("w")) playerOne.y -= playerOne.speed;
  if (keysPressed.has("s")) playerOne.y += playerOne.speed;
  if (keysPressed.has("ArrowUp")) playerTwo.y -= playerTwo.speed;
  if (keysPressed.has("ArrowDown")) playerTwo.y += playerTwo.speed;

  // Ensure paddles stay within canvas bounds
  playerOne.y = Math.max(
    0,
    Math.min(canvas.height - playerOne.height, playerOne.y),
  );
  playerTwo.y = Math.max(
    0,
    Math.min(canvas.height - playerTwo.height, playerTwo.y),
  );
}

class Element {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;
    this.speed = options.speed || 2;
    this.gravity = options.gravity;
  }
}

// paddle elements for player one & two
const playerOne = new Element({
  x: 20, // 20px from left edge
  y: canvas.height / 2 - 50,
  width: 15,
  height: 60,
  color: "black",
  gravity: 2,
  speed: 8,
});

const playerTwo = new Element({
  x: canvas.width - 35, // 20px from right edge + 15px paddle width
  y: canvas.height / 2 - 50, 
  width: 15,
  height: 60,
  color: "black",
  gravity: 2,
  speed: 8,
});

//ball element
const ball = new Element({
  x: canvas.width / 2 - 10,
  y: canvas.height / 2 - 10,
  width: 10,
  height: 10,
  color: "black",
  speed: 1,
  gravity: 2,
});

// draw the elements
function drawPaddle(paddle) {
  context.fillStyle = paddle.color;
  context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// draw the ball
function drawBall() {
  context.fillStyle = ball.color;
  context.fillRect(ball.x, ball.y, ball.width, ball.height);
}

// draw the score
function drawScore() {
  context.font = "20px Arial";
  context.fillText(`Player One: ${scoreOne}`, 20, 30);
  context.fillText(`Player Two: ${scoreTwo}`, canvas.width - 150, 30);
}

// main draw function to clear canvas and redraw elements each frame
function drawElements() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle(playerOne);
  drawPaddle(playerTwo);
  drawBall();
  drawScore();
  if (paused) {
    context.fillStyle = "black";
    context.font = "bold 20px Azeret Mono";
    context.textAlign = "center";
    context.fillText(
      "First to 10 wins!",
      canvas.width / 2,
      canvas.height / 2 - 15,
    );
    context.font = "14px Azeret Mono";
    context.fillText(
      "Press SpaceBar to play",
      canvas.width / 2,
      canvas.height / 2 + 15,
    );
    context.textAlign = "start";
  }
}

// reset the game state
function resetGame() {
  ball.x = canvas.width / 2 - ball.width / 2;
  ball.y = canvas.height / 2 - ball.height / 2;
  ball.speed = -ball.speed;
  scoreOne = 0;
  scoreTwo = 0;
  paused = true;
}

function ballBounce() {
  // Bounce off top and bottom walls
  if (
    ball.y + ball.gravity <= 0 ||
    ball.y + ball.height + ball.gravity >= canvas.height
  ) {
    ball.gravity = ball.gravity * -1;
  }

  // Bounce off left and right walls and update score
  if (ball.x + ball.speed < 0) {
    scoreTwo++;
    ball.speed = -ball.speed;
    if (scoreTwo >= 10) {
      resetGame();
      return;
    }
  }
  if (ball.x + ball.width + ball.speed > canvas.width) {
    scoreOne++;
    ball.speed = -ball.speed;
    if (scoreOne >= 10) {
      resetGame();
      return;
    }
  }

  ball.x += ball.speed;
  ball.y += ball.gravity;
  checkPaddleCollision()
}

function checkPaddleCollision() {
    // Check collision with player one paddle
    if (
        ball.x < playerOne.x + playerOne.width &&
        ball.x + ball.width > playerOne.x &&
        ball.y + ball.height > playerOne.y &&
        ball.y < playerOne.y + playerOne.height
    ) {
        ball.speed = Math.abs(ball.speed);
        ball.x = playerOne.x + playerOne.width;
}
    // Check collision with player two paddle
    if (
        ball.x + ball.width > playerTwo.x &&
        ball.x < playerTwo.x + playerTwo.width &&
        ball.y + ball.height > playerTwo.y &&
        ball.y < playerTwo.y + playerTwo.height
    ) {
        ball.speed = -Math.abs(ball.speed);
        ball.x = playerTwo.x - ball.width;
    }
}

// game loop
function loop() {
  if (!paused) {
    movePaddles();
    ballBounce();
  }
  drawElements();
  requestAnimationFrame(loop);
}
loop();
// END OF PING PONG GAME!!!!

// REACTION TIME GAME!!!!

const reactionBox = document.getElementById('reactionBox');
