const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach((item) => {
  const question = item.querySelector('.faq__question');
  const answer = item.querySelector('.faq__answer');

  question.addEventListener('click', (event) => {
    event.preventDefault();

    if (item.open) {
      answer.style.maxHeight = `${answer.scrollHeight}px`;

      requestAnimationFrame(() => {
        answer.style.maxHeight = '0px';
      });

      answer.addEventListener(
        'transitionend',
        () => {
          item.open = false;
        },
        { once: true },
      );

      return;
    }

    item.open = true;
    answer.style.maxHeight = '0px';

    requestAnimationFrame(() => {
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    });
  });
});
