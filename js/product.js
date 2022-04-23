const swiper = new Swiper(".mySwiper", {
  grabCursor: true,
  slidesPerView: 1,
  spaceBetween: 70,
  pagination: {
    el: ".custom-pagination",
    clickable: true,
  },
  breakpoints: {
    480: {
      slidesPerView: 2,
    },
    1025: {
      slidesPerView: 3,
    },
  },
});
