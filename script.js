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
})();