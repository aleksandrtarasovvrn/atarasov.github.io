let current = 1;
const total = document.querySelectorAll('.slide').length;
const dotsContainer = document.getElementById('dots');
const counter = document.getElementById('counter');
for (let i = 1; i <= total; i++) { const dot = document.createElement('div'); dot.className = 'dot' + (i === 1 ? ' active' : ''); dot.onclick = () => goToSlide(i); dotsContainer.appendChild(dot); }
function goToSlide(n) {
  const prev = document.querySelector('.slide.active');
  const next = document.querySelector(`.slide[data-slide="${n}"]`);
  if (prev) prev.classList.remove('active');
  if (next) { next.classList.add('active'); animateSlide(next); }
  current = n; updateNav();
}
function changeSlide(dir) { let next = current + dir; if (next < 1) next = total; if (next > total) next = 1; goToSlide(next); }
function updateNav() { document.querySelectorAll('.dot').forEach((d, i) => { d.classList.toggle('active', i + 1 === current); }); counter.textContent = current + ' / ' + total; }
document.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); changeSlide(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); changeSlide(-1); } });
let touchStartX = 0;
document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
document.addEventListener('touchend', (e) => { const diff = touchStartX - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) changeSlide(diff > 0 ? 1 : -1); });

function animateSlide(slide) {
  slide.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transition = 'none'; el.style.opacity = '0'; el.style.transform = 'translateY(18px)';
    el.offsetHeight;
    const delay = i * 0.08;
    el.style.transition = `opacity 0.35s ease ${delay}s, transform 0.35s ease ${delay}s`;
    el.style.opacity = '1'; el.style.transform = 'translateY(0px)';
  });
  animateSlideEffects(slide);
}
function animateSlideEffects(slide) {
  slide.querySelectorAll('.bar-fill:not(.fill-init)').forEach((bar, i) => {
    bar.classList.add('fill-init');
    bar.style.width = '0%'; bar.style.transition = `width 0.6s ease ${i*0.08}s`; bar.offsetHeight; bar.style.width = bar.dataset.w + '%';
  });
  slide.querySelectorAll('.donut-ring:not(.ring-init)').forEach(ring => {
    ring.classList.add('ring-init');
    ring.style.strokeDashoffset = '251.3'; ring.offsetHeight;
    ring.style.strokeDashoffset = 251.3 - (parseInt(ring.dataset.percent)/100)*251.3;
  });
}
document.addEventListener('mousemove', (e) => {
  const spotlight = document.querySelector('.mouse-spotlight');
  if (spotlight) { spotlight.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(176,141,54,0.05), transparent 40%)`; }
});
window.initParticles = function(canvas, options) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
  const count = options.count || 40;
  const particles = Array.from({ length: count }, () => ({
    x: Math.random()*canvas.width, y: Math.random()*canvas.height,
    vx: (Math.random()-0.5)*0.25, vy: (Math.random()-0.5)*0.25,
    size: Math.random()*2+0.7, alpha: Math.random()*0.25+0.08
  }));
  (function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x<0) p.x=canvas.width; if (p.x>canvas.width) p.x=0;
      if (p.y<0) p.y=canvas.height; if (p.y>canvas.height) p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
      ctx.fillStyle = `rgba(176,141,54,${p.alpha})`; ctx.fill();
    });
    requestAnimationFrame(animate);
  })();
};
document.querySelectorAll('.particle-canvas').forEach(c => window.initParticles(c, {count:40}));
try { animateSlide(document.querySelector('.slide.active')); } catch(e) { console.warn(e); }