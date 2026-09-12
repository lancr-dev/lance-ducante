const menuButton = document.querySelector('.navbar__menu-button');
const closeButton = document.querySelector('.sidebar__close-button');
const sidebar = document.querySelector('.sidebar');

const navbarLinks = document.querySelectorAll('.navbar__link');
const sidebarLinks = document.querySelectorAll('.sidebar__link');

const sections = document.querySelectorAll(
  '#home, #services, #skills, #faq, #inquire',
);

function openSidebar() {
  sidebar.classList.add('active');

  menuButton.setAttribute('aria-expanded', 'true');
  sidebar.setAttribute('aria-hidden', 'false');

  closeButton.focus();
}

function closeSidebar() {
  menuButton.focus();

  sidebar.classList.remove('active');

  menuButton.setAttribute('aria-expanded', 'false');
  sidebar.setAttribute('aria-hidden', 'true');
}

menuButton.addEventListener('click', openSidebar);

closeButton.addEventListener('click', closeSidebar);

sidebarLinks.forEach((link) => {
  link.addEventListener('click', closeSidebar);
});

function setActiveLink(sectionId) {
  navbarLinks.forEach((link) => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${sectionId}`,
    );
  });

  sidebarLinks.forEach((link) => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${sectionId}`,
    );
  });
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  },
  {
    threshold: 0.5,
  },
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && sidebar.classList.contains('active')) {
    closeSidebar();
  }
});

const nameElement = document.querySelector('.home__typing-name');
const roleElement = document.querySelector('.home__typing-role');

const nameText = 'Lance Ducante';
const roleText = ' - Web Designer | Web Developer';

let nameIndex = 0;
let roleIndex = 0;
let isDeleting = false;

function typeText() {
  if (!nameElement || !roleElement) {
    return;
  }

  if (!isDeleting) {
    if (nameIndex < nameText.length) {
      nameElement.textContent = nameText.slice(0, nameIndex + 1);
      nameIndex++;
    } else if (roleIndex < roleText.length) {
      roleElement.textContent = roleText.slice(0, roleIndex + 1);
      roleIndex++;
    } else {
      isDeleting = true;
      setTimeout(typeText, 1800);
      return;
    }

    setTimeout(typeText, 50);
    return;
  }

  if (roleIndex > 0) {
    roleElement.textContent = roleText.slice(0, roleIndex - 1);
    roleIndex--;
  } else if (nameIndex > 0) {
    nameElement.textContent = nameText.slice(0, nameIndex - 1);
    nameIndex--;
  } else {
    isDeleting = false;
    setTimeout(typeText, 500);
    return;
  }

  setTimeout(typeText, 30);
}

typeText();

const statNumbers = document.querySelectorAll('.home__stat-number');

function animateStat(stat) {
  const target = Number(stat.dataset.value);
  const duration = 1200;
  const startTime = performance.now();

  function updateStat(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    const currentValue = Math.floor(progress * target);

    stat.textContent = `${currentValue}+`;

    if (progress < 1) {
      requestAnimationFrame(updateStat);
    }
  }

  requestAnimationFrame(updateStat);
}

const statsObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        statNumbers.forEach((stat) => {
          animateStat(stat);
        });

        observer.disconnect();
      }
    });
  },
  {
    threshold: 0.5,
  },
);

const stats = document.querySelector('.home__stats');

if (stats) {
  statsObserver.observe(stats);
}

const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach((item) => {
  const question = item.querySelector('.faq__question');
  const answer = item.querySelector('.faq__answer');

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('active');

    faqItems.forEach((faq) => {
      const faqQuestion = faq.querySelector('.faq__question');
      const faqAnswer = faq.querySelector('.faq__answer');

      faq.classList.remove('active');
      faqQuestion.setAttribute('aria-expanded', 'false');
      faqAnswer.style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add('active');
      question.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
});

window.addEventListener('resize', () => {
  document.querySelectorAll('.faq__item.active').forEach((item) => {
    const answer = item.querySelector('.faq__answer');

    answer.style.maxHeight = `${answer.scrollHeight}px`;
  });
});

const animatedItems = document.querySelectorAll('.animate-item');

const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  },
  {
    threshold: 0.2,
  },
);

animatedItems.forEach((item) => {
  animationObserver.observe(item);
});
