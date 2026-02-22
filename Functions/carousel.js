function initCarousels() {
  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const images = Array.from(track?.querySelectorAll('img') || []);
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const dotsWrap = carousel.querySelector('.carousel-dots');

    if (!track || images.length === 0) return;

    let index = 0;

    // Fix #4: Prevent native image drag interfering with swipe
    images.forEach(img => img.setAttribute('draggable', 'false'));

    // Fix #1: Guard dotsWrap before accessing it
    if (dotsWrap) dotsWrap.innerHTML = '';
    const dots = dotsWrap
      ? images.map((_, i) => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'carousel-dot';
          b.setAttribute('aria-label', `Go to image ${i + 1}`);
          b.addEventListener('click', () => goTo(i));
          dotsWrap.appendChild(b);
          return b;
        })
      : [];

    // Fix #6: Add a visually-hidden live region for screen reader announcements
    let liveRegion = carousel.querySelector('.carousel-live');
    if (!liveRegion) {
      liveRegion = document.createElement('span');
      liveRegion.className = 'carousel-live';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      // Visually hidden but readable by screen readers
      Object.assign(liveRegion.style, {
        position: 'absolute',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        clip: 'rect(0 0 0 0)',
        whiteSpace: 'nowrap',
      });
      carousel.appendChild(liveRegion);
    }

    function updateUI() {
      track.style.transform = `translateX(${-index * 100}%)`;
      if (prevBtn) prevBtn.disabled = index === 0;
      if (nextBtn) nextBtn.disabled = index === images.length - 1;
      dots.forEach((d, i) =>
        d.setAttribute('aria-current', i === index ? 'true' : 'false')
      );
      // Fix #6: Announce current slide to screen readers
      liveRegion.textContent = `Image ${index + 1} of ${images.length}`;
    }

    function goTo(i) {
      index = Math.max(0, Math.min(images.length - 1, i));
      updateUI();
    }

    prevBtn?.addEventListener('click', () => goTo(index - 1));
    nextBtn?.addEventListener('click', () => goTo(index + 1));

    // Fix #5: Keyboard arrow key navigation
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
    });

    // Fix #2 & #3: Improved swipe — track vertical movement to avoid
    // conflicting with scroll, and use pointermove for the final position.
    let startX = null;
    let startY = null;
    let isDown = false;
    let currentX = null;

    carousel.addEventListener('pointerdown', (e) => {
      isDown = true;
      startX = e.clientX;
      startY = e.clientY;
      currentX = e.clientX;
    });

    carousel.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      currentX = e.clientX;
    });

    carousel.addEventListener('pointerup', (e) => {
      if (!isDown || startX === null) return;

      const diffX = e.clientX - startX;
      const diffY = e.clientY - startY;

      // Only treat as a horizontal swipe if horizontal movement dominates
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX > 0) goTo(index - 1);
        else goTo(index + 1);
      }

      isDown = false;
      startX = null;
      startY = null;
      currentX = null;
    });

    carousel.addEventListener('pointercancel', () => {
      isDown = false;
      startX = null;
      startY = null;
      currentX = null;
    });

    // Initialise
    updateUI();
  });
}

document.addEventListener('DOMContentLoaded', initCarousels);