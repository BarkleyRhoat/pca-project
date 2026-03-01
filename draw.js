const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const clearBtn = document.getElementById("clearBtn");
const eraserBtn = document.getElementById("eraserBtn");

canvas.width = 800; // could go bigger if need be
canvas.height = 500;

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let drawing = false;
let erasing = false;

// starts drawing when mouse button is pressed down
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

// allows drawing when mouse moves while the button is held down
canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    ctx.lineWidth = brushSize.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = erasing ? "#ffffff" : colorPicker.value;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
});

canvas.addEventListener('mouseup', () => (drawing = false));
canvas.addEventListener('mouseleave', () => (drawing = false));

clearBtn.addEventListener('click', () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect (0, 0, canvas.width, canvas.height);
});

eraserBtn.addEventListener("click", () => {
    erasing = !erasing;
    eraserBtn.textContent = erasing ? "Draw" : "Eraser"
});