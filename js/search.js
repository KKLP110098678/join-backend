function filterTasks(searchTerm) {
  let filteredTasks = getFilteredTasks(searchTerm);
  renderFilteredTasks(filteredTasks);
}

function getFilteredTasks(searchTerm) {
  let filteredTasks = [];
  let lowerSearchTerm = searchTerm.toLowerCase();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    if (taskMatchesSearchTerm(task, lowerSearchTerm)) {
      filteredTasks.push(task);
    }
  }
  return filteredTasks;
}

function taskMatchesSearchTerm(task, searchTerm) {
  return (
    task.title.toLowerCase().includes(searchTerm) ||
    task.description.toLowerCase().includes(searchTerm) ||
    task.category.toLowerCase().includes(searchTerm)
  );
}

function renderFilteredTasks(filteredTasks) {
  let currentTasks = tasks;
  tasks = filteredTasks;
  renderAllTasks();
  tasks = currentTasks;
}

// Global event handler functions for inline events
function handleSearchClick() {
  const searchInput = document.getElementById("task-search");
  if (searchInput) {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === "") {
      renderAllTasks();
    } else {
      filterTasks(searchTerm);
    }
  }
}

function handleSearchKeypress(event) {
  if (event.key === "Enter") {
    const searchTerm = event.target.value.trim();
    if (searchTerm === "") {
      renderAllTasks();
    } else {
      filterTasks(searchTerm);
    }
  }
}

function handleSearchInput(event) {
  if (event.target.value.trim() === "") {
    renderAllTasks();
  }
}