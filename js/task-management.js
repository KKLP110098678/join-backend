/**
 * Initializes tasks array
 * Loads from Firebase for logged-in users or SessionStorage for guests
 * @async
 * @returns {Promise<Array>} Array of tasks
 */
async function initializeTasks() {
  const isGuest = sessionStorage.getItem("isGuest") === "true";
  
  if (isGuest) {
    // Guest user: Load from SessionStorage or use default tasks
    const storedTasks = loadTasksFromSession();
    return storedTasks || getDefaultTasks();
  } else {
    // Logged-in user: Load from Firebase
    if (typeof loadTasksFromFirebase === "function") {
      const firebaseTasks = await loadTasksFromFirebase();
      return firebaseTasks.length > 0 ? firebaseTasks : getDefaultTasks();
    }
    return getDefaultTasks();
  }
}

/**
 * Returns default tasks for initial setup
 * @returns {Array} Array of default tasks
 */
function getDefaultTasks() {
  return [
    {
      id: "task-1",
      title: "Kochwelt Page & Recipe Recommender",
      description: "Build start page with recipe recommendation.",
      category: "User Story",
      assignedTo: ["JD", "MS"],
      priority: "urgent",
      status: "todo",
      subtasks: [
        { text: "Implement Recipe Recommender", completed: false },
        { text: "Start Page Layout", completed: true }
      ],
      dueDate: "2024-05-10"
    },
    {
      id: "task-2",
      title: "HTML Base Template Creation",
      description: "Create reusable HTML base templates for all pages.",
      category: "User Story",
      assignedTo: ["AB"],
      priority: "medium",
      status: "todo",
      subtasks: [
        { text: "Header Template", completed: false },
        { text: "Footer Template", completed: false },
        { text: "Navigation Template", completed: true }
      ],
      dueDate: "2024-05-12"
    },
    {
      id: "task-3",
      title: "CSS Architecture Planning",
      description: "Plan and structure CSS architecture for the project.",
      category: "User Story",
      assignedTo: ["CG", "DK", "LM"],
      priority: "low",
      status: "in-progress",
      subtasks: [
        { text: "Define CSS Variables", completed: true },
        { text: "Create Component Structure", completed: false }
      ],
      dueDate: "2024-05-15"
    },
    {
      id: "task-4",
      title: "JavaScript Functions",
      description: "Implement core JavaScript functionality.",
      category: "Technical Task",
      assignedTo: ["NG"],
      priority: "urgent",
      status: "in-progress",
      subtasks: [
        { text: "Event Handlers", completed: false },
        { text: "Data Management", completed: false }
      ],
      dueDate: "2024-05-08"
    },
    {
      id: "task-5",
      title: "Daily Kanban Board",
      description: "Create a functional Kanban board for task management.",
      category: "User Story",
      assignedTo: ["PQ", "RS"],
      priority: "medium",
      status: "await-feedback",
      subtasks: [
        { text: "Drag & Drop Functionality", completed: true },
        { text: "Task Card Design", completed: true },
        { text: "Status Management", completed: false }
      ],
      dueDate: "2024-05-20"
    },
    {
      id: "task-6",
      title: "Contact Management System",
      description: "Develop a comprehensive contact management system.",
      category: "User Story",
      assignedTo: ["TV"],
      priority: "low",
      status: "done",
      subtasks: [
        { text: "Contact List View", completed: true },
        { text: "Contact Form", completed: true }
      ],
      dueDate: "2024-05-05"
    },
    {
      id: "task-7",
      title: "Database Integration",
      description: "Set up database connection and data persistence.",
      category: "Technical Task",
      assignedTo: ["WX", "YZ"],
      priority: "medium",
      status: "done",
      subtasks: [
        { text: "Database Schema", completed: true },
        { text: "API Endpoints", completed: true },
        { text: "Data Validation", completed: true }
      ],
      dueDate: "2024-05-03"
    }
  ];
}

// Initialize tasks - will be set by initializeTasks()
let tasks = [];

// Priority icons mapping
const priorityIcons = {
  urgent: "/assets/icon/taskManagement/urgent.svg",
  medium: "/assets/icon/taskManagement/medium.svg",
  low: "/assets/icon/taskManagement/low.svg",
};

// Priority labels mapping
const priorityLabels = {
  urgent: "High Priority",
  medium: "Medium Priority",
  low: "Low Priority",
};

// Kategorie-zu-CSS-ID Mapping
const categoryToId = {
  "User Story": "user-story",
  "Technical Task": "technical-task",
};

function generateTaskCardHTML(task) {
  if (!task) {
    return "";
  }
  
  let assignedUsersHTML = generateAssignedUsersHTML(task.assignedTo || []);
  let categoryId = categoryToId[task.category] || "user-story";
  let priorityIcon = priorityIcons[task.priority] || priorityIcons["medium"];
  let priorityLabel = priorityLabels[task.priority] || priorityLabels["medium"];
  let subtaskData = calculateSubtaskProgress(task.subtasks || []);

  return getTaskCardTemplate(
    task,
    assignedUsersHTML,
    categoryId,
    priorityIcon,
    priorityLabel,
    subtaskData
  );
}

function generateAssignedUsersHTML(assignedToArray) {
  if (!assignedToArray || !Array.isArray(assignedToArray)) {
    return "";
  }
  
  let html = "";
  for (let i = 0; i < assignedToArray.length; i++) {
    let initials = getInitials(assignedToArray[i]);
    html += '<div class="user-avatar-sm">' + initials + "</div>";
  }
  return html;
}

function calculateSubtaskProgress(subtasks) {
  if (!subtasks || !Array.isArray(subtasks)) {
    return { subtaskProgress: "", totalSubtasks: 0, progressInPercent: 0 };
  }
  
  let completedSubtasks = 0;
  for (let i = 0; i < subtasks.length; i++) {
    if (subtasks[i] && subtasks[i].completed) {
      completedSubtasks++;
    }
  }

  let totalSubtasks = subtasks.length;
  let subtaskProgress =
    totalSubtasks > 0
      ? completedSubtasks + "/" + totalSubtasks + " Subtasks"
      : "";
  let progressInPercent =
    totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return { subtaskProgress, totalSubtasks, progressInPercent };
}

function getTaskCardTemplate(
  task,
  assignedUsersHTML,
  categoryId,
  priorityIcon,
  priorityLabel,
  subtaskData
) {
  let { subtaskProgress, totalSubtasks, progressInPercent } = subtaskData;

  return `
    <div class="task-card" draggable="true" data-task-id="${task.id || ''}" 
         ondragstart="handleDragStart(event, this)" 
         ondragend="handleDragEnd(this)"
         onclick="showTaskDetails('${task.id || ''}')">
      <div id="${categoryId}" class="ticket-label">${task.category || 'User Story'}</div>
      <div class="task-title">${task.title || 'Untitled Task'}</div>
      <div class="task-description">${task.description || ''}</div>
      <div class="subtask-container">
        <div class="progress-container d-flex">
          <div class="progress-bar" style="width: ${progressInPercent}%;"></div>
        </div>
        ${
          totalSubtasks > 0
            ? `<div class="task-subtasks">${subtaskProgress}</div>`
            : ""
        }
      </div>
      <div class="task-footer d-flex">
        <div class="task-users">
          ${assignedUsersHTML}
        </div>
        <div class="task-priority">
          <img src="${priorityIcon}" alt="${priorityLabel}" class="priority-icon">
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders all tasks on the Kanban board
 * Initializes tasks from Firebase or SessionStorage on first call
 * @async
 */
async function renderAllTasks() {
  // Initialize tasks if array is empty
  if (tasks.length === 0) {
    tasks = await initializeTasks();
  }
  
  if (typeof populateAssignedToDropdown === "function") {
    populateAssignedToDropdown();
  }

  let columns = getKanbanColumns();
  clearAllColumns(columns);
  renderTasksInColumns();
}

function getKanbanColumns() {
  return {
    todo: document.getElementById("todo"),
    inProgress: document.getElementById("in-progress"),
    awaitFeedback: document.getElementById("await-feedback"),
    done: document.getElementById("done"),
  };
}

function clearAllColumns(columns) {
  clearColumnTaskCards(columns.todo);
  clearColumnTaskCards(columns.inProgress);
  clearColumnTaskCards(columns.awaitFeedback);
  clearColumnTaskCards(columns.done);
}

function renderTasksInColumns() {
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let column = document.getElementById(task.status);
    if (column) {
      column.insertAdjacentHTML("beforeend", generateTaskCardHTML(task));
    }
  }
}

function clearColumnTaskCards(column) {
  if (!column) {
    return;
  }
  let children = column.children;
  for (let i = children.length - 1; i >= 0; i--) {
    let child = children[i];
    if (child.classList.contains("task-card")) {
      child.remove();
    }
  }
}

function findTaskById(taskId) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      return tasks[i];
    }
  }
  return null;
}

/**
 * Updates task status in Firebase (for logged-in users) or SessionStorage (for guests)
 * Updates at boards/{userId}/tasks/{taskId}
 * @async
 * @param {string} taskId - The ID of the task to update
 * @param {string} newStatus - The new status value
 */
async function updateTaskStatus(taskId, newStatus) {
  const isGuest = sessionStorage.getItem("isGuest") === "true";
  const task = findTaskById(taskId);
  
  if (task) {
    task.status = newStatus;
    
    if (isGuest) {
      // Guest user: Update SessionStorage only
      saveTasksToSession();
    } else {
      // Logged-in user: Update Firebase
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        console.error("No userId found in session");
        return;
      }
      
      try {
        await firebase.database().ref(`boards/${userId}/tasks/${taskId}`).update({ status: newStatus });
        console.log("Task status updated in Firebase:", taskId);
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    }
  }
}

/**
 * Deletes a task from Firebase (for logged-in users) or SessionStorage (for guests)
 * Deletes from boards/{userId}/tasks/{taskId}
 * @async
 * @param {string} taskId - The ID of the task to delete
 */
async function deleteTask(taskId) {
  const isGuest = sessionStorage.getItem("isGuest") === "true";
  
  let taskIndex = -1;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      taskIndex = i;
      break;
    }
  }
  
  if (taskIndex > -1) {
    if (isGuest) {
      // Guest user: Delete from SessionStorage only
      tasks.splice(taskIndex, 1);
      saveTasksToSession();
    } else {
      // Logged-in user: Delete from Firebase
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        console.error("No userId found in session");
        return;
      }
      
      try {
        await firebase.database().ref(`boards/${userId}/tasks/${taskId}`).remove();
        console.log("Task deleted from Firebase:", taskId);
        tasks.splice(taskIndex, 1);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
    renderAllTasks();
  }
}

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

function showTaskDetails(taskId) {
  const task = findTaskById(taskId);
  const detailsOverlay = document.getElementById("details-overlay");
  detailsOverlay.innerHTML = getTaskDetailsTemplate(task);
  toggleOverlay("#details-overlay");
}

function getTaskDetailsTemplate(task) {
  if (!task) {
    return "<p>Task not found</p>";
  }
  
  let categoryId = categoryToId[task.category] || "user-story";
  let priorityIcon = priorityIcons[task.priority] || priorityIcons["medium"];
  let priorityLabel = priorityLabels[task.priority] || priorityLabels["medium"];
  let subtasksHTML = generateSubtasksHTML(task.subtasks || []);
  let assignedUsersHTML = generateAssignedUsersDetailsHTML(task.assignedTo || []);

  return createDetailsTemplate(
    task,
    categoryId,
    subtasksHTML,
    assignedUsersHTML,
    priorityIcon,
    priorityLabel
  );
}

function generateSubtasksHTML(subtasks) {
  if (!subtasks || !Array.isArray(subtasks)) {
    return "";
  }
  
  let html = "";
  for (let i = 0; i < subtasks.length; i++) {
    let subtask = subtasks[i];
    if (subtask && subtask.text) {
      let completedClass = subtask.completed ? "completed" : "";
      html += '<li class="' + completedClass + '">' + subtask.text + "</li>";
    }
  }
  return html;
}

function generateAssignedUsersDetailsHTML(assignedToArray) {
  if (!assignedToArray || !Array.isArray(assignedToArray)) {
    return "";
  }
  
  let html = "";
  for (let i = 0; i < assignedToArray.length; i++) {
    html += createUserItemHTML(assignedToArray[i]);
  }
  return html;
}

function createUserItemHTML(initialsOrName) {
  let initials = getInitials(initialsOrName);
  let fullName = getFullNameFromInitials(initialsOrName);
  let avatarColor = getAvatarColor(fullName);

  return `
    <div class="user-item">
      <div class="user-avatar-sm" style="background-color: ${avatarColor};">${initials}</div>
      <span class="user-name">${fullName}</span>
    </div>
  `;
}

function createDetailsTemplate(
  task,
  categoryId,
  subtasksHTML,
  assignedUsersHTML,
  priorityIcon,
  priorityLabel
) {
  return `
    <div class="details-card">
      <div class="details-header">
        <div id="${categoryId}" class="ticket-label">${task.category || 'User Story'}</div>
        <svg class="btn-close-white" onclick="toggleOverlay('#details-overlay')" width="32" height="32" viewBox="0 0 32 32" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.0001 17.8642L9.46673 24.389C9.22229 24.6331 8.91118 24.7552 8.5334 24.7552C8.15562 24.7552 7.84451 24.6331 7.60007 24.389C7.35562 24.1449 7.2334 23.8342 7.2334 23.4569C7.2334 23.0796 7.35562 22.7689 7.60007 22.5248L14.1334 16L7.60007 9.47527C7.35562 9.23115 7.2334 8.92045 7.2334 8.54316C7.2334 8.16588 7.35562 7.85518 7.60007 7.61106C7.84451 7.36693 8.15562 7.24487 8.5334 7.24487C8.91118 7.24487 9.22229 7.36693 9.46673 7.61106L16.0001 14.1358L22.5334 7.61106C22.7778 7.36693 23.089 7.24487 23.4667 7.24487C23.8445 7.24487 24.1556 7.36693 24.4001 7.61106C24.6445 7.85518 24.7667 8.16588 24.7667 8.54316C24.7667 8.92045 24.6445 9.23115 24.4001 9.47527L17.8667 16L24.4001 22.5248C24.6445 22.7689 24.7667 23.0796 24.7667 23.4569C24.7667 23.8342 24.6445 24.1449 24.4001 24.389C24.1556 24.6331 23.8445 24.7552 23.4667 24.7552C23.089 24.7552 22.7778 24.6331 22.5334 24.389L16.0001 17.8642Z"
          fill="#4589FF" />
      </svg>
      </div>
      <div class="details-body">
        <h2 class="details-title">${task.title || 'Untitled Task'}</h2>
        <p class="details-description">${task.description || ''}</p>
        <div class="details-subtasks">
          <h3>Subtasks</h3>
          <ul>
            ${subtasksHTML || '<li>No subtasks</li>'}
          </ul>
        </div>
        <div class="details-assigned">
          <h3>Assigned To</h3>
          <div class="task-users">
            ${assignedUsersHTML || '<p>No assignees</p>'}
          </div>
        </div>
        <div class="details-priority">
          <h3>Priority</h3>
          <div class="task-priority">
            <img src="${priorityIcon}" alt="${priorityLabel}" class="priority-icon">
            <span>${priorityLabel}</span>
          </div>
        </div>
        <div class="details-due-date">
          <h3>Due Date</h3>
          <p>${task.dueDate || 'No due date'}</p>
        </div>
        <button class="text-btn-with-icon" onclick="deleteTask('${task.id || ''}'); toggleOverlay('#details-overlay')">Delete Task</button>
        <button class="text-btn-with-icon" onclick="editTask('${task.id || ''}')">Edit Task</button>
      </div>
    </div>
  `;
}

function editTask(taskId) {
  const task = findTaskById(taskId);
  const editOverlay = document.getElementById("details-overlay");
  editOverlay.innerHTML = getEditTaskTemplate(task);
}

function getEditTaskTemplate(task) {
  return `
    <div class="details-card">
      <form id="edit-task-form" class="task-form">
            <div class="form-group">
              <label for="task-title"></label>
              <input
                type="text"
                id="task-title"
                name="task_title"
                placeholder="${task.title}"
                required
              />
              <div class="error-message d-none">This field is required</div>
            </div>

            <div class="form-group">
              <label for="task-description"
                >Description <span class="optional">(optional)</span></label
              >
              <textarea
                name="task_description"
                id="task-description"
                placeholder="${task.description}"
                rows="4"
              ></textarea>
            </div>

            <div class="form-group">
              <label for="task-date">Due date</label>
              <input
                type="date"
                name="due_date"
                id="task-date"
                placeholder="${task.dueDate}"
              />
              <div class="error-message d-none">This field is required</div>
            </div>

            <div class="form-group">
              <label>Priority</label>
              <div class="radio-to-btn d-flex">
                <input
                  id="edit-urgent-priority"
                  type="radio"
                  name="priority"
                  value="Urgent"
                />
                <label for="edit-urgent-priority" class="urgent-priority">
                  Urgent
                  <svg
                    width="20"
                    height="15"
                    viewBox="0 0 20 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.9038 14.7547C18.6691 14.7551 18.4406 14.6803 18.2517 14.5412L9.99966 8.458L1.7476 14.5412C1.63175 14.6267 1.50017 14.6887 1.36037 14.7234C1.22057 14.7582 1.07528 14.7651 0.932817 14.7437C0.790349 14.7223 0.653485 14.6732 0.53004 14.599C0.406595 14.5247 0.298986 14.427 0.213357 14.3112C0.127727 14.1954 0.0657554 14.0639 0.0309788 13.9243C-0.00379784 13.7846 -0.010698 13.6394 0.0106721 13.497C0.0538312 13.2095 0.209522 12.9509 0.443493 12.7781L9.3476 6.20761C9.5363 6.06802 9.76488 5.99268 9.99966 5.99268C10.2344 5.99268 10.463 6.06802 10.6517 6.20761L19.5558 12.7781C19.7417 12.915 19.8796 13.1071 19.9498 13.327C20.0199 13.5469 20.0188 13.7833 19.9465 14.0025C19.8742 14.2216 19.7344 14.4124 19.5471 14.5475C19.3599 14.6826 19.1347 14.7551 18.9038 14.7547Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M18.9038 9.00568C18.6691 9.00609 18.4406 8.93124 18.2517 8.79214L9.99966 2.70898L1.74761 8.79214C1.51364 8.96495 1.22055 9.0378 0.932821 8.99468C0.645094 8.95155 0.386297 8.79597 0.213361 8.56218C0.0404254 8.32838 -0.0324824 8.03551 0.0106767 7.74799C0.0538357 7.46048 0.209526 7.20187 0.443498 7.02906L9.34761 0.458588C9.53631 0.318997 9.76488 0.243652 9.99966 0.243652C10.2344 0.243652 10.463 0.318997 10.6517 0.458588L19.5558 7.02906C19.7417 7.16598 19.8796 7.35809 19.9498 7.57797C20.0199 7.79785 20.0188 8.03426 19.9465 8.25344C19.8742 8.47262 19.7344 8.66338 19.5472 8.79847C19.3599 8.93356 19.1347 9.00608 18.9038 9.00568Z"
                      fill="#FF3D00"
                    />
                  </svg>
                </label>
                <input
                  id="edit-medium-priority"
                  type="radio"
                  name="priority"
                  value="Medium"
                />
                <label for="edit-medium-priority" class="medium-priority">
                  Medium
                  <svg
                    width="20"
                    height="9"
                    viewBox="0 0 20 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.9036 8.22528H1.0954C0.804754 8.22528 0.52601 8.10898 0.320491 7.90197C0.114971 7.69495 -0.000488281 7.41419 -0.000488281 7.12143C-0.000488281 6.82867 0.114971 6.5479 0.320491 6.34089C0.52601 6.13388 0.804754 6.01758 1.0954 6.01758H18.9036C19.1943 6.01758 19.473 6.13388 19.6785 6.34089C19.8841 6.5479 19.9995 6.82867 19.9995 7.12143C19.9995 7.41419 19.8841 7.69495 19.6785 7.90197C19.473 8.10898 19.1943 8.22528 18.9036 8.22528Z"
                      fill="#FFA800"
                    />
                    <path
                      d="M18.9036 2.98211H1.0954C0.804754 2.98211 0.52601 2.86581 0.320491 2.6588C0.114971 2.45179 -0.000488281 2.17102 -0.000488281 1.87826C-0.000488281 1.5855 0.114971 1.30474 0.320491 1.09772C0.52601 0.890712 0.804754 0.774414 1.0954 0.774414L18.9036 0.774414C19.1943 0.774414 19.473 0.890712 19.6785 1.09772C19.8841 1.30474 19.9995 1.5855 19.9995 1.87826C19.9995 2.17102 19.8841 2.45179 19.6785 2.6588C19.473 2.86581 19.1943 2.98211 18.9036 2.98211Z"
                      fill="#FFA800"
                    />
                  </svg>
                </label>
                <input
                  id="edit-low-priority"
                  type="radio"
                  name="priority"
                  value="Low"
                />
                <label for="edit-low-priority" class="low-priority">
                  Low
                  <svg
                    width="21"
                    height="15"
                    viewBox="0 0 21 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4995 9.00614C10.2649 9.00654 10.0364 8.9317 9.84753 8.79262L0.944424 2.22288C0.828586 2.13733 0.730747 2.02981 0.656491 1.90647C0.582236 1.78313 0.53302 1.64638 0.511652 1.50404C0.468498 1.21655 0.541397 0.923717 0.714313 0.689945C0.88723 0.456173 1.146 0.300615 1.43369 0.257493C1.72139 0.21437 2.01444 0.287216 2.24839 0.460004L10.4995 6.54248L18.7506 0.460004C18.8665 0.374448 18.998 0.312529 19.1378 0.277782C19.2776 0.243035 19.4229 0.236141 19.5653 0.257493C19.7078 0.278844 19.8446 0.328025 19.9681 0.402225C20.0915 0.476425 20.1991 0.574193 20.2847 0.689945C20.3703 0.805697 20.4323 0.937168 20.4671 1.07685C20.5018 1.21653 20.5087 1.36169 20.4874 1.50404C20.466 1.64638 20.4168 1.78313 20.3425 1.90647C20.2683 2.02981 20.1704 2.13733 20.0546 2.22288L11.1515 8.79262C10.9626 8.9317 10.7341 9.00654 10.4995 9.00614Z"
                      fill="#7AE229"
                    />
                    <path
                      d="M10.4995 14.7547C10.2649 14.7551 10.0364 14.6802 9.84753 14.5412L0.944424 7.97142C0.710479 7.79863 0.554806 7.54005 0.511652 7.25257C0.468498 6.96509 0.541397 6.67225 0.714313 6.43848C0.88723 6.20471 1.146 6.04915 1.43369 6.00603C1.72139 5.96291 2.01444 6.03575 2.24839 6.20854L10.4995 12.291L18.7506 6.20854C18.9846 6.03575 19.2776 5.96291 19.5653 6.00603C19.853 6.04915 20.1118 6.20471 20.2847 6.43848C20.4576 6.67225 20.5305 6.96509 20.4874 7.25257C20.4442 7.54005 20.2885 7.79863 20.0546 7.97142L11.1515 14.5412C10.9626 14.6802 10.7341 14.7551 10.4995 14.7547Z"
                      fill="#7AE229"
                    />
                  </svg>
                </label>
              </div>
            </div>

            <div class="form-group">
              <label for="user-select"
                >Assigned to <span class="optional">(optional)</span></label
              >
              <select id="user-select" name="assigned_to">
                <option value="">Select contacts to assign</option>
                <option value="user1">User One</option>
                <option value="user2">User Two</option>
                <option value="user3">User Three</option>
              </select>
            </div>

            <div class="form-group">
              <label for="task-category">Select task Category</label>
              <select id="task-category" name="category" required>
                <option value="">Select task category</option>
                <option value="technical">Technical Task</option>
                <option value="user-story">User Story</option>
              </select>
            </div>

            <div class="form-group">
              <label for="add-subtask"
                >Subtasks <span class="optional">(optional)</span></label
              >
              <div class="subtask-input-container">
                <input
                  type="text"
                  name="subtasks"
                  id="add-subtask"
                  placeholder="Add new subtask"
                />
                <button type="button" class="add-subtask-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 6V18M6 12H18"
                      stroke="#2A3647"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
    </div>
        `;
}

function addSubtask() {
  let subtaskList = document.getElementById("subtask-list");
  let subtaskInput = document.getElementById("add-subtask");
  let subtaskText = subtaskInput.value.trim();

  if (subtaskText) {
    let subtaskIndex = currentSubtasks.length;
    currentSubtasks.push({
      text: subtaskText,
      completed: false,
    });

    let listItemHTML = `
      <li class="subtask-item" data-subtask-index="${subtaskIndex}">
        <span>${subtaskText}</span>
        <div class="form-btn-group">
          <button type="button" class="form-btn-round" onclick="removeSubtask(${subtaskIndex}, this.parentElement)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#4589FF"/>
            </svg>
          </button>
          <div class="vertical-divider"></div>
          <button type="button" class="form-btn-round" onclick="editSubtask(${subtaskIndex})">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#4589FF"/>
            </svg>
          </button>
        </div>
      </li>
    `;

    subtaskList.insertAdjacentHTML("beforeend", listItemHTML);
    subtaskInput.value = "";
  }
}

/**
 * Removes a subtask from the array and DOM
 * @param {number} index - Index of the subtask in currentSubtasks array
 * @param {HTMLElement} element - The list item element to remove
 */
function removeSubtask(index, element) {
  // Remove from array by setting to null (to keep indices stable)
  currentSubtasks[index] = null;
  // Remove from DOM
  element.remove();
}

/**
 * Opens the add task overlay with a specific target column
 * @param {string} columnStatus - The status/column where task should be added
 */
function openAddTaskOverlay(columnStatus) {
  setTargetColumn(columnStatus);
  toggleOverlay(".add-task-menu");
}

/**
 * Gets full name from initials by searching in contacts array
 * @param {string} initialsOrName - Initials (e.g., "JD") or full name
 * @returns {string} Full name or the original value if not found
 */
function getFullNameFromInitials(initialsOrName) {
  if (!initialsOrName) return "";

  if (initialsOrName.includes(" ")) {
    return initialsOrName;
  }

  if (isInitials(initialsOrName)) {
    return findContactByInitials(initialsOrName);
  }

  return initialsOrName;
}

function isInitials(str) {
  return str.length <= 3 && str === str.toUpperCase();
}

function findContactByInitials(initials) {
  if (typeof contacts !== "undefined") {
    for (let i = 0; i < contacts.length; i++) {
      let contactInitials = getInitials(contacts[i].name);
      if (contactInitials === initials) {
        return contacts[i].name;
      }
    }
  }
  return initials;
}

/**
 * Saves tasks to sessionStorage
 */
function saveTasksToSession() {
  sessionStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * Loads tasks from sessionStorage
 * @returns {Array|null} Tasks array or null if not found
 */
function loadTasksFromSession() {
  let storedTasks = sessionStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : null;
}
