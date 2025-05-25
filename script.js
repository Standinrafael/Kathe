const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
let speed = 25;
let message = "KATHE, TE QUIERO";
let color = "#ff69b4";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fontSize = 24; // Aumenta el tamaño de la fuente
let columns = Math.floor(canvas.width / fontSize);
let drops = Array.from({ length: columns }).fill(1);

// CONTROLES
document.getElementById("speedControl").addEventListener("input", (e) => {
  speed = parseInt(e.target.value);
});

document.getElementById("colorPicker").addEventListener("input", (e) => {
  color = e.target.value;
});

document.getElementById("textInput").addEventListener("input", (e) => {
  message = e.target.value;
});

// EXPLOSIONES AL CLIC
canvas.addEventListener("click", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  explosion(x, y);
});

function explosion(x, y) {
  const parts = 20;
  for (let i = 0; i < parts; i++) {
    const angle = (Math.PI * 2 * i) / parts;
    const dx = Math.cos(angle) * 5;
    const dy = Math.sin(angle) * 5;
    animateExplosion(x, y, dx, dy);
  }
}

function animateExplosion(x, y, dx, dy) {
  let life = 30;
  function frame() {
    if (life <= 0) return;
    ctx.fillStyle = color;
    ctx.font = "bold 16px Arial";
    ctx.fillText(message, x + dx * (30 - life), y + dy * (30 - life));
    life--;
    requestAnimationFrame(frame);
  }
  frame();
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array.from({ length: columns }).fill(1);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px Arial`;

  for (let i = 0; i < drops.length; i++) {
    // Mostrar una letra diferente de la frase en cada columna
    const char = message[i % message.length];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
function animate() {
  setTimeout(() => {
    requestAnimationFrame(animate);
    draw();
  }, 1000 / speed);
}

animate();
