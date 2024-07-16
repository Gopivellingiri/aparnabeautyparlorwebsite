

const scrollToTopButton = document.getElementById("scrollToTopBtn");


window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}

scrollToTopButton.addEventListener("click", function() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
});


