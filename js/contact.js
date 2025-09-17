let contacts = [
    { name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890"},
    { name: "Jane Smith", email: "jane.smith@example.com", phone: "123-456-7890"},
    { name: "Alice Johnson", email: "alice.johnson@example.com", phone: "123-456-7890"},
    { name: "Brian Adams", email: "brian.adams@example.com", phone: "234-567-8901"},
    { name: "Cathy Brown", email: "cathy.brown@example.com", phone: "345-678-9012"},
    { name: "David Clark", email: "david.clark@example.com", phone: "456-789-0123"},
    { name: "Evelyn Davis", email: "evelyn.davis@example.com", phone: "567-890-1234"},
    { name: "Frank Evans", email: "frank.evans@example.com", phone: "678-901-2345"},
    { name: "Grace Foster", email: "grace.foster@example.com", phone: "789-012-3456"},
    { name: "Henry Green", email: "henry.green@example.com", phone: "890-123-4567"},
    { name: "Irene Harris", email: "irene.harris@example.com", phone: "901-234-5678"},
    { name: "Jack Ingram", email: "jack.ingram@example.com", phone: "012-345-6789"},
    { name: "Karen Jones", email: "karen.jones@example.com", phone: "123-456-7891"},
    { name: "Liam King", email: "liam.king@example.com", phone: "234-567-8902"},
    { name: "Mona Lee", email: "mona.lee@example.com", phone: "345-678-9013"},
    { name: "Nathan Moore", email: "nathan.moore@example.com", phone: "456-789-0124"},
    { name: "Olivia Nelson", email: "olivia.nelson@example.com", phone: "567-890-1235"},
    { name: "Paul Owens", email: "paul.owens@example.com", phone: "678-901-2346"},
    { name: "Quincy Price", email: "quincy.price@example.com", phone: "789-012-3457"},
    { name: "Rachel Quinn", email: "rachel.quinn@example.com", phone: "890-123-4568"},
    { name: "Samuel Reed", email: "samuel.reed@example.com", phone: "901-234-5679"},
    { name: "Tina Scott", email: "tina.scott@example.com", phone: "012-345-6790"}
];

let activeContactIndex = null;

const avatarColors = ['#FF7A00', '#9327FF', '#6E52FF', '#FC71FF', '#FFBB2B', '#1FD7C1', '#462F8A', '#FF4646', '#00BEE8'];

function getAvatarColor(name) {
    const firstLetter = name.charAt(0).toUpperCase();
    const charCode = firstLetter.charCodeAt(0);
    const colorIndex = (charCode - 65) % avatarColors.length; 
    return avatarColors[colorIndex];
}

function getInitials(name) {
    const nameParts = name.trim().split(' ');
    if (nameParts.length >= 2) {
        return nameParts[0].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    } else {
        return nameParts[0].length >= 2 ? 
               nameParts[0].charAt(0).toUpperCase() + nameParts[0].charAt(1).toUpperCase() : 
               nameParts[0].charAt(0).toUpperCase();
    }
}

function renderContactList() {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    contacts.forEach((contact, index) => {
        contactList.innerHTML += getContactCardTemplate(contact, index);
    });
}

function getContactCardTemplate(contact, index) {
        const activeClass = activeContactIndex === index ? 'active' : '';
        const avatarColor = getAvatarColor(contact.name);
        const initials = getInitials(contact.name);
        return `
            <div class="contact-card ${activeClass}" onclick="showContactDetails(${index})">
                <div class="user-avatar-sm" style="background-color: ${avatarColor};"><div>${initials}</div></div>
                <div class="contact-info">
                    <p class="contact-name">${contact.name}</p>
                    <p class="contact-email">${contact.email}</p>
                </div>
            </div>
        `;
}

function showContactDetails(index) {
    activeContactIndex = index;
    renderContactList();
    const contact = contacts[index];
    const avatarColor = getAvatarColor(contact.name);
    const initials = getInitials(contact.name);
    const contactDetails = document.getElementById('contact-details');
    contactDetails.innerHTML = `
        <div class="contact-header d-flex">
            <div class="user-avatar-lg" style="background-color: ${avatarColor};"><div>${initials}</div></div>
            <div>
                <h1>${contact.name}</h1>
                <div class="contact-actions">
                    <button onclick="editContact(${index})" class="text-btn-with-icon">
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.49951 17H3.89951L12.5245 8.375L11.1245 6.975L2.49951 15.6V17ZM16.7995 6.925L12.5495 2.725L13.9495 1.325C14.3328 0.941667 14.8037 0.75 15.362 0.75C15.9203 0.75 16.3912 0.941667 16.7745 1.325L18.1745 2.725C18.5578 3.10833 18.7578 3.57083 18.7745 4.1125C18.7912 4.65417 18.6078 5.11667 18.2245 5.5L16.7995 6.925ZM15.3495 8.4L4.74951 19H0.499512V14.75L11.0995 4.15L15.3495 8.4Z" fill="#4589FF"/>
                        </svg>
                        Edit
                    </button>
                    <button onclick="deleteContact(${index})" class="text-btn-with-icon">
                        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.49951 18C2.94951 18 2.47868 17.8042 2.08701 17.4125C1.69535 17.0208 1.49951 16.55 1.49951 16V3C1.21618 3 0.978678 2.90417 0.787012 2.7125C0.595345 2.52083 0.499512 2.28333 0.499512 2C0.499512 1.71667 0.595345 1.47917 0.787012 1.2875C0.978678 1.09583 1.21618 1 1.49951 1H5.49951C5.49951 0.716667 5.59535 0.479167 5.78701 0.2875C5.97868 0.0958333 6.21618 0 6.49951 0H10.4995C10.7828 0 11.0203 0.0958333 11.212 0.2875C11.4037 0.479167 11.4995 0.716667 11.4995 1H15.4995C15.7828 1 16.0203 1.09583 16.212 1.2875C16.4037 1.47917 16.4995 1.71667 16.4995 2C16.4995 2.28333 16.4037 2.52083 16.212 2.7125C16.0203 2.90417 15.7828 3 15.4995 3V16C15.4995 16.55 15.3037 17.0208 14.912 17.4125C14.5203 17.8042 14.0495 18 13.4995 18H3.49951ZM3.49951 3V16H13.4995V3H3.49951ZM5.49951 13C5.49951 13.2833 5.59535 13.5208 5.78701 13.7125C5.97868 13.9042 6.21618 14 6.49951 14C6.78285 14 7.02035 13.9042 7.21201 13.7125C7.40368 13.5208 7.49951 13.2833 7.49951 13V6C7.49951 5.71667 7.40368 5.47917 7.21201 5.2875C7.02035 5.09583 6.78285 5 6.49951 5C6.21618 5 5.97868 5.09583 5.78701 5.2875C5.59535 5.47917 5.49951 5.71667 5.49951 6V13ZM9.49951 13C9.49951 13.2833 9.59535 13.5208 9.78701 13.7125C9.97868 13.9042 10.2162 14 10.4995 14C10.7828 14 11.0203 13.9042 11.212 13.7125C11.4037 13.5208 11.4995 13.2833 11.4995 13V6C11.4995 5.71667 11.4037 5.47917 11.212 5.2875C11.0203 5.09583 10.7828 5 10.4995 5C10.2162 5 9.97868 5.09583 9.78701 5.2875C9.59535 5.47917 9.49951 5.71667 9.49951 6V13Z" fill="#4589FF"/>
                        </svg>
                        Delete
                    </button>
                </div>
            </div>
        </div>
        <div class="contact-details">
            <h2>Contact Information</h2>
            <h3>Email</h3>
            <a href="mailto:${contact.email}">${contact.email}</a>
            <h3>Phone</h3>
            <a href="tel:${contact.phone}">${contact.phone}</a>
        </div>
    `;
}

function toggleAddContactMenu() {
    const menu = document.querySelector('#add-contact-menu');
    const overlay = document.querySelector('.blur-overlay');
    
    menu.classList.toggle('open');
    overlay.classList.toggle('active');
}

function toggleEditContactMenu() {
    const menu = document.querySelector('#edit-contact-menu');
    const overlay = document.querySelector('.blur-overlay');

    menu.classList.toggle('open');
    overlay.classList.toggle('active');
}

function editContact(index) {
    const contact = contacts[index];
    const form = document.getElementById('edit-contact-form');
    form.onsubmit = (event) => updateContact(event, index);
    form.innerHTML = getEditContactFormTemplate(contact);
    toggleEditContactMenu();
}

function getEditContactFormTemplate(contact) {
    return `
        <div class="input-icon-container">
            <input type="text" id="edit-contact-name" value="${contact.name}" required />
            <img src="/assets/img/person.svg" alt="name" class="overlay-image" />
        </div>
        <div class="input-icon-container">
            <input type="email" id="edit-contact-email" value="${contact.email}" required />
            <img src="/assets/img/mail.svg" alt="email" class="overlay-image" />
        </div>
        <div class="input-icon-container">
            <input type="text" id="edit-contact-phone" value="${contact.phone}" required />
            <img src="/assets/img/phone.svg" alt="phone" class="overlay-image" />
        </div>
        <button type="submit">Save Changes</button>
    `;
}

function updateContact(event, editContactIndex) {
    event.preventDefault();
    const nameInput = document.getElementById('edit-contact-name');
    const emailInput = document.getElementById('edit-contact-email');
    const phoneInput = document.getElementById('edit-contact-phone');

    const updatedContact = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value
    };

    contacts[editContactIndex] = updatedContact;
    renderContactList();
    closeAllMenus();
}

function closeAllMenus() {
    const addMenu = document.querySelector('#add-contact-menu');
    const editMenu = document.querySelector('#edit-contact-menu');
    const overlay = document.querySelector('.blur-overlay');

    addMenu.classList.remove('open');
    editMenu.classList.remove('open');
    overlay.classList.remove('active');
}

function deleteContact(index) {
        contacts.splice(index, 1);
        renderContactList();
}

function addContact(event) {
    event.preventDefault();
    const nameInput = document.getElementById('add-contact-name');
    const emailInput = document.getElementById('add-contact-email');
    const phoneInput = document.getElementById('add-contact-phone');

    const newContact = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value
    };

    contacts.push(newContact);
    renderContactList();
    closeAllMenus();
}