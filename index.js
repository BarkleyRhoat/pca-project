const h1 = document.querySelector('h1');
let angle = 0;
const radius = 50;
h1.style.position = 'absolute';
const centerX = window.innerWidth / 2 - h1.offsetWidth / 2;
const centerY = window.innerHeight / 2 - h1.offsetHeight / 2;

function animate() {
    angle += 0.02;

    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    h1.style.position = 'absolute';
    h1.style.left = x + 'px';
    h1.style.top = y + 'px';

    requestAnimationFrame(animate);
}

animate();