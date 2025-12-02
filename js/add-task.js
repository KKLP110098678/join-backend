// Add Task Form Functionality

// Global variable to store the target column status
let targetColumnStatus = "todo";

// Global array to store subtasks
let currentSubtasks = [];

// Global array to store selected users
let selectedUsers = [];

/**
 * Populates the assignedTo dropdown with checkboxes from contacts array
 */
function populateAssignedToDropdown(mode) {
  let dropdownList = getAssignedDropdownList(mode);

  clearDropdownList(dropdownList);
  addContactsToDropdown(dropdownList);
}

function clearDropdownList(dropdownList) {
  dropdownList.innerHTML = "";
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
      <label class="d-flex dropdown-item-label custom-checkbox" for="user-${index}">
        <div class="user-avatar-sm" style="background-color: ${avatarColor};">${initials}</div>
        ${contact.name}
        <input type="checkbox" class="checkbox-masked" id="user-${index}" value="${contact.name}">
      </label>
    </div>
  `;
}

/**
 * Toggles the assigned to dropdown
 */
function toggleAssignedDropdown(mode) {
  populateAssignedToDropdown(mode);
  let dropdownList = getAssignedDropdownList(mode);
  let arrow = document.querySelector(".dropdown-arrow");

  dropdownList.classList.toggle("d-none");
  arrow.parentElement.parentElement.parentElement.classList.toggle("open");
}

function getAssignedDropdownList(mode) {
  if (mode == "task-edit") {
    return document.getElementById("edit-assigned-to-list");
  } else {
    return document.getElementById("assigned-to-list");
  }
}

/**
 * Toggles user selection in the dropdown
 */
function toggleUserSelection(userName, event) {
  if (event) event.stopPropagation();
  let checkbox = findUserCheckbox(userName);
  updateSelectedUsersArray(userName, checkbox.checked);
  updateDropdownPlaceholder();
}

function findUserCheckbox(userName) {
  return Array.from(
    document.querySelectorAll('.dropdown-item input[type="checkbox"]')
  ).find((cb) => cb.value === userName);
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
  let input = document.querySelector(".dropdown-input");

  if (selectedUsers.length === 0) {
    input.value = "";
    input.placeholder = "Select contacts to assign";
  } else if (selectedUsers.length === 1) {
    input.value = selectedUsers[0];
  } else {
    input.value = `${selectedUsers.length} users selected`;
  }
}

/**
 * Close dropdown when clicking outside
 */
document.addEventListener("click", function (event) {
  let dropdown = document.getElementById("assigned-to");
  let dropdownList = document.getElementById("assigned-to-list");

  if (dropdown && !dropdown.contains(event.target) && dropdownList) {
    dropdownList.classList.add("d-none");
    dropdown.classList.remove("open");
  }

  let categoryDropdown = document.getElementById("category");
  let categoryList = document.getElementById("category-list");

  if (
    categoryDropdown &&
    !categoryDropdown.contains(event.target) &&
    categoryList
  ) {
    categoryList.classList.add("d-none");
    categoryDropdown.classList.remove("open");
  }
});

/**
 * Toggles the category dropdown
 */
function toggleCategoryDropdown() {
  let dropdownList = document.getElementById("category-list");
  let categoryDropdown = document.getElementById("category");

  dropdownList.classList.toggle("d-none");
  categoryDropdown.classList.toggle("open");
}

/**
 * Selects a category and updates the input
 */
function selectCategory(categoryName) {
  let input = document.getElementById("category-input");
  let hiddenInput = document.getElementById("category-hidden");
  let dropdownList = document.getElementById("category-list");
  let categoryDropdown = document.getElementById("category");

  input.value = categoryName;
  hiddenInput.value = categoryName;
  dropdownList.classList.add("d-none");
  categoryDropdown.classList.remove("open");
}

/**
 * Generates a unique task ID for guest users
 * For logged-in users, Firebase will generate the ID automatically
 * @returns {string} Unique task ID in format "task-X" for guests, or temporary ID for logged-in users
 */
function generateTaskId() {
  const isGuest = sessionStorage.getItem("isGuest") === "true";

  if (isGuest) {
    // Guest user: Generate sequential ID
    let maxId = 0;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id.startsWith("task-")) {
        let taskIdNum = parseInt(tasks[i].id.split("-")[1]);
        if (taskIdNum > maxId) {
          maxId = taskIdNum;
        }
      }
    }
    return "task-" + (maxId + 1);
  } else {
    // Logged-in user: Return temporary ID (Firebase will replace it)
    return "temp-" + Date.now();
  }
}

/**
 * Sets the target column status for new tasks
 * @param {string} status - The status/column where task should be added (todo, in-progress, await-feedback, done)
 */
function setTargetColumn(status) {
  targetColumnStatus = status || "todo";
}

function clearForm() {
  let form = document.getElementById("task-form");
  form.reset();

  clearFormErrors();
  clearSubtasks();
  clearSelectedUsers();
  clearCategory();
}

function clearFormErrors() {
  let titleError = document.getElementById("title-error-message");
  let dateError = document.getElementById("date-error-message");
  let titleGroup = document.getElementById("title-form-group");
  let dateGroup = document.getElementById("date-form-group");

  titleError.classList.add("d-none");
  dateError.classList.add("d-none");
  titleGroup.classList.remove("error");
  dateGroup.classList.remove("error");
}

function clearSubtasks() {
  let subtaskList = document.getElementById("subtask-list");
  subtaskList.innerHTML = "";
  currentSubtasks = [];
}

function clearSelectedUsers() {
  selectedUsers = [];
  let checkboxes = document.querySelectorAll(
    '.dropdown-item input[type="checkbox"]'
  );
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
  updateDropdownPlaceholder();
}

function clearCategory() {
  let categoryInput = document.getElementById("category-input");
  let categoryHidden = document.getElementById("category-hidden");

  categoryInput.value = "";
  categoryHidden.value = "";
}

function validateForm() {
  let isValid = validateTitleField();
  isValid = validateDateField() && isValid;
  return isValid;
}

function validateTitleField() {
  let title = document.getElementById("task-title");
  let titleGroup = document.getElementById("title-form-group");
  let titleError = document.getElementById("title-error-message");

  if (title.value.trim() === "") {
    titleGroup.classList.add("error");
    titleError.classList.remove("d-none");
    return false;
  } else {
    titleGroup.classList.remove("error");
    titleError.classList.add("d-none");
    return true;
  }
}

function validateDateField() {
  let date = document.getElementById("task-date");
  let dateGroup = document.getElementById("date-form-group");
  let dateError = document.getElementById("date-error-message");

  if (date.value === "") {
    dateGroup.classList.add("error");
    dateError.classList.remove("d-none");
    return false;
  } else {
    dateGroup.classList.remove("error");
    dateError.classList.add("d-none");
    return true;
  }
}

async function saveTask(event) {
  event.preventDefault();

  if (validateForm()) {
    let newTask = createTaskFromForm();
    await addNewTask(newTask);
    handleTaskSaveSuccess();
  }
}

function createTaskFromForm() {
  let taskId = generateTaskId();
  let title = document.getElementById("task-title").value.trim();
  let description = getDescriptionValue();
  let dueDate = document.getElementById("task-date").value;
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
    dueDate: dueDate,
  };
}

function getDescriptionValue() {
  let descriptionField = document.getElementById("description");
  return descriptionField.value.trim();
}

function getSelectedPriority() {
  let priorityRadios = document.getElementsByName("priority");
  for (let i = 0; i < priorityRadios.length; i++) {
    if (priorityRadios[i].checked) {
      return mapPriorityValue(priorityRadios[i].value);
    }
  }
  return "medium";
}

function mapPriorityValue(value) {
  let lowerValue = value.toLowerCase();
  if (lowerValue === "high") return "urgent";
  if (lowerValue === "medium") return "medium";
  if (lowerValue === "low") return "low";
  return "medium";
}

function getSelectedCategory() {
  let categoryHidden = document.getElementById("category-hidden");
  return categoryHidden && categoryHidden.value
    ? categoryHidden.value
    : "User Story";
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
  return currentSubtasks.filter(function (subtask) {
    return subtask !== null;
  });
}

function handleTaskSaveSuccess() {
  let isOnAddTaskPage = window.location.pathname.includes("add-task.html");

  if (isOnAddTaskPage) {
    showSuccessOverlay();
    setTimeout(function () {
      window.location.href = "board.html";
    }, 1500);
  } else {
    renderAllTasks();
    showSuccessOverlay();
    setTimeout(function () {
      clearForm();
      targetColumnStatus = "todo";

      if (typeof closeAllMenus === "function") {
        closeAllMenus();
      }
    }, 1500);
  }
}

function showSuccessOverlay() {
  let overlay = document.getElementById("success-overlay");
  overlay.classList.remove("d-none");
}

function handleTitleBlur() {
  let titleInput = document.getElementById("task-title");
  let titleGroup = document.getElementById("title-form-group");
  let titleError = document.getElementById("title-error-message");

  if (titleInput.value.trim() === "") {
    titleGroup.classList.add("error");
    titleError.classList.remove("d-none");
  } else {
    titleGroup.classList.remove("error");
    titleError.classList.add("d-none");
  }
}

function handleDateBlur() {
  let dateInput = document.getElementById("task-date");
  let dateGroup = document.getElementById("date-form-group");
  let dateError = document.getElementById("date-error-message");

  if (dateInput.value === "") {
    dateGroup.classList.add("error");
    dateError.classList.remove("d-none");
  } else {
    dateGroup.classList.remove("error");
    dateError.classList.add("d-none");
  }
}
