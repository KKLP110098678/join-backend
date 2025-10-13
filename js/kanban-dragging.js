let draggedElement = null;

function handleDragStart(event, element) {
    draggedElement = element;
    element.classList.add('dragging');
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', element.outerHTML);
}

function handleDragEnd(element) {
    element.classList.remove('dragging');
    draggedElement = null;

    let todoColumn = document.getElementById('todo');
    let inProgressColumn = document.getElementById('in-progress');
    let awaitFeedbackColumn = document.getElementById('await-feedback');
    let doneColumn = document.getElementById('done');

    todoColumn.classList.remove('drag-over', 'drag-active');
    inProgressColumn.classList.remove('drag-over', 'drag-active');
    awaitFeedbackColumn.classList.remove('drag-over', 'drag-active');
    doneColumn.classList.remove('drag-over', 'drag-active');
}

function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(element) {
    element.classList.add('drag-over');
}

function handleDragLeave(event, element) {
    if (!element.contains(event.relatedTarget)) {
        element.classList.remove('drag-over');
    }
}

function handleDrop(event, element) {
    event.stopPropagation();

    if (draggedElement !== element && draggedElement) {
        const afterElement = getDragAfterElement(element, event.clientY);
        if (afterElement == null) {
            element.appendChild(draggedElement);
        } else {
            element.insertBefore(draggedElement, afterElement);
        }
        updateTaskStatusInDrag(draggedElement, element.id);
    }

    element.classList.remove('drag-over', 'drag-active');
    return false;
}

function getDragAfterElement(container, y) {
    let draggableElements = [];
    let children = container.children;

    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (child.classList.contains('task-card') && !child.classList.contains('dragging')) {
            draggableElements.push(child);
        }
    }

    let closestElement = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < draggableElements.length; i++) {
        let child = draggableElements[i];
        let box = child.getBoundingClientRect();
        let offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestElement = child;
        }
    }

    return closestElement;
}

function updateTaskStatusInDrag(taskElement, columnId) {
    const taskId = taskElement.getAttribute('data-task-id');
    const statusMapping = {
        'todo': 'todo',
        'in-progress': 'in-progress', 
        'await-feedback': 'await-feedback',
        'done': 'done'
    };
    
    const newStatus = statusMapping[columnId];
    
    if (newStatus && typeof window.updateTaskStatus === 'function') {
        // Verwende die globale updateTaskStatus Funktion aus task-management.js
        window.updateTaskStatus(taskId, newStatus);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .task-card.dragging {
            opacity: 0.5;
            transform: rotate(5deg);
        }
        
        .kanban-column.drag-over {
            background-color: #e3f2fd !important;
            border: 2px dashed #2196f3 !important;
        }
    `;
    document.head.appendChild(style);
});