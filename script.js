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
