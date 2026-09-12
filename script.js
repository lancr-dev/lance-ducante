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
