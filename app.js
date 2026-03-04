const skillSets = {
  Langages: ['PHP', 'XML', 'SQL', 'HTML', 'CSS', 'JavaScript'],
  Frameworks: ['Symfony', 'Bootstrap', 'jQuery', 'Angular', 'Express.js'],
  Outils: ['Eclipse', 'Visual Studio Code', 'Suite JetBrains', 'Git'],
  Donnees: ['SQL Server', 'MySQL', 'MongoDB', 'Doctrine (ORM)'],
  Methodes: ['Modelisation des donnees', 'Agile (Scrum)', 'UML']
};

const projects = [
  {
    title: 'Portfolio dynamique (ce site)',
    subtitle: 'Projet personnel · 2026',
    description: 'Conception d’un portfolio clair et structure avec interactions JavaScript utiles.',
    tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX']
  },
  {
    title: 'ARVIPA — Marque outdoor',
    subtitle: 'Annecy · Lancement a venir',
    description: 'Creation du site de la marque outdoor ARVIPA (arvipa.com) pour un futur lancement produit.',
    tags: ['Branding', 'Web', 'Outdoor']
  },
  {
    title: 'Trombinoscope de promotion',
    subtitle: 'ENI Ecole Informatique · 2026',
    description: 'Conception d’un trombinoscope dynamique avec HTML, CSS et JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript']
  },
  {
    title: 'Plateforme d’organisation d’evenements',
    subtitle: 'ENI Ecole Informatique · 2026',
    description: 'Developpement d’un site en PHP & MySQL avec definition de tests et outils de validation.',
    tags: ['PHP', 'MySQL', 'Tests']
  },
  {
    title: 'BIGNEDELE Atelier',
    subtitle: 'Association · Depuis 2024',
    description: 'Creation et maintenance d’un site boutique via CMS pour une association sportive de broderie.',
    tags: ['CMS', 'Association', 'Maintenance']
  },
  {
    title: 'Hotellerie & Restauration',
    subtitle: 'Suisse · 2018 -> 2025',
    description: 'Experiences en F&B, Front Office et cuisine, notamment chez Marriott Hotel.',
    tags: ['Service', 'Organisation', 'Relation client']
  }
];

const timeline = [
  {
    title: 'ENI — Ecole Informatique',
    period: '2025 · 2026',
    detail: 'Formation Developpeur Web & Web Mobile, titre niveau 5 homologue par l’Etat (Bac+2).',
    bullets: 'Algorithmie, Java (POO), HTML/CSS, JavaScript, SQL, Git/GitHub, Java/Spring Boot, Symfony, React, API REST.'
  },
  {
    title: 'Udemy — Le Blog du Hacker',
    period: 'Auto-formation',
    detail: 'Introduction a la programmation et aux fondamentaux du web et des reseaux.',
    bullets: 'Bases solides pour demarrer en developpement, systeme et algorithmique.'
  }
];

const titles = ['Developpement web', 'Interfaces propres', 'Code structure'];
const slogans = [
  'Disponible pour un stage — 06 avril au 01 mai 2026',
  'Construire des interfaces utiles et lisibles',
  'Approche pratique, rigoureuse et collaborative'
];

const rotator = document.getElementById('titleRotator');
const sloganEl = document.getElementById('sloganRotator');

let titleIndex = 0;
let sloganIndex = 0;

function rotateTitle() {
  if (!rotator) return;
  rotator.textContent = titles[titleIndex];
  titleIndex = (titleIndex + 1) % titles.length;
}

function rotateSlogan() {
  if (!sloganEl) return;
  sloganEl.innerHTML = `<span class="fade">${slogans[sloganIndex]}</span>`;
  sloganIndex = (sloganIndex + 1) % slogans.length;
}

rotateTitle();
rotateSlogan();
setInterval(rotateTitle, 3200);
setInterval(rotateSlogan, 3800);

const chipContainer = document.getElementById('skillChips');
const listContainer = document.getElementById('skillsList');

function renderSkills(category) {
  if (!listContainer) return;
  listContainer.innerHTML = '';
  skillSets[category].forEach((item) => {
    const pill = document.createElement('span');
    pill.className = 'skill-pill';
    pill.textContent = item;
    listContainer.appendChild(pill);
  });
}

Object.keys(skillSets).forEach((key, i) => {
  if (!chipContainer) return;
  const chip = document.createElement('button');
  chip.className = `chip${i === 0 ? ' active' : ''}`;
  chip.textContent = key;
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    renderSkills(key);
  });
  chipContainer.appendChild(chip);
});

renderSkills(Object.keys(skillSets)[0]);

const projectsGrid = document.getElementById('projectsGrid');
projects.forEach((project) => {
  if (!projectsGrid) return;
  const card = document.createElement('article');
  card.className = 'card reveal';
  card.innerHTML = `
    <h3>${project.title}</h3>
    <p><strong>${project.subtitle}</strong></p>
    <p>${project.description}</p>
    <div class="tag-row">
      ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
    </div>
  `;
  projectsGrid.appendChild(card);
});

const timelineContainer = document.getElementById('timeline');
timeline.forEach((item) => {
  if (!timelineContainer) return;
  const block = document.createElement('div');
  block.className = 'timeline-item reveal';
  block.innerHTML = `
    <h3>${item.title}</h3>
    <p><strong>${item.period}</strong></p>
    <p>${item.detail}</p>
    <p>${item.bullets}</p>
  `;
  timelineContainer.appendChild(block);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i * 0.03, 0.18)}s`;
  observer.observe(el);
});
