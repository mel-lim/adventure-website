// Create a shorthand for the function document.getElementById()
function $(x) {
  return document.getElementById(x);
}

// Create arrays to hold the html IDs of all the elements we want to express as targets
const collapsedViewIds = ['collapsed-view-skis', 'collapsed-view-bindings', 'collapsed-view-boots', 'collapsed-view-skins', 'collapsed-view-rescue', 'collapsed-view-jaws', 'collapsed-view-greta', 'collapsed-view-lightning'];
const iconIds = ['ski-expand-icon', 'bindings-expand-icon', 'boots-expand-icon', 'skins-expand-icon', 'rescue-expand-icon', 'jaws-expand-icon', 'greta-expand-icon', 'lightning-expand-icon'];
const moreInfoIds = ['more-info-skis', 'more-info-bindings', 'more-info-boots', 'more-info-skins', 'more-info-rescue', 'more-info-jaws', 'more-info-greta', 'more-info-lightning'];
const itemHeadingIds = ['item-heading-skis', 'item-heading-bindings', 'item-heading-boots', 'item-heading-skins', 'item-heading-rescue', 'item-heading-jaws', 'item-heading-greta', 'item-heading-lightning'];

// Using the relevant array of IDs, create new arrays to hold all the targets
const collapsedViewTargets = collapsedViewIds.map(collapsedViewId => $(collapsedViewId));
const expandIconTargets = iconIds.map(iconId => $(iconId));
const moreInfoTargets = moreInfoIds.map(moreInfoId => $(moreInfoId));
const itemHeadingTargets = itemHeadingIds.map(itemHeadingId => $(itemHeadingId));

// Functions to change the DOM once a relevant event takes place

// Function to make the item heading and the icon black (for when the mouse is over the target)
function makeBlack(collapsedViewTarget, index) {
  expandIconTargets[index].style.opacity = '1';
  itemHeadingTargets[index].style.color = 'black';
}

// Function to return the item heading and the icon back to grey (for when the mouse leaves the target)
function makeGrey(collapsedViewTarget, index) {
  expandIconTargets[index].style.opacity = '0.5';
  itemHeadingTargets[index].style.color = 'hsl(0, 0%, 40%)';
} 

// Function to display and hide the 'more info' panel when the target is clicked
function showHideInfo(collapsedViewTarget, index) {

  // If expanded, collapse
  if (expandIconTargets[index].style.transform === 'rotate(-90deg)') {
    expandIconTargets[index].style.transform = 'none';
    itemHeadingTargets[index].style.marginBottom = '0.5em';
    moreInfoTargets[index].style.display = 'none';

    // Mobile version
    if (window.screen.width <= 480) {
      itemHeadingTargets[index].style.fontSize = '1.5rem';

    } else { // Tablets and larger
      itemHeadingTargets[index].style.fontSize = '2rem';
    }

  } else { // If collapsed, expand
    expandIconTargets[index].style.transform = 'rotate(-90deg)';
    itemHeadingTargets[index].style.marginBottom = '0.3em';
    
    // Small tablet and mobile version
    if (
       (window.screen.width <= 620 && index >= 5) || // Natural breakpoint for the bike 'more-info' sections
       (window.screen.width <= 480 && index >= 1 && index < 3) || // Natural breakpoint for ski 'more-info' sections, except for skis and skins
       (window.screen.width <= 480 && index == 4)
       ) {
      moreInfoTargets[index].style.display = 'block';
    } else { // Larger viewports version
      moreInfoTargets[index].style.display = 'flex';
    }

    // Mobile version
    if(window.screen.width <= 480) {
      itemHeadingTargets[index].style.fontSize = '2rem';

    } else { // Tablets and larger
      itemHeadingTargets[index].style.fontSize = '2.5rem';
    }
  }
}

// Add event listeners to each target, and connect it with the relevant event handler function
collapsedViewTargets.forEach(collapsedViewTarget => {

  const index = collapsedViewTargets.indexOf(collapsedViewTarget);

  // Make black on mouseover
  collapsedViewTarget.addEventListener("mouseover", function() {
    makeBlack(collapsedViewTarget, index);
  });
  
  // Make grey on mouseout
  collapsedViewTarget.addEventListener("mouseout", function() {
    makeGrey(collapsedViewTarget, index);
  });

  // Expand/collapse on click
  collapsedViewTarget.addEventListener("click", function() {
    showHideInfo(collapsedViewTarget, index);
  });
});