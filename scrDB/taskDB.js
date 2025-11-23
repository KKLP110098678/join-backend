////Basis-Funktionen (CRUD Operations)////

async function addNewTask(taskData) {
  try {
    const tasksRef = firebase.database().ref("boards");
    const newTasksRef = tasksRef.push();
    await newTasksRef.set(taskData);
    console.log("Task saved to Firebase");
  } catch (error) {
    console.error("Error saving task:", error);
  }
}

// READ - Alle Tasks laden
async function loadAllTasks() {}

// UPDATE - Task Status ändern (für Drag & Drop)
async function updateTaskStatus(taskId, newStatus) {}

// UPDATE - Task komplett updaten (für Edit-Modal)
async function updateTask(taskId, updatedData) {}

// DELETE - Task löschen
async function deleteTask(taskId) {}

////Filter & Display Funktionen////

// Tasks nach Status filtern
function filterTasksByStatus(allTasks, status) {}

// Tasks im Board anzeigen
function displayTasksOnBoard(tasks) {}

// Einzelne Task-Card Template erstellen
function createTaskCardTemplate(task, taskId) {}

////Weitere hilfreiche Funktionen////

// Unique Task ID generieren (falls du eigene IDs willst)
function generateTaskId() {}

// Prüfen ob Task einem User gehört
function isTaskOwnedByUser(task, userId) {}

// Tasks nach Priority sortieren
function sortTasksByPriority(tasks) {}

// Tasks nach Datum sortieren
function sortTasksByDueDate(tasks) {}
