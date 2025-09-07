// function isUserExisitByName(inUsereName) {}

// function isUserExisitByEmail(inEmail) {}

// function isPasswordMatching(password, confirmPassword) { }


// Mock database 
const users = [
  { name: "Wassim", email: "wassim@example.com" },
  { name: "Ali", email: "ali@example.com" }
];

/* 1️⃣ Check if username exists */
function isUserExistByName(name) {
  const usernameError = document.getElementById("usernameError");
  if (!name) return;

  const exists = users.some(user => user.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    usernameError.textContent = "Username already exists!";
    usernameError.classList.remove("d-none");
  } else {
    usernameError.textContent = "";
    usernameError.classList.add("d-none");
  }
}

/* 2️⃣ Check if email exists */
function isUserExistByEmail(email) {
  const emailErrorId = "emailError";
  let emailError = document.getElementById(emailErrorId);

  if (!emailError) {
    const container = document.getElementById("inEmail").parentElement;
    emailError = document.createElement("small");
    emailError.id = emailErrorId;
    emailError.classList.add("d-none");
    container.appendChild(emailError);
  }

  const exists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    emailError.textContent = "E-Mail already exists!";
    emailError.classList.remove("d-none");
  } else {
    emailError.textContent = "";
    emailError.classList.add("d-none");
  }
}

/* 3️⃣ Validate password strength tooltip */
function validatePasswordTooltip() {
  const password = document.getElementById("inPassword").value;
  const tooltip = document.getElementById("passwordTooltip");

  const minLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  let message = "Password requirements:<br>";
  message += minLength ? "✔ At least 8 characters<br>" : "❌ At least 8 characters<br>";
  message += hasUpper ? "✔ At least one uppercase letter<br>" : "❌ At least one uppercase letter<br>";
  message += hasLower ? "✔ At least one lowercase letter<br>" : "❌ At least one lowercase letter<br>";
  message += hasNumber ? "✔ At least one number<br>" : "❌ At least one number<br>";

  tooltip.innerHTML = message;
  tooltip.style.display = password ? "block" : "none";
}

/* 4️⃣ Check if password matches confirm password */
function isPasswordMatching(password, confirmPassword) {
  const confirmField = document.getElementById("inPasswordConfirm");
  if (!confirmPassword) return;

  if (password === confirmPassword) {
    confirmField.style.borderColor = "green";
  } else {
    confirmField.style.borderColor = "red";
  }
}

// Optional: attach confirm password check on input
document.getElementById("inPasswordConfirm").addEventListener("input", function () {
  const password = document.getElementById("inPassword").value;
  isPasswordMatching(password, this.value);
});

