// Fade-in on scroll
const observers = document.querySelectorAll(".fade-in");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 } // Trigger a bit earlier
);
observers.forEach((el) => io.observe(el));

// Simple auto-scroll carousel
function setupContinuousScroll(carousel) {
  const carouselContent = Array.from(carousel.children);
  // Duplicate content for seamless looping
  carouselContent.forEach(item => {
    const duplicate = item.cloneNode(true);
    carousel.appendChild(duplicate);
  });

  let scrollAmount = 0;
  const scrollSpeed = 0.5; // Adjust for speed (lower is slower)

  function animateScroll() {
    // Pause on hover
    if (!carousel.matches(':hover')) {
      scrollAmount += scrollSpeed;
      // If scrolled past the original content, reset to the beginning
      if (scrollAmount >= carousel.scrollWidth / 2) {
        scrollAmount = 0;
      }
      carousel.scrollTo({ left: scrollAmount, behavior: 'auto' });
    }
    requestAnimationFrame(animateScroll);
  }

  // Only start if the content overflows
  if (carousel.scrollWidth > carousel.clientWidth) {
    requestAnimationFrame(animateScroll);
  }
}
document.querySelectorAll(".carousel").forEach(setupContinuousScroll);