// Create a shorthand for the function document.getElementById()
function $(x) {
  return document.getElementById(x);
}

// Declare all relevant targets
const hamburgerButtonTarget = $('hamburger-navigation-button');
const hamburgerCloseImgTarget = $('hamburger-close-img')
const hamburgerNavPanelTarget = $('hamburger-navigation-panel');
const skiTouringNavItemTarget = $('ski-touring-nav-item');
const mtbNavItemTarget = $('mtb-nav-item');
const planAdventureNavItemTarget = $('plan-adventure-nav-item');
const contactNavItemTarget = $('contact-nav-item');

// We start of with the navigation panel being hidden when the page loads
let isHidden = true;

// Function to expand and hide the navigation panel (on click)
const expandHideNav = () => {
  if (!isHidden) {
    hamburgerNavPanelTarget.style.display = 'none';
    hamburgerCloseImgTarget.src = 'resources/icons/036-square.svg';
    // If the panel is hidden, the image will be the three-lined 'hamburger' image, to open the panel on click
    hamburgerCloseImgTarget.style.opacity = "1";
    isHidden = true;
  } else {
    hamburgerNavPanelTarget.style.display = 'block';
    hamburgerCloseImgTarget.src = 'resources/icons/066-erase.svg'; // If the panel is expanded the image will be an 'x', to close the panel on click
    hamburgerCloseImgTarget.style.opacity = "0.5";
    isHidden = false;
  }
}

// Event handlers

// Expand/hide panel on click
hamburgerButtonTarget.addEventListener('click', expandHideNav);

// When the nav list items are clicked, you will be linked to the relevant place (HTML will do this), then after a short pause, the panel will automatically close (JS will do this)
skiTouringNavItemTarget.addEventListener('click', function() {
  setTimeout(expandHideNav, 750);
}); 
mtbNavItemTarget.addEventListener('click', function() {
  setTimeout(expandHideNav, 750);
});
planAdventureNavItemTarget.addEventListener('click', function() {
  setTimeout(expandHideNav, 750);
});
contactNavItemTarget.addEventListener('click', function() {
  setTimeout(expandHideNav, 750);
});