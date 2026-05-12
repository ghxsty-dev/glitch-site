const revealTargets = document.querySelectorAll('.card, h1, h2, .lead, .actions, .brand-banner');
const progressBar = document.querySelector('.scroll-progress');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('in');
      obs.unobserve(entry.target);
    }
  }, { threshold: 0.14 });

  revealTargets.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(index * 35, 260)}ms`;
    observer.observe(el);
  });
}

for (const anchor of document.querySelectorAll('a[href^="#"]')) {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    const target = id ? document.querySelector(id) : null;
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
});

const aura = document.querySelector('.hero-aura');
window.addEventListener('mousemove', (e) => {
  if (!aura) return;
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  aura.style.transform = `translate(${(x - 50) * 0.08}px, ${(y - 50) * 0.08}px)`;
});

const tiltTargets = document.querySelectorAll('.tilt');
for (const el of tiltTargets) {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * 8;
    const ry = (px - 0.5) * 10;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
}

const magneticTargets = document.querySelectorAll('.magnetic');
for (const btn of magneticTargets) {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    btn.style.transform = `translate(${dx * 0.14}px, ${dy * 0.14}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
}
