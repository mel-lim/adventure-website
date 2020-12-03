// Create a shorthand for the function document.getElementById()
function $(x) {
  return document.getElementById(x);
} 

// Get targets
const scrollToTopTarget = $('scroll-to-top');

window.addEventListener('scroll', function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopTarget.style.display = 'block';
  } else {
    scrollToTopTarget.style.display = 'none';
  }
});

scrollToTopTarget.addEventListener('click', function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})