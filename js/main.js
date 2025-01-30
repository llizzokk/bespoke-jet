"use strict";

// Array of slides containing text, image source, and page numbers
const slides = [
  {
    text: `"The first time I used the Samsung Bespoke Jet™, I cried. Im not being sensational; I really did.Of course, this vacuum worked great. But thats not all."`,
    img: "./assets/images/1/frame-1.jpg",
    page: "1/5",
  },
  {
    text: `"If you’re an over-cleaner, like myself, you’ll nerd out on all of the functions. If you avoid this chore at all costs, you’ll appreciate how simple Samsung makes it."`,
    img: "./assets/images/2/frame-2.jpg",
    page: "2/5",
  },
  {
    text: `"Both the floor and pet hair attachments are cleverly designed to eliminate the dreaded hair wrap. (In other words, you’ll never have to tackle hair tangles with a pair of scissors again.)"`,
    img: "./assets/images/3/frame-3.jpg",
    page: "3/5",
  },
  {
    text: `"When I learned the Samsung Bespoke Vac cleaned itself with amazing technology, that’s when I cried. No more scraping spider legs and hair out of the crevices with my hands. Its suction power is so strong, the canister is left perfectly clean after every use. It’s like a vacuum for your vacuum."`,
    img: "./assets/images/4/frame-4.jpg",
    page: "4/5",
  },
  {
    text: `"Because it’s so nice-looking, it can live right in the kitchen. No more hauling a vacuum up and down the basement stairs on the daily"`,
    img: "./assets/images/5/frame-5.jpg",
    page: "5/5",
  },
];

// Initialize variables for the current slide and page elements
let currentIndex = 0;

const logo = document.querySelector(".logo"); // Logo element
const lines = document.querySelectorAll(".line"); // Lines of text elements
const dynamicText = document.getElementById("dynamicText"); // Dynamic text container
const slideText = document.getElementById("slideText"); // Slide text
const slideImage = document.getElementById("slideImage"); // Image element for the slide
const navBar = document.querySelector(".nav"); // Navigation bar
const prevBtn = document.getElementById("prevBtn"); // "Previous" button
const nextBtn = document.getElementById("nextBtn"); // "Next" button
const pageNumber = document.getElementById("pageNumber"); // Page number container
const button = document.querySelector(".button"); // Button element

// Preload images of slides
slides.forEach((slide) => {
  const img = new Image();
  img.src = slide.img;
});

// Event listener for window load to trigger animations
window.addEventListener("load", function () {
  // GSAP animation for logo appearance
  gsap.to(logo, {
    x: 0,
    opacity: 1,
    duration: 0.4,
    onComplete: () => {
      gsap.to(logo, { x: 0, y: 0, delay: 0.8, duration: 0.3 });
    },
  });

  // GSAP animation for lines of text
  gsap.to(lines, {
    opacity: 1,
    x: 0,
    y: 0,
    duration: 0.6,
    delay: 2,
    stagger: 0.2,
  });

  // Animations for slide image based on screen size
  if (window.innerWidth <= 768) {
    // Animation for mobile devices
    gsap.to(slideImage, {
      x: 0,
      y: 380,
      height: 270,
      delay: 3,
      duration: 0.8,
      onComplete: () => {
        gsap.to(slideImage, {
          y: 0,
          x: 0,
          duration: 0,
        });
        slideImage.style.position = "relative";

        gsap.to(dynamicText, {
          visibility: "visible",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(button, { opacity: 1, duration: 0.5 });

        gsap.to(navBar, { opacity: 1, duration: 0.5 });

        startAutoPlay();
      },
    });
  } else if (window.innerWidth >= 768 && window.innerWidth < 1158) {
    // Animation for tablet/medium screens
    gsap.to(slideImage, {
      x: 350,
      width: 400,
      delay: 3,
      duration: 0.8,
      onComplete: () => {
        gsap.to(slideImage, {
          x: 0,
          duration: 0,
        });
        slideImage.style.position = "relative";

        gsap.to(dynamicText, {
          visibility: "visible",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(button, { opacity: 1, duration: 0.5 });

        gsap.to(navBar, { opacity: 1, duration: 0.5 });

        startAutoPlay();
      },
    });
  } else {
    // Animation for large screens
    gsap.to(slideImage, {
      x: 450,
      width: 400,
      delay: 3,
      duration: 0.8,
      onComplete: () => {
        gsap.to(slideImage, {
          x: 0,
          duration: 0,
        });
        slideImage.style.position = "relative";

        gsap.to(dynamicText, {
          visibility: "visible",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(button, { opacity: 1, duration: 0.5 });

        gsap.to(navBar, { opacity: 1, duration: 0.5 });

        startAutoPlay();
      },
    });
  }
});

// Function to update the current slide with animations
function updateSlide(index, scroll = "next") {
  const slide = slides[index];

  // Update dynamic text height with animation
  gsap.to(dynamicText, {
    duration: 0.2,
    onComplete: () => {
      const newHeight = dynamicText.scrollHeight;

      gsap.to(dynamicText, {
        height: newHeight,
        duration: 0.1,
        onComplete: () => {
          gsap.to(dynamicText, { opacity: 1, duration: 0.3 });
        },
      });
    },
  });

  // Update slide image with fade-in effect
  gsap.to(slideImage, {
    opacity: 0.3,
    duration: 0.2,
    onComplete: () => {
      slideImage.src = slides[index].img;
      gsap.to(slideImage, {
        opacity: 1,
        duration: 0.3,
        immediateRender: false,
      });
    },
  });

  // Update the slide text and page number
  slideText.textContent = slide.text;
  pageNumber.textContent = slides[index].page;

  // Slide text animation for direction (next or prev)
  if (scroll === "next") {
    gsap.fromTo(
      dynamicText,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5 }
    );
  } else {
    gsap.fromTo(
      dynamicText,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5 }
    );
  }

  // Check button states (enable/disable)
  checkButtons();
}

// Function to check if the buttons should be enabled or disabled
function checkButtons() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === slides.length - 1;

  prevBtn.classList.toggle("disabled", currentIndex === 0);
  nextBtn.classList.toggle("disabled", currentIndex === slides.length - 1);
}

// Auto-play functionality
let autoPlayTimer;
let userInteracted = false;

// Start auto-play of slides
function startAutoPlay() {
  if (userInteracted) return;
  autoPlayTimer = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide(currentIndex);
  }, 6000);
}

// Stop auto-play when the user interacts with the controls
function stopAutoPlay() {
  clearInterval(autoPlayTimer);
  userInteracted = true;
}

// Event listeners for navigation buttons
prevBtn.addEventListener("click", () => {
  stopAutoPlay();
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlide(currentIndex, "prev");
});

nextBtn.addEventListener("click", () => {
  stopAutoPlay();
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlide(currentIndex, "next");
});

button.addEventListener("click", () => {
  window.location.href = "about:blank";
});

// Initial slide update
updateSlide(currentIndex);

// Buttons pulse animation
const pulseElements = document.querySelectorAll(".pulse-element");

pulseElements.forEach((element) => {
  let pulseAnimation = gsap.to(element, {
    scale: 0.95,
    repeat: -1,
    yoyo: true,
    duration: 0.5,
    ease: "power1.inOut",
  });

  element.addEventListener("mouseenter", () => {
    pulseAnimation.kill();
    gsap.to(element, { scale: 1, duration: 0.5, ease: "power1.inOut" });
  });

  element.addEventListener("mouseleave", () => {
    gsap.to(element, { scale: 0.9, duration: 0.3, ease: "power1.inOut" });
  });

  element.addEventListener("mousedown", () => {
    gsap.to(element, { scale: 0.6, duration: 0.2 });
  });

  element.addEventListener("mouseup", () => {
    gsap.to(element, { scale: 1, duration: 0.2 });
  });
});
