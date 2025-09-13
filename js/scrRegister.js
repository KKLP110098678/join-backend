// function isUserExisitByName(inUsereName) {}

// function isUserExisitByEmail(inEmail) {}

// function isPasswordMatching(password, confirmPassword) { }

// Mock database
const users = [
  { name: "Wassim", email: "wassim@da.com" },
  { name: "Ali", email: "ali@da.com" },
];
const newUser = [{ nuName: "", nuEmail: "", inPassword: "" }];

async function handleRegisterUser(event) {
  event.preventDefault();

  const name = document.getElementById("inName").value.trim();
  const email = document.getElementById("inEmail").value.trim();
  const password = document.getElementById("inPassword").value;
  const confirmPassword = document.getElementById("inPasswordConfirm").value;
  const checkBox = document.getElementById("checkBox").checked;

  if (!checkBox) {
    alert("You must accept the Privacy Policy.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const hashedPassword = btoa(password);
  const userId = "user_" + Date.now();

  try {
    await firebase
      .database()
      .ref("users/" + userId)
      .set({
        name: name,
        email: email,
        password: hashedPassword,
      });

    alert("User registered successfully!");
    window.location.href = "../index.html";
  } catch (error) {
    console.error("Error registering user:", error);
    alert("Something went wrong. Try again.");
  }
}

function isUserExistByName(inName) {
  const error = document.getElementById("usernameError");
  const emailField = document.getElementById("inEmail");

  if (!inName) return;

  const exists = users.some(
    (user) => user.name.toLowerCase() === inName.toLowerCase()
  );
  if (exists) {
    console.log("Username already exists!");

    error.textContent = "Username already exists!";
    error.classList.remove("d-none");
    emailField.disabled = true;
  } else {
    newUser.nuName = inName;
    error.textContent = "";
    error.classList.add("d-none");
    emailField.disabled = false;
    emailField.focus();
  }
}

function isUserExistByEmail(inEmail) {
  const error = document.getElementById("emailError");
  const passwordField = document.getElementById("inPassword");

  if (!inEmail) return;

  const exists = users.some(
    (user) => user.email.toLowerCase() === inEmail.toLowerCase()
  );
  if (!validateEmailFormat(inEmail)) {
    passwordField.disabled = true;
    return;
  }
  if (exists) {
    error.textContent = "E-Mail already exists!";
    error.classList.remove("d-none");
    // passwordField.disabled = true;
    resetFromStep(2);
  } else {
    newUser.nuEmail = inEmail;
    error.textContent = "";
    error.classList.add("d-none");
    passwordField.disabled = false;
    passwordField.focus();
  }
}
function validateEmailFormat(inEmail) {
  const error = document.getElementById("emailError");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(inEmail)) {
    error.textContent = "Invalid E-Mail format!";
    error.classList.remove("d-none");
    resetFromStep(2);

    return false;
  } else {
    error.textContent = "";
    error.classList.add("d-none");
    return true;
  }
}

function validatePasswordTooltip(inPassword) {
  const tooltip = document.getElementById("passwordTooltip");
  const confirmField = document.getElementById("inPasswordConfirm");

  const minLength = inPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(inPassword);
  const hasLower = /[a-z]/.test(inPassword);
  const hasNumber = /[0-9]/.test(inPassword);

  let message = "Password requirements:<br>";
  message += minLength
    ? "✔ At least 8 characters<br>"
    : "❌ At least 8 characters<br>";
  message += hasUpper
    ? "✔ At least one uppercase letter<br>"
    : "❌ At least one uppercase letter<br>";
  message += hasLower
    ? "✔ At least one lowercase letter<br>"
    : "❌ At least one lowercase letter<br>";
  message += hasNumber
    ? "✔ At least one number<br>"
    : "❌ At least one number<br>";

  tooltip.innerHTML = message;
  tooltip.style.display = inPassword ? "block" : "none";

  if (minLength && hasUpper && hasLower && hasNumber) {
    tooltip.classList.add("d-none");
    newUser.nuPassword = inPassword;

    confirmField.disabled = false;
  } else {
    // confirmField.disabled = true;
    resetFromStep(3);
  }
}
function isPasswordMatching(confirmPassword) {
  const confirmField = document.getElementById("inPasswordConfirm");
  const checkBox = document.getElementById("checkBox");

  if (!confirmPassword) return;

  if (newUser.nuPassword === confirmPassword) {
    confirmField.style.background = "none";
    checkBox.disabled = false;
  } else {
    confirmField.style.background = "red";
    // checkBox.disabled = true;
    resetFromStep(4);
  }
}
// Qw123456
function resetFromStep(step) {
  const emailField = document.getElementById("inEmail");
  const passwordField = document.getElementById("inPassword");
  const confirmField = document.getElementById("inPasswordConfirm");
  const checkBox = document.getElementById("checkBox");
  const signUpBtn = document.getElementById("btnSignup");

  switch (step) {
    case 1:
      emailField.disabled = true;
      passwordField.disabled = true;
      confirmField.disabled = true;
      checkBox.disabled = true;
      signUpBtn.disabled = true;
      break;

    case 2:
      passwordField.disabled = true;
      confirmField.disabled = true;
      checkBox.disabled = true;
      signUpBtn.disabled = true;
      break;

    case 3:
      confirmField.disabled = true;
      checkBox.disabled = true;
      signUpBtn.disabled = true;
      break;

    case 4:
      checkBox.disabled = true;
      signUpBtn.disabled = true;
      break;
  }
}
