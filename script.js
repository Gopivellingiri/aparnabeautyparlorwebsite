document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopButton = document.getElementById("scrollToTopBtn");
  const navbar = document.querySelector(".navbar");
  const sticky = navbar.offsetTop;

  window.addEventListener("scroll", handleScroll);

  function handleScroll() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollToTopButton.style.display = "block";
    } else {
      scrollToTopButton.style.display = "none";
    }

    if (window.scrollY > sticky) {
      navbar.classList.add("fixed");
    } else {
      navbar.classList.remove("fixed");
    }
  }

  scrollToTopButton.addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let swiperCards = new Swiper(".card-content", {
    loop: true,
    spaceBetween: 32,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      600: {
        slidesPerView: 2,
      },
      968: {
        slidesPerView: 3,
      },
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const testimonialSwiper = new Swiper(".testimonial-swiper", {
    loop: true,
    slidesPerView: 1,
    grabCursor: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const priceRates = document.querySelectorAll(".price-rate");

  priceRates.forEach((rate) => {
    rate.addEventListener("click", function () {
      priceRates.forEach((otherRate) => {
        if (otherRate !== rate) {
          const otherServiceName = otherRate.querySelector(".service-name");
          const otherServicePrice = otherRate.querySelector(".service-price");
          otherServiceName.style.display = "block";
          otherServicePrice.style.display = "none";
        }
      });

      const serviceName = this.querySelector(".service-name");
      const servicePrice = this.querySelector(".service-price");

      if (serviceName.style.display === "none") {
        serviceName.style.display = "block";
        servicePrice.style.display = "none";
      } else {
        serviceName.style.display = "none";
        servicePrice.style.display = "block";
      }
    });
  });
});

// Handle Navbar Toggle for Mobile
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburgar");
  const closeBtn = document.querySelector(".closeBtn");
  const navLinks = document.querySelector(".nav-links");

  // Toggle nav links visibility on hamburger click
  hamburger.addEventListener("click", function () {
    navbar.classList.toggle("active");
  });

  // Close nav links on close button click
  closeBtn.addEventListener("click", function () {
    navbar.classList.remove("active");
  });

  // Close nav links when clicking outside the navbar
  document.addEventListener("click", function (event) {
    if (!navbar.contains(event.target)) {
      navbar.classList.remove("active");
    }
  });

  // Prevent event propagation when clicking inside nav links
  navLinks.addEventListener("click", function (event) {
    event.stopPropagation();
    navbar.classList.remove("active");
  });
});

