const loader = document.getElementById('loader');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav__links');
const cursorGlow = document.querySelector('.cursor-glow');

// Pantalla de carga 3D con progreso visual y salida suave.
window.addEventListener('load', () => {
  const progress = document.getElementById('loaderProgress');
  const percent = document.getElementById('loaderPercent');
  const status = document.getElementById('loaderStatus');
  const steps = [
    [18, 'ENCENDIENDO SISTEMA VISUAL'],
    [42, 'CARGANDO IDENTIDAD'],
    [67, 'PREPARANDO EXPERIENCIA 3D'],
    [86, 'AJUSTANDO DETALLES'],
    [100, 'EXPERIENCIA LISTA']
  ];
  let index = 0;
  const advance = () => {
    const [value, label] = steps[index];
    if (progress) progress.style.width = `${value}%`;
    if (percent) percent.textContent = `${String(value).padStart(2, '0')}%`;
    if (status) status.textContent = label;
    index += 1;
    if (index < steps.length) window.setTimeout(advance, 480);
  };
  advance();
  window.setTimeout(() => loader?.classList.add('loader--done'), 2850);
  window.setTimeout(() => loader?.remove(), 3650);
});

// Menú móvil.
navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('is-open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

// Entrada suave de las secciones al hacer scroll.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

// Luz que sigue al cursor en escritorio.
window.addEventListener('pointermove', event => {
  if (window.matchMedia('(pointer:fine)').matches) {
    cursorGlow.style.opacity = '1';
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }
}, { passive: true });

// Inclinación 3D sutil para tarjetas y dispositivo.
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('pointermove', event => {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    const box = card.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${y * -7}deg) rotateY(${x * 9}deg) translateY(-5px)`;
  });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
});

// Efecto de profundidad muy ligero en el fondo.
window.addEventListener('scroll', () => {
  const scroll = window.scrollY;
  document.documentElement.style.setProperty('--scroll-depth', `${scroll * .08}px`);
}, { passive: true });
