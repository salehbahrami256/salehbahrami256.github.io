// // Mobile nav toggle
// const toggle = document.querySelector('.nav-toggle');
// const navList = document.querySelector('.nav-list');
// if (toggle && navList) {
//   toggle.addEventListener('click', () => navList.classList.toggle('open'));
// }
//
// // Smooth scroll for same-page links
// document.querySelectorAll('a[href^="#"]').forEach(a => {
//   a.addEventListener('click', e => {
//     const id = a.getAttribute('href').slice(1);
//     const el = document.getElementById(id);
//     if (el) {
//       e.preventDefault();
//       el.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       // Close nav on mobile after click
//       navList?.classList.remove('open');
//     }
//   });
// });

// Mobile nav toggle
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const list = document.querySelector('.nav-list');
  if (!toggle || !list) return;

  toggle.addEventListener('click', () => {
    const isOpen = list.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  list.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      list.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Hero network graphic — a small fixed graph, drawn once.
// Not decoration for its own sake: this is literally the object of study.
(function () {
  const svg = document.getElementById('graph-svg');
  if (!svg) return;

  const nodes = [
    { x: 60, y: 80 }, { x: 170, y: 40 }, { x: 300, y: 70 },
    { x: 370, y: 170 }, { x: 300, y: 280 }, { x: 180, y: 340 },
    { x: 70, y: 300 }, { x: 30, y: 190 }, { x: 210, y: 190 },
  ];

  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
    [0, 8], [1, 8], [3, 8], [5, 8], [7, 8], [2, 8],
  ];

  const NS = 'http://www.w3.org/2000/svg';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  edges.forEach(([a, b], i) => {
    const line = document.createElementNS(NS, 'line');
    line.setAttribute('x1', nodes[a].x);
    line.setAttribute('y1', nodes[a].y);
    line.setAttribute('x2', nodes[b].x);
    line.setAttribute('y2', nodes[b].y);
    line.setAttribute('stroke', '#1f5c57');
    line.setAttribute('stroke-width', '1.4');
    line.setAttribute('opacity', '0.35');
    if (!reduceMotion) {
      line.style.animation = `edge-fade 3.2s ease-in-out ${(i * 0.12).toFixed(2)}s infinite`;
    }
    svg.appendChild(line);
  });

  nodes.forEach((n, i) => {
    const circle = document.createElementNS(NS, 'circle');
    circle.setAttribute('cx', n.x);
    circle.setAttribute('cy', n.y);
    circle.setAttribute('r', i === 8 ? 8 : 6);
    circle.setAttribute('fill', i === 8 ? '#a86a1c' : '#14181f');
    svg.appendChild(circle);
  });

  if (!reduceMotion) {
    const style = document.createElementNS(NS, 'style');
    style.textContent = `
      @keyframes edge-fade {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 0.55; }
      }
    `;
    svg.appendChild(style);
  }
})();
