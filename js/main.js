"use strict";

const slides = [
  {
    text: "The first time I used the Samsung Bespoke Jet™, I cried. Im not being sensational; I really did.Of course, this vacuum worked great. But thats not all.",
    img: "./assets/images/2/Image.jpg",
    page: "1/5",
  },
  {
    text: "If you’re an over-cleaner, like myself, you’ll nerd out on all of the functions. If you avoid this chore at all costs, you’ll appreciate how simple Samsung makes it.",
    img: "./assets/images/3/Image.jpg",
    page: "2/5",
  },
  {
    text: "Both the floor and pet hair attachments are cleverly designed to eliminate the dreaded hair wrap. (In other words, you’ll never have to tackle hair tangles with a pair of scissors again.)",
    img: "./assets/images/4/Image.jpg",
    page: "3/5",
  },
  {
    text: "When I learned the Samsung Bespoke Vac cleaned itself with amazing technology, that’s when I cried. No more scraping spider legs and hair out of the crevices with my hands. Its suction power is so strong, the canister is left perfectly clean after every use. It’s like a vacuum for your vacuum.",
    img: "./assets/images/5/Layer 1.jpg",
    page: "4/5",
  },
  {
    text: "Because it’s so nice-looking, it can live right in the kitchen. No more hauling a vacuum up and down the basement stairs on the daily",
    img: "./assets/images/6/Image.jpg",
    page: "5/5",
  },
];

let currentIndex = 0;

const dynamicText = document.getElementById("dynamicText");
const slideText = document.getElementById("slideText");
const slideImage = document.getElementById("slideImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumber = document.getElementById("pageNumber");

function updateSlide(index) {
  const slide = slides[index];

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

  gsap.to(slideImage, {
    opacity: 0.5,
    duration: 0.1,
    onComplete: () => {
      slideImage.src = slides[index].img;
      gsap.to(slideImage, { opacity: 1, duration: 0.3 });
    },
  });

  slideText.textContent = slide.text;
  pageNumber.textContent = slides[index].page;
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  gsap.fromTo(
    dynamicText,
    { x: -50, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.5 }
  );
  updateSlide(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  gsap.fromTo(
    dynamicText,
    { x: 50, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.5 }
  );
  updateSlide(currentIndex);
});

updateSlide(currentIndex);

// setInterval(() => {
//   updateSlide(currentIndex);
//   currentIndex = (currentIndex + 1) % 4;
// }, 2000);
