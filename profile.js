document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    window.location.href = link.dataset.page;
  });
});


const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slide").length;
const prevBtn = document.querySelector(".arrow.left");
const nextBtn = document.querySelector(".arrow.right");

let index = 0;
let startX = 0;
let isDragging = false;

/* ARROWS */
nextBtn.addEventListener("click", () => {
  index++;
  if (index >= totalSlides) index = totalSlides - 1;
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  index--;
  if (index < 0) index = 0;
  updateSlider();
});

/* TOUCH */
slides.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

slides.addEventListener("touchend", e => {
  handleSwipe(startX, e.changedTouches[0].clientX);
});

/* MOUSE */
slides.addEventListener("mousedown", e => {
  isDragging = true;
  startX = e.clientX;
});

slides.addEventListener("mouseup", e => {
  if (!isDragging) return;
  isDragging = false;
  handleSwipe(startX, e.clientX);
});

function handleSwipe(start, end) {
  if (start - end > 50) index++;
  if (end - start > 50) index--;

  if (index < 0) index = 0;
  if (index >= totalSlides) index = totalSlides - 1;

  updateSlider();
}

function updateSlider() {
  slides.style.transform = `translateX(-${index * 100}%)`;
}


