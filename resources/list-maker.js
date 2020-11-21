// Create a shorthand for the function document.getElementById()
function $(x) {
  return document.getElementById(x);
}

// Create and name the targets we will be using for this script

const skiTouringRadioTarget = $('ski-touring-radio');
const mountainBikingRadioTarget = $('mountain-biking-radio');
const skiTouringGearTarget = $('ski-touring-gear');
const skiTouringClothingTarget = $('ski-touring-clothing');
const userInputTextTarget = $('user-input-text');
const addListItemTarget = $('add-list-item');
const newListItemsSkiGearTarget = $('new-list-items-ski-gear');
const newListItemsSkiClothingTarget = $('new-list-items-ski-clothing');

// Functions to change the DOM

function displaySkiListPanels() {
  skiTouringGearTarget.style.display = 'inline-block';
  skiTouringClothingTarget.style.display = 'inline-block';
}

function hideSkiGearListPanel() {
  skiTouringGearTarget.style.display = 'none';
}

// This function deletes a relevant item from the list when the user clicks on its associated delete button
function createDeleteListener(itemNumber, deleteButtonTarget) {
  deleteButtonTarget.addEventListener('click', function() {
    const userInputtedItemToDeleteTarget = $(`${itemNumber}-list-item-container`);
    userInputtedItemToDeleteTarget.remove();
    const associatedHrTarget = $(`${itemNumber}-hr-element`);
    associatedHrTarget.remove();
  });
}

// This function lets the user add their own items to the list by typing into the provided text box.
// The item number will let us keep track of and identify each user added item.
let itemNumber = 0;
function addItemToList() { 
  // Check if the text input box is empty - if it is empty, do nothing
  if (!userInputTextTarget.value) {
    return;
  }

  // Create HTML code as a string, to display the new item that the user has typed into the text box in the list.
  // The HTML code also creates a delete button and an edit button for the new item.
  const userInputHtml = `<div class="list-item" id="${itemNumber}-list-item-container">
    <button id="delete-${itemNumber}">x</button>
    <label for="${itemNumber}-list-item">${userInputTextTarget.value}</label>
    <button id="edit-${itemNumber}">Edit</button>
    <input type="checkbox" id="${itemNumber}-list-item" name="${itemNumber}-list-item" checked>
  </div>
  <hr id="${itemNumber}-hr-element">
  `;

  // Insert the HTML string into the relevant spot in our DOM.
  newListItemsSkiGearTarget.insertAdjacentHTML('beforeend', userInputHtml);

  // Create an event listener for the delete button
  createDeleteListener(itemNumber, $(`delete-${itemNumber}`));

  // TO DO - CREATE AN EVENT LISTENER FOR THE EDIT BUTTON

  // Increment the item number to keep track of each added item
  itemNumber++;

  // This will clear the text box when the item is added to the list
  userInputTextTarget.value = '';
}

// Event listeners

// Depending on whether the user selects 'ski touring' or 'mountain biking', the relevant lists will appear, and the irrelevant lists will be disappear
skiTouringRadioTarget.addEventListener('change', displaySkiListPanels);
mountainBikingRadioTarget.addEventListener('change', hideSkiGearListPanel);

// When the user clicks the "add" button or hits the enter key, whatever the user has typed into the text input box will be added to the list as an item
addListItemTarget.addEventListener('click', addItemToList);
userInputTextTarget.addEventListener('keyup', function hitEnter(key) {
  if(key.code==='Enter') {
    addItemToList();
  }   
});
