function toggle(card) {
  const isOpen = card.classList.contains('open');

  document.querySelectorAll('.card').forEach(function(c) {
    c.classList.remove('open');
    c.setAttribute('aria-expanded', 'false');
    c.querySelector('.hint').textContent = 'Click to expand';
  });

  if (!isOpen) {
    card.classList.add('open');
    card.setAttribute('aria-expanded', 'true');
    card.querySelector('.hint').textContent = 'Click to collapse';
  }
}

document.querySelectorAll('.card').forEach(function(card) {
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-expanded', 'false');

  card.addEventListener('click', function() {
    toggle(card);
  });

  card.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle(card);
    }
  });
});