const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);