// Add Task Form Functionality

function clearForm() {
  let form = document.getElementById('task-form');
  form.reset();

  // Clear any error messages
  let errorMessages = document.getElementsByClassName('error-message');
  for (let i = 0; i < errorMessages.length; i++) {
    errorMessages[i].classList.add('d-none');
  }

  // Remove error classes from form groups
  let formGroups = document.getElementsByClassName('form-group');
  for (let i = 0; i < formGroups.length; i++) {
    formGroups[i].classList.remove('error');
  }
}

function validateForm() {
  let isValid = true;

  // Validate title
  let title = document.getElementById('task-title');
  let titleGroup = title.closest('.form-group');
  let titleError = titleGroup.querySelector('.error-message');

  if (title.value.trim() === '') {
    titleGroup.classList.add('error');
    titleError.classList.remove('d-none');
    isValid = false;
  } else {
    titleGroup.classList.remove('error');
    titleError.classList.add('d-none');
  }

  // Validate due date
  let date = document.getElementById('task-date');
  let dateGroup = date.closest('.form-group');
  let dateError = dateGroup.querySelector('.error-message');

  if (date.value === '') {
    dateGroup.classList.add('error');
    dateError.classList.remove('d-none');
    isValid = false;
  } else {
    dateGroup.classList.remove('error');
    dateError.classList.add('d-none');
  }

  return isValid;
}

function handleFormSubmit(event) {
  event.preventDefault();

  if (validateForm()) {
    // Get form data
    let formData = new FormData(document.getElementById('task-form'));
    let taskData = Object.fromEntries(formData);

    console.log('Task created:', taskData);

    // Here you would typically send the data to your backend
    alert('Task created successfully!');

    // Clear form after successful submission
    clearForm();
  }
}

// Initialize form when page loads
document.addEventListener('DOMContentLoaded', function() {
  let form = document.getElementById('task-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  // Add real-time validation for title field
  let titleInput = document.getElementById('task-title');
  if (titleInput) {
    titleInput.addEventListener('blur', function() {
      let titleGroup = titleInput.closest('.form-group');
      let titleError = titleGroup.querySelector('.error-message');

      if (titleInput.value.trim() === '') {
        titleGroup.classList.add('error');
        titleError.classList.remove('d-none');
      } else {
        titleGroup.classList.remove('error');
        titleError.classList.add('d-none');
      }
    });
  }

  // Add real-time validation for date field
  let dateInput = document.getElementById('task-date');
  if (dateInput) {
    dateInput.addEventListener('blur', function() {
      let dateGroup = dateInput.closest('.form-group');
      let dateError = dateGroup.querySelector('.error-message');

      if (dateInput.value === '') {
        dateGroup.classList.add('error');
        dateError.classList.remove('d-none');
      } else {
        dateGroup.classList.remove('error');
        dateError.classList.add('d-none');
      }
    });
  }
});