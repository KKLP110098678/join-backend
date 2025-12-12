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
      const firebaseTasks = await loadTasksFromFirebase();
      return firebaseTasks.length > 0 ? firebaseTasks : getDefaultTasks();
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
    let userColor = getAvatarColor(assignedToArray[i]);
    html += `<div class="user-avatar-sm" style="background-color: ${userColor};">${initials}</div>`;
  }
  return html;
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
        
        ${
          totalSubtasks > 0
            ? `
              <div class="progress-container d-flex">
                <div class="progress-bar" style="width: ${progressInPercent}%;"></div>
              </div>
              <div class="task-subtasks">${subtaskProgress}</div>
              `
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
  populateAssignedToDropdown();

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
    column.insertAdjacentHTML("beforeend", generateTaskCardHTML(task));
  }
}

function clearColumnTaskCards(column) {
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
        tasks.splice(taskIndex, 1);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
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
  let subtasksHTML = generateSubtasksHTML(task.id ,task.subtasks || []);
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
        <h2 class="details-title">${task.title}</h2>
        <p class="details-description">${task.description || ''}</p>
        <div class="details-due-date">
          <h3>Due Date</h3>
          <p>${task.dueDate || 'No due date'}</p>
        </div>
        <div class="details-priority">
          <h3>Priority</h3>
          <div class="task-priority">
            <img src="${priorityIcon}" alt="${priorityLabel}" class="priority-icon">
            <span>${priorityLabel}</span>
          </div>
        </div>
        <div class="details-assigned">
          <h3>Assigned To</h3>
          <div class="task-users">
            ${assignedUsersHTML || '<p>No assignees</p>'}
          </div>
        </div>
        <div class="details-subtasks">
          <h3>Subtasks</h3>
          <ul>
            ${subtasksHTML || '<li>No subtasks</li>'}
          </ul>
        </div>
        <button class="text-btn-with-icon" onclick="deleteTask('${task.id || ''}'); toggleOverlay('#details-overlay')">Delete Task</button>
        <button class="text-btn-with-icon" onclick="editTask('${task.id || ''}')">Edit Task</button>
      </div>
    </div>
  `;
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
    for (let i = 0; i < contacts.length; i++) {
      let contactInitials = getInitials(contacts[i].name);
      if (contactInitials === initials) {
        return contacts[i].name;
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

