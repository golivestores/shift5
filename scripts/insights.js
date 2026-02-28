// ===== INSIGHTS PAGE SPECIFIC JS =====

// ===== ADDITIONAL READING SLIDER =====
(function() {
  var track = document.querySelector('.sliderCards-track');
  var prevBtn = document.querySelector('.slider-prev');
  var nextBtn = document.querySelector('.slider-next');
  if (!track) return;

  var totalCards = track.querySelectorAll('.sliderCards-item').length;
  var currentShift = 0;
  var visibleCards = 4;
  var cardWidth = 320;

  function recalc() {
    if (window.innerWidth <= 749) {
      visibleCards = 1;
      cardWidth = window.innerWidth * 0.8;
    } else {
      visibleCards = Math.floor((window.innerWidth) / 320);
      cardWidth = 320;
    }
  }

  function updateSlider() {
    var px = currentShift * cardWidth;
    track.style.transform = 'translateX(-' + px + 'px)';
    if (prevBtn) prevBtn.disabled = currentShift === 0;
    if (nextBtn) nextBtn.disabled = currentShift >= totalCards - visibleCards;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      if (currentShift > 0) {
        currentShift--;
        updateSlider();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      if (currentShift < totalCards - visibleCards) {
        currentShift++;
        updateSlider();
      }
    });
  }

  window.addEventListener('resize', function() {
    recalc();
    if (currentShift > totalCards - visibleCards) currentShift = Math.max(0, totalCards - visibleCards);
    updateSlider();
  });

  recalc();
  updateSlider();
})();

// ===== INITIALIZE SHARED MODULES =====
initFormTitleSplit();
initContactInfoStagger();
initHeaderColorSwitch();
initPageLoad('.heroInsights');
initScrollObserver([
  '.sliderCards',
  '.form-title',
  '.email-content',
  '.contact-info',
  '.footer-block'
]);
