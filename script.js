document.addEventListener("DOMContentLoaded", function () {
  // Hero Slider
  const slider = document.querySelector(".hero-slider");
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".slider-dot");
  let currentSlide = 0;
  let slideInterval;

  // Initialize the slider
  function initSlider() {
    // Set up automatic sliding
    startSlideInterval();

    // Add click events to dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index);
        resetSlideInterval();
      });
    });
  }

  // Go to specific slide
  function goToSlide(slideIndex) {
    slider.style.transform = `translateX(-${slideIndex * 25}%)`;
    currentSlide = slideIndex;

    // Update active dot
    dots.forEach((dot, index) => {
      if (index === slideIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Go to next slide
  function nextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= slides.length) {
      nextIndex = 0;
    }
    goToSlide(nextIndex);
  }

  // Start automatic sliding
  function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  // Reset interval when manually changing slides
  function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
  }

  // Initialize the slider
  initSlider();

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector("nav ul");

  mobileMenuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("show");
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);

    if (
      navMenu.classList.contains("show") &&
      !isClickInsideMenu &&
      !isClickOnMenuBtn
    ) {
      navMenu.classList.remove("show");
    }
  });

  // Header scroll effect
  const header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu after clicking a link
        if (navMenu.classList.contains("show")) {
          navMenu.classList.remove("show");
        }
      }
    });
  });

  // Responsive handling for industry cards
  function handleIndustryCardsOnMobile() {
    const industryCarousel = document.querySelector(".industries-carousel");
    const industryCards = document.querySelectorAll(".industry-card");

    if (window.innerWidth <= 768) {
      // Enable touch swiping for mobile
      let startX, endX;

      industryCarousel.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
      });

      industryCarousel.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            // Swipe left
            industryCarousel.scrollBy({
              left: 300,
              behavior: "smooth",
            });
          } else {
            // Swipe right
            industryCarousel.scrollBy({
              left: -300,
              behavior: "smooth",
            });
          }
        }
      });
    }
  }

  // Initialize responsive handlers
  handleIndustryCardsOnMobile();

  // Adjust on window resize
  window.addEventListener("resize", function () {
    handleIndustryCardsOnMobile();
  });

  // Animation on scroll (simple version)
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".philosophy-item, .industry-card, .section-title"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial styles for animation
  document
    .querySelectorAll(".philosophy-item, .industry-card, .section-title")
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

  // Run animation check on scroll
  window.addEventListener("scroll", animateOnScroll);
  // Initial animation check
  animateOnScroll();
});
