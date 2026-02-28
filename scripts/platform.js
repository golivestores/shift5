// ===== PLATFORM PAGE SPECIFIC JS =====

// ===== HERO ROTATING TEXT =====
(function() {
  var container = document.getElementById('heroRotating');
  if (!container) return;
  var words = container.querySelectorAll('.rotate-word');
  if (words.length < 2) return;
  var currentIndex = 0;
  var interval = 3000;

  setInterval(function() {
    var current = words[currentIndex];
    current.classList.remove('is-active');
    current.classList.add('is-exiting');

    var nextIndex = (currentIndex + 1) % words.length;
    var next = words[nextIndex];

    setTimeout(function() {
      current.classList.remove('is-exiting');
      next.classList.add('is-active');
    }, 400);

    currentIndex = nextIndex;
  }, interval);
})();

// ===== KEY FEATURES SLIDER =====
(function() {
  var featuresTrack = document.querySelector('.features-track');
  var featurePrev = document.querySelector('.features-prev');
  var featureNext = document.querySelector('.features-next');
  if (!featuresTrack) return;

  var totalFeatures = document.querySelectorAll('.feature-card').length;
  var currentFeature = 0;
  // Show 3 cards per view on desktop
  var visibleCards = 3;
  var maxShift = totalFeatures - visibleCards;

  function updateFeatureSlider() {
    var pct = currentFeature * (100 / totalFeatures);
    featuresTrack.style.transform = 'translateX(-' + pct + '%)';
    if (featurePrev) featurePrev.disabled = currentFeature === 0;
    if (featureNext) featureNext.disabled = currentFeature >= maxShift;
  }

  function recalcVisible() {
    visibleCards = window.innerWidth <= 749 ? 1 : 3;
    maxShift = totalFeatures - visibleCards;
    if (currentFeature > maxShift) currentFeature = Math.max(0, maxShift);
    updateFeatureSlider();
  }

  if (featurePrev) {
    featurePrev.addEventListener('click', function() {
      if (currentFeature > 0) {
        currentFeature--;
        updateFeatureSlider();
      }
    });
  }

  if (featureNext) {
    featureNext.addEventListener('click', function() {
      if (currentFeature < maxShift) {
        currentFeature++;
        updateFeatureSlider();
      }
    });
  }

  window.addEventListener('resize', recalcVisible);
  updateFeatureSlider();
})();

// ===== HOW IT WORKS — INTERACTIVE CHART =====
(function() {
  var rings = document.querySelectorAll('.hiw-ring');
  var labels = document.querySelectorAll('.hiw-label');
  var counter = document.querySelector('.hiw-counter-current');
  if (!rings.length) return;

  var activeRing = -1;
  var autoTimer = null;

  function setActiveRing(index) {
    activeRing = index;
    rings.forEach(function(r) { r.classList.remove('is-active'); });
    labels.forEach(function(l) { l.classList.remove('is-active'); });

    if (index >= 0 && index < rings.length) {
      rings[index].classList.add('is-active');
      labels[index].classList.add('is-active');
      if (counter) counter.textContent = String(index + 1).padStart(2, '0');
    } else {
      if (counter) counter.textContent = '00';
    }
  }

  // Click on rings to select
  rings.forEach(function(ring, i) {
    ring.addEventListener('click', function() {
      setActiveRing(i);
      // Reset auto-cycle
      if (autoTimer) clearInterval(autoTimer);
      startAutoCycle();
    });
  });

  // Auto-cycle through rings
  function startAutoCycle() {
    autoTimer = setInterval(function() {
      var next = (activeRing + 1) % rings.length;
      setActiveRing(next);
    }, 4000);
  }

  // Start with ring 0 after a short delay
  setTimeout(function() {
    setActiveRing(0);
    startAutoCycle();
  }, 500);

  // Binary data animation
  var binaryLines = document.querySelectorAll('.hiw-binary-line');
  if (binaryLines.length) {
    function randomBinaryRow() {
      var a = Math.floor(Math.random() * 256).toString(2).padStart(8, '0');
      var b = Math.floor(Math.random() * 256).toString(2).padStart(8, '0');
      var c = Math.floor(Math.random() * 256).toString(2).padStart(8, '0');
      return a + ' ' + b + ' ' + c;
    }
    setInterval(function() {
      binaryLines.forEach(function(line) {
        line.textContent = randomBinaryRow();
      });
    }, 2000);
  }
})();

// ===== PRODUCT TAB SWITCHING =====
(function() {
  var tabs = document.querySelectorAll('.product-tab');
  var assets = document.querySelectorAll('.product-asset');
  var names = document.querySelectorAll('.rotated-name');
  var descs = document.querySelectorAll('.aside-desc-text');
  var ctas = document.querySelectorAll('.aside-cta-link');
  if (!tabs.length) return;

  function setActiveProduct(index) {
    tabs.forEach(function(t) { t.classList.remove('is-active'); });
    assets.forEach(function(a) { a.classList.remove('is-active'); });
    names.forEach(function(n) { n.classList.remove('is-active'); });
    descs.forEach(function(d) { d.classList.remove('is-active'); });
    ctas.forEach(function(c) { c.classList.remove('is-active'); });

    if (tabs[index]) tabs[index].classList.add('is-active');
    if (assets[index]) assets[index].classList.add('is-active');
    if (names[index]) names[index].classList.add('is-active');
    if (descs[index]) descs[index].classList.add('is-active');
    if (ctas[index]) ctas[index].classList.add('is-active');
  }

  tabs.forEach(function(tab, i) {
    tab.addEventListener('click', function() {
      setActiveProduct(i);
    });
  });
})();

// ===== STATEMENT BANNER — WORD SPLIT =====
(function() {
  var statementEl = document.querySelector('.statement-text');
  if (!statementEl) return;

  var text = statementEl.textContent.trim();
  var words = text.split(/\s+/);
  statementEl.innerHTML = '';

  words.forEach(function(word, i) {
    var span = document.createElement('span');
    span.className = 'statement-word';
    span.textContent = word;
    // Stagger: 0.03s per word for a smooth wave effect
    span.style.transitionDelay = (i * 0.03) + 's';
    statementEl.appendChild(span);
  });
})();

// ===== INITIALIZE SHARED MODULES =====
initFormTitleSplit();
initContactInfoStagger();
initHeaderColorSwitch();
initPageLoad('.heroPlatform');
initScrollObserver([
  '.statement-banner',
  '.key-features',
  '.how-it-works',
  '.products-section',
  '.resources-section',
  '.form-title',
  '.email-content',
  '.contact-info',
  '.footer-block'
]);
