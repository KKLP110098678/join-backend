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
  return getTaskCardTemplate(task, assignedUsersHTML, categoryId, priorityIcon, priorityLabel, subtaskProgress, totalSubtasks);
}

function getTaskCardTemplate(task, assignedUsersHTML, categoryId, priorityIcon, priorityLabel, subtaskProgress, totalSubtasks) {
  return `
    <div class="task-card" draggable="true" data-task-id="${task.id}" 
         ondragstart="handleDragStart(event, this)" 
         ondragend="handleDragEnd(this)">
      <div id="${categoryId}" class="ticket-label">${task.category}</div>
      <div class="task-title">${task.title}</div>
      <div class="task-description">${task.description}</div>
      ${totalSubtasks > 0 ? `<div class="task-subtasks">${subtaskProgress}</div>` : ''}
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