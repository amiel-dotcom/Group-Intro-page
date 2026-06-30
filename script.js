function toggleCard(card) {
  const isOpen = card.classList.contains('open');

  document.querySelectorAll('.card').forEach(function(currentCard) {
    currentCard.classList.remove('open');
    currentCard.setAttribute('aria-expanded', 'false');
    currentCard.querySelector('.hint').textContent = 'Click to expand';
  });

  if (!isOpen) {
    card.classList.add('open');
    card.setAttribute('aria-expanded', 'true');
    card.querySelector('.hint').textContent = 'Click to collapse';
  }
}

function toggleDetailSection(section, event) {
  event.stopPropagation();
  const isOpen = section.classList.contains('open');

  if (isOpen) {
    section.classList.remove('open');
  } else {
    section.classList.add('open');
  }
}

function toggleHobbyItem(item, event) {
  event.stopPropagation();
  const isOpen = item.classList.contains('open');

  if (isOpen) {
    item.classList.remove('open');
  } else {
    item.classList.add('open');
  }
}

document.querySelectorAll('.card').forEach(function(card) {
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-expanded', 'false');

  card.addEventListener('click', function(event) {
    if (event.target.closest('.detail-header')) {
      return;
    }
    toggleCard(card);
  });

  card.addEventListener('keydown', function(event) {
    if (event.target.closest('.detail-header')) {
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleCard(card);
    }
  });
});

document.querySelectorAll('.detail-section').forEach(function(section) {
  const header = section.querySelector('.detail-header');

  header.setAttribute('tabindex', '0');
  header.setAttribute('role', 'button');

  header.addEventListener('click', function(event) {
    toggleDetailSection(section, event);
  });

  header.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDetailSection(section, event);
    }
  });
});

document.querySelectorAll('.hobby-item').forEach(function(item) {
  const header = item.querySelector('.hobby-header');

  header.setAttribute('tabindex', '0');
  header.setAttribute('role', 'button');

  header.addEventListener('click', function(event) {
    toggleHobbyItem(item, event);
  });

  header.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleHobbyItem(item, event);
    }
  });
});
