// circle animation for h1 element
const h1 = document.querySelector('h1');
// fun little language rotation effect
const languages = ['Welcome', 'Bem-vindo', 'Bienvenido', 'Bienvenue', 'ようこそ', '欢迎'];
let currentLanguageIndex = 0;

setInterval(() => {
    currentLanguageIndex = (currentLanguageIndex + 1) % languages.length;
    h1.textContent = languages[currentLanguageIndex];
}, 2000);
let angle = 0;
const radius = 200;
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

// mouse trail effect 
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => trail.remove(), 500);
});
