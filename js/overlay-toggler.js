function toggleOverlay(menuId) {
    let overlay = document.getElementById('blur-overlay');
    overlay.classList.toggle('active');
    let cleanMenuId = menuId.replace('#', '');
    let menu = document.getElementById(cleanMenuId);
    menu.classList.toggle('open');
}

function closeAllMenus() {
    let addTaskMenu = document.getElementById('add-task-menu');
    let editContactMenu = document.getElementById('edit-contact-menu');
    let addContactMenu = document.getElementById('add-contact-menu');
    let detailsOverlay = document.getElementById('details-overlay');
    let overlay = document.getElementById('blur-overlay');

    addTaskMenu.classList.remove('open');
    editContactMenu.classList.remove('open');
    addContactMenu.classList.remove('open');
    detailsOverlay.classList.remove('open');
    overlay.classList.remove('active');
}