// Add Task Form Functionality

// Global variable to store the target column status
let targetColumnStatus = 'todo';

// Global array to store subtasks
let currentSubtasks = [];

// Global array to store selected users
let selectedUsers = [];

/**
 * Populates the assignedTo dropdown with checkboxes from contacts array
 */
function populateAssignedToDropdown() {
  let dropdownList = document.getElementById('assigned-to-list');
  if (!dropdownList) return;
  
  clearDropdownList(dropdownList);
  
  if (typeof contacts !== 'undefined') {
    addContactsToDropdown(dropdownList);
  }
}

function clearDropdownList(dropdownList) {
  dropdownList.innerHTML = '';
  dropdownList.classList.add('d-none');
}

function addContactsToDropdown(dropdownList) {
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let itemHTML = createDropdownItemHTML(contact, i);
    dropdownList.innerHTML += itemHTML;
  }
}

function createDropdownItemHTML(contact, index) {
  let initials = getInitials(contact.name);
  let avatarColor = getAvatarColor(contact.name);
  
  return `
    <div class="dropdown-item" onclick="toggleUserSelection('${contact.name}', event)">
      <div class="user-avatar-sm" style="background-color: ${avatarColor};">${initials}</div>
      <label for="user-${index}">${contact.name}</label>
      <input type="checkbox" id="user-${index}" value="${contact.name}" onclick="event.stopPropagation();">
    </div>
  `;
}

/**
 * Toggles the assigned to dropdown
 */
function toggleAssignedDropdown() {
  let dropdownList = document.getElementById('assigned-to-list');
  let arrow = document.querySelector('.dropdown-arrow');
  
  if (dropdownList) {
    dropdownList.classList.toggle('d-none');
  }
  
  if (arrow) {
    arrow.parentElement.parentElement.parentElement.classList.toggle('open');
  }
}

/**
 * Toggles user selection in the dropdown
 */
function toggleUserSelection(userName, event) {
  if (event) event.stopPropagation();
  
  let checkbox = findUserCheckbox(userName);
  if (!checkbox) return;
  
  checkbox.checked = !checkbox.checked;
  updateSelectedUsersArray(userName, checkbox.checked);
  updateDropdownPlaceholder();
}

function findUserCheckbox(userName) {
  return Array.from(document.querySelectorAll('.dropdown-item input[type="checkbox"]'))
    .find(cb => cb.value === userName);
}

function updateSelectedUsersArray(userName, isChecked) {
  let index = selectedUsers.indexOf(userName);
  if (isChecked && index === -1) {
    selectedUsers.push(userName);
  } else if (!isChecked && index > -1) {
    selectedUsers.splice(index, 1);
  }
}

/**
 * Updates the dropdown input text based on selected users
 */
function updateDropdownPlaceholder() {
  let input = document.querySelector('.dropdown-input');
  
  if (!input) return;
  
  if (selectedUsers.length === 0) {
    input.value = '';
    input.placeholder = 'Select contacts to assign';
  } else if (selectedUsers.length === 1) {
    input.value = selectedUsers[0];
  } else {
    input.value = `${selectedUsers.length} users selected`;
  }
}

/**
 * Close dropdown when clicking outside
 */
document.addEventListener('click', function(event) {
  let dropdown = document.getElementById('assigned-to');
  let dropdownList = document.getElementById('assigned-to-list');
  
  if (dropdown && !dropdown.contains(event.target) && dropdownList) {
    dropdownList.classList.add('d-none');
  }
});

/**
 * Generates a unique task ID
 * @returns {string} Unique task ID in format "task-X"
 */
function generateTaskId() {
  let maxId = 0;
  for (let i = 0; i < tasks.length; i++) {
    let taskIdNum = parseInt(tasks[i].id.split('-')[1]);
    if (taskIdNum > maxId) {
      maxId = taskIdNum;
    }
  }
  return 'task-' + (maxId + 1);
}

/**
 * Sets the target column status for new tasks
 * @param {string} status - The status/column where task should be added (todo, in-progress, await-feedback, done)
 */
function setTargetColumn(status) {
  targetColumnStatus = status || 'todo';
}

function clearForm() {
  let form = document.getElementById('task-form');
  form.reset();

  clearFormErrors();
  clearSubtasks();
  clearSelectedUsers();
}

function clearFormErrors() {
  let titleError = document.getElementById('title-error-message');
  let dateError = document.getElementById('date-error-message');
  let titleGroup = document.getElementById('title-form-group');
  let dateGroup = document.getElementById('date-form-group');

  if (titleError) titleError.classList.add('d-none');
  if (dateError) dateError.classList.add('d-none');
  if (titleGroup) titleGroup.classList.remove('error');
  if (dateGroup) dateGroup.classList.remove('error');
}

function clearSubtasks() {
  let subtaskList = document.getElementById('subtask-list');
  if (subtaskList) {
    subtaskList.innerHTML = '';
  }
  currentSubtasks = [];
}

function clearSelectedUsers() {
  selectedUsers = [];
  let checkboxes = document.querySelectorAll('.dropdown-item input[type="checkbox"]');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
  updateDropdownPlaceholder();
}

function validateForm() {
  let isValid = validateTitleField();
  isValid = validateDateField() && isValid;
  return isValid;
}

function validateTitleField() {
  let title = document.getElementById('task-title');
  let titleGroup = document.getElementById('title-form-group');
  let titleError = document.getElementById('title-error-message');

  if (title.value.trim() === '') {
    titleGroup.classList.add('error');
    titleError.classList.remove('d-none');
    return false;
  } else {
    titleGroup.classList.remove('error');
    titleError.classList.add('d-none');
    return true;
  }
}

function validateDateField() {
  let date = document.getElementById('task-date');
  let dateGroup = document.getElementById('date-form-group');
  let dateError = document.getElementById('date-error-message');

  if (date.value === '') {
    dateGroup.classList.add('error');
    dateError.classList.remove('d-none');
    return false;
  } else {
    dateGroup.classList.remove('error');
    dateError.classList.add('d-none');
    return true;
  }
}

function saveTask(event) {
  event.preventDefault();

  if (validateForm()) {
    let newTask = createTaskFromForm();
    tasks.push(newTask);
    
    handleTaskSaveSuccess();
  }
}

function createTaskFromForm() {
  let taskId = generateTaskId();
  let title = document.getElementById('task-title').value.trim();
  let description = getDescriptionValue();
  let dueDate = document.getElementById('task-date').value;
  let priority = getSelectedPriority();
  let category = getSelectedCategory();
  let assignedTo = getAssignedUserInitials();
  let subtasks = getFilteredSubtasks();
  
  return {
    id: taskId,
    title: title,
    description: description,
    category: category,
    assignedTo: assignedTo,
    priority: priority,
    status: targetColumnStatus,
    subtasks: subtasks,
    dueDate: dueDate
  };
}

function getDescriptionValue() {
  let descriptionField = document.getElementById('description');
  return descriptionField ? descriptionField.value.trim() : '';
}

function getSelectedPriority() {
  let priorityRadios = document.getElementsByName('priority');
  for (let i = 0; i < priorityRadios.length; i++) {
    if (priorityRadios[i].checked) {
      return mapPriorityValue(priorityRadios[i].value);
    }
  }
  return 'medium';
}

function mapPriorityValue(value) {
  let lowerValue = value.toLowerCase();
  if (lowerValue === 'high') return 'urgent';
  if (lowerValue === 'medium') return 'medium';
  if (lowerValue === 'low') return 'low';
  return 'medium';
}

function getSelectedCategory() {
  let categorySelect = document.getElementById('task-category') || document.getElementById('category');
  return categorySelect ? categorySelect.value : 'User Story';
}

function getAssignedUserInitials() {
  let assignedTo = [];
  for (let i = 0; i < selectedUsers.length; i++) {
    let initials = getInitials(selectedUsers[i]);
    assignedTo.push(initials);
  }
  return assignedTo;
}

function getFilteredSubtasks() {
  return currentSubtasks.filter(function(subtask) {
    return subtask !== null;
  });
}

function handleTaskSaveSuccess() {
  renderAllTasks();
  alert('Task created successfully!');
  clearForm();
  targetColumnStatus = 'todo';
  
  if (typeof closeAllMenus === 'function') {
    closeAllMenus();
  }
}

function handleTitleBlur() {
  let titleInput = document.getElementById('task-title');
  let titleGroup = document.getElementById('title-form-group');
  let titleError = document.getElementById('title-error-message');

  if (titleInput.value.trim() === '') {
    titleGroup.classList.add('error');
    titleError.classList.remove('d-none');
  } else {
    titleGroup.classList.remove('error');
    titleError.classList.add('d-none');
  }
}

function handleDateBlur() {
  let dateInput = document.getElementById('task-date');
  let dateGroup = document.getElementById('date-form-group');
  let dateError = document.getElementById('date-error-message');

  if (dateInput.value === '') {
    dateGroup.classList.add('error');
    dateError.classList.remove('d-none');
  } else {
    dateGroup.classList.remove('error');
    dateError.classList.add('d-none');
  }
}