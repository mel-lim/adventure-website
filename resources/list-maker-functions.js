// Create a shorthand for the function document.getElementById()
function $(x) {
  return document.getElementById(x);
}

// Functions to customise the DOM, to be triggered based on user selection

function displayDayOrOvernightQuestion() {
  dayOrOvernightTarget.style.display = 'flex';
}

function hideDayOrOvernightQuestion() {
  dayOrOvernightTarget.style.display = 'none';
}

// Function to delete a list item and its associated <hr> element
function deleteListItem(listItemTarget, associatedHrTarget) {
  listItemTarget.remove();
  associatedHrTarget.remove();
}

// Function to create a 'click' event listener for a delete button
function createDeleteButtonListener(itemId, activity, listTitleId) {
  const deleteButtonTarget = $(`delete-${itemId}-${activity}-${listTitleId}`);
  const listItemTarget = $(`container-${itemId}-${activity}-${listTitleId}`);
    const associatedHrTarget = $(`hr-${itemId}-${activity}-${listTitleId}`);
  deleteButtonTarget.addEventListener('click', function() {
    deleteListItem(listItemTarget, associatedHrTarget);
  });
}

// Function to take in a list of item IDs, and create 'click' event listeners for all their delete buttons
const createDeleteButtonListeners = (itemIds, activity, listTitleId) => {
  itemIds.forEach(itemId => {
    createDeleteButtonListener(itemId, activity, listTitleId);
  });
}

// Function to let the user add an item to the list using the text box

// The item number will let us keep track of and identify each user-added item.
let itemNumber = 0;

function addItemToList(activity, listTitleId, userInputTextTarget) { 

  // Check if the text input box is empty - if it is empty, exit the function wihtout doing anything
  if (!userInputTextTarget.value) {
    return;
  }

  // Generate HTML code to display the new user-inputted item, in the list.
  // The HTML code includes a delete button for the new item.
  const userInputHtml = `<div class="list-item" id="container-${itemNumber}-${activity}-${listTitleId}">
    <button id="delete-${itemNumber}-${activity}-${listTitleId}">x</button>
    <label for="item-${itemNumber}-${activity}-${listTitleId}">${userInputTextTarget.value}</label>
    <input type="checkbox" id="item-${itemNumber}-${activity}-${listTitleId}" name="item-${activity}-${listTitleId}" checked>
  </div>
  <hr id="hr-${itemNumber}-${activity}-${listTitleId}">
  `;

  // Code for edit button - a 'do later' task
  // <button id="edit-${itemNumber}-${activity}-${listTitleId}">Edit</button>

  // Insert the HTML string into the relevant spot in our DOM.
  const newListItemTarget = $(`new-list-items-${activity}-${listTitleId}`);
  newListItemTarget.insertAdjacentHTML('beforeend', userInputHtml);

  // Call the function to create an event listener for the delete button
  createDeleteButtonListener(itemNumber, activity, listTitleId);

  // TO DO - CREATE AN EVENT LISTENER FOR THE EDIT BUTTON

  // Increment the item number
  itemNumber++;

  // Clear the text box once the item is added to the list
  userInputTextTarget.value = '';
}

/* Function to create two event listeners for the user to add items to the list:
(1) When the user clicks the "add" button;
(2) When the user hits the enter key */
const createAddListItemListeners = (activity, listTitleId) => {
  const addButtonTarget = $(`add-button-${activity}-${listTitleId}`);
  const userInputTextTarget = $(`user-input-text-${activity}-${listTitleId}`)
  addButtonTarget.addEventListener('click', function() {
    addItemToList(activity, listTitleId, userInputTextTarget);
  });
  userInputTextTarget.addEventListener('keyup', function hitEnter(key) {
    if(key.code==='Enter') {
      addItemToList(activity, listTitleId, userInputTextTarget);
    }   
  });
}

// Function to render lists, with their 'suggested' items, as HTML
const renderList = (listName) => {
  // Get the properties of the relevant list
  const activity = listName.activity;
  const listTitle = listName.listTitle;
  const itemDisplayNames = listName.itemDisplayNames;

  // Using string processing, create ids from the list title and the list item display names
  const listTitleId = listTitle.toLowerCase().replace(/\s+|[,\/\(\)-]/g, '-');
  const itemIds = itemDisplayNames.map(itemDisplayName => itemDisplayName.toLowerCase().replace(/\s+|[,\/\(\)-]/g, '-'));

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
    <hr id="hr-${itemIds[i]}-${activity}-${listTitleId}">`;
  }

  // Creates an empty container to display new user-added list items
  // Renders text box for user input to add new items to the list
  const userListItemsHtml = `<div id="new-list-items-${activity}-${listTitleId}"></div>
  <div class="text-input-line">
    <label for="user-input-text"><input type="text" name="item-${activity}-${listTitleId}" id="user-input-text-${activity}-${listTitleId}"></label>
    <button id="add-button-${activity}-${listTitleId}">Add</button>
  </div>`;
  
  // Render the html on the webpage
  const htmlBlock = startListHtml + listItemsHtml + userListItemsHtml + endListHtml;
  const listsTarget = $('lists-container');
  listsTarget.insertAdjacentHTML('beforeend', htmlBlock);

  // Create the delete button listeners, which will delete the relevant list item, when clicked
  createDeleteButtonListeners(itemIds, activity, listTitleId);

  // Create listeners at the user input text box, which will add the user-inputted item to the list
  createAddListItemListeners(activity, listTitleId);
}

// Function to remove lists from DOM
const removeList = (listName) => {
  // Get the properties of the relevant list
  const activity = listName.activity;
  const listTitle = listName.listTitle;

  // Using string processing, create ids from the list title and the list item display names
  const listTitleId = listTitle.toLowerCase().replace(/\s+|[,\/\(\)-]/g, '-');
  const listTarget = $(`list-${activity}-${listTitleId}`);
  if (!listTarget) {
    return;
  }
  listTarget.remove();
}