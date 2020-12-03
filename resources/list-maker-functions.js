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
  const div = document.createElement('div');
  div.className = 'list-item';
  div.id = `container-${itemNumber}-${activity}-${listTitleId}`;

  const button = document.createElement('button');
  button.className = 'delete-button';
  button.id = `delete-${itemNumber}-${activity}-${listTitleId}`;
  div.appendChild(button);

  const label = document.createElement('label');
  label.setAttribute('for', `item-${itemNumber}-${activity}-${listTitleId}`);
  label.innerHTML = `${userInputTextTarget.value}`;
  div.appendChild(label);

  const input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.id = `item-${itemNumber}-${activity}-${listTitleId}`;
  input.setAttribute('name', `item-${activity}-${listTitleId}`);
  input.setAttribute('checked', '');
  div.appendChild(input);

  const hr = document.createElement('hr');
  hr.id = `hr-${itemNumber}-${activity}-${listTitleId}`;

  // Starting code for edit button - a 'do later' task
  // <button id="edit-${itemNumber}-${activity}-${listTitleId}">Edit</button>

  // Insert the HTML string into the relevant spot in our DOM.
  const newListItemTarget = $(`new-list-items-${activity}-${listTitleId}`);
  newListItemTarget.append(div, hr);

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
  const userInputTextTarget = $(`user-input-text-${activity}-${listTitleId}`);
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

  const section = document.createElement('section');
  section.className = 'list-container';
  section.id = `list-${activity}-${listTitleId}`;

  const h3 = document.createElement('h3');
  h3.innerHTML = `${listTitle}`;
  section.appendChild(h3);
  
  for (let i=0; i<itemDisplayNames.length; i++) {
    const listItemDiv = document.createElement('div');
    listItemDiv.className = 'list-item';
    listItemDiv.id = `container-${itemIds[i]}-${activity}-${listTitleId}`;
    section.appendChild(listItemDiv);

    const button = document.createElement('button');
    button.className = 'delete-button';
    button.id = `delete-${itemIds[i]}-${activity}-${listTitleId}`;
    listItemDiv.appendChild(button);

    const itemLabel = document.createElement('label');
    itemLabel.setAttribute('for', `item-${itemIds[i]}-${activity}-${listTitleId}`);
    itemLabel.className = "item-display-name";
    itemLabel.innerHTML = `${itemDisplayNames[i]}`;
    listItemDiv.appendChild(itemLabel);

    const checkboxInput = document.createElement('input');
    checkboxInput.setAttribute('type', 'checkbox');
    checkboxInput.id = `item-${itemIds[i]}-${activity}-${listTitleId}`;
    checkboxInput.setAttribute('name', `item-${activity}-${listTitleId}`);
    listItemDiv.appendChild(checkboxInput);

    const hr = document.createElement('hr');
    hr.id = `hr-${itemIds[i]}-${activity}-${listTitleId}`;
    section.appendChild(hr);
  }

  // Creates an empty container to display new user-added list items
  // Renders text box for user input to add new items to the list

  const newItemDiv = document.createElement('div');
  newItemDiv.id = `new-list-items-${activity}-${listTitleId}`;
  section.appendChild(newItemDiv);
  
  const textInputDiv = document.createElement('div');
  textInputDiv.className = 'text-input-line';
  section.appendChild(textInputDiv);

  const userInputLabel = document.createElement('label');
  userInputLabel.setAttribute('for', 'user-input-text');
  textInputDiv.appendChild(userInputLabel);

  const textInput = document.createElement('input');
  textInput.setAttribute('type', 'text');
  textInput.setAttribute('name', `item-${activity}-${listTitleId}`);
  textInput.id = `user-input-text-${activity}-${listTitleId}`;
  userInputLabel.appendChild(textInput);

  const addButton = document.createElement('button');
  addButton.className = 'add-button';
  addButton.id = `add-button-${activity}-${listTitleId}`;
  textInputDiv.appendChild(addButton);
  
  // Render the html on the webpage

  const listsTarget = $('lists-container');
  listsTarget.append(section);

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