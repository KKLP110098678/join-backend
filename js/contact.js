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

function renderContactList() {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    contacts.forEach((contact, index) => {
        contactList.innerHTML += getContactCardTemplate(contact, index);
    });
}

function getContactCardTemplate(contact, index) {
        return `
            <div class="contact-card" onclick="showContactDetails(${index})">
                <div class="user-avatar-sm"><div>${contact.name.charAt(0)}</div></div>
                <div class="contact-info">
                    <p class="contact-name">${contact.name}</p>
                    <p class="contact-email">${contact.email}</p>
                </div>
            </div>
        `;
}

function showContactDetails(index) {
    const contact = contacts[index];
    const contactDetails = document.getElementById('contact-details');
    contactDetails.innerHTML = `
        <h2>${contact.name}</h2>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
    `;
}