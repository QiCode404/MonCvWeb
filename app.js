const skillSets = {
  Langages: ['PHP', 'XML', 'SQL', 'HTML', 'CSS', 'JavaScript'],
  Frameworks: ['Symfony', 'Bootstrap', 'jQuery', 'Angular', 'Express.js'],
  Outils: ['Eclipse', 'Visual Studio Code', 'Suite JetBrains', 'Git'],
  Donnees: ['SQL Server', 'MySQL', 'MongoDB', 'Doctrine (ORM)'],
  Methodes: ['Modélisation des données', 'Agile (Scrum)', 'UML']
};

const projects = [
  {
    title: 'Portfolio dynamique (ce site)',
    subtitle: 'Projet personnel · 2026',
    description: 'Conception d’un portfolio immersif avec animations, parallax léger et interactions JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX']
  },
  {
    title: 'ARVIPA — Marque outdoor',
    subtitle: 'Annecy · Lancement à venir',
    description: 'Création du site de la marque outdoor ARVIPA (arvipa.com) pour un futur lancement produit.',
    tags: ['Branding', 'Web', 'Outdoor']
  },
  {
    title: 'Trombinoscope de promotion',
    subtitle: 'ENI École Informatique · 2026',
    description: 'Conception d’un trombinoscope dynamique avec HTML, CSS et JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript']
  },
  {
    title: 'Plateforme d’organisation d’événements',
    subtitle: 'ENI École Informatique · 2026',
    description: 'Développement d’un site en PHP & MySQL avec définition de tests et outils de validation.',
    tags: ['PHP', 'MySQL', 'Tests']
  },
  {
    title: 'BIGNEDELE Atelier',
    subtitle: 'Association · Depuis 2024',
    description: 'Création et maintenance d’un site boutique via CMS pour une association sportive de broderie.',
    tags: ['CMS', 'Association', 'Maintenance']
  },
  {
    title: 'Hôtellerie & Restauration',
    subtitle: 'Suisse · 2018 → 2025',
    description: 'Expériences en F&B, Front Office et cuisine, notamment chez Marriott Hotel.',
    tags: ['Service', 'Organisation', 'Relation client']
  }
];

const timeline = [
  {
    title: 'ENI — École Informatique',
    period: '2025 · 2026',
    detail: 'Formation Développeur Web & Web Mobile, titre niveau 5 homologué par l’État (Bac+2).',
    bullets: 'Algorithmie, Java (POO), HTML/CSS, JavaScript, SQL, Git/GitHub, Java/Spring Boot, Symfony, React, API REST.'
  },
  {
    title: 'Udemy — Le Blog du Hacker',
    period: 'Auto-formation',
    detail: 'Introduction à la programmation et aux fondamentaux du web et des réseaux.',
    bullets: 'Bases solides pour démarrer en développement, système et algorithmique.'
  }
];

const titles = [
  'Interfaces élégantes',
  'Expériences immersives',
  'Code propre & agile'
];

const rotator = document.getElementById('titleRotator');
const slogans = [
  'Disponible pour un stage — 06 avril au 01 mai 2026',
  'Créer des interfaces utiles, belles et rapides',
  'Apprendre vite, livrer propre, itérer en équipe'
];

const sloganEl = document.getElementById('sloganRotator');
let sloganIndex = 0;
function rotateSlogan() {
  if (!sloganEl) return;
  sloganEl.innerHTML = `<span class="fade">${slogans[sloganIndex]}</span>`;
  sloganIndex = (sloganIndex + 1) % slogans.length;
}
rotateSlogan();
setInterval(rotateSlogan, 3200);

let index = 0;
function rotateTitle() {
  rotator.textContent = titles[index];
  index = (index + 1) % titles.length;
}
rotateTitle();
setInterval(rotateTitle, 2600);

const chipContainer = document.getElementById('skillChips');
const listContainer = document.getElementById('skillsList');

function renderSkills(category) {
  listContainer.innerHTML = '';
  skillSets[category].forEach((item) => {
    const pill = document.createElement('span');
    pill.className = 'skill-pill';
    pill.textContent = item;
    listContainer.appendChild(pill);
  });
}

Object.keys(skillSets).forEach((key, i) => {
  const chip = document.createElement('button');
  chip.className = 'chip' + (i === 0 ? ' active' : '');
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
  const card = document.createElement('article');
  card.className = 'card';
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
  const block = document.createElement('div');
  block.className = 'timeline-item';
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
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.querySelectorAll('.card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
  observer.observe(card);
});

const bgMesh = document.querySelector('.bg-mesh');
window.addEventListener('scroll', () => {
  if (!bgMesh) return;
  const offset = window.scrollY * 0.04;
  bgMesh.style.transform = `translateY(${offset}px) scale(1.04)`;
});

const heroCard = document.getElementById('heroCard');
if (heroCard) {
  const maxTilt = 10;
  heroCard.addEventListener('mousemove', (event) => {
    const rect = heroCard.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -maxTilt;
    const rotateY = ((x / rect.width) - 0.5) * maxTilt;
    heroCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  heroCard.addEventListener('mouseleave', () => {
    heroCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}
