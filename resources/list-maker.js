// Create a shorthand for the function document.getElementById()
function $(x) {
  return document.getElementById(x);
}

// Create and name the targets we will be using for this script

const skiTouringRadioTarget = $('ski-touring-radio');
const mountainBikingRadioTarget = $('mountain-biking-radio');
const dayOrOvernightTarget = $('day-or-overnight-selection');

const skiTouringGearTarget = $('list-ski-gear');
const skiTouringClothingTarget = $('list-ski-clothing');

//const deleteButtonTargets = itemIds.map(itemId => $(`delete-${itemId}-ski-gear`));
//const listItemTargets = itemIds.map(itemId => $(`item-${itemId}-ski-gear`));
//const associatedHrTargets = itemIds.map(itemId => $(`hr-${itemId}-ski-gear`));

const userInputTextTarget = $('user-input-text');
const addListItemTarget = $('add-list-item');
const newListItemsSkiGearTarget = $('new-list-items-ski-gear');
const newListItemsSkiClothingTarget = $('new-list-items-ski-clothing');

// Objects containing information for the lists
const skiGearList = {
  activity:'ski',
  listTitle: 'Gear',
  itemDisplayNames: ['Transceiver, probe and shovel', 'Touring skis/splitboard', 'Skins', 'Poles', 'Boots', 'Helmet', 'Goggles', 'Sunglasses']
}

// Functions to customise the DOM

function displayDayOrOvernightQuestion() {
  dayOrOvernightTarget.style.display = 'flex';
}

function hideDayOrOvernightQuestion() {
  dayOrOvernightTarget.style.display = 'none';
}

function displaySkiListPanels() {
  skiTouringGearTarget.style.display = 'inline-block';
  skiTouringClothingTarget.style.display = 'inline-block';
}

function hideSkiGearListPanel() {
  skiTouringGearTarget.style.display = 'none';
  skiTouringClothingTarget.style.display = 'none';
}

// Function to delete an item
function deleteListItem(itemId, activity, listTitleId) {
  const listItemTarget = $(`container-${itemId}-${activity}-${listTitleId}`);
  listItemTarget.remove();
  const associatedHrTargets = $(`hr-${itemId}-${activity}-${listTitleId}`)
  associatedHrTargets.remove();
}

// Function to create event listeners of the delete buttons
const createDeleteButtonListeners = (itemIds, activity, listTitleId) => {
  itemIds.forEach(itemId => {
    const deleteButtonTarget = $(`delete-${itemId}-${activity}-${listTitleId}`);
    deleteButtonTarget.addEventListener('click', function() {
      deleteListItem(itemId, activity, listTitleId);
    });
  });
};

// Function to render lists as HTML
function renderLists(activity, listTitle, itemDisplayNames) {
  console.log('renderLists function successfully called');
  
  // Create ids from the list title and the list item display names
  const listTitleId = listTitle.toLowerCase();
  const itemIds = itemDisplayNames.map(itemDisplayName => itemDisplayName.toLowerCase().replace(/\s+|[,\/]/g, '-'));

  // Generate the html to render the list
  const startListHtml = `<section class="list-container" id="list-${activity}-${listTitleId}">
  <h3>${listTitle}</h3>`;
  const endListHtml = '</section>';
  
  let listItemsHtml = '';
  for (let i=0; i<itemDisplayNames.length; i++) {
    listItemsHtml += `
    <div class="list-item" id="container-${itemIds[i]}-${activity}-${listTitleId}">
      <button id="delete-${itemIds[i]}-${activity}-${listTitleId}">x</button>
      <label for="item-${itemIds[i]}-${activity}-${listTitleId}">${itemDisplayNames[i]}</label>
      <input type="checkbox" id="item-${itemIds[i]}-${activity}-${listTitleId}" name="item-${activity}-${listTitleId}" checked>
    </div>
    <hr id="hr-${itemIds[i]}-${activity}-${listTitleId}"></hr>`;
  }

  const userListItemsHtml = `<div id="new-list-items-ski-gear"></div>
  <div class="text-input-line">
    <label for="user-input-text"><input type="text" name="ski-touring-list-item" id="user-input-text"></label>
    <button id="add-list-item">Add</button>
  </div>`;
  
  // Render the html on the webpage
  const listsTarget = $('lists-container');
  listsTarget.innerHTML = startListHtml + listItemsHtml + userListItemsHtml + endListHtml;
  
}

// Function to delete an item
function deleteItem(index) {
  listItemTargets[index].remove();
  associatedHrTargets[index].remove();
}

// This function creates an event listener to deletes a relevant item from the list when the user clicks on its associated delete button
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

  // Check if the text input box is empty - if it is empty, exit the function wihtout doing anything
  if (!userInputTextTarget.value) {
    return;
  }

  // Generate HTML code to display the new user-inputted item, in the list.
  // The HTML code includes a delete button and an edit button for the new item.
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

  // Call functino to create an event listener for the delete button
  createDeleteListener(itemNumber, $(`delete-${itemNumber}`));

  // TO DO - CREATE AN EVENT LISTENER FOR THE EDIT BUTTON

  // Increment the item number to keep track of each added item
  itemNumber++;

  // This will clear the text box when the item is added to the list
  userInputTextTarget.value = '';
}



// Event listeners

// Depending on whether the user selects 'ski touring' or 'mountain biking', the relevant lists will appear, and the irrelevant lists will be disappear
skiTouringRadioTarget.addEventListener('change', function() {
  // Website renderers
  renderLists(skiGearList.activity, skiGearList.listTitle, skiGearList.itemDisplayNames);
  displayDayOrOvernightQuestion();
});
mountainBikingRadioTarget.addEventListener('change', function() {
  //hideSkiGearListPanel();
  hideDayOrOvernightQuestion();
});

/*deleteButtonTargets.forEach(deleteButtonTarget => {
  const index = deleteButtonTargets.indexOf(deleteButtonTarget);
  deleteButtonTarget.addEventListener('click', function() {
    deleteItem(index)
  });
});*/


// When the user clicks the "add" button or hits the enter key, whatever the user has typed into the text input box will be added to the list as an item
addListItemTarget.addEventListener('click', addItemToList);
userInputTextTarget.addEventListener('keyup', function hitEnter(key) {
  if(key.code==='Enter') {
    addItemToList();
  }   
});
