let tasks = [
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

// Prioritäts-Icons Mapping
const priorityIcons = {
  urgent: "/assets/icon/taskManagement/urgent.svg",
  medium: "/assets/icon/taskManagement/medium.svg",
  low: "/assets/icon/taskManagement/low.svg"
};

// Prioritäts-Labels Mapping
const priorityLabels = {
  urgent: "High Priority",
  medium: "Medium Priority",
  low: "Low Priority"
};

// Kategorie-zu-CSS-ID Mapping
const categoryToId = {
  "User Story": "user-story",
  "Technical Task": "technical-task"
};

function generateTaskCardHTML(task) {
  const assignedUsersHTML = task.assignedTo.map(user =>
    `<div class="user-avatar-sm">${user}</div>`
  ).join('');

  const categoryId = categoryToId[task.category] || "user-story";
  const priorityIcon = priorityIcons[task.priority];
  const priorityLabel = priorityLabels[task.priority];

  const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
  const totalSubtasks = task.subtasks.length;
  const subtaskProgress = totalSubtasks > 0 ? `${completedSubtasks}/${totalSubtasks} Subtasks` : '';
  const progressInPercent = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;
  return getTaskCardTemplate(task, assignedUsersHTML, categoryId, priorityIcon, priorityLabel, subtaskProgress, totalSubtasks, progressInPercent);
}

function getTaskCardTemplate(task, assignedUsersHTML, categoryId, priorityIcon, priorityLabel, subtaskProgress, totalSubtasks, progressInPercent) {
  return `
    <div class="task-card" draggable="true" data-task-id="${task.id}" 
         ondragstart="handleDragStart(event, this)" 
         ondragend="handleDragEnd(this)"
         onclick="showTaskDetails('${task.id}')">
      <div id="${categoryId}" class="ticket-label">${task.category}</div>
      <div class="task-title">${task.title}</div>
      <div class="task-description">${task.description}</div>
      <div class="subtask-container">
        <div class="progress-container d-flex">
          <div class="progress-bar" style="width: ${progressInPercent}%;"></div>
        </div>
        ${totalSubtasks > 0 ? `<div class="task-subtasks">${subtaskProgress}</div>` : ''}
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

function renderAllTasks() {
  const columns = ['todo', 'in-progress', 'await-feedback', 'done'];

  columns.forEach(columnId => {
    const column = document.getElementById(columnId);
    if (column) {
      const taskCards = column.querySelectorAll('.task-card');
      taskCards.forEach(card => card.remove());
    }
  });

  tasks.forEach(task => {
    const columnId = task.status;
    const column = document.getElementById(columnId);

    if (column) {
      column.insertAdjacentHTML('beforeend', generateTaskCardHTML(task));
    }
  });
}

function findTaskById(taskId) {
  return tasks.find(task => task.id === taskId);
}

function updateTaskStatus(taskId, newStatus) {
  const task = findTaskById(taskId);
  task.status = newStatus;
}

function addTask(newTask) {
  if (!newTask.id) {
    newTask.id = `task-${Date.now()}`;
  }

  tasks.push(newTask);
  renderAllTasks();
}

function deleteTask(taskId) {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1);
    renderAllTasks();
  }
}

function filterTasks(searchTerm) {
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentTasks = tasks;
  tasks = filteredTasks;
  renderAllTasks();
  tasks = currentTasks;
}

// Globale Event Handler Funktionen für inline Events
function handleSearchClick() {
  const searchInput = document.getElementById('task-search');
  if (searchInput) {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
      renderAllTasks();
    } else {
      filterTasks(searchTerm);
    }
  }
}

function handleSearchKeypress(event) {
  if (event.key === 'Enter') {
    const searchTerm = event.target.value.trim();
    if (searchTerm === '') {
      renderAllTasks();
    } else {
      filterTasks(searchTerm);
    }
  }
}

function handleSearchInput(event) {
  if (event.target.value.trim() === '') {
    renderAllTasks();
  }
}

function showTaskDetails(taskId) {
  const task = findTaskById(taskId);
  const categoryId = categoryToId[task.category] || "user-story";
  const priorityIcon = priorityIcons[task.priority];
  const priorityLabel = priorityLabels[task.priority];
  const detailsOverlay = document.getElementById('details-overlay');
  detailsOverlay.innerHTML = `
    <div class="details-card">
      <div class="details-header">
        <div id="${categoryId}" class="ticket-label">${task.category}</div>
        <svg class="btn-close" onclick="toggleOverlay('#details-overlay')" width="32" height="32" viewBox="0 0 32 32" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.0001 17.8642L9.46673 24.389C9.22229 24.6331 8.91118 24.7552 8.5334 24.7552C8.15562 24.7552 7.84451 24.6331 7.60007 24.389C7.35562 24.1449 7.2334 23.8342 7.2334 23.4569C7.2334 23.0796 7.35562 22.7689 7.60007 22.5248L14.1334 16L7.60007 9.47527C7.35562 9.23115 7.2334 8.92045 7.2334 8.54316C7.2334 8.16588 7.35562 7.85518 7.60007 7.61106C7.84451 7.36693 8.15562 7.24487 8.5334 7.24487C8.91118 7.24487 9.22229 7.36693 9.46673 7.61106L16.0001 14.1358L22.5334 7.61106C22.7778 7.36693 23.089 7.24487 23.4667 7.24487C23.8445 7.24487 24.1556 7.36693 24.4001 7.61106C24.6445 7.85518 24.7667 8.16588 24.7667 8.54316C24.7667 8.92045 24.6445 9.23115 24.4001 9.47527L17.8667 16L24.4001 22.5248C24.6445 22.7689 24.7667 23.0796 24.7667 23.4569C24.7667 23.8342 24.6445 24.1449 24.4001 24.389C24.1556 24.6331 23.8445 24.7552 23.4667 24.7552C23.089 24.7552 22.7778 24.6331 22.5334 24.389L16.0001 17.8642Z"
          fill="white" />
      </svg>
      </div>
      <div class="details-body">
        <h2 class="details-title">${task.title}</h2>
        <p class="details-description">${task.description}</p>
        <div class="details-subtasks">
          <h3>Subtasks</h3>
          <ul>
            ${task.subtasks.map(subtask => `
              <li class="${subtask.completed ? 'completed' : ''}">${subtask.text}</li>
            `).join('')}
          </ul>
        </div>
        <div class="details-assigned">
          <h3>Assigned To</h3>
          <div class="task-users">
            ${task.assignedTo.map(user => `<div class="user-avatar-sm">${user}</div>`).join('')}
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
          <p>${task.dueDate}</p>
        </div>
        <button class="btn-delete" onclick="deleteTask('${task.id}'); toggleOverlay('#details-overlay')">Delete Task</button>
      </div>
    </div>
  `;
  toggleOverlay('#details-overlay');
}
    
