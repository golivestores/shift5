// ===== HOME PAGE SPECIFIC JS =====

// Binary animation
function randomBinary() {
  return Math.floor(Math.random() * 256).toString(2).padStart(8, '0');
}
function updateBinary() {
  document.querySelectorAll('.binary-item').forEach(function(item) {
    item.textContent = randomBinary();
  });
}
setInterval(updateBinary, 2000);

// Stagger stats items (hero)
var statsTitle = document.querySelector('.stats-title');
if (statsTitle) statsTitle.style.animationDelay = '1s';
document.querySelectorAll('.stats-item').forEach(function(item, i) {
  item.style.animationDelay = (1 + (i + 1) * 0.04) + 's';
});

// Stagger news items
document.querySelectorAll('.news-item').forEach(function(item, i) {
  var baseDelay = i * 0.25;
  item.querySelectorAll('.news-item__line').forEach(function(line, li) {
    line.style.animationDelay = (baseDelay + li * 0.06) + 's';
  });
  var title = item.querySelector('.news-title');
  var desc = item.querySelector('.news-description');
  if (title) title.style.animationDelay = baseDelay + 's';
  if (desc) desc.style.animationDelay = (baseDelay + 0.1) + 's';
});

// Initialize shared modules
initFormTitleSplit();
initContactInfoStagger();
initPageLoad('.heroHome');
initScrollObserver([
  '.news-item',
  '.pullupSlider-title',
  '.pullupSlider-item',
  '.sticky-panel',
  '.insight-item',
  '.form-title',
  '.email-content',
  '.contact-info',
  '.footer-block'
]);
