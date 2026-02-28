const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800; // could go bigger if need be
canvas.height = 500;

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let drawing = false;

// starts drawing when mouse button is pressed down
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

// allows drawing when mouse moves while the button is held down
// Need to look this part over again might be able to make the stoke smoother.
canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
});

canvas.addEventListener('mouseup', () => (drawing = false));
canvas.addEventListener('mouseleave', () => (drawing = false));