(() => {
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const applyTheme = () => {
    root.setAttribute('data-theme', theme);
    if (toggle) toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  };
  applyTheme();

  if (toggle) {
    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      applyTheme();
    });
  }

  const bars = document.querySelectorAll('.bar-fill');
  const rings = document.querySelectorAll('.donut-ring');
  const dots = document.querySelectorAll('.dots-nav .dot');
  const sections = document.querySelectorAll('.slide');

  const animateBars = () => {
    bars.forEach((bar) => {
      bar.style.width = bar.dataset.w + '%';
    });
  };
  const animateRings = () => {
    rings.forEach((ring) => {
      const percent = parseInt(ring.dataset.percent, 10) || 0;
      ring.style.strokeDashoffset = String(251.3 - (percent / 100) * 251.3);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.id === 's3') animateBars();
        if (entry.target.id === 's5') animateRings();
        const idx = Array.from(sections).indexOf(entry.target);
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      }
    });
  }, { threshold: 0.5 });

  sections.forEach((s) => observer.observe(s));
})();