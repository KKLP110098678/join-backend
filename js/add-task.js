// Add Task Form Functionality

function clearForm() {
  let form = document.getElementById('task-form');
  form.reset();

  let titleError = document.getElementById('title-error-message');
  let dateError = document.getElementById('date-error-message');

  titleError.classList.add('d-none');
  dateError.classList.add('d-none');

  let titleGroup = document.getElementById('title-form-group');
  let dateGroup = document.getElementById('date-form-group');

  titleGroup.classList.remove('error');
  dateGroup.classList.remove('error');
}

function validateForm() {
  let isValid = true;
  let title = document.getElementById('task-title');
  let titleGroup = document.getElementById('title-form-group');
  let titleError = document.getElementById('title-error-message');

  if (title.value.trim() === '') {
    titleGroup.classList.add('error');
    titleError.classList.remove('d-none');
    isValid = false;
  } else {
    titleGroup.classList.remove('error');
    titleError.classList.add('d-none');
  }

  let date = document.getElementById('task-date');
  let dateGroup = document.getElementById('date-form-group');
  let dateError = document.getElementById('date-error-message');

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

function saveTask(event) {
  console.log(event)
  event.preventDefault();

  if (validateForm()) {
    // Get form data
    let formData = new FormData(document.getElementById('task-form'));
    let taskData = {};
    let entries = formData.entries();
    let entry = entries.next();
    while (!entry.done) {
      taskData[entry.value[0]] = entry.value[1];
      entry = entries.next();
    }

    console.log('Task created:', taskData);

    tasks.push(taskData);
    renderAllTasks();
    alert('Task created successfully!');

    // Clear form after successful submission
    clearForm();
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