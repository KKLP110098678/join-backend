function toggleOverlay(menu) {
    const overlay = document.querySelector('.blur-overlay');
    overlay.classList.toggle('active');
    menu = document.querySelector(menu);
    menu.classList.toggle('open');
}

function closeAllMenus() {
    const menus = document.querySelectorAll('#add-task-menu, #edit-contact-menu, #add-contact-menu, #details-overlay');
    const overlay = document.querySelector('.blur-overlay');

    menus.forEach(menu => {
        menu.classList.remove('open');
    });
    overlay.classList.remove('active');
}