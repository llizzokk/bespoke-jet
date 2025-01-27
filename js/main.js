"use strict";

const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

function goToNextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function goToPrevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

slides.forEach((slide, index) => {
  const nextButton = slide.querySelector(".next");
  const prevButton = slide.querySelector(".prev");

  nextButton.addEventListener("click", () => {
    currentIndex = index;
    goToNextSlide();
  });

  prevButton.addEventListener("click", () => {
    currentIndex = index;
    goToPrevSlide();
  });
});

showSlide(currentIndex);
