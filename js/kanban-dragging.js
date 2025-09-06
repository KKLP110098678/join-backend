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
    
    document.querySelectorAll('.kanban-column').forEach(column => {
        column.classList.remove('drag-over', 'drag-active');
    });
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
        // Find the closest position to insert the card
        const afterElement = getDragAfterElement(element, event.clientY);
        
        if (afterElement == null) {
            element.appendChild(draggedElement);
        } else {
            element.insertBefore(draggedElement, afterElement);
        }
        
        // Update the task status based on the column
        updateTaskStatus(draggedElement, element.id);
    }

    element.classList.remove('drag-over', 'drag-active');
    return false;
}

// Helper function to determine insertion position
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task-card:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function updateTaskStatus(taskElement, columnId) {
    const taskId = taskElement.getAttribute('data-task-id');
    console.log(`Task ${taskId} moved to column: ${columnId}`);
    // Add API call here to update the backend if needed
}

document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .task-card.dragging {
            opacity: 0.5;
            transform: rotate(-5deg);
        }
        
        .kanban-column.drag-over {
            background-color: #e3f2fd !important;
            border: 2px dashed #2196f3 !important;
        }
    `;
    document.head.appendChild(style);
});