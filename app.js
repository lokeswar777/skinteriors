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
document.querySelectorAll(".carousel").forEach((carousel) => {
  let scrollAmount = 0;
  const scrollInterval = 4000; // every 4s

  setInterval(() => {
    // Pause autoscroll if user is hovering over the carousel
    if (carousel.matches(":hover") || carousel.scrollWidth <= carousel.clientWidth) {
      return;
    }

    scrollAmount += carousel.clientWidth * 0.8; // Scroll by 80% of visible width
    if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
      scrollAmount = 0;
    }
    carousel.scrollTo({ left: scrollAmount, behavior: "smooth" });
  }, scrollInterval);
});