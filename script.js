function toggle(card) {
  const isOpen = card.classList.contains('open');

  // Closes all cards
  document.querySelectorAll('.card').forEach(function(c) {
    c.classList.remove('open');
    c.querySelector('.hint').textContent = 'Click to expand';
  });

  // If the clicked card was closed, open it
  if (!isOpen) {
    card.classList.add('open');
    card.querySelector('.hint').textContent = 'Click to collapse';
  }
}