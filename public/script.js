document.addEventListener("DOMContentLoaded", function () {
  // Scroll to Top Button and Navbar
  const scrollToTopButton = document.getElementById("scrollToTopBtn");
  const navbar = document.querySelector(".navbar");
  const sticky = navbar.offsetTop;

  window.addEventListener("scroll", handleScroll);

  function handleScroll() {
    // Show/Hide Scroll to Top Button
    scrollToTopButton.style.display =
      document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
        ? "block"
        : "none";

    // Sticky Navbar
    navbar.classList.toggle("fixed", window.scrollY > sticky);
  }

  scrollToTopButton.addEventListener("click", function () {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  });

  // Initialize Swipers
  initializeSwiper(".card-content", {
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
      600: { slidesPerView: 2 },
      968: { slidesPerView: 3 },
    },
  });

  initializeSwiper(".testimonial-swiper", {
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

  // Price Rate Toggle
  setupPriceRateToggle();

  // Navbar Toggle for Mobile
  setupNavbarToggle();
});

// Function to initialize Swiper
function initializeSwiper(selector, options) {
  return new Swiper(selector, options);
}

// Function to set up Price Rate Toggle
function setupPriceRateToggle() {
  const priceRates = document.querySelectorAll(".price-rate");

  priceRates.forEach((rate) => {
    rate.addEventListener("click", function () {
      priceRates.forEach((otherRate) => {
        if (otherRate !== rate) {
          toggleServiceDisplay(otherRate, true);
        }
      });
      toggleServiceDisplay(rate);
    });
  });
}

// Function to toggle service display
function toggleServiceDisplay(rate, hide = false) {
  const serviceName = rate.querySelector(".service-name");
  const servicePrice = rate.querySelector(".service-price");

  if (hide) {
    serviceName.style.display = "block";
    servicePrice.style.display = "none";
  } else {
    const isHidden = serviceName.style.display === "none";
    serviceName.style.display = isHidden ? "block" : "none";
    servicePrice.style.display = isHidden ? "none" : "block";
  }
}

// Function to set up Navbar Toggle
function setupNavbarToggle() {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburgar");
  const closeBtn = document.querySelector(".closeBtn");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => navbar.classList.toggle("active"));
  closeBtn.addEventListener("click", () => navbar.classList.remove("active"));

  document.addEventListener("click", function (event) {
    if (!navbar.contains(event.target)) {
      navbar.classList.remove("active");
    }
  });

  navLinks.addEventListener("click", function (event) {
    event.stopPropagation();
    navbar.classList.remove("active");
  });
}

document.getElementById("clientForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    // Log form data for debugging
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Send the form data using fetch
    fetch("/submit", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          createToast("success");
        } else {
          createToast("error");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        createToast("error");
      });
  });

const notification = document.querySelector(".notification");
const toastDetails = {
  timer: 20000,
  success: {
    id: "success",
    icon: "fa-circle-check",
    text: "Success: Your form was submitted successfully.",
  },
  error: {
    id: "error",
    icon: "fa-circle-xmark",
    text: "Error: There was an error submitting your form.",
  },
};

const removeToast = (toast) => {
  toast.classList.add("hide");
  if (toast.timeoutId) clearTimeout(toast.timeoutId);
  setTimeout(() => toast.remove(), 500);
};

const createToast = (id) => {
  const { icon, text } = toastDetails[id];
  const toast = document.createElement("li");
  toast.className = `toast ${id}`;
  toast.innerHTML = `
      <div class="column">
          <i class="fa-solid ${icon}"></i>
          <span>${text}</span>
      </div>
      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>
  `;
  notification.appendChild(toast);
  toast.timeoutId = setTimeout(
    () => removeToast(toast),
    toastDetails[id].timer
  );
};
